export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function isTodo(value: string): boolean {
  return value.trim().toUpperCase().startsWith("TODO");
}
