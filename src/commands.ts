import * as vscode from 'vscode';
import * as path from 'path';
import { getCurrentWord, replaceCurrentWord } from './utils';
import { toCamelCase, toPascalCase, toSymbolJoin } from './utils/convert';
import { defineCommands } from './utils/define';
import { TEST_VARIABLE_FORMAT } from './constants';

/** 自定义命令 */
export const COMMANDS = defineCommands({
  /** 将大驼峰转换为小驼峰 */
  lowerCamelCase: () => {
    const text = getCurrentWord();
    const newText = text.map((t) => toCamelCase(t));
    replaceCurrentWord(newText);
  },
  /** 将字符串转换为大驼峰 */
  upperCamelCase: () => {
    const text = getCurrentWord();
    const newText = text.map((t) => toPascalCase(t));
    replaceCurrentWord(newText);
  },
  /** 将字符串转换为小写 */
  lowerCase: () => {
    const text = getCurrentWord();
    const newText = text.map((t) => t.toLowerCase());
    replaceCurrentWord(newText);
  },
  /** 将字符串转换为大写 */
  upperCase: () => {
    const text = getCurrentWord();
    const newText = text.map((t) => t.toUpperCase());
    replaceCurrentWord(newText);
  },
  /** 将字符串转换为下划线连接 */
  underlineJoin: () => {
    const text = getCurrentWord();
    const newText = text.map((t) => toSymbolJoin(t, '_'));
    replaceCurrentWord(newText);
  },
  /** 将字符串转换为中划线连接 */
  constantName: () => {
    const text = getCurrentWord();
    const newText = text.map((t) => toSymbolJoin(t, '_').toLocaleUpperCase());
    replaceCurrentWord(newText);
  },
  /** 快捷键指令 */
  ['variableFormatter.toggleCamelCase']: () => {
    // 获取设置中勾选的支持快捷键转换的选项
    const { shortcutKeyOption } = vscode.workspace.getConfiguration('variableFormatter');
    const shortcutKeyTrueOption = Object.fromEntries(
      Object.entries(shortcutKeyOption).filter(([k, v]) => v === true && k in shortcutKeyOption)
    );
    if (!Object.keys(shortcutKeyTrueOption).length) return;

    const texts = getCurrentWord();
    const newTexts = texts.map((t) => {
      let newT = t;

      if (Object.keys(shortcutKeyTrueOption).length === 1) {
        newT =
          TEST_VARIABLE_FORMAT[Object.keys(shortcutKeyTrueOption)[0] as keyof typeof TEST_VARIABLE_FORMAT].transform(t);
      }
      // 长度大于1
      else {
        const handleShortcutKeyTrueOption = Object.entries(TEST_VARIABLE_FORMAT).filter(
          ([k]) => k in shortcutKeyTrueOption
        );
        let runIndex = 0;
        // 为了判断当前选中的词是哪个选项的格式，然后执行可选项中的下一个选项的格式化
        handleShortcutKeyTrueOption.find(([, v], index) => {
          if (v.check(t)) {
            runIndex = index + 1;
            return true;
          } else {
            return false;
          }
        });
        newT =
          handleShortcutKeyTrueOption[
            runIndex >= handleShortcutKeyTrueOption.length || !handleShortcutKeyTrueOption[runIndex] ? 0 : runIndex
          ][1].transform(t);
      }

      return newT;
    });
    replaceCurrentWord(newTexts);
  },
  /** 将字符串使用自定义连接线连接 */
  customSymbolJoin: () => {
    const { customSymbol } = vscode.workspace.getConfiguration('variableFormatter');
    const texts = getCurrentWord();
    const newTexts = texts.map((t) => toSymbolJoin(t, customSymbol));
    replaceCurrentWord(newTexts);
  },
  /** 右键文件菜单复制名称 不带后缀 */
  'extension.copyFileName': async (uri: vscode.Uri) => {
    // 获取文件名（带扩展名）
    const fileName = path.basename(uri.fsPath);
    // 不带拓展名
    const nameWithoutExt = path.parse(uri.fsPath).name;
    console.log('nameWithoutExt', fileName, nameWithoutExt);
    // 写入剪贴板
    await vscode.env.clipboard.writeText(nameWithoutExt);
    // 显示提示
    vscode.window.showInformationMessage(`已复制：${nameWithoutExt}`);
  }
});
