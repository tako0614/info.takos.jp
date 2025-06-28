import { Component, createSignal, Show, For } from 'solid-js';
import { qaData } from '../data/qaData';
import { useTime, useScrollProgress, useDeviceInfo } from '../hooks';

interface ARHudOverlayProps {}

/**
 * AR風HUDオーバーレイコンポーネント
 * PC版のみで表示される近未来的なUI
 */
export const ARHudOverlay: Component<ARHudOverlayProps> = () => {
  const currentTime = useTime();
  const scrollProgress = useScrollProgress();
  const { isDesktop, windowSize } = useDeviceInfo();

  const [isMinimized, setIsMinimized] = createSignal(false);
  const [selectedTakoIndex, setSelectedTakoIndex] = createSignal<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = createSignal<string | null>(null);

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

  // たこ索引データ（簡略版）
  const takoIndexData = {
    "個人情報": ["基本プロフィール", "趣味・嗜好", "政治的立場"],
    "技術・スキル": ["フロントエンド", "バックエンド", "インフラ・DevOps", "学習中の技術"],
    "哲学・思想": ["基本的な世界観", "実存主義への関心", "テクノロジー観", "人生哲学"],
    "プロジェクト・開発": ["takosプロジェクト", "開発ポリシー", "アイデアの源泉"],
    "将来・ビジョン": ["短期目標", "中期目標", "最終目標", "社会への貢献"],
    "日常・ライフスタイル": ["平日のスケジュール", "休日の過ごし方", "学習スタイル"]
  };

  // HUDセクション - たこ索引がメイン
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
    ]
  };

  if (!isDesktop()) {
    return <></>
  }

  return (
    <div class="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* デバッグ情報 */}
      <div class="absolute top-4 left-4 bg-black/80 text-green-400 p-2 rounded text-xs font-mono pointer-events-auto">
        AR HUD ACTIVE | {windowSize().width}x{windowSize().height}
      </div>
      
      {/* メインHUDパネル - 右上 */}
      <div class={`absolute top-4 right-4 transition-all duration-700 ${isMinimized() ? 'transform translate-x-80' : ''}`}>
        <div 
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
              </div>
            </div>

            {/* たこ索引セクション - 常に展開 */}
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
      </div>

      {/* たこ索引詳細パネル */}
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
      </div>

      {/* ネットワーク情報オーバーレイ - 左中央 */}
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
      </div>

      {/* パフォーマンス情報オーバーレイ - 右下（スクロールプログレスの上） */}
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

      {/* ボトムバー */}
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
