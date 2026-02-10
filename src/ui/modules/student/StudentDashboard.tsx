import { useState } from "react";
import { Card } from "@/ui/components/ui/card";
import { Button } from "@/ui/components/ui/button";
import { Progress } from "@/ui/components/ui/progress";
import { Badge } from "@/ui/components/ui/badge";
import { 
  Flame, 
  Dumbbell, 
  PlayCircle, 
  ChefHat, 
  TrendingUp, 
  Trophy,
  Home,
  Calendar,
  User,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router";
import { TREINO_HOJE_ILLUSTRATION_URL } from "@/shared/constants/images";

export function StudentDashboard() {
  const navigate = useNavigate();
  const [currentStreak] = useState(7);
  
  // Mock data
  const todayWorkout = {
    name: "Hypertrophy Push A",
    type: "Upper Body",
    duration: "60 min",
    exercises: 8,
  };

  const macros = {
    protein: { current: 120, target: 180, unit: "g" },
    carbs: { current: 180, target: 250, unit: "g" },
    fats: { current: 45, target: 60, unit: "g" },
    calories: { current: 1650, target: 2400, unit: "kcal" },
  };

  const recentWorkouts = [
    { name: "Leg Day", date: "Ontem", completed: true },
    { name: "Pull Workout", date: "2 dias atrás", completed: true },
    { name: "Cardio HIIT", date: "3 dias atrás", completed: true },
  ];

  const handleLogout = () => {
    localStorage.removeItem("@sparta:user");
    navigate("/login", { replace: true });
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background pb-20 flex flex-col items-center">
      {/* Container responsivo: centralizado em monitores, full width em mobile */}
      <div className="w-full max-w-4xl">
        {/* Header - botão Sair no canto superior direito */}
        <div className="bg-card border-b border-border p-4 sm:p-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl mb-1 truncate">Olá, Atleta! 💪</h1>
              <p className="text-muted-foreground text-sm sm:text-base">Vamos dominar o dia</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="shrink-0 text-muted-foreground hover:text-foreground"
              title="Sair"
            >
              <LogOut className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>
          
          {/* Streak Counter */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-primary/10 to-transparent p-3 sm:p-4 rounded-lg border border-primary/20">
            <div className="bg-primary/20 p-2 sm:p-3 rounded-full shrink-0">
              <Flame className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-muted-foreground">Sequência Atual</p>
              <p className="text-xl sm:text-2xl font-bold text-primary">{currentStreak} dias</p>
            </div>
            <div className="shrink-0">
              <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-primary/60" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Today's Workout Card */}
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

            <Button className="relative z-10 w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 sm:h-14 text-sm sm:text-base"
              onClick={() => navigate("/student/workout")}
            >
              <PlayCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              INICIAR TREINO
            </Button>
          </div>
        </Card>

        {/* Daily Diet Progress */}
        <Card className="bg-card p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="bg-primary/20 p-2 rounded-lg shrink-0">
              <ChefHat className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl">Dieta de Hoje</h3>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {/* Calories */}
            <div>
              <div className="flex justify-between mb-2 gap-2">
                <span className="text-xs sm:text-sm font-medium">Calorias</span>
                <span className="text-xs sm:text-sm text-muted-foreground truncate">
                  {macros.calories.current}/{macros.calories.target} {macros.calories.unit}
                </span>
              </div>
              <Progress 
                value={(macros.calories.current / macros.calories.target) * 100} 
                className="h-3 bg-muted"
              />
            </div>

            {/* Protein */}
            <div>
              <div className="flex justify-between mb-2 gap-2">
                <span className="text-xs sm:text-sm font-medium">Proteína</span>
                <span className="text-xs sm:text-sm text-muted-foreground truncate">
                  {macros.protein.current}/{macros.protein.target} {macros.protein.unit}
                </span>
              </div>
              <Progress 
                value={(macros.protein.current / macros.protein.target) * 100}
                className="h-3 bg-muted [&>div]:bg-primary"
              />
            </div>

            {/* Carbs */}
            <div>
              <div className="flex justify-between mb-2 gap-2">
                <span className="text-xs sm:text-sm font-medium">Carboidratos</span>
                <span className="text-xs sm:text-sm text-muted-foreground truncate">
                  {macros.carbs.current}/{macros.carbs.target} {macros.carbs.unit}
                </span>
              </div>
              <Progress 
                value={(macros.carbs.current / macros.carbs.target) * 100}
                className="h-3 bg-muted [&>div]:bg-blue-500"
              />
            </div>

            {/* Fats */}
            <div>
              <div className="flex justify-between mb-2 gap-2">
                <span className="text-xs sm:text-sm font-medium">Gorduras</span>
                <span className="text-xs sm:text-sm text-muted-foreground truncate">
                  {macros.fats.current}/{macros.fats.target} {macros.fats.unit}
                </span>
              </div>
              <Progress 
                value={(macros.fats.current / macros.fats.target) * 100}
                className="h-3 bg-muted [&>div]:bg-orange-500"
              />
            </div>
          </div>
        </Card>

        {/* Recent Workouts */}
        <Card className="bg-card p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl mb-4">Treinos Recentes</h3>
          <div className="space-y-3">
            {recentWorkouts.map((workout, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border gap-3"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="bg-primary/20 p-2 rounded shrink-0">
                    <Dumbbell className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm sm:text-base truncate">{workout.name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{workout.date}</p>
                  </div>
                </div>
                {workout.completed && (
                  <Badge variant="secondary" className="bg-success/20 text-success border-success/30 shrink-0 text-xs">
                    Completo
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
        </div>
      </div>

      {/* Bottom Navigation - alinhado ao container em telas grandes */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#171717] border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
        <div className="flex justify-around items-center h-14 sm:h-16 max-w-4xl mx-auto px-2 sm:px-4">
          <Button variant="ghost" size="icon" className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0">
            <Home className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
            <span className="text-[10px] sm:text-xs text-primary truncate">Início</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0"
            onClick={() => navigate("/student/workouts")}
          >
            <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span className="text-[10px] sm:text-xs truncate">Treinos</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0">
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