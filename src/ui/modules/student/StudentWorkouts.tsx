import { Button } from "@/ui/components/ui/button";
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
    <div className="min-h-screen bg-page-dark pb-20 sm:pb-24 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        <div className="glass-card border-0 border-b border-white/10 rounded-none rounded-b-2xl p-4 sm:p-6 lg:p-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-1 text-white">Treinos</h1>
          <p className="text-white/70 text-sm sm:text-base">Gerencie e inicie seus treinos</p>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="rounded-2xl p-4 sm:p-5 bg-white/[0.06] border border-white/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-sm">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-primary/80 uppercase tracking-wider mb-1">Treino de hoje</p>
                <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight break-words">{todayWorkout.name}</h2>
                <p className="text-white/60 text-sm mt-0.5">{todayWorkout.type}</p>
              </div>
              <Dumbbell className="h-8 w-8 sm:h-9 sm:w-9 text-primary/50 shrink-0" />
            </div>
            <div className="flex flex-wrap gap-3 mb-4 text-xs text-white/50">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="size-3.5 text-primary/60" />
                {todayWorkout.exercises} exercícios
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-primary/60" />
                {todayWorkout.duration}
              </span>
            </div>
            <Button variant="default" size="lg" className="w-full rounded-xl font-medium" onClick={() => navigate("/workout-overview")}>
              <PlayCircle className="mr-2 size-4" />
              Ver treino / Iniciar
            </Button>
          </div>

          <div className="rounded-2xl p-4 sm:p-5 bg-white/[0.06] border border-white/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-sm">
            <h3 className="text-sm font-medium text-white/90 tracking-tight mb-3">Todos os treinos</h3>
            <div className="space-y-1.5">
              {allWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-white/[0.04] gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="size-1.5 rounded-full shrink-0 bg-primary/50" />
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate text-white/95">{workout.name}</p>
                      <p className="text-[11px] text-white/45">{workout.type} · {workout.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {workout.completed && (
                      <span className="text-[10px] font-medium text-primary/80">Concluído</span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/70 hover:text-white h-8 text-xs"
                      onClick={() => navigate("/workout-overview")}
                    >
                      Ver
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 glass-card border-0 border-t border-white/10 rounded-none shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <div className="flex justify-around items-center h-14 sm:h-16 max-w-4xl mx-auto px-2 sm:px-4 lg:px-6">
          <Button variant="ghost" size="icon" className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0 text-white/70 hover:text-white" onClick={() => navigate("/dashboard/student")}>
            <Home className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span className="text-[10px] sm:text-xs truncate">Início</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0">
            <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
            <span className="text-[10px] sm:text-xs text-primary truncate">Treinos</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0 text-white/70 hover:text-white" onClick={() => navigate("/diet")}>
            <ChefHat className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span className="text-[10px] sm:text-xs truncate">Dieta</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0 text-white/70 hover:text-white" onClick={() => navigate("/dashboard/perfil")}>
            <User className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span className="text-[10px] sm:text-xs truncate">Perfil</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
