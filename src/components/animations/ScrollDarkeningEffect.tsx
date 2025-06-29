import { Component, createSignal, onMount, For } from 'solid-js';
import { useScrollDarkening } from '../../hooks/useScrollDarkening';

export const ScrollDarkeningEffect: Component = () => {
  const { darkness, scrollProgress, getDepthLayer } = useScrollDarkening();
  const [particles, setParticles] = createSignal<Array<{id: number, x: number, y: number, delay: number}>>([]);

  // 深海の生物発光パーティクルを生成
  onMount(() => {
    const particleArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setParticles(particleArray);
  });

  const getDepthInfo = () => {
    const layer = getDepthLayer();
    const depth = Math.round(scrollProgress() * 11000); // 最大11km（マリアナ海溝）
    
    const layerInfo = {
      surface: { name: '海面', depth: '0-200m', color: 'text-blue-300' },
      twilight: { name: '薄明帯', depth: '200-1000m', color: 'text-blue-500' },
      midnight: { name: '漸深帯', depth: '1000-4000m', color: 'text-blue-700' },
      abyssal: { name: '深海帯', depth: '4000-6000m', color: 'text-gray-400' },
      hadal: { name: '超深海帯', depth: '6000m-', color: 'text-gray-600' }
    };
    
    return { ...layerInfo[layer as keyof typeof layerInfo], depth: `${depth}m` };
  };

  return (
    <>
      {/* メイン暗化オーバーレイ */}
      <div
        class="fixed inset-0 pointer-events-none z-10 transition-all duration-300 water-distortion"
        style={{
          'background': `linear-gradient(
            180deg,
            rgba(0, 0, 0, ${darkness() * 0.1}) 0%,
            rgba(0, 0, 0, ${darkness() * 0.3}) 25%,
            rgba(0, 0, 0, ${darkness() * 0.5}) 50%,
            rgba(0, 0, 0, ${darkness() * 0.7}) 75%,
            rgba(0, 0, 0, ${darkness() * 0.9}) 100%
          )`,
          'backdrop-filter': `brightness(${1 - darkness() * 0.5}) contrast(${1 + darkness() * 0.3})`
        }}
      >
        {/* 生物発光パーティクル */}
        <For each={particles()}>
          {(particle) => (
            <div
              class="bioluminescence"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                'animation-delay': `${particle.delay}s`,
                opacity: darkness() > 0.3 ? 0.6 : 0
              }}
            />
          )}
        </For>
      </div>

      {/* 深度インジケーター */}
      <div class="fixed top-4 right-4 z-50 glass-card-dark p-4 rounded-xl text-white">
        <div class="text-xs font-mono space-y-1">
          <div class={`font-bold ${getDepthInfo().color}`}>
            {getDepthInfo().name}
          </div>
          <div class="text-gray-300">
            深度: {getDepthInfo().depth}
          </div>
          <div class="w-20 h-1 bg-gray-700 rounded overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-blue-400 to-gray-600 transition-all duration-300"
              style={{ width: `${scrollProgress() * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 海流エフェクト */}
      <div
        class="fixed inset-0 pointer-events-none z-5"
        style={{
          'background': `
            radial-gradient(circle at 20% ${20 + scrollProgress() * 60}%, rgba(0, 100, 200, ${0.1 * (1 - darkness())}) 0%, transparent 40%),
            radial-gradient(circle at 80% ${30 + scrollProgress() * 50}%, rgba(0, 150, 255, ${0.08 * (1 - darkness())}) 0%, transparent 45%),
            radial-gradient(circle at 50% ${10 + scrollProgress() * 70}%, rgba(100, 200, 255, ${0.06 * (1 - darkness())}) 0%, transparent 35%)
          `,
          'opacity': 1 - darkness() * 0.8
        }}
      />
    </>
  );
};
