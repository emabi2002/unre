"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, CheckCircle, Shield, TrendingUp, Users, FileText } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-slate-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/unre-logo.png"
              alt="UNRE Logo"
              className="h-12 w-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-slate-900">UNRE</h1>
              <p className="text-xs text-slate-600">GE Request System</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/demo">
              <Button className="bg-gradient-to-r from-unre-green-600 to-unre-green-700 hover:from-unre-green-700 hover:to-unre-green-800">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            Automated GE Request & Budget Control System
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            University of Natural Resources & Environment of PNG<br />
            Streamline approvals, eliminate paperwork, and gain real-time visibility into your spending
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-gradient-to-r from-unre-green-600 to-unre-green-700 hover:from-unre-green-700 hover:to-unre-green-800">
                Get Started
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">Learn More</Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {[
            { label: "No More Lost Forms", value: "100%", icon: CheckCircle },
            { label: "Faster Approvals", value: "10x", icon: TrendingUp },
            { label: "Complete Audit Trail", value: "Full", icon: Shield },
            { label: "Real-time Visibility", value: "24/7", icon: Users },
          ].map((stat, idx) => (
            <Card key={idx} className="p-6 text-center hover:shadow-lg transition-shadow bg-white">
              <stat.icon className="h-8 w-8 mx-auto mb-3 text-unre-green-600" />
              <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Comprehensive Features
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Digital GE Requests",
                description: "Create, submit, and track GE requests online. No more paper forms or lost documents.",
                icon: FileText,
                features: [
                  "Online form submission",
                  "Document attachments",
                  "Auto-numbering",
                  "Status tracking",
                ],
              },
              {
                title: "Multi-Level Approvals",
                description: "Configurable approval workflows with automatic routing based on amount and type.",
                icon: CheckCircle,
                features: [
                  "HOD → Dean → Bursar → Registrar",
                  "Amount-based routing",
                  "Email notifications",
                  "Escalation rules",
                ],
              },
              {
                title: "PIGAS Integration",
                description: "Seamless integration with AAP budget for real-time spending visibility.",
                icon: TrendingUp,
                features: [
                  "Budget vs Actual",
                  "Commitment tracking",
                  "Available balance",
                  "Manager dashboards",
                ],
              },
              {
                title: "Budget Control",
                description: "Prevent overspending with real-time budget checks and commitment tracking.",
                icon: Shield,
                features: [
                  "Real-time validation",
                  "Commitment register",
                  "Budget alerts",
                  "Virement workflow",
                ],
              },
              {
                title: "Payment Processing",
                description: "Streamline bursary operations from commitment to payment voucher generation.",
                icon: Building2,
                features: [
                  "Payment vouchers",
                  "Cheque/EFT recording",
                  "Payment tracking",
                  "Bank reconciliation",
                ],
              },
              {
                title: "Reporting & Analytics",
                description: "Comprehensive reports and dashboards for all stakeholders.",
                icon: Users,
                features: [
                  "Manager dashboards",
                  "Audit trails",
                  "Spending analysis",
                  "Excel exports",
                ],
              },
            ].map((feature, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <feature.icon className="h-10 w-10 text-unre-green-600 mb-4" />
                <h4 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h4>
                <p className="text-slate-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-700">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">
            How It Works
          </h3>
          <div className="max-w-4xl mx-auto">
            {[
              {
                step: 1,
                title: "Create Request",
                description: "Staff member creates a GE request online, selects cost centre and budget line, attaches supporting documents.",
              },
              {
                step: 2,
                title: "Approval Workflow",
                description: "Request automatically routed to HOD → Dean → Bursar → Registrar based on amount and type. Each approver receives email notification.",
              },
              {
                step: 3,
                title: "Budget Check",
                description: "System validates against AAP budget. Creates commitment if funds available. Alerts if insufficient balance.",
              },
              {
                step: 4,
                title: "Purchase & Receipt",
                description: "Purchase order generated (if needed). Goods/services received and documented. Invoice uploaded.",
              },
              {
                step: 5,
                title: "Payment",
                description: "Bursary creates payment voucher, records payment details, updates PIGAS. Complete audit trail maintained.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 mb-8">
                <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-unre-green-600 to-unre-green-800 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gradient-to-r from-unre-green-600 to-unre-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">
            Benefits for UNRE
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "For Management",
                benefits: [
                  "Real-time visibility of spending across all cost centres",
                  "Prevent budget overruns with automated checks",
                  "Data-driven decision making with comprehensive reports",
                  "Improved financial control and accountability",
                ],
              },
              {
                title: "For Bursary Department",
                benefits: [
                  "Eliminate paper chase and lost forms",
                  "Faster processing with digital workflows",
                  "Complete audit trail for every transaction",
                  "Seamless PIGAS integration",
                ],
              },
              {
                title: "For Staff",
                benefits: [
                  "Submit requests anytime, anywhere",
                  "Track status in real-time",
                  "Faster approvals and payments",
                  "No more duplicate submissions",
                ],
              },
              {
                title: "For Auditors",
                benefits: [
                  "Complete transaction history",
                  "Tamper-proof audit logs",
                  "Easy verification of approvals",
                  "Comprehensive reporting",
                ],
              },
            ].map((section, idx) => (
              <Card key={idx} className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                <h4 className="text-xl font-bold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-slate-900 mb-6">
            Ready to Transform Your GE Request Process?
          </h3>
          <p className="text-xl text-slate-600 mb-8">
            Join UNRE in modernizing financial operations with our comprehensive system
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-gradient-to-r from-unre-green-600 to-unre-green-700 hover:from-unre-green-700 hover:to-unre-green-800">
              Login to System
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400">
            © 2025 University of Natural Resources & Environment of PNG
          </p>
          <p className="text-slate-500 text-sm mt-2">
            GE Request & Budget Control System v1.0
          </p>
        </div>
      </footer>
    </div>
  );
}
