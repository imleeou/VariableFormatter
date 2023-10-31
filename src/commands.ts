import * as vscode from 'vscode';
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
  }
});
