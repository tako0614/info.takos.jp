import { Component, onMount, createEffect } from 'solid-js';

interface DeepSeaParticlesProps {
  darkMode: boolean;
}

/**
 * DeepSeaParticles コンポーネント
 * 深海をイメージしたプランクトンと気泡のパーティクルシステム
 */
export const DeepSeaParticles: Component<DeepSeaParticlesProps> = (props) => {
  const planktonCount = 25;
  const bubbleCount = 15;
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
    const size = Math.random() * 12 + 6;
    
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
    const size = Math.random() * 20 + 8;
    
    bubble.className = `absolute rounded-full border`;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * width}px`;
    bubble.style.top = `${height + 50}px`;
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
    
    const duration = Math.random() * 15 + 10;
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
