"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Trash2,
  Upload,
  AlertCircle,
  CheckCircle,
  Save,
  Send,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface LineItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
}

export default function NewRequestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form state
  const [costCentre, setCostCentre] = useState("");
  const [budgetLine, setBudgetLine] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [supplier, setSupplier] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [justification, setJustification] = useState("");
  const [requiredDate, setRequiredDate] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: 1, description: "", quantity: 1, unitPrice: 0 },
  ]);
  const [attachments, setAttachments] = useState<File[]>([]);

  // Mock data - in production, fetch from API
  const costCentres = [
    { id: 1, code: "AGR", name: "School of Agriculture" },
    { id: 2, code: "SCI", name: "Faculty of Science" },
    { id: 3, code: "NRS", name: "School of Natural Resources" },
    { id: 4, code: "ADM", name: "Administration" },
    { id: 5, code: "LIB", name: "Library Services" },
  ];

  const budgetLines = [
    { id: 1, code: "OP-TRAV", name: "Operating - Travel", available: 150000 },
    { id: 2, code: "OP-FUEL", name: "Operating - Fuel", available: 80000 },
    { id: 3, code: "OP-STAT", name: "Operating - Stationery", available: 45000 },
    { id: 4, code: "OP-MAINT", name: "Operating - Maintenance", available: 200000 },
    { id: 5, code: "CAP-FURN", name: "Capital - Furniture", available: 300000 },
    { id: 6, code: "CAP-IT", name: "Capital - IT Equipment", available: 500000 },
  ];

  const expenseTypes = [
    { id: 1, code: "TRAV", name: "Travel & Accommodation" },
    { id: 2, code: "FUEL", name: "Fuel & Vehicle Maintenance" },
    { id: 3, code: "STAT", name: "Stationery & Supplies" },
    { id: 4, code: "MAINT", name: "Maintenance & Repairs" },
    { id: 5, code: "PROF", name: "Professional Services" },
    { id: 6, code: "EQUIP", name: "Equipment" },
    { id: 7, code: "CAPEX", name: "Capital Expenditure" },
  ];

  const suppliers = [
    { id: 1, name: "Select Supplier (Optional)" },
    { id: 2, name: "PNG Office Supplies Ltd" },
    { id: 3, name: "Ela Motors" },
    { id: 4, name: "Brian Bell Ltd" },
    { id: 5, name: "Stop & Shop" },
  ];

  const addLineItem = () => {
    const newId = Math.max(...lineItems.map((item) => item.id), 0) + 1;
    setLineItems([...lineItems, { id: newId, description: "", quantity: 1, unitPrice: 0 }]);
  };

  const removeLineItem = (id: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((item) => item.id !== id));
    }
  };

  const updateLineItem = (id: number, field: keyof LineItem, value: string | number) => {
    setLineItems(
      lineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const calculateTotal = () => {
    return lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = async (action: "save" | "submit") => {
    setLoading(true);

    // Validation
    if (!costCentre || !budgetLine || !expenseType || !title || !description || !justification) {
      toast.error("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (lineItems.some((item) => !item.description || item.unitPrice <= 0)) {
      toast.error("Please complete all line items");
      setLoading(false);
      return;
    }

    const total = calculateTotal();
    if (total <= 0) {
      toast.error("Total amount must be greater than zero");
      setLoading(false);
      return;
    }

    // Check budget availability
    const selectedBudget = budgetLines.find((bl) => bl.id.toString() === budgetLine);
    if (selectedBudget && total > selectedBudget.available) {
      toast.error(
        `Insufficient budget! Available: K ${selectedBudget.available.toLocaleString()}, Required: K ${total.toLocaleString()}`
      );
      setLoading(false);
      return;
    }

    // In production, save to database
    setTimeout(() => {
      if (action === "save") {
        toast.success("GE Request saved as draft");
      } else {
        toast.success("GE Request submitted for approval!");
        router.push("/dashboard/requests");
      }
      setLoading(false);
    }, 1000);
  };

  const selectedBudgetLine = budgetLines.find((bl) => bl.id.toString() === budgetLine);
  const total = calculateTotal();
  const hasSufficientBudget = !selectedBudgetLine || total <= selectedBudgetLine.available;

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link href="/dashboard/requests">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">New GE Request</h1>
          <p className="text-slate-600">Create a new general expenditure request</p>
        </div>
      </div>

      <form className="space-y-6">
        {/* Basic Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="costCentre">
                Cost Centre <span className="text-red-500">*</span>
              </Label>
              <Select value={costCentre} onValueChange={setCostCentre}>
                <SelectTrigger id="costCentre" className="mt-1">
                  <SelectValue placeholder="Select cost centre" />
                </SelectTrigger>
                <SelectContent>
                  {costCentres.map((cc) => (
                    <SelectItem key={cc.id} value={cc.id.toString()}>
                      {cc.code} - {cc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="budgetLine">
                Budget Line (AAP Vote) <span className="text-red-500">*</span>
              </Label>
              <Select value={budgetLine} onValueChange={setBudgetLine}>
                <SelectTrigger id="budgetLine" className="mt-1">
                  <SelectValue placeholder="Select budget line" />
                </SelectTrigger>
                <SelectContent>
                  {budgetLines.map((bl) => (
                    <SelectItem key={bl.id} value={bl.id.toString()}>
                      {bl.code} - {bl.name} (Available: K {bl.available.toLocaleString()})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="expenseType">
                Expense Type <span className="text-red-500">*</span>
              </Label>
              <Select value={expenseType} onValueChange={setExpenseType}>
                <SelectTrigger id="expenseType" className="mt-1">
                  <SelectValue placeholder="Select expense type" />
                </SelectTrigger>
                <SelectContent>
                  {expenseTypes.map((et) => (
                    <SelectItem key={et.id} value={et.id.toString()}>
                      {et.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="supplier">Supplier (Optional)</Label>
              <Select value={supplier} onValueChange={setSupplier}>
                <SelectTrigger id="supplier" className="mt-1">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((s) => (
                    <SelectItem key={s.id} value={s.id.toString()}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="requiredDate">Required Date</Label>
              <Input
                id="requiredDate"
                type="date"
                value={requiredDate}
                onChange={(e) => setRequiredDate(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger id="priority" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="title">
                Request Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Brief description of the request"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">
                Detailed Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Provide detailed description of what is being requested"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="justification">
                Business Justification <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="justification"
                placeholder="Explain why this expenditure is necessary and how it benefits UNRE"
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                rows={4}
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        {/* Line Items */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Line Items</h3>
            <Button type="button" size="sm" variant="outline" onClick={addLineItem}>
              <Plus className="h-4 w-4 mr-1" />
              Add Item
            </Button>
          </div>

          <div className="space-y-4">
            {lineItems.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 items-end p-4 border rounded-lg">
                <div className="col-span-12 md:col-span-5">
                  <Label htmlFor={`item-desc-${item.id}`}>Description *</Label>
                  <Input
                    id={`item-desc-${item.id}`}
                    placeholder="Item description"
                    value={item.description}
                    onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                  />
                </div>
                <div className="col-span-6 md:col-span-2">
                  <Label htmlFor={`item-qty-${item.id}`}>Quantity *</Label>
                  <Input
                    id={`item-qty-${item.id}`}
                    type="number"
                    min="1"
                    step="0.01"
                    value={item.quantity}
                    onChange={(e) => updateLineItem(item.id, "quantity", Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="col-span-6 md:col-span-2">
                  <Label htmlFor={`item-price-${item.id}`}>Unit Price (K) *</Label>
                  <Input
                    id={`item-price-${item.id}`}
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => updateLineItem(item.id, "unitPrice", Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="col-span-10 md:col-span-2">
                  <Label>Total</Label>
                  <div className="h-10 px-3 rounded-md border bg-slate-50 flex items-center font-semibold text-blue-600">
                    K {(item.quantity * item.unitPrice).toLocaleString()}
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLineItem(item.id)}
                    disabled={lineItems.length === 1}
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-slate-900">Total Amount:</span>
              <span className="text-2xl font-bold text-blue-600">K {total.toLocaleString()}</span>
            </div>
          </div>
        </Card>

        {/* Budget Check */}
        {selectedBudgetLine && (
          <Card className={`p-6 ${hasSufficientBudget ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
            <div className="flex items-start gap-3">
              {hasSufficientBudget ? (
                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
              ) : (
                <AlertCircle className="h-6 w-6 text-red-600 mt-0.5" />
              )}
              <div className="flex-1">
                <h4 className={`font-semibold mb-2 ${hasSufficientBudget ? "text-green-900" : "text-red-900"}`}>
                  {hasSufficientBudget ? "Budget Available" : "Insufficient Budget"}
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600">Available Budget:</p>
                    <p className="font-semibold">K {selectedBudgetLine.available.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Request Amount:</p>
                    <p className="font-semibold">K {total.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Remaining After:</p>
                    <p className={`font-semibold ${hasSufficientBudget ? "text-green-700" : "text-red-700"}`}>
                      K {(selectedBudgetLine.available - total).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Attachments */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Supporting Documents</h3>
          <p className="text-sm text-slate-600 mb-4">
            Upload quotes, invoices, memos, and other supporting documents for this request.
          </p>
          <FileUpload
            files={attachments}
            onFilesSelected={(files) => setAttachments([...attachments, ...files])}
            onFileRemoved={removeAttachment}
            maxFiles={10}
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
          />
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t">
          <Link href="/dashboard/requests">
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </Link>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSubmit("save")}
              disabled={loading}
            >
              <Save className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
            <Button
              type="button"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              onClick={() => handleSubmit("submit")}
              disabled={loading || !hasSufficientBudget}
            >
              <Send className="h-4 w-4 mr-2" />
              Submit for Approval
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
