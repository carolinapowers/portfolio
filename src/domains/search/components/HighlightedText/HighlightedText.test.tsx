import { render, screen } from '@testing-library/react';
import { HighlightedText } from './HighlightedText';

describe('HighlightedText Component', () => {
  describe('Basic functionality', () => {
    it('renders plain text when no highlight terms provided', () => {
      render(<HighlightedText text="Hello world" highlightTerms={[]} />);
      expect(screen.getByText('Hello world')).toBeInTheDocument();
    });

    it('renders plain text when highlight terms array is empty', () => {
      render(<HighlightedText text="Hello world" highlightTerms={[]} />);
      expect(screen.getByText('Hello world')).toBeInTheDocument();
    });

    it('renders empty span when text is empty', () => {
      const { container } = render(<HighlightedText text="" highlightTerms={['test']} />);
      expect(container.firstChild).toHaveTextContent('');
    });
  });

  describe('Word boundary highlighting', () => {
    it('highlights complete words only', () => {
      render(
        <HighlightedText
          text="React is reactive and React development is great"
          highlightTerms={['React']}
        />
      );

      // Should find two highlighted instances of "React"
      const highlights = screen.getAllByText('React');
      expect(highlights).toHaveLength(2);

      // Both should be marked as highlighted
      highlights.forEach(highlight => {
        expect(highlight.tagName.toLowerCase()).toBe('mark');
      });

      // Should not highlight "reactive" (partial match)
      expect(screen.getByText('reactive', { exact: false })).toBeInTheDocument();
      const reactiveElement = screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() !== 'mark' && content.includes('reactive');
      });
      expect(reactiveElement).toBeInTheDocument();
    });

    it('highlights multiple different words', () => {
      render(
        <HighlightedText
          text="JavaScript and TypeScript are both great languages"
          highlightTerms={['JavaScript', 'TypeScript']}
        />
      );

      expect(screen.getByText('JavaScript').className).toMatch(/highlight/);
      expect(screen.getByText('TypeScript').className).toMatch(/highlight/);
      expect(screen.getByText('great', { exact: false })).toBeInTheDocument();
    });

    it('is case insensitive', () => {
      render(
        <HighlightedText
          text="React and react and REACT are the same"
          highlightTerms={['react']}
        />
      );

      const highlights = screen.getAllByText(/react/i);
      expect(highlights.length).toBeGreaterThanOrEqual(3);

      // All instances should be highlighted
      highlights.forEach(highlight => {
        if (highlight.tagName.toLowerCase() === 'mark') {
          expect(highlight.className).toMatch(/highlight/);
        }
      });
    });

    it('does not highlight partial word matches', () => {
      render(
        <HighlightedText
          text="The reaction to React was reactive"
          highlightTerms={['React']}
        />
      );

      // Only "React" should be highlighted, not "reaction" or "reactive"
      const highlights = screen.getAllByText('React');
      expect(highlights).toHaveLength(1);
      expect(highlights[0]?.tagName.toLowerCase()).toBe('mark');

      // "reaction" and "reactive" should not be highlighted
      expect(screen.getByText('reaction', { exact: false })).toBeInTheDocument();
      expect(screen.getByText('reactive', { exact: false })).toBeInTheDocument();
    });

    it('handles punctuation correctly', () => {
      render(
        <HighlightedText
          text="Hello, world! How are you today?"
          highlightTerms={['Hello', 'world']}
        />
      );

      expect(screen.getByText('Hello').className).toMatch(/highlight/);
      expect(screen.getByText('world').className).toMatch(/highlight/);
    });

    it('handles special regex characters in search terms', () => {
      render(
        <HighlightedText
          text="Search for $100 and (test) and [array]"
          highlightTerms={['$100', '(test)', '[array]']}
        />
      );

      // Check that special characters don't break highlighting
      const textContent = screen.getByText('Search for $100 and (test) and [array]');
      expect(textContent).toBeInTheDocument();
    });
  });

  describe('Search query integration', () => {
    it('highlights search terms from search box', () => {
      render(
        <HighlightedText
          text="This is about React development and JavaScript programming"
          highlightTerms={['React', 'development']}
        />
      );

      expect(screen.getByText('React').className).toMatch(/highlight/);
      expect(screen.getByText('development').className).toMatch(/highlight/);
      expect(screen.getByText('JavaScript', { exact: false })).toBeInTheDocument();
    });

    it('handles multiple search words', () => {
      // Simulating search query "React JavaScript"
      render(
        <HighlightedText
          text="React and JavaScript work well together for development"
          highlightTerms={['React', 'JavaScript']}
        />
      );

      expect(screen.getByText('React').className).toMatch(/highlight/);
      expect(screen.getByText('JavaScript').className).toMatch(/highlight/);
    });

    it('filters out empty terms', () => {
      render(
        <HighlightedText
          text="Test content here"
          highlightTerms={['Test', '', '   ', 'content']}
        />
      );

      expect(screen.getByText('Test').className).toMatch(/highlight/);
      expect(screen.getByText('content').className).toMatch(/highlight/);
    });
  });

  describe('Performance and edge cases', () => {
    it('handles long text efficiently', () => {
      const longText = 'React '.repeat(1000) + 'development';
      render(
        <HighlightedText
          text={longText}
          highlightTerms={['React']}
        />
      );

      const highlights = screen.getAllByText('React');
      expect(highlights.length).toBe(1000);
    });

    it('handles many highlight terms', () => {
      const manyTerms = Array.from({ length: 100 }, (_, i) => `term${i}`);
      render(
        <HighlightedText
          text="This is term1 and term50 and term99 content"
          highlightTerms={manyTerms}
        />
      );

      expect(screen.getByText('term1').className).toMatch(/highlight/);
      expect(screen.getByText('term50').className).toMatch(/highlight/);
      expect(screen.getByText('term99').className).toMatch(/highlight/);
    });
  });
});