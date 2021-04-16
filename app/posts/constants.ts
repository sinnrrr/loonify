import { PostType } from "db"

export const TITLE_FORM_KEY = "title",
  DESCRIPTION_FORM_KEY = "description",
  IMAGE_FORM_KEY = "image",
  LOCATION_FORM_KEY = "location",
  CATEGORY_FORM_KEY = "categoryId",
  TYPE_FORM_KEY = "type",
  MAX_FORM_IMAGES = 5

export const ALLOWED_POST_TYPES = Object.values(PostType) as [string, ...string[]]

export const COLUMN_BREAKPOINT = "base",
  ROW_BREAKPOINT = "md"
