const DEFAULT_RELEASE_DATE = "2026-01-01T00:00:00.000Z";

const parseReleaseDate = (value?: string): Date => {
  const fallback = new Date(DEFAULT_RELEASE_DATE);
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
};

export const getReleaseDate = (): Date => {
  return parseReleaseDate(import.meta.env.PUBLIC_RELEASE_DATE);
};

export const isBeforeRelease = (now: Date = new Date()): boolean => {
  return now.getTime() < getReleaseDate().getTime();
};

