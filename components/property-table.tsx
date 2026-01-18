"use client";

import { useState } from "react";
import type { Property } from "@/lib/pin-generator";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Split, Search, Filter, Eye } from "lucide-react";
import { format } from "date-fns";

interface PropertyTableProps {
  properties: Property[];
  onSubdivide: (property: Property) => void;
  onView: (property: Property) => void;
  searchMode?: boolean;
}

export function PropertyTable({
  properties,
  onSubdivide,
  onView,
  searchMode = false,
}: PropertyTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [blockFilter, setBlockFilter] = useState("all");

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.pin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.blockNumber.toString().includes(searchTerm) ||
      property.lotNumber.toString().includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || property.status === statusFilter;
    const matchesBlock =
      blockFilter === "all" || property.blockNumber.toString() === blockFilter;

    return matchesSearch && matchesStatus && matchesBlock;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (a.blockNumber !== b.blockNumber) {
      return a.blockNumber - b.blockNumber;
    }
    return a.lotNumber - b.lotNumber;
  });

  const uniqueBlocks = Array.from(
    new Set(properties.map((p) => p.blockNumber)),
  ).sort((a, b) => a - b);

  const getStatusBadge = (status: string) => {
    const statusMap = {
      Active: { label: "Active", variant: "default" as const },
      Subdivided: { label: "Subdivided", variant: "secondary" as const },
      Inactive: { label: "Inactive", variant: "outline" as const },
    };
    return (
      statusMap[status as keyof typeof statusMap] || {
        label: status,
        variant: "outline" as const,
      }
    );
  };

  return (
    <div className="space-y-4">
      {searchMode && (
        <Card className="p-4">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by PIN, owner name, block, or lot number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Subdivided">Subdivided</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={blockFilter} onValueChange={setBlockFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Block" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Blocks</SelectItem>
                  {uniqueBlocks.map((block) => (
                    <SelectItem key={block} value={block.toString()}>
                      Block {block}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {searchTerm && (
            <div className="mt-3 text-sm text-muted-foreground">
              Found: {sortedProperties.length} property
              {sortedProperties.length !== 1 ? "s" : ""}
            </div>
          )}
        </Card>
      )}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Property Index Number (PIN)
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Block
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Lot
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Area (square meters)
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Property Owner
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Date Added
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sortedProperties.length > 0 ? (
                sortedProperties.map((property) => {
                  const statusInfo = getStatusBadge(property.status);
                  return (
                    <tr
                      key={property.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-sm font-medium">
                        {property.pin}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {property.blockNumber}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {property.lotNumber}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {property.area.toLocaleString()} sq.m
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">
                        {property.owner}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={statusInfo.variant}>
                          {statusInfo.label}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {format(new Date(property.createdAt), "MMM dd, yyyy")}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          {property.status === "Active" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onSubdivide(property)}
                            >
                              <Split className="h-4 w-4 mr-1" />
                              Subdivide
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onView(property)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    {searchTerm
                      ? "No properties found matching your search."
                      : "No properties registered in the system yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {sortedProperties.length > 0 && (
        <div className="text-sm text-muted-foreground text-center">
          Showing {sortedProperties.length} of {properties.length} properties
        </div>
      )}
    </div>
  );
}
