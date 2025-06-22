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
 * ModernParticles コンポーネント
 * CSS-in-JSとより美しいグラデーション効果を使った現代的な粒子システム
 */
const ModernParticles: Component<{ darkMode: boolean }> = (props) => {
  const particleCount = 20;
  let containerRef!: HTMLDivElement;

  onMount(() => {
    const container = containerRef;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    for (let i = 0; i < particleCount; i++) {
      createModernParticle(container, width, height, props.darkMode);
    }
  });

  createEffect(() => {
    if (containerRef) {
      containerRef.innerHTML = '';
      const width = containerRef.offsetWidth;
      const height = containerRef.offsetHeight;
      
      for (let i = 0; i < particleCount; i++) {
        createModernParticle(containerRef, width, height, props.darkMode);
      }
    }
  });

  function createModernParticle(container: HTMLDivElement, width: number, height: number, isDark: boolean) {
    const particle = document.createElement('div');
    const size = Math.random() * 8 + 3;
    
    // モダンなグラデーション配色
    const gradients = isDark 
      ? [
          'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(59, 130, 246, 0.3))',
          'linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(168, 85, 247, 0.3))',
          'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(34, 197, 94, 0.3))',
          'linear-gradient(135deg, rgba(251, 146, 60, 0.3), rgba(239, 68, 68, 0.3))'
        ]
      : [
          'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(59, 130, 246, 0.15))',
          'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(168, 85, 247, 0.15))',
          'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(34, 197, 94, 0.15))',
          'linear-gradient(135deg, rgba(251, 146, 60, 0.15), rgba(239, 68, 68, 0.15))'
        ];
    
    particle.className = `absolute rounded-full backdrop-blur-sm border border-white/10`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * width}px`;
    particle.style.top = `${Math.random() * height}px`;
    particle.style.background = gradients[Math.floor(Math.random() * gradients.length)];
    particle.style.boxShadow = isDark 
      ? '0 0 20px rgba(168, 85, 247, 0.2)' 
      : '0 0 15px rgba(168, 85, 247, 0.1)';
    
    const duration = Math.random() * 40 + 25;
    particle.style.animation = `
      modernFloat ${duration}s infinite ease-in-out,
      modernPulse ${(Math.random() * 4) + 3}s infinite ease-in-out ${Math.random() * 3}s
    `;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    
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
 * ModernBackgroundEffect コンポーネント
 * より洗練されたモダンな背景エフェクト
 */
const ModernBackgroundEffect: Component<{ darkMode: boolean }> = (props) => {
  return (
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* メインのグラデーション背景 */}
      <div 
        class={`absolute w-full h-full ${
          props.darkMode 
            ? 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-800' 
            : 'bg-gradient-to-br from-blue-50 via-indigo-50/80 to-purple-100'
        }`}
      ></div>
      
      {/* 動的なグラデーションオーバーレイ */}
      <div 
        class={`absolute w-full h-full opacity-30 ${
          props.darkMode 
            ? 'bg-gradient-to-r from-purple-600/10 via-transparent to-blue-600/10' 
            : 'bg-gradient-to-r from-purple-300/20 via-transparent to-blue-300/20'
        }`}
        style={{
          animation: 'gradientShift 20s ease-in-out infinite alternate'
        }}
      ></div>
        {/* メッシュグラデーション効果 */}
      <div 
        class="absolute inset-0 opacity-20"
        style={{
          "background-image": props.darkMode 
            ? `radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
               radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
               radial-gradient(circle at 75% 25%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
               radial-gradient(circle at 25% 75%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)`
            : `radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.05) 0%, transparent 50%),
               radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
               radial-gradient(circle at 75% 25%, rgba(236, 72, 153, 0.05) 0%, transparent 50%),
               radial-gradient(circle at 25% 75%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)`
        }}
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
}> = (props) => {
  const [expanded, setExpanded] = createSignal(props.initiallyExpanded || false);
  return (
    <div class={`glass-card-dark p-8 rounded-3xl relative overflow-hidden ${props.class}`}>
      <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
      <div class="relative z-10">
        <div 
          class="flex justify-between items-center cursor-pointer group" 
          onClick={() => setExpanded(!expanded())}
        >
          <h3 class="text-xl font-semibold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">{props.title}</h3>
          <span class="text-2xl transition-transform duration-500" 
            style={{ transform: expanded() ? "rotate(180deg)" : "rotate(0deg)" }}>
            ▼
          </span>
        </div>
        <Show when={expanded()}>
          <div class="mt-6 text-gray-200 leading-relaxed">
            {props.children}
          </div>
        </Show>
      </div>
    </div>
  );
};

/**
 * qaData - Q&Aデータの定義
 * ARHudOverlayとInteractiveQAの両方で使用
 */
const qaData = {
    "個人情報": {
      icon: "👤",
      color: "from-blue-500 to-cyan-500",
      questions: {
        "基本プロフィール": {
          content: "冨山翔太、16歳、大阪府生野区在住の高校2年生です。大阪府立清水谷高等学校に通っています。プログラミングに熱中している典型的な理系高校生で、将来は起業家・実業家を目指しています。"
        },
        "趣味・嗜好": {
          content: "プログラミングが最大の趣味で、それ以外にはアニメや漫画を楽しんでいます。特に「お兄ちゃんはおしまい！」が好きです。食べ物は寿司、飲み物はコーラ・サイダー・コーヒーを好みます。"
        },
        "政治的立場": {
          content: "日本維新の会、国民民主党、日本保守党を支持しています。既得権益の打破と日本の再興を願っており、テクノロジーによる社会改革に期待しています。"
        }
      }
    },
    "技術・スキル": {
      icon: "💻",
      color: "from-purple-500 to-pink-500",
      questions: {
        "フロントエンド": {
          content: "Preact、SolidJS、Tailwind CSSを主に使用しています。モダンなReactiveフレームワークを好み、特にSolidJSの性能と開発体験を評価しています。UIデザインにもこだわりがあります。"
        },
        "バックエンド": {
          content: "Node.js、Deno、PHP、Laravel、Honoを扱えます。最近はDenoに注力しており、TypeScript-firstな開発環境を構築しています。API設計やデータベース設計も得意分野です。"
        },
        "インフラ・DevOps": {
          content: "Proxmox、Kubernetes、Linuxでのサーバー管理経験があります。Docker、Git、Deno Deployを使った自動化にも取り組んでいます。自宅ラボでインフラ実験も行っています。"
        },
        "学習中の技術": {
          content: "現在はRustとWebAssemblyを重点的に学習中です。高パフォーマンスな分散型アプリケーション開発のために必要だと考えており、暗号技術やP2P通信についても研究しています。"
        }
      }
    },
    "哲学・思想": {
      icon: "💭",
      color: "from-orange-500 to-red-500",
      questions: {
        "基本的な世界観": {
          content: "ニーチェの超人思想に強く影響を受けており、「人間が自らの力で新しい価値を創造し、より高い段階の存在へと進化する」という考えに共感しています。既存の価値観にとらわれず、自分で道を切り開いていく姿勢を大切にしています。"
        },
        "実存主義への関心": {
          content: "サルトルやカミュの思想から「実存は本質に先立つ」という教えに影響を受けています。自分を定義するのは他者でも社会でもなく、自分自身の行動と選択であるという強い信念を持っています。"
        },
        "テクノロジー観": {
          content: "テクノロジーの発展は創造と自由の精神を具現化する手段だと捉えています。コードを書くことは新しい価値を生み出す行為そのものであり、開発という行為自体が自己表現の一種だと考えています。"
        },
        "人生哲学": {
          content: "「自分の努力不足を開発者に転嫁するな」「思想がない人に価値はない」「手段はどうあれ勝ったやつが勝ち」という信念を持っています。常に自らの思想を持ち、野心に正直に生きていきたいです。"
        }
      }
    },
    "プロジェクト・開発": {
      icon: "🚀",
      color: "from-green-500 to-teal-500",
      questions: {
        "takosプロジェクト": {
          content: "分散型チャットSNS「takos」を開発中です。Matrixのような分散型・暗号化機能とLINEのような使いやすいUI/UXの融合を目指しています。Deno + SolidJSで構築し、End-to-End暗号化を実装予定です。"
        },
        "開発ポリシー": {
          content: "シンプルと機能性の両立を最重視しています。便利さとプライバシーは両立できると信じており、きれいなコード構造と十分なドキュメントで長期的な保守性を確保することを心がけています。"
        },
        "アイデアの源泉": {
          content: "プロジェクトのアイデアは日常生活の中での不便さや課題から生まれることが多いです。自分自身が本当に必要だと感じるものを作ることで、開発のモチベーションを維持しています。"
        }
      }
    },
    "将来・ビジョン": {
      icon: "🌟",
      color: "from-indigo-500 to-purple-500",
      questions: {
        "短期目標（5年以内）": {
          content: "技術スキルを磨きながら、自分のプロジェクトの規模を拡大していきたいです。高校卒業後は大学で情報科学と経営学を学びつつ、スタートアップの立ち上げも視野に入れています。"
        },
        "中期目標（10年以内）": {
          content: "自分がリードするチームを持ち、分散型システムやプライバシー保護技術の分野で世界的にも認められるサービスを世に送り出すことを目標としています。オープンソースコミュニティへの貢献も続けたいです。"
        },
        "最終目標": {
          content: "不老不死を実現することです。AIの進歩により近い将来それが可能になると考え、上級国民になることでいち早くその恩恵を受けようと目論んでいます。また、日本を再び強国にすることも目指しています。"
        },
        "社会への貢献": {
          content: "テクノロジーの力で世界を変えていきたいと考えており、特に既得権益の破壊と分散型システムによる権力の民主化に興味があります。自分の会社を通じて社会課題の解決に取り組みたいです。"
        }
      }
    },
    "日常・ライフスタイル": {
      icon: "🏠",
      color: "from-pink-500 to-rose-500",
      questions: {
        "平日のスケジュール": {
          content: "学校が終わった後は予備校に通い、9時まで勉強しています。帰宅後は2時まで主にtakosの開発に取り組んでいます。勉強と開発のバランスを保ちながら、両方に全力で取り組んでいます。"
        },
        "休日の過ごし方": {
          content: "休日は主にtakosの開発に集中しています。開発が一段落したら、土日も予備校に通うことを検討しています。時間があるときはアニメを見たり、技術書を読んだりしてリフレッシュしています。"
        },
        "学習スタイル": {
          content: "実践重視の学習スタイルです。新しい技術は実際にプロジェクトで使ってみることで身につけています。関連書籍や論文も積極的に読み、理論と実践の両面から理解を深めるよう心がけています。"
        }
      }
    }};

/**
 * InteractiveQA コンポーネント
 * ユーザーが知りたい情報を選択形式で表示
 */
const InteractiveQA: Component = () => {
  const [selectedCategory, setSelectedCategory] = createSignal<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = createSignal<string | null>(null);

  const resetSelection = () => {
    setSelectedCategory(null);
    setSelectedQuestion(null);
  };

  return (
    <div class="space-y-8">
      {/* カテゴリ選択 */}      <Show when={!selectedCategory()}>
        <div>
          <h3 class="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-center text-gray-200">
            たこ索引
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <For each={Object.entries(qaData)}>
              {([category, data]) => (
                <button
                  onClick={() => setSelectedCategory(category)}
                  class="group glass-card-dark p-3 md:p-6 rounded-2xl md:rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 text-left relative overflow-hidden"
                >
                  <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="relative z-10">
                    <div class={`w-8 h-8 md:w-12 lg:w-16 md:h-12 lg:h-16 mb-2 md:mb-4 rounded-xl md:rounded-2xl flex items-center justify-center bg-gradient-to-br ${data.color} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <span class="text-lg md:text-2xl lg:text-3xl">{data.icon}</span>
                    </div>
                    <h4 class="font-bold text-sm md:text-base lg:text-lg text-gray-200 leading-tight">
                      {category}
                    </h4>
                    <p class="text-xs md:text-sm mt-1 md:mt-2 text-gray-400">
                      {Object.keys(data.questions).length}個の質問
                    </p>
                  </div>
                </button>
              )}
            </For>
          </div>
        </div>
      </Show>      {/* 質問選択 */}
      <Show when={selectedCategory() && !selectedQuestion()}>
        <div>
          <div class="flex items-center mb-3 md:mb-4">
            <button
              onClick={resetSelection}
              class={`mr-2 md:mr-3 p-2 rounded-lg md:rounded-xl glass-button-dark transition-all duration-300 hover:scale-110`}
            >
              <span class="text-base md:text-lg">←</span>
            </button>
            <h3 class={`text-base md:text-lg lg:text-2xl font-bold text-gray-200`}>
              📋 {selectedCategory()} に関する質問
            </h3>
          </div>
          <div class="grid grid-cols-1 gap-2 md:gap-3">
            <For each={Object.entries((qaData as any)[selectedCategory()!].questions)}>
              {([question, _]) => (
                <button
                  onClick={() => setSelectedQuestion(question)}
                  class={`group glass-effect-dark p-3 md:p-4 rounded-xl md:rounded-2xl transform transition-all duration-500 hover:scale-105 text-left relative overflow-hidden`}
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="relative z-10">
                    <h5 class={`font-semibold text-sm md:text-base text-gray-200`}>
                      {question}
                    </h5>
                    <span class={`text-xs text-gray-400 flex items-center mt-1 md:mt-2`}>
                      <span class="mr-1">👁️</span>
                      タップして詳細を見る
                    </span>
                  </div>
                </button>
              )}
            </For>
          </div>
        </div>
      </Show>

      {/* 回答表示 */}
      <Show when={selectedCategory() && selectedQuestion()}>        <div>
          <div class="flex items-center mb-3 md:mb-4">
            <button
              onClick={() => setSelectedQuestion(null)}
              class={`mr-2 md:mr-3 p-2 rounded-lg md:rounded-xl glass-button-dark transition-all duration-300 hover:scale-110`}
            >
              <span class="text-base md:text-lg">←</span>
            </button>
            <div>
              <h3 class={`text-base md:text-lg lg:text-2xl font-bold text-gray-200`}>
                💡 {selectedQuestion()}
              </h3>
              <p class={`text-xs text-gray-400`}>
                📂 {selectedCategory()}
              </p>
            </div>
          </div>
          <div class={`glass-card-dark p-4 md:p-6 lg:p-10 rounded-2xl md:rounded-3xl relative overflow-hidden`}>
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl md:rounded-3xl"></div>
            <div class="relative z-10">
              <p class={`text-gray-200 leading-relaxed text-sm md:text-base lg:text-lg`}>
                {(qaData as any)[selectedCategory()!].questions[selectedQuestion()!].content}
              </p>
              <div class="mt-4 md:mt-6 flex flex-col sm:flex-row gap-2 md:gap-3">
                <button
                  onClick={() => setSelectedQuestion(null)}
                  class={`glass-button-dark px-3 md:px-4 py-2 rounded-lg md:rounded-xl transition-all duration-300 font-semibold hover:scale-105 text-sm md:text-base`}
                >
                  他の質問を見る
                </button>
                <button
                  onClick={resetSelection}
                  class={`glass-button-dark px-3 md:px-4 py-2 rounded-lg md:rounded-xl transition-all duration-300 font-semibold hover:scale-105 relative overflow-hidden text-sm md:text-base`}
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg md:rounded-xl"></div>
                  <span class="relative z-10">カテゴリに戻る</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
};

