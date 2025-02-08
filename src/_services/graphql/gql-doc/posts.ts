import { gql } from "@apollo/client";

export const Get100LatestPosts = gql`
  # Write your query or mutation here
  query GerAllPost {
    allPost(sort: { _createdAt: DESC }, offset: 6, limit: 30) {
      _id
      isPublished
      title
      slug {
        current
      }
      mainImage {
        asset {
          url
        }
      }
      categories {
        name
      }
      _createdAt
    }
  }
`;
