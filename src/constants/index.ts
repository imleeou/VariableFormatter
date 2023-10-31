import * as vscode from 'vscode';
import { toCamelCase, toPascalCase, toSymbolJoin } from '../utils/convert';
import { isContainsLowerCase, isContainsSymbol, isLowerCamelCase, isUpperCamelCase } from '../utils/judge';

// 判断当前单词格式
export const TEST_VARIABLE_FORMAT = {
  lowerCamelCase: {
    transform: toCamelCase,
    check: isLowerCamelCase
  },
  upperCamelCase: {
    transform: toPascalCase,
    check: isUpperCamelCase
  },
  underlineJoin: {
    transform: (str: string) => toSymbolJoin(str, '_'),
    check: (str: string) => isContainsSymbol(str, '_') && isContainsLowerCase(str)
  },
  constantName: {
    transform: (str: string) => toSymbolJoin(str, '_').toUpperCase(),
    check: (str: string) => isContainsSymbol(str, '_') && !isContainsLowerCase(str)
  },
  customSymbolJoin: {
    transform: (str: string) => {
      const { customSymbol } = vscode.workspace.getConfiguration('variableFormatter');
      return toSymbolJoin(str, customSymbol ?? '-');
    },
    check: (str: string) => isContainsSymbol(str, '_') && !isContainsLowerCase(str)
  }
};
