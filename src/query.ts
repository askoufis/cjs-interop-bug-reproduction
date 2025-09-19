import { gql } from "@apollo/client";
// Uncomment the import below
// import * as Apollo from "@apollo/client";

// Example query
export const query = gql`
  query GetItems {
    items {
      id
      name
      description
    }
  }
`;
