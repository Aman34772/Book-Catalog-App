// declare type
export type IBook = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  coverImage?: string;
};
export type IReview = {
  _id: string;
  comment: string;
  rating: number;
  username: string;
  image?: string;
};
