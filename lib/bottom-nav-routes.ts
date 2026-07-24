// Single source of truth for which routes render the mobile BottomNav.
// Used by ConditionalBottomNav (to decide whether to render it) and by
// CookieBanner (to decide whether it needs to sit above the nav instead
// of flush against the bottom edge). Keep these in sync by importing
// this constant rather than hardcoding the path list in more than one place.
export const BOTTOM_NAV_PATHS = ['/', '/tools', '/vehicles', '/tools/document-generator', '/blog'];

export function hasBottomNav(pathname: string): boolean {
  return BOTTOM_NAV_PATHS.includes(pathname);
}
