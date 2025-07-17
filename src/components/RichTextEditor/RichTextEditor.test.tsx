import { render, screen } from '@testing-library/react';
import { RichTextEditor } from './RichTextEditor';

// Mock hooks
vi.mock('../../hooks/useEditor', () => ({
  useEditor: () => ({
    content: '',
    setContent: vi.fn(),
    characterCount: 0,
    formatStates: { bold: false, italic: false, underline: false },
    formatText: vi.fn(),
    insertLink: vi.fn(),
    clearFormatting: vi.fn(),
  }),
}));

interface ToolbarProps {
  formatStates: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
  };
}

// Mock Toolbar component
vi.mock('./Toolbar', () => ({
  Toolbar: ({ formatStates }: ToolbarProps) => (
    <div role="toolbar" aria-label="Formatting toolbar">
      Toolbar - Bold: {formatStates.bold ? 'active' : 'inactive'}
    </div>
  ),
}));

describe('RichTextEditor Component', () => {
  it('renders the editor container', () => {
    render(<RichTextEditor />);
    // Using getByRole for interactive elements (Priority 1)
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders the toolbar', () => {
    render(<RichTextEditor />);
    // Using getByRole for toolbar landmark (Priority 1)
    expect(screen.getByRole('toolbar')).toBeInTheDocument();
  });

  it('displays character count', () => {
    render(<RichTextEditor />);
    // Using getByText for non-interactive content (Priority 1)
    expect(screen.getByText('0/280 characters')).toBeInTheDocument();
  });

  it('shows auto-saved indicator', () => {
    render(<RichTextEditor />);
    // Using getByText for status text (Priority 1)
    expect(screen.getByText('Auto-saved')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<RichTextEditor />);
    const editor = screen.getByRole('textbox');
    expect(editor).toHaveAttribute('aria-label', 'Rich text editor');
    expect(editor).toHaveAttribute('aria-multiline', 'true');
  });

  it('displays placeholder text', () => {
    render(<RichTextEditor />);
    const editor = screen.getByRole('textbox');
    expect(editor).toHaveAttribute(
      'data-placeholder',
      'Start brainstorming your thoughts...'
    );
  });
});
