export function removeCpfDots(cpfWithDots: string): string {
  return cpfWithDots.replace(/\D/g, "");
}
