import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { RecommendationsSection } from './RecommendationsSection';
import { GET_RECOMMENDATIONS } from '../../apollo/queries';

const mockRecommendations = [
  {
    id: '1',
    name: 'John Doe',
    title: 'Senior Engineer',
    company: 'Tech Corp',
    avatar: 'JD',
    summary: 'Great developer with excellent skills.',
    content:
      'Great developer with excellent skills and deep technical knowledge.',
    skills: ['React', 'TypeScript'],
    date: '2024-01-01',
    relationship: 'Worked together on same team',
  },
  {
    id: '2',
    name: 'Jane Smith',
    title: 'Product Manager',
    company: 'Design Co',
    avatar: 'JS',
    summary: 'Fantastic collaboration and communication.',
    content:
      'Fantastic collaboration and communication skills that drive results.',
    skills: ['Leadership', 'Strategy'],
    date: '2024-01-02',
    relationship: 'Cross-functional collaboration',
  },
];

const mocks = [
  {
    request: {
      query: GET_RECOMMENDATIONS,
    },
    result: {
      data: {
        recommendations: mockRecommendations,
      },
    },
  },
];

const errorMocks = [
  {
    request: {
      query: GET_RECOMMENDATIONS,
    },
    error: new Error('GraphQL Error'),
  },
];

describe('RecommendationsSection', () => {
  it('displays loading state initially', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RecommendationsSection />
      </MockedProvider>
    );

    expect(screen.getByText('Loading recommendations...')).toBeInTheDocument();
  });

  it('displays recommendations after loading', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RecommendationsSection />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    expect(screen.getByText('GraphQL')).toBeInTheDocument();
    expect(screen.getByText(/loaded via/)).toBeInTheDocument();
    expect(screen.getByText('LinkedIn profile')).toBeInTheDocument();
  });

  it('displays error state when GraphQL query fails', async () => {
    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <RecommendationsSection />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Error loading recommendations/)
      ).toBeInTheDocument();
    });
  });

  it('includes GraphQL mention in description', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RecommendationsSection />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('GraphQL')).toBeInTheDocument();
      expect(screen.getByText(/loaded via/)).toBeInTheDocument();
    });
  });
});
