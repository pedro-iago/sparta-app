import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSparta } from "@/shared/context/SpartaContext";
import { Card } from "@/ui/components/ui/card";
import { Button } from "@/ui/components/ui/button";
import { PlayCircle, ArrowLeft, Flame, Clock, Dumbbell, Check } from "lucide-react";
import { IMAGES } from "@/shared/constants/images";
import { getWorkoutFromStorage, setWorkoutInStorage } from "@/shared/utils/workoutStorage";
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
  name: "TREINO A - Peito e Tríceps",
  focalMuscles: "Peito e Tríceps",
  duration: 45,
  completedCount: 0,
  exercises: [
    {
      id: "ex-1",
      name: "Agachamento livre",
      sets: 4,
      reps: "10-12",
      muscleGroup: MuscleGroup.LEGS,
      image: IMAGES.WORKOUT_MAIN,
      equipment: "Barra",
    },
    {
      id: "ex-2",
      name: "Supino reto",
      sets: 4,
      reps: "10-12",
      muscleGroup: MuscleGroup.CHEST,
      image: IMAGES.WORKOUT_MAIN,
      technique: "Ponto de Falha",
      equipment: "Barra",
    },
    {
      id: "ex-3",
      name: "Remada curvada",
      sets: 3,
      reps: "12",
      muscleGroup: MuscleGroup.BACK,
      image: IMAGES.WORKOUT_MAIN,
      technique: "Drop Set",
      equipment: "Halteres",
    },
  ],
  isAiGenerated: true,
};

export interface WorkoutOverviewCallbacks {
  onBack: () => void;
  onStartWorkout: () => void;
  /** Ao marcar/desmarcar exercício como concluído (checkbox) */
  onToggleExerciseDone?: (exerciseId: string) => void;
  /** Ao clicar em um exercício da lista (abrir tela de execução) */
  onExerciseClick?: (exercise: Exercise, index: number) => void;
}

export interface WorkoutOverviewProps extends WorkoutOverviewData, WorkoutOverviewCallbacks {}

/**
 * Tela de visão geral do treino (definido pelo personal).
 * Header sticky, progress bar e lista com thumbnail, metadados, badge de técnica e checkbox.
 */