/**
 * AR風HUDオーバーレイコンポーネント
 * PC版のみで表示される近未来的なUI
 */
const ARHudOverlay: Component = () => {
  const [currentTime, setCurrentTime] = createSignal(new Date());  const [isMinimized, setIsMinimized] = createSignal(false);
  const [selectedTakoIndex, setSelectedTakoIndex] = createSignal<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = createSignal<string | null>(null);

  // 時間更新
  onMount(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    onCleanup(() => clearInterval(interval));
  });  // デバイス判定（PC版のみ表示）
  const [isDesktop, setIsDesktop] = createSignal(typeof window !== 'undefined' ? window.innerWidth >= 1024 : false);
  const [windowSize, setWindowSize] = createSignal({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 1920, 
    height: typeof window !== 'undefined' ? window.innerHeight : 1080 
  });
  
  onMount(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isDesktopDevice = width >= 1024;
      console.log(`AR HUD Debug: Window width: ${width}px, isDesktop: ${isDesktopDevice}`);
      setIsDesktop(isDesktopDevice);
      setWindowSize({ width, height });
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    onCleanup(() => window.removeEventListener('resize', checkDevice));  });
  // User Agent 情報の初期解析
  function parseUA(ua: string) {
    let browser = 'Unknown';
    let os = 'Unknown';
    let device = 'Desktop';
    
    if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
    else if (ua.includes('Edg')) browser = 'Edge';
    else if (ua.includes('Opera')) browser = 'Opera';

    if (ua.includes('Windows NT')) {
      const match = ua.match(/Windows NT (\d+\.\d+)/);
      const version = match ? match[1] : '';
      const versions: Record<string,string> = { '10.0':'10/11','6.3':'8.1','6.2':'8','6.1':'7' };
      os = version && versions[version] ? `Win${versions[version]}` : 'Windows';
    } else if (ua.includes('Mac OS X')) {
      const m = ua.match(/Mac OS X (\d+_\d+)/);
      os = m ? `macOS ${m[1].replace('_','.')} ` : 'macOS';
    } else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) {
      const m = ua.match(/Android (\d+)/);
      os = m ? `Android ${m[1]}` : 'Android';
    } else if (ua.includes('iPhone')||ua.includes('iPad')) {
      const m = ua.match(/OS (\d+_\d+)/);
      os = m ? `iOS ${m[1].replace('_','.')}` : 'iOS';
    }

    if (ua.includes('Mobile')|| ua.includes('Android')) device = 'Mobile';
    else if (ua.includes('Tablet')||ua.includes('iPad')) device = 'Tablet';

    let memory = 'N/A';
    if ('deviceMemory' in navigator) memory = `${(navigator as any).deviceMemory}GB`;
    
    return { browser, os, device, memory };
  }

  // その他システム情報取得
  function getSystem() {
    let connection = 'Unknown';
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      if (conn?.effectiveType) connection = conn.effectiveType.toUpperCase();
    }
    return {
      connection,
      cookieEnabled: navigator.cookieEnabled,
      language: navigator.language,
      platform: navigator.platform
    };
  }

  // シグナル初期化
  const [userAgentInfo] = createSignal(parseUA(navigator.userAgent));
  const [systemInfo] = createSignal(getSystem());

  // ウィンドウリサイズのみ再評価
  onMount(() => {
    const checkDevice = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setWindowSize({ width:w, height:h });
    };
    checkDevice(); window.addEventListener('resize', checkDevice);
    onCleanup(() => window.removeEventListener('resize', checkDevice));
  });
  // スクロール進捗を取得
  const [scrollProgress, setScrollProgress] = createSignal(0);
  onMount(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };
    window.addEventListener('scroll', handleScroll);
    onCleanup(() => window.removeEventListener('scroll', handleScroll));
  });

  // たこ索引データ（簡略版）
  const takoIndexData = {
    "個人情報": ["基本プロフィール", "趣味・嗜好", "政治的立場"],
    "技術・スキル": ["フロントエンド", "バックエンド", "インフラ・DevOps", "学習中の技術"],
    "哲学・思想": ["基本的な世界観", "実存主義への関心", "テクノロジー観", "人生哲学"],
    "プロジェクト・開発": ["takosプロジェクト", "開発ポリシー", "アイデアの源泉"],
    "将来・ビジョン": ["短期目標", "中期目標", "最終目標", "社会への貢献"],
    "日常・ライフスタイル": ["平日のスケジュール", "休日の過ごし方", "学習スタイル"]
  };  // HUDセクション - たこ索引がメイン
  const mainHudSection = {
    "たこ索引": {
      icon: "🐙",
      data: Object.entries(takoIndexData).map(([category, items]) => ({
        label: category,
        value: `${items.length}項目`,
        color: "text-purple-400",
        category: category,
        items: items
      }))
    }
  };

  // 個別オーバーレイ用のセクション
  const systemInfoSection = {
    icon: "⚡",
    data: [
      { label: "ブラウザ", value: userAgentInfo().browser, color: "text-blue-400" },
      { label: "OS", value: userAgentInfo().os, color: "text-green-400" },
      { label: "デバイス", value: userAgentInfo().device, color: "text-cyan-400" },
      { label: "解像度", value: `${windowSize().width}x${windowSize().height}`, color: "text-yellow-400" }
    ]
  };

  const networkInfoSection = {
    icon: "🌐",
    data: [
      { label: "接続", value: systemInfo().connection, color: "text-green-400" },
      { label: "言語", value: systemInfo().language, color: "text-blue-400" },
      { label: "Cookie", value: systemInfo().cookieEnabled ? "有効" : "無効", color: systemInfo().cookieEnabled ? "text-green-400" : "text-red-400" },
      { label: "メモリ", value: userAgentInfo().memory, color: "text-purple-400" }
    ]
  };

  const performanceSection = {
    icon: "📊",
    data: [
      { label: "スクロール進捗", value: `${Math.round(scrollProgress())}%`, color: "text-orange-400" },
      { label: "AR_HUD", value: "ACTIVE", color: "text-cyan-400" },
      { label: "フレーム", value: "60FPS", color: "text-green-400" }
    ]  };

  console.log('AR HUD Debug: isDesktop =', isDesktop());

  if (!isDesktop()) {
    return <></>
  }

  return (
    <div class="fixed inset-0 pointer-events-none z-50 overflow-hidden">      {/* デバッグ情報 */}
      <div class="absolute top-4 left-4 bg-black/80 text-green-400 p-2 rounded text-xs font-mono pointer-events-auto">
        AR HUD ACTIVE | {windowSize().width}x{windowSize().height}
      </div>
      
      {/* メインHUDパネル - 右上 */}      <div class={`absolute top-4 right-4 transition-all duration-700 ${isMinimized() ? 'transform translate-x-80' : ''}`}>        <div 
          class="ar-hud-panel p-6 w-80"
          style={{
            background: 'rgba(0, 20, 40, 0.25)',
            'backdrop-filter': 'blur(25px)',
            border: '2px solid rgba(0, 255, 255, 0.4)',
            'border-radius': '16px',
            'box-shadow': '0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* 発光効果のためのオーバーレイ */}
          <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 rounded-2xl"></div>
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 opacity-60"></div>
          
          <div class="relative z-10">
            {/* ヘッダー */}
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-4 h-4 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
                <span class="text-cyan-300 text-base font-mono font-bold tracking-wide drop-shadow-lg">TAKO_INDEX_v2.0</span>
              </div>
              <button 
                onClick={() => setIsMinimized(!isMinimized())}
                class="pointer-events-auto text-gray-300 hover:text-cyan-400 transition-colors text-lg"
              >
                {isMinimized() ? '◀' : '▶'}
              </button>
            </div>

            {/* 時間表示 */}
          <div class="mb-6 text-center">
            <div class="text-2xl font-mono text-white mb-1">
              {currentTime().toLocaleTimeString('ja-JP', { hour12: false })}
            </div>
            <div class="text-sm text-gray-400 font-mono">
              {currentTime().toLocaleDateString('ja-JP', { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit',
                weekday: 'short'
              })}
            </div>
            <div class="text-xs text-purple-400 font-mono mt-1">
              JST+09:00 | TAKO_TIME
            </div>          </div>

          {/* たこ索引セクション - 常に展開 */}
          <div class="space-y-3">
            <For each={Object.entries(mainHudSection)}>
              {([sectionName, section]) => (
                <div class="ar-hud-section pointer-events-auto">
                  <div class="flex items-center justify-between p-3 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent rounded-lg">
                    <div class="flex items-center space-x-3">
                      <span class="text-xl drop-shadow-lg">{section.icon}</span>
                      <span class="text-cyan-200 text-base font-bold tracking-wide drop-shadow-lg">{sectionName}</span>
                    </div>
                    <div class="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/50"></div>
                  </div>
                  
                  <div class="mt-3 pl-6 space-y-3 border-l-2 border-cyan-400/50">
                    <For each={section.data}>
                      {(item: any) => (
                        <div 
                          class={`flex justify-between items-center text-sm ${
                            item.category ? 'cursor-pointer hover:bg-cyan-500/20 p-2 rounded-lg transition-all duration-300 border border-transparent hover:border-cyan-400/30' : 'p-2'
                          }`}
                          onClick={() => item.category && setSelectedTakoIndex(
                            selectedTakoIndex() === item.category ? null : item.category
                          )}
                        >
                          <span class="text-gray-200 font-medium">{item.label}</span>
                          <span class={`${item.color} font-mono font-bold drop-shadow-sm`}>{item.value}</span>
                        </div>
                      )}
                    </For>
                  </div>
                </div>
              )}
            </For>
          </div>
          </div>
        </div>
      </div>      {/* たこ索引詳細パネル */}
      <Show when={selectedTakoIndex()}>
        <div class="absolute top-4 right-96 w-80">
          <div 
            class="ar-hud-panel p-5"
            style={{
              background: 'rgba(10, 25, 50, 0.3)',
              'backdrop-filter': 'blur(25px)',
              border: '2px solid rgba(168, 85, 247, 0.4)',
              'border-radius': '16px',
              'box-shadow': '0 0 25px rgba(168, 85, 247, 0.3), inset 0 0 15px rgba(168, 85, 247, 0.1)',
            }}
          >
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 rounded-2xl"></div>
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 opacity-60"></div>
            
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-purple-300 text-base font-mono font-bold tracking-wide drop-shadow-lg">{selectedTakoIndex()}</h3>
                <button 
                  onClick={() => {
                    setSelectedTakoIndex(null);
                    setSelectedQuestion(null);
                  }}
                  class="pointer-events-auto text-gray-300 hover:text-purple-400 text-sm transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* 質問が選択されていない場合：質問一覧を表示 */}
              <Show when={!selectedQuestion()}>
                <div class="space-y-3">
                  <For each={Object.keys((qaData as any)[selectedTakoIndex()!]?.questions || {})}>
                    {(questionTitle: string) => (
                      <div 
                        class="text-sm text-gray-200 p-3 rounded-lg bg-purple-900/20 hover:bg-purple-500/20 transition-all duration-300 pointer-events-auto cursor-pointer border border-purple-500/20 hover:border-purple-400/40"
                        onClick={() => {
                          console.log(`ARHud: Clicked question "${questionTitle}" in category "${selectedTakoIndex()}"`);
                          setSelectedQuestion(questionTitle);
                        }}
                      >
                        <div class="flex items-center space-x-2">
                          <span class="text-purple-400">•</span>
                          <span>{questionTitle}</span>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </Show>
              
              {/* 質問が選択されている場合：回答を表示 */}
              <Show when={selectedQuestion()}>
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <h4 class="text-cyan-300 text-sm font-mono font-bold">{selectedQuestion()}</h4>
                    <button 
                      onClick={() => setSelectedQuestion(null)}
                      class="pointer-events-auto text-gray-300 hover:text-cyan-400 text-sm transition-colors"
                    >
                      ← 戻る
                    </button>
                  </div>
                  <div class="text-sm text-gray-200 leading-relaxed p-4 rounded-lg bg-cyan-900/20 border border-cyan-500/30">
                    {(() => {
                      const category = selectedTakoIndex();
                      const question = selectedQuestion();
                      if (!category || !question) return "カテゴリまたは質問が選択されていません";
                      
                      const categoryData = (qaData as any)[category];
                      if (!categoryData) return `カテゴリ "${category}" が見つかりません`;
                      
                      const questionData = categoryData.questions?.[question];
                      if (!questionData) return `質問 "${question}" が見つかりません`;
                      
                      return questionData.content || "回答内容が設定されていません";
                    })()}
                  </div>
                </div>
              </Show>
            </div>
          </div>
        </div>
      </Show>



      {/* システム情報オーバーレイ - 左上 */}
      <div class="absolute top-20 left-4">
        <div class="ar-hud-panel p-4 w-64">
          <div class="flex items-center mb-3">
            <span class="text-lg mr-2">{systemInfoSection.icon}</span>
            <span class="text-cyan-400 text-sm font-mono">SYSTEM_INFO</span>
          </div>
          <div class="space-y-2">
            <For each={systemInfoSection.data}>
              {(item) => (
                <div class="flex justify-between items-center text-xs">
                  <span class="text-gray-300">{item.label}</span>
                  <span class={`${item.color} font-mono`}>{item.value}</span>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>

      {/* ネットワーク情報オーバーレイ - 左中央 */}
      <div class="absolute top-80 left-4">
        <div class="ar-hud-panel p-4 w-64">
          <div class="flex items-center mb-3">
            <span class="text-lg mr-2">{networkInfoSection.icon}</span>
            <span class="text-cyan-400 text-sm font-mono">NETWORK_INFO</span>
          </div>
          <div class="space-y-2">
            <For each={networkInfoSection.data}>
              {(item) => (
                <div class="flex justify-between items-center text-xs">
                  <span class="text-gray-300">{item.label}</span>
                  <span class={`${item.color} font-mono`}>{item.value}</span>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>      {/* パフォーマンス情報オーバーレイ - 右下（スクロールプログレスの上） */}
      <div class="absolute bottom-32 right-4">
        <div class="ar-hud-panel p-4 w-48">
          <div class="flex items-center mb-3">
            <span class="text-lg mr-2">{performanceSection.icon}</span>
            <span class="text-cyan-400 text-xs font-mono">PERFORMANCE</span>
          </div>
          <div class="space-y-2">
            <For each={performanceSection.data}>
              {(item) => (
                <div class="flex justify-between items-center text-xs">
                  <span class="text-gray-300">{item.label}</span>
                  <span class={`${item.color} font-mono`}>{item.value}</span>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>

      {/* サイドパネル - 左端 */}
 
      {/* ボトムバー */}
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div class="ar-hud-panel px-8 py-3">
          <div class="flex items-center space-x-6 text-sm">
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span class="text-green-400 font-mono">CONNECTED</span>
            </div>
            <div class="text-gray-400 font-mono">
              protocol://info.takos.jp
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-purple-400">🐙</span>
              <span class="text-purple-400 font-mono">AR_MODE_ACTIVE</span>
            </div>
            <div class="text-cyan-400 font-mono">
              BUILD: {new Date().getFullYear()}.{(new Date().getMonth() + 1).toString().padStart(2, '0')}.{new Date().getDate().toString().padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* ミニマップ/プログレス - 右下 */}
      <div class="absolute bottom-4 right-4">
        <div class="ar-hud-panel p-4 w-48">
          <div class="text-center mb-3">
            <span class="text-cyan-400 text-xs font-mono">SCROLL_MATRIX</span>
          </div>
          <div class="w-full bg-gray-700/50 rounded-full h-2 mb-3">
            <div class="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full transition-all duration-300" 
                 style={{ width: `${scrollProgress()}%` }}></div>
          </div>
          <div class="grid grid-cols-3 gap-1 text-xs text-gray-400 font-mono">
            <div class={`text-center ${scrollProgress() < 33 ? 'text-cyan-400' : ''}`}>TOP</div>
            <div class={`text-center ${scrollProgress() >= 33 && scrollProgress() < 66 ? 'text-cyan-400' : ''}`}>MID</div>
            <div class={`text-center ${scrollProgress() >= 66 ? 'text-cyan-400' : ''}`}>END</div>
          </div>
          <div class="text-center mt-2 text-xs text-purple-400 font-mono">
            {Math.round(scrollProgress())}% COMPLETE
          </div>
        </div>
      </div>

      {/* スキャンライン効果 */}
      <div class="fixed inset-0 pointer-events-none">
        <div class="scan-line"></div>
      </div>

      {/* データストリーム効果 */}
      <div class="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div class="absolute top-10 left-10 text-green-400/20 text-xs font-mono animate-pulse">
          010101110101001010<br/>
          110010101011101010<br/>
          101010011010101101
        </div>
      </div>
    </div>
  );
};

const App: Component = () => {  // アイコンクリック時のアニメーション状態（トグル）
  const [rotate, setRotate] = createSignal(false);
  const [takoInstances, setTakoInstances] = createSignal<{ id: number }[]>([]);

  const addTako = () => {
    setTakoInstances([...takoInstances(), { id: Date.now() }]);
  };
  const quotes = [
    "自分の努力不足を開発者に転嫁するな",
    "思想がない人に価値はない",
    "手段はどうあれ勝ったやつが勝ち",
    
  ];
  const [quote, setQuote] = createSignal(quotes[Math.floor(Math.random() * quotes.length)]);
  
  // quoteクリック時に新しい名言を表示する関数
  const nextQuote = () => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

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

  return (    <div class="min-h-screen relative overflow-hidden transition-all duration-700 bg-gradient-to-br from-slate-900 via-gray-900 to-black">      {/* モダンなアニメーション要素 */}
      <ModernParticles darkMode={true} />
      <ModernBackgroundEffect darkMode={true} />      {/* TakoAnimationコンポーネントを<For>でレンダリング */}
      <For each={takoInstances()}>
        {(tako) => <TakoAnimation id={tako.id} onClick={addTako} />}
      </For>

      {/* AR HUDオーバーレイ */}
      <ARHudOverlay />      {/* 美しいガラスエフェクトのたこ追加ボタン */}
      <button
        onClick={addTako}
        class="fixed bottom-4 left-4 z-50 glass-card-dark p-4 rounded-3xl transition-all duration-500 hover:scale-110 hover:rotate-12 text-white overflow-hidden group shadow-2xl"
        title="たこを増やす"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-pink-500/40 to-purple-500/40 rounded-3xl group-hover:from-pink-400/50 group-hover:to-purple-400/50 transition-all duration-300"></div>        <div class="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-blue-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span class="text-2xl relative z-10 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">🐙+</span>
        <div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 transform -translate-x-full"></div>
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
        <FadeIn class="text-center py-16">          <div
            class={`w-36 h-36 mx-auto mb-6 border-4 border-white rounded-full overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-110 hover:rotate-3 cursor-pointer ${
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
          <h1 class="text-6xl font-extrabold mb-4 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">たこ</h1>
          <p class="text-xl text-gray-300">real name: Tomiyama Shota</p>
            {/* リアルなガラスエフェクトのクォートセクション */}          <div 
            class="mt-6 p-6 rounded-3xl glass-effect-dark cursor-pointer transition-all duration-500 hover:scale-105 max-w-md mx-auto relative overflow-hidden"
            onClick={nextQuote}
          >
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl"></div>
            <div class="relative z-10">
              <p class="text-sm italic text-gray-200 font-medium">
                "{quote()}"
              </p>
              <p class="text-xs mt-3 text-gray-400 flex items-center justify-center">
                <span class="mr-1">✨</span>
                クリックで名言を変更
              </p>
            </div>
          </div>
          
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
          </div>        </FadeIn>        {/* インタラクティブな質問選択機能 - モバイル専用セクション */}
        <FadeIn>
          <section class="max-w-6xl mx-auto mb-16 lg:hidden px-4">
            <div class="glass-card-dark p-4 md:p-6 rounded-2xl md:rounded-3xl relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl md:rounded-3xl"></div>
              <div class="relative z-10">
                <div class="text-center mb-4 md:mb-6">
                  <h2 class="text-xl md:text-2xl font-bold text-cyan-400 mb-2">🐙 たこ索引</h2>
                  <p class="text-xs md:text-sm text-gray-400">タップして詳しい情報を見る</p>
                </div>
                <InteractiveQA />
              </div>
            </div>
          </section>
        </FadeIn>

        <main class="max-w-4xl mx-auto space-y-20">
          {/* About Me - 拡張セクション */}
            <section>
              <h2 class={`text-3xl font-semibold mb-8 pb-2 border-purple-500/50 border-b-2`}>
                <span class={`text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300`}>About Me</span>
              </h2>
              
              <div class="space-y-6">
                <p class={`text-gray-200 leading-relaxed text-lg`}>
                  はじめまして、たこです。プログラミングばっかしている高校生です。プログラミングが好きで、主にWeb開発をしています。最近はtakosという次世代のLINEを目指したプロジェクトを進めています。
                </p>
                

                  <ExpandableText title="私のビジョン" initiallyExpanded={true}>
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

                  <ExpandableText title="私の哲学と価値観" initiallyExpanded={true}>
                  <p>私は中学生の頃、哲学者の考えを調べて自分に反映することにハマって今の正確の形成に大きく関与したと思っています。</p>
                  <p class="mt-4">特に影響を受けたのは、ニーチェの考え方です。彼の思想である、「人間が自らの力で新しい価値を創造し、より高い段階の存在へと進化しようとする超人思想」はとても共感しています。</p>
                  <p class="mt-4">また、実存主義にも関心があり、サルトルやカミュの思想から「実存は本質に先立つ」という教えに影響を受けています。これは、自分を定義するのは他者でも社会でもなく、自分自身の行動と選択であるという強い信念につながっています。</p>
                  <p class="mt-4">テクノロジーの発展は、まさにこの創造と自由の精神を具現化する手段だと捉えており、コードを書くことは私にとって新しい価値を生み出す行為そのものです。開発という行為自体が自己表現の一種だと考えています。</p>                  <p class="mt-4">私は常に自らの思想を持ち、自らの野心に正直に生きていきたいです</p>
                </ExpandableText>
              </div>
            </section>
          {/* Status */}
          <FadeIn>
            <section>
              <h2 class={`text-3xl font-semibold mb-8 pb-2 border-blue-500/50 border-b-2`}>
                <span class={`text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300`}>Status</span>
              </h2>              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class={`group glass-card-dark p-10 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1 relative overflow-hidden`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div class="relative z-10 space-y-6">
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                        <span class="text-2xl">👤</span>
                      </div>
                      <div>
                        <h3 class="font-semibold text-lg">Name</h3>
                        <p class={`text-gray-300`}>
                          冨山 翔太 (Tomiyama Shota)
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                        <span class="text-2xl">🎂</span>
                      </div>
                      <div>
                        <h3 class="font-semibold text-lg">Age</h3>
                        <p class={`text-gray-300`}>16歳</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center shadow-lg">
                        <span class="text-2xl">📍</span>
                      </div>
                      <div>
                        <h3 class="font-semibold text-lg">Location</h3>
                        <p class={`text-gray-300`}>大阪市生野区</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                        <span class="text-2xl">🎓</span>
                      </div>
                      <div>
                        <h3 class="font-semibold text-lg">School</h3>
                        <p class={`text-gray-300`}>
                          大阪府立清水谷高等学校
                        </p>
                      </div>
                    </div>                  </div>
                </div>

                <div class={`group glass-card-dark p-10 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 relative overflow-hidden`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div class="relative z-10 space-y-6">
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                        <span class="text-2xl">🍣</span>
                      </div>
                      <div>
                        <h3 class="font-semibold text-lg">Favorite Food</h3>
                        <p class={`text-gray-300`}>寿司</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-lg">
                        <span class="text-2xl">📚</span>
                      </div>
                      <div>
                        <h3 class="font-semibold text-lg">Favorite Manga</h3>
                        <p class={`text-gray-300`}>
                          お兄ちゃんはおしまい！
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                        <span class="text-2xl">☕</span>
                      </div>
                      <div>
                        <h3 class="font-semibold text-lg">Favorite Drink</h3>
                        <p class={`text-gray-300`}>
                          Cider, Cola, Coffee
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                        <span class="text-2xl">🏛️</span>
                      </div>
                      <div>
                        <h3 class="font-semibold text-lg">
                          Political Affiliation
                        </h3>
                        <p class={`text-gray-300`}>
                          日本維新の会、国民民主党、日本保守党
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 日常生活の節を追加 */}
              <div class="mt-8">
                <ExpandableText title="私の日常" initiallyExpanded={true}>
                  <p>平日は学校が終わった後予備校に行き9時まで勉強して家に帰ってから2時までtakosの開発に励んでいます。</p>
                  <p class="mt-4">休日はtakosの開発をしていますが、開発が終了したら土日も予備校に行きたいと考えています。</p>
                </ExpandableText>              </div>
            </section>
          </FadeIn>
          {/* Timeline - 新セクション */}
          <FadeIn>
            <section>
              <h2 class={`text-3xl font-semibold mb-8 pb-2 border-green-500/50 border-b-2`}>
                <span class={`text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-300`}>Timeline</span>
              </h2>
              
              <div class="relative border-l-4 border-purple-400/30 ml-6 space-y-10 py-4">
                {[
                  { year: "2008", title: "誕生", text: "大阪府で生まれる" },
                  { year: "2024", title: "高校入学", text: "清水谷高校に入学" },
                ].map((item) => (                  <div class="relative">
                    <div class={`absolute -left-10 mt-1.5 h-6 w-6 rounded-full border-4 border-purple-500 bg-gray-900 shadow-lg`}></div>
                    <div class={`glass-card-dark p-6 rounded-2xl ml-2 relative overflow-hidden group`}>
                      <div class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div class="relative z-10">
                        <h3 class={`text-lg font-semibold mb-2 text-purple-300`}>{item.year} - {item.title}</h3>
                        <p class={`text-gray-300`}>{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div class="mt-8">
                <ExpandableText title="将来の展望" initiallyExpanded={true}>
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
              <h2 class={`text-3xl font-semibold mb-8 pb-2 border-yellow-500/50 border-b-2`}>
                <span class={`text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-300`}>Skills</span>
              </h2>              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: "Frontend", text: "Preact, SolidJS, Tailwind CSS", icon: "🎨", color: "from-blue-500 to-indigo-600" },
                  { title: "Backend", text: "Node.js, Deno, PHP, Laravel, Hono", icon: "⚙️", color: "from-green-500 to-teal-600" },
                  { title: "Tools", text: "Git, Docker, Deno Deploy", icon: "🔧", color: "from-purple-500 to-pink-600" },
                  { title: "Infrastructure", text: "Proxmox, k8s, Linux", icon: "🏗️", color: "from-red-500 to-orange-600" },
                  { title: "Languages", text: "JavaScript, TypeScript, PHP, Rust (学習中)", icon: "📝", color: "from-yellow-500 to-amber-600" },
                  { title: "Other", text: "UI/UX Design, SEO基礎, グラフィックデザイン", icon: "✨", color: "from-cyan-500 to-blue-600" },
                ].map((skill) => (                  <div class={`group glass-card-dark p-8 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-rotate-2 relative overflow-hidden`}>
                    <div class={`absolute inset-0 bg-gradient-to-br ${skill.color.replace(/500/g, '500/5')} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <div class="relative z-10">
                      <div class={`w-16 h-16 mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-br ${skill.color} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                        <span class="text-3xl filter drop-shadow-sm">{skill.icon}</span>
                      </div>
                      <h3 class="font-bold text-xl mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">{skill.title}</h3>
                      <p class={`text-gray-300 leading-relaxed`}>{skill.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div class="mt-8">
                <ExpandableText title="学習中の技術">
                  <p>現在はRustとWebAssemblyを重点的に学習しています。高パフォーマンスな分散型アプリケーション開発のために必要だと感じています。また、暗号技術とP2P通信についても理解を深めるため、関連書籍や論文を読んでいます。</p>
                </ExpandableText>
              </div>
            </section>
          </FadeIn>

          {/* Projects */}
          <FadeIn>
            <section>
              <h2 class={`text-3xl font-semibold mb-8 pb-2 border-pink-500/50 border-b-2`}>
                <span class={`text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-300`}>Projects</span>
              </h2>              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class={`glass-card-dark p-8 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 relative overflow-hidden group`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div class="relative z-10">
                    <div class="flex items-center mb-6">
                      <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                        <span class="text-3xl">💬</span>
                      </div>
                      <h3 class="text-2xl font-bold">takos</h3>
                    </div>
                    <p class={`text-gray-300 mb-6 leading-relaxed`}>
                      分散型チャットSNS。Matrix のような分散型・暗号化機能と、LINE のような使いやすい UI/UX を目指しています。
                    </p>
                    <div class="flex flex-wrap gap-3 mb-6">
                      <span class={`px-3 py-2 rounded-full text-sm glass-effect-dark border border-purple-500/30`}>Deno</span>
                      <span class={`px-3 py-2 rounded-full text-sm glass-effect-dark border border-blue-500/30`}>SolidJS</span>
                      <span class={`px-3 py-2 rounded-full text-sm glass-effect-dark border border-green-500/30`}>End-to-End暗号化</span>
                    </div>
                    <a href="https://github.com/tako0614/takos" class={`inline-flex items-center text-purple-300 hover:text-purple-200 transition-colors font-semibold`}>
                      プロジェクトを見る <span class="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </a>
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
              <h2 class={`text-3xl font-semibold mb-8 pb-2 border-cyan-500/50 border-b-2`}>
                <span class={`text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300`}>相互リンク</span>
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <For each={mutualLinks}>
                  {(link) => (                    <a
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
          </FadeIn>          {/* Contact */}
          <FadeIn>
            <section class="text-center">
              <h2 class={`text-2xl md:text-3xl font-semibold mb-6 md:mb-8 pb-2 border-red-500/50 border-b-2`}>
                <span class={`text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-300`}>Contact</span>
              </h2>
              
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
