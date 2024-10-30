import { useCallback } from 'react';
import { keyboards, getPhoneticChar, getDefaultLayout } from '@/data/keyboards';

export function useKeyboardMapping(language: string, isPhonetic: boolean) {
  return useCallback((key: string, isShifted: boolean): string => {
    const layoutKey = isShifted ? `${language}_shift` : language;
    const currentKeyboard = keyboards[layoutKey as keyof typeof keyboards] || 
                          keyboards[language as keyof typeof keyboards];
    
    if (!currentKeyboard) return key;

    if (language === 'ur' && isPhonetic) {
      return getPhoneticChar(key, isShifted) || key;
    }

    for (const row of currentKeyboard) {
      const keyIndex = row.findIndex((k, index) => {
        const defaultRow = getDefaultLayout()[currentKeyboard.indexOf(row)];
        return defaultRow && defaultRow[index]?.toLowerCase() === key.toLowerCase();
      });
      
      if (keyIndex !== -1) {
        return row[keyIndex];
      }
    }

    return key;
  }, [language, isPhonetic]);
}