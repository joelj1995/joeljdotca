import { WpContent } from "./wp-content";

export interface WpPost {
  id: number;
  date: Date;
  date_gmt: Date;
  guid: WpContent;
  modified: Date;
  modified_gmt: Date;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WpContent;
  content: WpContent;
  excerpt: WpContent;
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta?: (null)[] | null;
  categories?: (number)[] | null;
  tags?: (null)[] | null;
}