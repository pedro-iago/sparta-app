import { useState } from "react";
import { Card } from "@/ui/components/ui/card";
import { Button } from "@/ui/components/ui/button";
import { Badge } from "@/ui/components/ui/badge";
import { Input } from "@/ui/components/ui/input";
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
  lastWorkout?: string;
  phone?: string;
  birthDate?: string;
  goal?: string;
}

const MOCK_STUDENTS: Student[] = [
  { id: "1", name: "Carlos Silva", avatar: "CS", email: "carlos.silva@email.com", plan: "Premium", status: "active", lastWorkout: "Hoje", phone: "(11) 98765-4321", birthDate: "15/03/1990", goal: "Hipertrofia" },
  { id: "2", name: "Ana Santos", avatar: "AS", email: "ana.santos@email.com", plan: "Básico", status: "active", lastWorkout: "Ontem", phone: "(11) 91234-5678", birthDate: "22/07/1995", goal: "Emagrecimento" },
  { id: "3", name: "João Pedro", avatar: "JP", email: "joao.pedro@email.com", plan: "Premium", status: "active", lastWorkout: "Há 2 dias", phone: "(21) 99876-5432", birthDate: "10/11/1988", goal: "Força" },
  { id: "4", name: "Marina Costa", avatar: "MC", email: "marina.costa@email.com", plan: "Premium", status: "active", lastWorkout: "Há 3 dias", phone: "(31) 97654-3210", birthDate: "05/01/1992", goal: "Condicionamento" },
  { id: "5", name: "Rafael Oliveira", avatar: "RO", email: "rafael.oliveira@email.com", plan: "Básico", status: "pending", lastWorkout: "—", phone: "(11) 96543-2109", birthDate: "18/09/1985", goal: "Hipertrofia" },
  { id: "6", name: "Fernanda Lima", avatar: "FL", email: "fernanda.lima@email.com", plan: "Básico", status: "inactive", lastWorkout: "Há 1 semana", phone: "(41) 95432-1098", birthDate: "30/12/1993", goal: "Emagrecimento" },
];

export function ProfessionalStudents() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() =>
    localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "1"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [newStudentOpen, setNewStudentOpen] = useState(false);

  const toggleSidebar = () => {
    const next = !sidebarCollapsed;
    setSidebarCollapsed(next);
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, next ? "1" : "0");
  };

  const filteredStudents = MOCK_STUDENTS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

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
        <div className={`mb-6 flex items-start gap-1 ${sidebarCollapsed ? "flex-col items-center" : ""}`}>
          {sidebarCollapsed ? (
            <span className="text-lg font-bold text-primary">S</span>
          ) : (
            <>
              <div className="flex items-center gap-2 min-w-0">
                <h1 className="text-2xl text-primary truncate">SPARTA AI</h1>
                <button
                  type="button"
                  onClick={toggleSidebar}
                  title="Minimizar menu"
                  className="shrink-0 p-1.5 rounded-md opacity-50 hover:opacity-80 bg-black/10 hover:bg-black/20 transition-opacity"
                  aria-label="Minimizar menu"
                >
                  <PanelLeftClose className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </>
          )}
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
          {sidebarCollapsed && (
            <button
              type="button"
              onClick={toggleSidebar}
              title="Expandir menu"
              className="p-2 rounded-md opacity-50 hover:opacity-80 bg-black/10 hover:bg-black/20 transition-opacity"
              aria-label="Expandir menu"
            >
              <PanelLeftOpen className="h-5 w-5 text-muted-foreground" />
            </button>
          )}
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

        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou e-mail..."
                className="pl-10 bg-muted border-border"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredStudents.length} aluno(s)
            </p>
          </div>

          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <Card
                key={student.id}
                className="bg-card border-border hover:border-primary/50 transition-colors"
              >
                <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center shrink-0">
                      <span className="font-bold text-primary">{student.avatar}</span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-lg truncate">{student.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{student.email}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-xs text-muted-foreground">{student.plan}</span>
                        {student.lastWorkout && (
                          <>
                            <span className="text-muted-foreground/50">·</span>
                            <span className="text-xs text-muted-foreground">
                              Último treino: {student.lastWorkout}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {getStatusBadge(student.status)}
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary/30 hover:bg-primary/10"
                      onClick={() => setSelectedStudent(student)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Ver
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum aluno encontrado para &quot;{search}&quot;</p>
            </div>
          )}
        </div>
      </div>

      {/* Sheet - Dados do cliente */}
      <Sheet open={!!selectedStudent} onOpenChange={(open) => !open && setSelectedStudent(null)}>
        <SheetContent side="right" className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Dados do aluno</SheetTitle>
            <SheetDescription>Informações do cliente vinculado ao seu perfil</SheetDescription>
          </SheetHeader>
          {selectedStudent && (
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/20 rounded-full w-14 h-14 flex items-center justify-center shrink-0">
                  <span className="font-bold text-lg text-primary">{selectedStudent.avatar}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{selectedStudent.name}</h3>
                  {getStatusBadge(selectedStudent.status)}
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">E-mail:</span>
                  <span className="break-all">{selectedStudent.email}</span>
                </div>
                {selectedStudent.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">Telefone:</span>
                    <span>{selectedStudent.phone}</span>
                  </div>
                )}
                {selectedStudent.birthDate && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">Data de nasc.:</span>
                    <span>{selectedStudent.birthDate}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Plano:</span>
                  <Badge variant="secondary">{selectedStudent.plan}</Badge>
                </div>
                {selectedStudent.goal && (
                  <div className="flex items-center gap-3">
                    <Target className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">Objetivo:</span>
                    <span>{selectedStudent.goal}</span>
                  </div>
                )}
                {selectedStudent.lastWorkout && selectedStudent.lastWorkout !== "—" && (
                  <div className="pt-2 border-t border-border">
                    <span className="text-muted-foreground">Último treino: </span>
                    <span>{selectedStudent.lastWorkout}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Dialog - Registrar novo aluno */}
      <Dialog open={newStudentOpen} onOpenChange={setNewStudentOpen}>
        <DialogContent className="sm:max-w-md">
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
              <Input placeholder="Ex.: Básico ou Premium" className="bg-muted border-border" />
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
