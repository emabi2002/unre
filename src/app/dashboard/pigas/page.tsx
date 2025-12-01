"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  FileText,
  Database,
  ArrowRight,
  Clock,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { parsePIGASFile, importPIGASBudget, validatePIGASData, downloadPIGASTemplate } from "@/lib/pigas-import";

export default function PIGASPage() {
  const [syncing, setSyncing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setImportResult(null); // Clear previous results
    }
  };

  const handleSync = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    try {
      setSyncing(true);
      toast.info("Parsing PIGAS file...");

      // Parse the file
      const budgetLines = await parsePIGASFile(file);

      if (budgetLines.length === 0) {
        toast.error("No valid budget lines found in file");
        setSyncing(false);
        return;
      }

      // Validate data
      const validation = validatePIGASData(budgetLines);

      if (!validation.valid) {
        toast.error(`Validation failed: ${validation.errors.join(', ')}`);
        setSyncing(false);
        return;
      }

      if (validation.warnings.length > 0) {
        toast.warning(`Warnings: ${validation.warnings.join(', ')}`);
      }

      toast.info(`Importing ${budgetLines.length} budget lines...`);

      // Import to database
      const result = await importPIGASBudget(budgetLines);
      setImportResult(result);

      if (result.success) {
        toast.success(
          `PIGAS data synchronized successfully! ${result.importedCount} new, ${result.updatedCount} updated. Total: K ${(result.totalAmount / 1000).toFixed(0)}k`
        );
        setFile(null);
      } else {
        toast.error(`Import completed with errors: ${result.errorCount} errors`);
      }
    } catch (error: any) {
      console.error('Error importing PIGAS data:', error);
      toast.error(`Failed to import: ${error.message}`);
    } finally {
      setSyncing(false);
    }
  };

  // Mock data
  const lastSync = {
    date: "2025-01-27 14:30",
    by: "Emmanuel Saliki",
    budgetLinesUpdated: 45,
    errors: 0,
  };

  const mockSyncStats = {
    budgetLinesUpdated: 48,
    totalRecords: 50,
    errors: 2,
    warnings: 5,
  };

  const syncHistory = [
    {
      id: 1,
      date: "2025-01-27 14:30",
      user: "Emmanuel Saliki",
      type: "CSV Import",
      records: 45,
      status: "Success",
      errors: 0,
    },
    {
      id: 2,
      date: "2025-01-24 09:15",
      user: "Emmanuel Saliki",
      type: "CSV Import",
      records: 45,
      status: "Success",
      errors: 0,
    },
    {
      id: 3,
      date: "2025-01-20 16:45",
      user: "Emmanuel Saliki",
      type: "Manual Update",
      records: 3,
      status: "Success",
      errors: 0,
    },
    {
      id: 4,
      date: "2025-01-17 11:00",
      user: "System Admin",
      type: "CSV Import",
      records: 48,
      status: "Partial",
      errors: 3,
    },
  ];

  const integrationMethods = [
    {
      id: 1,
      title: "CSV/Excel Import",
      description: "Upload budget and expenditure data from PIGAS reports",
      status: "Active",
      icon: Upload,
      color: "green",
    },
    {
      id: 2,
      title: "Direct Database Connection",
      description: "Real-time read access to PIGAS database",
      status: "Planned",
      icon: Database,
      color: "blue",
    },
    {
      id: 3,
      title: "API Integration",
      description: "Connect via PIGAS API for automatic synchronization",
      status: "Future",
      icon: RefreshCw,
      color: "slate",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">PIGAS Integration</h1>
          <p className="text-slate-600">Synchronize AAP budget and expenditure data with PIGAS</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={downloadPIGASTemplate}>
            <Download className="mr-2 h-4 w-4" />
            Download Template
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            View Documentation
          </Button>
        </div>
      </div>

      {/* Last Sync Status */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-500 rounded-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-1">Last Synchronization</h3>
              <p className="text-green-700 mb-2">{lastSync.date} by {lastSync.by}</p>
              <div className="flex gap-6 text-sm">
                <div>
                  <p className="text-green-600">Budget Lines Updated:</p>
                  <p className="text-xl font-bold text-green-900">{lastSync.budgetLinesUpdated}</p>
                </div>
                <div>
                  <p className="text-green-600">Errors:</p>
                  <p className="text-xl font-bold text-green-900">{lastSync.errors}</p>
                </div>
              </div>
            </div>
          </div>
          <Badge className="bg-green-600">Synchronized</Badge>
        </div>
      </Card>

      {/* Integration Methods */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Integration Methods</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {integrationMethods.map((method) => (
            <Card
              key={method.id}
              className={`p-6 ${
                method.status === "Active"
                  ? "border-green-200 bg-green-50"
                  : method.status === "Planned"
                    ? "border-blue-200 bg-blue-50"
                    : "border-slate-200"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-lg ${
                    method.status === "Active"
                      ? "bg-green-100"
                      : method.status === "Planned"
                        ? "bg-blue-100"
                        : "bg-slate-100"
                  }`}
                >
                  <method.icon
                    className={`h-6 w-6 ${
                      method.status === "Active"
                        ? "text-green-600"
                        : method.status === "Planned"
                          ? "text-blue-600"
                          : "text-slate-600"
                    }`}
                  />
                </div>
                <Badge
                  className={
                    method.status === "Active"
                      ? "bg-green-600"
                      : method.status === "Planned"
                        ? "bg-blue-600"
                        : "bg-slate-400"
                  }
                >
                  {method.status}
                </Badge>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">{method.title}</h4>
              <p className="text-sm text-slate-600">{method.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* File Upload Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Upload PIGAS Data</h3>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="file-upload">Select CSV or Excel File</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".csv,.xls,.xlsx"
                  onChange={handleFileUpload}
                  className="mt-1"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Supported formats: CSV, Excel (.xls, .xlsx)
                </p>
              </div>

              {file && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="font-semibold text-blue-900">{file.name}</p>
                        <p className="text-sm text-blue-700">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFile(null)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}

              <Button
                onClick={handleSync}
                disabled={!file || syncing}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700"
              >
                {syncing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Synchronizing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload and Synchronize
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg border">
                <h4 className="font-semibold text-slate-900 mb-3">Expected File Format</h4>
                <p className="text-sm text-slate-600 mb-2">Your file should include these columns:</p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Cost Centre Code</li>
                  <li>• PIGAS Vote Code</li>
                  <li>• PIGAS Sub-Item (optional)</li>
                  <li>• AAP Code</li>
                  <li>• Description</li>
                  <li>• Original Budget Amount</li>
                  <li>• YTD Expenditure</li>
                  <li>• Budget Year</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-yellow-900 mb-1">Important</p>
                    <p className="text-sm text-yellow-800">
                      This will update budget and expenditure data for all matching cost centres and budget lines.
                      Existing commitments from GE requests will not be affected.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Import Results */}
      {importResult && (
        <Card className={`p-6 ${importResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg ${importResult.success ? 'bg-green-500' : 'bg-red-500'}`}>
              {importResult.success ? (
                <CheckCircle className="h-6 w-6 text-white" />
              ) : (
                <AlertCircle className="h-6 w-6 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-semibold mb-2 ${importResult.success ? 'text-green-900' : 'text-red-900'}`}>
                {importResult.success ? 'Import Successful' : 'Import Completed with Errors'}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div>
                  <p className="text-sm text-slate-600">New Lines</p>
                  <p className="text-xl font-bold text-slate-900">{importResult.importedCount}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Updated</p>
                  <p className="text-xl font-bold text-slate-900">{importResult.updatedCount}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Amount</p>
                  <p className="text-xl font-bold text-slate-900">K {(importResult.totalAmount / 1000).toFixed(0)}k</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Errors</p>
                  <p className={`text-xl font-bold ${importResult.errorCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {importResult.errorCount}
                  </p>
                </div>
              </div>
              {importResult.errors.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-semibold text-red-900 mb-1">Errors:</p>
                  <ul className="text-sm text-red-800 space-y-1">
                    {importResult.errors.slice(0, 5).map((error: string, index: number) => (
                      <li key={index}>• {error}</li>
                    ))}
                    {importResult.errors.length > 5 && (
                      <li>• ...and {importResult.errors.length - 5} more</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Sync History */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Synchronization History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr className="text-left text-sm font-medium text-slate-600">
                <th className="p-3">Date & Time</th>
                <th className="p-3">User</th>
                <th className="p-3">Type</th>
                <th className="p-3">Records</th>
                <th className="p-3">Status</th>
                <th className="p-3">Errors</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {syncHistory.map((sync) => (
                <tr key={sync.id} className="border-b hover:bg-slate-50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-700">{sync.date}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-slate-700">{sync.user}</td>
                  <td className="p-3">
                    <Badge variant="outline" className="text-xs">
                      {sync.type}
                    </Badge>
                  </td>
                  <td className="p-3 text-sm font-semibold text-blue-600">{sync.records}</td>
                  <td className="p-3">
                    <Badge
                      className={
                        sync.status === "Success"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-yellow-100 text-yellow-800 border-yellow-200"
                      }
                    >
                      {sync.status}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-sm font-semibold ${
                        sync.errors === 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {sync.errors}
                    </span>
                  </td>
                  <td className="p-3">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mapping Configuration */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Budget Line Mapping</h3>
        <p className="text-slate-600 mb-4">
          Configure how PIGAS vote codes map to AAP budget lines and cost centres
        </p>
        <Button variant="outline">
          <ArrowRight className="mr-2 h-4 w-4" />
          Configure Mapping Rules
        </Button>
      </Card>

      {/* Documentation */}
      <Card className="p-6 bg-slate-50">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Integration Documentation</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded border">
            <FileText className="h-8 w-8 text-blue-600 mb-2" />
            <h4 className="font-semibold text-slate-900 mb-1">Setup Guide</h4>
            <p className="text-sm text-slate-600 mb-3">Step-by-step integration setup instructions</p>
            <Button variant="outline" size="sm" className="w-full">
              View Guide
            </Button>
          </div>
          <div className="p-4 bg-white rounded border">
            <Download className="h-8 w-8 text-green-600 mb-2" />
            <h4 className="font-semibold text-slate-900 mb-1">CSV Template</h4>
            <p className="text-sm text-slate-600 mb-3">Download the standard import template</p>
            <Button variant="outline" size="sm" className="w-full">
              Download Template
            </Button>
          </div>
          <div className="p-4 bg-white rounded border">
            <AlertCircle className="h-8 w-8 text-orange-600 mb-2" />
            <h4 className="font-semibold text-slate-900 mb-1">Troubleshooting</h4>
            <p className="text-sm text-slate-600 mb-3">Common issues and solutions</p>
            <Button variant="outline" size="sm" className="w-full">
              View FAQ
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
