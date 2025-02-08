import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
import { GetPosts } from "../models/Posts";

export class PostsService {
  client: ApolloClient<unknown>;

  constructor() {
    const httpLink = new HttpLink({
      uri: process.env.NEXT_PUBLIC_SANITY_GRAPHQL_API,
      fetchOptions: { next: { revalidate: 120 } },
    });
    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      link: httpLink,
    });
  }

  getLatestPost = async (limit = 6) => {
    const res = await this.client.query<{ allPost: GetPosts }>({
      query: gql`
        query GerAllPost {
          allPost(sort: { created_at: DESC }, limit: ${limit}, where:{
            isPublished: {eq: true}
          }) {
            _id
            isPublished
            title
            slug {
              current
            }
            shortDescription
            mainImage {
              asset{
                url
              }
            }
            categories {
              name
            }
          }
        }
      `,
    });

    return res;
  };
}
