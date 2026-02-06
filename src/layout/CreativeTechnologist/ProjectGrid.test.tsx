import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectGrid } from './ProjectGrid';

// Mock the data to have a controlled set of projects
vi.mock('../../data/creativeTechnologistProjects', async () => {
  const actual = await vi.importActual<
    typeof import('../../data/creativeTechnologistProjects')
  >('../../data/creativeTechnologistProjects');
  return {
    ...actual,
    creativeTechnologistProjects: [
      {
        id: 'project-1',
        title: 'First Project',
        category: 'ai-automation' as const,
        story: 'First project story',
        technologies: ['React', 'TypeScript'],
        order: 1,
        featured: true,
        projectDetails: 'Details for first project',
      },
      {
        id: 'project-2',
        title: 'Second Project',
        category: 'learning-experiences' as const,
        story: 'Second project story',
        technologies: ['Vue', 'JavaScript'],
        order: 2,
        featured: false,
        projectDetails: 'Details for second project',
      },
      {
        id: 'project-3',
        title: 'Third Project',
        category: 'internal-tooling' as const,
        story: 'Third project story',
        technologies: ['Angular', 'TypeScript'],
        order: 3,
        featured: false,
        projectDetails: 'Details for third project',
      },
    ],
  };
});

describe('ProjectGrid - Adjacent Card Expansion', () => {
  it('expands adjacent card when a card is expanded', async () => {
    const user = userEvent.setup();
    render(<ProjectGrid />);

    // Get all "Learn More" buttons
    const learnMoreButtons = screen.getAllByRole('button', {
      name: /learn more/i,
    });

    // Click "Learn More" on the first card
    await user.click(learnMoreButtons[0]!);

    // First card should show expanded content
    expect(screen.getByText(/details for first project/i)).toBeInTheDocument();

    // Adjacent (second) card should also be expanded
    expect(
      screen.getByText(/details for second project/i)
    ).toBeInTheDocument();

    // Both buttons should now say "Show Less" (first two cards)
    const showLessButtons = screen.getAllByRole('button', {
      name: /show less/i,
    });
    expect(showLessButtons).toHaveLength(2);
  });

  it('collapses both cards when expanded card is collapsed', async () => {
    const user = userEvent.setup();
    render(<ProjectGrid />);

    const learnMoreButtons = screen.getAllByRole('button', {
      name: /learn more/i,
    });

    // Expand first card (and its adjacent card)
    await user.click(learnMoreButtons[0]!);

    // Verify both are expanded
    expect(screen.getByText(/details for first project/i)).toBeInTheDocument();
    expect(
      screen.getByText(/details for second project/i)
    ).toBeInTheDocument();

    // Click "Show Less" on the first card
    const showLessButtons = screen.getAllByRole('button', {
      name: /show less/i,
    });
    await user.click(showLessButtons[0]!);

    // Both cards should be collapsed (details hidden)
    expect(
      screen.queryByText(/details for first project/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/details for second project/i)
    ).not.toBeInTheDocument();
  });

  it('handles last card expansion without errors (no adjacent card)', async () => {
    const user = userEvent.setup();
    render(<ProjectGrid />);

    const learnMoreButtons = screen.getAllByRole('button', {
      name: /learn more/i,
    });

    // Click "Learn More" on the last card (third card, index 2)
    await user.click(learnMoreButtons[2]!);

    // Last card should be expanded
    expect(screen.getByText(/details for third project/i)).toBeInTheDocument();

    // Should not throw error even though there's no adjacent card
    const showLessButton = screen.getByRole('button', {
      name: /show less/i,
    });
    expect(showLessButton).toBeInTheDocument();
  });

  it('expands middle card and its adjacent card correctly', async () => {
    const user = userEvent.setup();
    render(<ProjectGrid />);

    const learnMoreButtons = screen.getAllByRole('button', {
      name: /learn more/i,
    });

    // Click "Learn More" on the second card (middle card)
    await user.click(learnMoreButtons[1]!);

    // Second card should be expanded
    expect(
      screen.getByText(/details for second project/i)
    ).toBeInTheDocument();

    // Third card (adjacent to second) should also be expanded
    expect(screen.getByText(/details for third project/i)).toBeInTheDocument();

    // First card should NOT be expanded
    expect(
      screen.queryByText(/details for first project/i)
    ).not.toBeInTheDocument();
  });

  it('maintains independent expansion state for different card pairs', async () => {
    const user = userEvent.setup();
    render(<ProjectGrid />);

    const learnMoreButtons = screen.getAllByRole('button', {
      name: /learn more/i,
    });

    // Expand first card pair (cards 1 and 2)
    await user.click(learnMoreButtons[0]!);

    expect(screen.getByText(/details for first project/i)).toBeInTheDocument();
    expect(
      screen.getByText(/details for second project/i)
    ).toBeInTheDocument();

    // Collapse first card pair
    const showLessButtons = screen.getAllByRole('button', {
      name: /show less/i,
    });
    await user.click(showLessButtons[0]!);

    // Verify they're collapsed
    expect(
      screen.queryByText(/details for first project/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/details for second project/i)
    ).not.toBeInTheDocument();

    // Now expand the last card (should work independently)
    const learnMoreButtonsAfter = screen.getAllByRole('button', {
      name: /learn more/i,
    });
    await user.click(learnMoreButtonsAfter[2]!);

    expect(screen.getByText(/details for third project/i)).toBeInTheDocument();
  });

  it('updates aria-expanded attribute correctly for both cards', async () => {
    const user = userEvent.setup();
    render(<ProjectGrid />);

    const learnMoreButtons = screen.getAllByRole('button', {
      name: /learn more/i,
    });

    // Initially all buttons should have aria-expanded="false"
    learnMoreButtons.forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    // Expand first card
    await user.click(learnMoreButtons[0]!);

    // Get updated buttons
    const buttons = screen.getAllByRole('button', {
      name: /show less|learn more/i,
    });

    // First two buttons should have aria-expanded="true"
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');

    // Third button should still be false
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'false');
  });

  it('displays correct button text for expanded and collapsed states', async () => {
    const user = userEvent.setup();
    render(<ProjectGrid />);

    // All buttons should say "Learn More" initially
    const initialButtons = screen.getAllByRole('button', {
      name: /learn more/i,
    });
    expect(initialButtons).toHaveLength(3);

    // Click first button
    await user.click(initialButtons[0]!);

    // First two buttons should now say "Show Less"
    const showLessButtons = screen.getAllByRole('button', {
      name: /show less/i,
    });
    expect(showLessButtons).toHaveLength(2);

    // Third button should still say "Learn More"
    const remainingLearnMore = screen.getAllByRole('button', {
      name: /learn more/i,
    });
    expect(remainingLearnMore).toHaveLength(1);
  });

  it('shows Project Details and Technologies Used sections when expanded', async () => {
    const user = userEvent.setup();
    render(<ProjectGrid />);

    const learnMoreButtons = screen.getAllByRole('button', {
      name: /learn more/i,
    });

    // Expand first card
    await user.click(learnMoreButtons[0]!);

    // Check for section headings (using heading role)
    const projectDetailsHeadings = screen.getAllByRole('heading', {
      name: /project details/i,
      level: 4,
    });
    expect(projectDetailsHeadings.length).toBeGreaterThanOrEqual(1);

    const technologiesHeadings = screen.getAllByRole('heading', {
      name: /technologies used/i,
      level: 4,
    });
    expect(technologiesHeadings.length).toBeGreaterThanOrEqual(1);
  });
});

