import { useState } from "react";
import { Button } from "@/ui/components/ui/button";
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
  Mail,
  Phone,
  Calendar,
  Target,
  ArrowDownAZ,
  Filter,
  List,
  LayoutGrid,
} from "lucide-react";
import { FloatingNav, type FloatingNavItem } from "@/ui/components/ui/floating-nav";
import { useNavigate } from "react-router";

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
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [newStudentOpen, setNewStudentOpen] = useState(false);
  const [newStudentPlan, setNewStudentPlan] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "pending">("all");
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [frequencyFilter, setFrequencyFilter] = useState<string>("all");
  const [sortAlphabetical, setSortAlphabetical] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const floatingNavItems: FloatingNavItem[] = [
    { icon: <FileText />, label: "Revisões", onClick: () => navigate("/dashboard/professional") },
    { icon: <Users />, label: "Meus Alunos", onClick: () => {} },
    { icon: <Sparkles />, label: "IA Assistente", onClick: () => {} },
    {
      icon: <LogOut />,
      label: "Sair",
      onClick: () => {
        localStorage.removeItem("@sparta:user");
        navigate("/login", { replace: true });
        window.location.reload();
      },
    },
  ];

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

  const getStatusLabel = (status: Student["status"]) => {
    switch (status) {
      case "active": return <span className="text-[11px] font-medium text-primary/80">Ativo</span>;
      case "pending": return <span className="text-[11px] font-medium text-white/50">Pendente</span>;
      case "inactive": return <span className="text-[11px] font-medium text-white/40">Inativo</span>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-page-dark">
      <div className="w-full max-w-5xl mx-auto">
        <header className="glass-card-3d border-0 border-b border-white/10 rounded-none rounded-b-2xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold mb-0.5 truncate text-white tracking-tight">Meus alunos</h1>
              <p className="text-white/50 text-xs sm:text-sm">Lista de alunos vinculados ao seu perfil</p>
            </div>
            <Button
              size="icon"
              className="shrink-0 size-10 sm:size-11 rounded-full min-h-[44px] min-w-[44px] touch-manipulation"
              variant="default"
              onClick={() => setNewStudentOpen(true)}
              title="Registrar novo aluno"
            >
              <Plus className="size-5 sm:size-5" />
            </Button>
          </div>
        </header>

        <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8 pb-24">
          {/* Barra de ferramentas: busca + contagem + ação */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <div className="flex-1 w-full sm:max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/45 pointer-events-none" />
              <Input
                placeholder="Buscar por nome ou e-mail..."
                className="pl-10 bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/40 h-10 sm:h-10 min-h-[44px] rounded-xl text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-white/50 whitespace-nowrap">
                {filteredStudents.length} {filteredStudents.length === 1 ? "aluno" : "alunos"}
              </span>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
              <Filter className="size-4 shrink-0" />
              <span className="font-medium">Filtros</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">Status</span>
                <div className="flex rounded-lg border border-white/10 bg-white/[0.04] p-0.5">
                  {(["all", "active", "inactive", "pending"] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setStatusFilter(value)}
                      className={`px-2.5 sm:px-3 py-2 sm:py-1.5 min-h-[44px] sm:min-h-0 text-xs font-medium rounded-md transition-colors touch-manipulation ${
                        statusFilter === value
                          ? "bg-primary text-primary-foreground"
                          : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      {value === "all" ? "Todos" : value === "active" ? "Ativos" : value === "inactive" ? "Inativos" : "Pendentes"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">Plano</span>
                <Select value={planFilter} onValueChange={setPlanFilter}>
                  <SelectTrigger className="w-[120px] sm:w-[130px] h-9 sm:h-8 min-h-[44px] sm:min-h-0 text-xs bg-white/[0.06] border-white/10 rounded-xl">
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
                <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">Frequência</span>
                <Select value={frequencyFilter} onValueChange={setFrequencyFilter}>
                  <SelectTrigger className="w-[120px] sm:w-[130px] h-9 sm:h-8 min-h-[44px] sm:min-h-0 text-xs bg-white/[0.06] border-white/10 rounded-xl">
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
                  className={`flex items-center gap-2 px-3 py-2 sm:py-1.5 min-h-[44px] sm:min-h-8 text-xs font-medium rounded-lg border transition-colors touch-manipulation ${
                    sortAlphabetical
                      ? "bg-primary/20 border-primary/40 text-primary"
                      : "border-white/10 bg-white/[0.06] text-white/60 hover:text-white hover:bg-white/[0.08]"
                  }`}
                  title={sortAlphabetical ? "Desativar ordem alfabética" : "Ordenar A–Z"}
                >
                  <ArrowDownAZ className="size-4 shrink-0" />
                  A–Z
                </button>
              </div>
            </div>
          </div>

          {/* Lista de alunos */}
          <section aria-label="Lista de alunos">
            <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
              <h2 className="text-xs sm:text-sm font-medium text-white/70">
                Alunos <span className="text-white/50 font-normal">({filteredStudents.length})</span>
              </h2>
              <div className="glass-card-3d rounded-xl p-0.5 flex" role="group" aria-label="Visualização">
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 sm:p-2 flex items-center justify-center transition-colors touch-manipulation ${
                    viewMode === "list"
                      ? "bg-primary/80 text-primary-foreground"
                      : "text-white/50 hover:text-white/80 hover:bg-white/[0.06]"
                  }`}
                  title="Lista"
                  aria-pressed={viewMode === "list"}
                >
                  <List className="size-4 sm:size-4.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 sm:p-2 flex items-center justify-center transition-colors touch-manipulation ${
                    viewMode === "grid"
                      ? "bg-primary/80 text-primary-foreground"
                      : "text-white/50 hover:text-white/80 hover:bg-white/[0.06]"
                  }`}
                  title="Quadros"
                  aria-pressed={viewMode === "grid"}
                >
                  <LayoutGrid className="size-4 sm:size-4.5" />
                </button>
              </div>
            </div>
            <div
              className={
                viewMode === "list"
                  ? "space-y-2 sm:space-y-3"
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3"
              }
            >
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="glass-card-3d rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col h-full min-w-0"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between flex-shrink-0 min-w-0">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="bg-white/[0.08] rounded-full size-10 sm:size-11 flex items-center justify-center shrink-0">
                        <span className="text-sm font-semibold text-primary/80">{student.avatar}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-white/95 truncate">{student.name}</h3>
                        <p className="text-xs text-white/50 truncate mt-0.5">{student.email}</p>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span className="text-[11px] text-white/45">{student.plan}</span>
                          <span className="text-[11px] text-white/40">{student.frequency}x/semana</span>
                          {student.lastWorkout && student.lastWorkout !== "—" && (
                            <span className="text-[11px] text-white/40">Último: {student.lastWorkout}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 border-t border-white/[0.06] pt-3 sm:pt-0 sm:border-0 flex-shrink-0">
                      {getStatusLabel(student.status)}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/70 hover:text-white h-9 sm:h-8 min-h-[44px] sm:min-h-0 text-xs shrink-0 touch-manipulation"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <Eye className="size-3.5 sm:mr-1.5" />
                        Ver
                        <ChevronRight className="size-3.5 hidden sm:inline ml-0.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.03]">
              <Users className="size-12 mx-auto mb-3 text-white/30" />
              <p className="text-white/70 font-medium text-sm">
                Nenhum aluno encontrado
              </p>
              <p className="text-xs text-white/45 mt-1">
                {search ? `Não há resultados para "${search}".` : "Registre um novo aluno para começar."}
              </p>
              {!search && (
                <Button variant="default" size="sm" className="mt-4 rounded-xl font-medium" onClick={() => setNewStudentOpen(true)}>
                  <Plus className="size-4 mr-2" />
                  Registrar aluno
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <FloatingNav items={floatingNavItems} position="bottom-center" />

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
                      <div className="mt-1.5">{getStatusLabel(selectedStudent.status)}</div>
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
                      <dt className="text-xs font-medium text-white/45">Plano</dt>
                      <dd className="text-sm text-white/85">{selectedStudent.plan}</dd>
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