export function WorkoutOverviewScreen({
  workout,
  caloriesEstimated,
  instructorAvatarUrl,
  onBack,
  onStartWorkout,
  onToggleExerciseDone,
  onExerciseClick,
}: WorkoutOverviewProps) {
  const completedCount = useMemo(
    () => workout.exercises.filter((e) => e.done).length,
    [workout.exercises]
  );
  const totalCount = workout.exercises.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const heroImage = workout.exercises[0]?.image || IMAGES.WORKOUT_MAIN;

  return (
    <div className="min-h-screen min-h-[100dvh] bg-page-dark flex flex-col">
      {/* Header: treino definido pelo personal */}
      <header className="sticky top-0 z-30 glass-card-3d border-0 rounded-b-2xl border-b border-white/10 flex items-center justify-between w-full max-w-4xl mx-auto px-4 py-3 sm:px-6 sm:py-4 lg:px-8 shrink-0">
        <button
          type="button"
          onClick={onBack}
          className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/10 active:bg-white/15 transition-colors touch-manipulation"
          aria-label="Voltar"
        >
          <ArrowLeft className="size-5 sm:size-6" />
        </button>
        <span className="text-white/90 text-xs sm:text-sm font-medium truncate max-w-[50%] sm:max-w-[40%] mx-1 px-3 py-1.5 rounded-xl bg-primary/20 border border-primary/30">
          Meu treino
        </span>
        <div className="flex size-10 sm:size-11 shrink-0 items-center justify-center">
          {instructorAvatarUrl ? (
            <img
              src={instructorAvatarUrl}
              alt=""
              className="size-8 sm:size-9 rounded-full object-cover border-2 border-white/30"
            />
          ) : (
            <div className="size-8 sm:size-9 rounded-full bg-primary/30 border-2 border-primary/50 flex items-center justify-center">
              <Dumbbell className="size-4 sm:size-5 text-primary" />
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto overflow-x-hidden pb-32 sm:pb-36 lg:pb-40">
        {/* Hero: imagem com semi-transparência no final */}
        <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4">
          <div className="relative w-full aspect-[16/10] sm:aspect-[2/1] max-h-[38vh] sm:max-h-[44vh] rounded-2xl overflow-hidden bg-black/40 shadow-xl">
            <img
              src={heroImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div
              className="absolute inset-x-0 bottom-0 h-20 sm:h-24 lg:h-28 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, transparent 0%, rgba(15, 20, 22, 0.6) 40%, rgba(15, 20, 22, 0.98) 100%)",
              }}
            />
          </div>
        </div>

        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sticky: nome do treino (passado pelo personal) + progress bar */}
          <div className="sticky top-[56px] sm:top-[64px] z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-page-dark/98 backdrop-blur-md border-b border-white/5 space-y-3 sm:space-y-4">
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-[1.75rem] xl:text-3xl font-bold text-white leading-tight tracking-tight break-words pr-2">
              {workout.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5 sm:size-4 text-primary shrink-0" />
                {workout.duration} min
              </span>
              <span className="flex items-center gap-1.5">
                <Flame className="size-3.5 sm:size-4 text-primary shrink-0" />
                {caloriesEstimated != null ? `${caloriesEstimated} kcal` : "— kcal"}
              </span>
              <span className="flex items-center gap-1.5">
                <Dumbbell className="size-3.5 sm:size-4 text-primary shrink-0" />
                {workout.exercises.length} exercícios
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] sm:text-xs text-white/60">
                <span>Progresso</span>
                <span>{completedCount}/{totalCount}</span>
              </div>
              <div className="h-1.5 sm:h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Lista de exercícios */}
          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white/80">
              Sequência
            </h2>
            <div className="flex flex-col gap-2 sm:gap-3">
              {workout.exercises.map((ex, idx) => {
                return (
                  <Card
                    key={ex.id}
                    variant="glass"
                    className={`border-white/10 overflow-hidden transition-all touch-manipulation ${
                      onExerciseClick ? "cursor-pointer hover:shadow-glass active:scale-[0.99]" : ""
                    }`}
                    onClick={() => onExerciseClick?.(ex, idx)}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 min-h-[72px] sm:min-h-0">
                      <div className="relative shrink-0 size-14 sm:size-16 md:size-20 rounded-xl overflow-hidden bg-black/40 aspect-square">
                        <img
                          src={ex.image || IMAGES.WORKOUT_MAIN}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1 py-0.5">
                        <p className="text-white font-semibold text-sm sm:text-base leading-tight line-clamp-2 sm:truncate">
                          {ex.name}
                        </p>
                        <p className="text-white/60 text-[11px] sm:text-xs md:text-sm mt-0.5">
                          {ex.sets} séries x {ex.reps} reps
                        </p>
                        {ex.technique && (
                          <span className="inline-block mt-1 sm:mt-1.5 text-[10px] font-medium uppercase tracking-wide text-primary bg-primary/15 px-2 py-0.5 rounded">
                            {ex.technique}
                          </span>
                        )}
                      </div>
                      {onToggleExerciseDone && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleExerciseDone(ex.id);
                          }}
                          className={`shrink-0 size-9 sm:size-10 rounded-full border-2 flex items-center justify-center transition-colors touch-manipulation min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] ${
                            ex.done
                              ? "bg-primary border-primary text-[#171512]"
                              : "border-white/30 text-white/50 hover:border-white/50 active:border-primary/50"
                          }`}
                          aria-label={ex.done ? "Desmarcar" : "Marcar como feito"}
                        >
                          {ex.done ? <Check className="size-4 sm:size-5" /> : null}
                        </button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
            {workout.exercises.length === 0 && (
              <p className="text-white/50 text-xs sm:text-sm py-8 sm:py-10 text-center">
                Nenhum exercício neste treino.
              </p>
            )}
          </div>
        </div>
      </main>

      {/* CTA fixo: safe area em mobile (notch/home) */}
      <footer
        className="fixed bottom-0 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10 bg-gradient-to-t from-[#0f1416] via-[#0f1416]/98 to-transparent pointer-events-none"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <div className="max-w-2xl mx-auto pointer-events-auto w-full">
          <Button
            variant="default"
            size="lg"
            className="w-full h-12 sm:h-14 text-sm sm:text-base md:text-lg font-bold rounded-2xl shadow-glass flex items-center justify-center gap-2 min-h-[48px] sm:min-h-14"
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
 * Mantém estado local de "done" por exercício para a progress bar e checkbox.
 */
const WorkoutOverview: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSparta();
  const workoutBase = user?.currentWorkout ?? getWorkoutFromStorage() ?? DEMO_WORKOUT;
  const [exerciseDone, setExerciseDone] = useState<Record<string, boolean>>({});

  const workout = useMemo(
    () => ({
      ...workoutBase,
      exercises: workoutBase.exercises.map((e) => ({
        ...e,
        done: exerciseDone[e.id] ?? e.done ?? false,
      })),
    }),
    [workoutBase, exerciseDone]
  );

  useEffect(() => {
    setWorkoutInStorage(workout);
  }, [workout]);

  const handleToggleDone = (exerciseId: string) => {
    setExerciseDone((prev) => ({ ...prev, [exerciseId]: !prev[exerciseId] }));
  };

  return (
    <WorkoutOverviewScreen
      workout={workout}
      instructorAvatarUrl={IMAGES.INSTRUCTOR}
      onBack={() => navigate(-1)}
      onStartWorkout={() => navigate("/active-workout", { state: { workout, startTimer: true } })}
      onToggleExerciseDone={handleToggleDone}
      onExerciseClick={(_, index) => navigate("/active-workout", { state: { workout, startAt: index, startTimer: true } })}
    />
  );
};

export default WorkoutOverview;
