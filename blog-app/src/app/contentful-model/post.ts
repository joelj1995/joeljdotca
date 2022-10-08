import { EntryFields } from "contentful";

export type CfPost = {
  title: EntryFields.Text,
  slug:  EntryFields.Text,
  content: EntryFields.RichText,
  legacyWordpressContent: EntryFields.Text,
  published: EntryFields.Date
}