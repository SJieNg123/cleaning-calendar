"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Globe, Sun, Monitor, Palette } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

export default function SettingsPage() {
  const { settings, updateLanguage, updateTheme, t } = useSettings();



  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-card rounded-lg shadow-sm">
              <Settings className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {t("settings.title")}
              </h1>
              <p className="text-muted-foreground">
                {t("service.settings.description")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Language Settings */}
          <Card className="bg-card shadow-sm">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Globe className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle className="text-foreground">
                    {t("settings.language")}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Choose your preferred language
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t("settings.language")}
                  </label>
                  <Select value={settings.language} onValueChange={updateLanguage}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">
                        <div className="flex items-center space-x-2">
                          <span>🇺🇸</span>
                          <span>English</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="zh-TW">
                        <div className="flex items-center space-x-2">
                          <span>🇹🇼</span>
                          <span>繁體中文</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card className="bg-card shadow-sm">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Monitor className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle className="text-foreground">
                    {t("settings.theme")}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Choose your preferred theme
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t("settings.theme")}
                  </label>
                  <Select value={settings.theme} onValueChange={updateTheme}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center space-x-2">
                          <Sun className="h-4 w-4" />
                          <span>{t("settings.light")}</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="graphite">
                        <div className="flex items-center space-x-2">
                          <Palette className="h-4 w-4" />
                          <span>{t("settings.graphite")}</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="system">
                        <div className="flex items-center space-x-2">
                          <Monitor className="h-4 w-4" />
                          <span>{t("settings.system")}</span>
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
          <Card className="bg-card shadow-sm">
            <CardHeader>
              <CardTitle className="text-foreground">
                Preview
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                See how your settings will look
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">
                    General Settings
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Sample text to show current theme
                  </p>
                </div>
                <div className="p-4 bg-accent rounded-lg">
                  <h3 className="font-semibold text-accent-foreground mb-2">
                    Appearance
                  </h3>
                  <p className="text-accent-foreground text-sm">
                    Sample text to show current theme
                  </p>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <h3 className="font-semibold text-secondary-foreground mb-2">
                    Settings
                  </h3>
                  <p className="text-secondary-foreground text-sm">
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
