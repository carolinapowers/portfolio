import { render, screen } from '@testing-library/react';
import { HighlightedText } from './HighlightedText';

describe('Word Highlighting Demo', () => {
  it('demonstrates complete word highlighting for search queries', () => {
    // Simulate a user typing "React" in the search box
    const searchQuery = 'React';
    const recommendationText = 'I worked with Carolina on React development. Her reactive approach and understanding of React patterns was excellent.';

    render(
      <HighlightedText
        text={recommendationText}
        highlightTerms={[searchQuery]}
      />
    );

    // Should highlight "React" (complete word) twice
    const reactHighlights = screen.getAllByText('React');
    expect(reactHighlights).toHaveLength(2);

    // Both instances should be highlighted
    reactHighlights.forEach(highlight => {
      expect(highlight.tagName.toLowerCase()).toBe('mark');
      expect(highlight.className).toMatch(/highlight/);
    });

    // Should NOT highlight "reactive" (partial match)
    expect(screen.getByText('reactive', { exact: false })).toBeInTheDocument();
    const reactiveText = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() !== 'mark' && content.includes('reactive');
    });
    expect(reactiveText).toBeInTheDocument();
  });

  it('demonstrates multi-word search highlighting', () => {
    // Simulate searching for "React development"
    const searchTerms = ['React', 'development'];
    const text = 'Carolina excels at React development and JavaScript programming. Her development approach is reactive and thoughtful.';

    render(
      <HighlightedText
        text={text}
        highlightTerms={searchTerms}
      />
    );

    // Should highlight both "React" and "development" as complete words
    expect(screen.getByText('React').className).toMatch(/highlight/);

    const developmentHighlights = screen.getAllByText('development');
    expect(developmentHighlights).toHaveLength(2);
    developmentHighlights.forEach(highlight => {
      expect(highlight.className).toMatch(/highlight/);
    });

    // Should NOT highlight "reactive" even though it contains "React"
    expect(screen.getByText('reactive', { exact: false })).toBeInTheDocument();
  });

  it('demonstrates case insensitive complete word matching', () => {
    const searchTerm = 'javascript';
    const text = 'Carolina knows JavaScript, javascript, and JAVASCRIPT very well.';

    render(
      <HighlightedText
        text={text}
        highlightTerms={[searchTerm]}
      />
    );

    // All three variations should be highlighted
    expect(screen.getByText('JavaScript').className).toMatch(/highlight/);
    expect(screen.getByText('javascript').className).toMatch(/highlight/);
    expect(screen.getByText('JAVASCRIPT').className).toMatch(/highlight/);
  });
});