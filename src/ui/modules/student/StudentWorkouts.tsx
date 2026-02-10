import { Card } from "@/ui/components/ui/card";
import { Button } from "@/ui/components/ui/button";
import { Badge } from "@/ui/components/ui/badge";
import {
  Dumbbell,
  PlayCircle,
  ChefHat,
  Home,
  User,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router";

const todayWorkout = {
  name: "Hypertrophy Push A",
  type: "Upper Body",
  duration: "60 min",
  exercises: 8,
};

const allWorkouts = [
  { id: "1", name: "Hypertrophy Push A", type: "Upper Body", duration: "60 min", exercises: 8, completed: false },
  { id: "2", name: "Leg Day", type: "Pernas", duration: "55 min", exercises: 7, completed: true },
  { id: "3", name: "Pull Workout", type: "Costas e Biceps", duration: "50 min", exercises: 6, completed: true },
  { id: "4", name: "Cardio HIIT", type: "Cardio", duration: "30 min", exercises: 5, completed: true },
];

export function StudentWorkouts() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <div className="bg-card border-b border-border p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl mb-1">Treinos</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Gerencie e inicie seus treinos</p>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <Card className="bg-card border-primary/30 overflow-hidden">
            <div className="bg-gradient-to-br from-primary/20 to-transparent p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4 gap-3">
                <div className="min-w-0 flex-1">
                  <Badge className="bg-primary text-primary-foreground mb-2 text-xs">
                    TREINO DE HOJE
                  </Badge>
                  <h2 className="text-lg sm:text-2xl mb-1 break-words">{todayWorkout.name}</h2>
                  <p className="text-muted-foreground text-sm sm:text-base">{todayWorkout.type}</p>
                </div>
                <Dumbbell className="h-10 w-10 sm:h-12 sm:w-12 text-primary/40 shrink-0" />
              </div>
              <div className="relative z-10 flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <TrendingUp className="h-4 w-4 text-primary shrink-0" />
                  <span>{todayWorkout.exercises} exercícios</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Calendar className="h-4 w-4 text-primary shrink-0" />
                  <span>{todayWorkout.duration}</span>
                </div>
              </div>
              <Button
                className="relative z-10 w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 sm:h-14 text-sm sm:text-base"
                onClick={() => navigate("/workout-overview")}
              >
                <PlayCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                VER TREINO / INICIAR
              </Button>
            </div>
          </Card>

          <Card className="bg-card p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl mb-4">Todos os treinos</h3>
            <div className="space-y-3">
              {allWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="bg-primary/20 p-2 rounded shrink-0">
                      <Dumbbell className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base truncate">{workout.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{workout.type} · {workout.duration} · {workout.exercises} ex.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {workout.completed && (
                      <Badge variant="secondary" className="bg-success/20 text-success border-success/30 text-xs">
                        Completo
                      </Badge>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate("/workout-overview")}
                    >
                      Ver
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#171717] border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
        <div className="flex justify-around items-center h-14 sm:h-16 max-w-4xl mx-auto px-2 sm:px-4">
          <Button
            variant="ghost"
            size="icon"
            className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0"
            onClick={() => navigate("/dashboard/student")}
          >
            <Home className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span className="text-[10px] sm:text-xs truncate">Início</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0">
            <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
            <span className="text-[10px] sm:text-xs text-primary truncate">Treinos</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0"
            onClick={() => navigate("/diet")}
          >
            <ChefHat className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span className="text-[10px] sm:text-xs truncate">Dieta</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0"
            onClick={() => navigate("/dashboard/perfil")}
          >
            <User className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span className="text-[10px] sm:text-xs truncate">Perfil</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
