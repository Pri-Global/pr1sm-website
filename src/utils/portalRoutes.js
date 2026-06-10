export const PORTAL_STANDALONE_PATHS = [
  '/portal/employee/dashboard',
  '/portal/employee/setup',
  '/portal/client/dashboard',
]

export function isPortalStandalone(pathname) {
  return PORTAL_STANDALONE_PATHS.some((path) => pathname.startsWith(path))
}