describe('ProjectGrid - Filter Integration with Expansion', () => {
  it('clears expanded state is maintained after filtering', async () => {
    const user = userEvent.setup();
    render(<ProjectGrid />);

    // Expand first card
    const learnMoreButtons = screen.getAllByRole('button', {
      name: /learn more/i,
    });
    await user.click(learnMoreButtons[0]!);

    // Verify expansion
    expect(screen.getByText(/details for first project/i)).toBeInTheDocument();

    // Click featured filter
    const featuredCheckbox = screen.getByRole('checkbox', {
      name: /show featured only/i,
    });
    await user.click(featuredCheckbox);

    // After filtering, only featured project should be visible
    expect(screen.getByText('First Project')).toBeInTheDocument();

    // The expanded card should still show details
    expect(screen.getByText(/details for first project/i)).toBeInTheDocument();
  });
});

describe('ProjectGrid - Filter Button Active States', () => {
  it('shows no button as active on initial render', () => {
    render(<ProjectGrid />);

    const allProjectsButton = screen.getByRole('button', {
      name: /all projects/i,
    });
    const aiButton = screen.getByRole('button', {
      name: /ai & emerging tech/i,
    });

    // No button should be active initially
    expect(allProjectsButton.className).not.toContain('active');
    expect(aiButton.className).not.toContain('active');
  });

  it('changes active state when category filter is clicked', async () => {
    const user = userEvent.setup();
    render(<ProjectGrid />);

    // Get the "All Projects" button
    const allProjectsButton = screen.getByRole('button', {
      name: /all projects/i,
    });

    // Initially "All Projects" should NOT be active
    expect(allProjectsButton.className).not.toContain('active');

    // Click on "AI & Emerging Tech" category button
    const aiCategoryButton = screen.getByRole('button', {
      name: /ai & emerging tech/i,
    });

    // Initially should not be active
    expect(aiCategoryButton.className).not.toContain('active');

    // Click the AI category button
    await user.click(aiCategoryButton);

    // Now AI category button should be active
    expect(aiCategoryButton.className).toContain('active');

    // "All Projects" should no longer be active
    expect(allProjectsButton.className).not.toContain('active');
  });

  it('maintains active state when clicking the same category button', async () => {
    const user = userEvent.setup();
    render(<ProjectGrid />);

    const aiCategoryButton = screen.getByRole('button', {
      name: /ai & emerging tech/i,
    });

    // Click once
    await user.click(aiCategoryButton);
    expect(aiCategoryButton.className).toContain('active');

    // Click again - should remain active
    await user.click(aiCategoryButton);
    expect(aiCategoryButton.className).toContain('active');
  });

  it('switches active state between different category buttons', async () => {
    const user = userEvent.setup();
    render(<ProjectGrid />);

    const aiCategoryButton = screen.getByRole('button', {
      name: /ai & emerging tech/i,
    });
    const learningButton = screen.getByRole('button', {
      name: /learning experiences/i,
    });

    // Click AI category
    await user.click(aiCategoryButton);
    expect(aiCategoryButton.className).toContain('active');
    expect(learningButton.className).not.toContain('active');

    // Click Learning Experiences category
    await user.click(learningButton);
    expect(learningButton.className).toContain('active');
    expect(aiCategoryButton.className).not.toContain('active');
  });

  it('returns to "All Projects" active state when clicked after selecting a category', async () => {
    const user = userEvent.setup();
    render(<ProjectGrid />);

    const allProjectsButton = screen.getByRole('button', {
      name: /all projects/i,
    });
    const aiCategoryButton = screen.getByRole('button', {
      name: /ai & emerging tech/i,
    });

    // Click AI category
    await user.click(aiCategoryButton);
    expect(aiCategoryButton.className).toContain('active');
    expect(allProjectsButton.className).not.toContain('active');

    // Click "All Projects" again
    await user.click(allProjectsButton);
    expect(allProjectsButton.className).toContain('active');
    expect(aiCategoryButton.className).not.toContain('active');
  });

  it('maintains active state after featured checkbox is toggled', async () => {
    const user = userEvent.setup();
    render(<ProjectGrid />);

    const aiCategoryButton = screen.getByRole('button', {
      name: /ai & emerging tech/i,
    });
    const featuredCheckbox = screen.getByRole('checkbox', {
      name: /show featured only/i,
    });

    // Click AI category
    await user.click(aiCategoryButton);
    expect(aiCategoryButton.className).toContain('active');

    // Toggle featured checkbox
    await user.click(featuredCheckbox);

    // AI category button should still be active
    expect(aiCategoryButton.className).toContain('active');
    expect(featuredCheckbox).toBeChecked();
  });

  it('ensures only one filter button has active state at a time', async () => {
    const user = userEvent.setup();
    render(<ProjectGrid />);

    // Get all filter buttons (excluding Learn More buttons)
    const allProjectsButton = screen.getByRole('button', {
      name: /all projects/i,
    });
    const aiButton = screen.getByRole('button', {
      name: /ai & emerging tech/i,
    });
    const learningButton = screen.getByRole('button', {
      name: /learning experiences/i,
    });
    const internalButton = screen.getByRole('button', {
      name: /internal tools & automation/i,
    });

    // Initially no button should be active
    expect(allProjectsButton.className).not.toContain('active');
    expect(aiButton.className).not.toContain('active');
    expect(learningButton.className).not.toContain('active');
    expect(internalButton.className).not.toContain('active');

    // Click AI button
    await user.click(aiButton);
    expect(allProjectsButton.className).not.toContain('active');
    expect(aiButton.className).toContain('active');
    expect(learningButton.className).not.toContain('active');
    expect(internalButton.className).not.toContain('active');
  });
});
