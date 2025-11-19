"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  File,
  CheckCircle,
  Circle,
  Clock,
  Zap,
  Shield,
  Database,
  Code,
  Layout,
  GitBranch,
} from "lucide-react";
import { logout } from "@/app/(auth)/login/action";

const FolderStructure = () => {
  const [expanded, setExpanded] = useState({
    app: true,
    audit: true,
    api: true,
    lib: true,
    components: true,
  });

  const toggle = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const FolderItem = ({ name, children, level = 0, itemKey }) => (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <div
        className="flex items-center gap-2 py-1 px-2 hover:bg-blue-50 rounded cursor-pointer transition-colors"
        onClick={() => itemKey && toggle(itemKey)}
      >
        {children ? (
          expanded[itemKey] ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )
        ) : null}
        <Folder size={16} className="text-yellow-600" />
        <span className="font-medium text-gray-800">{name}</span>
      </div>
      {children && expanded[itemKey] && <div className="ml-4">{children}</div>}
    </div>
  );

  const FileItem = ({ name, description, level = 0 }) => (
    <div
      style={{ marginLeft: `${level * 20}px` }}
      className="flex items-center gap-2 py-1 px-2 hover:bg-gray-50 rounded transition-colors"
    >
      <File size={16} className="text-blue-600" />
      <span className="text-gray-700">{name}</span>
      {description && (
        <span className="text-xs text-gray-500 ml-2">→ {description}</span>
      )}
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <FolderItem name="app/" itemKey="app">
        <FileItem name="layout.tsx" description="Root layout" level={1} />
        <FileItem name="page.tsx" description="Landing page" level={1} />
        <FolderItem name="audit/" itemKey="audit" level={1}>
          <FileItem name="layout.tsx" description="Audit layout" level={2} />
          <FileItem
            name="page.tsx"
            description="Navigation wrapper"
            level={2}
          />
          <FileItem
            name="upload/page.tsx"
            description="Step 1: Upload"
            level={2}
          />
          <FileItem
            name="analyse/page.tsx"
            description="Step 2: Analysis"
            level={2}
          />
          <FileItem
            name="report/page.tsx"
            description="Step 3: Report"
            level={2}
          />
        </FolderItem>
        <FolderItem name="api/" itemKey="api" level={1}>
          <FileItem
            name="upload/route.ts"
            description="POST: File uploads"
            level={2}
          />
          <FileItem
            name="analyse/route.ts"
            description="POST: AI scoring"
            level={2}
          />
          <FileItem
            name="report/route.ts"
            description="GET: Report data"
            level={2}
          />
        </FolderItem>
      </FolderItem>
      <FolderItem name="lib/" itemKey="lib">
        <FolderItem name="api/" itemKey="lib_api" level={1}>
          <FileItem name="upload.ts" description="Upload service" level={2} />
          <FileItem
            name="analyse.ts"
            description="Analysis service"
            level={2}
          />
          <FileItem name="report.ts" description="Report service" level={2} />
        </FolderItem>
        <FolderItem name="utils/" itemKey="lib_utils" level={1}>
          <FileItem
            name="scoring.ts"
            description="Score calculations"
            level={2}
          />
          <FileItem name="file.ts" description="File validation" level={2} />
        </FolderItem>
        <FileItem
          name="types/audit.ts"
          description="TypeScript types"
          level={1}
        />
      </FolderItem>
      <FolderItem name="components/" itemKey="components">
        <FileItem name="ui/" description="Buttons, inputs, cards" level={1} />
        <FileItem
          name="audit/"
          description="Audit-specific components"
          level={1}
        />
      </FolderItem>
      <FileItem name="hooks/useAuditState.ts" description="State management" />
      <FileItem name="middleware.ts" description="JWT/Auth guard" />
    </div>
  );
};

/* const Timeline = () => {
  const phases = [
    {
      phase: "Planning & Design",
      duration: "2 weeks",
      status: "complete",
      tasks: ["Requirements gathering", "UI/UX design", "Tech stack selection"],
    },
    {
      phase: "Foundation Setup",
      duration: "1 week",
      status: "complete",
      tasks: ["Project initialization", "Auth setup", "Database schema"],
    },
    {
      phase: "Core Features",
      duration: "4 weeks",
      status: "current",
      tasks: ["File upload system", "AI integration", "Report generation"],
    },
    {
      phase: "Dashboard & Analytics",
      duration: "2 weeks",
      status: "pending",
      tasks: ["Dashboard UI", "Charts integration", "Export features"],
    },
    {
      phase: "Testing & Deploy",
      duration: "2 weeks",
      status: "pending",
      tasks: ["Unit tests", "E2E tests", "Production deployment"],
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="space-y-4">
        {phases.map((phase, idx) => (
          <div
            key={idx}
            className="relative pl-8 pb-6 border-l-2 border-gray-300 last:border-l-0"
          >
            <div className="absolute -left-2 top-0">
              {phase.status === "complete" ? (
                <CheckCircle className="text-green-500 bg-white" size={20} />
              ) : phase.status === "current" ? (
                <Clock className="text-blue-500 bg-white" size={20} />
              ) : (
                <Circle className="text-gray-400 bg-white" size={20} />
              )}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold text-gray-800">{phase.phase}</h3>
                <span className="text-sm text-gray-500">{phase.duration}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    phase.status === "complete"
                      ? "bg-green-100 text-green-700"
                      : phase.status === "current"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {phase.status}
                </span>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                {phase.tasks.map((task, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; */

