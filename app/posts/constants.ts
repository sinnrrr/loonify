import theme from "@chakra-ui/theme"
import { PostType } from "db"

export const TITLE_FORM_KEY = "title",
  DESCRIPTION_FORM_KEY = "description",
  IMAGES_FORM_KEY = "images",
  LOCATIONS_FORM_KEY = "locations",
  CATEGORY_FORM_KEY = "categoryId",
  TYPE_FORM_KEY = "type",
  MAX_FORM_IMAGES = 5

export const ALLOWED_POST_TYPES = Object.values(PostType) as [string, ...string[]]
export const TYPE_MATCHED_COLOR = {
  [PostType.LOST]: theme.colors.orange[200],
  [PostType.FOUND]: theme.colors.green[200],
  [PostType.THEFT]: theme.colors.red[200],
}

export const COLUMN_BREAKPOINT = "base",
  ROW_BREAKPOINT = "md"

export const postTypeToName: { [x in PostType]: string } = {
  LOST: "Загублено",
  FOUND: "Знайдено",
  THEFT: "Крадіжка",
}
