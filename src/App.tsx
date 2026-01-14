import { Component, createSignal, For } from 'solid-js';
import { FadeIn } from './components/ui/FadeIn';
import { ExpandableText } from './components/ui/ExpandableText';
import { FloatingCard } from './components/ui/FloatingCard';
import { GitHubIcon, XLogo, MailIcon, ChatIcon } from './components/ui/Icons';
import { ScrollDarkeningEffect } from './components/animations/ScrollDarkeningEffect';
import { TakoAnimation } from './components/animations/TakoAnimation';
import { AboutSection, SkillsSection, ArticlesSection } from './components/sections/Sections';
import { mutualLinks } from './data/staticData';
import type { TakoInstance } from './types';
import { FiUser, FiCalendar, FiMapPin, FiBookOpen, FiCoffee } from 'solid-icons/fi';
import { HiOutlineAcademicCap } from 'solid-icons/hi';
import { BiRegularBuildingHouse } from 'solid-icons/bi';
import { IoFishOutline } from 'solid-icons/io';

const App: Component = () => {
  // アイコンクリック時のアニメーション状態（トグル）
  const [rotate, setRotate] = createSignal(false);
  const [takoInstances, setTakoInstances] = createSignal<TakoInstance[]>([]);

  const addTako = () => {
    setTakoInstances([...takoInstances(), { id: Date.now() }]);
  };
  return (
    <div class="min-h-screen relative overflow-hidden transition-all duration-700 enhanced-deep-sea-gradient">
      {/* スクロール暗化エフェクト */}
      <ScrollDarkeningEffect />

      {/* 太陽 - 空のセクション用 */}
      <div class="absolute top-[8vh] right-[15vw] w-24 h-24 md:w-32 md:h-32 pointer-events-none z-[3]">
        <div class="relative w-full h-full">
          {/* 太陽の光芒 */}
          <div class="absolute inset-0 bg-gradient-radial from-yellow-200/60 via-orange-300/30 to-transparent rounded-full blur-xl scale-150 animate-pulse"></div>
          {/* 太陽本体 */}
          <div class="absolute inset-0 bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400 rounded-full shadow-lg"
               style="box-shadow: 0 0 60px rgba(255, 200, 50, 0.8), 0 0 120px rgba(255, 150, 50, 0.4);">
          </div>
        </div>
      </div>

      {/* 雲 - 空のセクション用 */}
      <div class="absolute top-[5vh] left-[5vw] pointer-events-none z-[3] opacity-80">
        <div class="w-32 h-12 md:w-48 md:h-16 bg-white/70 rounded-full blur-sm"></div>
        <div class="w-20 h-10 md:w-28 md:h-12 bg-white/60 rounded-full blur-sm -mt-6 ml-8"></div>
      </div>
      <div class="absolute top-[15vh] left-[35vw] pointer-events-none z-[3] opacity-70">
        <div class="w-24 h-10 md:w-36 md:h-14 bg-white/60 rounded-full blur-sm"></div>
        <div class="w-16 h-8 md:w-24 md:h-10 bg-white/50 rounded-full blur-sm -mt-5 ml-6"></div>
      </div>
      <div class="absolute top-[8vh] left-[60vw] pointer-events-none z-[3] opacity-60">
        <div class="w-20 h-8 md:w-32 md:h-12 bg-white/50 rounded-full blur-sm"></div>
      </div>

      {/* 水面の波 - 多層で深みを表現 */}
      <div class="absolute top-[calc(40vh-40px)] left-0 right-0 pointer-events-none z-[2] overflow-hidden h-[100vh]">

        {/* Layer 1: 最奥 - 淡い空色、大きくゆったり */}
        <svg class="wave-1 absolute top-[-5px] left-0 w-[200%] h-[80px]" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path
            fill="rgba(135, 206, 235, 0.6)"
            d="M0,40 C180,60 360,20 540,45 C720,70 900,25 1080,50 C1260,75 1350,30 1440,45 L1440,80 L0,80 Z"
          />
        </svg>

        {/* Layer 2: 後方 - 水色、少し速く */}
        <svg class="wave-2 absolute top-[5px] left-0 w-[200%] h-[70px]" viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path
            fill="rgba(93, 173, 226, 0.7)"
            d="M0,35 C120,55 240,15 360,40 C480,65 600,20 720,45 C840,70 960,25 1080,50 C1200,75 1320,30 1440,55 L1440,70 L0,70 Z"
          />
        </svg>

        {/* Layer 3: 中間 - ターコイズ系、逆方向 */}
        <svg class="wave-3 absolute top-[15px] left-0 w-[200%] h-[60px]" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path
            fill="rgba(41, 128, 185, 0.75)"
            d="M0,30 C144,50 288,10 432,35 C576,60 720,15 864,40 C1008,65 1152,20 1296,45 C1368,55 1404,25 1440,35 L1440,60 L0,60 Z"
          />
        </svg>

        {/* Layer 4: 前方 - 深い青 */}
        <svg class="wave-4 absolute top-[25px] left-0 w-[200%] h-[55px]" viewBox="0 0 1440 55" preserveAspectRatio="none">
          <path
            fill="rgba(26, 82, 118, 0.85)"
            d="M0,28 C180,45 360,10 540,32 C720,55 900,12 1080,35 C1260,58 1350,18 1440,38 L1440,55 L0,55 Z"
          />
        </svg>

        {/* Layer 5: 最前面 - 海の色、下に大きく伸びる */}
        <svg class="wave-5 absolute top-[35px] left-0 w-[200%] h-[calc(100vh-35px)]" viewBox="0 0 1440 1000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#1B6B93;stop-opacity:1" />
              <stop offset="5%" style="stop-color:#1B6B93;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1B6B93;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            d="M0,25 C144,8 288,42 432,20 C576,2 720,40 864,18 C1008,0 1152,38 1296,15 C1368,5 1404,30 1440,20 L1440,1000 L0,1000 Z"
          />
        </svg>

        {/* 水面のきらめき効果 */}
        <div class="absolute top-[10px] left-0 w-[200%] h-[30px] shimmer-layer opacity-30"></div>
      </div>

      {/* 波と背景グラデーションの接続層 - 確実にカバー */}
      <div
        class="absolute left-0 right-0 pointer-events-none z-[1]"
        style="top: calc(140vh - 40px); height: 120vh; background: #1B6B93;"
      ></div>

      <style>{`
        .wave-1 {
          animation: waveFlow 18s ease-in-out infinite;
        }
        .wave-2 {
          animation: waveFlow 14s ease-in-out infinite;
          animation-delay: -2s;
        }
        .wave-3 {
          animation: waveFlowReverse 11s ease-in-out infinite;
        }
        .wave-4 {
          animation: waveFlow 9s ease-in-out infinite;
          animation-delay: -1s;
        }
        .wave-5 {
          animation: waveFlow 7s ease-in-out infinite;
        }

        @keyframes waveFlow {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-25%);
          }
        }

        @keyframes waveFlowReverse {
          0%, 100% {
            transform: translateX(-25%);
          }
          50% {
            transform: translateX(0);
          }
        }

        .shimmer-layer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.4) 15%,
            transparent 30%,
            rgba(255, 255, 255, 0.3) 45%,
            transparent 60%,
            rgba(255, 255, 255, 0.35) 75%,
            transparent 90%
          );
          animation: shimmer 8s linear infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <For each={takoInstances()}>
        {(tako) => <TakoAnimation id={tako.id} onClick={addTako} />}
      </For>

      {/* 深海テーマのたこ追加ボタン */}
      <button
        onClick={addTako}
        class="fixed bottom-4 left-4 z-50 glass-card-dark p-4 rounded-3xl transition-all duration-500 hover:scale-110 hover:rotate-12 text-white overflow-hidden group shadow-2xl hologram-effect card-3d sound-wave-effect"
        title="たこを増やす"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/40 to-blue-500/40 rounded-3xl group-hover:from-cyan-400/50 group-hover:to-blue-400/50 transition-all duration-300 energy-field"></div>
        <div class="absolute inset-0 bg-gradient-to-tr from-cyan-300/20 to-teal-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 quantum-effect"></div>
        <span class="text-2xl relative z-10 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300 neon-glow pulse-wave">🐙+</span>
        <div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 transform -translate-x-full"></div>
      </button>

      {/* 軽量化された装飾（深海セクション用） - 境界線を作らないように調整 */}
      <div class="absolute top-[260vh] left-0 w-full h-[240vh] overflow-hidden pointer-events-none z-1">
        <div class="absolute top-20 -left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div class="absolute top-1/3 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div class="relative z-10 text-white min-h-[500vh] p-8">
        {/* ヘッダーセクション */}
        <FadeIn class="text-center py-16">
          {/* より高度なプロフィール画像 */}
          <div class="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-8">
            
            {/* メインプロフィール */}
            <div
              class={`w-full h-full rounded-full overflow-hidden shadow-2xl transform transition-all duration-700 hover:scale-110 hover:rotate-3 cursor-pointer relative card-3d hologram-effect magnetic-field ${
                rotate() ? "animate-spinOnce" : ""
              }`}
              onClick={() => {
                setRotate(true);
                addTako();
              }}
              onAnimationEnd={() => setRotate(false)}
            >
              <img
                src="./icon.png"
                alt="プロフィールアイコン"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div class="relative">
            <h1 class="text-5xl md:text-7xl font-black mb-6 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-500 to-red-400 relative neon-glow"
                style="animation: titleShimmer 3s ease-in-out infinite">
              たこ
            </h1>
          </div>
          
          <div class="luxury-paragraph-lead text-center mb-8">
            <span class="luxury-mono text-amber-300">IDENTITY:</span>
            <span class="text-white font-bold tracking-wider">Tomiyama Shota</span>
          </div>
        
          {/* 強化されたソーシャルリンク */}
          <div class="flex justify-center mt-10 space-x-6">
            <FloatingCard floatIntensity={0.5}>
            <a href="https://github.com/tako0614" class="group relative transform transition-all duration-500 hover:scale-125 hover:-translate-y-2 sound-wave-effect block">
              <div class="absolute -inset-2 bg-gradient-to-r from-gray-800 to-black rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500 energy-field"></div>
              <div class="relative w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-black backdrop-blur-md border border-white/20 shadow-xl hologram-effect pulse-wave">
                <GitHubIcon class="w-7 h-7 text-2xl text-white filter drop-shadow-lg neon-glow" aria-hidden={false} title="GitHub" />
              </div>
            </a>
            </FloatingCard>
            <FloatingCard floatIntensity={0.6}>
            <a href="https://x.com/takos_jp" class="group relative transform transition-all duration-500 hover:scale-125 hover:-translate-y-2 sound-wave-effect block">
              <div class="absolute -inset-2 bg-gradient-to-r from-gray-800 to-black rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500 energy-field"></div>
              <div class="relative w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-black backdrop-blur-md border border-white/20 shadow-xl hologram-effect pulse-wave">
                <XLogo class="w-7 h-7 text-2xl text-white filter drop-shadow-lg neon-glow" aria-hidden={false} title="X / Twitter" />
              </div>
            </a>
            </FloatingCard>
            <FloatingCard floatIntensity={0.55}>
            <a href="mailto:shoutatomiyama0614@gmail.com" class="group relative transform transition-all duration-500 hover:scale-125 hover:-translate-y-2 sound-wave-effect block">
              <div class="absolute -inset-2 bg-gradient-to-r from-gray-800 to-black rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500 energy-field"></div>
              <div class="relative w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-black backdrop-blur-md border border-white/20 shadow-xl hologram-effect pulse-wave">
                <MailIcon class="w-7 h-7 text-2xl text-white filter drop-shadow-lg neon-glow" aria-hidden={false} title="Email" />
              </div>
            </a>
            </FloatingCard>
          </div>
        </FadeIn>

        <main class="max-w-4xl mx-auto space-y-20">
          {/* About Me - 拡張セクション */}
          <AboutSection />

          {/* Projects - メインセクション */}
          <FadeIn>
            <section>
              <div class="relative mb-12">
                <div class="flex items-center space-x-4">
                  <div>
                    <h2 class="text-5xl font-bold neon-glow">
                      <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-400 to-pink-300">Projects</span>
                    </h2>
                    <p class="text-gray-400 mt-2 text-lg">開発中・公開中のプロダクト</p>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* takos - メインプロジェクト */}
                <FloatingCard class="md:col-span-2" floatIntensity={0.8}>
                <div class={`glass-card-dark p-10 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 relative overflow-hidden group neon-border hologram-effect`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field"></div>
                  <div class="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                    <img src="/icon.png" alt="takos" class="w-24 h-24 rounded-3xl shadow-2xl group-hover:scale-110 transition-transform duration-300" />
                    <div class="flex-1">
                      <div class="flex items-center gap-4 mb-3">
                        <h3 class="text-3xl font-bold neon-glow glitch-effect" data-text="takos">takos</h3>
                        <div class="status-indicator">
                          <span class="text-green-400 text-sm">ACTIVE DEV</span>
                        </div>
                      </div>
                      <p class="text-gray-300 text-lg leading-relaxed luxury-paragraph mb-4">
                        <span class="text-purple-400 font-medium">web自主基盤ソフトウェア</span> - プライバシーを重視した分散型プラットフォーム
                      </p>
                      <a href="https://github.com/tako0614/takos" class="luxury-button inline-block">
                        リポジトリを見る →
                      </a>
                    </div>
                  </div>
                </div>
                </FloatingCard>

                {/* infonode */}
                <FloatingCard floatIntensity={1.2}>
                <div class={`glass-card-dark p-10 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1 relative overflow-hidden group neon-border hologram-effect`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field"></div>
                  <div class="relative z-10">
                    <div class="flex items-center mb-6">
                      <img src="/infonode.svg" alt="infonode" class="w-20 h-20 rounded-2xl mr-5 shadow-xl group-hover:scale-110 transition-transform duration-300" />
                      <div>
                        <h3 class="text-2xl font-bold neon-glow glitch-effect" data-text="infonode">infonode</h3>
                        <div class="status-indicator mt-2">
                          <span class="text-yellow-400">IN DEVELOPMENT</span>
                        </div>
                      </div>
                    </div>
                    <p class="text-gray-300 leading-relaxed luxury-paragraph text-lg">
                      <span class="text-cyan-400 font-medium">graphによる情報整理基盤</span>と<span class="text-blue-400 font-medium">AI agentによる自動化ソフトウェア</span>
                    </p>
                  </div>
                </div>
                </FloatingCard>

                {/* tako music */}
                <FloatingCard floatIntensity={1.0}>
                <div class={`glass-card-dark p-10 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 relative overflow-hidden group neon-border hologram-effect`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field"></div>
                  <div class="relative z-10">
                    <div class="flex items-center mb-6">
                      <div class="w-20 h-20 rounded-2xl mr-5 shadow-xl group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center overflow-hidden">
                        <img src="./tako.png" alt="tako music" class="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 class="text-2xl font-bold neon-glow glitch-effect" data-text="tako music">tako music</h3>
                        <div class="status-indicator mt-2">
                          <span class="text-green-400">RELEASED</span>
                        </div>
                      </div>
                    </div>
                    <p class="text-gray-300 leading-relaxed luxury-paragraph text-lg mb-4">
                      <span class="text-green-400 font-medium">作曲用プログラミング言語</span>
                    </p>
                    <a href="https://music.takos.jp" class="luxury-button inline-block">
                      サイトを見る →
                    </a>
                  </div>
                </div>
                </FloatingCard>

                {/* roadtome */}
                <FloatingCard floatIntensity={1.1}>
                <div class={`glass-card-dark p-10 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1 relative overflow-hidden group neon-border hologram-effect`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field"></div>
                  <div class="relative z-10">
                    <div class="flex items-center mb-6">
                      <div class="w-20 h-20 rounded-2xl mr-5 shadow-xl group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center overflow-hidden">
                        <img src="./tako.png" alt="roadtome" class="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 class="text-2xl font-bold neon-glow glitch-effect" data-text="roadtome">roadtome</h3>
                        <div class="status-indicator mt-2">
                          <span class="text-green-400">RELEASED</span>
                        </div>
                      </div>
                    </div>
                    <p class="text-gray-300 leading-relaxed luxury-paragraph text-lg mb-4">
                      <span class="text-orange-400 font-medium">目標管理・自己成長ツール</span>
                    </p>
                    <a href="https://road.takos.jp" class="luxury-button inline-block">
                      サイトを見る →
                    </a>
                  </div>
                </div>
                </FloatingCard>

                {/* tako card */}
                <FloatingCard floatIntensity={0.9}>
                <div class={`glass-card-dark p-10 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 relative overflow-hidden group neon-border hologram-effect`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field"></div>
                  <div class="relative z-10">
                    <div class="flex items-center mb-6">
                      <div class="w-20 h-20 rounded-2xl mr-5 shadow-xl group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center overflow-hidden">
                        <img src="./tako.png" alt="tako card" class="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 class="text-2xl font-bold neon-glow glitch-effect" data-text="tako card">tako card</h3>
                        <div class="status-indicator mt-2">
                          <span class="text-green-400">RELEASED</span>
                        </div>
                      </div>
                    </div>
                    <p class="text-gray-300 leading-relaxed luxury-paragraph text-lg mb-4">
                      <span class="text-rose-400 font-medium">フラッシュカード学習ツール</span>
                    </p>
                    <a href="https://card.takos.jp" class="luxury-button inline-block">
                      サイトを見る →
                    </a>
                  </div>
                </div>
                </FloatingCard>

                {/* takoscript */}
                <FloatingCard floatIntensity={1.0}>
                <div class={`glass-card-dark p-10 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1 relative overflow-hidden group neon-border hologram-effect`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field"></div>
                  <div class="relative z-10">
                    <div class="flex items-center mb-6">
                      <div class="w-20 h-20 rounded-2xl mr-5 shadow-xl group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center overflow-hidden">
                        <img src="./tako.png" alt="takoscript" class="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 class="text-2xl font-bold neon-glow glitch-effect" data-text="takoscript">takoscript</h3>
                        <div class="status-indicator mt-2">
                          <span class="text-yellow-400">IN DEVELOPMENT</span>
                        </div>
                      </div>
                    </div>
                    <p class="text-gray-300 leading-relaxed luxury-paragraph text-lg mb-4">
                      <span class="text-violet-400 font-medium">JavaScriptをネイティブコードにコンパイルするコンパイラ兼ランタイム</span>
                    </p>
                    <a href="https://github.com/tako0614/takoscript" class="luxury-button inline-block">
                      リポジトリを見る →
                    </a>
                  </div>
                </div>
                </FloatingCard>

                {/* yurucommu */}
                <FloatingCard floatIntensity={1.1}>
                <div class={`glass-card-dark p-10 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 relative overflow-hidden group neon-border hologram-effect`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field"></div>
                  <div class="relative z-10">
                    <div class="flex items-center mb-6">
                      <div class="w-20 h-20 rounded-2xl mr-5 shadow-xl group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center overflow-hidden">
                        <img src="./tako.png" alt="yurucommu" class="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 class="text-2xl font-bold neon-glow glitch-effect" data-text="yurucommu">yurucommu</h3>
                        <div class="status-indicator mt-2">
                          <span class="text-yellow-400">IN DEVELOPMENT</span>
                        </div>
                      </div>
                    </div>
                    <p class="text-gray-300 leading-relaxed luxury-paragraph text-lg mb-4">
                      <span class="text-teal-400 font-medium">分散型SNS</span>
                    </p>
                    <a href="https://github.com/tako0614/yurucommu" class="luxury-button inline-block">
                      リポジトリを見る →
                    </a>
                  </div>
                </div>
                </FloatingCard>
              </div>

              <div class="mt-8">
                <ExpandableText title="プロジェクト開発ポリシー">
                  <p>私のプロジェクト開発において最も重視しているのは、<strong>シンプル</strong>と<strong>機能性</strong>の両立です。多くの現代サービスは便利さとプライバシーを天秤にかけていますが、私は両方を同時に実現できると信じています。</p>

                  <p class="mt-4">また、持続可能な開発のために、コードの品質と再利用性も重視しています。きれいなコード構造と十分なドキュメントは、長期的にプロジェクトを維持するために不可欠だと考えています。</p>

                  <p class="mt-4">プロジェクトのアイデアは日常生活の中での不便さや課題から生まれることが多く、自分自身が本当に必要だと感じるものを作るようにしています。そうすることで、開発のモチベーションを維持できると思っています。</p>
                </ExpandableText>
              </div>
            </section>
          </FadeIn>

          {/* Status */}
          <FadeIn>
            <section>
              <div class="relative mb-12">
                <div class="flex items-center space-x-4">
                  <div>
                    <h2 class="text-4xl font-bold neon-glow">
                      <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">Status</span>
                    </h2>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FloatingCard floatIntensity={1.0}>
                <div class={`group glass-card-dark p-10 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1 relative overflow-hidden hologram-effect card-3d sound-wave-effect`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field"></div>
                  <div class="relative z-10 space-y-6">
                    <div class="flex items-center space-x-4">
                      <FiUser size={24} class="text-purple-400" />
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">名前</h3>
                        <p class="luxury-paragraph text-base">
                          <span class="gradient-text-luxury">冨山 翔太</span> <span class="luxury-mono text-sm">(Tomiyama Shota)</span>
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <FiCalendar size={24} class="text-cyan-400" />
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">年齢</h3>
                        <p class="luxury-paragraph text-base"><span class="text-cyan-400 font-medium">17</span>歳</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <FiMapPin size={24} class="text-green-400" />
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">拠点</h3>
                        <p class="luxury-paragraph text-base">
                          <span class="text-green-400 font-medium">大阪市</span>生野区
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <HiOutlineAcademicCap size={24} class="text-orange-400" />
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">教育機関</h3>
                        <p class="luxury-paragraph text-base">
                          <span class="text-orange-400 font-medium">大阪府立清水谷高等学校</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                </FloatingCard>

                <FloatingCard floatIntensity={1.1}>
                <div class={`group glass-card-dark p-10 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 relative overflow-hidden hologram-effect card-3d sound-wave-effect`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field"></div>
                  <div class="relative z-10 space-y-6">
                    <div class="flex items-center space-x-4">
                      <IoFishOutline size={24} class="text-yellow-400" />
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">料理の嗜好</h3>
                        <p class="luxury-paragraph text-base">
                          <span class="text-yellow-400 font-medium">寿司</span>
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <FiBookOpen size={24} class="text-pink-400" />
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">愛読作品</h3>
                        <p class="luxury-paragraph text-base">
                          <span class="gradient-text-luxury">お兄ちゃんはおしまい！</span>
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <FiCoffee size={24} class="text-cyan-400" />
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">愛飲品</h3>
                        <p class="luxury-paragraph text-base">
                          <span class="text-cyan-400 font-medium">サイダー</span>, <span class="text-blue-400 font-medium">コーラ</span>, <span class="text-amber-400 font-medium">コーヒー</span>
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <BiRegularBuildingHouse size={24} class="text-indigo-400" />
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">政治的指向</h3>
                        <p class="luxury-paragraph text-base">
                          <span class="text-indigo-400 font-medium">日本維新の会</span>, <span class="text-blue-400 font-medium">自由民主党</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                </FloatingCard>
              </div>

              {/* 日常生活の節を追加 */}
              <div class="mt-8">
                <ExpandableText title="私の日常" initiallyExpanded={true}>
                  <div class="luxury-paragraph space-y-4">
                    普段は高校生活を送りながら、自身のプロダクト開発に励んでいます。学校終わってからすべての時間を開発に費やしています。
                    また、土日や放課後はバイトがある日はバイトをしてバイト終わったらすぐに開発に戻ります。そのバイト代はAIのサブスクに全部注ぎ込んでいます。
                    睡眠時間と学校とコーディングは両立できるわけもなく、睡眠時間は平均4〜5時間程度です。助けてください。
                  </div>
                </ExpandableText>
              </div>
            </section>
          </FadeIn>

          {/* Timeline - 新セクション */}

          {/* Skills */}
          <SkillsSection />

          {/* Articles - Zenn記事 */}
          <ArticlesSection />

          {/* Mutual Links */}
          <FadeIn>
            <section>
              <div class="relative mb-12">
                <div class="flex items-center space-x-4">
                  <div>
                    <h2 class="text-4xl font-bold neon-glow">
                      <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300">相互リンク</span>
                    </h2>
                  </div>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <For each={mutualLinks}>
                  {(link, index) => (
                    <FloatingCard floatIntensity={0.9 + (index() % 3) * 0.15}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class={`block glass-card-dark p-6 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 group relative overflow-hidden`}
                    >
                      <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div class="relative z-10">
                        <div class="aspect-[2/1] mb-4 rounded-2xl overflow-hidden bg-gray-200/10">
                          <img
                            src={link.banner}
                            alt={`${link.name}のバナー`}
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <h3 class="font-bold text-lg mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                          {link.name}
                        </h3>
                        <p class={`text-sm text-gray-300 line-clamp-2 mb-4`}>
                          {link.description}
                        </p>
                        <div class="flex items-center text-sm text-blue-400 font-semibold">
                          <span>サイトを見る</span>
                          <span class="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </a>
                    </FloatingCard>
                  )}
                </For>
              </div>
              
              <div class="mt-8">
                <ExpandableText title="相互リンクについて">
                  <p>同じ志を持つ開発者やクリエイターとの繋がりを大切にしています。相互リンクを通じて、お互いのプロジェクトを支援し合い、コミュニティ全体の発展に貢献できればと思います。</p>
                  
                  <p class="mt-4">相互リンクをご希望の方は、Contactセクションからお気軽にご連絡ください。技術系サイト、個人ブログ、プロジェクトサイトなど幅広く受け付けています。</p>
                  
                  <p class="mt-4">リンクの条件：オリジナルコンテンツがある、定期的に更新されている、技術やクリエイティブな内容を扱っているサイトを優先的に掲載させていただいています。</p>
                </ExpandableText>
              </div>
            </section>
          </FadeIn>

          {/* Contact */}
          <FadeIn>
            <section class="text-center">
              <div class="relative mb-12 flex justify-center">
                <div class="flex items-center space-x-4">
                  <div>
                    <h2 class="text-4xl font-bold neon-glow">
                      <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-300">Contact</span>
                    </h2>
                  </div>
                </div>
              </div>
              
              <p class={`max-w-lg mx-auto mb-6 md:mb-8 text-sm md:text-base text-gray-300 px-4`}>
                プロジェクトの共同開発や技術的な質問など、お気軽にご連絡ください。通常48時間以内に返信します。
              </p>
              
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-4xl mx-auto px-4">
                <FloatingCard floatIntensity={0.6}>
                <a
                  href="https://line.me/ti/g2/Q0c8YJlkh5f_hkDuODxp39XF9A7BOCFqezaAHA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
                  class="group glass-card-dark p-4 md:px-6 md:py-5 rounded-xl md:rounded-2xl transition-all duration-500 flex flex-col md:flex-row items-center hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mb-2 md:mb-0 md:mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <ChatIcon class="text-lg md:text-2xl w-6 h-6" aria-hidden={false} title="OpenChat" />
                  </div>
                  <span class="font-semibold text-xs md:text-base relative z-10 text-center md:text-left">OpenChat</span>
                </a>
                </FloatingCard>

                <FloatingCard floatIntensity={0.7}>
                <a
                  href="https://github.com/tako0614"
                  class="group glass-card-dark p-4 md:px-6 md:py-5 rounded-xl md:rounded-2xl transition-all duration-500 flex flex-col md:flex-row items-center hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-700/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mb-2 md:mb-0 md:mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <GitHubIcon class="text-lg md:text-2xl w-6 h-6" aria-hidden={false} title="GitHub" />
                  </div>
                  <span class="font-semibold text-xs md:text-base relative z-10 text-center md:text-left">GitHub</span>
                </a>
                </FloatingCard>

                <FloatingCard floatIntensity={0.65}>
                <a
                  href="https://x.com/takos_jp"
                  class="group glass-card-dark p-4 md:px-6 md:py-5 rounded-xl md:rounded-2xl transition-all duration-500 flex flex-col md:flex-row items-center hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-2 md:mb-0 md:mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <XLogo class="text-lg md:text-2xl w-6 h-6" aria-hidden={false} title="X / Twitter" />
                  </div>
                  <span class="font-semibold text-xs md:text-base relative z-10 text-center md:text-left">Twitter・X</span>
                </a>
                </FloatingCard>

                <FloatingCard floatIntensity={0.75}>
                <a
                  href="mailto:shoutatomiyama0614@gmail.com"
                  class="group glass-card-dark p-4 md:px-6 md:py-5 rounded-xl md:rounded-2xl transition-all duration-500 flex flex-col md:flex-row items-center hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mb-2 md:mb-0 md:mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <MailIcon class="text-lg md:text-2xl w-6 h-6" aria-hidden={false} title="Email" />
                  </div>
                  <span class="font-semibold text-xs md:text-base relative z-10 text-center md:text-left">Email</span>
                </a>
                </FloatingCard>
              </div>
            </section>
          </FadeIn>
        </main>

        {/* フッター */}
        <FadeIn>
          <footer class="text-center text-gray-600 mt-20 border-t pt-8 border-gray-600">
            <div class="max-w-4xl mx-auto">
              <p class="text-sm mb-4">
                このサイトはSolidJS & Tailwind CSSで構築され、Cloudflare Pagesでホスティングされています。
                ソースコードは<a href="https://github.com/tako0614/info.takos.jp" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>で公開しています。
              </p>
              <p>© 2025 Tomiyama Shota. All rights reserved.</p>
            </div>
          </footer>
        </FadeIn>
      </div>
    </div>
  );
};

export default App;
