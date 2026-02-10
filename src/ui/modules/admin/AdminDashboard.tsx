import { Card } from "@/ui/components/ui/card";
import { Button } from "@/ui/components/ui/button";
import { Badge } from "@/ui/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/components/ui/table";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  DollarSign,
  Users,
  TrendingUp,
  Activity,
  UserCheck,
  Ban,
  LogOut,
  LayoutDashboard,
  Settings,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router";

export function AdminDashboard() {
  const navigate = useNavigate();

  // Mock data for charts
  const revenueData = [
    { month: "Jan", revenue: 12000, users: 45 },
    { month: "Fev", revenue: 15000, users: 52 },
    { month: "Mar", revenue: 18000, users: 61 },
    { month: "Abr", revenue: 22000, users: 73 },
    { month: "Mai", revenue: 26000, users: 86 },
    { month: "Jun", revenue: 31000, users: 103 },
  ];

  const stats = {
    mrr: 31000,
    activeStudents: 103,
    activeTrainers: 12,
    growth: 24.5,
  };

  const recentUsers = [
    {
      id: "1",
      name: "Carlos Silva",
      email: "carlos@email.com",
      type: "student",
      status: "active",
      joinedAt: "2026-01-28",
    },
    {
      id: "2",
      name: "Ana Santos",
      email: "ana@email.com",
      type: "trainer",
      status: "active",
      joinedAt: "2026-01-27",
    },
    {
      id: "3",
      name: "João Pedro",
      email: "joao@email.com",
      type: "student",
      status: "active",
      joinedAt: "2026-01-26",
    },
    {
      id: "4",
      name: "Marina Costa",
      email: "marina@email.com",
      type: "student",
      status: "inactive",
      joinedAt: "2026-01-25",
    },
    {
      id: "5",
      name: "Rafael Oliveira",
      email: "rafael@email.com",
      type: "trainer",
      status: "active",
      joinedAt: "2026-01-24",
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card border-white/20 p-3 rounded-xl shadow-glass">
          <p className="text-sm font-medium mb-1 text-white">{payload[0].payload.month}</p>
          <p className="text-sm text-primary">
            Receita: R$ {payload[0].value.toLocaleString()}
          </p>
          <p className="text-sm text-white/60">
            Usuários: {payload[0].payload.users}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-page-dark">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 glass-card border-r border-white/10 rounded-none p-6 hidden lg:block">
        <div className="mb-8">
          <h1 className="text-2xl mb-1 text-primary">SPARTA AI</h1>
          <p className="text-sm text-white/60">Admin Panel</p>
        </div>

        <nav className="space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start bg-primary/10 text-primary hover:bg-primary/20"
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white/70 hover:text-white"
            onClick={() => navigate("/admin/users")}
          >
            <Users className="mr-3 h-5 w-5" />
            Usuários
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white/70 hover:text-white"
            onClick={() => navigate("/admin/reports")}
          >
            <BarChart3 className="mr-3 h-5 w-5" />
            Relatórios
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white">
            <Settings className="mr-3 h-5 w-5" />
            Configurações
          </Button>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white/70 hover:text-white"
            onClick={() => navigate("/")}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sair
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <div className="glass-card border-0 border-b border-white/10 rounded-none rounded-b-2xl p-4 sm:p-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-2 text-white">Dashboard Administrativo</h1>
            <p className="text-white/70 text-sm sm:text-base">Visão geral da plataforma e métricas</p>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 lg:space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="glass" className="p-6 border-white/10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-white/60">MRR</p>
                <div className="bg-primary/20 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white mb-1">R$ {stats.mrr.toLocaleString()}</p>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-success">+{stats.growth}%</span>
                <span className="text-white/60">vs mês anterior</span>
              </div>
            </Card>

            <Card variant="glass" className="p-6 border-white/10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-white/60">Alunos Ativos</p>
                <div className="bg-primary/20 p-2 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{stats.activeStudents}</p>
              <p className="text-sm text-white/60 mt-1">Total de estudantes</p>
            </Card>

            <Card variant="glass" className="p-6 border-white/10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-white/60">Personais Ativos</p>
                <div className="bg-primary/20 p-2 rounded-full">
                  <UserCheck className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{stats.activeTrainers}</p>
              <p className="text-sm text-white/60 mt-1">Total de treinadores</p>
            </Card>

            <Card variant="glass" className="p-6 border-white/10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-white/60">Crescimento</p>
                <div className="bg-success/20 p-2 rounded-full">
                  <Activity className="h-5 w-5 text-success" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{stats.growth}%</p>
              <p className="text-sm text-white/60 mt-1">Últimos 30 dias</p>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card variant="glass" className="p-6 border-white/10">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-1 text-white">Crescimento de Receita</h3>
              <p className="text-sm text-white/60">
                Evolução mensal da receita e novos usuários
              </p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FACC15" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FACC15" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="month" 
                  stroke="#A1A1AA"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#A1A1AA"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#FACC15"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Users Table */}
          <Card variant="glass" className="p-6 border-white/10">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-1 text-white">Usuários Recentes</h3>
              <p className="text-sm text-white/60">
                Últimos usuários cadastrados na plataforma
              </p>
            </div>
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-white/5 hover:bg-white/5 border-white/10">
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data de Cadastro</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium text-white">{user.name}</TableCell>
                      <TableCell className="text-white/70">{user.email}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary"
                          className={
                            user.type === "trainer" 
                              ? "bg-primary/20 text-primary border-primary/30" 
                              : "bg-muted text-muted-foreground"
                          }
                        >
                          {user.type === "trainer" ? "Personal" : "Aluno"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.status === "active" ? (
                          <Badge className="bg-success/20 text-success border-success/30">
                            Ativo
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-muted text-muted-foreground">
                            Inativo
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-white/60">
                        {new Date(user.joinedAt).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="hover:bg-muted"
                          >
                            <UserCheck className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}