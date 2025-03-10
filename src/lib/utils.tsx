export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPhoneNumber(number: number | string) {
  let numStr = number.toString().replace(/\D/g, "");
  if (numStr.length === 10) {
    return numStr.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  } else if (numStr.length === 11) {
    return numStr.replace(/(\d)(\d{3})(\d{3})(\d{4})/, "$1-$2-$3-$4");
  } else {
    return numStr;
  }
}