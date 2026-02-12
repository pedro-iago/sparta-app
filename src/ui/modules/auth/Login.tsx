import { useState } from "react";
import { Button } from "@/ui/components/ui/button";
import {
  User,
  Users,
  Shield,
  Zap,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
export function Login() {
  const [step, setStep] = useState<"welcome" | "profiles">("welcome");

  const handleAccess = (role: 'STUDENT' | 'PROFESSIONAL' | 'ADMIN', path: string) => {
    localStorage.setItem('@sparta:token', 'dev-access-token');
    const baseUser = {
      name: 'Pedro Iago',
      role,
      isAuthenticated: true,
      token: 'dev-access-token',
    };
    const studentUser = role === 'STUDENT' ? {
      ...baseUser,
      frequency: 4,
      goal: 'HYPERTROPHY',
      level: 'Iniciante',
      plan: 'Premium',
      planExpiration: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      bio: { peso: 78, altura: 175, gordura: 16, muscular: 35, agua: 58, visceral: 4 },
    } : baseUser;
    localStorage.setItem('@sparta:user', JSON.stringify(studentUser));
    window.location.hash = "#" + (path.startsWith("/") ? path : "/" + path);
    window.location.reload();
  };

  const profiles = [
    {
      title: "Aluno",
      description: "Acesse seus treinos e acompanhe seu progresso",
      icon: User,
      role: "STUDENT",
      path: "/dashboard/student",
      gradient: "from-primary/20 to-transparent",
      iconBg: "bg-primary/20",
      iconColor: "text-primary",
    },
    {
      title: "Personal Trainer",
      description: "Gerencie seus alunos e aprove treinos gerados pela IA",
      icon: Users,
      role: "PROFESSIONAL",
      path: "/dashboard/professional",
      gradient: "from-blue-500/20 to-transparent",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-500",
    },
    {
      title: "Administrador",
      description: "Dashboard com métricas e gestão da plataforma",
      icon: Shield,
      role: "ADMIN",
      path: "/dashboard/admin",
      gradient: "from-purple-500/20 to-transparent",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-page-dark flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Logo de fundo */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        aria-hidden
      >
        <img
          src="/icon2.png"
          alt=""
          className="w-[min(120vmin,720px)] h-auto object-contain opacity-[0.07] select-none"
        />
      </div>

      {/* Container 3D: perspectiva e agrupamento estilo referência */}
      <div
        className={`relative z-10 w-full mx-auto flex flex-col items-stretch px-2 sm:px-4 ${step === "profiles" ? "max-w-4xl" : "max-w-lg"}`}
        style={{
          perspective: "1200px",
        }}
      >
        <div
          className={`glass-card-3d rounded-3xl flex flex-col items-center text-center transition-all duration-500 ease-out ${step === "welcome" ? "p-6 sm:p-8 lg:p-10" : "p-6 sm:p-8 lg:p-10 xl:p-12"}`}
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateY(-2deg) translateZ(24px)",
            boxShadow:
              "0 1px 0 0 rgba(255,255,255,0.1), 0 8px 24px rgba(0,0,0,0.2), 0 24px 56px -12px rgba(0,0,0,0.4)",
          }}
        >
          {step === "welcome" && (
            <>
              <img
                src="/icon2.png"
                alt="Sparta Fitness AI"
                className="mb-4 h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-lg"
              />
              <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Sparta <span className="text-primary/90">Fitness AI</span>
              </h1>
              <h2 className="mt-6 text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight tracking-tight max-w-md">
                Otimize seu processo de treino com inteligência
              </h2>
              <p className="mt-4 text-sm sm:text-base text-white/60 leading-relaxed max-w-sm">
                Uma plataforma de treino inteligente para automatizar e otimizar a gestão dos seus treinos, alimentação e evolução.
              </p>
              <div className="mt-8 sm:mt-10 w-full max-w-xs space-y-3">
                <Button
                  size="lg"
                  className="w-full rounded-xl h-12 sm:h-14 text-base font-semibold"
                  onClick={() => setStep("profiles")}
                >
                  ENTRAR
                </Button>
                <button
                  type="button"
                  className="w-full h-12 sm:h-14 rounded-xl border border-white/25 bg-transparent text-white font-medium text-sm hover:bg-white/10 transition-colors"
                  onClick={() => setStep("profiles")}
                >
                  CRIAR CONTA
                </button>
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-6 text-xs text-white/45">
                <Zap className="size-3.5 text-primary/70" />
                <span>Powered by Artificial Intelligence</span>
              </div>
            </>
          )}

          {step === "profiles" && (
            <>
              <div className="flex items-center justify-between w-full mb-6 sm:mb-8">
                <button
                  type="button"
                  onClick={() => setStep("welcome")}
                  className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors"
                >
                  <ArrowLeft className="size-4" />
                  Voltar
                </button>
                <img
                  src="/icon2.png"
                  alt=""
                  className="h-8 w-8 object-contain opacity-90"
                />
                <div className="w-14" aria-hidden />
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-2 sm:mb-3">
                Como deseja acessar?
              </h2>
              <p className="text-sm text-white/55 mb-6 sm:mb-8 lg:mb-10">
                Selecione seu perfil para continuar
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 w-full max-w-3xl mx-auto">
                {profiles.map((profile, index) => {
                  const Icon = profile.icon;
                  return (
                    <button
                      key={index}
                      type="button"
                      className="glass-card-3d rounded-2xl p-5 sm:p-6 lg:p-6 text-left cursor-pointer group hover:bg-white/[0.08] hover:border-white/[0.08] active:scale-[0.99] transition-all border border-white/10"
                      onClick={() => handleAccess(profile.role as any, profile.path)}
                      style={{
                        transform: "translateZ(12px)",
                      }}
                    >
                      <div className={`${profile.iconBg} p-2.5 sm:p-3 rounded-full w-fit group-hover:scale-105 transition-transform`}>
                        <Icon className={`size-6 sm:size-7 ${profile.iconColor} opacity-90`} />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-white/95 mt-4 sm:mt-5 tracking-tight">{profile.title}</h3>
                      <p className="text-white/55 text-sm sm:text-base mt-2 leading-relaxed line-clamp-3">
                        {profile.description}
                      </p>
                      <span className="inline-flex items-center gap-1.5 mt-5 sm:mt-6 text-sm font-medium text-primary/90 group-hover:gap-2 transition-all">
                        Acessar
                        <ArrowRight className="size-4" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-[11px] text-white/35">
          Dark Mode · IA Generativa · Alta Performance
        </p>
      </div>
    </div>
  );
}
