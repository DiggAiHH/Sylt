'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type FontSize = 'default' | 'large' | 'extra-large';

interface AccessibilitySettings {
  fontSize: FontSize;
  reducedMotion: boolean;
  highContrast: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  setFontSize: (size: FontSize) => void;
  toggleHighContrast: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetSettings: () => void;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 'default',
  reducedMotion: false,
  highContrast: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

const STORAGE_KEY = 'sylt-a11y-settings';

/**
 * Accessibility Provider
 * 
 * Provides global accessibility settings that persist across sessions.
 * Supports:
 * - Font size adjustment (default, large, extra-large)
 * - High contrast mode
 * - Respects prefers-reduced-motion
 * 
 * Essential for elderly users who may need larger text or reduced animations.
 */
export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<AccessibilitySettings>;
        setSettings((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // localStorage not available or invalid JSON - use defaults
    }

    // Check system preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setSettings((prev) => ({ ...prev, reducedMotion: mediaQuery.matches }));

    const handleChange = (e: MediaQueryListEvent) => {
      setSettings((prev) => ({ ...prev, reducedMotion: e.matches }));
    };

    mediaQuery.addEventListener('change', handleChange);
    setIsHydrated(true);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Persist settings to localStorage
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      } catch {
        // localStorage not available
      }
    }
  }, [settings, isHydrated]);

  // Apply CSS custom properties for font scaling
  useEffect(() => {
    if (!isHydrated) return;

    const root = document.documentElement;
    
    // Font size scaling factor
    const fontScales: Record<FontSize, string> = {
      'default': '1',
      'large': '1.15',
      'extra-large': '1.3',
    };
    root.style.setProperty('--a11y-font-scale', fontScales[settings.fontSize]);
    
    // High contrast mode
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, [settings, isHydrated]);

  const setFontSize = useCallback((size: FontSize) => {
    setSettings((prev) => ({ ...prev, fontSize: size }));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setSettings((prev) => ({ ...prev, highContrast: !prev.highContrast }));
  }, []);

  const increaseFontSize = useCallback(() => {
    setSettings((prev) => {
      const sizes: FontSize[] = ['default', 'large', 'extra-large'];
      const currentIndex = sizes.indexOf(prev.fontSize);
      const nextIndex = Math.min(currentIndex + 1, sizes.length - 1);
      return { ...prev, fontSize: sizes[nextIndex] };
    });
  }, []);

  const decreaseFontSize = useCallback(() => {
    setSettings((prev) => {
      const sizes: FontSize[] = ['default', 'large', 'extra-large'];
      const currentIndex = sizes.indexOf(prev.fontSize);
      const nextIndex = Math.max(currentIndex - 1, 0);
      return { ...prev, fontSize: sizes[nextIndex] };
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        setFontSize,
        toggleHighContrast,
        increaseFontSize,
        decreaseFontSize,
        resetSettings,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

/**
 * Hook to access accessibility settings
 */
export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}

/**
 * Hook to check if user prefers reduced motion
 * Works outside of AccessibilityProvider
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
}
