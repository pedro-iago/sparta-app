import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSparta } from "@/shared/context/SpartaContext";
import { DEMO_WORKOUT } from "./WorkoutOverview";
import { IMAGES } from "@/shared/constants/images";
import type { Workout, Exercise } from "@/shared/types";

// ---------------------------------------------------------------------------
// Componentes presentacionais (stateless, dados via props, sem lógica de domínio)
// ---------------------------------------------------------------------------

interface WorkoutHeaderProps {
  /** Título contextual discreto (ex.: "Strength Training") */
  title: string;
  /** Tempo decorrido em segundos; se undefined, não exibe cronômetro */
  elapsedSeconds?: number;
}

export function WorkoutHeader({ title, elapsedSeconds }: WorkoutHeaderProps) {
  const mm = elapsedSeconds != null ? Math.floor(elapsedSeconds / 60) : 0;
  const ss = elapsedSeconds != null ? elapsedSeconds % 60 : 0;
  const timeStr = `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;

  return (
    <header className="flex items-center justify-between px-4 py-3 text-white/80">
      <span className="text-sm font-medium uppercase tracking-wider">{title}</span>
      {elapsedSeconds != null && (
        <span className="text-sm font-mono tabular-nums">{timeStr}</span>
      )}
    </header>
  );
}

interface ExerciseHeroProps {
  imageUrl: string;
  alt?: string;
}

export function ExerciseHero({ imageUrl, alt = "" }: ExerciseHeroProps) {
  return (
    <div
      className="relative w-full aspect-[4/3] max-h-[70vh] shrink-0 overflow-hidden bg-black/40"
      style={{ minHeight: "40vh" }}
    >
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-cover"
      />
      {/* Transição suave entre imagem e texto (semi-transparência, sem corte brusco) */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 sm:h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(15, 20, 22, 0.4) 40%, rgba(15, 20, 22, 0.85) 100%)",
        }}
      />
    </div>
  );
}

interface ExerciseTitleProps {
  /** Ex.: "15" (reps) */
  reps: string;
  /** Ex.: "PUSH-UPS" */
  exerciseName: string;
}

export function ExerciseTitle({ reps, exerciseName }: ExerciseTitleProps) {
  const nameUpper = exerciseName.replace(/\s+/g, " ").toUpperCase();
  return (
    <div className="px-4 py-6 text-center">
      <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight uppercase leading-tight">
        {reps} <span className="text-primary">{nameUpper}</span>
      </p>
    </div>
  );
}

interface PrimaryActionButtonProps {
  label: string;
  onClick: () => void;
  /** Verde = conclusão (Done) */
  variant?: "done" | "primary";
}

export function PrimaryActionButton({
  label,
  onClick,
  variant = "done",
}: PrimaryActionButtonProps) {
  const isDone = variant === "done";
  return (
    <div className="px-4 pb-4">
      <button
        type="button"
        onClick={onClick}
        className={`w-full py-4 rounded-2xl font-bold text-lg uppercase tracking-wide transition-all active:scale-[0.98] ${
          isDone
            ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg"
            : "bg-primary hover:bg-primary/90 text-[#171512]"
        }`}
      >
        {label}
      </button>
    </div>
  );
}

interface NextExerciseItemProps {
  name: string;
  reps: string;
}

export function NextExerciseItem({ name, reps }: NextExerciseItemProps) {
  return (
    <div className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-left">
      <span className="text-white font-medium truncate">{name}</span>
      <span className="text-white/60 text-sm shrink-0 ml-2">{reps} reps</span>
    </div>
  );
}

interface NextExercisesListProps {
  exercises: { name: string; reps: string }[];
}

export function NextExercisesList({ exercises }: NextExercisesListProps) {
  if (exercises.length === 0) return null;

  return (
    <div className="px-4 pb-8 space-y-2">
      <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
        Próximos exercícios
      </h3>
      <div className="space-y-2">
        {exercises.map((item, i) => (
          <NextExerciseItem key={i} name={item.name} reps={item.reps} />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Container: estado da execução + cronômetro (apenas front-end)
// ---------------------------------------------------------------------------

export default function ActiveWorkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, completeWorkout } = useSparta();

  const state = (location.state || {}) as {
    workout?: Workout;
    startAt?: number;
    startTimer?: boolean;
  };

  const workout: Workout = state.workout ?? user?.currentWorkout ?? DEMO_WORKOUT;
  const startAt = Math.max(0, Math.min(state.startAt ?? 0, workout.exercises.length - 1));
  const startTimer = state.startTimer === true;

  const [currentIndex, setCurrentIndex] = useState(startAt);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(startTimer);

  // Cronômetro apenas no front-end (sem backend)
  useEffect(() => {
    if (!isTimerRunning) return;
    const id = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [isTimerRunning]);

  const exercises = workout.exercises;
  const activeExercise: Exercise | undefined = exercises[currentIndex];
  const nextExercises = exercises.slice(currentIndex + 1, currentIndex + 4).map((ex) => ({
    name: ex.name,
    reps: ex.reps,
  }));

  const handleDone = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      completeWorkout();
      navigate("/dashboard/student", { replace: true });
    }
  };

  if (!activeExercise) {
    return (
      <div className="min-h-screen bg-page-dark flex items-center justify-center p-6">
        <p className="text-white/70">Nenhum exercício nesta posição.</p>
        <button
          type="button"
          onClick={() => navigate("/student/workout")}
          className="mt-4 text-primary"
        >
          Voltar ao treino
        </button>
      </div>
    );
  }

  const heroImage = activeExercise.image || IMAGES.WORKOUT_MAIN;
  const contextualTitle = workout.focalMuscles || workout.name || "Strength Training";

  return (
    <div className="min-h-screen bg-page-dark flex flex-col">
      <WorkoutHeader
        title={contextualTitle}
        elapsedSeconds={isTimerRunning ? elapsedSeconds : undefined}
      />

      <main className="flex-1 overflow-y-auto">
        <ExerciseHero imageUrl={heroImage} alt={activeExercise.name} />
        <ExerciseTitle reps={activeExercise.reps} exerciseName={activeExercise.name} />
        <PrimaryActionButton label="Concluído" variant="done" onClick={handleDone} />
        <NextExercisesList exercises={nextExercises} />
      </main>
    </div>
  );
}
