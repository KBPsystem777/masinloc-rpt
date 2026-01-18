"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HelpCircle,
  FileText,
  Hash,
  MapPin,
  Split,
  Grid3x3,
  Calculator,
  Info,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-2"
        >
          <HelpCircle className="h-4 w-4" />
          <span>User Guide</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            <span>RPT Management System User Guide</span>
          </DialogTitle>
          <DialogDescription>
            Comprehensive guide for using the Property Index Number (PIN)
            Management System
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="text-xs">
              Overview
            </TabsTrigger>
            <TabsTrigger value="pin" className="text-xs">
              PIN System
            </TabsTrigger>
            <TabsTrigger value="operations" className="text-xs">
              Operations
            </TabsTrigger>
            <TabsTrigger value="faq" className="text-xs">
              FAQ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  <span>What is the RPT Management System?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  The Real Property Tax (RPT) Management System is a digital
                  platform for managing Property Index Numbers (PIN) and real
                  property records of Local Government Units (LGU) in the
                  Philippines.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      Key Features
                    </h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• Property registration and PIN generation</li>
                      <li>• Block and lot management</li>
                      <li>• Property subdivision</li>
                      <li>• Advanced search and filtering</li>
                      <li>• Real-time reporting dashboard</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                      Who is it for?
                    </h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>• City/Municipal Assessors</li>
                      <li>• Property Appraisers</li>
                      <li>• Tax Collection Officers</li>
                      <li>• LGU Administrative Staff</li>
                      <li>• Records Management Personnel</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pin" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Hash className="h-5 w-5 text-purple-600" />
                  <span>Property Index Number (PIN) System</span>
                </CardTitle>
                <CardDescription>
                  Understanding the PIN format and numbering system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-2">
                    PIN Format: PPP-TT-BBBB-LLL
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <Badge variant="secondary" className="mb-2">
                        PPP
                      </Badge>
                      <p className="font-medium">Province Code</p>
                      <p className="text-muted-foreground">016 = Zambales</p>
                    </div>
                    <div className="text-center">
                      <Badge variant="secondary" className="mb-2">
                        TT
                      </Badge>
                      <p className="font-medium">Municipality Code</p>
                      <p className="text-muted-foreground">06 = Masinloc</p>
                    </div>
                    <div className="text-center">
                      <Badge variant="secondary" className="mb-2">
                        BBBB
                      </Badge>
                      <p className="font-medium">Block Number</p>
                      <p className="text-muted-foreground">0001-9999</p>
                    </div>
                    <div className="text-center">
                      <Badge variant="secondary" className="mb-2">
                        LLL
                      </Badge>
                      <p className="font-medium">Lot Number</p>
                      <p className="text-muted-foreground">001-999</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">PIN Examples:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded">
                      <code className="font-mono text-blue-800 dark:text-blue-200">
                        016-06-0001-001
                      </code>
                      <span className="text-sm text-blue-600">
                        Block 1, Lot 1
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded">
                      <code className="font-mono text-blue-800 dark:text-blue-200">
                        016-06-0001-025
                      </code>
                      <span className="text-sm text-blue-600">
                        Block 1, Lot 25
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded">
                      <code className="font-mono text-blue-800 dark:text-blue-200">
                        016-06-0052-001
                      </code>
                      <span className="text-sm text-blue-600">
                        Block 52, Lot 1
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Grid3x3 className="h-5 w-5 text-green-600" />
                    <span>Create Block</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="text-sm space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-xs font-bold">
                        1
                      </span>
                      <span>Click the "Add Block" button</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-xs font-bold">
                        2
                      </span>
                      <span>Enter the area of the initial lot</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-xs font-bold">
                        3
                      </span>
                      <span>Enter the owner's name</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-xs font-bold">
                        4
                      </span>
                      <span>Click "Create Block"</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span>Add Lot</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="text-sm space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold">
                        1
                      </span>
                      <span>Click the "Add Lot" button</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold">
                        2
                      </span>
                      <span>Select the destination block</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold">
                        3
                      </span>
                      <span>Enter area and owner details</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold">
                        4
                      </span>
                      <span>Submit the form</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Split className="h-5 w-5 text-orange-600" />
                    <span>Lot Subdivision</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="text-sm space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-orange-100 text-orange-800 rounded-full flex items-center justify-center text-xs font-bold">
                        1
                      </span>
                      <span>Find the lot to subdivide</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-orange-100 text-orange-800 rounded-full flex items-center justify-center text-xs font-bold">
                        2
                      </span>
                      <span>Click the "Subdivide" button</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-orange-100 text-orange-800 rounded-full flex items-center justify-center text-xs font-bold">
                        3
                      </span>
                      <span>Select the number of subdivisions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-orange-100 text-orange-800 rounded-full flex items-center justify-center text-xs font-bold">
                        4
                      </span>
                      <span>Enter area and owner for each segment</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-purple-600" />
                    <span>Search</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-3">
                    <p>You can search using:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Property Index Number (PIN)</li>
                      <li>• Owner's Name</li>
                      <li>• Block number</li>
                      <li>• Lot number</li>
                    </ul>
                    <p className="text-muted-foreground">
                      Use filters for more accurate results.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="space-y-4">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                        Q: How many lots can be added to a single block?
                      </h4>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        A: Up to 999 lots per block as per the Philippine PIN
                        format guidelines.
                      </p>
                    </div>

                    <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                        Q: Can a PIN be modified after creation?
                      </h4>
                      <p className="text-green-700 dark:text-green-300 text-sm">
                        A: No. The PIN is a permanent identifier for the
                        property.
                      </p>
                    </div>

                    <div className="p-4 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950">
                      <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                        Q: What happens to the original lot after subdivision?
                      </h4>
                      <p className="text-orange-700 dark:text-orange-300 text-sm">
                        A: Its status changes to "Subdivided" and it can no
                        longer be subdivided further.
                      </p>
                    </div>

                    <div className="p-4 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                        Q: Can the total area differ after subdivision?
                      </h4>
                      <p className="text-purple-700 dark:text-purple-300 text-sm">
                        A: No. The combined area of the new lots must exactly
                        match the original lot's area.
                      </p>
                    </div>

                    <div className="p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-950">
                      <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                        Q: What if I entered incorrect details?
                      </h4>
                      <p className="text-red-700 dark:text-red-300 text-sm">
                        A: Contact the system administrator for record
                        corrections.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
