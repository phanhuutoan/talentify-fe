type Category = {
  __typename: "Category";
  name: string;
};

type Image = {
  asset: {
    url: string;
  };
};

export type Post = {
  __typename: "Post";
  _id: string;
  isPublished: boolean;
  title: string;
  slug: {
    current: string;
  };
  shortDescription: string;
  categories: Category[];
  mainImage: Image;
  _createdAt?: string;
};

export type GetPosts = Post[];

export enum PostCategoryEnum {
  career = "Career Compass",
  trending = "Trending",
  skill = "Skills Station",
}
