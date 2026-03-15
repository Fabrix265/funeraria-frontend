export function decodeToken(token: string): any {
  try {

    const payload = token.split('.')[1];

    const decoded = atob(payload);

    return JSON.parse(decoded);

  } catch {
    return null;
  }
}