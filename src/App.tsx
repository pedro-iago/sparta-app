import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SpartaProvider } from './shared/context/SpartaContext';

// Auth & Selection
import { Login } from './ui/modules/auth/Login';

// Aluno (Student)
import { StudentDashboard } from './ui/modules/student/StudentDashboard';
import { StudentWorkouts } from './ui/modules/student/StudentWorkouts';
import WorkoutOverview from './ui/modules/student/WorkoutOverview';
import DailyDiet from './ui/modules/student/DailyDiet';
import { StudentProfile } from './ui/modules/student/StudentProfile';

// Profissional (Trainer) - Ajustado para o nome do arquivo na sua tree
import { TrainerDashboard as ProfessionalDashboard } from './ui/modules/professional/ProfessionalDashboard';
import { ProfessionalStudents } from './ui/modules/professional/ProfessionalStudents';

// Admin
import { AdminDashboard } from './ui/modules/admin/AdminDashboard';

const PrivateRoute = ({ children, allowedRole }: { children: JSX.Element, allowedRole: string }) => {
  const userStr = localStorage.getItem('@sparta:user');
  if (!userStr) return <Navigate to="/login" replace />;
  
  const user = JSON.parse(userStr);
  return user.role === allowedRole ? children : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <SpartaProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          {/* Domínio Aluno */}
          <Route path="/dashboard/student" element={
            <PrivateRoute allowedRole="STUDENT">
              <StudentDashboard />
            </PrivateRoute>
          } />
          <Route path="/student/workouts" element={
            <PrivateRoute allowedRole="STUDENT">
              <StudentWorkouts />
            </PrivateRoute>
          } />
          <Route path="/student/workout" element={
            <PrivateRoute allowedRole="STUDENT">
              <WorkoutOverview />
            </PrivateRoute>
          } />
          <Route path="/workout-overview" element={
            <PrivateRoute allowedRole="STUDENT">
              <WorkoutOverview />
            </PrivateRoute>
          } />
          <Route path="/diet" element={
            <PrivateRoute allowedRole="STUDENT">
              <DailyDiet />
            </PrivateRoute>
          } />
          <Route path="/dashboard/perfil" element={
            <PrivateRoute allowedRole="STUDENT">
              <StudentProfile />
            </PrivateRoute>
          } />
          <Route path="/student/profile" element={
            <PrivateRoute allowedRole="STUDENT">
              <StudentProfile />
            </PrivateRoute>
          } />

          {/* Domínio Profissional */}
          <Route path="/dashboard/professional" element={
            <PrivateRoute allowedRole="PROFESSIONAL">
              <ProfessionalDashboard />
            </PrivateRoute>
          } />
          <Route path="/dashboard/professional/students" element={
            <PrivateRoute allowedRole="PROFESSIONAL">
              <ProfessionalStudents />
            </PrivateRoute>
          } />

          {/* Domínio Admin */}
          <Route path="/dashboard/admin" element={
            <PrivateRoute allowedRole="ADMIN">
              <AdminDashboard />
            </PrivateRoute>
          } />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </HashRouter>
    </SpartaProvider>
  );
};

export default App;