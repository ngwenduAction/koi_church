export function hasValidAdminAuthorization(authorization: string | null) {
  const expectedPassword = process.env.ADMIN_PASSWORD;
  const expectedUsername = process.env.ADMIN_USERNAME ?? "admin";

  if (!expectedPassword) {
    return false;
  }

  if (!authorization || !authorization.startsWith("Basic ")) {
    return false;
  }

  try {
    const decoded = atob(authorization.slice(6));
    const separatorIndex = decoded.indexOf(":");
    const username = separatorIndex >= 0 ? decoded.slice(0, separatorIndex) : "";
    const password = separatorIndex >= 0 ? decoded.slice(separatorIndex + 1) : "";

    return username === expectedUsername && password === expectedPassword;
  } catch {
    return false;
  }
}
