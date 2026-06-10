const displayDateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
  year: 'numeric',
});

export function formatDisplayDate(isoDate: string) {
  return displayDateFormatter.format(new Date(`${isoDate}T00:00:00Z`));
}
