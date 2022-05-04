export function isProd(): boolean {
  return !!process.env.NODE_ENV && process.env.NODE_ENV !== 'dev';
}
