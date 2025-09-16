
### **Total TypeScript Essentials: VS Code Shortcuts (Mac)**

#### **Autocomplete**
- **Manually Trigger Autocomplete**: `Ctrl + Space`
  - Use when you need suggestions or to see available options (e.g., methods, properties).

#### **Error Checking**
- **View Error Details**: Hover over the red squiggly line to see TypeScript errors.
- **Restart TypeScript Server**: `Shift + Command + P`, then search for `Restart TS Server`
  - Useful if the TypeScript server isn't working correctly.

#### **Go To Definition & References**
- **Go To Definition**: `Command + Click` or `F12`
  - Jumps to the definition of a variable or function.
- **Go To References**: `Command + Click` (again after reaching the definition)
  - Shows where the variable or function is used across the codebase.

#### **Rename Symbol**
- **Rename Across Codebase**: `Right Click` > `Rename Symbol`
  - Renames a variable or function across all files.

#### **Automatic Imports**
- **Trigger Import Suggestions**: Start typing a variable name, then `Ctrl + Space`
  - Automatically adds the appropriate import statement to the top of the file.

#### **Quick Fixes**
- **Open Quick Fix Menu**: `Command + .`
  - Use for refactoring code, such as adding missing imports, inlining variables, or extracting constants.

#### **Hover Information**
- **Inspect Variable/Function Types**: Hover over a variable or function
  - Displays type information, useful for understanding code without extra clicks.

#### **JSDoc Comments**
- **Hover to See Documentation**: Hover over a function or variable with JSDoc comments
  - Displays additional documentation provided in comments.
  ```typescript
  /**
   * Adds two numbers together.
   * @example
   * myFunction(1, 2); // Will return 3
   */
  const myFunction = (a: number, b: number) => a + b;
  ```
