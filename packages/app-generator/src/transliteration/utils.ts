export function capitalizeWords(translit: string): string {
  return translit
    .split(/(\s|-)/)
    .map((part) => {
      if (part === ' ' || part === '-' || part === '') return part;
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join('');
}
