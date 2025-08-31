"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Globe, Moon, Sun, Monitor } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

const translations = {
  en: {
    title: "System Settings",
    description: "Configure your home management preferences",
    language: {
      label: "Language",
      description: "Choose your preferred language",
      en: "English",
      "zh-TW": "繁體中文"
    },
    theme: {
      label: "Theme",
      description: "Choose your preferred theme",
      light: "Light",
      dark: "Dark",
      system: "System"
    },
    general: "General Settings",
    appearance: "Appearance",
    languageSettings: "Language Settings",
    themeSettings: "Theme Settings",
    preview: "Preview",
    previewDescription: "See how your settings will look"
  },
  "zh-TW": {
    title: "系統設定",
    description: "配置您的家庭管理偏好設定",
    language: {
      label: "語言",
      description: "選擇您偏好的語言",
      en: "English",
      "zh-TW": "繁體中文"
    },
    theme: {
      label: "主題",
      description: "選擇您偏好的主題",
      light: "淺色",
      dark: "深色",
      system: "系統"
    },
    general: "一般設定",
    appearance: "外觀",
    languageSettings: "語言設定",
    themeSettings: "主題設定",
    preview: "預覽",
    previewDescription: "查看您的設定效果"
  }
};

export default function SettingsPage() {
  const { settings, updateLanguage, updateTheme } = useSettings();
  const currentTranslations = translations[settings.language];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Settings className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {currentTranslations.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {currentTranslations.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Language Settings */}
          <Card className="bg-white dark:bg-gray-800 shadow-sm">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <CardTitle className="text-gray-900 dark:text-white">
                    {currentTranslations.languageSettings}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {currentTranslations.language.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {currentTranslations.language.label}
                  </label>
                  <Select value={settings.language} onValueChange={updateLanguage}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">
                        <div className="flex items-center space-x-2">
                          <span>🇺🇸</span>
                          <span>{currentTranslations.language.en}</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="zh-TW">
                        <div className="flex items-center space-x-2">
                          <span>🇹🇼</span>
                          <span>{currentTranslations.language["zh-TW"]}</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card className="bg-white dark:bg-gray-800 shadow-sm">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Monitor className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <CardTitle className="text-gray-900 dark:text-white">
                    {currentTranslations.themeSettings}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {currentTranslations.theme.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {currentTranslations.theme.label}
                  </label>
                  <Select value={settings.theme} onValueChange={updateTheme}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center space-x-2">
                          <Sun className="h-4 w-4" />
                          <span>{currentTranslations.theme.light}</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center space-x-2">
                          <Moon className="h-4 w-4" />
                          <span>{currentTranslations.theme.dark}</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="system">
                        <div className="flex items-center space-x-2">
                          <Monitor className="h-4 w-4" />
                          <span>{currentTranslations.theme.system}</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="mt-8">
          <Card className="bg-white dark:bg-gray-800 shadow-sm">
            <CardHeader>
                          <CardTitle className="text-gray-900 dark:text-white">
              {currentTranslations.preview}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {currentTranslations.previewDescription}
            </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {currentTranslations.general}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Sample text to show current theme
                  </p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    {currentTranslations.appearance}
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    Sample text to show current theme
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                    Settings
                  </h3>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Sample text to show current theme
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
