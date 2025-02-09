import { useLazyQuery } from "@apollo/client";
import { GetPosts } from "../graphql/models/Posts";
import {
  GetPostByAuthor,
  GetPostBySlug,
  GetPostByTitle,
} from "../graphql/gql-doc/posts";
import { uniqBy } from "lodash";

export const useSearchPost = () => {
  const [getPostByTitle, { data: dataTitle, loading: titleLoading }] =
    useLazyQuery<{
      allPost: GetPosts;
    }>(GetPostByTitle);

  const [getPostByAuthor, { data: dataAuthor, loading: authorLoading }] =
    useLazyQuery<{
      allPost: GetPosts;
    }>(GetPostByAuthor);

  const [getPostBySlug, { data: dataSlug, loading: slugLoading }] =
    useLazyQuery<{
      allPost: GetPosts;
    }>(GetPostBySlug);

  const listPostByTitle = dataTitle?.allPost || [];
  const listPostByAuthor = dataAuthor?.allPost || [];
  const listPostBySlug = dataSlug?.allPost || [];

  // get unique post by lodash
  const listPost = [...listPostByTitle, ...listPostByAuthor, ...listPostBySlug];
  const uniqueListPost = uniqBy(listPost, "_id");

  return {
    searchedPosts: uniqueListPost,
    loading: titleLoading || authorLoading || slugLoading,
    searchPostFn: (keyword: string) => {
      getPostByTitle({ variables: { title: keyword } });
      getPostByAuthor({ variables: { authorName: keyword } });
      getPostBySlug({ variables: { keyword } });
    },
  };
};
