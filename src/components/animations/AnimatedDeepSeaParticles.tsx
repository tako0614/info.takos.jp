import { Component } from 'solid-js';

/**
 * AnimatedDeepSeaParticles コンポーネント
 * 動きのある深海パーティクルシステム
 */
export const AnimatedDeepSeaParticles: Component = () => {
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
