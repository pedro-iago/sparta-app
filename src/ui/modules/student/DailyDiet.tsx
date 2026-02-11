import React, { useState } from "react";
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
  Calendar,
} from "lucide-react";

type MacroTab = "calories" | "protein" | "carbs" | "fat";

const TAB_CONFIG: { key: MacroTab; label: string; unit: string }[] = [
  { key: "calories", label: "Calorias", unit: "kcal" },
  { key: "protein", label: "Proteína", unit: "g" },
  { key: "fat", label: "Gordura", unit: "g" },
  { key: "carbs", label: "Carbos", unit: "g" },
];

const DailyDiet: React.FC = () => {
  const navigate = useNavigate();
  const { meals } = useSparta();
  const [activeTab, setActiveTab] = useState<MacroTab>("calories");

  const totals = meals.reduce(
    (acc, m) => ({
      calories: acc.calories + (m.completed ? m.calories : 0),
      protein: acc.protein + (m.completed ? m.protein : 0),
      carbs: acc.carbs + (m.completed ? m.carbs : 0),
      fat: acc.fat + (m.completed ? m.fat : 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );

  const targets = { calories: 2400, protein: 180, carbs: 200, fat: 60 };

  const macros = [
    { label: "PROT", key: "protein" as const },
    { label: "CARB", key: "carbs" as const },
    { label: "GORD", key: "fat" as const },
  ];

  const currentValue = totals[activeTab];
  const currentTarget = targets[activeTab];
  const currentUnit = TAB_CONFIG.find((t) => t.key === activeTab)?.unit ?? "kcal";
  const progressPercent = currentTarget > 0 ? Math.min(100, Math.round((currentValue / currentTarget) * 100)) : 0;
  const left = Math.max(0, currentTarget - currentValue);
  const dateLabel = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "short" });

  return (
    <div className="min-h-screen bg-page-dark pb-20 sm:pb-24 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — mesmo formato do dashboard (card arredondado) */}
        <header className="glass-card-3d border border-white/10 rounded-2xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8 mb-4 sm:mb-5">
          <h1 className="text-2xl sm:text-3xl mb-1 truncate text-white font-bold">
            Nutrição Diária
          </h1>
          <p className="text-white/70 text-sm sm:text-base">
            Sua dieta e macros do dia
          </p>
        </header>

        {/* Conteúdo */}
        <div className="py-4 sm:py-5 lg:py-6 space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Data + ícone (estilo referência) */}
          <div className="flex items-center justify-between gap-3">
            <p className="text-lg sm:text-xl font-bold text-white capitalize">
              {dateLabel}
            </p>
            <div className="flex size-10 sm:size-11 items-center justify-center rounded-xl bg-primary/20 border border-primary/30">
              <Calendar className="size-5 sm:size-6 text-primary" />
            </div>
          </div>

          {/* Abas em pill (Calorias, Proteína, Gordura, Carbos) */}
          <div className="flex flex-wrap gap-2">
            {TAB_CONFIG.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-colors touch-manipulation ${
                  activeTab === key
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-white/[0.08] text-white/80 hover:bg-white/[0.12] border border-white/10"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Medidor circular (métrica selecionada) */}
          <div className="flex flex-col items-center">
            <div
              className="relative flex size-44 sm:size-52 items-center justify-center rounded-full p-3"
              style={{
                background: `conic-gradient(rgb(213 159 57) 0deg, ${progressPercent * 3.6}deg, rgba(255,255,255,0.08) ${progressPercent * 3.6}deg)`,
              }}
            >
              <div className="flex size-full flex-col items-center justify-center rounded-full bg-page-dark">
                <span className="text-2xl sm:text-3xl font-bold tabular-nums text-white">
                  {activeTab === "calories" ? currentValue.toLocaleString("pt-BR") : currentValue}
                </span>
                <span className="text-xs sm:text-sm text-white/60">{currentUnit}</span>
                <span className="mt-0.5 text-[11px] sm:text-xs text-primary font-medium">
                  {left} restante
                </span>
              </div>
            </div>
          </div>

          {/* Certificado Digital / Plano IA */}
          <div className="glass-card-3d rounded-2xl p-4">
            <div className="flex items-start gap-4">
              <div className="flex flex-col gap-0.5 border-r border-white/10 pr-4 items-center justify-center shrink-0">
                <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-primary/80" />
                <span className="text-[10px] font-medium text-primary/70 tracking-wider">
                  A.I.
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-primary/70 mb-0.5">
                  Certificado Digital
                </p>
                <p className="text-sm text-white/85">
                  Plano sugerido por Inteligência Artificial
                </p>
              </div>
            </div>
          </div>

          {/* Resumo de Macros (grid compacto) */}
          <div className="glass-card-3d rounded-2xl p-4 sm:p-5">
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
                    className="bg-white/[0.04] p-2.5 sm:p-3 rounded-xl flex flex-col gap-1.5"
                  >
                    <div className="flex justify-between items-center gap-1">
                      <span className="text-[10px] font-medium text-white/50 tracking-wider">
                        {label}
                      </span>
                      <span className="text-[10px] font-medium text-primary/70 shrink-0">
                        {pct}%
                      </span>
                    </div>
                    <Progress value={pct} className="h-1.5 rounded-full bg-white/10 [&>div]:bg-primary/70" />
                    <p className="text-[11px] text-white/80 font-medium">
                      {val}g <span className="text-white/45">/ {target}g</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card Refeições (título + lista) */}
          <div className="glass-card-3d rounded-2xl overflow-hidden border border-white/10">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <h2 className="text-sm font-bold text-white">Refeições</h2>
              <span className="text-xs font-medium text-primary tabular-nums">{meals.length}</span>
            </div>
            <div className="divide-y divide-white/5">
            {meals.length > 0 ? (
              meals.map((meal, index) => (
                <div key={meal.id || index} className="p-4">
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
                          {meal.calories} kcal ·{" "}
                          {meal.completed ? "Meta atingida" : "Pendente"}
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
              <div className="p-6 text-center">
                <p className="text-sm text-white/50">
                  Nenhuma refeição registrada hoje. Registre sua primeira
                  refeição abaixo.
                </p>
              </div>
            )}
            </div>
          </div>

          <Button
            variant="default"
            size="lg"
            className="w-full rounded-xl font-medium"
            onClick={() => navigate("/meal-scan")}
          >
            <PlusCircle className="mr-2 size-4" />
            Registrar refeição
          </Button>
        </div>
      </div>

      {/* Bottom Navigation - safe area para notch/home */}
      <nav
        className="fixed bottom-0 left-0 right-0 glass-card-3d border-0 border-t border-white/10 rounded-none shadow-[0_-4px_20px_rgba(0,0,0,0.3)]"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex justify-around items-center min-h-14 sm:min-h-16 max-w-4xl mx-auto px-2 sm:px-4 lg:px-6 py-2">
          <Button
            variant="ghost"
            size="icon"
            className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0 min-h-[44px] sm:min-h-0 text-white/70 hover:text-white touch-manipulation"
            onClick={() => navigate("/dashboard/student")}
          >
            <Home className="size-4 sm:size-5 shrink-0" />
            <span className="text-[10px] sm:text-xs truncate">Início</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0 min-h-[44px] sm:min-h-0 text-white/70 hover:text-white touch-manipulation"
            onClick={() => navigate("/student/workouts")}
          >
            <Dumbbell className="size-4 sm:size-5 shrink-0" />
            <span className="text-[10px] sm:text-xs truncate">Treinos</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0 min-h-[44px] sm:min-h-0 touch-manipulation"
          >
            <ChefHat className="size-4 sm:size-5 text-primary shrink-0" />
            <span className="text-[10px] sm:text-xs text-primary truncate">
              Dieta
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="flex-col h-auto gap-0.5 sm:gap-1 py-2 min-w-0 min-h-[44px] sm:min-h-0 text-white/70 hover:text-white touch-manipulation"
            onClick={() => navigate("/dashboard/perfil")}
          >
            <User className="size-4 sm:size-5 shrink-0" />
            <span className="text-[10px] sm:text-xs truncate">Perfil</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default DailyDiet;
