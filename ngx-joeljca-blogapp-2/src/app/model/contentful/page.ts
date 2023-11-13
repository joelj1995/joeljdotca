import { EntryFields } from "contentful";

export type CfPage = {
  title: EntryFields.Text,
  slug:  EntryFields.Text,
  content: EntryFields.RichText,
  legacyWordpressContent: EntryFields.Text,
}