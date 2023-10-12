import * as vscode from "vscode";

/** 获取当前选中的单个单词 */
export function getCurrentWord(): string {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return "";
	}

	const selection = editor.selection;
	const text = editor.document.getText(selection);
	return text;
}

/** 替换当前选中的单词 */
export function replaceCurrentWord(newWord: string): void {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	const selection = editor.selection;
	editor.edit((editBuilder) => {
		editBuilder.replace(selection, newWord);
	});
}

/** 若字符串含有特殊字符 和 _，将其分隔 */
export function splitBySpecialChar(str: string): string[] {
	const regex = /[!@#$%^&*(),.?":{}|<>_]/g;
	return str.split(regex);
}

/** 清除单词中的中文 */
export function clearChinese(word: string): string {
	return word.replace(/[\u4e00-\u9fa5]/g, "");
}

/** 将驼峰格式的单词分隔开 */
export function splitCamelCase(str: string): string[] {
	const regex = /([A-Z]?[a-z0-9]+)/g;
	return str.match(regex) ?? [str];
}
