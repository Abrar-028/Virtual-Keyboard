import { useCallback } from 'react';
import { translations } from '@/data/translations';

type Language = keyof typeof translations;
type TranslationKeys = keyof typeof translations.en;
type NestedKeys<T> = {
  [K in keyof T]: T[K] extends object
    ? `${string & K}.${string & keyof T[K]}`
    : K;
}[keyof T];

export function useTranslations(language: Language = 'en') {
  const t = useCallback(
    (key: NestedKeys<typeof translations.en>) => {
      const [category, messageKey] = key.split('.') as [TranslationKeys, string];
      return translations[language]?.[category]?.[messageKey] || translations.en[category][messageKey];
    },
    [language]
  );

  return { t };
}