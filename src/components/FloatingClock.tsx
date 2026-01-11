'use client'

import { useState, useEffect, useRef } from 'react'
import { Clock, Minimize2, Maximize2, X } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export function FloatingClock() {
    const { language } = useLanguage()
    const [time, setTime] = useState(new Date())
    const [isMinimized, setIsMinimized] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [isMounted, setIsMounted] = useState(false)
    const [position, setPosition] = useState({ x: 20, y: 20 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
    const clockRef = useRef<HTMLDivElement>(null)

    // Only render after mount to avoid hydration mismatch
    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    // Handle dragging
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                setPosition({
                    x: e.clientX - dragOffset.x,
                    y: e.clientY - dragOffset.y
                })
            }
        }

        const handleMouseUp = () => {
            setIsDragging(false)
        }

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging, dragOffset])

    const handleMouseDown = (e: React.MouseEvent) => {
        if (clockRef.current) {
            const rect = clockRef.current.getBoundingClientRect()
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            })
            setIsDragging(true)
        }
    }

    // Don't render until mounted (avoid hydration mismatch)
    if (!isMounted) return null

    if (!isVisible) {
        return (
            <button
                onClick={() => setIsVisible(true)}
                className="fixed bottom-4 right-4 p-3 bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-colors z-[9999]"
                title="Show Clock"
            >
                <Clock size={20} />
            </button>
        )
    }

    const formatTime = () => {
        return time.toLocaleTimeString(language === 'pt' ? 'pt-PT' : 'en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    }

    const formatDate = () => {
        return time.toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div
            ref={clockRef}
            className="fixed z-[9999] select-none"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? 'grabbing' : 'grab'
            }}
        >
            <div className="glass-card border border-white/20 overflow-hidden backdrop-blur-xl shadow-2xl">
                {/* Header */}
                <div
                    className="flex items-center justify-between px-3 py-2 bg-blue-600/20 border-b border-white/10"
                    onMouseDown={handleMouseDown}
                >
                    <div className="flex items-center gap-2">
                        <Clock size={14} className="text-blue-400" />
                        <span className="text-xs font-bold text-white">
                            {language === 'pt' ? 'Relógio' : 'Clock'}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setIsMinimized(!isMinimized)}
                            className="p-1 hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
                            title={isMinimized ? 'Maximize' : 'Minimize'}
                        >
                            {isMinimized ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
                        </button>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="p-1 hover:bg-white/10 transition-colors text-zinc-400 hover:text-red-400"
                            title="Close"
                        >
                            <X size={12} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                {!isMinimized && (
                    <div className="p-4 space-y-2 min-w-[280px]">
                        {/* Time */}
                        <div className="text-center">
                            <div className="text-4xl font-black text-gradient tabular-nums">
                                {formatTime()}
                            </div>
                        </div>

                        {/* Date */}
                        <div className="text-center pt-2 border-t border-white/10">
                            <div className="text-sm text-zinc-400 capitalize">
                                {formatDate()}
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="flex justify-between text-xs text-zinc-500 pt-2 border-t border-white/10">
                            <span>UTC {time.getTimezoneOffset() / -60 > 0 ? '+' : ''}{time.getTimezoneOffset() / -60}</span>
                            <span>Week {Math.ceil((time.getDate() + 6 - time.getDay()) / 7)}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
