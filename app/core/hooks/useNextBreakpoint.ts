import theme from "@chakra-ui/theme"

export const useNextBreakpoint = (breakpoint: string, bypass: number = 1): string => {
  if (breakpoint === "base") return "sm"

  const breakpointKeys = Object.keys(theme.breakpoints)
  const searchedBreakpointIndex = breakpointKeys.indexOf(breakpoint) + bypass

  return breakpointKeys[searchedBreakpointIndex] || ""
}
