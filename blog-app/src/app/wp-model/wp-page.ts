import { WpContent } from "./wp-content";

export interface WpPage {
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
  parent: number;
  menu_order: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta?: (null)[] | null;
}