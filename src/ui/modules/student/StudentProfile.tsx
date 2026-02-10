import { useNavigate } from "react-router";
import { useSparta } from "@/shared/context/SpartaContext";
import { Card } from "@/ui/components/ui/card";
import { Button } from "@/ui/components/ui/button";
import { Badge } from "@/ui/components/ui/badge";
import {
  Home,
  Dumbbell,
  ChefHat,
  User,
  Target,
  Calendar,
  TrendingUp,
  LogOut,
} from "lucide-react";
import { Goal } from "@/shared/types";

const GOAL_LABELS: Record<Goal, string> = {
  [Goal.WEIGHT_LOSS]: "Perda de peso",
  [Goal.HYPERTROPHY]: "Hipertrofia",
  [Goal.CONDITIONING]: "Condicionamento",
};

export function StudentProfile() {
  const navigate = useNavigate();
  const { user } = useSparta();

  const displayName = user?.name?.trim() || "Atleta";
  const goalLabel = user?.goal ? GOAL_LABELS[user.goal] : "—";
  const levelLabel = user?.level ?? "—";
  const frequency = user?.frequency ?? 0;

  const handleLogout = () => {
    localStorage.removeItem("@sparta:user");
    navigate("/login", { replace: true });
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-page-dark pb-20 sm:pb-24 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        <div className="glass-card border-0 border-b border-white/10 rounded-none rounded-b-2xl p-4 sm:p-6 lg:p-6">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-1 truncate text-white">Meu Perfil</h1>
            <p className="text-white/70 text-sm sm:text-base">Seus dados e preferências</p>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
          <Card variant="glass" className="p-4 sm:p-6 lg:p-6 border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/20 p-3 rounded-full shrink-0">
                <User className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-bold truncate text-white">
                  {displayName}
                </h2>
                <Badge variant="secondary" className="mt-1 text-xs">
                  Aluno
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <span className="text-sm text-white/60 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary shrink-0" />
                  Nível
                </span>
                <span className="text-sm font-medium text-white">{levelLabel}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <span className="text-sm text-white/60 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary shrink-0" />
                  Objetivo
                </span>
                <span className="text-sm font-medium text-white">{goalLabel}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-white/60 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary shrink-0" />
                  Treinos por semana
                </span>
                <span className="text-sm font-medium text-white">{frequency}x</span>
              </div>
            </div>
          </Card>

          <Card variant="glass" className="p-4 sm:p-6 lg:p-6 border-white/10">
            <h3 className="text-base sm:text-lg font-bold mb-4 text-white">Conta</h3>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Sair da conta
            </Button>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 glass-card border-0 border-t border-white/10 rounded-none shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <div className="flex justify-around items-center h-14 sm:h-16 max-w-4xl mx-auto px-2 sm:px-4 lg:px-6">
          <Button variant="ghost" size="icon" className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0 text-white/70 hover:text-white" onClick={() => navigate("/dashboard/student")}>
            <Home className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span className="text-[10px] sm:text-xs truncate">Início</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0 text-white/70 hover:text-white" onClick={() => navigate("/student/workouts")}>
            <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span className="text-[10px] sm:text-xs truncate">Treinos</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0 text-white/70 hover:text-white" onClick={() => navigate("/diet")}>
            <ChefHat className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span className="text-[10px] sm:text-xs truncate">Dieta</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0">
            <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
            <span className="text-[10px] sm:text-xs text-primary truncate">Perfil</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
