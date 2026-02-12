
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, GameObject } from './types.ts';
import { GAME_WIDTH, GAME_HEIGHT, PLAYER_WIDTH, OBJECT_SIZE, ITEMS, MILESTONES } from './constants.tsx';
import { getFitnessTip } from './geminiService.ts';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [score, setScore] = useState(0);
  const [playerX, setPlayerX] = useState(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
  const [objects, setObjects] = useState<GameObject[]>([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [fitnessTip, setFitnessTip] = useState<string>('');
  const [isLoadingTip, setIsLoadingTip] = useState(false);
  const [nickname, setNickname] = useState('');

  const gameLoopRef = useRef<number>(undefined);
  const lastSpawnRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef(0);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  const handleGameOver = useCallback(async (finalScore: number) => {
    setGameState(GameState.GAMEOVER);
    setIsLoadingTip(true);
    const tip = await getFitnessTip(finalScore, nickname || '애슬릿');
    setFitnessTip(tip);
    setIsLoadingTip(false);
  }, [nickname]);

  const startGame = () => {
    if (!nickname.trim()) {
      alert('훈련을 시작하기 전 닉네임을 입력해주세요!');
      return;
    }
    setScore(0);
    scoreRef.current = 0;
    setObjects([]);
    setTimeLeft(15);
    setGameState(GameState.PLAYING);
    setFitnessTip('');
  };

  const goHome = () => {
    setGameState(GameState.START);
    setScore(0);
    setObjects([]);
    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
  };

  const movePlayer = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let newX = clientX - rect.left - PLAYER_WIDTH / 2;
    newX = Math.max(0, Math.min(newX, GAME_WIDTH - PLAYER_WIDTH));
    setPlayerX(newX);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: '프로칼로 쿠폰 이벤트 게임',
      text: `${nickname}님의 훈련 결과: ${score}점! 지금 바로 도전하고 할인 쿠폰을 받으세요!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 클립보드에 복사되었습니다! 친구에게 공유해보세요.');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  useEffect(() => {
    if (gameState !== GameState.PLAYING) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleGameOver(scoreRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, handleGameOver]);

  useEffect(() => {
    if (gameState !== GameState.PLAYING) return;

    const update = (time: number) => {
      if (time - lastSpawnRef.current > 320) {
        const types: (keyof typeof ITEMS)[] = ['STRAP', 'LIFTING_BELT', 'KNEE_SLEEVES', 'WRIST_GUARD', 'SOFA', 'PHONE'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        const newObj: GameObject = {
          id: Date.now() + Math.random(),
          type: randomType as any,
          x: Math.random() * (GAME_WIDTH - OBJECT_SIZE),
          y: -OBJECT_SIZE,
          speed: 4.5 + Math.random() * 6.5,
        };
        setObjects((prev) => [...prev, newObj]);
        lastSpawnRef.current = time;
      }

      setObjects((prev) => {
        const nextObjs: GameObject[] = [];
        let scoreGain = 0;

        prev.forEach((obj) => {
          const nextY = obj.y + obj.speed;
          const hitX = obj.x + OBJECT_SIZE > playerX && obj.x < playerX + PLAYER_WIDTH;
          const hitY = nextY + OBJECT_SIZE > GAME_HEIGHT - 100 && nextY < GAME_HEIGHT - 60;

          if (hitX && hitY) {
            scoreGain += (ITEMS as any)[obj.type].points;
          } else if (nextY < GAME_HEIGHT) {
            nextObjs.push({ ...obj, y: nextY });
          }
        });

        if (scoreGain !== 0) {
          setScore((s) => Math.max(0, s + scoreGain));
        }
        return nextObjs;
      });

      gameLoopRef.current = requestAnimationFrame(update);
    };

    gameLoopRef.current = requestAnimationFrame(update);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameState, playerX]);

  const getReward = (finalScore: number) => {
    if (finalScore === 72) {
      return "🎉 잭팟! 18% 할인 쿠폰: [72HR_SPECIAL]";
    }
    const achieved = [...MILESTONES].reverse().find(m => finalScore >= m.score);
    return achieved ? achieved.reward : "5% 할인 쿠폰: [START_GEAR05]";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4 font-sans overflow-hidden">
      {/* Brand Header */}
      <div 
        onClick={goHome}
        className="mb-4 text-center cursor-pointer group transition-all transform active:scale-95"
      >
        <h1 className="text-3xl font-black tracking-tighter text-blue-500 italic uppercase group-hover:text-blue-400 transition-colors drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">ProCalo</h1>
        <p className="text-[11px] text-neutral-400 font-bold tracking-[0.2em] uppercase group-hover:text-neutral-300 transition-colors">Professional Fitness Gear</p>
      </div>

      <div 
        ref={containerRef}
        className="relative bg-neutral-900 border-2 border-neutral-800 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT, touchAction: 'none' }}
        onMouseMove={(e) => movePlayer(e.clientX)}
        onTouchMove={(e) => movePlayer(e.touches[0].clientX)}
      >
        {gameState === GameState.START && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-start pt-8 p-6 text-center backdrop-blur-md animate-fade-in overflow-y-auto">
            <div className="w-full bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 py-4 mb-5 relative rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-400/20 overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
               <div className="relative z-10 flex flex-col items-center">
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-200 mb-1 animate-pulse">Limited Time Event</span>
                  <h2 className="text-[18px] font-black italic tracking-tighter text-white uppercase drop-shadow-lg leading-tight">프로칼로 쿠폰 이벤트 게임</h2>
               </div>
            </div>

            <div className="w-full relative mb-6 group cursor-default">
               <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
               <div className="relative bg-neutral-800 border border-yellow-500/20 rounded-2xl p-4 flex items-center gap-4 shadow-xl">
                  <div className="text-3xl animate-bounce">🔥</div>
                  <div className="text-left">
                    <p className="text-[11px] font-black text-yellow-500 uppercase tracking-widest leading-none mb-1">Lucky Target</p>
                    <p className="text-lg font-black text-white leading-tight italic uppercase">72 Pts = <span className="text-yellow-400">18% OFF</span></p>
                    <p className="text-[11px] text-neutral-400 font-medium">72점을 정확히 맞추면 잭팟 쿠폰 증정!</p>
                  </div>
               </div>
            </div>
            
            <div className="w-full mb-6">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="닉네임을 입력하세요"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value.slice(0, 10))}
                  className="w-full bg-neutral-800 border-2 border-neutral-700 rounded-2xl px-4 py-4 text-center text-blue-400 font-black focus:border-blue-500 focus:outline-none transition-all placeholder:text-neutral-600 tracking-tight text-xl shadow-inner"
                />
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-neutral-900 px-3 py-0.5 rounded-full border border-neutral-700">
                  <p className="text-[10px] text-neutral-500 uppercase font-black tracking-widest whitespace-nowrap">Athlete Nickname</p>
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-3 gap-3 mb-6 bg-neutral-800/20 p-4 rounded-2xl border border-white/5 shadow-inner">
               {Object.entries(ITEMS).map(([key, item]) => (
                  <div key={key} className="flex flex-col items-center justify-center p-1.5 rounded-xl">
                    <div className="w-10 h-10 mb-2 flex items-center justify-center">
                       {(item as any).icon((item as any).color)}
                    </div>
                    <span className="text-[11px] font-black text-neutral-400 uppercase tracking-tighter mb-0.5 leading-none">{(item as any).label}</span>
                    <span className={`text-[12px] font-bold ${(item as any).points > 0 ? (item as any).color : 'text-red-500'}`}>
                      {(item as any).points > 0 ? `+${(item as any).points}` : (item as any).points}
                    </span>
                  </div>
               ))}
            </div>
            
            <button 
              onClick={startGame}
              className="group relative w-full py-4.5 font-black text-white transition-all duration-200 bg-blue-600 rounded-2xl focus:outline-none hover:bg-blue-500 active:scale-95 shadow-[0_10px_30px_rgba(59,130,246,0.3)] mb-4"
            >
              <span className="relative uppercase tracking-[0.2em] text-base italic">Start Training</span>
            </button>
          </div>
        )}

        {gameState === GameState.PLAYING && (
          <>
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
              <button 
                onClick={goHome}
                className="bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10"
              >
                🏠
              </button>
              <div className="flex gap-2">
                <div className={`bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl border shadow-lg transition-all duration-300 ${score === 72 ? 'border-yellow-400 scale-105' : 'border-white/10'}`}>
                  <span className="text-[10px] text-neutral-400 font-black uppercase mr-2 tracking-widest">Score</span>
                  <span className={`text-xl font-black tabular-nums ${score === 72 ? 'text-yellow-400 animate-pulse' : 'text-blue-400'}`}>{score}</span>
                </div>
                <div className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-lg">
                  <span className="text-[10px] text-neutral-400 font-black uppercase mr-2 tracking-widest">Time</span>
                  <span className={`text-xl font-black tabular-nums ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                    {timeLeft}s
                  </span>
                </div>
              </div>
            </div>

            {objects.map((obj) => (
              <div
                key={obj.id}
                className="absolute flex items-center justify-center select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                style={{ left: obj.x, top: obj.y, width: OBJECT_SIZE, height: OBJECT_SIZE }}
              >
                {(ITEMS as any)[obj.type].icon((ITEMS as any)[obj.type].color)}
              </div>
            ))}

            <div 
              className="absolute bottom-24 bg-gradient-to-t from-blue-700 to-blue-400 border-2 border-blue-300 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(59,130,246,0.5)]"
              style={{ left: playerX, width: PLAYER_WIDTH, height: 44, transition: 'left 0.05s linear' }}
            >
              <div className="relative z-10 text-[11px] font-black uppercase text-white tracking-widest italic">{nickname}</div>
            </div>
          </>
        )}

        {gameState === GameState.GAMEOVER && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-6 text-center animate-fade-in overflow-y-auto">
            <h2 className="text-2xl font-black text-blue-500 mb-1 italic tracking-tighter uppercase">Mission Complete</h2>
            <div className={`text-5xl font-black mb-5 tabular-nums ${score === 72 ? 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]' : 'text-white'}`}>
              {score} <span className="text-lg text-neutral-500 font-bold italic">pts</span>
            </div>
            
            <div className={`w-full rounded-2xl p-5 mb-4 border shadow-2xl relative overflow-hidden ${score === 72 ? 'bg-yellow-900/20 border-yellow-500/40' : 'bg-neutral-800/40 border-white/10'}`}>
              <div className={`absolute top-0 right-0 p-1.5 text-[10px] font-black uppercase tracking-widest px-3 ${score === 72 ? 'bg-yellow-500 text-black' : 'bg-blue-600 text-white'}`}>
                {score === 72 ? 'Jackpot' : 'Reward'}
              </div>
              <p className="text-[11px] font-black text-neutral-400 uppercase mb-2 tracking-widest italic">훈련 보상</p>
              <p className={`text-lg font-black break-words leading-tight ${score === 72 ? 'text-yellow-400' : 'text-blue-400'}`}>
                {getReward(score)}
              </p>
            </div>

            <div className="bg-neutral-900/60 backdrop-blur-sm w-full rounded-2xl p-5 mb-5 border-l-4 border-blue-500 italic text-[14px] text-left relative min-h-[120px] flex items-center border border-white/5">
               {isLoadingTip ? (
                 <div className="w-full flex flex-col items-center justify-center py-4 gap-2">
                    <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    <span className="text-[11px] font-black text-blue-500 uppercase tracking-widest">분석 중...</span>
                 </div>
               ) : (
                 <p className="text-neutral-200 leading-relaxed font-semibold">"{fitnessTip}"</p>
               )}
               <div className="absolute -top-3 -right-2 bg-blue-600 text-[10px] font-black px-3 py-1.5 rounded-lg shadow-xl uppercase tracking-widest italic border border-blue-400">헬스 성향</div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full mb-4">
               <button onClick={startGame} className="bg-white text-black font-black py-4 rounded-xl text-xs tracking-widest uppercase">Retry</button>
               <button onClick={() => window.open('https://procalofitness.com/', '_blank')} className="bg-blue-600 text-white font-black py-4 rounded-xl text-xs tracking-widest uppercase shadow-lg shadow-blue-900/30">Shop Now</button>
            </div>

            <button 
              onClick={handleShare}
              className="w-full bg-neutral-800/80 text-white font-bold py-4 rounded-xl text-[12px] tracking-widest border border-white/10 mb-4 flex items-center justify-center gap-2"
            >
              📊 결과 공유하기
            </button>

            <button onClick={goHome} className="text-neutral-500 uppercase text-[11px] font-black tracking-widest pb-4">Home</button>
          </div>
        )}
        
        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-black to-transparent flex flex-col items-center justify-center pointer-events-none opacity-60">
          <div className="text-[11px] text-neutral-500 font-black tracking-[0.2em] uppercase italic mb-1">Precision • Power</div>
          <div className="w-1/4 h-0.5 bg-blue-500/20 rounded-full"></div>
        </div>
      </div>

      <p className="mt-6 text-neutral-800 text-[11px] uppercase tracking-[0.4em] font-black italic">
        © 2024 ProCalo Fitness.
      </p>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        input::placeholder { font-weight: 400; font-style: normal; opacity: 0.5; font-size: 14px; }
      `}</style>
    </div>
  );
};

export default App;
