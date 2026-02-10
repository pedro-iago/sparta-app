import { Card } from "@/ui/components/ui/card";
import { Button } from "@/ui/components/ui/button";
import { 
  User, 
  Users, 
  Shield, 
  Zap,
  ArrowRight 
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // Ajustado para react-router-dom

export function Login() {
  const navigate = useNavigate();

  // Função para simular o login e salvar o Role para a PrivateRoute autorizar
  const handleAccess = (role: 'STUDENT' | 'PROFESSIONAL' | 'ADMIN', path: string) => {
    // Simula o payload que viria do seu backend Java/Spring
    localStorage.setItem('@sparta:token', 'dev-access-token');
    localStorage.setItem('@sparta:user', JSON.stringify({ 
      name: 'Pedro Iago', 
      role: role 
    }));

    navigate(path);
  };

  const profiles = [
    {
      title: "Aluno",
      description: "Acesse seus treinos e acompanhe seu progresso",
      icon: User,
      role: "STUDENT",
      path: "/dashboard/student", // Rota corrigida conforme App.tsx
      gradient: "from-primary/20 to-transparent",
      iconBg: "bg-primary/20",
      iconColor: "text-primary",
    },
    {
      title: "Personal Trainer",
      description: "Gerencie seus alunos e aprove treinos gerados pela IA",
      icon: Users,
      role: "PROFESSIONAL",
      path: "/dashboard/professional", // Rota corrigida conforme App.tsx
      gradient: "from-blue-500/20 to-transparent",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-500",
    },
    {
      title: "Administrador",
      description: "Dashboard com métricas e gestão da plataforma",
      icon: Shield,
      role: "ADMIN",
      path: "/dashboard/admin", // Rota corrigida conforme App.tsx
      gradient: "from-purple-500/20 to-transparent",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-page-dark flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        {/* Logo & Header — hierarquia clara */}
        <div className="text-center mb-10 sm:mb-14">
          <img
            src="/icon2.png"
            alt="Sparta Fitness AI"
            className="mx-auto mb-4 h-24 w-24 sm:h-28 sm:w-28 object-contain drop-shadow-lg"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-display font-bold text-white">
            SPARTA <span className="text-primary font-display font-bold">FITNESS AI</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/70 mt-2 max-w-md mx-auto">
            Treinamento inteligente para guerreiros modernos
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-white/50">
            <Zap className="h-4 w-4 text-primary" />
            <span>Powered by Artificial Intelligence</span>
          </div>
        </div>

        {/* Profile Selection — cards flutuantes com glass */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {profiles.map((profile, index) => {
            const Icon = profile.icon;
            return (
              <Card
                key={index}
                variant="glass"
                className="cursor-pointer group hover:shadow-glass hover:-translate-y-0.5 active:translate-y-0 border-white/10"
                onClick={() => handleAccess(profile.role as any, profile.path)}
              >
                <div className="p-5 sm:p-6 h-full flex flex-col gap-4">
                  <div className={`${profile.iconBg} p-3.5 rounded-full w-fit group-hover:scale-105 transition-transform duration-200`}>
                    <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${profile.iconColor}`} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{profile.title}</h3>
                  <p className="text-white/60 text-sm flex-1 leading-relaxed">
                    {profile.description}
                  </p>
                  <Button variant="default" size="lg" className="w-full group-hover:gap-3 transition-all">
                    Acessar
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Footer — leitura rápida */}
        <div className="mt-10 sm:mt-14 text-center">
          <p className="text-sm text-white/50">
            Selecione seu perfil para acessar a plataforma
          </p>
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-3 text-xs text-white/40">
            <span>Dark Mode First</span>
            <span>IA Generativa</span>
            <span>Alta Performance</span>
          </div>
        </div>
      </div>
    </div>
  );
}