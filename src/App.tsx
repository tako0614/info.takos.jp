import { Component, createSignal, onMount, onCleanup, Show, createEffect, For } from 'solid-js';

/**
 * FadeIn コンポーネント
 * Intersection Observer で表示時に「fade-in」クラスを追加
 */
const FadeIn: Component<{ children: any; class?: string }> = (props) => {
  let el!: HTMLDivElement;
  let observer: IntersectionObserver;

  onMount(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
            // 一度アニメーションしたら監視を解除
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
  });
  onCleanup(() => observer && observer.disconnect());
  return (
    <div ref={el} class={`opacity-0 ${props.class}`}>
      {props.children}
    </div>
  );
};

/**
 * MovingParticles コンポーネント
 * 背景に常に浮遊する粒子アニメーション（軽量化版）
 */
const MovingParticles: Component<{ darkMode: boolean }> = (props) => {
  const particleCount = 15; // 40から15に削減
  let containerRef!: HTMLDivElement;

  onMount(() => {
    const container = containerRef;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    for (let i = 0; i < particleCount; i++) {
      createParticle(container, width, height, props.darkMode);
    }
  });

  createEffect(() => {
    if (containerRef) {
      // 既存の粒子を削除
      containerRef.innerHTML = '';
      
      // 新しい粒子を作成
      const width = containerRef.offsetWidth;
      const height = containerRef.offsetHeight;
      
      for (let i = 0; i < particleCount; i++) {
        createParticle(containerRef, width, height, props.darkMode);
      }
    }
  });

  function createParticle(container: HTMLDivElement, width: number, height: number, isDark: boolean) {
    const particle = document.createElement('div');
    const size = Math.random() * 6 + 2;
    
    const colorClass = isDark 
      ? ['bg-purple-400/20', 'bg-blue-400/20', 'bg-pink-400/20', 'bg-cyan-400/20'] 
      : ['bg-purple-600/10', 'bg-blue-600/10', 'bg-pink-600/10', 'bg-cyan-600/10'];
    
    particle.className = `absolute rounded-full ${colorClass[Math.floor(Math.random() * colorClass.length)]}`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * width}px`;
    particle.style.top = `${Math.random() * height}px`;
    
    // ランダムなアニメーション
    const duration = Math.random() * 50 + 30;
    particle.style.animation = `
      floatParticle ${duration}s infinite ease-in-out,
      fadeInOut ${(Math.random() * 5) + 5}s infinite ease-in-out ${Math.random() * 5}s
    `;
    particle.style.animationDelay = `${Math.random() * 10}s`;
    
    container.appendChild(particle);
  }
  
  return (
    <div 
      ref={containerRef} 
      class="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};

/**
 * LightBackgroundEffect コンポーネント
 * 軽量版背景エフェクト
 */
const LightBackgroundEffect: Component<{ darkMode: boolean }> = (props) => {
  return (
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div 
        class={`absolute w-full h-full ${
          props.darkMode 
            ? 'bg-gradient-to-br from-purple-900/5 via-transparent to-blue-900/5' 
            : 'bg-gradient-to-br from-blue-300/10 via-transparent to-purple-300/10'
        }`}
      ></div>
    </div>
  );
};

/**
 * TakoAnimation コンポーネント
 * たこが画面上を動き回るアニメーション
 */
const TakoAnimation: Component<{ id: number; onClick: () => void }> = (props) => {
  let takoRef!: HTMLImageElement;
  const speed = 1.0; // 移動速度を軽量化（1.5から1.0に）
  let x = 0;
  let y = 0;
  let dx = 0;
  let dy = 0;
  let animationId: number;

  const initTako = () => {
    if (!takoRef) return;
    const takoWidth = takoRef.offsetWidth || 50;
    const takoHeight = takoRef.offsetHeight || 50;

    x = Math.random() * (window.innerWidth - takoWidth);
    y = Math.random() * (window.innerHeight - takoHeight);
    dx = (Math.random() - 0.5) * 2 * speed;
    dy = (Math.random() - 0.5) * 2 * speed;

    takoRef.style.left = `${x}px`;
    takoRef.style.top = `${y}px`;
  };

  const updatePosition = () => {
    if (!takoRef) return;

    const takoWidth = takoRef.offsetWidth || 50;
    const takoHeight = takoRef.offsetHeight || 50;

    x += dx;
    y += dy;

    // 画面端での反射ロジック
    if (x < 0) {
      x = 0;
      dx *= -1;
    } else if (x > window.innerWidth - takoWidth) {
      x = window.innerWidth - takoWidth;
      dx *= -1;
    }

    if (y < 0) {
      y = 0;
      dy *= -1;
    } else if (y > window.innerHeight - takoHeight) {
      y = window.innerHeight - takoHeight;
      dy *= -1;
    }

    takoRef.style.left = `${x}px`;
    takoRef.style.top = `${y}px`;
  };

  onMount(() => {
    if (takoRef.complete) {
      initTako();
      // 軽量化：60FPSから30FPSに変更
      animationId = setInterval(updatePosition, 33) as unknown as number;
    } else {
      takoRef.onload = () => {
        initTako();
        animationId = setInterval(updatePosition, 33) as unknown as number;
      };
      takoRef.onerror = () => {
        console.error(`Failed to load tako image for id: ${props.id}`);
        if(takoRef) takoRef.style.display = 'none';
      }
    }
  });

  onCleanup(() => {
    if (animationId) {
      clearInterval(animationId);
    }
  });

  return (
    <img
      ref={takoRef}
      src="./tako.png"
      alt="たこ"
      class="fixed w-12 h-12 z-20 pointer-events-auto cursor-pointer rounded-full"
      onClick={() => props.onClick()}
    />
  );
};

/**
 * ExpandableText コンポーネント
 * 長文を折りたたみ可能に表示
 */
const ExpandableText: Component<{ 
  title: string;
  children: any;
  class?: string;
  initiallyExpanded?: boolean;
  darkMode?: boolean; // darkMode プロパティを追加
}> = (props) => {
  const [expanded, setExpanded] = createSignal(props.initiallyExpanded || false);
  
  return (
    <div class={`bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/10 ${props.class}`}>
      <div 
        class="flex justify-between items-center cursor-pointer" 
        onClick={() => setExpanded(!expanded())}
      >
        <h3 class="text-xl font-medium">{props.title}</h3>
        <span class="text-2xl transition-transform duration-300" 
          style={{ transform: expanded() ? "rotate(180deg)" : "rotate(0deg)" }}>
          ▼
        </span>
      </div>
      <Show when={expanded()}>
        <div class={`mt-4 ${props.darkMode ?? true ? 'text-gray-200' : 'text-gray-700'} leading-relaxed`}>
          {props.children}
        </div>
      </Show>
    </div>
  );
};

const App: Component = () => {
  // アイコンクリック時のアニメーション状態（トグル）
  const [rotate, setRotate] = createSignal(false);
  const [darkMode, setDarkMode] = createSignal(true);
  const [takoInstances, setTakoInstances] = createSignal([{ id: Date.now() }]);

  const addTako = () => {
    setTakoInstances([...takoInstances(), { id: Date.now() }]);
  };

  const quotes = [
    "自分の努力不足を開発者に転嫁するな",
    "思想がない人に価値はない",
    "手段はどうあれ勝ったやつが勝ち",
    
  ];
  const [quote, setQuote] = createSignal(quotes[Math.floor(Math.random() * quotes.length)]);
  function nextQuote() {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }

  // 相互リンクの配列
  const mutualLinks = [
    {
      name: "371ちゃん",
      url: "https://371tti.net",
      banner: "https://371tti.net/banner.png",
      description: "371ちゃんの公式サイトです"
    },
    {
      name: "Yunai",
      url: "https://ynai20.vercel.app",
      banner: "https://ynai20.vercel.app/banner.png", 
      description: "Yunaiの公式サイトです"
    },
    {
      name: "t3traちゃん",
      url: "https://t3tra.dev",
      banner: "https://t3tra.dev/images/banner_dark.png",
    },
    {
      name: "akku",
      url: "https://akku1139.github.io",
      banner: "https://akku1139.github.io/banners/320x100.png",
    }
    // 必要に応じてここに追加できます
  ];

  return (    <div class={`min-h-screen relative overflow-hidden transition-colors duration-500 ${darkMode() ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700' : 'bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200'}`}>
      {/* 軽量化されたアニメーション要素 */}
      <MovingParticles darkMode={darkMode()} />
      <LightBackgroundEffect darkMode={darkMode()} />
      {/* TakoAnimationコンポーネントを<For>でレンダリング */}
      <For each={takoInstances()}>
        {(tako) => <TakoAnimation id={tako.id} onClick={addTako} />}
      </For>
      
      {/* テーマ切り替えボタン */}
      <button 
        onClick={() => setDarkMode(!darkMode())} 
        class="fixed top-4 right-4 z-50 bg-white/20 backdrop-blur-md p-2 rounded-full shadow-lg transition-all hover:scale-110"
      >
        <span class="text-2xl">{darkMode() ? '🌙' : '☀️'}</span>
      </button>

      {/* たこを増やすボタン */}
      <button
        onClick={addTako}
        class="fixed top-16 right-4 z-50 bg-pink-500/50 hover:bg-pink-600/70 backdrop-blur-md p-2 rounded-full shadow-lg transition-all hover:scale-110 text-white"
        title="たこを増やす"
      >
        <span class="text-xl">🐙+</span>
      </button>      {/* 軽量化された背景エフェクト */}
      <div
        class="absolute inset-0 bg-[url('/nya.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"
        aria-hidden="true"
      ></div>
      
      {/* シンプルなグラデーションオーバーレイ */}
      <div 
        class={`absolute inset-0 ${darkMode() ? 'bg-gradient-to-br from-purple-900/10 to-transparent' : 'bg-gradient-to-br from-blue-300/10 to-transparent'}`}
        aria-hidden="true"
      ></div>
      
      {/* 軽量化された装飾（アニメーション削除） */}
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div class="absolute -top-20 -left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div class="absolute top-1/3 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div class={`relative z-10 ${darkMode() ? 'text-white' : 'text-gray-800'} min-h-screen p-8 backdrop-blur-sm`}>
        {/* ヘッダーセクション */}
        <FadeIn class="text-center py-16">
          <div
            class={`w-36 h-36 mx-auto mb-6 border-4 ${darkMode() ? 'border-white' : 'border-gray-800'} rounded-full overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-110 hover:rotate-3 cursor-pointer ${
              rotate() ? "animate-spinOnce" : ""
            }`}
            onClick={() => setRotate(true)}
            onAnimationEnd={() => setRotate(false)}
            style="box-shadow: 0 0 25px rgba(168, 85, 247, 0.4);"
          >
            <img
              src="./icon.png"
              alt="プロフィールアイコン"
              class="w-full h-full object-cover"
            />
          </div>
          <h1 class={`text-6xl font-extrabold mb-4 tracking-wide ${darkMode() ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500'}`}>たこ</h1>
          <p class={`text-xl ${darkMode() ? 'text-gray-300' : 'text-gray-600'}`}>real name: Tomiyama Shota</p>
          
          <div class="flex justify-center mt-6 space-x-4">
            <a href="https://github.com/tako0614" class="transform transition hover:scale-110">
              <div class="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-md">
                <span class="text-xl">📂</span>
              </div>
            </a>
            <a href="https://x.com/takoserver_com" class="transform transition hover:scale-110">
              <div class="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-md">
                <span class="text-xl">🐦</span>
              </div>
            </a>
            <a href="mailto:contact@tako.example.com" class="transform transition hover:scale-110">
              <div class="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-md">
                <span class="text-xl">✉️</span>
              </div>
            </a>
          </div>
        </FadeIn>

        <main class="max-w-4xl mx-auto space-y-20">
          {/* About Me - 拡張セクション */}
            <section>
              <h2 class={`text-3xl font-semibold mb-8 pb-2 ${darkMode() ? 'border-purple-500/50' : 'border-purple-700/50'} border-b-2`}>
                <span class={`${darkMode() ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-600'}`}>About Me</span>
              </h2>
              
              <div class="space-y-6">
                <p class={`${darkMode() ? 'text-gray-200' : 'text-gray-700'} leading-relaxed text-lg`}>
                  はじめまして、たこです。プログラミングばっかしている高校生です。プログラミングが好きで、主にWeb開発をしています。最近はtakosという次世代のLINEを目指したプロジェクトを進めています。
                </p>
                

                  <ExpandableText title="私のビジョン" initiallyExpanded={true} darkMode={darkMode()}>
                    趣味はプログラミング以外にも、アニメや漫画を見ることです。将来の夢は、プログラマーではなく起業家や実業家になることです。AIの進歩により近い将来不老不死が実現されると考え、上級国民になることでいち早くその恩恵を受けようと目論んでいます。
                    
                    <p class="mt-4">
                      テクノロジーの力で世界を変えていきたいと考えており、特に分散型システムやプライバシー保護技術に興味があります。現在の既得権益を破壊します
                    </p>
                    <p class="mt-4">
                      プログラミングはただの手段でしかなく、私の最終目標を達成するための一つの道だとしか考えていません。技術そのものに執着することはありません。私の目指す未来を実現するために、必要な技術を学び、使いこなしていくつもりです。
                    </p>
                    <p class="mt-4">
                      
                    </p>
                  </ExpandableText>

                
                <ExpandableText title="私の哲学と価値観" initiallyExpanded={true} darkMode={darkMode()}>
                  <p>私は中学生の頃、哲学者の考えを調べて自分に反映することにハマって今の正確の形成に大きく関与したと思っています。</p>
                  <p class="mt-4">特に影響を受けたのは、ニーチェの考え方です。彼の思想である、「人間が自らの力で新しい価値を創造し、より高い段階の存在へと進化しようとする超人思想」はとても共感しています。</p>
                  <p class="mt-4">また、実存主義にも関心があり、サルトルやカミュの思想から「実存は本質に先立つ」という教えに影響を受けています。これは、自分を定義するのは他者でも社会でもなく、自分自身の行動と選択であるという強い信念につながっています。</p>
                  <p class="mt-4">テクノロジーの発展は、まさにこの創造と自由の精神を具現化する手段だと捉えており、コードを書くことは私にとって新しい価値を生み出す行為そのものです。開発という行為自体が自己表現の一種だと考えています。</p>
                  <p class="mt-4">私は常に自らの思想を持ち、自らの野心に正直に生きていきたいです</p>
                </ExpandableText>
              </div>
            </section>
          {/* 今日の名言ミニ機能 */}
          <FadeIn>
          <h2 class={`text-3xl font-semibold mb-8 pb-2 ${darkMode() ? 'border-purple-500/50' : 'border-purple-700/50'} border-b-2`}>
                <span class={`${darkMode() ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-600'}`}>たこ語録</span>
              </h2>
            <section class="text-center p-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg">
              <h2 class="text-2xl font-semibold mb-4">たこ語録(ほぼ追加してない)</h2>
              <p class="text-lg mb-4">{quote()}</p>
              <button
                onClick={nextQuote}
                class="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white transition"
              >
                もう一回
              </button>
            </section>
          </FadeIn>
          {/* Status */}
          <FadeIn>
            <section>
              <h2 class={`text-3xl font-semibold mb-8 pb-2 ${darkMode() ? 'border-blue-500/50' : 'border-blue-700/50'} border-b-2`}>
                <span class={`${darkMode() ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-600'}`}>Status</span>
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class={`${darkMode() ? 'bg-white/10' : 'bg-white/60'} backdrop-blur-md p-6 rounded-lg shadow-xl border ${darkMode() ? 'border-white/10' : 'border-gray-200'} transform transition-all duration-300 hover:scale-105 hover:rotate-1`}>
                  <div class="space-y-4">
                    <div class="flex items-center space-x-3">
                      <span class="text-3xl">👤</span>
                      <div>
                        <h3 class="font-medium text-lg">Name</h3>
                        <p class={`${darkMode() ? 'text-gray-300' : 'text-gray-600'}`}>
                          冨山 翔太 (Tomiyama Shota)
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span class="text-3xl">🎂</span>
                      <div>
                        <h3 class="font-medium text-lg">Age</h3>
                        <p class={`${darkMode() ? 'text-gray-300' : 'text-gray-600'}`}>16歳</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span class="text-3xl">📍</span>
                      <div>
                        <h3 class="font-medium text-lg">Location</h3>
                        <p class={`${darkMode() ? 'text-gray-300' : 'text-gray-600'}`}>大阪市生野区</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span class="text-3xl">🎓</span>
                      <div>
                        <h3 class="font-medium text-lg">School</h3>
                        <p class={`${darkMode() ? 'text-gray-300' : 'text-gray-600'}`}>
                          大阪府立清水谷高等学校
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class={`${darkMode() ? 'bg-white/10' : 'bg-white/60'} backdrop-blur-md p-6 rounded-lg shadow-xl border ${darkMode() ? 'border-white/10' : 'border-gray-200'} transform transition-all duration-300 hover:scale-105 hover:rotate-1`}>
                  <div class="space-y-4">
                    <div class="flex items-center space-x-3">
                      <span class="text-3xl">🍣</span>
                      <div>
                        <h3 class="font-medium text-lg">Favorite Food</h3>
                        <p class={`${darkMode() ? 'text-gray-300' : 'text-gray-600'}`}>寿司</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span class="text-3xl">📚</span>
                      <div>
                        <h3 class="font-medium text-lg">Favorite Manga</h3>
                        <p class={`${darkMode() ? 'text-gray-300' : 'text-gray-600'}`}>
                          お兄ちゃんはおしまい！
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span class="text-3xl">☕</span>
                      <div>
                        <h3 class="font-medium text-lg">Favorite Drink</h3>
                        <p class={`${darkMode() ? 'text-gray-300' : 'text-gray-600'}`}>
                          Cider, Cola, Coffee
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span class="text-3xl">🏛️</span>
                      <div>
                        <h3 class="font-medium text-lg">
                          Political Affiliation
                        </h3>
                        <p class={`${darkMode() ? 'text-gray-300' : 'text-gray-600'}`}>
                          日本維新の会、国民民主党、日本保守党
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 日常生活の節を追加 */}
              <div class="mt-8">
                <ExpandableText title="私の日常" initiallyExpanded={true} darkMode={darkMode()}>
                  <p>平日は学校が終わった後予備校に行き9時まで勉強して家に帰ってから2時までtakosの開発に励んでいます。</p>
                  <p class="mt-4">休日はtakosの開発をしていますが、開発が終了したら土日も予備校に行きたいと考えています。</p>
                </ExpandableText>
              </div>
            </section>
          </FadeIn>

          {/* Timeline - 新セクション */}
          <FadeIn>
            <section>
              <h2 class={`text-3xl font-semibold mb-8 pb-2 ${darkMode() ? 'border-green-500/50' : 'border-green-700/50'} border-b-2`}>
                <span class={`${darkMode() ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-300' : 'text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500'}`}>Timeline</span>
              </h2>
              
              <div class="relative border-l-4 border-purple-400/30 ml-6 space-y-10 py-4">
                {[
                  { year: "2008", title: "誕生", text: "大阪府で生まれる" },
                  { year: "2024", title: "高校入学", text: "清水谷高校に入学" },
                ].map((item) => (
                  <div class="relative">
                    <div class={`absolute -left-10 mt-1.5 h-6 w-6 rounded-full border-4 ${darkMode() ? 'border-purple-500 bg-gray-900' : 'border-purple-700 bg-white'}`}></div>
                    <div class={`${darkMode() ? 'bg-white/10' : 'bg-white/60'} backdrop-blur-md p-5 rounded-lg shadow-lg border ${darkMode() ? 'border-white/10' : 'border-gray-200'} ml-2`}>
                      <h3 class={`text-lg font-medium mb-1 ${darkMode() ? 'text-purple-300' : 'text-purple-700'}`}>{item.year} - {item.title}</h3>
                      <p class={`${darkMode() ? 'text-gray-300' : 'text-gray-600'}`}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div class="mt-8">
                <ExpandableText title="将来の展望" initiallyExpanded={true} darkMode={darkMode()}>
                  <p>今後5年間は技術スキルを磨きながら、自分のプロジェクトの規模を拡大していきたいと考えています。高校卒業後は、大学で情報科学と経営学を学びつつ、スタートアップの立ち上げも視野に入れています。</p>
                  
                  <p class="mt-4">夢は、不老不死になることです。ついでに日本を再び強国にすることです。</p>
                  
                  <p class="mt-4">10年後には、自分がリードするチームを持ち、分散型システムやプライバシー保護技術の分野で世界的にも認められるサービスを世に送り出すことを目標としています。</p>

                  <p class="mt-4">そのために、オープンソースコミュニティへの貢献も続け、グローバルなネットワークを築きながら技術と経営の両面で実践的な経験を積んでいきたいです。</p>

                  <p class="mt-4">最終的には、自分の会社を通じて社会課題の解決に取り組み、テクノロジーの力で人々の生活をより豊かにすることが私のビジョンです。</p>
                </ExpandableText>
              </div>
            </section>
          </FadeIn>

          {/* Skills */}
          <FadeIn>
            <section>
              <h2 class={`text-3xl font-semibold mb-8 pb-2 ${darkMode() ? 'border-yellow-500/50' : 'border-yellow-700/50'} border-b-2`}>
                <span class={`${darkMode() ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-300' : 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-500'}`}>Skills</span>
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Frontend", text: "Preact, SolidJS, Tailwind CSS", icon: "🎨", color: "from-blue-400 to-indigo-400" },
                  { title: "Backend", text: "Node.js, Deno, PHP, Laravel, Hono", icon: "⚙️", color: "from-green-400 to-teal-400" },
                  { title: "Tools", text: "Git, Docker, Deno Deploy", icon: "🔧", color: "from-purple-400 to-pink-400" },
                  { title: "Infrastructure", text: "Proxmox, k8s, Linux", icon: "🏗️", color: "from-red-400 to-orange-400" },
                  { title: "Languages", text: "JavaScript, TypeScript, PHP, Rust (学習中)", icon: "📝", color: "from-yellow-400 to-amber-400" },
                  { title: "Other", text: "UI/UX Design, SEO基礎, グラフィックデザイン", icon: "✨", color: "from-cyan-400 to-blue-400" },
                ].map((skill) => (
                  <div class={`${darkMode() ? 'bg-white/10' : 'bg-white/60'} backdrop-blur-md p-5 rounded-lg shadow-xl border ${darkMode() ? 'border-white/10' : 'border-gray-200'} transform transition-all duration-300 hover:scale-105 hover:-rotate-1`}>
                    <div class={`w-12 h-12 mb-4 rounded-lg flex items-center justify-center bg-gradient-to-br ${skill.color}`}>
                      <span class="text-2xl">{skill.icon}</span>
                    </div>
                    <h3 class="font-medium text-xl mb-3">{skill.title}</h3>
                    <p class={`${darkMode() ? 'text-gray-300' : 'text-gray-600'}`}>{skill.text}</p>
                  </div>
                ))}
              </div>
              
              <div class="mt-8">
                <ExpandableText title="学習中の技術" darkMode={darkMode()}>
                  <p>現在はRustとWebAssemblyを重点的に学習しています。高パフォーマンスな分散型アプリケーション開発のために必要だと感じています。また、暗号技術とP2P通信についても理解を深めるため、関連書籍や論文を読んでいます。</p>
                </ExpandableText>
              </div>
            </section>
          </FadeIn>

          {/* Projects */}
          <FadeIn>
            <section>
              <h2 class={`text-3xl font-semibold mb-8 pb-2 ${darkMode() ? 'border-pink-500/50' : 'border-pink-700/50'} border-b-2`}>
                <span class={`${darkMode() ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-300' : 'text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-500'}`}>Projects</span>
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class={`${darkMode() ? 'bg-white/10' : 'bg-white/60'} backdrop-blur-md p-6 rounded-lg shadow-xl border ${darkMode() ? 'border-white/10' : 'border-gray-200'} transform transition-all duration-300 hover:scale-105 hover:rotate-1`}>
                  <div class="flex items-center mb-4">
                    <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-4">
                      <span class="text-2xl">💬</span>
                    </div>
                    <h3 class="text-xl font-medium">takos</h3>
                  </div>
                  <p class={`${darkMode() ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    分散型チャットSNS。Matrix のような分散型・暗号化機能と、LINE のような使いやすい UI/UX を目指しています。
                  </p>
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span class="px-2 py-1 rounded-full text-xs bg-purple-500/20 border border-purple-500/30">Deno</span>
                    <span class="px-2 py-1 rounded-full text-xs bg-blue-500/20 border border-blue-500/30">SolidJS</span>
                    <span class="px-2 py-1 rounded-full text-xs bg-green-500/20 border border-green-500/30">End-to-End暗号化</span>
                  </div>
                  <a href="https://github.com/tako0614/takos" class={`inline-flex items-center ${darkMode() ? 'text-purple-300 hover:text-purple-200' : 'text-purple-600 hover:text-purple-800'} transition-colors`}>
                    プロジェクトを見る <span class="ml-1">→</span>
                  </a>
                </div>
              </div>
              
              <div class="mt-8">
                <ExpandableText title="プロジェクト開発ポリシー" darkMode={darkMode()}>
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
              <h2 class={`text-3xl font-semibold mb-8 pb-2 ${darkMode() ? 'border-cyan-500/50' : 'border-cyan-700/50'} border-b-2`}>
                <span class={`${darkMode() ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-500'}`}>相互リンク</span>
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <For each={mutualLinks}>
                  {(link) => (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class={`${darkMode() ? 'bg-white/10 hover:bg-white/20' : 'bg-white/60 hover:bg-white/80'} backdrop-blur-md p-4 rounded-lg shadow-xl border ${darkMode() ? 'border-white/10' : 'border-gray-200'} transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 group`}
                    >
                      <div class="aspect-[2/1] mb-4 rounded-lg overflow-hidden bg-gray-200/50">
                        <img
                          src={link.banner}
                          alt={`${link.name}のバナー`}
                          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <h3 class="font-medium text-lg mb-2 group-hover:text-blue-400 transition-colors">
                        {link.name}
                      </h3>
                      <p class={`text-sm ${darkMode() ? 'text-gray-300' : 'text-gray-600'} line-clamp-2`}>
                        {link.description}
                      </p>
                      <div class="mt-3 flex items-center text-sm text-blue-400">
                        <span>サイトを見る</span>
                        <span class="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </a>
                  )}
                </For>
              </div>
              
              <div class="mt-8">
                <ExpandableText title="相互リンクについて" darkMode={darkMode()}>
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
              <h2 class={`text-3xl font-semibold mb-8 pb-2 ${darkMode() ? 'border-red-500/50' : 'border-red-700/50'} border-b-2`}>
                <span class={`${darkMode() ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-300' : 'text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500'}`}>Contact</span>
              </h2>
              
              <p class={`max-w-lg mx-auto mb-8 ${darkMode() ? 'text-gray-300' : 'text-gray-600'}`}>
                プロジェクトの共同開発や技術的な質問など、お気軽にご連絡ください。通常48時間以内に返信します。
              </p>
              
              <div class="flex flex-wrap justify-center gap-6">
                <a
                  href="https://line.me/ti/g2/Q0c8YJlkh5f_hkDuODxp39XF9A7BOCFqezaAHA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
                  class={`${darkMode() ? 'bg-white/10 hover:bg-white/20' : 'bg-white/60 hover:bg-white/80'} backdrop-blur-md px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center`}
                >
                  <span class="text-2xl mr-3">💬</span>
                  <span>OpenChat</span>
                </a>
                <a
                  href="https://github.com/tako0614"
                  class={`${darkMode() ? 'bg-white/10 hover:bg-white/20' : 'bg-white/60 hover:bg-white/80'} backdrop-blur-md px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center`}
                >
                  <span class="text-2xl mr-3">📂</span>
                  <span>GitHub</span>
                </a>
                <a
                  href="https://x.com/takoserver_com"
                  class={`${darkMode() ? 'bg-white/10 hover:bg-white/20' : 'bg-white/60 hover:bg-white/80'} backdrop-blur-md px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center`}
                >
                  <span class="text-2xl mr-3">🐦</span>
                  <span>Twitter・X</span>
                </a>
                <a
                  href="mailto:contact@tako.example.com"
                  class={`${darkMode() ? 'bg-white/10 hover:bg-white/20' : 'bg-white/60 hover:bg-white/80'} backdrop-blur-md px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center`}
                >
                  <span class="text-2xl mr-3">✉️</span>
                  <span>Email</span>
                </a>
              </div>
            </section>
          </FadeIn>
        </main>

        {/* フッター */}
        <FadeIn>
          <footer class={`text-center ${darkMode() ? 'text-gray-400' : 'text-gray-600'} mt-20 border-t pt-8 ${darkMode() ? 'border-gray-600' : 'border-gray-300'}`}>
            <div class="max-w-4xl mx-auto">
              <p class="text-sm mb-4">
                このサイトはSolidJS & Tailwind CSSで構築され、Deno Deployでホスティングされています。
                ソースコードは<a href="https://github.com/tako0614/info.takos.jp" class={`${darkMode() ? 'text-blue-300' : 'text-blue-600'} hover:underline`}>GitHub</a>で公開しています。
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
