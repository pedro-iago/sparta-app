import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSparta } from "@/shared/context/SpartaContext";
import { PageHeader } from "@/ui/components/ui/page-header";
import { FloatingNav, type FloatingNavItem } from "@/ui/components/ui/floating-nav";
import { Home, Dumbbell, ChefHat, User, ArrowLeft, X } from "lucide-react";

const DietPhotoGallery: React.FC = () => {
  const navigate = useNavigate();
  const { dietPhotos } = useSparta();
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);

  const floatingNavItems: FloatingNavItem[] = [
    { icon: <Home />, label: "Início", onClick: () => navigate("/dashboard/student") },
    { icon: <Dumbbell />, label: "Treinos", onClick: () => navigate("/student/workouts") },
    { icon: <ChefHat />, label: "Dieta", onClick: () => navigate("/diet") },
    { icon: <User />, label: "Perfil", onClick: () => navigate("/dashboard/perfil") },
  ];

  return (
    <div className="min-h-screen bg-page-dark pb-24 flex flex-col">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <PageHeader
          title="Galeria de fotos"
          subtitle={`${dietPhotos.length} foto${dietPhotos.length !== 1 ? "s" : ""} da dieta enviada`}
          leftSlot={
            <button
              onClick={() => navigate("/diet")}
              className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/5 transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft className="size-5" />
            </button>
          }
        />

        <div className="py-4">
          {dietPhotos.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {dietPhotos.map((photo) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setLightboxPhoto(photo.imageUrl)}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.mealName}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                    <p className="text-xs font-medium text-white truncate">{photo.mealName}</p>
                    <p className="text-[10px] text-white/70">
                      {new Date(photo.createdAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="glass-card-3d rounded-2xl p-12 flex flex-col items-center justify-center gap-3 border border-white/10 border-dashed text-center">
              <p className="text-white/70">Nenhuma foto na galeria</p>
              <button
                type="button"
                onClick={() => navigate("/diet")}
                className="text-primary font-medium hover:underline"
              >
                Voltar para a dieta
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxPhoto && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setLightboxPhoto(null)}
          onKeyDown={(e) => e.key === "Escape" && setLightboxPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-default"
        >
          <img
            src={lightboxPhoto}
            alt="Ampliar"
            className="max-w-full max-h-full object-contain rounded-lg cursor-default"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setLightboxPhoto(null)}
            className="absolute top-4 right-4 size-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Fechar"
          >
            <X className="size-5" />
          </button>
        </div>
      )}

      <FloatingNav items={floatingNavItems} position="bottom-center" />
    </div>
  );
};

export default DietPhotoGallery;
