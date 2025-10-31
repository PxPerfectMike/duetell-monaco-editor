# Monaco Code Editor - Duetell Module

Professional code editor powered by VSCode's Monaco Editor.

## Features

- 🎨 **19 Programming Languages** - JavaScript, TypeScript, Python, Go, Rust, and more
- 💡 **IntelliSense** - Smart code completion
- 🔍 **Search & Replace** - With regex support
- 📊 **Minimap** - Bird's-eye view of your code
- 🎭 **Theme Sync** - Automatically follows Duetell's light/dark mode
- ⚡ **Performance** - Optimized for large files
- 🔧 **Customizable** - Rich editor options

## Installation in Duetell

1. Open Duetell App Store (click the store icon in taskbar)
2. Find "Monaco Code Editor" in featured apps
3. Click "Install"
4. Launch from the Apps menu

## Development

### Building the Module

```bash
cd modules-external/monaco-editor
npm install
npm run build
```

This creates `dist/bundle.js` ready for deployment.

### Publishing to GitHub

```bash
# Initialize git repo
git init
git add .
git commit -m "feat: initial Monaco Editor module"

# Create repo on GitHub: duetell-modules/monaco-editor
git remote add origin https://github.com/duetell-modules/monaco-editor.git
git branch -M main
git push -u origin main

# Create a release tag
git tag v1.0.0
git push origin v1.0.0
```

### CDN Access

Once published, the module is automatically available via jsDelivr:

```
https://cdn.jsdelivr.net/gh/duetell-modules/monaco-editor@1.0.0/dist/bundle.js
```

## Technical Details

### Bundle Format

The module is built as a standalone UMD bundle that:
- Expects `React` and `ReactDOM` as globals
- Self-registers on `window.DuetellModules['monaco-editor']`
- Includes all dependencies except React

### Module Interface

Implements the Duetell ModuleProps interface:

```typescript
interface ModuleProps {
  moduleId: string;
  isActive: boolean;
  settings: any;
  setSettings: (settings: any) => void;
  onSendMessage: (to: string, message: any) => void;
  onRegisterMessageHandler: (handler: (from: string, message: any) => void) => void;
}
```

## License

MIT
