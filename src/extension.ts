import * as vscode from 'vscode';
import { COMMANDS } from './commands';
import { VariableFormatterCodeActionProvider } from './codeActionProvider';

// 当您的扩展被激活时会调用此方法
export function activate(context: vscode.ExtensionContext) {
  // 注册命令
  COMMANDS.forEach((command) => {
    context.subscriptions.push(vscode.commands.registerCommand(command.name, command.methods));
  });

  // 注册 Code Action 提供器（灯泡提示）
  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider(
      { scheme: 'file' },
      new VariableFormatterCodeActionProvider()
    )
  );
}

// 当您的扩展被停用时，将调用此方法
export function deactivate() {}
