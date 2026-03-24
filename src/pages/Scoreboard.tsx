import {
  Undo2,
  Plus,
  Bomb,
  Crown,
  Trophy,
  PartyPopper,
  Palette,
} from "lucide-react";
import { useState } from "react";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";

const SCORE_SEQUENCE = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A1",
  "A2",
  "A3",
];
const A1_IDX = 12;
const A3_IDX = 14;

type TeamColor = {
  id: string;
  name: string;
  bg: string;
  border: string;
  text: string;
  light: string;
  dark: string;
  darkBold: string;
  buttonBg: string;
  buttonText: string;
  buttonHover: string;
  activeRing: string;
  drop: string;
  dropIcon: string;
  highlight: string;
  separator: string;
};

const PALETTE: TeamColor[] = [
  {
    id: "c1",
    name: "粉队",
    bg: "bg-[#ec4899]",
    border: "border-white/20",
    text: "text-[#db2777]",
    light: "bg-black/20",
    dark: "text-white/80",
    darkBold: "text-white",
    buttonBg: "bg-white/25",
    buttonText: "text-white",
    buttonHover: "hover:bg-white/40",
    activeRing: "ring-white/50",
    drop: "text-[#db2777]",
    dropIcon: "text-white/80 hover:text-white",
    highlight: "bg-white/10",
    separator: "bg-white/30",
  },
  {
    id: "c2",
    name: "红队",
    bg: "bg-[#de324c]",
    border: "border-white/20",
    text: "text-[#be123c]",
    light: "bg-black/20",
    dark: "text-white/80",
    darkBold: "text-white",
    buttonBg: "bg-white/25",
    buttonText: "text-white",
    buttonHover: "hover:bg-white/40",
    activeRing: "ring-white/50",
    drop: "text-[#be123c]",
    dropIcon: "text-white/80 hover:text-white",
    highlight: "bg-white/10",
    separator: "bg-white/30",
  },
  {
    id: "c3",
    name: "橘队",
    bg: "bg-[#fb923c]",
    border: "border-white/20",
    text: "text-[#c2410c]",
    light: "bg-black/20",
    dark: "text-white/80",
    darkBold: "text-white",
    buttonBg: "bg-white/25",
    buttonText: "text-white",
    buttonHover: "hover:bg-white/40",
    activeRing: "ring-white/50",
    drop: "text-[#c2410c]",
    dropIcon: "text-white/80 hover:text-white",
    highlight: "bg-white/10",
    separator: "bg-white/30",
  },
  {
    id: "c4",
    name: "黄队",
    bg: "bg-[#f8e16f]",
    border: "border-black/10",
    text: "text-[#a16207]",
    light: "bg-black/10",
    dark: "text-black/60",
    darkBold: "text-[#85650d]",
    buttonBg: "bg-black/10",
    buttonText: "text-black/80",
    buttonHover: "hover:bg-black/20",
    activeRing: "ring-black/20",
    drop: "text-[#a16207]",
    dropIcon: "text-black/50 hover:text-black",
    highlight: "bg-black/5",
    separator: "bg-black/20",
  },
  {
    id: "c5",
    name: "绿队",
    bg: "bg-[#4ade80]",
    border: "border-black/10",
    text: "text-[#15803d]",
    light: "bg-black/10",
    dark: "text-black/60",
    darkBold: "text-[#14532d]",
    buttonBg: "bg-black/10",
    buttonText: "text-black/80",
    buttonHover: "hover:bg-black/20",
    activeRing: "ring-black/20",
    drop: "text-[#15803d]",
    dropIcon: "text-black/50 hover:text-black",
    highlight: "bg-black/5",
    separator: "bg-black/20",
  },
  {
    id: "c6",
    name: "蓝队",
    bg: "bg-[#369acc]",
    border: "border-white/20",
    text: "text-[#0369a1]",
    light: "bg-black/20",
    dark: "text-white/80",
    darkBold: "text-white",
    buttonBg: "bg-white/25",
    buttonText: "text-white",
    buttonHover: "hover:bg-white/40",
    activeRing: "ring-white/50",
    drop: "text-[#0369a1]",
    dropIcon: "text-white/80 hover:text-white",
    highlight: "bg-white/10",
    separator: "bg-white/30",
  },
  {
    id: "c7",
    name: "紫队",
    bg: "bg-[#a78bfa]",
    border: "border-white/20",
    text: "text-[#6d28d9]",
    light: "bg-black/20",
    dark: "text-white/80",
    darkBold: "text-white",
    buttonBg: "bg-white/25",
    buttonText: "text-white",
    buttonHover: "hover:bg-white/40",
    activeRing: "ring-white/50",
    drop: "text-[#6d28d9]",
    dropIcon: "text-white/80 hover:text-white",
    highlight: "bg-white/10",
    separator: "bg-white/30",
  },
  {
    id: "c8",
    name: "灰队",
    bg: "bg-[#bebebe]",
    border: "border-black/10",
    text: "text-[#52525b]",
    light: "bg-black/10",
    dark: "text-black/60",
    darkBold: "text-[#52525b]",
    buttonBg: "bg-black/10",
    buttonText: "text-black/80",
    buttonHover: "hover:bg-black/20",
    activeRing: "ring-black/20",
    drop: "text-[#52525b]",
    dropIcon: "text-black/50 hover:text-black",
    highlight: "bg-black/5",
    separator: "bg-black/20",
  },
];

