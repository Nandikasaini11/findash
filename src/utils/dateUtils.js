export function formatDate(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getMonthYear(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export function getMonthKey(dateStr) {
  return dateStr.substring(0, 7);
}

export const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
