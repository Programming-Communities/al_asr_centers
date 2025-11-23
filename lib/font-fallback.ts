// Font fallback utility
export const getFontClassName = (isRTL: boolean) => {
  return isRTL 
    ? 'font-urdu' 
    : 'font-sans';
};

export const fontClasses = {
  urdu: 'font-urdu',
  english: 'font-sans',
  arabic: 'font-arabic',
};