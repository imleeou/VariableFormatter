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
