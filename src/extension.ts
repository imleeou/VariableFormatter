import * as vscode from 'vscode';
import { COMMANDS } from './commands';

// 当您的扩展被激活时会调用此方法
export function activate(context: vscode.ExtensionContext) {
  // 注册命令
  COMMANDS.forEach((command) => {
    context.subscriptions.push(vscode.commands.registerCommand(command.name, command.methods));
  });
}

// 当您的扩展被停用时，将调用此方法
export function deactivate() {}
