import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

interface FileInfo {
	id?: string;
	name: string;
	content: string;
	language: string;
}

interface ModuleProps {
	moduleId: string;
	isActive: boolean;
	windowState: any;
	onWindowStateChange: (newState: any) => void;
	settings: any;
	setSettings: (newSettings: any) => void;
	onSendMessage: (to: string, message: any) => void;
	onRegisterMessageHandler: (handler: (from: string, message: any) => void) => void;
}

export default function MonacoEditorModule({
	moduleId,
	isActive,
	settings,
	setSettings,
}: ModuleProps) {
	const [currentFile, setCurrentFile] = useState<FileInfo>(
		settings.currentFile || {
			name: 'untitled.txt',
			content: '',
			language: 'plaintext',
		}
	);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const editorRef = useRef<any>(null);

	// Detect system theme
	useEffect(() => {
		const checkTheme = () => {
			const dark = document.documentElement.classList.contains('dark');
			setIsDarkMode(dark);
		};

		checkTheme();

		// Watch for theme changes
		const observer = new MutationObserver(checkTheme);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
		});

		return () => observer.disconnect();
	}, []);

	// Save current file to settings whenever it changes
	useEffect(() => {
		setSettings({ ...settings, currentFile });
	}, [currentFile]);

	const handleEditorChange = (value: string | undefined) => {
		if (value !== undefined) {
			setCurrentFile(prev => ({ ...prev, content: value }));
		}
	};

	const handleEditorDidMount = (editor: any) => {
		editorRef.current = editor;
		// Focus editor
		editor.focus();
	};

	const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const language = e.target.value;
		setCurrentFile(prev => ({ ...prev, language }));
	};

	const handleNewFile = () => {
		setCurrentFile({
			name: 'untitled.txt',
			content: '',
			language: 'plaintext',
		});
	};

	// Popular languages for quick access
	const languages = [
		{ value: 'plaintext', label: 'Plain Text' },
		{ value: 'javascript', label: 'JavaScript' },
		{ value: 'typescript', label: 'TypeScript' },
		{ value: 'python', label: 'Python' },
		{ value: 'java', label: 'Java' },
		{ value: 'csharp', label: 'C#' },
		{ value: 'cpp', label: 'C++' },
		{ value: 'html', label: 'HTML' },
		{ value: 'css', label: 'CSS' },
		{ value: 'json', label: 'JSON' },
		{ value: 'markdown', label: 'Markdown' },
		{ value: 'yaml', label: 'YAML' },
		{ value: 'xml', label: 'XML' },
		{ value: 'sql', label: 'SQL' },
		{ value: 'shell', label: 'Shell' },
		{ value: 'go', label: 'Go' },
		{ value: 'rust', label: 'Rust' },
		{ value: 'php', label: 'PHP' },
		{ value: 'ruby', label: 'Ruby' },
	];

	return (
		<div className="h-full flex flex-col">
			{/* Toolbar */}
			<div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-2 flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<div className="flex items-center space-x-2">
						<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
							{currentFile.name}
						</span>
						{currentFile.id && (
							<span className="text-xs text-green-600 dark:text-green-400">
								● Saved
							</span>
						)}
					</div>

					<div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />

					<select
						value={currentFile.language}
						onChange={handleLanguageChange}
						className="text-sm px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						{languages.map(lang => (
							<option key={lang.value} value={lang.value}>
								{lang.label}
							</option>
						))}
					</select>
				</div>

				<div className="flex items-center space-x-2">
					<button
						onClick={handleNewFile}
						className="px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
						title="New File"
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
					</button>

					<div className="text-xs text-gray-500 dark:text-gray-400">
						{currentFile.content.length} chars
						{' • '}
						{currentFile.content.split('\n').length} lines
					</div>
				</div>
			</div>

			{/* Monaco Editor */}
			<div className="flex-1 min-h-0">
				<Editor
					height="100%"
					language={currentFile.language}
					value={currentFile.content}
					onChange={handleEditorChange}
					onMount={handleEditorDidMount}
					theme={isDarkMode ? 'vs-dark' : 'vs-light'}
					options={{
						minimap: { enabled: true },
						fontSize: 14,
						fontFamily: 'Consolas, "Courier New", monospace',
						lineNumbers: 'on',
						roundedSelection: true,
						scrollBeyondLastLine: false,
						automaticLayout: true,
						tabSize: 2,
						wordWrap: 'on',
						bracketPairColorization: { enabled: true },
						renderWhitespace: 'selection',
						cursorBlinking: 'smooth',
						cursorSmoothCaretAnimation: 'on',
						smoothScrolling: true,
						contextmenu: true,
						mouseWheelZoom: true,
						quickSuggestions: true,
						suggestOnTriggerCharacters: true,
						acceptSuggestionOnCommitCharacter: true,
						acceptSuggestionOnEnter: 'on',
						snippetSuggestions: 'inline',
						formatOnPaste: true,
						formatOnType: true,
					}}
					loading={
						<div className="h-full flex items-center justify-center bg-white dark:bg-gray-900">
							<div className="text-center">
								<div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent" />
								<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
									Loading Monaco Editor...
								</p>
							</div>
						</div>
					}
				/>
			</div>
		</div>
	);
}
