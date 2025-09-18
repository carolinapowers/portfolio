import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { recommendations } from '../domains/recommendations/data/recommendations';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  typeDefs: gql`
    type Recommendation {
      id: ID!
      name: String!
      title: String!
      company: String!
      avatar: String!
      summary: String!
      content: String!
      skills: [String!]!
      date: String!
      relationship: String!
    }

    type StickyNote {
      id: ID!
      text: String!
      color: String!
      x: Float!
      y: Float!
      createdAt: String!
    }

    type Query {
      recommendations: [Recommendation!]!
      stickyNotes: [StickyNote!]!
    }

    type Mutation {
      createStickyNote(
        text: String!
        color: String!
        x: Float!
        y: Float!
      ): StickyNote!
      updateStickyNote(
        id: ID!
        text: String!
        x: Float!
        y: Float!
      ): StickyNote!
      deleteStickyNote(id: ID!): Boolean!
    }
  `,
  resolvers: {
    Query: {
      recommendations: () => {
        // Real LinkedIn recommendations data imported for GraphQL demo
        return recommendations;
      },
      stickyNotes: () => {
        const stored = localStorage.getItem('brainstorm-notes');
        return stored ? JSON.parse(stored) : [];
      },
    },
    Mutation: {
      createStickyNote: (_, { text, color, x, y }) => {
        const stored = localStorage.getItem('brainstorm-notes');
        const notes = stored ? JSON.parse(stored) : [];

        const newNote = {
          id: Date.now().toString(),
          text,
          color,
          x,
          y,
          createdAt: new Date().toISOString(),
        };

        notes.push(newNote);
        localStorage.setItem('brainstorm-notes', JSON.stringify(notes));

        return newNote;
      },
      updateStickyNote: (_, { id, text, x, y }) => {
        const stored = localStorage.getItem('brainstorm-notes');
        const notes = stored ? JSON.parse(stored) : [];

        const noteIndex = notes.findIndex(
          (note: { id: string }) => note.id === id
        );
        if (noteIndex !== -1) {
          notes[noteIndex] = { ...notes[noteIndex], text, x, y };
          localStorage.setItem('brainstorm-notes', JSON.stringify(notes));
          return notes[noteIndex];
        }

        return null;
      },
      deleteStickyNote: (_, { id }) => {
        const stored = localStorage.getItem('brainstorm-notes');
        const notes = stored ? JSON.parse(stored) : [];

        const filteredNotes = notes.filter(
          (note: { id: string }) => note.id !== id
        );
        localStorage.setItem('brainstorm-notes', JSON.stringify(filteredNotes));

        return true;
      },
    },
  },
});

// Initialize cache with recommendations data
client.cache.writeQuery({
  query: gql`
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
  `,
  data: {
    recommendations: recommendations,
  },
});
