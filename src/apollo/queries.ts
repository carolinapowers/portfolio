import { gql } from '@apollo/client';

export const GET_RECOMMENDATIONS = gql`
  query GetRecommendations {
    recommendations {
      id
      name
      title
      company
      avatar
      text
      skills
    }
  }
`;

export const GET_STICKY_NOTES = gql`
  query GetStickyNotes {
    stickyNotes {
      id
      text
      color
      x
      y
      createdAt
    }
  }
`;

export const CREATE_STICKY_NOTE = gql`
  mutation CreateStickyNote(
    $text: String!
    $color: String!
    $x: Float!
    $y: Float!
  ) {
    createStickyNote(text: $text, color: $color, x: $x, y: $y) {
      id
      text
      color
      x
      y
      createdAt
    }
  }
`;

export const UPDATE_STICKY_NOTE = gql`
  mutation UpdateStickyNote($id: ID!, $text: String!, $x: Float!, $y: Float!) {
    updateStickyNote(id: $id, text: $text, x: $x, y: $y) {
      id
      text
      color
      x
      y
      createdAt
    }
  }
`;

export const DELETE_STICKY_NOTE = gql`
  mutation DeleteStickyNote($id: ID!) {
    deleteStickyNote(id: $id)
  }
`;
