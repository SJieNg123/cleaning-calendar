"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Home, Settings, Users, DollarSign, Wrench } from "lucide-react";
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
      id: "expenses",
      title: t("service.expenses.title"),
      description: t("service.expenses.description"),
      icon: <DollarSign className="h-8 w-8" />,
      href: "/expenses",
      color: "bg-green-500",
      status: "active"
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-card rounded-lg shadow-sm">
              <Home className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t("dashboard.title")}</h1>
              <p className="text-muted-foreground">{t("dashboard.description")}</p>
            </div>
          </div>
        </div>

                {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("dashboard.activeServices")}</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <Users className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("dashboard.totalServices")}</p>
                  <p className="text-2xl font-bold text-foreground">5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Settings className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("dashboard.comingSoon")}</p>
                  <p className="text-2xl font-bold text-foreground">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6">{t("dashboard.availableServices")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card 
                key={service.id} 
                className={`bg-card shadow-sm hover:shadow-md transition-shadow duration-200 ${
                  service.status === "coming-soon" ? "opacity-60" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${service.color} text-white`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-foreground">{service.title}</CardTitle>
                      {service.status === "coming-soon" && (
                        <span className="inline-block px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">
                          {t("dashboard.comingSoon")}
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-4">
                    {service.description}
                  </CardDescription>
                  {service.status === "active" ? (
                    <Link 
                      href={service.href}
                      className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
                    >
                      {t("dashboard.openService")}
                    </Link>
                  ) : (
                    <button 
                      disabled
                      className="inline-flex items-center px-4 py-2 bg-muted text-muted-foreground rounded-lg cursor-not-allowed"
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
          <h2 className="text-2xl font-semibold text-foreground mb-6">{t("dashboard.recentActivity")}</h2>
          <Card className="bg-card shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-foreground">{t("activity.cleaningCalendarActive")}</p>
                  <span className="text-sm text-muted-foreground">{t("activity.justNow")}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-foreground">{t("activity.expensesActive")}</p>
                  <span className="text-sm text-muted-foreground">{t("activity.justNow")}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <p className="text-muted-foreground">{t("activity.maintenanceComing")}</p>
                  <span className="text-sm text-muted-foreground">{t("activity.inDevelopment")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
