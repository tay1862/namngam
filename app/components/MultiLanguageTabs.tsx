'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export type Language = 'lo' | 'th' | 'en' | 'zh';

interface Tab {
  id: Language;
  label: string;
  flag: string;
}

const tabs: Tab[] = [
  { id: 'lo', label: 'ລາວ', flag: '🇱🇦' },
  { id: 'th', label: 'ไทย', flag: '🇹🇭' },
  { id: 'en', label: 'English', flag: '🇺🇸' },
  { id: 'zh', label: '中文', flag: '🇨🇳' },
];

interface MultiLanguageTabsProps {
  children: (activeTab: Language) => React.ReactNode;
  defaultTab?: Language;
}

export default function MultiLanguageTabs({ 
  children, 
  defaultTab = 'lo' 
}: MultiLanguageTabsProps) {
  const [activeTab, setActiveTab] = useState<Language>(defaultTab);

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-amber-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">{tab.flag}</span>
              <span>{tab.label}</span>
            </span>
            
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="py-4">
        {children(activeTab)}
      </div>
    </div>
  );
}

// Helper component for input fields with language suffix
interface MultiLanguageInputProps {
  label: string;
  baseId: string;
  currentLang: Language;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'textarea';
  rows?: number;
}

export function MultiLanguageInput({
  label,
  baseId,
  currentLang,
  value,
  onChange,
  placeholder,
  required,
  type = 'text',
  rows = 4,
}: MultiLanguageInputProps) {
  const isDefault = currentLang === 'lo';
  const displayLabel = isDefault 
    ? label 
    : `${label} (${tabs.find(t => t.id === currentLang)?.label})`;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {displayLabel}
        {isDefault && required && <span className="text-red-400 ml-1">*</span>}
        {!isDefault && (
          <span className="text-gray-500 text-xs ml-2">(Optional)</span>
        )}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={isDefault && required}
          rows={rows}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-500 resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={isDefault && required}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
        />
      )}
    </div>
  );
}
