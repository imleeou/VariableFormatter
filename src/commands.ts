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
      const newText = text.map((t) => toCamelCase(t));
      replaceCurrentWord(newText);
    }
  },
  {
    name: 'upperCamelCase',
    methods: () => {
      const text = getCurrentWord();
      const newText = text.map((t) => toPascalCase(t));
      replaceCurrentWord(newText);
    }
  },
  {
    name: 'lowerCase',
    methods: () => {
      const text = getCurrentWord();
      const newText = text.map((t) => t.toLowerCase());
      replaceCurrentWord(newText);
    }
  },
  {
    name: 'upperCase',
    methods: () => {
      const text = getCurrentWord();
      const newText = text.map((t) => t.toUpperCase());
      replaceCurrentWord(newText);
    }
  },
  {
    name: 'underlineJoin',
    methods: () => {
      const text = getCurrentWord();
      const newText = text.map((t) => toSymbolJoin(t, '_'));
      replaceCurrentWord(newText);
    }
  },
  {
    name: 'constantName',
    methods: () => {
      const text = getCurrentWord();
      const newText = text.map((t) => toSymbolJoin(t, '_').toLocaleUpperCase());
      replaceCurrentWord(newText);
    }
  },
  {
    name: 'variableFormatter.toggleCamelCase',
    methods: () => {
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
    }
  },
  {
    name: 'customSymbolJoin',
    methods: () => {
      const { customSymbol } = vscode.workspace.getConfiguration('variableFormatter');
      const text = getCurrentWord();
      const newTexts = text.map((t) => toSymbolJoin(t, customSymbol));
      replaceCurrentWord(newTexts);
    }
  }
];
