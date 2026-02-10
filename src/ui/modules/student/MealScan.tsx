import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSparta } from '../../../shared/context/SpartaContext';
import { Meal } from '../../../shared/types';
import { IMAGES } from '../../../shared/constants/images';

const MealScan: React.FC = () => {
  const navigate = useNavigate();
  const { addMeal } = useSparta();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      // const base64 = (reader.result as string).split(',')[1];
      setImagePreview(reader.result as string);
      
      setAnalyzing(true);
      try {
        // TODO: Enviar para Backend Java -> n8n -> Gemini
        // Por enquanto, simulando resposta para não quebrar
        setTimeout(() => {
             setResult({
                 name: "Refeição Detectada (Simulação)",
                 calories: 500,
                 protein: 30,
                 carbs: 50,
                 fat: 15
             });
             setAnalyzing(false);
        }, 2000);
      } catch (err) {
        console.error("Analysis failed", err);
        setAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const confirmMeal = () => {
    if (!result) return;
    const newMeal: Meal = {
      id: Math.random().toString(),
      name: result.name,
      calories: result.calories,
      protein: result.protein,
      carbs: result.carbs,
      fat: result.fat,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      completed: true
    };
    addMeal(newMeal);
    navigate('/diet');
  };

  return (
    <div className="relative flex h-full w-full flex-col bg-background-dark border-x border-[#333] overflow-hidden">
      <header className="flex items-center justify-between p-4 sm:p-6 pb-2 bg-background-dark z-10 max-w-4xl mx-auto w-full">
        <button onClick={() => navigate('/diet')} className="text-white flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-full hover:bg-white/5 transition-colors"><span className="material-symbols-outlined text-xl sm:text-2xl">arrow_back</span></button>
        <h1 className="text-white text-sm sm:text-base font-bold tracking-wider uppercase flex-1 text-center text-opacity-90">Registro IA</h1>
        <button className="flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-full hover:bg-white/5 transition-colors"><span className="material-symbols-outlined text-xl sm:text-2xl">settings</span></button>
      </header>

      <main className="flex-1 flex flex-col gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 pt-2 pb-24 overflow-y-auto no-scrollbar max-w-4xl mx-auto w-full">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-baseline">
            <h2 className="text-white text-2xl sm:text-3xl font-bold tracking-tight uppercase">Refeição <span className="text-primary text-lg sm:text-xl align-top">A.I.</span></h2>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#333] border border-[#444]">
              <div className={`w-2 h-2 rounded-full ${analyzing ? 'bg-yellow-500 animate-bounce' : 'bg-green-500 animate-pulse'}`}></div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-300">{analyzing ? 'Analisando...' : 'Online'}</span>
            </div>
          </div>
          <p className="text-[#b6aea0] text-sm font-medium tracking-wide flex items-center gap-2"><span className="material-symbols-outlined text-sm">schedule</span>Sparta Vision AI</p>
        </div>

        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#25221d] group shadow-lg border border-[#333]">
          {imagePreview ? (
             <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
          ) : (
            <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{backgroundImage: `url('${IMAGES.MEAL_PLACEHOLDER}')`}}></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
          {/* Transição suave entre imagem e botão (semi-transparência, sem corte brusco) */}
          <div
            className="absolute inset-x-0 bottom-0 h-24 sm:h-28 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent 0%, rgba(15, 20, 22, 0.4) 40%, rgba(15, 20, 22, 0.85) 100%)",
            }}
          />
          
          <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between"><div className="w-8 h-8 border-l-2 border-t-2 border-primary/70 rounded-tl-lg"></div><div className="w-8 h-8 border-r-2 border-t-2 border-primary/70 rounded-tr-lg"></div></div>
            {analyzing && <div className="scan-line"></div>}
            <div className="flex justify-between items-end"><div className="w-8 h-8 border-l-2 border-b-2 border-primary/70 rounded-bl-lg"></div><div className="w-8 h-8 border-r-2 border-b-2 border-primary/70 rounded-br-lg"></div></div>
          </div>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md mx-auto px-4 sm:px-8 pointer-events-auto">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-primary/90 hover:bg-primary backdrop-blur-sm text-black font-bold h-10 sm:h-12 rounded-lg flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(213,159,57,0.3)] transition-all transform active:scale-95 text-sm sm:text-base"
            >
              <span className="material-symbols-outlined text-lg">photo_camera</span>
              {imagePreview ? 'RE-ESCANEAR PRATO' : 'CAPTURAR REFEIÇÃO'}
            </button>
            <input type="file" className="hidden" ref={fileInputRef} accept="image/*" onChange={handleFileChange} />
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="flex items-end justify-between border-b border-[#333] pb-4">
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Combustível Detectado</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-primary tracking-tighter">{result.calories}</span>
                  <span className="text-sm font-bold text-gray-400 uppercase">Kcal</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="bg-success/10 border border-success/30 text-success px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Análise Completa</div>
                <span className="text-[10px] text-gray-500">{result.name}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Proteína', val: result.protein, color: 'border-primary' },
                { label: 'Carbo', val: result.carbs, color: 'border-warning' },
                { label: 'Gordura', val: result.fat, color: 'border-success' }
              ].map(macro => (
                <div key={macro.label} className={`bg-card-dark p-3 rounded-lg border-b-2 ${macro.color} flex flex-col gap-2 relative overflow-hidden`}>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{macro.label}</div>
                  <div className="text-xl font-bold text-white">{macro.val}<span className="text-xs text-gray-500 ml-0.5">g</span></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 w-full max-w-md bg-background-dark/95 backdrop-blur-xl border-t border-[#333] p-4 flex gap-3 z-50">
        <button onClick={() => {setImagePreview(null); setResult(null);}} className="flex-1 h-12 rounded-lg border border-[#444] text-gray-300 font-bold text-sm hover:bg-[#333] transition-colors uppercase tracking-wide">Limpar</button>
        <button 
          onClick={confirmMeal}
          disabled={!result || analyzing}
          className={`flex-[2] h-12 rounded-lg font-bold text-sm transition-all transform active:scale-95 uppercase tracking-wide flex items-center justify-center gap-2 ${(!result || analyzing) ? 'bg-gray-700 text-gray-500' : 'bg-primary text-[#171512] shadow-[0_0_20px_rgba(213,159,57,0.2)]'}`}
        >
          <span className="material-symbols-outlined text-lg">check_circle</span>Confirmar Registro
        </button>
      </footer>
    </div>
  );
};

export default MealScan;