import React from "react";
import { useNavigate } from "react-router-dom";
import { useSparta } from "@/shared/context/SpartaContext";
import { Card } from "@/ui/components/ui/card";
import { Button } from "@/ui/components/ui/button";
import { PlayCircle, ArrowLeft, Flame, Clock, Dumbbell } from "lucide-react";
import { IMAGES } from "@/shared/constants/images";
import type { Workout, Exercise } from "@/shared/types";
import { MuscleGroup } from "@/shared/types";

/** Dados exibidos na tela (apenas apresentação). Calorias quando vier da API no futuro. */
export interface WorkoutOverviewData {
  workout: Workout;
  /** Calorias estimadas */
  caloriesEstimated?: number;
  /** URL do avatar do instrutor ou indicador de contexto (opcional) */
  instructorAvatarUrl?: string;
}

/** Treino de demonstração quando o contexto ainda não tem currentWorkout (ex.: após login sem API). Exportado para ActiveWorkout. */
export const DEMO_WORKOUT: Workout = {
  id: "demo-1",
  name: "Full body workout",
  focalMuscles: "Corpo completo",
  duration: 45,
  exercises: [
    {
      id: "ex-1",
      name: "Agachamento livre",
      sets: 3,
      reps: "12",
      muscleGroup: MuscleGroup.LEGS,
      image: IMAGES.WORKOUT_MAIN,
    },
    {
      id: "ex-2",
      name: "Supino reto",
      sets: 3,
      reps: "10",
      muscleGroup: MuscleGroup.CHEST,
      image: IMAGES.WORKOUT_MAIN,
    },
    {
      id: "ex-3",
      name: "Remada curvada",
      sets: 3,
      reps: "12",
      muscleGroup: MuscleGroup.BACK,
      image: IMAGES.WORKOUT_MAIN,
    },
  ],
  isAiGenerated: true,
};

export interface WorkoutOverviewCallbacks {
  onBack: () => void;
  onStartWorkout: () => void;
  /** Opcional: ao clicar em um exercício da lista (ex.: abrir detalhe ou ir para treino ativo) */
  onExerciseClick?: (exercise: Exercise, index: number) => void;
}

export interface WorkoutOverviewProps extends WorkoutOverviewData, WorkoutOverviewCallbacks {}

/**
 * Tela de visão geral do treino.
 * Apenas UI: exibe dados recebidos por props e dispara eventos.
 * Sem lógica de negócio, cálculos complexos ou chamadas de API.
 */
