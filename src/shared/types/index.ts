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

export interface Meal {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    time: string;
    completed: boolean;
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