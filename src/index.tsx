import MonacoEditorModule from './MonacoEditor';

// Self-register this module on the window object
// This allows Duetell to load the module dynamically
declare global {
	interface Window {
		DuetellModules: Record<string, any>;
	}
}

// Initialize the DuetellModules registry if it doesn't exist
if (typeof window !== 'undefined') {
	window.DuetellModules = window.DuetellModules || {};
	window.DuetellModules['monaco-editor'] = MonacoEditorModule;

	// Log successful registration
	console.log('[Duetell Module] Monaco Editor loaded and registered successfully');
}

// Export the component as default for webpack
export default MonacoEditorModule;
