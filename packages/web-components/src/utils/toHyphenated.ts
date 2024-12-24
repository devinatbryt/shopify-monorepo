export default function toHyphenated(str: string): string {
  return str
    .replace(/([A-Z])/g, "-$1") // Insert hyphen before uppercase letters
    .toLowerCase(); // Convert the entire string to lowercase
}
