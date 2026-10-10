/**
 * Prefix semua path aset public dengan base URL Vite.
 * Dev = "/", production GitHub Pages = "/work-innet/".
 * (Referensi di index.html & CSS direbase otomatis oleh Vite — helper ini
 * hanya untuk string path runtime di TS/TSX.)
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  const clean = path.replace(/^\/+/, "");
  return `${base.replace(/\/+$/, "")}/${clean}`;
}
