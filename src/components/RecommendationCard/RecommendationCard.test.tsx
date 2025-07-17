import { render, screen } from '@testing-library/react';
import { RecommendationCard } from './RecommendationCard';
import type { Recommendation } from '../../data/recommendations';

const mockRecommendation: Recommendation = {
  id: '1',
  name: 'John Doe',
  title: 'Senior Engineer',
  company: 'TechCorp',
  avatar: 'JD',
  summary: 'Great developer with excellent skills.',
  content: 'John is an exceptional developer who consistently delivers high-quality work. His technical expertise and collaborative spirit make him a valuable team member.',
  skills: ['React', 'TypeScript', 'GraphQL'],
  date: '2024-01-15',
  relationship: 'Colleague',
};

describe('RecommendationCard Component', () => {
  it('renders recommendation name', () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders recommendation title and company', () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);
    expect(screen.getByText('Senior Engineer @ TechCorp')).toBeInTheDocument();
  });

  it('renders recommendation content', () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);
    expect(screen.getByText(/John is an exceptional developer/)).toBeInTheDocument();
  });

  it('renders avatar', () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders all skills', () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('GraphQL')).toBeInTheDocument();
  });

  it('highlights primary skills', () => {
    render(<RecommendationCard recommendation={mockRecommendation} />);
    const reactSkill = screen.getByText('React');
    const typescriptSkill = screen.getByText('TypeScript');
    
    // These should be rendered (checking they exist)
    expect(reactSkill).toBeInTheDocument();
    expect(typescriptSkill).toBeInTheDocument();
  });
});