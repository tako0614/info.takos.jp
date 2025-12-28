import { Component, onMount, onCleanup } from 'solid-js';

interface TakoAnimationProps {
  id: number;
  onClick: () => void;
}

/**
 * TakoAnimation コンポーネント
 * たこが画面上を動き回るアニメーション（requestAnimationFrameで最適化）
 */
export const TakoAnimation: Component<TakoAnimationProps> = (props) => {
  let takoRef!: HTMLImageElement;
  const speed = 2.0;
  let x = 0;
  let y = 0;
  let dx = 0;
  let dy = 0;
  let animationId: number;
  let isRunning = true;

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
    if (!takoRef || !isRunning) return;

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

    animationId = requestAnimationFrame(updatePosition);
  };

  onMount(() => {
    if (takoRef.complete) {
      initTako();
      animationId = requestAnimationFrame(updatePosition);
    } else {
      takoRef.onload = () => {
        initTako();
        animationId = requestAnimationFrame(updatePosition);
      };
      takoRef.onerror = () => {
        console.error(`Failed to load tako image for id: ${props.id}`);
        if(takoRef) takoRef.style.display = 'none';
      }
    }
  });

  onCleanup(() => {
    isRunning = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
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
