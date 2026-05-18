import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  Volume2,
  Mic2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { MODULES, ModuleType } from './data';

// --- Subcomponents ---

const PlayerCard = ({ name, score, isActive, avatar }: { name: string, score: number, isActive: boolean, avatar: string }) => (
  <motion.div 
    animate={{ scale: isActive ? 1.1 : 1, opacity: isActive ? 1 : 0.6 }}
    className={`p-6 rounded-3xl border-4 border-black flex flex-col items-center gap-2 shadow-[8px_8px_0_0_#000] overflow-hidden relative ${isActive ? 'bg-lime-400 text-black' : 'bg-white text-black'}`}
  >
    <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-4xl mb-2 border-2 border-white relative z-10">
      {avatar}
    </div>
    <h3 className="font-black text-2xl uppercase italic relative z-10">{name}</h3>
    <div className="bg-black text-white px-4 py-1 rounded-full font-black text-xl relative z-10">
      {score}
    </div>
    {isActive && (
       <motion.div 
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="text-[10px] font-black uppercase tracking-widest mt-2 relative z-10"
       >
        ՔՈ ՀԵՐԹՆ Է
       </motion.div>
    )}
    {isActive && (
       <motion.div 
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border-8 border-dashed border-black/10 rounded-full scale-150"
       />
    )}
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleType | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [playerScores, setPlayerScores] = useState({ gor: 0, gayane: 0 });
  const [currentPlayer, setCurrentPlayer] = useState<'gor' | 'gayane'>(Math.random() > 0.5 ? 'gor' : 'gayane');
  const [complete, setComplete] = useState(false);
  const [puzzleOptions, setPuzzleOptions] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const startModule = (type: ModuleType) => {
    setActiveModule(type);
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setPlayerScores({ gor: 0, gayane: 0 });
    setComplete(false);
    window.speechSynthesis.cancel();

    if (type === 'puzzle_3d') {
      const initial = [...MODULES[type].challenges[0].options];
      setPuzzleOptions(initial.sort(() => Math.random() - 0.5));
    }
  };

  const playAudio = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  const undoWord = (word: string, idx: number) => {
    if (activeModule !== 'puzzle_3d' || isCorrect !== null) return;
    const current = selectedOption ? selectedOption.split(' ') : [];
    const draft = current.filter((_, i) => i !== idx);
    setSelectedOption(draft.length > 0 ? draft.join(' ') : null);
    setPuzzleOptions(prev => [...prev, word]);
  };

  const handleCheck = (option: string, pIdx?: number) => {
    if (isCorrect !== null) return;

    if (activeModule === 'puzzle_3d') {
      const current = selectedOption ? selectedOption.split(' ') : [];
      const draft = [...current, option];
      const newSentence = draft.join(' ');
      setSelectedOption(newSentence);
      
      const newOpts = [...puzzleOptions];
      if (pIdx !== undefined) newOpts.splice(pIdx, 1);
      setPuzzleOptions(newOpts);

      if (newOpts.length === 0) {
        const challenge = MODULES[activeModule].challenges[currentIdx];
        const correct = newSentence.trim() === challenge.correct.trim();
        setIsCorrect(correct);
        if (correct) {
          setPlayerScores(s => ({ ...s, [currentPlayer]: s[currentPlayer] + 1 }));
        }
      }
      return;
    }

    if (selectedOption !== null) return;
    
    const module = MODULES[activeModule!];
    const challenge = module.challenges[currentIdx];
    
    setSelectedOption(option);
    const correct = option.toLowerCase() === challenge.correct.toLowerCase();
    setIsCorrect(correct);
    
    if (correct) {
      setPlayerScores(s => ({ ...s, [currentPlayer]: s[currentPlayer] + 1 }));
    }
  };

  const handleNext = () => {
    const module = MODULES[activeModule!];
    if (currentIdx < module.challenges.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setSelectedOption(null);
      setIsCorrect(null);
      setCurrentPlayer(prev => prev === 'gor' ? 'gayane' : 'gor');
      
      if (activeModule === 'puzzle_3d') {
        const nextChallenge = module.challenges[nextIdx];
        const initial = [...nextChallenge.options];
        setPuzzleOptions(initial.sort(() => Math.random() - 0.5));
      }
    } else {
      setComplete(true);
      if (playerScores.gor !== playerScores.gayane) {
         confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#C6FF00', '#FFFFFF', '#000000']
          });
      }
    }
  };

  if (!activeModule) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-lime-400/30 overflow-x-hidden">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
          body { 
            font-family: 'Space Grotesk', sans-serif;
            background-color: #050505;
          }
          .Armenian { font-family: sans-serif; }
          .cosmic-bg {
            background-image: radial-gradient(circle at 50% 50%, #1a1a1a 0%, #050505 100%);
          }
          .stars {
            background: transparent url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/123163/stars.png') repeat top center;
            z-index: -1;
          }
          .glow-text {
            text-shadow: 0 0 20px rgba(198, 255, 0, 0.4);
          }
        `}</style>
        
        <div className="fixed inset-0 cosmic-bg" />
        <div className="fixed inset-0 stars opacity-40 pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(198,255,0,0.1),transparent_60%)] pointer-events-none" />

        <header className="p-8 border-b-4 border-black bg-lime-400 relative z-10 shadow-[0_4px_0_0_#000]">
          <div className="max-w-4xl mx-auto flex justify-between items-center text-black">
            <div>
              <h1 className="text-4xl sm:text-6xl font-black italic tracking-tighter uppercase leading-none glow-text">ԳՈՌ VS ԳԱՅԱՆԵ</h1>
              <div className="flex gap-2 items-center mt-2">
                <p className="text-xl sm:text-2xl font-bold bg-black text-white inline-block px-4 py-1 -skew-x-12">ԻՍՊԱՆԵՐԵՆԻ ՄՐՑՈՒՅԹ</p>
              </div>
            </div>
            <div className="text-6xl animate-bounce">🏆</div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-8 py-16 relative z-10">
          <div className="grid grid-cols-2 gap-8 mb-16">
            <PlayerCard name="Գոռ" score={0} isActive={false} avatar="👦" />
            <PlayerCard name="Գայանե" score={0} isActive={false} avatar="👧" />
          </div>

          <div className="bg-white/5 backdrop-blur-xl border-2 border-white/10 p-8 rounded-[2.5rem] mb-12 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-lime-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h2 className="text-3xl font-black mb-4 Armenian glow-text">Բարի գալուստ մրցաշար:</h2>
            <p className="text-lg opacity-80 Armenian">Ընտրեք մակարդակը և սկսեք մրցույթը: Պատասխանեք հարցերին հերթով և դարձեք հաղթողը:</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {(Object.keys(MODULES) as ModuleType[]).map((key) => (
              <button
                key={key}
                onClick={() => startModule(key)}
                className="group relative bg-white border-4 border-black p-8 rounded-[2.5rem] hover:-translate-y-2 hover:translate-x-2 hover:shadow-[-15px_15px_0px_0px_#C6FF00] transition-all text-left overflow-hidden ring-4 ring-transparent hover:ring-black text-black"
              >
                <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-15 transition-all scale-150 rotate-12 group-hover:rotate-0">
                  {React.cloneElement(MODULES[key].icon as React.ReactElement, { size: 150 })}
                </div>
                <div className="mb-6 bg-black p-4 inline-block rounded-2xl shadow-[5px_5px_0_0_#C6FF00] group-hover:scale-110 transition-transform">
                  {React.cloneElement(MODULES[key].icon as React.ReactElement, { size: 40 })}
                </div>
                <h3 className="text-3xl font-black uppercase mb-3 italic tracking-tight">{MODULES[key].title}</h3>
                <p className="text-gray-500 font-bold Armenian leading-relaxed">{MODULES[key].description}</p>
                <div className="mt-10 flex items-center justify-between">
                   <span className="text-xs font-black tracking-widest bg-black/5 px-4 py-2 rounded-full">LEVEL A1+</span>
                   <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center group-hover:bg-lime-400 group-hover:text-black transition-all rotate-3 group-hover:rotate-0">
                      <ChevronRight size={32} />
                   </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-20 text-center opacity-30 Armenian text-sm">
            <p>12 տարեկանների համար • Իսպաներենի Մրցույթ</p>
          </div>
        </main>
      </div>
    );
  }

  const activeModuleData = MODULES[activeModule];
  const challenge = activeModuleData.challenges[currentIdx];

  if (complete) {
    const winner = playerScores.gor > playerScores.gayane ? 'gor' : playerScores.gayane > playerScores.gor ? 'gayane' : 'draw';
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-8 text-white relative overflow-hidden">
        <div className="fixed inset-0 stars opacity-40 pointer-events-none" />
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white text-black p-12 rounded-[4rem] shadow-[20px_20px_0px_0px_#C6FF00] border-4 border-black text-center max-w-lg w-full relative z-10"
        >
          <div className="mb-10 text-8xl">
             {winner === 'draw' ? '🤝' : winner === 'gor' ? '👦' : '👧'}
          </div>
          <h2 className="text-4xl sm:text-6xl font-black italic uppercase mb-2 tracking-tighter Armenian">
            {winner === 'draw' ? 'ՈՉ-ՈՔԻ' : winner === 'gor' ? 'ԳՈՌԸ ՀԱՂԹԵՑ' : 'ԳԱՅԱՆԵՆ ՀԱՂԹԵՑ'}
          </h2>
          
          <div className="flex justify-center gap-12 my-12 pt-6 border-t-2 border-black/5">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40 Armenian mb-2">ԳՈՌ</span>
              <span className="text-5xl font-black">{playerScores.gor}</span>
            </div>
            <div className="w-[2px] bg-black/10" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40 Armenian mb-2">ԳԱՅԱՆԵ</span>
              <span className="text-5xl font-black">{playerScores.gayane}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <button 
              onClick={() => startModule(activeModule)}
              className="w-full h-20 bg-black text-white text-2xl font-black uppercase rounded-3xl hover:bg-lime-400 hover:text-black transition-all flex items-center justify-center gap-4 border-4 border-black"
            >
              Start Over
            </button>
            <button 
              onClick={() => setActiveModule(null)}
              className="w-full h-20 bg-lime-400 text-black text-2xl font-black uppercase rounded-3xl hover:scale-105 transition-all border-4 border-black shadow-[0_8px_0_0_#000]"
            >
              Back to Ship
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
       <div className="fixed inset-0 stars opacity-30 pointer-events-none" />

       <nav className="p-4 sm:p-6 border-b-4 border-black flex justify-between items-center bg-black text-white sticky top-0 z-50">
          <button onClick={() => setActiveModule(null)} className="flex items-center gap-2 font-black italic hover:text-lime-400 transition-colors bg-white/10 px-3 py-2 rounded-xl text-xs sm:text-sm">
            <ChevronLeft size={16} /> EXIT
          </button>
          
          <div className="flex items-center gap-4 sm:gap-10">
            <div className={`px-4 py-2 rounded-2xl border-2 transition-all duration-500 ${currentPlayer === 'gor' ? 'bg-lime-400 border-lime-400 text-black scale-110 shadow-[0_0_20px_rgba(198,255,0,0.5)]' : 'bg-white/5 border-white/10 opacity-50'}`}>
              <div className="flex items-center gap-2">
                <span className="text-xl">👦</span>
                <span className="font-black italic text-sm">{playerScores.gor}</span>
              </div>
            </div>
            <div className="text-xs font-black opacity-20 italic">VS</div>
            <div className={`px-4 py-2 rounded-2xl border-2 transition-all duration-500 ${currentPlayer === 'gayane' ? 'bg-lime-400 border-lime-400 text-black scale-110 shadow-[0_0_20px_rgba(198,255,0,0.5)]' : 'bg-white/5 border-white/10 opacity-50'}`}>
              <div className="flex items-center gap-2">
                <span className="text-xl">👧</span>
                <span className="font-black italic text-sm">{playerScores.gayane}</span>
              </div>
            </div>
          </div>

          <div className="font-black text-sm sm:text-xl italic text-lime-400 mr-2">
             {currentIdx + 1} / {activeModuleData.challenges.length}
          </div>
       </nav>

       <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 p-4 sm:p-10 py-10 relative z-10 text-black">
          <div className="space-y-8">
            <div className="relative group">
              <div className="absolute -inset-2 bg-lime-400/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="bg-white border-4 border-black rounded-[3rem] overflow-hidden shadow-[15px_15px_0px_0px_rgba(198,255,0,0.3)] relative">
                <div className="relative">
                  <img src={challenge.image} alt="Cosmic" className="w-full h-64 sm:h-96 object-cover border-b-4 border-black group-hover:scale-105 transition-transform duration-[2s]" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-black text-white px-4 py-1 rounded-full text-[10px] font-black Armenian uppercase tracking-widest">
                    ՏԵՍԱՐԱՆ {currentIdx + 1}
                  </div>
                </div>
                <div className="p-8 Armenian">
                  <h4 className="text-2xl sm:text-3xl font-black italic leading-tight text-gray-800">{challenge.am}</h4>
                </div>
              </div>
            </div>

            <motion.div 
              key={currentPlayer}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-black text-white p-6 rounded-[2rem] border-2 border-white/10 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-lime-400 rounded-full flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(198,255,0,0.4)]">
                   {currentPlayer === 'gor' ? '👦' : '👧'}
                </div>
                <div>
                  <p className="font-black italic text-xs text-lime-400">NEXT UP:</p>
                  <p className="font-black text-2xl uppercase Armenian tracking-tight italic">
                    {currentPlayer === 'gor' ? 'ԳՈՌ' : 'ԳԱՅԱՆԵ'}
                  </p>
                </div>
              </div>
              <div className="w-10 h-10 border-4 border-white/10 rounded-full border-t-lime-400 animate-spin" />
            </motion.div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 sm:p-14 rounded-[4rem] border-4 border-black shadow-[15px_15px_0_0_#000] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-40 h-40 bg-black/5 -mr-20 -mt-20 rounded-full" />
               
               {activeModule === 'audio_story' && (
                  <div className="mb-12">
                    <button 
                      onClick={() => playAudio(challenge.audioText!)}
                      className={`w-24 h-24 rounded-full border-4 border-black shadow-[6px_6px_0_0_#000] flex items-center justify-center mx-auto transition-all ${isPlaying ? 'bg-lime-400 text-black scale-110 rotate-3' : 'bg-white text-black hover:bg-lime-400 hover:-translate-y-1'}`}
                    >
                      {isPlaying ? <Volume2 size={48} className="animate-pulse" /> : <Mic2 size={48} />}
                    </button>
                    <p className="mt-4 text-[10px] font-black tracking-[0.4em] opacity-40 text-center uppercase Armenian">Լսի՛ր պատմությունը</p>
                  </div>
               )}

               <div className="min-h-[160px] flex flex-col items-center justify-center text-center">
                 <h2 className="text-3xl sm:text-5xl font-black italic tracking-tighter leading-tight">
                    {activeModule === 'puzzle_3d' ? (
                      <div className="flex flex-wrap justify-center gap-3">
                         {(selectedOption?.split(' ') || []).map((word, i) => (
                           <motion.span 
                            key={i} 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }}
                            onClick={() => undoWord(word, i)}
                            className="bg-lime-400 text-black px-4 py-1.5 rounded-2xl border-2 border-black shadow-[4px_4px_0_0_#000] cursor-pointer hover:bg-white transition-colors text-xl sm:text-2xl"
                           >
                             {word}
                           </motion.span>
                         ))}
                         {(!selectedOption) && <span className="text-gray-200 text-5xl">...</span>}
                      </div>
                    ) : (
                      <span className="text-gray-800">{challenge.es}</span>
                    )}
                 </h2>
                 <p className="mt-4 text-lg sm:text-xl font-bold text-gray-400 Armenian italic">{challenge.am}</p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-16">
                  {(activeModule === 'puzzle_3d' ? puzzleOptions : challenge.options).map((opt, i) => (
                    <button
                      key={`${opt}-${i}`}
                      onClick={() => handleCheck(opt, i)}
                      disabled={isCorrect !== null}
                      className={`h-16 sm:h-24 text-xl sm:text-3xl font-black uppercase rounded-3xl border-4 transition-all ${
                        selectedOption === opt && activeModule !== 'puzzle_3d'
                          ? (isCorrect ? 'bg-lime-400 text-black border-black shadow-[0_6px_0_0_#98C200]' : 'bg-red-500 text-white border-black shadow-[0_6px_0_0_#7F1D1D]')
                          : 'bg-gray-50 border-gray-100 hover:border-black hover:bg-white hover:-translate-y-1'
                      } disabled:opacity-50 disabled:translate-y-0`}
                    >
                      {opt}
                    </button>
                  ))}
               </div>

               <AnimatePresence>
                  {isCorrect !== null && (
                    <motion.div 
                      key="feedback"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className={`mt-12 p-8 rounded-[2.5rem] border-4 text-left Armenian relative z-10 ${isCorrect ? 'bg-lime-400 text-black border-black' : 'bg-red-500 text-white border-black'}`}
                    >
                       <div className="flex items-start gap-4">
                         <div className={`w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center flex-shrink-0 ${isCorrect ? 'bg-white' : 'bg-black'}`}>
                           {isCorrect ? <CheckCircle2 className="text-black" /> : <AlertCircle className="text-white" />}
                         </div>
                         <div>
                           <p className="font-black text-2xl italic mb-1 uppercase">{isCorrect ? 'ՃԻՇՏ Է!' : 'ՍԽԱԼ Է!'}</p>
                           <p className="font-bold text-lg opacity-90 leading-tight">{challenge.explanation}</p>
                         </div>
                       </div>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>

            {isCorrect !== null && (
               <motion.button 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                onClick={handleNext}
                className="w-full h-20 sm:h-24 bg-lime-400 text-black text-2xl sm:text-4xl font-black uppercase rounded-[2.5rem] border-4 border-black shadow-[0_12px_0_0_#000] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 mt-8"
               >
                 {currentIdx === activeModuleData.challenges.length - 1 ? 'Տեսնել Արդյունքը' : 'Հաջորդը'} <ChevronRight size={40} />
               </motion.button>
            )}
          </div>
       </main>
    </div>
  );
}
