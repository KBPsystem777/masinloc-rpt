"use client";

import { type Property } from "@/lib/pin-generator";
import { StatsCards } from "@/components/stats-cards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Grid3x3,
  FileText,
  TrendingUp,
  Calendar,
  MapPin,
  Users,
  Calculator,
  Clock,
} from "lucide-react";
import { format } from "date-fns";

interface DashboardViewProps {
  properties: Property[];
  onCreateLot: () => void;
  onCreateBlock: () => void;
  onNavigate: (view: string) => void;
}

export function DashboardView({
  properties,
  onCreateLot,
  onCreateBlock,
  onNavigate,
}: DashboardViewProps) {
  const recentProperties = properties
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const uniqueBlocks = new Set(properties.map((p) => p.blockNumber)).size;
  const activeProperties = properties.filter(
    (p) => p.status === "Active"
  ).length;
  const subdivisions = properties.filter((p) => p.parentPin).length;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to the RPT Management System
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Manage Property Index Numbers (PIN) and Real Property Tax records
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {format(new Date(), "MMMM dd, yyyy")}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards properties={properties} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5 text-blue-600" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>Common tasks in the system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={onCreateLot}
              className="w-full justify-start"
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Lot
            </Button>
            <Button
              onClick={onCreateBlock}
              className="w-full justify-start"
              variant="outline"
            >
              <Grid3x3 className="h-4 w-4 mr-2" />
              Add New Block
            </Button>
            <Button
              onClick={() => onNavigate("search")}
              className="w-full justify-start"
              variant="outline"
            >
              <FileText className="h-4 w-4 mr-2" />
              Search Property
            </Button>
            <Button
              onClick={() => onNavigate("calculator")}
              className="w-full justify-start"
              variant="outline"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Tax
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-600" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              New properties added to the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProperties.length > 0 ? (
                recentProperties.map((property) => (
                  <div
                    key={property.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          PIN: {property.pin}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Block {property.blockNumber}, Lot {property.lotNumber}{" "}
                          • {property.area} sq.m
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          property.status === "Active" ? "default" : "secondary"
                        }
                        className="mb-1"
                      >
                        {property.status}
                      </Badge>
                      <p className="text-xs text-gray-500">
                        {format(new Date(property.createdAt), "MMM dd")}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No recent activity</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Grid3x3 className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {uniqueBlocks}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Total Blocks
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <MapPin className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {activeProperties}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Active Properties
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {subdivisions}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Subdivisions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Set(properties.map((p) => p.owner)).size}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Property Owners
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
