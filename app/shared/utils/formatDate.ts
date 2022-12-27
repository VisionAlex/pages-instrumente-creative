export const formatDate = (
  date: string,
  options?: { includeTime?: boolean }
) => {
  return new Date(date).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(options?.includeTime && { hour: "numeric", minute: "numeric" }),
  });
};
