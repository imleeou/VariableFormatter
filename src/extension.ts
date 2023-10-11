import * as vscode from "vscode";
import { toCamelCase, toPascalCase } from "./utils/convert";
import { getCurrentWord, replaceCurrentWord } from "./utils";

// 当您的扩展被激活时会调用此方法
export function activate(context: vscode.ExtensionContext) {
	console.log('拓展 "variable Formatter" 已激活!');

	/** 小驼峰 */
	const lowerCamelCase = vscode.commands.registerCommand("lowerCamelCase", () => {
		const text = getCurrentWord();
		replaceCurrentWord(toCamelCase(text));
	});

	/** 大驼峰 */
	const upperCamelCase = vscode.commands.registerCommand("upperCamelCase", () => {
		const text = getCurrentWord();
		replaceCurrentWord(toPascalCase(text));
	});

	context.subscriptions.push(upperCamelCase);
	context.subscriptions.push(lowerCamelCase);
}

// 当您的扩展被停用时，将调用此方法
export function deactivate() {}
