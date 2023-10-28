import * as vscode from 'vscode';
import { getCurrentWord, replaceCurrentWord } from './utils';
import { toCamelCase, toPascalCase, toSymbolJoin } from './utils/convert';
import { defineCommands } from './utils/define';
import { isCamelCase, isUpperCamelCase } from './utils/judge';

/** 自定义命令 */
export const COMMANDS = defineCommands({
  // 将大驼峰转换为小驼峰
  lowerCamelCase: () => {
    const text = getCurrentWord();
    const newText = text.map((t) => toCamelCase(t));
    replaceCurrentWord(newText);
  },
  // 将字符串转换为大驼峰
  upperCamelCase: () => {
    const text = getCurrentWord();
    const newText = text.map((t) => toPascalCase(t));
    replaceCurrentWord(newText);
  },
  // 将字符串转换为小写
  lowerCase: () => {
    const text = getCurrentWord();
    const newText = text.map((t) => t.toLowerCase());
    replaceCurrentWord(newText);
  },
  // 将字符串转换为大写
  upperCase: () => {
    const text = getCurrentWord();
    const newText = text.map((t) => t.toUpperCase());
    replaceCurrentWord(newText);
  },
  // 将字符串转换为下划线连接
  underlineJoin: () => {
    const text = getCurrentWord();
    const newText = text.map((t) => toSymbolJoin(t, '_'));
    replaceCurrentWord(newText);
  },
  // 将字符串转换为中划线连接
  constantName: () => {
    const text = getCurrentWord();
    const newText = text.map((t) => toSymbolJoin(t, '_').toLocaleUpperCase());
    replaceCurrentWord(newText);
  },
  // 将字符串转换为中划线连接
  toggleCamelCase: () => {
    const text = getCurrentWord();
    const texts = text.map((t) => {
      let newT = t;
      if (isCamelCase(t)) {
        newT = isUpperCamelCase(t) ? toCamelCase(t) : toPascalCase(t);
      } else {
        // 默认优先转换为小驼峰格式
        newT = toCamelCase(t);
      }
      return newT;
    });
    replaceCurrentWord(texts);
  },
  // 将字符串使用自定义连接线连接
  customSymbolJoin: () => {
    const { customSymbol } = vscode.workspace.getConfiguration('variableFormatter');
    const text = getCurrentWord();
    const newTexts = text.map((t) => toSymbolJoin(t, customSymbol));
    replaceCurrentWord(newTexts);
  }
});
