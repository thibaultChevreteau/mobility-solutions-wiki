export const generateSlug = (name: string) => {
  return name
    .toLowerCase() // Convert to lowercase
    .normalize("NFD") // Normalize to decomposed form
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
}