export function WorkoutOverviewScreen({
  workout,
  caloriesEstimated,
  instructorAvatarUrl,
  onBack,
  onStartWorkout,
  onExerciseClick,
}: WorkoutOverviewProps) {
  const heroImage = workout.exercises[0]?.image || IMAGES.SPLASH_BG;

  return (
    <div className="min-h-screen bg-page-dark flex flex-col">
      {/* Hero: imagem principal do exercício (conteúdo não interativo) */}
      <div className="relative w-full aspect-[4/3] sm:aspect-video max-h-[45vh] sm:max-h-[50vh] lg:max-h-[55vh] rounded-b-2xl sm:rounded-b-3xl overflow-hidden shrink-0 max-w-4xl mx-auto">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        {/* Transição suave entre imagem e texto (semi-transparência, sem corte brusco) */}
        <div
          className="absolute inset-x-0 bottom-0 h-20 sm:h-28 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(15, 20, 22, 0.4) 40%, rgba(15, 20, 22, 0.85) 100%)",
          }}
        />

        {/* Header sobreposto com fundo translúcido */}
        <header className="absolute inset-x-0 top-0 z-10 glass-card border-0 rounded-none rounded-b-2xl px-4 sm:px-6 py-3 flex items-center justify-between max-w-4xl mx-auto">
          <button
            type="button"
            onClick={onBack}
            className="flex size-10 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
            aria-label="Voltar"
          >
            <ArrowLeft className="size-5" />
          </button>
          <span className="text-white/90 text-sm font-medium truncate max-w-[40%]">
            Visão do treino
          </span>
          <div className="flex size-10 shrink-0 items-center justify-center">
            {instructorAvatarUrl ? (
              <img
                src={instructorAvatarUrl}
                alt=""
                className="size-8 rounded-full object-cover border-2 border-white/30"
              />
            ) : (
              <div className="size-8 rounded-full bg-primary/30 border-2 border-primary/50 flex items-center justify-center">
                <Dumbbell className="size-4 text-primary" />
              </div>
            )}
          </div>
        </header>
      </div>

      <main className="flex-1 overflow-y-auto pb-36 sm:pb-40 pt-4 sm:pt-6 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl mx-auto space-y-5 sm:space-y-6">
          {/* Informações do treino: nome + metadados */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight">
              {workout.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base text-white/70">
              <span className="flex items-center gap-1.5">
                <Clock className="size-4 text-primary shrink-0" />
                {workout.duration} min
              </span>
              <span className="flex items-center gap-1.5">
                <Flame className="size-4 text-primary shrink-0" />
                {caloriesEstimated != null ? `${caloriesEstimated} kcal` : "— kcal"}
              </span>
              <span className="flex items-center gap-1.5">
                <Dumbbell className="size-4 text-primary shrink-0" />
                {workout.exercises.length} exercícios
              </span>
            </div>
            {workout.focalMuscles && (
              <p className="text-xs uppercase tracking-wider text-white/50">
                Foco: {workout.focalMuscles}
              </p>
            )}
          </div>

          {/* Lista de exercícios/séries (scrollável, cards individuais) */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white/80">
              Sequência
            </h2>
            <div className="flex flex-col gap-3">
              {workout.exercises.map((ex, idx) => (
                <Card
                  key={ex.id || idx}
                  variant="glass"
                  className={`border-white/10 overflow-hidden transition-all ${
                    onExerciseClick ? "cursor-pointer hover:shadow-glass active:scale-[0.99]" : ""
                  }`}
                  onClick={() => onExerciseClick?.(ex, idx)}
                >
                  <div className="flex items-center gap-4 p-3 sm:p-4">
                    <div className="relative shrink-0 size-16 sm:size-20 rounded-xl overflow-hidden bg-black/40">
                      <img
                        src={ex.image || IMAGES.WORKOUT_MAIN}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
                        style={{
                          background: "linear-gradient(to bottom, transparent 0%, rgba(15, 20, 22, 0.5) 60%, rgba(15, 20, 22, 0.9) 100%)",
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white font-semibold text-sm sm:text-base leading-tight truncate">
                        {ex.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {ex.sets} séries
                        </span>
                        <span className="text-xs text-white/60">
                          {ex.reps} reps
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* CTA principal fixo no rodapé */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 p-4 sm:p-6 pt-8 sm:pt-10 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/95 to-transparent pointer-events-none">
        <div className="max-w-2xl mx-auto pointer-events-auto w-full">
          <Button
            variant="default"
            size="lg"
            className="w-full h-12 sm:h-14 lg:h-14 text-base sm:text-lg font-bold rounded-2xl shadow-glass flex items-center justify-center gap-2"
            onClick={onStartWorkout}
          >
            <PlayCircle className="size-5 sm:size-6 shrink-0" />
            Iniciar treino
          </Button>
        </div>
      </footer>
    </div>
  );
}

/**
 * Container que injeta dados do contexto e navegação.
 * Mantém a tela puramente presentacional.
 */
const WorkoutOverview: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSparta();
  const workout = user?.currentWorkout ?? DEMO_WORKOUT;

  return (
    <WorkoutOverviewScreen
      workout={workout}
      instructorAvatarUrl={IMAGES.INSTRUCTOR}
      onBack={() => navigate(-1)}
      onStartWorkout={() => navigate("/active-workout", { state: { workout, startTimer: true } })}
      onExerciseClick={(_, index) => navigate("/active-workout", { state: { workout, startAt: index, startTimer: true } })}
    />
  );
};

export default WorkoutOverview;