const TechStack = () => {
  const stack = {
    Frontend: [
      { name: "Next.js 14", desc: "React framework with App Router" },
      { name: "TypeScript", desc: "Type-safe development" },
      { name: "Tailwind CSS", desc: "Utility-first styling" },
      { name: "Zustand", desc: "State management" },
    ],
    Backend: [
      { name: "Next.js API Routes", desc: "Serverless functions" },
      { name: "Python FastAPI", desc: "AI processing backend" },
      { name: "PostgreSQL", desc: "Primary database" },
      { name: "Redis", desc: "Caching & sessions" },
    ],
    "AI & Processing": [
      { name: "OpenAI GPT-4", desc: "Transcript analysis" },
      { name: "Langchain", desc: "LLM orchestration" },
      { name: "Whisper", desc: "Audio transcription" },
    ],
    DevOps: [
      { name: "Vercel", desc: "Frontend hosting" },
      { name: "Docker", desc: "Containerization" },
      { name: "GitHub Actions", desc: "CI/CD pipeline" },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(stack).map(([category, items]) => (
        <div
          key={category}
          className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
        >
          <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <Code size={20} className="text-blue-600" />
            {category}
          </h3>
          <div className="space-y-3">
            {items.map((item, idx) => (
              <div key={idx} className="border-l-4 border-blue-400 pl-3">
                <div className="font-semibold text-gray-800">{item.name}</div>
                <div className="text-sm text-gray-600">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Workflow = () => {
  const steps = [
    {
      title: "Upload",
      icon: "📁",
      desc: "User uploads audio/document file",
      endpoint: "/api/upload",
    },
    {
      title: "Process",
      icon: "🤖",
      desc: "AI transcribes and extracts data",
      endpoint: "/api/analyse",
    },
    {
      title: "Score",
      icon: "📊",
      desc: "Calculate compliance scores",
      endpoint: "/api/analyse",
    },
    {
      title: "Report",
      icon: "📄",
      desc: "Generate final audit report",
      endpoint: "/api/report",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-lg border border-blue-200">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="flex-1 bg-white p-4 rounded-lg shadow-md border-2 border-blue-300 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-2 text-center">{step.icon}</div>
              <h4 className="font-bold text-center text-gray-800 mb-1">
                {step.title}
              </h4>
              <p className="text-sm text-gray-600 text-center mb-2">
                {step.desc}
              </p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded block text-center text-blue-600">
                {step.endpoint}
              </code>
            </div>
            {idx < steps.length - 1 && (
              <div className="hidden md:block text-3xl text-blue-400">→</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Zap className="text-yellow-500" />,
      title: "Real-time Processing",
      desc: "Instant AI-powered analysis with live progress updates",
    },
    {
      icon: <Shield className="text-green-500" />,
      title: "Secure Authentication",
      desc: "JWT-based auth with role-based access control",
    },
    {
      icon: <Database className="text-blue-500" />,
      title: "Data Persistence",
      desc: "PostgreSQL database with Redis caching layer",
    },
    {
      icon: <Layout className="text-purple-500" />,
      title: "Responsive Design",
      desc: "Mobile-first UI built with Tailwind CSS",
    },
    {
      icon: <GitBranch className="text-red-500" />,
      title: "Version Control",
      desc: "Document versioning and audit trail tracking",
    },
    {
      icon: <Code className="text-indigo-500" />,
      title: "API Integration",
      desc: "RESTful APIs with OpenAPI documentation",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
        >
          <div className="mb-3">{feature.icon}</div>
          <h4 className="font-bold text-gray-800 mb-2">{feature.title}</h4>
          <p className="text-sm text-gray-600">{feature.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: "📋" },
    { id: "structure", label: "Folder Structure", icon: "📁" },
    { id: "workflow", label: "Workflow", icon: "🔄" },
    // { id: "timeline", label: "Timeline", icon: "📅" },
    { id: "tech", label: "Tech Stack", icon: "⚡" },
    { id: "features", label: "Features", icon: "✨" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 px-6 shadow-lg">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">
            🔍 Audit App Documentation
          </h1>
          <p className="text-blue-100">
            Comprehensive project planning & technical documentation
          </p>
          <div className="">
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </div>
        <div className=""></div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Project Overview
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                The Audit App is a comprehensive compliance auditing platform
                that leverages AI to analyze documents and audio recordings,
                automatically generating detailed compliance reports. Built with
                modern web technologies, it provides a seamless user experience
                from upload to final report.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    3 Steps
                  </div>
                  <div className="text-sm text-gray-600">
                    Upload → Analyze → Report
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    AI-Powered
                  </div>
                  <div className="text-sm text-gray-600">
                    GPT-4 & Whisper Integration
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    11 Weeks
                  </div>
                  <div className="text-sm text-gray-600">
                    Total Development Time
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Architecture Principles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-gray-800 mb-2">
                    Separation of Concerns
                  </h4>
                  <p className="text-sm text-gray-600">
                    Clear distinction between UI, business logic, and data
                    layers
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-bold text-gray-800 mb-2">Type Safety</h4>
                  <p className="text-sm text-gray-600">
                    TypeScript throughout with Zod validation
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-bold text-gray-800 mb-2">
                    API-First Design
                  </h4>
                  <p className="text-sm text-gray-600">
                    RESTful endpoints with clear contracts
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-bold text-gray-800 mb-2">
                    Scalable Structure
                  </h4>
                  <p className="text-sm text-gray-600">
                    Modular components and reusable utilities
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "structure" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Folder Structure
              </h2>
              <p className="text-gray-600 mb-6">
                Interactive file tree showing the complete application
                structure. Click folders to expand/collapse.
              </p>
            </div>
            <FolderStructure />
          </div>
        )}

        {activeTab === "workflow" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                User Workflow
              </h2>
              <p className="text-gray-600 mb-6">
                The audit process follows a simple 4-step workflow with seamless
                API integration.
              </p>
            </div>
            <Workflow />

            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Detailed Data Flow
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      Client Upload
                    </div>
                    <div className="text-gray-600">
                      User selects file →{" "}
                      <code className="bg-gray-100 px-2 py-0.5 rounded">
                        app/audit/upload/page.tsx
                      </code>{" "}
                      → Triggers POST request
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      File Processing
                    </div>
                    <div className="text-gray-600">
                      <code className="bg-gray-100 px-2 py-0.5 rounded">
                        api/upload/route.ts
                      </code>{" "}
                      → Uses{" "}
                      <code className="bg-gray-100 px-2 py-0.5 rounded">
                        lib/api/upload.ts
                      </code>{" "}
                      → Validates with{" "}
                      <code className="bg-gray-100 px-2 py-0.5 rounded">
                        lib/utils/file.ts
                      </code>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      AI Analysis
                    </div>
                    <div className="text-gray-600">
                      <code className="bg-gray-100 px-2 py-0.5 rounded">
                        api/analyse/route.ts
                      </code>{" "}
                      →{" "}
                      <code className="bg-gray-100 px-2 py-0.5 rounded">
                        lib/api/analyse.ts
                      </code>{" "}
                      →{" "}
                      <code className="bg-gray-100 px-2 py-0.5 rounded">
                        lib/utils/scoring.ts
                      </code>{" "}
                      calculates compliance scores
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      Report Generation
                    </div>
                    <div className="text-gray-600">
                      <code className="bg-gray-100 px-2 py-0.5 rounded">
                        api/report/route.ts
                      </code>{" "}
                      →{" "}
                      <code className="bg-gray-100 px-2 py-0.5 rounded">
                        lib/api/report.ts
                      </code>{" "}
                      → Displayed in{" "}
                      <code className="bg-gray-100 px-2 py-0.5 rounded">
                        ReportViewer
                      </code>{" "}
                      component
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/*  {activeTab === "timeline" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Development Timeline
              </h2>
              <p className="text-gray-600 mb-6">
                11-week development roadmap with clear phases and milestones.
              </p>
            </div>
            <Timeline />
          </div>
        )} */}

        {activeTab === "tech" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Technology Stack
              </h2>
              <p className="text-gray-600 mb-6">
                Modern, scalable technologies chosen for performance and
                developer experience.
              </p>
            </div>
            <TechStack />
          </div>
        )}

        {activeTab === "features" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Core Features
              </h2>
              <p className="text-gray-600 mb-6">
                Key capabilities that make the Audit App powerful and
                user-friendly.
              </p>
            </div>
            <Features />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-gray-300 py-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">
            Built with Next.js 14, TypeScript, and Tailwind CSS
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Interactive Project Documentation
          </p>
        </div>
      </div>
    </div>
  );
}
