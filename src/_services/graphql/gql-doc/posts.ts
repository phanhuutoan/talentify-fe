import { gql } from "@apollo/client";

export const Get100LatestPosts = gql`
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

const PostFragment = gql`
  fragment PostFragment on Post {
    _id
    isPublished
    title
    slug {
      current
    }
    categories {
      name
    }
    author {
      name
    }
    _createdAt
  }
`;

export const GetPostByAuthor = gql`
  query GetPostByAuthor($authorName: String!) {
    allPost(
      sort: { _createdAt: DESC }
      limit: 5
      where: { author: { name: { matches: $authorName } } }
    ) {
      ...PostFragment
    }
  }
  ${PostFragment}
`;

export const GetPostBySlug = gql`
  query GetPostByAuthor($keyword: String!) {
    allPost(
      sort: { _createdAt: DESC }
      limit: 5
      where: { slug: { current: { matches: $keyword } } }
    ) {
      ...PostFragment
    }
  }
  ${PostFragment}
`;

export const GetPostByTitle = gql`
  query GetPostByTitle($title: String!) {
    allPost(
      sort: { _createdAt: DESC }
      limit: 5
      where: { title: { matches: $title } }
    ) {
      ...PostFragment
    }
  }
  ${PostFragment}
`;
