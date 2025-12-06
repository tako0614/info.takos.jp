import { Component, createSignal, For } from 'solid-js';
import { FadeIn } from './components/ui/FadeIn';
import { ExpandableText } from './components/ui/ExpandableText';
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

      <div class="relative z-10 text-white min-h-[500vh] p-8 backdrop-blur-sm">
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
        
          {/* 強化されたソーシャルリンク */}
          <div class="flex justify-center mt-10 space-x-6">
            <a href="https://github.com/tako0614" class="group relative transform transition-all duration-500 hover:scale-125 hover:-translate-y-2 sound-wave-effect">
              <div class="absolute -inset-2 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500 energy-field"></div>
              <div class="relative w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 backdrop-blur-md border border-white/20 shadow-xl hologram-effect pulse-wave">
                <GitHubIcon class="w-7 h-7 text-2xl filter drop-shadow-lg neon-glow" aria-hidden={false} title="GitHub" />
              </div>
            </a>
            <a href="https://x.com/takos_jp" class="group relative transform transition-all duration-500 hover:scale-125 hover:-translate-y-2 sound-wave-effect">
              <div class="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500 energy-field"></div>
              <div class="relative w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500 backdrop-blur-md border border-white/20 shadow-xl hologram-effect pulse-wave">
                <XLogo class="w-7 h-7 text-2xl filter drop-shadow-lg neon-glow" aria-hidden={false} title="X / Twitter" />
              </div>
            </a>
            <a href="mailto:shoutatomiyama0614@gmail.com" class="group relative transform transition-all duration-500 hover:scale-125 hover:-translate-y-2 sound-wave-effect">
              <div class="absolute -inset-2 bg-gradient-to-r from-red-600 to-pink-600 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500 energy-field"></div>
              <div class="relative w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-500 backdrop-blur-md border border-white/20 shadow-xl hologram-effect pulse-wave">
                <MailIcon class="w-7 h-7 text-2xl filter drop-shadow-lg neon-glow" aria-hidden={false} title="Email" />
              </div>
            </a>
          </div>
        </FadeIn>

        <main class="max-w-4xl mx-auto space-y-20">
          {/* About Me - 拡張セクション */}
          <AboutSection />

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
                <div class={`group glass-card-dark p-10 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1 relative overflow-hidden hologram-effect card-3d sound-wave-effect`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field"></div>
                  <div class="relative z-10 space-y-6">
                    <div class="flex items-center space-x-4">
                      <FiUser size={24} class="text-purple-400" />
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">お名前</h3>
                        <p class="luxury-paragraph text-base">
                          <span class="gradient-text-luxury">冨山 翔太</span> <span class="luxury-mono text-sm">(Tomiyama Shota)</span>
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <FiCalendar size={24} class="text-cyan-400" />
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">年齢</h3>
                        <p class="luxury-paragraph text-base"><span class="text-cyan-400 font-medium">16</span>歳 <span class="luxury-caption">高校生世代</span></p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <FiMapPin size={24} class="text-green-400" />
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">拠点</h3>
                        <p class="luxury-paragraph text-base">
                          <span class="text-green-400 font-medium">大阪市</span>生野区 <span class="luxury-caption">関西圏</span>
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
                        <p class="luxury-caption">公立進学校</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class={`group glass-card-dark p-10 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 relative overflow-hidden hologram-effect card-3d sound-wave-effect`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field"></div>
                  <div class="relative z-10 space-y-6">
                    <div class="flex items-center space-x-4">
                      <IoFishOutline size={24} class="text-yellow-400" />
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">料理の嗜好</h3>
                        <p class="luxury-paragraph text-base">
                          <span class="text-yellow-400 font-medium">寿司</span> <span class="luxury-caption">日本料理</span>
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
                        <p class="luxury-caption">日常系コメディ漫画</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <FiCoffee size={24} class="text-cyan-400" />
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">愛飲品</h3>
                        <p class="luxury-paragraph text-base">
                          <span class="text-cyan-400 font-medium">サイダー</span>, <span class="text-blue-400 font-medium">コーラ</span>, <span class="text-amber-400 font-medium">コーヒー</span>
                        </p>
                        <p class="luxury-caption">カフェイン & 炭酸系</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <BiRegularBuildingHouse size={24} class="text-indigo-400" />
                      <div>
                        <h3 class="luxury-text-subtitle neon-glow">政治的指向</h3>
                        <p class="luxury-paragraph text-base">
                          <span class="text-indigo-400 font-medium">日本維新の会</span>, <span class="text-blue-400 font-medium">自由民主党</span>
                        </p>
                        <p class="luxury-caption">改革志向・保守</p>
                      </div>
                    </div>
                  </div>
                </div>
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

          {/* Projects */}
          <FadeIn>
            <section>
              <div class="relative mb-12">
                <div class="flex items-center space-x-4">
                  <div>
                    <h2 class="text-4xl font-bold neon-glow">
                      <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-400 to-pink-300">Projects</span>
                    </h2>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class={`glass-card-dark p-8 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 relative overflow-hidden group neon-border hologram-effect`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field"></div>
                  <div class="relative z-10">
                    <div class="flex items-center mb-6">
                      <img src="/icon.png" alt="takos" class="w-16 h-16 rounded-2xl mr-4 shadow-xl group-hover:scale-110 transition-transform duration-300" />
                      <div>
                        <h3 class="text-2xl font-bold neon-glow glitch-effect" data-text="takos">takos</h3>
                        <div class="status-indicator mt-2">
                          <span class="text-green-400">ACTIVE DEV</span>
                        </div>
                      </div>
                    </div>

                    <p class={`text-gray-300 mb-6 leading-relaxed luxury-paragraph`}>
                      <span class="text-purple-400 font-medium">web自主基盤ソフトウェア</span>
                    </p>
                    <div class="flex justify-between items-center">
                      <a href="https://github.com/tako0614/takos" class={`luxury-button text-sm`}>
                        リポジトリを見る →
                      </a>
                    </div>
                  </div>
                </div>

                <div class={`glass-card-dark p-8 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1 relative overflow-hidden group neon-border hologram-effect`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field"></div>
                  <div class="relative z-10">
                    <div class="flex items-center mb-6">
                      <img src="/infonode.svg" alt="infonode" class="w-16 h-16 rounded-2xl mr-4 shadow-xl group-hover:scale-110 transition-transform duration-300" />
                      <div>
                        <h3 class="text-2xl font-bold neon-glow glitch-effect" data-text="infonode">infonode</h3>
                        <div class="status-indicator mt-2">
                          <span class="text-yellow-400">IN DEVELOPMENT</span>
                        </div>
                      </div>
                    </div>

                    <p class={`text-gray-300 mb-6 leading-relaxed luxury-paragraph`}>
                      <span class="text-cyan-400 font-medium">glaphによる情報整理基盤</span>と<span class="text-blue-400 font-medium">AI agentによる自動化ソフトウェア</span>
                    </p>
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
                  <div>
                    <h2 class="text-4xl font-bold neon-glow">
                      <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300">相互リンク</span>
                    </h2>
                  </div>
                </div>
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
                  <div>
                    <h2 class="text-4xl font-bold neon-glow">
                      <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-300">Contact</span>
                    </h2>
                    <div class="text-sm text-gray-400 font-mono mt-2">連絡手段 | CONTACT.ini</div>
                  </div>
                </div>
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
                    <ChatIcon class="text-lg md:text-2xl w-6 h-6" aria-hidden={false} title="OpenChat" />
                  </div>
                  <span class="font-semibold text-xs md:text-base relative z-10 text-center md:text-left">OpenChat</span>
                </a>
                
                <a
                  href="https://github.com/tako0614"
                  class={`group glass-card-dark p-4 md:px-6 md:py-5 rounded-xl md:rounded-2xl transition-all duration-500 flex flex-col md:flex-row items-center hover:scale-105 hover:-translate-y-2 relative overflow-hidden`}
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-700/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mb-2 md:mb-0 md:mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <GitHubIcon class="text-lg md:text-2xl w-6 h-6" aria-hidden={false} title="GitHub" />
                  </div>
                  <span class="font-semibold text-xs md:text-base relative z-10 text-center md:text-left">GitHub</span>
                </a>
                
                <a
                  href="https://x.com/takos_jp"
                  class={`group glass-card-dark p-4 md:px-6 md:py-5 rounded-xl md:rounded-2xl transition-all duration-500 flex flex-col md:flex-row items-center hover:scale-105 hover:-translate-y-2 relative overflow-hidden`}
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-2 md:mb-0 md:mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <XLogo class="text-lg md:text-2xl w-6 h-6" aria-hidden={false} title="X / Twitter" />
                  </div>
                  <span class="font-semibold text-xs md:text-base relative z-10 text-center md:text-left">Twitter・X</span>
                </a>
                
                <a
                  href="mailto:shoutatomiyama0614@gmail.com"
                  class={`group glass-card-dark p-4 md:px-6 md:py-5 rounded-xl md:rounded-2xl transition-all duration-500 flex flex-col md:flex-row items-center hover:scale-105 hover:-translate-y-2 relative overflow-hidden`}
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mb-2 md:mb-0 md:mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <MailIcon class="text-lg md:text-2xl w-6 h-6" aria-hidden={false} title="Email" />
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
