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
 * DeepSeaParticles コンポーネント
 * 深海をイメージしたプランクトンと気泡のパーティクルシステム
 */
const DeepSeaParticles: Component<{ darkMode: boolean }> = (props) => {
  const planktonCount = 25; // プランクトン数
  const bubbleCount = 15; // 気泡数
  let containerRef!: HTMLDivElement;

  onMount(() => {
    const container = containerRef;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // プランクトンを生成
    for (let i = 0; i < planktonCount; i++) {
      createPlankton(container, width, height, props.darkMode);
    }

    // 気泡を生成
    for (let i = 0; i < bubbleCount; i++) {
      createBubble(container, width, height, props.darkMode);
    }
  });

  createEffect(() => {
    if (containerRef) {
      containerRef.innerHTML = '';
      const width = containerRef.offsetWidth;
      const height = containerRef.offsetHeight;
      
      for (let i = 0; i < planktonCount; i++) {
        createPlankton(containerRef, width, height, props.darkMode);
      }
      
      for (let i = 0; i < bubbleCount; i++) {
        createBubble(containerRef, width, height, props.darkMode);
      }
    }
  });

  function createPlankton(container: HTMLDivElement, width: number, height: number, isDark: boolean) {
    const plankton = document.createElement('div');
    const size = Math.random() * 12 + 6; // サイズを大きく
    
    // プランクトンらしい色（青緑系の生物発光）
    const planktonColors = isDark ? [
      'radial-gradient(circle, rgba(0, 255, 255, 0.8), rgba(0, 150, 200, 0.4))',
      'radial-gradient(circle, rgba(100, 255, 200, 0.7), rgba(0, 200, 150, 0.3))',
      'radial-gradient(circle, rgba(150, 200, 255, 0.6), rgba(50, 100, 200, 0.3))',
      'radial-gradient(circle, rgba(200, 255, 100, 0.5), rgba(100, 200, 50, 0.2))',
    ] : [
      'radial-gradient(circle, rgba(0, 255, 255, 0.3), rgba(0, 150, 200, 0.1))',
      'radial-gradient(circle, rgba(100, 255, 200, 0.2), rgba(0, 200, 150, 0.1))',
      'radial-gradient(circle, rgba(150, 200, 255, 0.2), rgba(50, 100, 200, 0.1))',
      'radial-gradient(circle, rgba(200, 255, 100, 0.2), rgba(100, 200, 50, 0.1))',
    ];
    
    plankton.className = `absolute rounded-full`;
    plankton.style.width = `${size}px`;
    plankton.style.height = `${size}px`;
    plankton.style.left = `${Math.random() * width}px`;
    plankton.style.top = `${Math.random() * height}px`;
    plankton.style.background = planktonColors[Math.floor(Math.random() * planktonColors.length)];
    plankton.style.boxShadow = isDark 
      ? `0 0 ${size * 3}px rgba(0, 255, 255, 0.6), 0 0 ${size * 6}px rgba(0, 255, 255, 0.3)`
      : `0 0 ${size * 2}px rgba(0, 255, 255, 0.3)`;
    plankton.style.filter = 'blur(0.3px)';
    plankton.style.zIndex = '5';
    
    const duration = Math.random() * 40 + 20;
    plankton.style.animation = `
      planktonFloat ${duration}s infinite ease-in-out,
      gentleGlow ${(Math.random() * 4) + 3}s infinite ease-in-out ${Math.random() * 2}s,
      deepSeaSway ${(Math.random() * 8) + 6}s infinite ease-in-out
    `;
    plankton.style.animationDelay = `${Math.random() * 15}s`;
    
    container.appendChild(plankton);
  }

  function createBubble(container: HTMLDivElement, width: number, height: number, isDark: boolean) {
    const bubble = document.createElement('div');
    const size = Math.random() * 20 + 8; // サイズを大きく
    
    bubble.className = `absolute rounded-full border`;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * width}px`;
    bubble.style.top = `${height + 50}px`; // 画面下から開始
    bubble.style.background = isDark 
      ? 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), rgba(100, 200, 255, 0.15))'
      : 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), rgba(100, 200, 255, 0.2))';
    bubble.style.borderColor = isDark 
      ? 'rgba(100, 200, 255, 0.3)' 
      : 'rgba(100, 200, 255, 0.2)';
    bubble.style.backdropFilter = 'blur(1px)';
    bubble.style.boxShadow = isDark 
      ? `0 0 ${size * 2}px rgba(100, 200, 255, 0.5), inset 0 0 ${size/2}px rgba(255, 255, 255, 0.3)`
      : `0 0 ${size}px rgba(100, 200, 255, 0.3), inset 0 0 ${size/2}px rgba(255, 255, 255, 0.2)`;
    bubble.style.zIndex = '5';
    
    const duration = Math.random() * 15 + 10; // 上昇時間
    bubble.style.animation = `bubbleRise ${duration}s linear infinite`;
    bubble.style.animationDelay = `${Math.random() * 20}s`;
    
    container.appendChild(bubble);
  }
  
  return (
    <div 
      ref={containerRef} 
      class="fixed inset-0 pointer-events-none z-10 overflow-hidden"
    />
  );
};

/**
 * DeepSeaBackgroundEffect コンポーネント
 * 深海をイメージした背景エフェクト
 */
const DeepSeaBackgroundEffect: Component<{ darkMode: boolean }> = (props) => {
  return (
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* 深海グラデーション背景 */}
      <div 
        class={`absolute w-full h-full ${
          props.darkMode 
            ? 'deep-sea-gradient' 
            : 'bg-gradient-to-b from-gray-100 via-blue-50 to-indigo-100'
        }`}
      ></div>
      
      {/* 深海のパーティクル効果 */}
      {props.darkMode && (
        <div 
          class="absolute w-full h-full deep-sea-particles opacity-60"
        ></div>
      )}
      
      {/* 動的なグラデーションオーバーレイ */}
      <div 
        class={`absolute w-full h-full opacity-20 ${
          props.darkMode 
            ? 'bg-gradient-to-b from-cyan-900/20 via-transparent to-blue-900/30' 
            : 'bg-gradient-to-b from-blue-300/20 via-transparent to-purple-300/20'
        }`}
        style={{
          animation: 'gradientShift 25s ease-in-out infinite alternate'
        }}
      ></div>
      
      {/* 深海の光の屈折効果 */}
      {props.darkMode && (
        <div 
          class="absolute inset-0 opacity-10"
          style={{
            "background-image": `
              radial-gradient(circle at 20% 10%, rgba(0, 255, 255, 0.3) 0%, transparent 40%),
              radial-gradient(circle at 80% 30%, rgba(100, 200, 255, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(0, 150, 255, 0.15) 0%, transparent 45%),
              radial-gradient(circle at 70% 90%, rgba(50, 100, 200, 0.1) 0%, transparent 35%)
            `,
            animation: 'deepSeaSway 30s infinite ease-in-out'
          }}
        ></div>
      )}
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
    <div class={`glass-card-deep glass-refract p-8 rounded-3xl relative overflow-hidden ${props.class}`}>
      <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
      <div class="relative z-10">
        <div 
          class="flex justify-between items-center cursor-pointer group" 
          onClick={() => setExpanded(!expanded())}
        >
          <h3 class="text-xl font-semibold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300">{props.title}</h3>
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
          class="ar-hud-panel card-3d p-6 w-80"
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
            </div>          </div>            {/* たこ索引セクション - 常に展開 */}
            <div class="space-y-3">
              <For each={Object.entries(mainHudSection)}>
                {([sectionName, section]) => (
                  <div class="ar-hud-section pointer-events-auto hologram-effect energy-field">
                    <div class="flex items-center justify-between p-3 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent rounded-lg sound-wave-effect">
                      <div class="flex items-center space-x-3">
                        <span class="text-xl drop-shadow-lg pulse-wave">{section.icon}</span>
                        <span class="text-cyan-200 text-base font-bold tracking-wide drop-shadow-lg neon-glow">{sectionName}</span>
                      </div>
                      <div class="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/50"></div>
                    </div>
                    
                    <div class="mt-3 pl-6 space-y-3 border-l-2 border-cyan-400/50">
                      <For each={section.data}>
                        {(item: any) => (
                          <div 
                            class={`flex justify-between items-center text-sm hud-control ${
                              item.category ? 'cursor-pointer hover:bg-cyan-500/20 p-2 rounded-lg transition-all duration-300 border border-transparent hover:border-cyan-400/30 sound-wave-effect card-3d' : 'p-2'
                            }`}
                            onClick={() => item.category && setSelectedTakoIndex(
                              selectedTakoIndex() === item.category ? null : item.category
                            )}
                          >
                            <span class="text-gray-200 font-medium">{item.label}</span>
                            <span class={`${item.color} font-mono font-bold drop-shadow-sm neon-glow`}>{item.value}</span>
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
            class="ar-hud-panel card-3d hologram-effect quantum-effect p-5"
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
                <h3 class="text-purple-300 text-base font-mono font-bold tracking-wide drop-shadow-lg neon-glow">{selectedTakoIndex()}</h3>
                <button 
                  onClick={() => {
                    setSelectedTakoIndex(null);
                    setSelectedQuestion(null);
                  }}
                  class="pointer-events-auto text-gray-300 hover:text-purple-400 text-sm transition-colors sound-wave-effect hud-control px-2 py-1"
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
                        class="text-sm text-gray-200 p-3 rounded-lg bg-purple-900/20 hover:bg-purple-500/20 transition-all duration-300 pointer-events-auto cursor-pointer border border-purple-500/20 hover:border-purple-400/40 card-3d sound-wave-effect energy-field"
                        onClick={() => {
                          console.log(`ARHud: Clicked question "${questionTitle}" in category "${selectedTakoIndex()}"`);
                          setSelectedQuestion(questionTitle);
                        }}
                      >
                        <div class="flex items-center space-x-2">
                          <span class="text-purple-400 pulse-wave">•</span>
                          <span class="neon-glow">{questionTitle}</span>
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
                    <h4 class="text-cyan-300 text-sm font-mono font-bold neon-glow">{selectedQuestion()}</h4>
                    <button 
                      onClick={() => setSelectedQuestion(null)}
                      class="pointer-events-auto text-gray-300 hover:text-cyan-400 text-sm transition-colors sound-wave-effect hud-control px-2 py-1"
                    >
                      ← 戻る
                    </button>
                  </div>
                  <div class="text-sm text-gray-200 leading-relaxed p-4 rounded-lg bg-cyan-900/20 border border-cyan-500/30 hologram-effect matrix-stream">
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
        <div class="ar-hud-panel card-3d hologram-effect matrix-stream p-4 w-64">
          <div class="flex items-center mb-3">
            <span class="text-lg mr-2 pulse-wave">{systemInfoSection.icon}</span>
            <span class="text-cyan-400 text-sm font-mono neon-glow typing-effect">SYSTEM_INFO</span>
          </div>
          <div class="space-y-2">
            <For each={systemInfoSection.data}>
              {(item) => (
                <div class="flex justify-between items-center text-xs hud-control px-2 py-1 sound-wave-effect">
                  <span class="text-gray-300">{item.label}</span>
                  <span class={`${item.color} font-mono neon-glow`}>{item.value}</span>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>      {/* ネットワーク情報オーバーレイ - 左中央 */}
      <div class="absolute top-80 left-4">
        <div class="ar-hud-panel card-3d radar-effect energy-field p-4 w-64">
          <div class="flex items-center mb-3">
            <span class="text-lg mr-2 pulse-wave">{networkInfoSection.icon}</span>
            <span class="text-cyan-400 text-sm font-mono neon-glow">NETWORK_INFO</span>
          </div>
          <div class="space-y-2">
            <For each={networkInfoSection.data}>
              {(item) => (
                <div class="flex justify-between items-center text-xs hud-control px-2 py-1 sound-wave-effect">
                  <span class="text-gray-300">{item.label}</span>
                  <span class={`${item.color} font-mono neon-glow`}>{item.value}</span>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>      {/* パフォーマンス情報オーバーレイ - 右下（スクロールプログレスの上） */}
      <div class="absolute bottom-32 right-4">
        <div class="ar-hud-panel card-3d quantum-effect magnetic-field p-4 w-48">
          <div class="flex items-center mb-3">
            <span class="text-lg mr-2 pulse-wave">{performanceSection.icon}</span>
            <span class="text-cyan-400 text-xs font-mono neon-glow">PERFORMANCE</span>
          </div>
          <div class="space-y-2">
            <For each={performanceSection.data}>
              {(item) => (
                <div class="flex justify-between items-center text-xs hud-control px-2 py-1 sound-wave-effect">
                  <span class="text-gray-300">{item.label}</span>
                  <span class={`${item.color} font-mono neon-glow`}>{item.value}</span>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>

      {/* サイドパネル - 左端 */}      {/* ボトムバー */}
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div class="ar-hud-panel card-3d hologram-effect energy-field px-8 py-3">
          <div class="flex items-center space-x-6 text-sm">
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 rounded-full bg-green-400 animate-pulse pulse-wave"></div>
              <span class="text-green-400 font-mono neon-glow">CONNECTED</span>
            </div>
            <div class="text-gray-400 font-mono typing-effect">
              protocol://info.takos.jp
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-purple-400 pulse-wave">🐙</span>
              <span class="text-purple-400 font-mono neon-glow">AR_MODE_ACTIVE</span>
            </div>
            <div class="text-cyan-400 font-mono neon-glow">
              BUILD: {new Date().getFullYear()}.{(new Date().getMonth() + 1).toString().padStart(2, '0')}.{new Date().getDate().toString().padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* ミニマップ/プログレス - 右下 */}
      <div class="absolute bottom-4 right-4">
        <div class="ar-hud-panel card-3d quantum-effect magnetic-field p-4 w-48">
          <div class="text-center mb-3">
            <span class="text-cyan-400 text-xs font-mono neon-glow typing-effect">SCROLL_MATRIX</span>
          </div>
          <div class="w-full bg-gray-700/50 rounded-full h-2 mb-3 hud-progress">
            <div class="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full transition-all duration-300" 
                 style={{ width: `${scrollProgress()}%` }}></div>
          </div>
          <div class="grid grid-cols-3 gap-1 text-xs text-gray-400 font-mono">
            <div class={`text-center sound-wave-effect ${scrollProgress() < 33 ? 'text-cyan-400 neon-glow' : ''}`}>TOP</div>
            <div class={`text-center sound-wave-effect ${scrollProgress() >= 33 && scrollProgress() < 66 ? 'text-cyan-400 neon-glow' : ''}`}>MID</div>
            <div class={`text-center sound-wave-effect ${scrollProgress() >= 66 ? 'text-cyan-400 neon-glow' : ''}`}>END</div>
          </div>
          <div class="text-center mt-2 text-xs text-purple-400 font-mono neon-glow">
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
    "思想がない人に価値はない",
    "手段が目的化している人は、何も生み出せない",
    "勝利こそ正義",
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

  return (    <div class="min-h-screen relative overflow-hidden transition-all duration-700 deep-sea-gradient">      {/* 深海パーティクルエフェクト */}
      <DeepSeaParticles darkMode={true} />
      <DeepSeaBackgroundEffect darkMode={true} />
      {/* 動くパーティクル */}
      <AnimatedDeepSeaParticles />
      
      {/* TakoAnimationコンポーネントを<For>でレンダリング */}
      <For each={takoInstances()}>
        {(tako) => <TakoAnimation id={tako.id} onClick={addTako} />}
      </For>

      {/* AR HUDオーバーレイ */}
      <ARHudOverlay />      {/* 深海テーマのたこ追加ボタン */}
      <button
        onClick={addTako}
        class="fixed bottom-4 left-4 z-50 glass-card-deep glass-refract p-4 rounded-3xl transition-all duration-500 hover:scale-110 hover:rotate-12 text-white overflow-hidden group shadow-2xl hologram-effect card-3d sound-wave-effect"
        title="たこを増やす"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/40 to-blue-500/40 rounded-3xl group-hover:from-cyan-400/50 group-hover:to-blue-400/50 transition-all duration-300 energy-field"></div>        <div class="absolute inset-0 bg-gradient-to-tr from-cyan-300/20 to-teal-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 quantum-effect"></div>
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
        {/* ヘッダーセクション */}        <FadeIn class="text-center py-16">
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
            <div class="relative">            <h1 class="text-5xl md:text-7xl font-black mb-6 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 relative neon-glow"
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
          </div>{/* 強化されたクォートセクション */}
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
          </div></FadeIn>        {/* インタラクティブな質問選択機能 - モバイル専用セクション */}
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
          {/* About Me - 拡張セクション */}            <section>
              <div class="relative mb-12">
                <div class="flex items-center space-x-4">
                  <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-500/30 hologram-effect">
                    <span class="text-3xl">👤</span>
                  </div>
                  <div>
                    <h2 class="text-4xl font-bold neon-glow">
                      <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300">About Me</span>
                    </h2>
                    <div class="text-sm text-gray-400 font-mono mt-2">自己紹介 | PROFILE.exe</div>
                  </div>
                </div>
                <div class="absolute -top-2 -left-2 w-20 h-20 border-2 border-purple-500/30 rounded-2xl animate-pulse"></div>
                <div class="absolute -bottom-2 -right-2 w-12 h-12 border border-pink-500/20 rounded-xl"></div>
              </div>
                <div class="space-y-6">
                <p class="luxury-paragraph-lead text-center px-4 py-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 luxury-text-hover">
                  はじめまして、<span class="gradient-text-luxury font-semibold">たこ</span>です。プログラミングに情熱を注ぐ高校生として、次世代のデジタル体験を創造することに専念しています。現在、<span class="text-cyan-400 font-medium">takos</span>という革新的なコミュニケーションプラットフォームの開発に取り組んでおります。
                </p>
                

                  <ExpandableText title="私のビジョン" initiallyExpanded={true}>
                    <div class="luxury-paragraph space-y-4">
                      <p>プログラミングを超えた多彩な興味として、アニメーションと文学的表現への深い愛情を抱いております。私の将来への展望は、単なる技術者ではなく、<span class="gradient-text-luxury font-medium">起業家・実業家</span>として社会に変革をもたらすことにあります。</p>
                      
                      <p>人工知能の飛躍的進歩により、近い将来における生命科学の革命を確信しており、この歴史的転換点において先駆的な立場を確保することを目標としています。</p>
                      
                      <p>テクノロジーの力を通じて世界に新たな価値を創出したいと考えており、特に<span class="text-purple-400 font-medium">分散型システム</span>と<span class="text-cyan-400 font-medium">プライバシー保護技術</span>の分野において、既存の権力構造に挑戦する革新的なソリューションの開発に興味を持っています。</p>
                      
                      <p class="text-gray-300 italic border-l-4 border-purple-500/50 pl-4">プログラミングは私にとって手段であり、目的ではありません。理想とする未来を実現するために必要な技術を習得し、それを戦略的に活用していく所存です。</p>
                    </div>
                  </ExpandableText>

                  <ExpandableText title="私の哲学と価値観" initiallyExpanded={true}>
                    <div class="luxury-paragraph space-y-4">
                      <p>中学時代における哲学的探求が、現在の思想的基盤を形成する重要な転換点となりました。この知的な冒険は、私の人格形成に計り知れない影響を与えています。</p>
                      
                      <p>特に<span class="text-orange-400 font-medium">フリードリヒ・ニーチェ</span>の超人思想に深く共鳴しており、「人間が自らの力で新しい価値を創造し、より高次の存在へと進化する」という理念に強い共感を抱いています。</p>
                      
                      <p><span class="text-blue-400 font-medium">実存主義</span>の巨匠であるサルトルとカミュの思想、特に「<span class="italic text-purple-300">実存は本質に先立つ</span>」という核心的概念から深い影響を受けています。自己の定義は他者や社会の規範によってではなく、自身の行動と選択によってのみ決定されるという確固たる信念を持っています。</p>
                      
                      <p>テクノロジーの発展は、創造性と自由という人間の本質的精神を具現化する究極の手段であると認識しています。<span class="gradient-text-luxury">コードを書く行為</span>は私にとって新たな価値創造そのものであり、開発プロセス自体が芸術的自己表現の一形態なのです。</p>
                      
                      <p class="luxury-quote text-center my-8">私は常に独自の思想を保持し、自らの野心に対して誠実であり続けたいと考えています</p>
                    </div>
                </ExpandableText>
              </div>
            </section>
          {/* Status */}          <FadeIn>
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
              </div><div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class={`group glass-card-dark p-10 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1 relative overflow-hidden hologram-effect card-3d sound-wave-effect`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field"></div>
                  <div class="relative z-10 space-y-6">
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg pulse-wave neon-glow">
                        <span class="text-2xl">👤</span>
                      </div>                      <div>
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
                    </div></div>
                </div>

                <div class={`group glass-card-dark p-10 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 relative overflow-hidden hologram-effect card-3d sound-wave-effect`}>
                  <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field"></div>
                  <div class="relative z-10 space-y-6">
                    <div class="flex items-center space-x-4">
                      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg pulse-wave neon-glow">
                        <span class="text-2xl">🍣</span>
                      </div>                      <div>
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
              </div>              {/* 日常生活の節を追加 */}
              <div class="mt-8">
                <ExpandableText title="私の日常" initiallyExpanded={true}>
                  <div class="luxury-paragraph space-y-4">
                    <p>平日における私の生活リズムは、学業と自己開発のバランスを重視した構成となっています。学校教育を終えた後、<span class="text-blue-400 font-medium">予備校での学習</span>に21時まで専念し、帰宅後は深夜2時まで<span class="gradient-text-luxury">takos プロジェクト</span>の開発に情熱を注いでいます。</p>
                    
                    <p>休日においては、主にtakosの開発作業に集中しており、技術的革新と創造的問題解決に没頭しています。プロジェクトが一定の段階に到達した際には、<span class="text-purple-400 font-medium">週末の予備校通学</span>も検討しており、学術的知識の更なる深化を目指しています。</p>
                    
                    <p class="text-gray-300 italic border-l-4 border-cyan-500/50 pl-4">この密度の高いスケジュールは、将来への投資として位置づけており、知識と技術、両方の領域での成長を追求しています。</p>
                  </div>
                </ExpandableText>              </div>
            </section>
            </FadeIn>
          {/* Timeline - 新セクション */}          <FadeIn>
            <section>
              <div class="relative mb-12">
                <div class="flex items-center space-x-4">
                  <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center shadow-2xl shadow-green-500/30 hologram-effect">
                    <span class="text-3xl">⏱️</span>
                  </div>
                  <div>
                    <h2 class="text-4xl font-bold neon-glow">
                      <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-green-300">Timeline</span>
                    </h2>
                    <div class="text-sm text-gray-400 font-mono mt-2">人生の軌跡 | TIMELINE.log</div>
                  </div>
                </div>
                <div class="absolute -top-2 -left-2 w-20 h-20 border-2 border-green-500/30 rounded-2xl animate-pulse"></div>
                <div class="absolute -bottom-2 -right-2 w-12 h-12 border border-teal-500/20 rounded-xl"></div>
              </div>
              
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
                  <div class="luxury-paragraph space-y-4">
                    <p>今後5年間においては、<span class="text-purple-400 font-medium">技術的専門性の深化</span>と並行して、プロジェクトの規模拡大に戦略的に取り組む計画です。高校卒業後は、<span class="text-blue-400 font-medium">情報科学</span>と<span class="text-green-400 font-medium">経営学</span>の両分野における学術的基盤を構築しながら、<span class="gradient-text-luxury">スタートアップ企業の創設</span>も視野に入れています。</p>
                    
                    <p class="luxury-quote text-center my-6">究極の目標は、生命科学の革命による不老不死の実現、そして日本の再興という壮大なビジョンです。</p>
                    
                    <p>10年後のビジョンとして、自らが率いる<span class="text-cyan-400 font-medium">技術革新チーム</span>を組織し、<span class="text-purple-400 font-medium">分散型システム</span>と<span class="text-pink-400 font-medium">プライバシー保護技術</span>の分野において、世界的に認知される革新的サービスの創出を目標としています。</p>
                    
                    <p>この目標実現のため、<span class="text-orange-400 font-medium">オープンソースコミュニティ</span>への継続的貢献を通じてグローバルなネットワークを構築し、技術的深度と経営戦略の両面において実践的経験を積み重ねていく所存です。</p>

                    <p class="text-gray-300 italic border-l-4 border-purple-500/50 pl-4">最終的には、自社を通じた社会課題の根本的解決により、テクノロジーの力で人類の生活品質を革命的に向上させることが、私の存在意義なのです。</p>
                  </div>
                </ExpandableText>
              </div>
            </section>
          </FadeIn>

          {/* Skills */}          <FadeIn>
            <section>
              <div class="relative mb-12">
                <div class="flex items-center space-x-4">
                  <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-yellow-500/30 hologram-effect">
                    <span class="text-3xl">🛠️</span>
                  </div>
                  <div>
                    <h2 class="text-4xl font-bold neon-glow">
                      <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300">Skills</span>
                    </h2>
                    <div class="text-sm text-gray-400 font-mono mt-2">技術スタック | SKILLS.json</div>
                  </div>
                </div>
                <div class="absolute -top-2 -left-2 w-20 h-20 border-2 border-yellow-500/30 rounded-2xl animate-pulse"></div>
                <div class="absolute -bottom-2 -right-2 w-12 h-12 border border-orange-500/20 rounded-xl"></div>
              </div>              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: "Frontend", text: "Preact, SolidJS, Tailwind CSS", icon: "🎨", color: "from-blue-500 to-indigo-600", level: 85 },
                  { title: "Backend", text: "Node.js, Deno, PHP, Laravel, Hono", icon: "⚙️", color: "from-green-500 to-teal-600", level: 78 },
                  { title: "Tools", text: "Git, Docker, Deno Deploy", icon: "🔧", color: "from-purple-500 to-pink-600", level: 82 },
                  { title: "Infrastructure", text: "Proxmox, k8s, Linux", icon: "🏗️", color: "from-red-500 to-orange-600", level: 70 },
                  { title: "Languages", text: "JavaScript, TypeScript, PHP, Rust (学習中)", icon: "📝", color: "from-yellow-500 to-amber-600", level: 88 },
                  { title: "Other", text: "UI/UX Design, SEO基礎, グラフィックデザイン", icon: "✨", color: "from-cyan-500 to-blue-600", level: 75 },
                ].map((skill) => (                  <div class={`group glass-card-dark p-8 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-rotate-2 relative overflow-hidden hologram-effect card-3d sound-wave-effect neon-border`}>
                    <div class={`absolute inset-0 bg-gradient-to-br ${skill.color.replace(/500/g, '500/5')} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field`}></div>
                    <div class="relative z-10">
                      <div class={`w-16 h-16 mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-br ${skill.color} shadow-xl group-hover:scale-110 transition-transform duration-300 pulse-wave`}>
                        <span class="text-3xl filter drop-shadow-sm neon-glow">{skill.icon}</span>
                      </div>
                      <h3 class="font-bold text-xl mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300 neon-glow">{skill.title}</h3>
                      <p class={`text-gray-300 leading-relaxed mb-4`}>{skill.text}</p>
                      
                      {/* スキルレベルバー */}
                      <div class="mb-3">
                        <div class="flex justify-between items-center mb-2">
                          <span class="text-sm font-mono text-cyan-400">習熟度</span>
                          <span class="text-sm font-mono text-purple-400">{skill.level}%</span>
                        </div>
                        <div class="data-bar" style={`--progress: ${skill.level}%`}></div>
                      </div>
                      
                      {/* ステータスインジケーター */}
                      <div class="status-indicator text-xs">
                        <span class="text-green-400">ACTIVE</span>
                      </div>
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

          {/* Projects */}          <FadeIn>
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
              </div>              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
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

          {/* Mutual Links */}          <FadeIn>
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
          </FadeIn>          {/* Contact */}          <FadeIn>
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

/**
 * AnimatedDeepSeaParticles コンポーネント
 * 動きのある深海パーティクルシステム
 */
const AnimatedDeepSeaParticles: Component = () => {
  return (
    <div class="fixed inset-0 pointer-events-none" style={{"z-index": "10"}}>
      {/* プランクトン風パーティクル */}
      <div 
        class="absolute bg-cyan-400 rounded-full"
        style={{
          width: "8px",
          height: "8px",
          top: "20%", 
          left: "10%",
          "box-shadow": "0 0 20px rgba(0, 255, 255, 0.8)",
          animation: "planktonFloat 25s infinite ease-in-out, gentleGlow 3s infinite ease-in-out",
          opacity: "0.7"
        }}
      ></div>
      <div 
        class="absolute bg-teal-300 rounded-full"
        style={{
          width: "6px",
          height: "6px",
          top: "40%", 
          left: "80%",
          "box-shadow": "0 0 15px rgba(100, 255, 200, 0.6)",
          animation: "planktonFloat 30s infinite ease-in-out 5s, gentleGlow 2.5s infinite ease-in-out 1s",
          opacity: "0.6"
        }}
      ></div>
      <div 
        class="absolute bg-blue-300 rounded-full"
        style={{
          width: "10px",
          height: "10px",
          top: "70%", 
          left: "30%",
          "box-shadow": "0 0 25px rgba(150, 200, 255, 0.7)",
          animation: "planktonFloat 35s infinite ease-in-out 10s, gentleGlow 4s infinite ease-in-out 2s",
          opacity: "0.8"
        }}
      ></div>
      <div 
        class="absolute bg-cyan-200 rounded-full"
        style={{
          width: "7px",
          height: "7px",
          top: "15%", 
          left: "60%",
          "box-shadow": "0 0 18px rgba(200, 255, 255, 0.5)",
          animation: "planktonFloat 20s infinite ease-in-out 3s, gentleGlow 2s infinite ease-in-out 0.5s",
          opacity: "0.5"
        }}
      ></div>
      <div 
        class="absolute bg-teal-400 rounded-full"
        style={{
          width: "12px",
          height: "12px",
          top: "85%", 
          left: "70%",
          "box-shadow": "0 0 30px rgba(0, 200, 150, 0.9)",
          animation: "planktonFloat 40s infinite ease-in-out 15s, gentleGlow 3.5s infinite ease-in-out 1.5s",
          opacity: "0.9"
        }}
      ></div>

      {/* 気泡パーティクル */}
      <div 
        class="absolute rounded-full border border-cyan-300/30"
        style={{
          width: "15px",
          height: "15px",
          left: "25%",
          background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), rgba(100, 200, 255, 0.1))",
          "box-shadow": "0 0 20px rgba(100, 200, 255, 0.4), inset 0 0 8px rgba(255, 255, 255, 0.2)",
          animation: "bubbleRise 12s linear infinite",
          opacity: "0.6"
        }}
      ></div>
      <div 
        class="absolute rounded-full border border-blue-300/20"
        style={{
          width: "10px",
          height: "10px",
          left: "60%",
          background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), rgba(150, 220, 255, 0.1))",
          "box-shadow": "0 0 15px rgba(150, 220, 255, 0.3), inset 0 0 5px rgba(255, 255, 255, 0.15)",
          animation: "bubbleRise 15s linear infinite 3s",
          opacity: "0.5"
        }}
      ></div>
      <div 
        class="absolute rounded-full border border-teal-300/25"
        style={{
          width: "20px",
          height: "20px",
          left: "85%",
          background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.25), rgba(100, 255, 200, 0.1))",
          "box-shadow": "0 0 25px rgba(100, 255, 200, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.25)",
          animation: "bubbleRise 18s linear infinite 7s",
          opacity: "0.7"
        }}
      ></div>
      <div 
        class="absolute rounded-full border border-cyan-200/20"
        style={{
          width: "8px",
          height: "8px",
          left: "45%",
          background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), rgba(200, 255, 255, 0.08))",
          "box-shadow": "0 0 12px rgba(200, 255, 255, 0.3), inset 0 0 4px rgba(255, 255, 255, 0.1)",
          animation: "bubbleRise 10s linear infinite 2s",
          opacity: "0.4"
        }}
      ></div>
      <div 
        class="absolute rounded-full border border-blue-200/15"
        style={{
          width: "12px",
          height: "12px",
          left: "15%",
          background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.18), rgba(180, 220, 255, 0.08))",
          "box-shadow": "0 0 18px rgba(180, 220, 255, 0.35), inset 0 0 6px rgba(255, 255, 255, 0.12)",
          animation: "bubbleRise 14s linear infinite 5s",
          opacity: "0.45"
        }}
      ></div>

      {/* ゆらめく光の筋 */}
      <div 
        class="absolute w-1 bg-gradient-to-b from-transparent via-cyan-300/20 to-transparent"
        style={{
          height: "200px",
          left: "35%",
          top: "10%",
          animation: "deepSeaSway 8s infinite ease-in-out",
          opacity: "0.3"
        }}
      ></div>
      <div 
        class="absolute w-1 bg-gradient-to-b from-transparent via-blue-300/15 to-transparent"
        style={{
          height: "150px",
          left: "75%",
          top: "30%",
          animation: "deepSeaSway 12s infinite ease-in-out 3s",
          opacity: "0.25"
        }}
      ></div>
    </div>
  );
};
