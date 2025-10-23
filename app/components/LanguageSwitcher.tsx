'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';
import { useLocale } from '../contexts/LocaleContext';

const languages = [
  { code: 'lo', name: 'ລາວ', flag: '🇱🇦' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const switchLanguage = (newLocale: 'lo' | 'th' | 'en' | 'zh') => {
    setLocale(newLocale);
    setIsOpen(false);
    // No reload needed - components will re-render automatically
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-pink-200 rounded-full hover:border-pink-400 transition-colors"
      >
        <Globe size={18} className="text-pink-600" />
        <span className="font-medium text-gray-800">{currentLanguage.flag}</span>
        <span className="hidden md:inline font-medium text-gray-800">{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border-2 border-pink-200 overflow-hidden z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-pink-50 transition-colors ${
                  locale === lang.code ? 'bg-pink-100' : ''
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="font-medium text-gray-800">{lang.name}</span>
                {locale === lang.code && (
                  <span className="ml-auto text-pink-600 font-bold">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
