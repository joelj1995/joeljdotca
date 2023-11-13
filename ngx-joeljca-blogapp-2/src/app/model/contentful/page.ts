import { EntryFieldTypes } from "contentful";

export type CfPage = {
  contentTypeId: "page"
  fields: {
    title: EntryFieldTypes.Text
    slug:  EntryFieldTypes.Text
    content: EntryFieldTypes.RichText
    legacyWordpressContent: EntryFieldTypes.Text
  }
}