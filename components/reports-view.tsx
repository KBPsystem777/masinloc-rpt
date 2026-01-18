"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Calendar,
  Download,
  FileSpreadsheet,
  FileText,
  Layers,
  TrendingUp,
} from "lucide-react";

export function ReportsView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">LGU Reports</h2>
        <p className="text-muted-foreground">
          Generate mandatory municipal assessment reports for BLGF and Local
          Chief Executive.
        </p>
      </div>

      <Tabs defaultValue="quarterly" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          <TabsTrigger value="semestral">Semestral</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="pt-4  space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Assessment Roll
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground mb-4">
                  Summary of property transfers, new assessments, and RACIMTS
                  updates.
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export Roll
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Transfers
                </CardTitle>
                <Layers className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground mb-4">
                  Detailed list of ownership changes and
                  subdivision/consolidation actions.
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download CSV
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Monthly Assessments (January 2026)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead className="text-right">Market Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>New Assessments</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell className="text-right">₱ 14,500,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Re-assessments</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell className="text-right">₱ 5,200,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cancellations</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell className="text-right">(₱ 1,800,000)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quarterly" className="pt-4  space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>QRRPA (Real Property Assessments)</CardTitle>
                  <CardDescription>
                    Quarterly Report submitted to BLGF via eSRE
                  </CardDescription>
                </div>
                <Button>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Generate QRRPA
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property Classification</TableHead>
                    <TableHead className="text-right">Market Value</TableHead>
                    <TableHead className="text-right">Assessed Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Residential</TableCell>
                    <TableCell className="text-right">₱ 450,230,000</TableCell>
                    <TableCell className="text-right">₱ 90,046,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Commercial</TableCell>
                    <TableCell className="text-right">₱ 820,500,000</TableCell>
                    <TableCell className="text-right">₱ 410,250,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Industrial</TableCell>
                    <TableCell className="text-right">
                      ₱ 1,200,000,000
                    </TableCell>
                    <TableCell className="text-right">₱ 600,000,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Agricultural</TableCell>
                    <TableCell className="text-right">₱ 120,400,000</TableCell>
                    <TableCell className="text-right">₱ 48,160,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="semestral" className="pt-4  space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-900 mb-6">
            <h4 className="flex items-center font-bold text-blue-900 dark:text-blue-100 mb-2 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              Semestral Accomplishment Report (OPCR/IPCR)
            </h4>
            <p className="text-xs text-blue-800 dark:text-blue-200">
              Generated for the Local Chief Executive and Sangguniang Bayan
              summarizing all modifications to the assessment roll.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Total Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from last sem
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Modification Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">482</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Pending approval: 23
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Revenue Impact (Est.)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₱ 22.4M</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5% increase
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
