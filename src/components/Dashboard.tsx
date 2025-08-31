"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Home, Settings, Users, ShoppingCart, Wrench } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/contexts/SettingsContext";

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  status: "active" | "coming-soon";
}

export default function Dashboard() {
  const { t } = useSettings();

  const services: ServiceCard[] = [
    {
      id: "cleaning-calendar",
      title: t("service.cleaningCalendar.title"),
      description: t("service.cleaningCalendar.description"),
      icon: <Calendar className="h-8 w-8" />,
      href: "/cleaning-calendar",
      color: "bg-blue-500",
      status: "active"
    },
    {
      id: "shopping-list",
      title: t("service.shoppingList.title"),
      description: t("service.shoppingList.description"),
      icon: <ShoppingCart className="h-8 w-8" />,
      href: "/shopping-list",
      color: "bg-green-500",
      status: "coming-soon"
    },
    {
      id: "maintenance",
      title: t("service.maintenance.title"),
      description: t("service.maintenance.description"),
      icon: <Wrench className="h-8 w-8" />,
      href: "/maintenance",
      color: "bg-orange-500",
      status: "coming-soon"
    },
    {
      id: "roommates",
      title: t("service.roommates.title"),
      description: t("service.roommates.description"),
      icon: <Users className="h-8 w-8" />,
      href: "/roommates",
      color: "bg-purple-500",
      status: "coming-soon"
    },
    {
      id: "settings",
      title: t("service.settings.title"),
      description: t("service.settings.description"),
      icon: <Settings className="h-8 w-8" />,
      href: "/settings",
      color: "bg-gray-500",
      status: "active"
    }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Home className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("dashboard.title")}</h1>
              <p className="text-gray-600 dark:text-gray-400">{t("dashboard.description")}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t("dashboard.activeServices")}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t("dashboard.totalServices")}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Settings className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t("dashboard.comingSoon")}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">{t("dashboard.availableServices")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card 
                key={service.id} 
                className={`bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200 ${
                  service.status === "coming-soon" ? "opacity-60" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${service.color} text-white`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg dark:text-white">{service.title}</CardTitle>
                      {service.status === "coming-soon" && (
                        <span className="inline-block px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-full">
                          {t("dashboard.comingSoon")}
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-400 mb-4">
                    {service.description}
                  </CardDescription>
                  {service.status === "active" ? (
                    <Link 
                      href={service.href}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      {t("dashboard.openService")}
                    </Link>
                  ) : (
                    <button 
                      disabled
                      className="inline-flex items-center px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed"
                    >
                      {t("dashboard.comingSoonButton")}
                    </button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">{t("dashboard.recentActivity")}</h2>
          <Card className="bg-white dark:bg-gray-800 shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-gray-700 dark:text-gray-300">{t("activity.cleaningCalendarActive")}</p>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{t("activity.justNow")}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <p className="text-gray-500 dark:text-gray-400">{t("activity.shoppingListComing")}</p>
                  <span className="text-sm text-gray-400 dark:text-gray-500">{t("activity.inDevelopment")}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <p className="text-gray-500 dark:text-gray-400">{t("activity.maintenanceComing")}</p>
                  <span className="text-sm text-gray-400 dark:text-gray-500">{t("activity.inDevelopment")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
