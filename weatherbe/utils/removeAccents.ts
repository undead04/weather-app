export const removeAccents=(str:string)=> {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
export const normalizeString=(str:string)=> {
    // Chuyển đổi sang dạng NFC (Canonical Composition)
    return str.normalize("NFC");
  }