export enum UserRole {
    ADMIN = 'ADMIN',
    PROFESSIONAL = 'PROFESSIONAL',
    STUDENT = 'STUDENT'
}

export enum Goal {
    WEIGHT_LOSS = 'WEIGHT_LOSS',
    HYPERTROPHY = 'HYPERTROPHY',
    CONDITIONING = 'CONDITIONING',
}

export enum ExperienceLevel {
    BEGINNER = 'Iniciante',
    INTERMEDIATE = 'Intermediário',
    ADVANCED = 'Avançado',
}

export enum MuscleGroup {
    CHEST = 'Peito',
    BACK = 'Costas',
    LEGS = 'Pernas',
    SHOULDERS = 'Ombros',
    ARMS = 'Braços',
    CORE = 'Abdômen',
    CARDIO = 'Cardio',
    UNKNOWN = 'Geral'
}

/** Badge de técnica avançada (ex.: Ponto de Falha, Drop Set) */
export type ExerciseTechnique = 'Ponto de Falha' | 'Drop Set' | 'Biseto' | 'Rest-Pause' | 'Cluster' | string;

export interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: string;
    muscleGroup: MuscleGroup;
    image?: string;
    done?: boolean;
    /** Técnica avançada para exibir como badge */
    technique?: ExerciseTechnique;
    /** Equipamento (para filtros) */
    equipment?: string;
    replacementOptions?: Exercise[];
}

export interface Workout {
    id: string;
    name: string;
    focalMuscles: string;
    duration: number;
    exercises: Exercise[];
    isAiGenerated?: boolean;
    status?: 'DRAFT' | 'ACTIVE' | 'COMPLETED';
    /** Quantidade de exercícios marcados como concluídos (para progress bar) */
    completedCount?: number;
}

export interface MealVariation {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    imageUrl?: string;
}

export interface Meal {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    time: string;
    completed: boolean;
    /** Até 3 opções/variações por refeição */
    variations?: MealVariation[];
}

/** Foto da refeição enviada pelo cliente */
export interface DietPhoto {
    id: string;
    mealId: string;
    mealName: string;
    imageUrl: string;
    createdAt: string;
}

export interface UserState {
    name: string;
    role: UserRole; 
    goal: Goal;
    frequency: number;
    level: ExperienceLevel;
    currentWorkout?: Workout;
    history?: any[];
}

/** Dia da semana no plano do personal: 1 = Segunda, 7 = Domingo */
export type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** Treino agendado por dia (passado pelo personal). Backend pode enviar apenas os dias com treino. */
export interface ScheduledWorkout {
    id: string;
    /** 1 = Segunda ... 7 = Domingo */
    dayOfWeek: DayOfWeek;
    name: string;
    /** Tempo estimado em minutos */
    durationMinutes: number;
    /** ID do treino completo (para abrir detalhe/WorkoutOverview) */
    workoutId?: string;
    completed?: boolean;
}

/** Resposta esperada do backend: plano semanal do aluno */
export interface StudentWorkoutPlanResponse {
    scheduledWorkouts: ScheduledWorkout[];
}

/** DTO para solicitar criação de treino (enviado ao personal) */
export interface CreateTrainingDTO {
    level: ExperienceLevel;
    focus: Goal;
    daysPerWeek: number;
    limitations: string;
}