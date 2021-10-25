import { getAntiCSRFToken } from "blitz"

export const API_PREFIX = "/api/" + (process.env.NEXT_PUBLIC_CURRENT_API_VERSION || "v0")

export const generateApiUrl = (route: string) => {
  return (
    API_PREFIX +
    // if route has slash at the start, don't add slash
    (route.charAt(0) === "/" ? "" : "/") +
    route
  )
}

export const useRequest = (route: string): ((params?: RequestInit) => Promise<Response>) => {
  const antiCSRFToken = getAntiCSRFToken()

  const defaultParams: RequestInit = {
    credentials: "include",
    headers: {
      "anti-csrf": antiCSRFToken,
    },
  }

  return async (params?: RequestInit) =>
    await window.fetch(generateApiUrl(route), {
      ...defaultParams,
      ...params,
    })
}
