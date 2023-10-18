import * as vscode from 'vscode';
import { CommandType } from './types';
import { getCurrentWord, replaceCurrentWord } from './utils';
import { toCamelCase, toPascalCase, toSymbolJoin } from './utils/convert';
import { isCamelCase, isUpperCamelCase } from './utils/judge';

/** 自定义命令 */
export const COMMANDS: CommandType[] = [
  {
    name: 'lowerCamelCase',
    methods: () => {
      const text = getCurrentWord();
      replaceCurrentWord(toCamelCase(text));
    },
  },
  {
    name: 'upperCamelCase',
    methods: () => {
      const text = getCurrentWord();
      replaceCurrentWord(toPascalCase(text));
    },
  },
  {
    name: 'underlineJoin',
    methods: () => {
      const text = getCurrentWord();
      replaceCurrentWord(toSymbolJoin(text, '_'));
    },
  },
  {
    name: 'variableFormatter.toggleCamelCase',
    methods: () => {
      let text = getCurrentWord();
      if (isCamelCase(text)) {
        text = isUpperCamelCase(text) ? toCamelCase(text) : toPascalCase(text);
      } else {
        // 默认优先转换为小驼峰格式
        text = toCamelCase(text);
      }
      replaceCurrentWord(text);
    },
  },
  {
    name: 'customSymbolJoin',
    methods: () => {
      const { customSymbol } = vscode.workspace.getConfiguration('variableFormatter');
      const text = getCurrentWord();
      replaceCurrentWord(toSymbolJoin(text, customSymbol));
    },
  },
];
