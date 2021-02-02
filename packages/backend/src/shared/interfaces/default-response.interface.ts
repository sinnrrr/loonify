export interface PaginationResponse {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export interface ResultResponse {
  statusCode: number
  message: string
  errors?: string[]
}

export interface MetaResponse {
  apiVersion: number
  appVersion: string
  pagination?: PaginationResponse
}

export interface LinksResponse {
  first: string
  previous: string
  next: string
  last: string
}

export interface DefaultResponse<T> {
  data: T
  result: ResultResponse
  meta: MetaResponse
  links?: LinksResponse
}
