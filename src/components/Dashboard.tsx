"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Home, Settings, Users, ShoppingCart, Wrench } from "lucide-react";
import Link from "next/link";

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  status: "active" | "coming-soon";
}

const services: ServiceCard[] = [
  {
    id: "cleaning-calendar",
    title: "Cleaning Calendar",
    description: "Manage your home cleaning schedule with rotating assignments",
    icon: <Calendar className="h-8 w-8" />,
    href: "/cleaning-calendar",
    color: "bg-blue-500",
    status: "active"
  },
  {
    id: "shopping-list",
    title: "Shopping List",
    description: "Track household groceries and shopping items",
    icon: <ShoppingCart className="h-8 w-8" />,
    href: "/shopping-list",
    color: "bg-green-500",
    status: "coming-soon"
  },
  {
    id: "maintenance",
    title: "Home Maintenance",
    description: "Schedule and track home maintenance tasks",
    icon: <Wrench className="h-8 w-8" />,
    href: "/maintenance",
    color: "bg-orange-500",
    status: "coming-soon"
  },
  {
    id: "roommates",
    title: "Roommate Management",
    description: "Manage shared expenses and roommate information",
    icon: <Users className="h-8 w-8" />,
    href: "/roommates",
    color: "bg-purple-500",
    status: "coming-soon"
  },
  {
    id: "settings",
    title: "System Settings",
    description: "Configure your home management preferences",
    icon: <Settings className="h-8 w-8" />,
    href: "/settings",
    color: "bg-gray-500",
    status: "coming-soon"
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <Home className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Home Management System</h1>
              <p className="text-gray-600">Manage your home efficiently with our comprehensive tools</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Services</p>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Services</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Settings className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Coming Soon</p>
                  <p className="text-2xl font-bold text-gray-900">4</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Available Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card 
                key={service.id} 
                className={`bg-white shadow-sm hover:shadow-md transition-shadow duration-200 ${
                  service.status === "coming-soon" ? "opacity-60" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${service.color} text-white`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      {service.status === "coming-soon" && (
                        <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4">
                    {service.description}
                  </CardDescription>
                  {service.status === "active" ? (
                    <Link 
                      href={service.href}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Open Service
                    </Link>
                  ) : (
                    <button 
                      disabled
                      className="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-gray-700">Cleaning Calendar service is now active</p>
                  <span className="text-sm text-gray-500">Just now</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <p className="text-gray-500">Shopping List service coming soon</p>
                  <span className="text-sm text-gray-400">In development</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <p className="text-gray-500">Home Maintenance service coming soon</p>
                  <span className="text-sm text-gray-400">In development</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
