# VSCode 扩展发布指南

## 前置条件

### 1. 注册 Azure DevOps 账号

前往 [Azure DevOps](https://dev.azure.com/) 注册或登录你的 Microsoft 账号。

### 2. 创建 Publisher

1. 打开 [VSCode Marketplace 管理页面](https://marketplace.visualstudio.com/manage)
2. 点击 **Create Publisher**
3. 填写发布者名称（需与 `package.json` 中 `publisher` 字段一致）

### 3. 创建 Personal Access Token（PAT）

1. 登录 [Azure DevOps](https://dev.azure.com/)
2. 点击右上角头像 → **User settings** → **Personal Access Tokens**
3. 点击 **New Token**
4. 配置：
   - **Organization**: 选择 **All accessible organizations**
   - **Scopes**: 勾选 **Marketplace > Manage**
   - **Expiration**: 选择最长有效期（最长 1 年）
5. 点击 **Create**，复制生成的 token（此 token 仅显示一次，请妥善保存）

---

## 安装 vsce

```bash
npm install -g @vscode/vsce
```

---

## 发布步骤

### 1. 更新版本号

修改 `package.json` 中的 `version` 字段，例如 `"1.2.6"` → `"1.2.7"`。

### 2. 更新 CHANGELOG

在 `CHANGELOG.md` 中添加新版本的变更说明。

### 3. 登录 vsce

```bash
vsce login <publisher名称>
# 粘贴之前创建的 Personal Access Token
```

例如：`vsce login leeou`

### 4. 编译并发布

```bash
# 编译 TypeScript
pnpm compile

# 发布到 Marketplace
pnpm vsce publish
```

---

## 其他常用命令

```bash
# 本地打包为 .vsix 文件（用于本地测试安装）
pnpm run package

# 发布时自动升级版本号
pnpm vsce publish minor   # 1.2.6 → 1.3.0
pnpm vsce publish major   # 1.2.6 → 2.0.0
pnpm vsce publish patch   # 1.2.6 → 1.2.7

# 查看登录状态
vsce ls-publishers
```

---

## 常见问题

### PAT 过期

错误信息：`Access Denied: The Personal Access Token used has expired.`

解决方法：重新生成 PAT，然后 `vsce login` 登录。

### vsce 命令找不到

```
zsh: command not found: vsce
```

解决方法：`npm install -g @vscode/vsce`

### 版本号冲突

错误信息：`Version already exists`

解决方法：更新 `package.json` 中 `version` 为更高的版本号。

---

## 参考链接

- [VSCode Extension Marketplace](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [vsce 官方文档](https://github.com/microsoft/vscode-vsce)