export default function Scoreboard() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [explodeDialogOpen, setExplodeDialogOpen] = useState(false);
  const [explodingTeam, setExplodingTeam] = useState<1 | 2 | null>(null);

  const [winDialogOpen, setWinDialogOpen] = useState(false);
  const [winningTeam, setWinningTeam] = useState<1 | 2 | null>(null);

  const [team1ScoreIdx, setTeam1ScoreIdx] = useState(0);
  const [team1History, setTeam1History] = useState<number[]>([]);
  const [team1ColorIdx, setTeam1ColorIdx] = useState(0);

  const [team2ScoreIdx, setTeam2ScoreIdx] = useState(0);
  const [team2History, setTeam2History] = useState<number[]>([]);
  const [team2ColorIdx, setTeam2ColorIdx] = useState(1);

  const [leadingTeam, setLeadingTeam] = useState<1 | 2 | null>(null);

  const t1 = PALETTE[team1ColorIdx];
  const t2 = PALETTE[team2ColorIdx];

  const cycleColor = (team: 1 | 2) => {
    if (team === 1) {
      setTeam1ColorIdx((prev) => {
        let next = (prev + 1) % PALETTE.length;
        if (next === team2ColorIdx) next = (next + 1) % PALETTE.length;
        return next;
      });
    } else {
      setTeam2ColorIdx((prev) => {
        let next = (prev + 1) % PALETTE.length;
        if (next === team1ColorIdx) next = (next + 1) % PALETTE.length;
        return next;
      });
    }
  };

  const incrementScore = (team: 1 | 2, amount: number) => {
    setLeadingTeam(team);
    if (team === 1) {
      setTeam1History((prev) => [...prev, team1ScoreIdx]);
      let nextIdx = team1ScoreIdx + amount;
      if (team1ScoreIdx < A1_IDX && nextIdx > A1_IDX) {
        nextIdx = A1_IDX;
      }
      setTeam1ScoreIdx(Math.min(SCORE_SEQUENCE.length - 1, nextIdx));
    } else {
      setTeam2History((prev) => [...prev, team2ScoreIdx]);
      let nextIdx = team2ScoreIdx + amount;
      if (team2ScoreIdx < A1_IDX && nextIdx > A1_IDX) {
        nextIdx = A1_IDX;
      }
      setTeam2ScoreIdx(Math.min(SCORE_SEQUENCE.length - 1, nextIdx));
    }
  };

  const triggerExplode = (team: 1 | 2) => {
    setExplodingTeam(team);
    setExplodeDialogOpen(true);
  };

  const triggerWin = (team: 1 | 2) => {
    setWinningTeam(team);
    setWinDialogOpen(true);
  };

  const undoScore = (team: 1 | 2) => {
    if (team === 1 && team1History.length > 0) {
      const newHistory = [...team1History];
      const prevScore = newHistory.pop()!;
      setTeam1History(newHistory);
      setTeam1ScoreIdx(prevScore);
    } else if (team === 2 && team2History.length > 0) {
      const newHistory = [...team2History];
      const prevScore = newHistory.pop()!;
      setTeam2History(newHistory);
      setTeam2ScoreIdx(prevScore);
    }
  };

  const resetGame = () => {
    setTeam1ScoreIdx(0);
    setTeam1History([]);
    setTeam2ScoreIdx(0);
    setTeam2History([]);
    setDialogOpen(false);
    setExplodeDialogOpen(false);
    setExplodingTeam(null);
    setWinDialogOpen(false);
    setWinningTeam(null);
    setLeadingTeam(null);
  };

  const resetFailedTeam = (keepLeader: boolean) => {
    if (explodingTeam === 1) {
      setTeam1ScoreIdx(0);
      setTeam1History([]);
      if (!keepLeader) setLeadingTeam(2);
    } else if (explodingTeam === 2) {
      setTeam2ScoreIdx(0);
      setTeam2History([]);
      if (!keepLeader) setLeadingTeam(1);
    }
    setExplodeDialogOpen(false);
    setExplodingTeam(null);
  };

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-6 max-w-[120rem] h-[100dvh] w-full flex flex-col overflow-hidden">
      <div className="flex flex-row items-center justify-between mb-2 sm:mb-4 shrink-0 gap-2">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-indigo-900 truncate">
              掼蛋计分板
            </h1>
            <span className="text-xs text-indigo-400 font-bold uppercase tracking-widest hidden sm:inline-block">
              by David Jin
            </span>
          </div>
          <p className="text-indigo-700/80 text-[10px] sm:text-sm font-medium truncate mt-0.5 sm:mt-1">
            记录每局的得分进阶。
            <span className="sm:hidden ml-1 opacity-70">by David Jin</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDialogOpen(true)}
          className="bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95 shrink-0 text-sm sm:text-base"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 font-bold" />
          <span>新游戏</span>
        </button>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 landscape:grid-cols-2 gap-2 sm:gap-4 pb-1">
        {/* Team 1 */}
        <div
          className={`group relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border-[3px] sm:border-[4px] ${t1.border} ${t1.bg} ${t1.text} shadow-sm transition-all flex flex-col min-h-0`}
        >
          <div className="p-3 sm:p-4 lg:p-6 flex-1 flex flex-col min-h-0">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-2 gap-2 shrink-0">
              <div className="flex items-center gap-1 sm:gap-2">
                <h3
                  className={`font-extrabold text-lg sm:text-2xl lg:text-3xl min-w-[3rem] ${t1.darkBold}`}
                >
                  {t1.name}
                </h3>
                <button
                  type="button"
                  onClick={() => cycleColor(1)}
                  className={`transition-all ${t1.dropIcon} active:scale-95`}
                  title="切换颜色"
                >
                  <Palette className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setLeadingTeam(1)}
                  className={`transition-all ${leadingTeam === 1 ? "text-yellow-500 scale-110 drop-shadow-md" : `${t1.dropIcon} opacity-60 hover:opacity-100`} active:scale-95`}
                  title="设为庄家 (领牌队)"
                >
                  <Crown
                    className={`w-5 h-5 sm:w-6 sm:h-7 lg:w-9 lg:h-9 ${leadingTeam === 1 ? "fill-yellow-500" : ""}`}
                  />
                </button>
              </div>
              <div className="flex flex-wrap items-center xl:justify-end gap-1 sm:gap-2 mt-1 xl:mt-0">
                <button
                  type="button"
                  onClick={() => undoScore(1)}
                  disabled={team1History.length === 0}
                  className={`flex h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 items-center justify-center rounded-xl sm:rounded-2xl ${t1.light} ${t1.dark} disabled:opacity-50 transition-all active:scale-95 shrink-0`}
                  title="撤销"
                >
                  <Undo2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </button>
                <div
                  className={`h-6 sm:h-8 w-[2px] sm:w-[3px] ${t1.separator} mx-0.5 sm:mx-1 rounded-full`}
                ></div>

                {team1ScoreIdx >= A1_IDX && (
                  <button
                    type="button"
                    onClick={() => triggerWin(1)}
                    className="flex h-8 sm:h-10 lg:h-12 px-2 sm:px-3 lg:px-4 items-center justify-center gap-1 rounded-xl sm:rounded-2xl bg-yellow-500 text-white hover:bg-yellow-600 transition-all shadow-md active:scale-95 font-bold text-xs sm:text-sm lg:text-lg animate-pulse ring-2 sm:ring-4 ring-yellow-500/30 shrink-0"
                    title="宣告胜利并重置"
                  >
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />{" "}
                    <span className="hidden sm:inline lg:inline">胜利</span>
                  </button>
                )}

                {team1ScoreIdx === A3_IDX ? (
                  <button
                    type="button"
                    onClick={() => triggerExplode(1)}
                    className="flex h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-red-500 text-white hover:bg-red-600 transition-all shadow-md active:scale-95 animate-pulse ring-2 sm:ring-4 ring-red-500/30 shrink-0"
                    title="爆炸并重置游戏"
                  >
                    <Bomb className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => incrementScore(1, 1)}
                      className={`flex h-8 sm:h-10 lg:h-12 px-2.5 sm:px-4 lg:px-5 items-center justify-center rounded-xl sm:rounded-2xl ${t1.buttonBg} ${t1.buttonText} ${t1.buttonHover} transition-all shadow-md active:scale-95 font-bold text-sm sm:text-lg lg:text-xl shrink-0`}
                      title="加1级"
                    >
                      +1
                    </button>
                    {team1ScoreIdx < A1_IDX && (
                      <>
                        <button
                          type="button"
                          onClick={() => incrementScore(1, 2)}
                          className={`flex h-8 sm:h-10 lg:h-12 px-2.5 sm:px-4 lg:px-5 items-center justify-center rounded-xl sm:rounded-2xl ${t1.buttonBg} ${t1.buttonText} ${t1.buttonHover} transition-all shadow-md active:scale-95 font-bold text-sm sm:text-lg lg:text-xl shrink-0`}
                          title="加2级"
                        >
                          +2
                        </button>
                        <button
                          type="button"
                          onClick={() => incrementScore(1, 3)}
                          className={`flex h-8 sm:h-10 lg:h-12 px-2.5 sm:px-4 lg:px-5 items-center justify-center rounded-xl sm:rounded-2xl ${t1.buttonBg} ${t1.buttonText} ${t1.buttonHover} transition-all shadow-md active:scale-95 font-bold text-sm sm:text-lg lg:text-xl shrink-0`}
                          title="加3级"
                        >
                          +3
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

            <div
              className={`mt-1 sm:mt-2 flex-1 flex flex-col items-center justify-center min-h-[0] bg-white/60 rounded-xl sm:rounded-2xl shadow-inner border border-white/40 relative overflow-hidden p-2`}
            >
              {team1ScoreIdx === A3_IDX && (
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 text-red-500 animate-bounce">
                  <Bomb className="w-6 h-6 sm:w-8 sm:h-8 opacity-50" />
                </div>
              )}
              <div className="flex-1 w-full flex items-center justify-center min-h-0">
                <span
                  className={`text-[12vh] landscape:text-[25vh] lg:text-[15rem] leading-[0.8] font-black tracking-tighter ${t1.drop} drop-shadow-sm flex items-center justify-center`}
                >
                  {SCORE_SEQUENCE[team1ScoreIdx]}
                </span>
              </div>
            </div>
          </div>

          <div className={`h-2 sm:h-3 lg:h-4 w-full ${t1.light} shrink-0`}>
            <div
              className={`h-full transition-all duration-500 ease-out ${team1ScoreIdx === A3_IDX ? "bg-red-500" : t1.buttonBg}`}
              style={{
                width: `${(team1ScoreIdx / (SCORE_SEQUENCE.length - 1)) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Team 2 */}
        <div
          className={`group relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border-[3px] sm:border-[4px] ${t2.border} ${t2.bg} ${t2.text} shadow-sm transition-all flex flex-col min-h-0`}
        >
          <div className="p-3 sm:p-4 lg:p-6 flex-1 flex flex-col min-h-0">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-2 gap-2 shrink-0">
              <div className="flex items-center gap-1 sm:gap-2">
                <h3
                  className={`font-extrabold text-lg sm:text-2xl lg:text-3xl min-w-[3rem] ${t2.darkBold}`}
                >
                  {t2.name}
                </h3>
                <button
                  type="button"
                  onClick={() => cycleColor(2)}
                  className={`transition-all ${t2.dropIcon} active:scale-95`}
                  title="切换颜色"
                >
                  <Palette className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setLeadingTeam(2)}
                  className={`transition-all ${leadingTeam === 2 ? "text-yellow-500 scale-110 drop-shadow-md" : `${t2.dropIcon} opacity-60 hover:opacity-100`} active:scale-95`}
                  title="设为庄家 (领牌队)"
                >
                  <Crown
                    className={`w-5 h-5 sm:w-6 sm:h-7 lg:w-9 lg:h-9 ${leadingTeam === 2 ? "fill-yellow-500" : ""}`}
                  />
                </button>
              </div>
              <div className="flex flex-wrap items-center xl:justify-end gap-1 sm:gap-2 mt-1 xl:mt-0">
                <button
                  type="button"
                  onClick={() => undoScore(2)}
                  disabled={team2History.length === 0}
                  className={`flex h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 items-center justify-center rounded-xl sm:rounded-2xl ${t2.light} ${t2.dark} disabled:opacity-50 transition-all active:scale-95 shrink-0`}
                  title="撤销"
                >
                  <Undo2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </button>
                <div
                  className={`h-6 sm:h-8 w-[2px] sm:w-[3px] ${t2.separator} mx-0.5 sm:mx-1 rounded-full`}
                ></div>

                {team2ScoreIdx >= A1_IDX && (
                  <button
                    type="button"
                    onClick={() => triggerWin(2)}
                    className="flex h-8 sm:h-10 lg:h-12 px-2 sm:px-3 lg:px-4 items-center justify-center gap-1 rounded-xl sm:rounded-2xl bg-yellow-500 text-white hover:bg-yellow-600 transition-all shadow-md active:scale-95 font-bold text-xs sm:text-sm lg:text-lg animate-pulse ring-2 sm:ring-4 ring-yellow-500/30 shrink-0"
                    title="宣告胜利并重置"
                  >
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />{" "}
                    <span className="hidden sm:inline lg:inline">胜利</span>
                  </button>
                )}

                {team2ScoreIdx === A3_IDX ? (
                  <button
                    type="button"
                    onClick={() => triggerExplode(2)}
                    className="flex h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-red-500 text-white hover:bg-red-600 transition-all shadow-md active:scale-95 animate-pulse ring-2 sm:ring-4 ring-red-500/30 shrink-0"
                    title="爆炸并重置游戏"
                  >
                    <Bomb className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => incrementScore(2, 1)}
                      className={`flex h-8 sm:h-10 lg:h-12 px-2.5 sm:px-4 lg:px-5 items-center justify-center rounded-xl sm:rounded-2xl ${t2.buttonBg} ${t2.buttonText} ${t2.buttonHover} transition-all shadow-md active:scale-95 font-bold text-sm sm:text-lg lg:text-xl shrink-0`}
                      title="加1级"
                    >
                      +1
                    </button>
                    {team2ScoreIdx < A1_IDX && (
                      <>
                        <button
                          type="button"
                          onClick={() => incrementScore(2, 2)}
                          className={`flex h-8 sm:h-10 lg:h-12 px-2.5 sm:px-4 lg:px-5 items-center justify-center rounded-xl sm:rounded-2xl ${t2.buttonBg} ${t2.buttonText} ${t2.buttonHover} transition-all shadow-md active:scale-95 font-bold text-sm sm:text-lg lg:text-xl shrink-0`}
                          title="加2级"
                        >
                          +2
                        </button>
                        <button
                          type="button"
                          onClick={() => incrementScore(2, 3)}
                          className={`flex h-8 sm:h-10 lg:h-12 px-2.5 sm:px-4 lg:px-5 items-center justify-center rounded-xl sm:rounded-2xl ${t2.buttonBg} ${t2.buttonText} ${t2.buttonHover} transition-all shadow-md active:scale-95 font-bold text-sm sm:text-lg lg:text-xl shrink-0`}
                          title="加3级"
                        >
                          +3
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

            <div
              className={`mt-1 sm:mt-2 flex-1 flex flex-col items-center justify-center min-h-[0] bg-white/60 rounded-xl sm:rounded-2xl shadow-inner border border-white/40 relative overflow-hidden p-2`}
            >
              {team2ScoreIdx === A3_IDX && (
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 text-red-500 animate-bounce">
                  <Bomb className="w-6 h-6 sm:w-8 sm:h-8 opacity-50" />
                </div>
              )}
              <div className="flex-1 w-full flex items-center justify-center min-h-0">
                <span
                  className={`text-[12vh] landscape:text-[25vh] lg:text-[15rem] leading-[0.8] font-black tracking-tighter ${t2.drop} drop-shadow-sm flex items-center justify-center`}
                >
                  {SCORE_SEQUENCE[team2ScoreIdx]}
                </span>
              </div>
            </div>
          </div>

          <div className={`h-2 sm:h-3 lg:h-4 w-full ${t2.light} shrink-0`}>
            <div
              className={`h-full transition-all duration-500 ease-out ${team2ScoreIdx === A3_IDX ? "bg-red-500" : t2.buttonBg}`}
              style={{
                width: `${(team2ScoreIdx / (SCORE_SEQUENCE.length - 1)) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <ResponsiveDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="重置游戏"
        description="确定要重置分数以开始新的一局吗？"
      >
        <div className="space-y-4">
          <button
            type="button"
            onClick={resetGame}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white min-h-[50px] rounded-xl font-bold text-lg transition-colors shadow-sm"
          >
            是的，重置分数
          </button>
          <button
            type="button"
            onClick={() => setDialogOpen(false)}
            className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-900 min-h-[50px] rounded-xl font-bold text-lg transition-colors border-2 border-indigo-200"
          >
            取消
          </button>
        </div>
      </ResponsiveDialog>

      <ResponsiveDialog
        open={winDialogOpen}
        onOpenChange={setWinDialogOpen}
        title="🎉 游戏胜利 🎉"
        description={`恭喜 ${winningTeam === 1 ? t1.name : t2.name} 成功通关并获得完全胜利！`}
      >
        <div className="space-y-4 pt-4">
          <div className="flex justify-center py-6 gap-2 text-yellow-500 animate-bounce">
            <PartyPopper className="w-16 h-16" />
            <Trophy className="w-20 h-20" />
            <PartyPopper className="w-16 h-16 scale-x-[-1]" />
          </div>
          <div className="bg-yellow-50 border-2 border-yellow-200 text-yellow-800 p-4 rounded-xl text-center font-bold mb-4">
            {winningTeam === 1 ? t1.name : t2.name} 是最终的冠军！🏆
          </div>
          <button
            type="button"
            onClick={resetGame}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white min-h-[50px] rounded-xl font-bold text-lg transition-colors shadow-sm ring-4 ring-yellow-500/20"
          >
            开启新一局游戏
          </button>
          <button
            type="button"
            onClick={() => setWinDialogOpen(false)}
            className="w-full bg-white hover:bg-gray-50 text-gray-800 min-h-[50px] rounded-xl font-bold text-lg transition-colors border-2 border-gray-200"
          >
            返回计分板
          </button>
        </div>
      </ResponsiveDialog>

      <ResponsiveDialog
        open={explodeDialogOpen}
        onOpenChange={setExplodeDialogOpen}
        title="⚠️ 游戏失败"
        description={`${explodingTeam === 1 ? t1.name : t2.name}未能顺利通过 A3 级别，游戏以失败告终！所有分数将被重置。`}
      >
        <div className="space-y-3 pt-2">
          <div className="flex justify-center py-2 sm:py-4">
            <Bomb className="w-20 h-20 sm:w-24 sm:h-24 text-red-500 animate-bounce" />
          </div>
          <button
            type="button"
            onClick={() => resetFailedTeam(false)}
            className="w-full bg-red-600 hover:bg-red-700 text-white min-h-[44px] sm:min-h-[50px] rounded-xl font-bold text-sm sm:text-lg transition-colors shadow-sm"
          >
            重新开始游戏 (交出庄家)
          </button>
          <button
            type="button"
            onClick={() => resetFailedTeam(true)}
            className="w-full bg-red-50 hover:bg-red-100 text-red-800 border-2 border-red-200 min-h-[44px] sm:min-h-[50px] rounded-xl font-bold text-sm sm:text-lg transition-colors shadow-sm"
          >
            重新开始游戏 (保留庄家)
          </button>
          <button
            type="button"
            onClick={() => setExplodeDialogOpen(false)}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 min-h-[44px] sm:min-h-[50px] rounded-xl font-bold text-sm sm:text-lg transition-colors"
          >
            返回 (暂不重置)
          </button>
        </div>
      </ResponsiveDialog>
    </div>
  );
}
