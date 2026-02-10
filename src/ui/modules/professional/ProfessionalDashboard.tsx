import { useState } from "react";
import { Card } from "@/ui/components/ui/card";
import { Button } from "@/ui/components/ui/button";
import { Badge } from "@/ui/components/ui/badge";
import { Input } from "@/ui/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/components/ui/tabs";
import {
  Users,
  Search,
  CheckCircle,
  Clock,
  FileText,
  Eye,
  ThumbsUp,
  Sparkles,
  LogOut,
  Filter,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useNavigate } from "react-router";

const SIDEBAR_COLLAPSED_KEY = "@sparta:professional-sidebar-collapsed";

interface WorkoutReview {
  id: string;
  studentName: string;
  studentAvatar: string;
  workoutName: string;
  generatedBy: "AI";
  status: "draft" | "pending" | "active";
  createdAt: string;
  description: string;
}

export function TrainerDashboard() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "draft" | "pending" | "active">("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() =>
    localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "1"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const toggleSidebar = () => {
    const next = !sidebarCollapsed;
    setSidebarCollapsed(next);
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, next ? "1" : "0");
  };

  const mockReviews: WorkoutReview[] = [
    {
      id: "1",
      studentName: "Carlos Silva",
      studentAvatar: "CS",
      workoutName: "Hipertrofia Push A",
      generatedBy: "AI",
      status: "draft",
      createdAt: "Há 2 horas",
      description: "Treino de peito, ombros e tríceps focado em hipertrofia",
    },
    {
      id: "2",
      studentName: "Ana Santos",
      studentAvatar: "AS",
      workoutName: "Leg Day - Força",
      generatedBy: "AI",
      status: "pending",
      createdAt: "Há 5 horas",
      description: "Treino de pernas com foco em força e potência",
    },
    {
      id: "3",
      studentName: "João Pedro",
      studentAvatar: "JP",
      workoutName: "Pull Workout",
      generatedBy: "AI",
      status: "draft",
      createdAt: "Há 1 dia",
      description: "Treino de costas e bíceps para hipertrofia",
    },
    {
      id: "4",
      studentName: "Marina Costa",
      studentAvatar: "MC",
      workoutName: "HIIT Cardio",
      generatedBy: "AI",
      status: "active",
      createdAt: "Há 2 dias",
      description: "Treino cardiovascular de alta intensidade",
    },
    {
      id: "5",
      studentName: "Rafael Oliveira",
      studentAvatar: "RO",
      workoutName: "Upper Body - Strength",
      generatedBy: "AI",
      status: "pending",
      createdAt: "Há 3 horas",
      description: "Treino de membros superiores focado em força",
    },
  ];

  const stats = {
    totalStudents: 24,
    pendingReviews: mockReviews.filter(r => r.status === "draft" || r.status === "pending").length,
    activeWorkouts: mockReviews.filter(r => r.status === "active").length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge className="bg-muted text-muted-foreground border-muted">Draft</Badge>;
      case "pending":
        return <Badge className="bg-primary/20 text-primary border-primary/30">Pendente</Badge>;
      case "active":
        return <Badge className="bg-success/20 text-success border-success/30">Ativo</Badge>;
      default:
        return null;
    }
  };

  const filteredReviews = filter === "all" 
    ? mockReviews 
    : mockReviews.filter(r => r.status === filter);

  return (
    <div className="min-h-screen bg-background">
      {/* Backdrop mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 lg:hidden ${mobileMenuOpen ? "block" : "hidden"}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Sidebar - minimizável; em mobile abre como overlay */}
      <div
        className={`fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-50 flex flex-col transition-[width] duration-200 ${
          mobileMenuOpen ? "w-64 p-6" : sidebarCollapsed ? "w-20 p-3" : "w-64 p-6"
        } ${mobileMenuOpen ? "flex" : "hidden lg:flex"}`}
      >
        <div className={`mb-6 flex items-start gap-1 ${sidebarCollapsed ? "flex-col items-center" : ""}`}>
          {sidebarCollapsed ? (
            <span className="text-lg font-bold text-primary">S</span>
          ) : (
            <>
              <div className="flex items-center gap-2 min-w-0">
                <h1 className="text-2xl text-primary truncate">SPARTA AI</h1>
                <button
                  type="button"
                  onClick={toggleSidebar}
                  title="Minimizar menu"
                  className="shrink-0 p-1.5 rounded-md opacity-50 hover:opacity-80 bg-black/10 hover:bg-black/20 transition-opacity"
                  aria-label="Minimizar menu"
                >
                  <PanelLeftClose className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </>
          )}
        </div>

        <nav className="space-y-2 flex-1">
          <Button
            variant="ghost"
            className={`w-full justify-start bg-primary/10 text-primary hover:bg-primary/20 ${sidebarCollapsed ? "justify-center p-2" : ""}`}
            onClick={() => closeMobileMenu()}
            title="Revisões"
          >
            <FileText className={sidebarCollapsed ? "h-5 w-5" : "mr-3 h-5 w-5"} />
            {!sidebarCollapsed && "Revisões"}
          </Button>
          <Button
            variant="ghost"
            className={sidebarCollapsed ? "w-full justify-center p-2" : "w-full justify-start"}
            onClick={() => { navigate("/dashboard/professional/students"); closeMobileMenu(); }}
            title="Meus Alunos"
          >
            <Users className={sidebarCollapsed ? "h-5 w-5" : "mr-3 h-5 w-5"} />
            {!sidebarCollapsed && "Meus Alunos"}
          </Button>
          <Button
            variant="ghost"
            className={sidebarCollapsed ? "w-full justify-center p-2" : "w-full justify-start"}
            title="IA Assistente"
          >
            <Sparkles className={sidebarCollapsed ? "h-5 w-5" : "mr-3 h-5 w-5"} />
            {!sidebarCollapsed && "IA Assistente"}
          </Button>
        </nav>

        <div className={sidebarCollapsed ? "flex flex-col items-center gap-2" : "space-y-0"}>
          {sidebarCollapsed && (
            <button
              type="button"
              onClick={toggleSidebar}
              title="Expandir menu"
              className="p-2 rounded-md opacity-50 hover:opacity-80 bg-black/10 hover:bg-black/20 transition-opacity"
              aria-label="Expandir menu"
            >
              <PanelLeftOpen className="h-5 w-5 text-muted-foreground" />
            </button>
          )}
          <Button
            variant="ghost"
            size={sidebarCollapsed ? "icon" : "default"}
            className={`text-muted-foreground ${sidebarCollapsed ? "w-10" : "w-full justify-start"}`}
            onClick={() => { closeMobileMenu(); navigate("/"); }}
            title="Sair"
          >
            <LogOut className={sidebarCollapsed ? "h-5 w-5" : "mr-3 h-5 w-5"} />
            {!sidebarCollapsed && "Sair"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className={sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"} style={{ transition: "margin-left 0.2s" }}>
        {/* Header */}
        <div className="bg-card border-b border-border p-4 sm:p-6">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden shrink-0 p-2 rounded-md opacity-70 hover:opacity-100 bg-black/10 hover:bg-black/20"
              aria-label="Abrir menu"
            >
              <PanelLeftOpen className="h-6 w-6 text-foreground" />
            </button>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl mb-1 sm:mb-2">Dashboard do Personal</h1>
              <p className="text-muted-foreground text-sm sm:text-base">Gerencie treinos e acompanhe seus alunos</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-card p-6 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total de Alunos</p>
                  <p className="text-3xl font-bold">{stats.totalStudents}</p>
                </div>
                <div className="bg-primary/20 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="bg-card p-6 border-primary/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Revisões Pendentes</p>
                  <p className="text-3xl font-bold text-primary">{stats.pendingReviews}</p>
                </div>
                <div className="bg-primary/20 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="bg-card p-6 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Treinos Ativos</p>
                  <p className="text-3xl font-bold">{stats.activeWorkouts}</p>
                </div>
                <div className="bg-success/20 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
              </div>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por aluno ou treino..." 
                className="pl-10 bg-muted border-border"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className={filter === "all" ? "bg-primary text-primary-foreground" : ""}
              >
                Todos
              </Button>
              <Button 
                variant={filter === "draft" ? "default" : "outline"}
                onClick={() => setFilter("draft")}
                className={filter === "draft" ? "bg-primary text-primary-foreground" : ""}
              >
                Draft
              </Button>
              <Button 
                variant={filter === "pending" ? "default" : "outline"}
                onClick={() => setFilter("pending")}
                className={filter === "pending" ? "bg-primary text-primary-foreground" : ""}
              >
                Pendentes
              </Button>
              <Button 
                variant={filter === "active" ? "default" : "outline"}
                onClick={() => setFilter("active")}
                className={filter === "active" ? "bg-primary text-primary-foreground" : ""}
              >
                Ativos
              </Button>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <Card key={review.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center">
                        <span className="font-bold text-primary">{review.studentAvatar}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{review.studentName}</h3>
                        <p className="text-sm text-muted-foreground">{review.createdAt}</p>
                      </div>
                    </div>
                    {getStatusBadge(review.status)}
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <h4 className="font-semibold">{review.workoutName}</h4>
                      <Badge variant="secondary" className="text-xs">
                        Gerado por IA
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.description}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-primary/30 hover:bg-primary/10"
                      onClick={() => navigate("/trainer/edit-workout")}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Revisar
                    </Button>
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => navigate("/trainer/edit-workout")}
                    >
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      Aprovar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}