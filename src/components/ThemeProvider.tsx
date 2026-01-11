'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark')

    useEffect(() => {
        const saved = localStorage.getItem('app-theme') as Theme
        if (saved) {
            setTheme(saved)
            document.documentElement.classList.toggle('light', saved === 'light')

            // Apply body styles
            if (saved === 'light') {
                document.body.style.backgroundColor = '#F0F2F5'
                document.body.style.color = '#111827'
            } else {
                document.body.style.backgroundColor = '#09090B'
                document.body.style.color = '#FAFAFA'
            }
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        localStorage.setItem('app-theme', newTheme)
        document.documentElement.classList.toggle('light', newTheme === 'light')

        // Update body styles
        if (newTheme === 'light') {
            document.body.style.backgroundColor = '#F0F2F5'
            document.body.style.color = '#111827'
        } else {
            document.body.style.backgroundColor = '#09090B'
            document.body.style.color = '#FAFAFA'
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={theme}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) throw new Error('useTheme must be used within ThemeProvider')
    return context
}
