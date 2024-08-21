export const removeAccents=(str:string)=> {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
export const normalizeString=(str:string)=> {
    // Chuyển đổi sang dạng NFC (Canonical Composition)
    return str.normalize("NFC");
  }
  export const removeDiacritics=(str:string)=> {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
