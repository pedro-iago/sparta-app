import { useState } from "react";
import { Button } from "@/ui/components/ui/button";
import { Input } from "@/ui/components/ui/input";
import { FloatingNav, type FloatingNavItem } from "@/ui/components/ui/floating-nav";
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
} from "lucide-react";
import { useNavigate } from "react-router";

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

  const floatingNavItems: FloatingNavItem[] = [
    { icon: <FileText />, label: "Revisões", onClick: () => {} },
    { icon: <Users />, label: "Meus Alunos", onClick: () => navigate("/dashboard/professional/students") },
    { icon: <Sparkles />, label: "IA Assistente", onClick: () => {} },
    { icon: <LogOut />, label: "Sair", onClick: () => navigate("/") },
  ];

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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "draft": return <span className="text-[11px] font-medium text-white/45">Draft</span>;
      case "pending": return <span className="text-[11px] font-medium text-primary/80">Pendente</span>;
      case "active": return <span className="text-[11px] font-medium text-primary/80">Ativo</span>;
      default: return null;
    }
  };

  const filteredReviews = filter === "all" 
    ? mockReviews 
    : mockReviews.filter(r => r.status === filter);

  return (
    <div className="min-h-screen bg-page-dark">
      {/* Main Content - full width */}
      <div className="w-full">
        {/* Header */}
        <div className="glass-card border-0 border-b border-white/10 rounded-none rounded-b-2xl p-4 sm:p-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-semibold mb-0.5 text-white tracking-tight">Dashboard do Personal</h1>
            <p className="text-white/50 text-sm">Gerencie treinos e acompanhe seus alunos</p>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 pb-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-6 lg:mb-8">
            <div className="glass-card-3d rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-white/50 mb-0.5">Total de alunos</p>
                  <p className="text-2xl font-semibold text-white/95 tabular-nums">{stats.totalStudents}</p>
                </div>
                <div className="bg-white/[0.08] p-2.5 rounded-full">
                  <Users className="size-5 text-primary/70" />
                </div>
              </div>
            </div>
            <div className="glass-card-3d rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-white/50 mb-0.5">Revisões pendentes</p>
                  <p className="text-2xl font-semibold text-primary/90 tabular-nums">{stats.pendingReviews}</p>
                </div>
                <div className="bg-white/[0.08] p-2.5 rounded-full">
                  <Clock className="size-5 text-primary/70" />
                </div>
              </div>
            </div>
            <div className="glass-card-3d rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-white/50 mb-0.5">Treinos ativos</p>
                  <p className="text-2xl font-semibold text-white/95 tabular-nums">{stats.activeWorkouts}</p>
                </div>
                <div className="bg-white/[0.08] p-2.5 rounded-full">
                  <CheckCircle className="size-5 text-primary/70" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/45" />
              <Input
                placeholder="Buscar por aluno ou treino..."
                className="pl-10 bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/40 rounded-xl"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(["all", "draft", "pending", "active"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    filter === f
                      ? "bg-primary/80 text-primary-foreground"
                      : "bg-white/[0.06] text-white/60 hover:text-white/80 border border-white/[0.06]"
                  }`}
                >
                  {f === "all" ? "Todos" : f === "draft" ? "Draft" : f === "pending" ? "Pendentes" : "Ativos"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="glass-card-3d rounded-2xl p-4 sm:p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/[0.08] rounded-full size-10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary/80">{review.studentAvatar}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-white/95">{review.studentName}</h3>
                      <p className="text-[11px] text-white/45">{review.createdAt}</p>
                    </div>
                  </div>
                  {getStatusLabel(review.status)}
                </div>
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="size-3.5 text-primary/60" />
                    <h4 className="font-medium text-white/90 text-sm">{review.workoutName}</h4>
                    <span className="text-[10px] font-medium text-white/45">Gerado por IA</span>
                  </div>
                  <p className="text-xs text-white/55">{review.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-white/70 hover:text-white hover:bg-white/[0.06]"
                    onClick={() => navigate("/trainer/edit-workout")}
                  >
                    <Eye className="mr-2 size-3.5" />
                    Revisar
                  </Button>
                  <Button variant="default" size="sm" className="flex-1 rounded-xl font-medium" onClick={() => navigate("/trainer/edit-workout")}>
                    <ThumbsUp className="mr-2 size-3.5" />
                    Aprovar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FloatingNav items={floatingNavItems} position="bottom-center" />
    </div>
  );
}