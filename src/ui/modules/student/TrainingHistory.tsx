import { useState } from "react";
import { useNavigate } from "react-router";
import { PageHeader } from "@/ui/components/ui/page-header";
import { FloatingNav, type FloatingNavItem } from "@/ui/components/ui/floating-nav";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Home,
  Dumbbell,
  ChefHat,
  User,
  ArrowLeft,
  Flame,
  ChevronRight,
  Calendar as CalendarIcon,
  TrendingDown,
  Target,
} from "lucide-react";

const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];

const MOCK_WORKOUT_DAYS = [2, 5, 9, 12, 16, 19, 23, 26];
const MOCK_SEQUENCIA = 4;
const MOCK_TREINOS_MES = 12;

/** Volume semanal (kg) para o gráfico — últimas 10 semanas */
const MOCK_VOLUME_DATA = [
  { semana: "Sem 1", volume: 28500 },
  { semana: "Sem 2", volume: 26200 },
  { semana: "Sem 3", volume: 30100 },
  { semana: "Sem 4", volume: 27800 },
  { semana: "Sem 5", volume: 32000 },
  { semana: "Sem 6", volume: 29500 },
  { semana: "Sem 7", volume: 26800 },
  { semana: "Sem 8", volume: 25200 },
  { semana: "Sem 9", volume: 24100 },
  { semana: "Sem 10", volume: 22800 },
];

const MOCK_VOLUME_TOTAL = 251932;
const MOCK_VOLUME_TREND = -43;
const MOCK_VOLUME_DATE_RANGE = "23 nov. 2025 - 14 fev. 2026 vs. 3 meses anteriores";

/** Duração: horas por período (mock segundo card do carousel) */
const MOCK_DURACAO_DATA = [
  { semana: "Sem 1", horas: 2.25 },
  { semana: "Sem 2", horas: 2.1 },
  { semana: "Sem 3", horas: 2.4 },
  { semana: "Sem 4", horas: 2.0 },
  { semana: "Sem 5", horas: 2.5 },
  { semana: "Sem 6", horas: 2.15 },
  { semana: "Sem 7", horas: 1.9 },
  { semana: "Sem 8", horas: 2.05 },
  { semana: "Sem 9", horas: 1.85 },
  { semana: "Sem 10", horas: 1.75 },
];
const MOCK_DURACAO_TOTAL_H = "2h 04";
const MOCK_DURACAO_ANTERIOR = "1h 52";

const MOCK_ATIVIDADE_RECENTE = [
  { data: "2026-02-12", label: "Treino A — Peito e tríceps" },
  { data: "2026-02-10", label: "Treino B — Costas e bíceps" },
  { data: "2026-02-09", label: "Treino A — Peito e tríceps" },
  { data: "2026-02-07", label: "Treino C — Pernas e ombros" },
  { data: "2026-02-05", label: "Treino B — Costas e bíceps" },
];

type ExerciseMock = { id: string; name: string; oneRm: number; trend: number[] };
const MOCK_EXERCICIOS: ExerciseMock[] = [
  { id: "1", name: "Triceps Pushdown", oneRm: 42, trend: [32, 35, 38, 40, 42] },
  { id: "2", name: "Lateral Raise", oneRm: 14, trend: [10, 11, 12, 13, 14] },
  { id: "3", name: "Lever Seated Chest Press", oneRm: 65, trend: [50, 55, 58, 62, 65] },
  { id: "4", name: "Lever Seated Row", oneRm: 55, trend: [45, 48, 52, 54, 55] },
  { id: "5", name: "Lever Incline Press", oneRm: 48, trend: [40, 42, 45, 46, 48] },
  { id: "6", name: "Lever Preacher Curl", oneRm: 28, trend: [22, 24, 26, 27, 28] },
];

function getCalendarGrid(year: number, month: number): (number | null)[] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startPad = first.getDay();
  const daysInMonth = last.getDate();
  const grid: (number | null)[] = [];
  for (let i = 0; i < startPad; i++) grid.push(null);
  for (let d = 1; d <= daysInMonth; d++) grid.push(d);
  const total = grid.length;
  const rest = Math.ceil(total / 7) * 7 - total;
  for (let i = 0; i < rest; i++) grid.push(null);
  return grid;
}

function formatAtividadeDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

/** Barra de progresso baseada no trend (primeiro → último valor) */
function MiniTrendBar({ trend }: { trend: number[] }) {
  if (trend.length < 2) return null;
  const min = Math.min(...trend);
  const max = Math.max(...trend);
  const range = max - min || 1;
  const last = trend[trend.length - 1];
  const pct = ((last - min) / range) * 100;
  return (
    <div className="h-1.5 w-full max-w-[64px] sm:max-w-[72px] rounded-full bg-white/10 overflow-hidden shrink-0">
      <div
        className="h-full rounded-full bg-primary transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
      />
    </div>
  );
}

