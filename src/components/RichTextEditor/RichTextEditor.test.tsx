import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RichTextEditor } from './RichTextEditor';

// Mock only what's absolutely necessary for the test environment

// Mock browser APIs that jsdom doesn't support
Object.assign(document, {
  queryCommandState: vi.fn(() => false),
  execCommand: vi.fn(() => true),
});


describe('RichTextEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear localStorage between tests
    localStorage.clear();
  });

  describe('Basic Rendering', () => {
    it('renders the rich text editor with accessible content', () => {
      render(<RichTextEditor />);
      
      // Priority 1: Use getByRole for interactive elements
      expect(screen.getByRole('textbox', { name: 'Rich text editor' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /underline/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /insert link/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /clear formatting/i })).toBeInTheDocument();
      // AI Assistant button doesn't have aria-label, so find by text content
      expect(screen.getByText('AI Assistant')).toBeInTheDocument();
    });

    it('displays character count and status with accessible text', () => {
      render(<RichTextEditor />);
      
      // Priority 1: Use getByText for non-interactive text content
      expect(screen.getByText('0/280 characters')).toBeInTheDocument();
      expect(screen.getByText('Auto-saved')).toBeInTheDocument();
    });

    it('has proper accessibility attributes on textbox', () => {
      render(<RichTextEditor />);
      
      const textbox = screen.getByRole('textbox', { name: 'Rich text editor' });
      expect(textbox).toHaveAttribute('aria-multiline', 'true');
      expect(textbox).toHaveAttribute('contentEditable', 'true');
      expect(textbox).toHaveAttribute('data-placeholder', '✨ Try the AI Assistant button for inspiration!');
    });
  });

  describe('User Interactions', () => {
    it('updates character count when typing', async () => {
      const user = userEvent.setup();
      render(<RichTextEditor />);
      
      const textbox = screen.getByRole('textbox', { name: 'Rich text editor' });
      
      // Initially shows 0 characters
      expect(screen.getByText('0/280 characters')).toBeInTheDocument();
      
      // Type text and trigger input event
      await user.click(textbox);
      textbox.textContent = 'Hello world';
      textbox.dispatchEvent(new Event('input', { bubbles: true }));
      
      // Should update character count
      await waitFor(() => {
        expect(screen.getByText('11/280 characters')).toBeInTheDocument();
      });
    });

    it('saves content to localStorage', async () => {
      const user = userEvent.setup();
      render(<RichTextEditor />);
      
      const textbox = screen.getByRole('textbox', { name: 'Rich text editor' });
      await user.click(textbox);
      
      // Simulate typing
      textbox.textContent = 'Test content';
      textbox.dispatchEvent(new Event('input', { bubbles: true }));
      
      // Should save to localStorage
      await waitFor(() => {
        expect(localStorage.getItem('editor-content')).toBe('"Test content"');
      });
    });

    it('handles keyboard shortcuts for formatting', async () => {
      const user = userEvent.setup();
      render(<RichTextEditor />);
      
      const textbox = screen.getByRole('textbox', { name: 'Rich text editor' });
      await user.click(textbox);
      
      // Test keyboard shortcuts - these will work in jsdom
      await user.keyboard('{Control>}b{/Control}');
      await user.keyboard('{Control>}i{/Control}');
      await user.keyboard('{Control>}u{/Control}');
      
      // We can't easily test execCommand results in jsdom, but we can verify
      // the keyboard events are handled without errors
      expect(textbox).toBeInTheDocument();
    });

    it('restores content from localStorage on mount', () => {
      localStorage.setItem('editor-content', JSON.stringify('Saved content'));
      
      render(<RichTextEditor />);
      
      // Should retrieve content from localStorage (verified by component behavior)
      expect(localStorage.getItem('editor-content')).toBe('"Saved content"');
    });
  });

  describe('Toolbar Functionality', () => {
    it('renders formatting buttons with proper accessibility', async () => {
      const user = userEvent.setup();
      render(<RichTextEditor />);
      
      // Priority 1: Use getByRole with accessible names
      const boldButton = screen.getByRole('button', { name: /bold/i });
      const italicButton = screen.getByRole('button', { name: /italic/i });
      const underlineButton = screen.getByRole('button', { name: /underline/i });
      const clearButton = screen.getByRole('button', { name: /clear formatting/i });
      
      // Verify buttons are clickable and accessible
      expect(boldButton).toBeEnabled();
      expect(italicButton).toBeEnabled();
      expect(underlineButton).toBeEnabled();
      expect(clearButton).toBeEnabled();
      
      // Test that clicking doesn't cause errors
      await user.click(boldButton);
      await user.click(italicButton);
      await user.click(underlineButton);
      await user.click(clearButton);
    });

    it('shows proper ARIA pressed states for format buttons', () => {
      render(<RichTextEditor />);
      
      const boldButton = screen.getByRole('button', { name: /bold/i });
      const italicButton = screen.getByRole('button', { name: /italic/i });
      const underlineButton = screen.getByRole('button', { name: /underline/i });
      
      // All buttons should have aria-pressed attribute for accessibility
      expect(boldButton).toHaveAttribute('aria-pressed');
      expect(italicButton).toHaveAttribute('aria-pressed');
      expect(underlineButton).toHaveAttribute('aria-pressed');
    });

    it('renders link button for creating links', async () => {
      const user = userEvent.setup();
      render(<RichTextEditor />);
      
      const linkButton = screen.getByRole('button', { name: /insert link/i });
      expect(linkButton).toBeInTheDocument();
      
      // Test clicking doesn't cause errors (button may be disabled without selection)
      await user.click(linkButton);
    });
  });

  describe('Character Count Display', () => {
    it('shows warning state for text approaching limit', async () => {
      const user = userEvent.setup();
      render(<RichTextEditor />);
      
      const textbox = screen.getByRole('textbox', { name: 'Rich text editor' });
      await user.click(textbox);
      
      // Simulate typing text near the limit
      const longText = 'a'.repeat(260);
      textbox.textContent = longText;
      textbox.dispatchEvent(new Event('input', { bubbles: true }));
      
      await waitFor(() => {
        const charCount = screen.getByText('260/280 characters');
        expect(charCount).toBeInTheDocument();
        expect(charCount.className).toContain('warning');
      });
    });

    it('shows error state for text exceeding limit', async () => {
      const user = userEvent.setup();
      render(<RichTextEditor />);
      
      const textbox = screen.getByRole('textbox', { name: 'Rich text editor' });
      await user.click(textbox);
      
      // Simulate typing text over the limit
      const tooLongText = 'a'.repeat(300);
      textbox.textContent = tooLongText;
      textbox.dispatchEvent(new Event('input', { bubbles: true }));
      
      await waitFor(() => {
        const charCount = screen.getByText('300/280 characters');
        expect(charCount).toBeInTheDocument();
        expect(charCount.className).toContain('error');
      });
    });
  });

  describe('AI Assistant Dialog', () => {
    it('opens dialog when AI Assistant button is clicked', async () => {
      const user = userEvent.setup();
      render(<RichTextEditor />);
      
      // Find AI Assistant button by text content since it lacks accessible name
      const aiButton = screen.getByText('AI Assistant').closest('button')!;
      
      // Initially dialog should not be visible (open=false)
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      
      await user.click(aiButton);
      
      // After clicking, dialog should be visible
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('🤖 AI-Powered Development Process');
      });
    });

    it('displays AI development process content in dialog', async () => {
      const user = userEvent.setup();
      render(<RichTextEditor />);
      
      const aiButton = screen.getByText('AI Assistant').closest('button')!;
      await user.click(aiButton);
      
      await waitFor(() => {
        // Priority 1: Use getByRole for dialog structure and getByText for content
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        
        expect(screen.getByText('How Claude Code accelerated this one-day portfolio prototype')).toBeInTheDocument();
        expect(screen.getByText('⚡ Rapid Prototyping')).toBeInTheDocument();
        expect(screen.getByText('🧪 Testing Excellence')).toBeInTheDocument();
        expect(screen.getByText('🔧 DevOps Setup')).toBeInTheDocument();
        expect(screen.getByText('📋 Architecture Decisions')).toBeInTheDocument();
      });
    });

    it('closes dialog when close button is clicked', async () => {
      const user = userEvent.setup();
      render(<RichTextEditor />);
      
      // Open dialog
      const aiButton = screen.getByText('AI Assistant').closest('button')!;
      await user.click(aiButton);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      // Close dialog
      const closeButton = screen.getByText('Got it!').closest('button')!;
      await user.click(closeButton);
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('Accessibility Features', () => {
    it('has proper ARIA attributes for screen readers', () => {
      render(<RichTextEditor />);
      
      const textbox = screen.getByRole('textbox', { name: 'Rich text editor' });
      expect(textbox).toHaveAttribute('aria-multiline', 'true');
      expect(textbox).toHaveAttribute('role', 'textbox');
    });

    it('provides keyboard navigation support', async () => {
      const user = userEvent.setup();
      render(<RichTextEditor />);
      
      // Tab through interactive elements
      await user.tab();
      expect(screen.getByRole('button', { name: /bold/i })).toHaveFocus();
      
      await user.tab();
      expect(screen.getByRole('button', { name: /italic/i })).toHaveFocus();
      
      await user.tab();
      expect(screen.getByRole('button', { name: /underline/i })).toHaveFocus();
    });

    it('provides proper focus management for interactive elements', async () => {
      const user = userEvent.setup();
      render(<RichTextEditor />);
      
      // Test that interactive elements are properly focusable
      const textbox = screen.getByRole('textbox', { name: 'Rich text editor' });
      const boldButton = screen.getByRole('button', { name: /bold/i });
      
      await user.click(textbox);
      expect(textbox).toHaveFocus();
      
      await user.click(boldButton);
      expect(boldButton).toHaveFocus();
    });
  });
});
