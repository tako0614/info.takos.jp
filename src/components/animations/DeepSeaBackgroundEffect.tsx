import { Component } from 'solid-js';

interface DeepSeaBackgroundEffectProps {
  darkMode: boolean;
}

/**
 * DeepSeaBackgroundEffect コンポーネント
 * 深海をイメージした背景エフェクト
 */
export const DeepSeaBackgroundEffect: Component<DeepSeaBackgroundEffectProps> = (props) => {
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
