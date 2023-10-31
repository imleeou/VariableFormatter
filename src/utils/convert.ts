import { splitBySpecialChar, splitCamelCase } from './index';
import { isCamelCase, isLowerCamelCase, isSpace, isUpperCamelCase } from './judge';

/** 将字符串转换为大驼峰 */
export function toPascalCase(str: string): string {
  if (isSpace(str) || isUpperCamelCase(str)) {
    return str;
  }
  // 将字符串分割成单词数组
  const words = splitBySpecialChar(str);
  // 每个单词首字母转为大写
  const word = words
    .map((word) => {
      const lowerWord = isCamelCase(word) ? word : word.toLowerCase();
      return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
    })
    .join('');
  return word;
}

/** 将字符串转换为小驼峰 */
export function toCamelCase(str: string): string {
  if (isSpace(str) || isLowerCamelCase(str)) {
    return str;
  }
  const pascalCaseWords = toPascalCase(str);
  return pascalCaseWords.charAt(0).toLowerCase() + pascalCaseWords.slice(1);
}

/** 将单词用符号连接 */
export function toSymbolJoin(str: string, symbol: string = '-'): string {
  // 将字符串分割成单词数组
  const words = splitBySpecialChar(str);
  // 每个单词首字母转为大写
  const word = words
    .map((word) => {
      return isCamelCase(word) ? splitCamelCase(word).join(symbol) : word;
    })
    .join(symbol);
  return word;
}
