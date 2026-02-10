import React from "react";
import { useNavigate } from "react-router-dom";
import { useSparta } from "@/shared/context/SpartaContext";
import { Button } from "@/ui/components/ui/button";
import { Progress } from "@/ui/components/ui/progress";
import {
  Home,
  Dumbbell,
  ChefHat,
  User,
  CheckCircle2,
  Bot,
  PlusCircle,
} from "lucide-react";

const DailyDiet: React.FC = () => {
  const navigate = useNavigate();
  const { meals } = useSparta();

  const totals = meals.reduce(
    (acc, m) => ({
      calories: acc.calories + (m.completed ? m.calories : 0),
      protein: acc.protein + (m.completed ? m.protein : 0),
      carbs: acc.carbs + (m.completed ? m.carbs : 0),
      fat: acc.fat + (m.completed ? m.fat : 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const targets = { calories: 2400, protein: 180, carbs: 200, fat: 60 };

  const macros = [
    { label: "PROT", key: "protein" as const },
    { label: "CARB", key: "carbs" as const },
    { label: "GORD", key: "fat" as const },
  ];

  return (
    <div className="min-h-screen bg-page-dark pb-20 sm:pb-24 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        <div className="glass-card border-0 border-b border-white/10 rounded-none rounded-b-2xl p-4 sm:p-6 lg:p-6">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-1 truncate text-white">Nutrição Diária</h1>
            <p className="text-white/70 text-sm sm:text-base">Sua dieta e macros do dia</p>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Seletor de dia (opcional - mantido do layout original) */}
          <div className="flex justify-center gap-2">
            {[
              { label: "SEG", day: "22", active: false },
              { label: "Hoje", day: "24", active: true },
              { label: "QUI", day: "25", active: false },
            ].map((d) => (
              <div
                key={d.label}
                className={`flex flex-col items-center justify-center w-10 sm:w-12 h-12 sm:h-14 rounded-lg border ${
                  d.active
                    ? "bg-primary text-primary-foreground border-primary scale-105 shadow-lg"
                    : "bg-muted/50 border-border opacity-70"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {d.label}
                </span>
                <span className="text-sm sm:text-base font-bold leading-none">
                  {d.day}
                </span>
              </div>
            ))}
          </div>

          {/* Certificado Digital / Plano IA */}
          <div className="rounded-2xl p-4 bg-white/[0.06] border border-white/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="flex flex-col gap-0.5 border-r border-white/10 pr-4 items-center justify-center shrink-0">
                <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-primary/80" />
                <span className="text-[10px] font-medium text-primary/70 tracking-wider">A.I.</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-primary/70 mb-0.5">Certificado Digital</p>
                <p className="text-sm text-white/85">
                  Plano sugerido por Inteligência Artificial
                </p>
              </div>
            </div>
          </div>

          {/* Resumo de Macros */}
          <div className="rounded-2xl p-4 sm:p-5 bg-white/[0.06] border border-white/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.06)] backdrop-blur-sm">
            <div className="flex items-end justify-between mb-3 gap-2">
              <h2 className="text-sm font-medium text-white/90 tracking-tight">
                Resumo de Macros
              </h2>
              <span className="text-[11px] text-white/45">Meta diária</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {macros.map(({ label, key }) => {
                const val = totals[key];
                const target = targets[key];
                const pct = Math.min(100, Math.round((val / target) * 100));
                return (
                  <div
                    key={key}
                    className="bg-white/[0.04] p-2.5 sm:p-3 rounded-lg flex flex-col gap-1.5"
                  >
                    <div className="flex justify-between items-center gap-1">
                      <span className="text-[10px] font-medium text-white/50 tracking-wider">
                        {label}
                      </span>
                      <span className="text-[10px] font-medium text-primary/70 shrink-0">
                        {pct}%
                      </span>
                    </div>
                    <Progress value={pct} className="h-1 bg-white/10 [&>div]:bg-primary/70" />
                    <p className="text-[11px] text-white/80 font-medium">
                      {val}g <span className="text-white/45">/ {target}g</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lista de refeições */}
          <div className="space-y-2">
            {meals.length > 0 ? (
              meals.map((meal, index) => (
                <div
                  key={meal.id || index}
                  className="rounded-2xl p-4 bg-white/[0.06] border border-white/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.06)] border-l-2 border-l-primary/40"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-semibold text-white/95 tracking-tight">
                            {meal.name}
                          </h3>
                          <span className="text-[10px] text-white/45 font-medium">
                            {meal.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-primary/80 mt-0.5">
                          {meal.calories} kcal · {meal.completed ? "Meta atingida" : "Pendente"}
                        </p>
                      </div>
                      <div
                        className={`shrink-0 size-4 rounded-full flex items-center justify-center ${
                          meal.completed
                            ? "bg-primary/70 text-white"
                            : "bg-white/10 border border-white/20"
                        }`}
                      >
                        {meal.completed && (
                          <CheckCircle2 className="h-2.5 w-2.5" />
                        )}
                      </div>
                    </div>
                    <p
                      className={`text-[11px] ${
                        meal.completed
                          ? "text-white/40 line-through"
                          : "text-white/60"
                      }`}
                    >
                      {meal.protein}g prot · {meal.carbs}g carb · {meal.fat}g gordura
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl p-6 text-center bg-white/[0.06] border border-white/[0.06]">
                <p className="text-sm text-white/50">
                  Nenhuma refeição registrada hoje. Registre sua primeira
                  refeição abaixo.
                </p>
              </Card>
            )}
          </div>

          <Button variant="default" size="lg" className="w-full rounded-xl font-medium" onClick={() => navigate("/meal-scan")}>
            <PlusCircle className="mr-2 size-4" />
            Registrar refeição
          </Button>
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
          <Button variant="ghost" size="icon" className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0">
            <ChefHat className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
            <span className="text-[10px] sm:text-xs text-primary truncate">Dieta</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0 text-white/70 hover:text-white" onClick={() => navigate("/dashboard/perfil")}>
            <User className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span className="text-[10px] sm:text-xs truncate">Perfil</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DailyDiet;
