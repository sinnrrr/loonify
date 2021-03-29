import { getAntiCSRFToken } from "@blitzjs/core"

export const useRequest = (route: string): ((params?: RequestInit) => Promise<Response>) => {
  const antiCSRFToken = getAntiCSRFToken()

  const defaultParams: RequestInit = {
    credentials: "include",
    headers: {
      "anti-csrf": antiCSRFToken,
    },
  }

  const requestUrl =
    "/api/" +
    (process.env.NEXT_PUBLIC_CURRENT_API_VERSION || "v1") +
    // if route has slash at the start, don't add slash
    (route.charAt(0) === "/" ? "" : "/") +
    route

  return async (params?: RequestInit) =>
    await window.fetch(requestUrl, {
      ...defaultParams,
      ...params,
    })
}
