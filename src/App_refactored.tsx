import { Component, createSignal, For } from 'solid-js';
import { FadeIn } from './components/ui/FadeIn';
import { ExpandableText } from './components/ui/ExpandableText';
import { DeepSeaParticles } from './components/animations/DeepSeaParticles';
import { DeepSeaBackgroundEffect } from './components/animations/DeepSeaBackgroundEffect';
import { TakoAnimation } from './components/animations/TakoAnimation';
import { AnimatedDeepSeaParticles } from './components/animations/AnimatedDeepSeaParticles';
import { InteractiveQA } from './components/InteractiveQA';
import { ARHudOverlay } from './components/ARHudOverlay';
import { AboutSection, SkillsSection, TimelineSection } from './components/sections/Sections';
import { quotes, mutualLinks } from './data/staticData';
import type { TakoInstance } from './types';

const App: Component = () => {
  // アイコンクリック時のアニメーション状態（トグル）
  const [rotate, setRotate] = createSignal(false);
  const [takoInstances, setTakoInstances] = createSignal<TakoInstance[]>([]);

  const addTako = () => {
    setTakoInstances([...takoInstances(), { id: Date.now() }]);
  };

  const [quote, setQuote] = createSignal(quotes[Math.floor(Math.random() * quotes.length)]);

  // quoteクリック時に新しい名言を表示する関数
  const nextQuote = () => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  return (
    <div class="min-h-screen relative overflow-hidden transition-all duration-700 deep-sea-gradient">
      {/* 深海パーティクルエフェクト */}
      <DeepSeaParticles darkMode={true} />
      <DeepSeaBackgroundEffect darkMode={true} />
      {/* 動くパーティクル */}
      <AnimatedDeepSeaParticles />
      
      {/* TakoAnimationコンポーネントを<For>でレンダリング */}
      <For each={takoInstances()}>
        {(tako) => <TakoAnimation id={tako.id} onClick={addTako} />}
      </For>

      {/* AR HUDオーバーレイ */}
      <ARHudOverlay />

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

      {/* 軽量化された背景エフェクト */}
      <div
        class="absolute inset-0 bg-[url('/nya.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"
        aria-hidden="true"
      ></div>
      
      {/* ダークモード専用グラデーションオーバーレイ */}
      <div 
        class="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-transparent"
        aria-hidden="true"
      ></div>
      
      {/* 軽量化された装飾（アニメーション削除） */}
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div class="absolute -top-20 -left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div class="absolute top-1/3 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div class="relative z-10 text-white min-h-screen p-8 backdrop-blur-sm">
        {/* ヘッダーセクション */}
        <FadeIn class="text-center py-16">
          {/* より高度なプロフィール画像 */}
          <div class="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-8">
            {/* 外側のエネルギーリング */}
            <div class="absolute -inset-8 rounded-full border-2 border-purple-500/20 animate-spin-slow"></div>
            <div class="absolute -inset-6 rounded-full border border-cyan-500/30 animate-reverse-spin"></div>
            <div class="absolute -inset-4 rounded-full border border-pink-500/25"></div>
            
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
              style={{
                background: 'conic-gradient(from 0deg, rgba(168, 85, 247, 0.8), rgba(59, 130, 246, 0.8), rgba(236, 72, 153, 0.8), rgba(34, 197, 94, 0.8), rgba(168, 85, 247, 0.8))',
                'box-shadow': '0 0 60px rgba(168, 85, 247, 0.8), 0 0 120px rgba(168, 85, 247, 0.4), inset 0 0 30px rgba(255, 255, 255, 0.2)',
                animation: 'profileGlow 4s ease-in-out infinite alternate, energyPulse 6s ease-in-out infinite'
              }}
            >
              {/* 内側のコンテナ */}
              <div class="absolute inset-2 rounded-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 quantum-effect">
                <img
                  src="./icon.png"
                  alt="プロフィールアイコン"
                  class="w-full h-full object-cover filter brightness-110 contrast-110 saturate-110"
                />
                {/* ホログラム効果オーバーレイ */}
                <div class="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-400/10 to-transparent animate-pulse"></div>
              </div>
              
              {/* 回転するライトリング */}
              <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-spin pulse-wave"></div>
              <div class="absolute inset-1 rounded-full bg-gradient-to-bl from-transparent via-purple-400/20 to-transparent animate-reverse-spin"></div>
              
              {/* 上部インジケーター */}
              <div class="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 rounded-full opacity-80 animate-pulse"></div>
              
              {/* エネルギー球 */}
              <div class="absolute top-4 right-4 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-bounce shadow-lg shadow-cyan-400/50"></div>
              <div class="absolute bottom-4 left-4 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse shadow-lg shadow-pink-400/50"></div>
            </div>
            
            {/* 浮遊パーティクル */}
            <div class="absolute top-0 left-8 w-2 h-2 bg-purple-400 rounded-full animate-float opacity-60"></div>
            <div class="absolute top-8 right-0 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-float opacity-70" style="animation-delay: 1s"></div>
            <div class="absolute bottom-8 left-0 w-1 h-1 bg-pink-400 rounded-full animate-float opacity-50" style="animation-delay: 2s"></div>
            <div class="absolute bottom-0 right-8 w-1.5 h-1.5 bg-green-400 rounded-full animate-float opacity-60" style="animation-delay: 0.5s"></div>
          </div>
          
          <div class="relative">
            <h1 class="text-5xl md:text-7xl font-black mb-6 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 relative neon-glow"
                style="animation: titleShimmer 3s ease-in-out infinite">
              たこ
            </h1>
          </div>
          
          <div class="luxury-paragraph-lead text-center mb-8">
            <span class="luxury-mono text-cyan-400">IDENTITY:</span> 
            <span class="gradient-text-luxury luxury-text-title">Tomiyama Shota</span>
          </div>
          
          <div class="text-center mb-6">
            <p class="luxury-paragraph text-lg">
              <span class="text-purple-400 font-medium">次世代デジタル・アーキテクト</span> × <span class="text-cyan-400 font-medium">革新的テクノロジスト</span>
            </p>
            <p class="luxury-caption mt-2">
              DEVELOPING THE FUTURE • CREATING TOMORROW
            </p>
          </div>

          {/* 強化されたクォートセクション */}
          <div 
            class="mt-8 p-8 rounded-3xl glass-effect-dark cursor-pointer transition-all duration-700 hover:scale-105 hover:-translate-y-2 max-w-lg mx-auto relative overflow-hidden group hologram-effect card-3d sound-wave-effect"
            onClick={nextQuote}
          >
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-cyan-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field"></div>
            <div class="absolute inset-0 animate-pulse quantum-effect">
              <div class="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl"></div>
            </div>
            <div class="relative z-10">
              <div class="text-4xl text-purple-400 mb-3 text-center neon-glow pulse-wave">"</div>
              <p class="text-lg font-medium text-gray-200 text-center leading-relaxed mb-4 typing-effect">
                {quote()}
              </p>
              <div class="text-4xl text-purple-400 text-center rotate-180 neon-glow pulse-wave">"</div>
              <div class="flex items-center justify-center mt-4 space-x-2">
                <div class="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse energy-field"></div>
                <p class="text-sm text-gray-400 font-light neon-glow">
                  クリックで名言を変更
                </p>
                <div class="w-2 h-2 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full animate-pulse energy-field" style="animation-delay: 0.5s"></div>
              </div>
            </div>
          </div>
          
          {/* 強化されたソーシャルリンク */}
          <div class="flex justify-center mt-10 space-x-6">
            <a href="https://github.com/tako0614" class="group relative transform transition-all duration-500 hover:scale-125 hover:-translate-y-2 sound-wave-effect">
              <div class="absolute -inset-2 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500 energy-field"></div>
              <div class="relative w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 backdrop-blur-md border border-white/20 shadow-xl hologram-effect pulse-wave">
                <span class="text-2xl filter drop-shadow-lg neon-glow">📂</span>
              </div>
            </a>
            <a href="https://x.com/takoserver_com" class="group relative transform transition-all duration-500 hover:scale-125 hover:-translate-y-2 sound-wave-effect">
              <div class="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500 energy-field"></div>
              <div class="relative w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500 backdrop-blur-md border border-white/20 shadow-xl hologram-effect pulse-wave">
                <span class="text-2xl filter drop-shadow-lg neon-glow">🐦</span>
              </div>
            </a>
            <a href="mailto:contact@tako.example.com" class="group relative transform transition-all duration-500 hover:scale-125 hover:-translate-y-2 sound-wave-effect">
              <div class="absolute -inset-2 bg-gradient-to-r from-red-600 to-pink-600 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500 energy-field"></div>
              <div class="relative w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-500 backdrop-blur-md border border-white/20 shadow-xl hologram-effect pulse-wave">
                <span class="text-2xl filter drop-shadow-lg neon-glow">✉️</span>
              </div>
            </a>
          </div>
        </FadeIn>

        {/* インタラクティブな質問選択機能 - モバイル専用セクション */}
        <FadeIn>
          <section class="max-w-6xl mx-auto mb-16 lg:hidden px-4">
            <div class="glass-card-dark p-4 md:p-6 rounded-2xl md:rounded-3xl relative overflow-hidden neon-border terminal-display">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl md:rounded-3xl"></div>
              <div class="relative z-10">
                <div class="text-center mb-4 md:mb-6">
                  <div class="status-indicator mb-3">
                    <span class="text-green-400">ONLINE</span>
                  </div>
                  <h2 class="text-xl md:text-2xl font-bold text-cyan-400 mb-2 glitch-effect" data-text="🐙 TAKO INDEX">🐙 TAKO INDEX</h2>
                  <div class="terminal-display text-xs mb-3">
                    <span class="text-green-400">$ ./tako_index.exe --interactive</span>
                    <div class="terminal-cursor"></div>
                  </div>
                  <p class="text-xs md:text-sm text-gray-400">
                    <span class="luxury-mono">SELECT MODULE FOR DATA ACCESS</span>
                  </p>
                </div>
                <InteractiveQA />
              </div>
            </div>
          </section>
        </FadeIn>

        <main class="max-w-4xl mx-auto space-y-20">
          {/* About Me - 拡張セクション */}
          <AboutSection />

          {/* Status */}
          <FadeIn>
            <section>
              <div class="relative mb-12">
                <div class="flex items-center space-x-4">
                  <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-blue-500/30 hologram-effect">
                    <span class="text-3xl">📊</span>
                  </div>
                  <div>
                    <h2 class="text-4xl font-bold neon-glow">
                      <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">Status</span>
                    </h2>
                    <div class="text-sm text-gray-400 font-mono mt-2">現在の状況 | STATUS.dat</div>
                  </div>
                </div>
                <div class="absolute -top-2 -left-2 w-20 h-20 border-2 border-blue-500/30 rounded-2xl animate-pulse"></div>
                <div class="absolute -bottom-2 -right-2 w-12 h-12 border border-cyan-500/20 rounded-xl"></div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class={`group glass-card-dark p-10 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1 relative overflow-hidden hologram-effect card-3d sound-wave-effect`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field"></div>
                  <div class="relative z-10 space-y-6">
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg pulse-wave neon-glow">
                        <span class="text-2xl">👤</span>
                      </div>
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">お名前</h3>
                        <p class="luxury-paragraph text-base">
                          <span class="gradient-text-luxury">冨山 翔太</span> <span class="luxury-mono text-sm">(Tomiyama Shota)</span>
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg pulse-wave neon-glow">
                        <span class="text-2xl">🎂</span>
                      </div>
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">年齢</h3>
                        <p class="luxury-paragraph text-base"><span class="text-cyan-400 font-medium">16</span>歳 <span class="luxury-caption">高校生世代</span></p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center shadow-lg pulse-wave neon-glow">
                        <span class="text-2xl">📍</span>
                      </div>
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">拠点</h3>
                        <p class="luxury-paragraph text-base">
                          <span class="text-green-400 font-medium">大阪市</span>生野区 <span class="luxury-caption">関西圏</span>
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg pulse-wave neon-glow">
                        <span class="text-2xl">🎓</span>
                      </div>
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">教育機関</h3>
                        <p class="luxury-paragraph text-base">
                          <span class="text-orange-400 font-medium">大阪府立清水谷高等学校</span>
                        </p>
                        <p class="luxury-caption">公立進学校</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class={`group glass-card-dark p-10 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 relative overflow-hidden hologram-effect card-3d sound-wave-effect`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field"></div>
                  <div class="relative z-10 space-y-6">
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg pulse-wave neon-glow">
                        <span class="text-2xl">🍣</span>
                      </div>
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">料理の嗜好</h3>
                        <p class="luxury-paragraph text-base">
                          <span class="text-yellow-400 font-medium">寿司</span> <span class="luxury-caption">日本料理</span>
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-lg pulse-wave neon-glow">
                        <span class="text-2xl">📚</span>
                      </div>
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">愛読作品</h3>
                        <p class="luxury-paragraph text-base">
                          <span class="gradient-text-luxury">お兄ちゃんはおしまい！</span>
                        </p>
                        <p class="luxury-caption">日常系コメディ漫画</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg pulse-wave neon-glow">
                        <span class="text-2xl">☕</span>
                      </div>
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">愛飲品</h3>
                        <p class="luxury-paragraph text-base">
                          <span class="text-cyan-400 font-medium">サイダー</span>, <span class="text-blue-400 font-medium">コーラ</span>, <span class="text-amber-400 font-medium">コーヒー</span>
                        </p>
                        <p class="luxury-caption">カフェイン & 炭酸系</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg pulse-wave neon-glow">
                        <span class="text-2xl">🏛️</span>
                      </div>
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">政治的指向</h3>
                        <p class="luxury-paragraph text-base">
                          <span class="text-indigo-400 font-medium">日本維新の会</span>, <span class="text-purple-400 font-medium">国民民主党</span>, <span class="text-red-400 font-medium">日本保守党</span>
                        </p>
                        <p class="luxury-caption">改革志向・中道保守</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 日常生活の節を追加 */}
              <div class="mt-8">
                <ExpandableText title="私の日常" initiallyExpanded={true}>
                  <div class="luxury-paragraph space-y-4">
                    <p>平日における私の生活リズムは、学業と自己開発のバランスを重視した構成となっています。学校教育を終えた後、<span class="text-blue-400 font-medium">予備校での学習</span>に21時まで専念し、帰宅後は深夜2時まで<span class="gradient-text-luxury">takos プロジェクト</span>の開発に情熱を注いでいます。</p>
                    
                    <p>休日においては、主にtakosの開発作業に集中しており、技術的革新と創造的問題解決に没頭しています。プロジェクトが一定の段階に到達した際には、<span class="text-purple-400 font-medium">週末の予備校通学</span>も検討しており、学術的知識の更なる深化を目指しています。</p>
                    
                    <p class="text-gray-300 italic border-l-4 border-cyan-500/50 pl-4">この密度の高いスケジュールは、将来への投資として位置づけており、知識と技術、両方の領域での成長を追求しています。</p>
                  </div>
                </ExpandableText>
              </div>
            </section>
          </FadeIn>

          {/* Timeline - 新セクション */}
          <TimelineSection />

          {/* Skills */}
          <SkillsSection />

          {/* Projects */}
          <FadeIn>
            <section>
              <div class="relative mb-12">
                <div class="flex items-center space-x-4">
                  <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center shadow-2xl shadow-pink-500/30 hologram-effect">
                    <span class="text-3xl">🚀</span>
                  </div>
                  <div>
                    <h2 class="text-4xl font-bold neon-glow">
                      <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-400 to-pink-300">Projects</span>
                    </h2>
                    <div class="text-sm text-gray-400 font-mono mt-2">開発プロジェクト | PROJECTS.md</div>
                  </div>
                </div>
                <div class="absolute -top-2 -left-2 w-20 h-20 border-2 border-pink-500/30 rounded-2xl animate-pulse"></div>
                <div class="absolute -bottom-2 -right-2 w-12 h-12 border border-red-500/20 rounded-xl"></div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class={`glass-card-dark p-8 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 relative overflow-hidden group neon-border hologram-effect`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field"></div>
                  <div class="relative z-10">
                    <div class="flex items-center mb-6">
                      <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-4 shadow-xl group-hover:scale-110 transition-transform duration-300 pulse-wave">
                        <span class="text-3xl neon-glow">💬</span>
                      </div>
                      <div>
                        <h3 class="text-2xl font-bold neon-glow glitch-effect" data-text="takos">takos</h3>
                        <div class="status-indicator mt-2">
                          <span class="text-green-400">ACTIVE DEV</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* ターミナル風プロジェクト情報 */}
                    <div class="terminal-display mb-6 text-xs">
                      <div class="text-green-400">$ git log --oneline --graph</div>
                      <div class="text-gray-300 mt-1">
                        * a7f2d3e feat: distributed chat protocol<br/>
                        * 8c1a9f4 refactor: encryption layer<br/>
                        * 2b5e7a1 init: project foundation
                      </div>
                      <div class="terminal-cursor"></div>
                    </div>
                    
                    <p class={`text-gray-300 mb-6 leading-relaxed luxury-paragraph`}>
                      <span class="text-purple-400 font-medium">分散型チャットSNS</span>。Matrixのような<span class="text-cyan-400">分散型・暗号化機能</span>と、LINEのような<span class="text-pink-400">直感的UI/UX</span>の融合を目指しています。
                    </p>
                    
                    {/* 技術スタック */}
                    <div class="mb-6">
                      <h4 class="text-sm font-mono text-cyan-400 mb-3">TECH_STACK:</h4>
                      <div class="flex flex-wrap gap-2">
                        <span class={`px-3 py-1 rounded-full text-xs luxury-button border border-purple-500/30`}>Deno</span>
                        <span class={`px-3 py-1 rounded-full text-xs luxury-button border border-blue-500/30`}>SolidJS</span>
                        <span class={`px-3 py-1 rounded-full text-xs luxury-button border border-green-500/30`}>E2E暗号化</span>
                      </div>
                    </div>
                    
                    {/* プログレスバー */}
                    <div class="mb-6">
                      <div class="flex justify-between items-center mb-2">
                        <span class="text-sm font-mono text-gray-400">開発進捗</span>
                        <span class="text-sm font-mono text-purple-400">67%</span>
                      </div>
                      <div class="data-bar" style="--progress: 67%"></div>
                    </div>
                    
                    <div class="flex justify-between items-center">
                      <a href="https://github.com/tako0614/takos" class={`luxury-button text-sm`}>
                        リポジトリを見る →
                      </a>
                      <div class="text-xs text-gray-500 font-mono">
                        Last commit: 2h ago
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 将来のプロジェクト用のプレースホルダー */}
                <div class={`glass-card-dark p-8 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1 relative overflow-hidden group neon-border liquid-effect`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div class="relative z-10">
                    <div class="flex items-center mb-6">
                      <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mr-4 shadow-xl group-hover:scale-110 transition-transform duration-300 pulse-wave">
                        <span class="text-3xl neon-glow">🔮</span>
                      </div>
                      <div>
                        <h3 class="text-2xl font-bold neon-glow">Next Project</h3>
                        <div class="status-indicator mt-2">
                          <span class="text-yellow-400">PLANNING</span>
                        </div>
                      </div>
                    </div>
                    
                    <div class="terminal-display mb-6 text-xs">
                      <div class="text-green-400">$ ideate --next-innovation</div>
                      <div class="text-gray-300 mt-1">
                        &gt; Analyzing market gaps...<br/>
                        &gt; Evaluating tech stack options...<br/>
                        &gt; Defining target audience...
                      </div>
                      <div class="terminal-cursor"></div>
                    </div>
                    
                    <p class={`text-gray-300 mb-6 leading-relaxed luxury-paragraph`}>
                      次世代プロジェクトを構想中。<span class="text-cyan-400 font-medium">AI</span>、<span class="text-blue-400 font-medium">ブロックチェーン</span>、<span class="text-purple-400 font-medium">量子コンピューティング</span>を統合した革新的なソリューションを目指しています。
                    </p>
                    
                    <div class="mb-6">
                      <div class="flex justify-between items-center mb-2">
                        <span class="text-sm font-mono text-gray-400">企画進捗</span>
                        <span class="text-sm font-mono text-cyan-400">23%</span>
                      </div>
                      <div class="data-bar" style="--progress: 23%"></div>
                    </div>
                    
                    <div class="luxury-button text-sm cursor-not-allowed opacity-50">
                      詳細は近日公開 🔒
                    </div>
                  </div>
                </div>
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

          {/* Mutual Links */}
          <FadeIn>
            <section>
              <div class="relative mb-12">
                <div class="flex items-center space-x-4">
                  <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-2xl shadow-cyan-500/30 hologram-effect">
                    <span class="text-3xl">🔗</span>
                  </div>
                  <div>
                    <h2 class="text-4xl font-bold neon-glow">
                      <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300">相互リンク</span>
                    </h2>
                    <div class="text-sm text-gray-400 font-mono mt-2">友人・仲間 | LINKS.cfg</div>
                  </div>
                </div>
                <div class="absolute -top-2 -left-2 w-20 h-20 border-2 border-cyan-500/30 rounded-2xl animate-pulse"></div>
                <div class="absolute -bottom-2 -right-2 w-12 h-12 border border-blue-500/20 rounded-xl"></div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <For each={mutualLinks}>
                  {(link) => (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class={`glass-card-dark p-6 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 group relative overflow-hidden`}
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
                  <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-red-500/30 hologram-effect">
                    <span class="text-3xl">📞</span>
                  </div>
                  <div>
                    <h2 class="text-4xl font-bold neon-glow">
                      <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-300">Contact</span>
                    </h2>
                    <div class="text-sm text-gray-400 font-mono mt-2">連絡手段 | CONTACT.ini</div>
                  </div>
                </div>
                <div class="absolute -top-2 -left-2 w-20 h-20 border-2 border-red-500/30 rounded-2xl animate-pulse"></div>
                <div class="absolute -bottom-2 -right-2 w-12 h-12 border border-orange-500/20 rounded-xl"></div>
              </div>
              
              <p class={`max-w-lg mx-auto mb-6 md:mb-8 text-sm md:text-base text-gray-300 px-4`}>
                プロジェクトの共同開発や技術的な質問など、お気軽にご連絡ください。通常48時間以内に返信します。
              </p>
              
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-4xl mx-auto px-4">
                <a
                  href="https://line.me/ti/g2/Q0c8YJlkh5f_hkDuODxp39XF9A7BOCFqezaAHA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
                  class={`group glass-card-dark p-4 md:px-6 md:py-5 rounded-xl md:rounded-2xl transition-all duration-500 flex flex-col md:flex-row items-center hover:scale-105 hover:-translate-y-2 relative overflow-hidden`}
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mb-2 md:mb-0 md:mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <span class="text-lg md:text-2xl">💬</span>
                  </div>
                  <span class="font-semibold text-xs md:text-base relative z-10 text-center md:text-left">OpenChat</span>
                </a>
                
                <a
                  href="https://github.com/tako0614"
                  class={`group glass-card-dark p-4 md:px-6 md:py-5 rounded-xl md:rounded-2xl transition-all duration-500 flex flex-col md:flex-row items-center hover:scale-105 hover:-translate-y-2 relative overflow-hidden`}
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-700/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mb-2 md:mb-0 md:mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <span class="text-lg md:text-2xl">📂</span>
                  </div>
                  <span class="font-semibold text-xs md:text-base relative z-10 text-center md:text-left">GitHub</span>
                </a>
                
                <a
                  href="https://x.com/takoserver_com"
                  class={`group glass-card-dark p-4 md:px-6 md:py-5 rounded-xl md:rounded-2xl transition-all duration-500 flex flex-col md:flex-row items-center hover:scale-105 hover:-translate-y-2 relative overflow-hidden`}
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-2 md:mb-0 md:mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <span class="text-lg md:text-2xl">🐦</span>
                  </div>
                  <span class="font-semibold text-xs md:text-base relative z-10 text-center md:text-left">Twitter・X</span>
                </a>
                
                <a
                  href="mailto:contact@tako.example.com"
                  class={`group glass-card-dark p-4 md:px-6 md:py-5 rounded-xl md:rounded-2xl transition-all duration-500 flex flex-col md:flex-row items-center hover:scale-105 hover:-translate-y-2 relative overflow-hidden`}
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mb-2 md:mb-0 md:mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <span class="text-lg md:text-2xl">✉️</span>
                  </div>
                  <span class="font-semibold text-xs md:text-base relative z-10 text-center md:text-left">Email</span>
                </a>
              </div>
            </section>
          </FadeIn>
        </main>

        {/* フッター */}
        <FadeIn>
          <footer class={`text-center text-gray-600 mt-20 border-t pt-8 'border-gray-600`}>
            <div class="max-w-4xl mx-auto">
              <p class="text-sm mb-4">
                このサイトはSolidJS & Tailwind CSSで構築され、Deno Deployでホスティングされています。
                ソースコードは<a href="https://github.com/tako0614/info.takos.jp" class="text-blue-600 hover:underline">GitHub</a>で公開しています。
              </p>
              <p>© 2024 Tomiyama Shota. All rights reserved.</p>
            </div>
          </footer>
        </FadeIn>
      </div>
    </div>
  );
};

export default App;
