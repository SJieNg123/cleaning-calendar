"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, DollarSign, Wrench, Users, Settings } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  status: "active" | "coming-soon";
}

export default function Navigation() {
  const pathname = usePathname();
  const { t } = useSettings();

  const navigation: NavItem[] = [
    { name: t("nav.dashboard"), href: "/", icon: <Home className="h-5 w-5" />, status: "active" },
    { name: t("nav.cleaningCalendar"), href: "/cleaning-calendar", icon: <Calendar className="h-5 w-5" />, status: "active" },
    { name: t("nav.expenses"), href: "/expenses", icon: <DollarSign className="h-5 w-5" />, status: "active" },
    { name: t("nav.maintenance"), href: "/maintenance", icon: <Wrench className="h-5 w-5" />, status: "coming-soon" },
    { name: t("nav.roommates"), href: "/roommates", icon: <Users className="h-5 w-5" />, status: "coming-soon" },
    { name: t("nav.settings"), href: "/settings", icon: <Settings className="h-5 w-5" />, status: "active" },
  ];

  return (
    <nav className="bg-card shadow-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">{t("nav.homeManager")}</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const isComingSoon = item.status === "coming-soon";
              
              return (
                <Link
                  key={item.name}
                  href={isComingSoon ? "#" : item.href}
                                                       className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : isComingSoon
                      ? "text-muted-foreground cursor-not-allowed"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                  onClick={isComingSoon ? (e) => e.preventDefault() : undefined}
                >
                  {item.icon}
                  <span>{item.name}</span>
                                                       {isComingSoon && (
                    <span className="text-xs bg-secondary text-secondary-foreground px-1 py-0.5 rounded">
                      Soon
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-muted-foreground hover:text-foreground">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
