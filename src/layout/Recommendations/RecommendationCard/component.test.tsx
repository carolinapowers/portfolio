import { render, screen } from '@testing-library/react';
import { RecommendationCard } from './component';
import type { Recommendation } from '../../../data/recommendations';

const mockRecommendation: Recommendation = {
  id: '1',
  name: 'John Doe',
  title: 'Senior Engineer',
  company: 'TechCorp',
  avatar: 'JD',
  summary: 'Great developer with excellent skills.',
  content:
    'John is an exceptional developer who consistently delivers high-quality work. His technical expertise and collaborative spirit make him a valuable team member.',
  skills: ['React', 'TypeScript', 'GraphQL'],
  date: '2024-01-15',
  relationship: 'Colleague',
};

describe('RecommendationCard Component', () => {
  it('renders recommendation name', () => {
    render(<RecommendationCard recommendation={mockRecommendation} activeFilters={[]} sortBy="date" sortOrder="desc" />);
    // Use heading role since name is in an h3 element
    expect(
      screen.getByRole('heading', { name: 'John Doe' })
    ).toBeInTheDocument();
  });

  it('renders recommendation title and company', () => {
    render(<RecommendationCard recommendation={mockRecommendation} activeFilters={[]} />);
    // Using getByText for non-interactive content (Priority 1)
    expect(screen.getByText('Senior Engineer @ TechCorp')).toBeInTheDocument();
  });

  it('renders recommendation content', () => {
    render(<RecommendationCard recommendation={mockRecommendation} activeFilters={[]} />);
    // Using getByText with regex for partial content matching (Priority 1)
    expect(
      screen.getByText(/John is an exceptional developer/)
    ).toBeInTheDocument();
  });

  it('renders avatar', () => {
    render(<RecommendationCard recommendation={mockRecommendation} activeFilters={[]} />);
    // Avatar text is still the most accessible way to find this content
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders all skills when total is less than minimum display count', () => {
    render(<RecommendationCard recommendation={mockRecommendation} activeFilters={[]} />);
    // Using getByText for skill labels (Priority 1 - non-interactive content)
    // With new logic, shows at least 6 skills by default - since we only have 3, all show
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('GraphQL')).toBeInTheDocument();
  });

  it('displays skills as interactive elements', () => {
    render(<RecommendationCard recommendation={mockRecommendation} activeFilters={[]} />);
    // Using getByText to find skill elements (Priority 1)
    const reactSkill = screen.getByText('React');
    const typescriptSkill = screen.getByText('TypeScript');
    const graphqlSkill = screen.getByText('GraphQL');

    // All skills should be rendered and interactive
    expect(reactSkill).toBeInTheDocument();
    expect(typescriptSkill).toBeInTheDocument();
    expect(graphqlSkill).toBeInTheDocument();
  });
});
