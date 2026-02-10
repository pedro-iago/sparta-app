import { useState } from "react";
import { Card } from "@/ui/components/ui/card";
import { Button } from "@/ui/components/ui/button";
import { Badge } from "@/ui/components/ui/badge";
import { Input } from "@/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/ui/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/ui/components/ui/dialog";
import {
  Users,
  Search,
  FileText,
  Sparkles,
  LogOut,
  Eye,
  ChevronRight,
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  Mail,
  Phone,
  Calendar,
  Target,
  ArrowDownAZ,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router";

const SIDEBAR_COLLAPSED_KEY = "@sparta:professional-sidebar-collapsed";

interface Student {
  id: string;
  name: string;
  avatar: string;
  email: string;
  plan: string;
  status: "active" | "inactive" | "pending";
  frequency: number; // treinos por semana
  lastWorkout?: string;
  phone?: string;
  birthDate?: string;
  goal?: string;
}

const MOCK_STUDENTS: Student[] = [
  { id: "1", name: "Carlos Silva", avatar: "CS", email: "carlos.silva@email.com", plan: "Premium", status: "active", frequency: 4, lastWorkout: "Hoje", phone: "(11) 98765-4321", birthDate: "15/03/1990", goal: "Hipertrofia" },
  { id: "2", name: "Ana Santos", avatar: "AS", email: "ana.santos@email.com", plan: "Básico", status: "active", frequency: 3, lastWorkout: "Ontem", phone: "(11) 91234-5678", birthDate: "22/07/1995", goal: "Emagrecimento" },
  { id: "3", name: "João Pedro", avatar: "JP", email: "joao.pedro@email.com", plan: "Premium", status: "active", frequency: 5, lastWorkout: "Há 2 dias", phone: "(21) 99876-5432", birthDate: "10/11/1988", goal: "Força" },
  { id: "4", name: "Marina Costa", avatar: "MC", email: "marina.costa@email.com", plan: "Premium", status: "active", frequency: 4, lastWorkout: "Há 3 dias", phone: "(31) 97654-3210", birthDate: "05/01/1992", goal: "Condicionamento" },
  { id: "5", name: "Rafael Oliveira", avatar: "RO", email: "rafael.oliveira@email.com", plan: "Básico", status: "pending", frequency: 2, lastWorkout: "—", phone: "(11) 96543-2109", birthDate: "18/09/1985", goal: "Hipertrofia" },
  { id: "6", name: "Fernanda Lima", avatar: "FL", email: "fernanda.lima@email.com", plan: "Básico", status: "inactive", frequency: 3, lastWorkout: "Há 1 semana", phone: "(41) 95432-1098", birthDate: "30/12/1993", goal: "Emagrecimento" },
];

const FREQUENCY_OPTIONS = [2, 3, 4, 5] as const;

const PLAN_OPTIONS = [
  { value: "Básico", label: "Básico", price: "49,99" },
  { value: "Premium", label: "Premium", price: "89,99" },
] as const;

export function ProfessionalStudents() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() =>
    localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "1"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [newStudentOpen, setNewStudentOpen] = useState(false);
  const [newStudentPlan, setNewStudentPlan] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "pending">("all");
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [frequencyFilter, setFrequencyFilter] = useState<string>("all");
  const [sortAlphabetical, setSortAlphabetical] = useState(false);

  const toggleSidebar = () => {
    const next = !sidebarCollapsed;
    setSidebarCollapsed(next);
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, next ? "1" : "0");
  };

  const filteredStudents = (() => {
    let list = MOCK_STUDENTS.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())
    );
    if (statusFilter !== "all") list = list.filter((s) => s.status === statusFilter);
    if (planFilter !== "all") list = list.filter((s) => s.plan === planFilter);
    if (frequencyFilter !== "all") list = list.filter((s) => s.frequency === Number(frequencyFilter));
    if (sortAlphabetical) {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    }
    return list;
  })();

  const getStatusBadge = (status: Student["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/20 text-success border-success/30">Ativo</Badge>;
      case "pending":
        return <Badge className="bg-primary/20 text-primary border-primary/30">Pendente</Badge>;
      case "inactive":
        return <Badge className="bg-muted text-muted-foreground border-muted">Inativo</Badge>;
      default:
        return null;
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Backdrop mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 lg:hidden ${mobileMenuOpen ? "block" : "hidden"}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Sidebar - minimizável; em mobile abre como overlay */}
      <div
        className={`fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-50 flex flex-col transition-[width] duration-200 ${
          mobileMenuOpen ? "w-64 p-6" : sidebarCollapsed ? "w-20 p-3" : "w-64 p-6"
        } ${mobileMenuOpen ? "flex" : "hidden lg:flex"}`}
      >
        {/* Header: logo à esquerda, seta à direita (mesmo lugar minimizada ou não) */}
        <div className="flex items-center justify-between w-full mb-6 min-h-10">
          <div className="min-w-0 flex-1 flex items-center">
            {sidebarCollapsed ? (
              <span className="text-lg font-bold text-primary">S</span>
            ) : (
              <h1 className="text-2xl text-primary truncate">SPARTA AI</h1>
            )}
          </div>
          <button
            type="button"
            onClick={toggleSidebar}
            title={sidebarCollapsed ? "Expandir menu" : "Minimizar menu"}
            className="shrink-0 p-1.5 rounded-md opacity-50 hover:opacity-80 bg-black/10 hover:bg-black/20 transition-opacity"
            aria-label={sidebarCollapsed ? "Expandir menu" : "Minimizar menu"}
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen className="h-4 w-4 text-muted-foreground" />
            ) : (
              <PanelLeftClose className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>

        <nav className="space-y-2 flex-1">
          <Button
            variant="ghost"
            className={sidebarCollapsed ? "w-full justify-center p-2" : "w-full justify-start"}
            onClick={() => { navigate("/dashboard/professional"); closeMobileMenu(); }}
            title="Revisões"
          >
            <FileText className={sidebarCollapsed ? "h-5 w-5" : "mr-3 h-5 w-5"} />
            {!sidebarCollapsed && "Revisões"}
          </Button>
          <Button
            variant="ghost"
            className={`${sidebarCollapsed ? "w-full justify-center p-2" : "w-full justify-start"} bg-primary/10 text-primary hover:bg-primary/20`}
            title="Meus Alunos"
          >
            <Users className={sidebarCollapsed ? "h-5 w-5" : "mr-3 h-5 w-5"} />
            {!sidebarCollapsed && "Meus Alunos"}
          </Button>
          <Button
            variant="ghost"
            className={sidebarCollapsed ? "w-full justify-center p-2" : "w-full justify-start"}
            title="IA Assistente"
          >
            <Sparkles className={sidebarCollapsed ? "h-5 w-5" : "mr-3 h-5 w-5"} />
            {!sidebarCollapsed && "IA Assistente"}
          </Button>
        </nav>

        <div className={sidebarCollapsed ? "flex flex-col items-center gap-2" : "space-y-0"}>
          <Button
            variant="ghost"
            size={sidebarCollapsed ? "icon" : "default"}
            className={`text-muted-foreground ${sidebarCollapsed ? "w-10" : "w-full justify-start"}`}
            onClick={() => {
              closeMobileMenu();
              localStorage.removeItem("@sparta:user");
              navigate("/login", { replace: true });
              window.location.reload();
            }}
            title="Sair"
          >
            <LogOut className={sidebarCollapsed ? "h-5 w-5" : "mr-3 h-5 w-5"} />
            {!sidebarCollapsed && "Sair"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className={sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"} style={{ transition: "margin-left 0.2s" }}>
        <div className="bg-card border-b border-border p-4 sm:p-6">
          <div className="max-w-7xl mx-auto flex items-center sm:items-start justify-between gap-4">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden shrink-0 p-2 rounded-md opacity-70 hover:opacity-100 bg-black/10 hover:bg-black/20"
              aria-label="Abrir menu"
            >
              <PanelLeftOpen className="h-6 w-6 text-foreground" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl mb-1 sm:mb-2 truncate">Meus alunos</h1>
              <p className="text-muted-foreground text-sm sm:text-base">Lista de alunos vinculados ao seu perfil</p>
            </div>
            <Button
              size="icon"
              className="shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setNewStudentOpen(true)}
              title="Registrar novo aluno"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Barra de ferramentas: busca + contagem + ação */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="flex-1 w-full sm:max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Buscar por nome ou e-mail..."
                className="pl-10 bg-muted/50 border-border h-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {filteredStudents.length} {filteredStudents.length === 1 ? "aluno" : "alunos"}
              </span>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4 shrink-0" />
              <span className="font-medium">Filtros</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Status</span>
                <div className="flex rounded-lg border border-border bg-muted/30 p-0.5">
                  {(["all", "active", "inactive", "pending"] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setStatusFilter(value)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                        statusFilter === value
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {value === "all" ? "Todos" : value === "active" ? "Ativos" : value === "inactive" ? "Inativos" : "Pendentes"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Plano</span>
                <Select value={planFilter} onValueChange={setPlanFilter}>
                  <SelectTrigger className="w-[130px] h-8 text-xs bg-muted/50 border-border">
                    <SelectValue placeholder="Plano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {PLAN_OPTIONS.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Frequência</span>
                <Select value={frequencyFilter} onValueChange={setFrequencyFilter}>
                  <SelectTrigger className="w-[130px] h-8 text-xs bg-muted/50 border-border">
                    <SelectValue placeholder="Por semana" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {FREQUENCY_OPTIONS.map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}x por semana
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSortAlphabetical((v) => !v)}
                  className={`flex items-center gap-2 px-3 py-1.5 h-8 text-xs font-medium rounded-lg border transition-colors ${
                    sortAlphabetical
                      ? "bg-primary/20 border-primary/40 text-primary"
                      : "border-border bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  title={sortAlphabetical ? "Desativar ordem alfabética" : "Ordenar A–Z"}
                >
                  <ArrowDownAZ className="h-4 w-4" />
                  A–Z
                </button>
              </div>
            </div>
          </div>

          {/* Lista de alunos */}
          <section className="space-y-3" aria-label="Lista de alunos">
            {filteredStudents.map((student) => (
              <Card
                key={student.id}
                className="bg-card border-border hover:border-primary/40 transition-colors overflow-hidden"
              >
                <div className="p-4 sm:p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="bg-primary/20 rounded-full w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
                      <span className="font-bold text-sm sm:text-base text-primary">{student.avatar}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-base sm:text-lg truncate">{student.name}</h3>
                      <p className="text-sm text-muted-foreground truncate mt-0.5">{student.email}</p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap gap-y-1">
                        <Badge variant="secondary" className="text-xs font-normal">
                          {student.plan}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {student.frequency}x/semana
                        </span>
                        {student.lastWorkout && student.lastWorkout !== "—" && (
                          <span className="text-xs text-muted-foreground">
                            Último treino: {student.lastWorkout}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 border-t border-border pt-4 sm:pt-0 sm:border-0">
                    {getStatusBadge(student.status)}
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary/30 hover:bg-primary/10 shrink-0"
                      onClick={() => setSelectedStudent(student)}
                    >
                      <Eye className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Ver</span>
                      <ChevronRight className="h-4 w-4 sm:ml-0.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </section>

          {filteredStudents.length === 0 && (
            <div className="text-center py-16 px-4 rounded-lg border border-dashed border-border bg-muted/20">
              <Users className="h-14 w-14 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground font-medium">
                Nenhum aluno encontrado
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {search ? `Não há resultados para "${search}".` : "Registre um novo aluno para começar."}
              </p>
              {!search && (
                <Button
                  className="mt-4"
                  onClick={() => setNewStudentOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Registrar aluno
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sheet - Dados do cliente */}
      <Sheet open={!!selectedStudent} onOpenChange={(open) => !open && setSelectedStudent(null)}>
        <SheetContent
          side="right"
          className="w-[100vw] sm:w-full sm:max-w-md !bg-[#171717] border-l border-border p-0 flex flex-col overflow-hidden"
        >
          <div className="flex flex-col h-full overflow-hidden">
            <SheetHeader className="p-4 sm:p-6 pb-2 border-b border-border shrink-0">
              <SheetTitle className="text-lg sm:text-xl">Dados do aluno</SheetTitle>
              <SheetDescription className="text-sm text-muted-foreground">
                Informações do cliente vinculado ao seu perfil
              </SheetDescription>
            </SheetHeader>

            {selectedStudent && (
              <>
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0 bg-[#252525] border border-white/10">
                      <span className="font-bold text-lg sm:text-xl text-primary">{selectedStudent.avatar}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-base sm:text-lg text-foreground truncate">{selectedStudent.name}</h3>
                      <div className="mt-1.5">{getStatusBadge(selectedStudent.status)}</div>
                    </div>
                  </div>

                  <dl className="space-y-4 sm:space-y-5">
                    <div className="grid gap-1">
                      <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 shrink-0" /> E-mail
                      </dt>
                      <dd className="text-sm sm:text-base text-foreground break-all">{selectedStudent.email}</dd>
                    </div>
                    {selectedStudent.phone && (
                      <div className="grid gap-1">
                        <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 shrink-0" /> Telefone
                        </dt>
                        <dd className="text-sm sm:text-base text-foreground">{selectedStudent.phone}</dd>
                      </div>
                    )}
                    {selectedStudent.birthDate && (
                      <div className="grid gap-1">
                        <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 shrink-0" /> Data de nasc.
                        </dt>
                        <dd className="text-sm sm:text-base text-foreground">{selectedStudent.birthDate}</dd>
                      </div>
                    )}
                    <div className="grid gap-1">
                      <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Plano</dt>
                      <dd><Badge variant="secondary" className="font-normal">{selectedStudent.plan}</Badge></dd>
                    </div>
                    <div className="grid gap-1">
                      <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Frequência</dt>
                      <dd className="text-sm sm:text-base text-foreground">{selectedStudent.frequency}x por semana</dd>
                    </div>
                    {selectedStudent.goal && (
                      <div className="grid gap-1">
                        <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                          <Target className="h-3.5 w-3.5 shrink-0" /> Objetivo
                        </dt>
                        <dd className="text-sm sm:text-base text-foreground">{selectedStudent.goal}</dd>
                      </div>
                    )}
                    {selectedStudent.lastWorkout && selectedStudent.lastWorkout !== "—" && (
                      <div className="grid gap-1 pt-3 border-t border-border">
                        <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Último treino</dt>
                        <dd className="text-sm sm:text-base text-foreground">{selectedStudent.lastWorkout}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="p-4 sm:p-6 pt-4 border-t border-border shrink-0 bg-[#171717]">
                  <button
                    type="button"
                    onClick={() => setSelectedStudent(null)}
                    className="w-full min-h-[2.75rem] sm:min-h-[3rem] rounded-xl font-semibold text-sm sm:text-base text-[#171512] transition-transform duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717] hover:brightness-110"
                    style={{
                      background: "linear-gradient(145deg, #e8c85c, #c9a227)",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -2px 6px rgba(0,0,0,0.15)",
                    }}
                  >
                    Confirmar
                  </button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Dialog - Registrar novo aluno */}
      <Dialog open={newStudentOpen} onOpenChange={setNewStudentOpen}>
        <DialogContent className="sm:max-w-md bg-[#171717] border-border shadow-xl">
          <DialogHeader>
            <DialogTitle>Registrar novo aluno</DialogTitle>
            <DialogDescription>
              Preencha os dados para vincular um novo aluno ao seu perfil.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Nome completo</label>
              <Input placeholder="Ex.: Maria Silva" className="bg-muted border-border" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">E-mail</label>
              <Input type="email" placeholder="email@exemplo.com" className="bg-muted border-border" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Telefone</label>
              <Input placeholder="(11) 99999-9999" className="bg-muted border-border" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Plano</label>
              <Select value={newStudentPlan || undefined} onValueChange={setNewStudentPlan}>
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue placeholder="Selecione o plano" />
                </SelectTrigger>
                <SelectContent>
                  {PLAN_OPTIONS.map((plan) => (
                    <SelectItem key={plan.value} value={plan.value}>
                      {plan.label} — R$ {plan.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewStudentOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setNewStudentOpen(false)}>
              Registrar aluno
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
