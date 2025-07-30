import { gql } from '@apollo/client';

export const GET_RECOMMENDATIONS = gql`
  query GetRecommendations {
    recommendations {
      id
      name
      title
      company
      avatar
      summary
      content
      skills
      date
      relationship
    }
  }
`;