const CAROUSEL_SLIDES = ["volume", "duracao"] as const;

export function TrainingHistory() {
  const navigate = useNavigate();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthLabel = now.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  const calendarGrid = getCalendarGrid(year, month);

  const floatingNavItems: FloatingNavItem[] = [
    { icon: <Home />, label: "Início", onClick: () => navigate("/dashboard/student") },
    { icon: <Dumbbell />, label: "Treinos", onClick: () => navigate("/student/workouts") },
    { icon: <ChefHat />, label: "Dieta", onClick: () => navigate("/diet") },
    { icon: <User />, label: "Perfil", onClick: () => navigate("/dashboard/perfil") },
  ];

  return (
    <div className="min-h-screen bg-page-dark pb-28 sm:pb-24 flex flex-col">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <PageHeader
          title="Histórico de treino"
          subtitle="Seu progresso nos treinos"
          titleSize="large"
          leftSlot={
            <button
              type="button"
              onClick={() => navigate("/dashboard/perfil")}
              className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/5 transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft className="size-5" />
            </button>
          }
        />

      <main className="space-y-6 sm:space-y-8">
        {/* Bloco de números em faixa única */}
        <section className="flex gap-3 overflow-x-auto overflow-y-hidden pb-2 -mx-1 px-1 scrollbar-none touch-pan-x snap-x snap-mandatory">
          <div className="flex shrink-0 snap-start items-center gap-3 rounded-2xl bg-gradient-to-br from-amber-500/15 to-amber-600/5 border border-amber-500/20 px-4 py-3.5 sm:px-5 sm:py-4 min-w-[calc(50vw-1.5rem)] max-w-[180px] sm:min-w-[140px] sm:max-w-none">
            <div className="size-9 sm:size-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
              <Flame className="size-4 sm:size-5 text-amber-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xl sm:text-2xl font-bold text-white tabular-nums">{MOCK_SEQUENCIA}</p>
              <p className="text-xs text-white/50 uppercase tracking-wider">Sequência</p>
            </div>
          </div>
          <div className="flex shrink-0 snap-start items-center gap-3 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 px-4 py-3.5 sm:px-5 sm:py-4 min-w-[calc(50vw-1.5rem)] max-w-[180px] sm:min-w-[140px] sm:max-w-none">
            <div className="size-9 sm:size-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
              <Dumbbell className="size-4 sm:size-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xl sm:text-2xl font-bold text-white tabular-nums">{MOCK_TREINOS_MES}</p>
              <p className="text-xs text-white/50 uppercase tracking-wider">Treinos no mês</p>
            </div>
          </div>
          {/* Espaço no fim do scroll no mobile */}
          <div className="shrink-0 w-2 sm:w-0" aria-hidden />
        </section>

        {/* Módulo Volume / Duração (carousel) */}
        <section>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
            {carouselIndex === 0 && (
              <div className="p-4 sm:p-5">
                <h3 className="text-base font-semibold text-white/95 mb-1">Volume</h3>
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums tracking-tight">
                  {MOCK_VOLUME_TOTAL.toLocaleString("pt-BR")} kg
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <p className="text-xs text-white/50">{MOCK_VOLUME_DATE_RANGE}</p>
                  <span className="inline-flex items-center gap-0.5 text-xs font-medium text-red-400">
                    <TrendingDown className="size-3.5" />
                    {MOCK_VOLUME_TREND}%
                  </span>
                </div>
                <div className="h-[140px] sm:h-[160px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={MOCK_VOLUME_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <XAxis dataKey="semana" tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} />
                      <YAxis domain={["dataMin - 2000", "dataMax + 2000"]} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} width={28} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1c1c1c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", fontSize: "12px" }}
                        formatter={(value: number) => [`${value.toLocaleString("pt-BR")} kg`, "Volume"]}
                        labelStyle={{ color: "rgba(255,255,255,0.7)" }}
                      />
                      <Line type="monotone" dataKey="volume" stroke="var(--primary)" strokeWidth={2} dot={{ fill: "var(--primary)", r: 3 }} activeDot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
            {carouselIndex === 1 && (
              <div className="p-4 sm:p-5">
                <h3 className="text-base font-semibold text-white/95 mb-1">Duração</h3>
                <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums tracking-tight">{MOCK_DURACAO_TOTAL_H}</p>
                <p className="text-xs text-white/50 mt-2">Média por semana · anterior: {MOCK_DURACAO_ANTERIOR}</p>
                <div className="h-[140px] sm:h-[160px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={MOCK_DURACAO_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <XAxis dataKey="semana" tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, "auto"]} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} width={28} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}h`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1c1c1c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", fontSize: "12px" }}
                        formatter={(value: number) => [`${value.toFixed(1)} h`, "Duração"]}
                        labelStyle={{ color: "rgba(255,255,255,0.7)" }}
                      />
                      <Line type="monotone" dataKey="horas" stroke="var(--primary)" strokeWidth={2} dot={{ fill: "var(--primary)", r: 3 }} activeDot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
            <div className="flex justify-center gap-1.5 pb-4">
              {CAROUSEL_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCarouselIndex(i)}
                  className={`size-2 rounded-full transition-colors ${
                    i === carouselIndex ? "bg-primary scale-110" : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={i === 0 ? "Ver Volume" : "Ver Duração"}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Módulo Objetivo sugerido */}
        <section>
          <div className="flex items-center justify-between gap-2 mb-3">
            <h2 className="text-sm font-semibold text-white/90">Objetivo sugerido</h2>
            <button type="button" className="text-xs font-medium text-primary hover:underline shrink-0">
              Adicionar um objetivo
            </button>
          </div>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="size-12 shrink-0 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Dumbbell className="size-6 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white/95">5 Treinos por semana</p>
                <p className="text-xs text-white/50 mt-0.5">0/5 Concluídos</p>
              </div>
            </div>
            <button
              type="button"
              className="shrink-0 w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary text-[#171512] font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              onClick={() => {}}
            >
              <Target className="size-4" />
              Definir Meta
            </button>
          </div>
        </section>

        {/* Calendário minimalista */}
        <section>
          <div className="flex items-center justify-between gap-2 mb-3">
            <h2 className="text-sm font-semibold text-white/90">Calendário</h2>
            <span className="text-xs text-white/40 capitalize truncate max-w-[50%] sm:max-w-none" title={monthLabel}>
              {monthLabel}
            </span>
          </div>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-3 sm:p-4">
            <div className="grid grid-cols-7 gap-0.5 sm:gap-0.5 mb-1.5 sm:mb-2">
              {WEEKDAYS.map((d) => (
                <div key={d} className="text-center text-[10px] sm:text-[10px] text-white/40 py-0.5 sm:py-1 font-medium">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-0.5 sm:gap-0.5">
              {calendarGrid.map((day, i) => {
                const hasWorkout = day !== null && MOCK_WORKOUT_DAYS.includes(day);
                return (
                  <div
                    key={i}
                    className={`flex flex-col items-center justify-center min-h-[32px] sm:min-h-0 aspect-square rounded-md sm:rounded-lg text-xs font-medium ${
                      day === null ? "invisible" : "text-white/70"
                    } ${hasWorkout ? "bg-primary/25 text-primary" : ""}`}
                  >
                    {day ?? ""}
                    {hasWorkout && (
                      <span className="mt-0.5 size-1.5 sm:size-1 rounded-full bg-primary shrink-0" aria-hidden />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Atividade recente — lista simples */}
        <section>
          <h2 className="text-sm font-semibold text-white/90 mb-3">Atividade recente</h2>
          <ul className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.04]">
            {MOCK_ATIVIDADE_RECENTE.map((item, idx) => (
              <li key={item.data + idx}>
                <button
                  type="button"
                  className="w-full flex items-center gap-3 sm:gap-4 px-4 py-4 sm:py-3.5 text-left hover:bg-white/[0.04] active:bg-white/[0.05] transition-colors min-h-[56px] touch-manipulation"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 border border-primary/20">
                    <CalendarIcon className="size-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white/95 truncate">{item.label}</p>
                    <p className="text-xs text-white/45 mt-0.5">{formatAtividadeDate(item.data)}</p>
                  </div>
                  <ChevronRight className="size-4 text-white/30 shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Exercícios — cards com barra de tendência */}
        <section>
          <div className="flex items-center justify-between gap-2 mb-3">
            <h2 className="text-sm font-semibold text-white/90">Progresso nos exercícios</h2>
            <span className="text-xs text-white/40 shrink-0">1RM estimado</span>
          </div>
          <ul className="space-y-2">
            {MOCK_EXERCICIOS.map((ex) => (
              <li key={ex.id}>
                <button
                  type="button"
                  className="w-full flex items-center gap-3 sm:gap-4 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 sm:p-4 text-left hover:bg-white/[0.05] hover:border-white/[0.08] active:bg-white/[0.06] transition-all min-h-[56px] touch-manipulation"
                >
                  <div className="size-10 sm:size-11 shrink-0 rounded-xl bg-white/[0.06] flex items-center justify-center border border-white/5">
                    <Dumbbell className="size-4 sm:size-5 text-primary/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white/95 truncate">{ex.name}</p>
                    <div className="flex items-center gap-2 sm:gap-3 mt-1.5 flex-wrap">
                      <MiniTrendBar trend={ex.trend} />
                      <span className="text-xs font-semibold text-primary tabular-nums shrink-0">
                        {ex.oneRm} kg
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-white/25 shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
      </div>

      <FloatingNav items={floatingNavItems} position="bottom-center" />
    </div>
  );
}
