'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import pt from './pt.json'
import en from './en.json'

type Language = 'pt' | 'en'
type Dictionary = typeof pt

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (path: string) => string
}

const dictionaries = { pt, en }

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('pt')

    useEffect(() => {
        const saved = localStorage.getItem('app-language') as Language
        if (saved) setLanguage(saved)
    }, [])

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang)
        localStorage.setItem('app-language', lang)
    }

    const t = (path: string) => {
        const keys = path.split('.')
        let result: any = dictionaries[language]

        for (const key of keys) {
            if (result[key] === undefined) return path
            result = result[key]
        }

        return result
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) throw new Error('useLanguage must be used within LanguageProvider')
    return context
}
