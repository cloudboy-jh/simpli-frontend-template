import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Box, PanelLeftClose, Moon, IdCard, LayoutDashboard, BarChart3, Users, Mail, Settings, FileText, Palette, Stamp, Origami } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-4rem)] space-y-6 pt-6">
      <div className="text-center mb-2">
        <h2 className="text-3xl font-bold tracking-tight">Welcome to the start of your App</h2>
        <p className="text-muted-foreground">
          A modern Frontend Template made with Simpli, ShadCN/UI, and Lucide
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4 max-w-6xl w-full">
        {/* First column content */}
        <div className="col-span-12 lg:col-span-7 space-y-4">
          {/* Components Library Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Components Library</CardTitle>
              <Box className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Pre-built, customizable UI components with Tailwind and ShadCN UI.
                Easily extend or modify components to fit your needs.
              </p>
              <div className="mt-4 flex items-center gap-4">
                <Link
                  href="https://ui.shadcn.com/docs/components"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-primary hover:underline"
                >
                  View Components
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
                <Link
                  href="https://ui.shadcn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-primary hover:underline"
                >
                  ShadCN/UI Documentation
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Sidebar</CardTitle>
              <PanelLeftClose className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Collapsible sidebar component with smooth transitions and responsive design.
              </p>
              <div className="mt-4 flex items-center gap-4">
                <Link
                  href="https://ui.shadcn.com/docs/components/sidebar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-primary hover:underline"
                >
                  Sidebar Documentation
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Dark Mode Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">How Dark Mode Works</CardTitle>
              <Moon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="pl-10 space-y-8">
                  {[
                    {
                      step: 1,
                      title: "Installed next-themes",
                      description: "Start by adding the next-themes package to your project"
                    },
                    {
                      step: 2,
                      title: "Created a theme provider",
                      description: "Set up the theme provider component for your app"
                    },
                    {
                      step: 3,
                      title: "Wrapped the root layout",
                      description: "Add the provider to your root layout component"
                    },
                    {
                      step: 4,
                      title: "Added a mode toggle",
                      description: "Implement the theme switching functionality"
                    }
                  ].map(({ step, title, description }) => (
                    <div key={step} className="relative">
                      <div className="absolute -left-[35px] top-1 h-6 w-6 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                        <span className="text-xs font-medium">{step}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium leading-none mb-3">{title}</h4>
                        <p className="text-sm text-muted-foreground">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <Link
                    href="https://ui.shadcn.com/docs/dark-mode/next"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-primary hover:underline"
                  >
                    Dark Mode Documentation
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second column content */}
        <div className="col-span-12 lg:col-span-5 space-y-4">
          {/* Pages Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Pages</CardTitle>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Your own Pre-built pages ready to be edited, added to, or removed.
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <LayoutDashboard className="h-5 w-5 shrink-0" />
                    <div>
                      <p className="font-medium">Dashboard</p>
                      <p className="text-sm text-muted-foreground">Overview of key metrics and system status</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5 shrink-0" />
                    <div>
                      <p className="font-medium">Analytics</p>
                      <p className="text-sm text-muted-foreground">Track user activity and app performance</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 shrink-0" />
                    <div>
                      <p className="font-medium">Customers</p>
                      <p className="text-sm text-muted-foreground">Manage user data, profiles, and interactions</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 shrink-0" />
                    <div>
                      <p className="font-medium">Messages</p>
                      <p className="text-sm text-muted-foreground">Built-in messaging or notifications system</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 shrink-0" />
                    <div>
                      <p className="font-medium">Settings</p>
                      <p className="text-sm text-muted-foreground">Customize app preferences and configurations</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ownership Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Ownership</CardTitle>
              <IdCard className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Your code, your rules, built with open-source technologies.
                </p>
                
                <div className="pl-4 space-y-4">
                  <div className="relative border-l-2 border-primary pl-4">
                    <div className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <Palette className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <h4 className="text-sm font-medium">ShadCN UI</h4>
                    <p className="text-sm text-muted-foreground">The best component library</p>
                  </div>

                  <div className="relative border-l-2 border-primary pl-4">
                    <div className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <Stamp className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <h4 className="text-sm font-medium">Lucide Icons</h4>
                    <p className="text-sm text-muted-foreground">Beautiful & consistent icons</p>
                  </div>

                  <div className="relative border-l-2 border-primary pl-4">
                    <div className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <Origami className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <h4 className="text-sm font-medium">Simpli</h4>
                    <p className="text-sm text-muted-foreground">Modern development tools</p>
                  </div>
                </div>

                <Link
                  href="https://github.com/your-repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-primary hover:underline"
                >
                  View Source Code
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}