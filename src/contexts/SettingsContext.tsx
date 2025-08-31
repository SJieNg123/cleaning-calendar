"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SettingsData {
  language: "en" | "zh-TW";
  theme: "light" | "dark" | "system";
}

interface SettingsContextType {
  settings: SettingsData;
  updateLanguage: (language: "en" | "zh-TW") => void;
  updateTheme: (theme: "light" | "dark" | "system") => void;
  t: (key: string) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const translations = {
  en: {
    // Dashboard
    "dashboard.title": "Home Management System",
    "dashboard.description": "Manage your home efficiently with our comprehensive tools",
    "dashboard.activeServices": "Active Services",
    "dashboard.totalServices": "Total Services",
    "dashboard.comingSoon": "Coming Soon",
    "dashboard.availableServices": "Available Services",
    "dashboard.recentActivity": "Recent Activity",
    "dashboard.openService": "Open Service",
    "dashboard.comingSoonButton": "Coming Soon",
    
    // Navigation
    "nav.homeManager": "Home Manager",
    "nav.dashboard": "Dashboard",
    "nav.cleaningCalendar": "Cleaning Calendar",
    "nav.shoppingList": "Shopping List",
    "nav.maintenance": "Maintenance",
    "nav.roommates": "Roommates",
    "nav.settings": "Settings",
    
    // Services
    "service.cleaningCalendar.title": "Cleaning Calendar",
    "service.cleaningCalendar.description": "Manage your home cleaning schedule with rotating assignments",
    "service.shoppingList.title": "Shopping List",
    "service.shoppingList.description": "Track household groceries and shopping items",
    "service.maintenance.title": "Home Maintenance",
    "service.maintenance.description": "Schedule and track home maintenance tasks",
    "service.roommates.title": "Roommate Management",
    "service.roommates.description": "Manage shared expenses and roommate information",
    "service.settings.title": "System Settings",
    "service.settings.description": "Configure your home management preferences",
    
    // Activity
    "activity.cleaningCalendarActive": "Cleaning Calendar service is now active",
    "activity.shoppingListComing": "Shopping List service coming soon",
    "activity.maintenanceComing": "Home Maintenance service coming soon",
    "activity.justNow": "Just now",
    "activity.inDevelopment": "In development",
  },
  "zh-TW": {
    // Dashboard
    "dashboard.title": "家庭管理系統",
    "dashboard.description": "使用我們的綜合工具高效管理您的家庭",
    "dashboard.activeServices": "活躍服務",
    "dashboard.totalServices": "總服務數",
    "dashboard.comingSoon": "即將推出",
    "dashboard.availableServices": "可用服務",
    "dashboard.recentActivity": "最近活動",
    "dashboard.openService": "開啟服務",
    "dashboard.comingSoonButton": "即將推出",
    
    // Navigation
    "nav.homeManager": "家庭管理",
    "nav.dashboard": "儀表板",
    "nav.cleaningCalendar": "清潔日曆",
    "nav.shoppingList": "購物清單",
    "nav.maintenance": "維護",
    "nav.roommates": "室友管理",
    "nav.settings": "設定",
    
    // Services
    "service.cleaningCalendar.title": "清潔日曆",
    "service.cleaningCalendar.description": "管理您的家庭清潔時間表與輪流分配",
    "service.shoppingList.title": "購物清單",
    "service.shoppingList.description": "追蹤家庭雜貨和購物項目",
    "service.maintenance.title": "家庭維護",
    "service.maintenance.description": "安排和追蹤家庭維護任務",
    "service.roommates.title": "室友管理",
    "service.roommates.description": "管理共同費用和室友資訊",
    "service.settings.title": "系統設定",
    "service.settings.description": "配置您的家庭管理偏好設定",
    
    // Activity
    "activity.cleaningCalendarActive": "清潔日曆服務現已啟用",
    "activity.shoppingListComing": "購物清單服務即將推出",
    "activity.maintenanceComing": "家庭維護服務即將推出",
    "activity.justNow": "剛剛",
    "activity.inDevelopment": "開發中",
  }
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SettingsData>({
    language: "en",
    theme: "system"
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("homeManagerSettings");
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    const root = document.documentElement;
    
    if (settings.theme === "dark" || 
        (settings.theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [settings.theme]);

  const updateLanguage = (language: "en" | "zh-TW") => {
    const newSettings = { ...settings, language };
    setSettings(newSettings);
    localStorage.setItem("homeManagerSettings", JSON.stringify(newSettings));
  };

  const updateTheme = (theme: "light" | "dark" | "system") => {
    const newSettings = { ...settings, theme };
    setSettings(newSettings);
    localStorage.setItem("homeManagerSettings", JSON.stringify(newSettings));
  };

  const t = (key: string): string => {
    const currentTranslations = translations[settings.language];
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  };

  return (
    <SettingsContext.Provider value={{ settings, updateLanguage, updateTheme, t }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
