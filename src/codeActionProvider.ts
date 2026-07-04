import * as vscode from 'vscode';

/** 获取插件配置 */
function getConfig() {
  return vscode.workspace.getConfiguration('variableFormatter');
}

/** 各格式转换命令及显示名称 */
const FORMAT_ACTIONS: { command: string; title: string }[] = [
  { command: 'lowerCamelCase', title: '转换为小驼峰' },
  { command: 'upperCamelCase', title: '转换为大驼峰' },
  { command: 'lowerCase', title: '转换为全小写' },
  { command: 'upperCase', title: '转换为全大写' },
  { command: 'underlineJoin', title: '转换为下划线连接' },
  { command: 'kebabCase', title: '转换为中划线连接' },
  { command: 'constantName', title: '转换为常量命名' },
  { command: 'customSymbolJoin', title: '转换为自定义连接符连接' },
];

export class VariableFormatterCodeActionProvider implements vscode.CodeActionProvider {
  provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range | vscode.Selection,
    _context: vscode.CodeActionContext,
    _token: vscode.CancellationToken
  ): vscode.CodeAction[] {
    // 检查是否启用灯泡提示
    if (!getConfig().get<boolean>('enableCodeActions', true)) {
      return [];
    }

    // 仅当编辑器有选中文本时提供 Code Action
    if (range.isEmpty) {
      return [];
    }

    const selectedText = document.getText(range);
    if (!selectedText.trim()) {
      return [];
    }

    return FORMAT_ACTIONS.map(({ command, title }) => {
      const action = new vscode.CodeAction(title, vscode.CodeActionKind.Refactor);
      action.command = { command, title };
      return action;
    });
  }
}
