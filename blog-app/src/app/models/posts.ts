import { WpPost } from "../wp-model/wp-post";

export interface Posts {
  posts: WpPost[],
  totalPages: number
}