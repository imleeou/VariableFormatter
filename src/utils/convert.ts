/** 将字符串转换为大驼峰 */
export function toPascalCase(str: string) {
	// 将字符串分割成单词数组
	const words = str.split(" ");

	// 将每个单词的首字母转换为大写，并拼接在一起
	return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
}

/** 将字符串转换为小驼峰 */
export function toCamelCase(str: string) {
	// 将字符串分割成单词数组
	const words = str.split(" ");

	// 将每个单词的首字母转换为小写，并拼接在一起
	return words.map((word) => word.charAt(0).toLowerCase() + word.slice(1)).join("");
}
