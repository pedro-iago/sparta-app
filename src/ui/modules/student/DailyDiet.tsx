import React from "react";
import { useNavigate } from "react-router-dom";
import { useSparta } from "@/shared/context/SpartaContext";
import { Card } from "@/ui/components/ui/card";
import { Button } from "@/ui/components/ui/button";
import { Badge } from "@/ui/components/ui/badge";
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
    <div className="min-h-screen bg-background pb-20 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Header - mesmo padrão do dashboard (sem botão perfil no topo) */}
        <div className="bg-card border-b border-border p-4 sm:p-6">
          <div>
            <h1 className="text-2xl sm:text-3xl mb-1 truncate">
              Nutrição Diária
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Sua dieta e macros do dia
            </p>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
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
          <Card className="bg-card border-primary/20 overflow-hidden">
            <div className="p-4 flex items-start gap-4">
              <div className="flex flex-col gap-1 border-r border-primary/20 pr-4 items-center justify-center shrink-0">
                <Bot className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
                  A.I.
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <Badge className="bg-primary/20 text-primary border-primary/30 text-xs mb-2">
                  Certificado Digital
                </Badge>
                <p className="text-sm text-foreground">
                  Plano sugerido por Inteligência Artificial
                </p>
              </div>
            </div>
          </Card>

          {/* Resumo de Macros */}
          <Card className="bg-card p-4 sm:p-6">
            <div className="flex items-end justify-between mb-4 gap-2">
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-wide">
                Resumo de Macros
              </h2>
              <span className="text-xs text-muted-foreground font-medium">
                Meta diária
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {macros.map(({ label, key }) => {
                const val = totals[key];
                const target = targets[key];
                const pct = Math.min(100, Math.round((val / target) * 100));
                return (
                  <div
                    key={key}
                    className="bg-muted/50 p-3 rounded-lg border border-border flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-center gap-1">
                      <span className="text-[10px] sm:text-xs font-bold text-muted-foreground tracking-wider">
                        {label}
                      </span>
                      <span className="text-[10px] sm:text-xs text-primary font-bold shrink-0">
                        {pct}%
                      </span>
                    </div>
                    <Progress value={pct} className="h-1.5 bg-muted" />
                    <p className="text-xs text-foreground font-medium">
                      {val}g{" "}
                      <span className="text-muted-foreground">/ {target}g</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Lista de refeições */}
          <div className="space-y-3">
            {meals.length > 0 ? (
              meals.map((meal, index) => (
                <Card
                  key={meal.id || index}
                  className="bg-card border-l-4 border-l-primary overflow-hidden"
                >
                  <div className="p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider flex items-center gap-2 flex-wrap">
                          {meal.name}
                          <Badge
                            variant="secondary"
                            className="text-xs font-normal bg-muted"
                          >
                            {meal.time}
                          </Badge>
                        </h3>
                        <p className="text-xs text-primary mt-1 font-medium">
                          {meal.calories} Kcal •{" "}
                          {meal.completed ? "Meta atingida" : "Pendente"}
                        </p>
                      </div>
                      <div
                        className={`shrink-0 size-5 rounded border flex items-center justify-center ${
                          meal.completed
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted-foreground/30"
                        }`}
                      >
                        {meal.completed && (
                          <CheckCircle2 className="h-3 w-3" />
                        )}
                      </div>
                    </div>
                    <div className="h-px bg-border w-full" />
                    <p
                      className={`text-xs sm:text-sm ${
                        meal.completed
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }`}
                    >
                      {meal.protein}g Prot • {meal.carbs}g Carb • {meal.fat}g
                      Gord
                    </p>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="bg-card p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Nenhuma refeição registrada hoje. Registre sua primeira
                  refeição abaixo.
                </p>
              </Card>
            )}
          </div>

          {/* Botão Registrar Refeição */}
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 sm:h-14 text-sm sm:text-base font-bold uppercase tracking-wide shadow-lg"
            onClick={() => navigate("/meal-scan")}
          >
            <PlusCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Registrar Refeição
          </Button>
        </div>
      </div>

      {/* Bottom Navigation - mesmo padrão do dashboard e treinos */}
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
          <Button
            variant="ghost"
            size="icon"
            className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0"
            onClick={() => navigate("/student/workouts")}
          >
            <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span className="text-[10px] sm:text-xs truncate">Treinos</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0"
          >
            <ChefHat className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
            <span className="text-[10px] sm:text-xs text-primary truncate">
              Dieta
            </span>
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
};

export default DailyDiet;
