import { Component, For, createSignal, onMount, onCleanup } from 'solid-js';

interface Bubble {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const BubbleEffect: Component = () => {
  const [bubbles, setBubbles] = createSignal<Bubble[]>([]);
  let bubbleId = 0;

  const createBubble = (): Bubble => {
    return {
      id: bubbleId++,
      x: Math.random() * 100,
      size: Math.random() * 20 + 5,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.4 + 0.1,
    };
  };

  const addBubble = () => {
    setBubbles((prev) => {
      // 最大30個まで
      const newBubbles = prev.length >= 30 ? prev.slice(1) : prev;
      return [...newBubbles, createBubble()];
    });
  };

  onMount(() => {
    // 初期バブルを生成
    const initialBubbles: Bubble[] = [];
    for (let i = 0; i < 15; i++) {
      initialBubbles.push(createBubble());
    }
    setBubbles(initialBubbles);

    // 定期的に新しいバブルを追加
    const interval = setInterval(() => {
      addBubble();
    }, 800);

    onCleanup(() => clearInterval(interval));
  });

  return (
    <div class="fixed top-[50vh] left-0 right-0 bottom-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <For each={bubbles()}>
        {(bubble) => (
          <div
            class="absolute rounded-full bubble-rise"
            style={{
              left: `${bubble.x}%`,
              bottom: '-50px',
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, ${bubble.opacity + 0.2}), rgba(100, 200, 255, ${bubble.opacity}), transparent)`,
              'box-shadow': `inset 0 0 ${bubble.size / 3}px rgba(255, 255, 255, 0.3), 0 0 ${bubble.size / 2}px rgba(100, 200, 255, 0.2)`,
              animation: `bubbleRise ${bubble.duration}s ease-in-out ${bubble.delay}s infinite`,
              opacity: bubble.opacity,
            }}
          />
        )}
      </For>

      <style>{`
        @keyframes bubbleRise {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translateY(-25vh) translateX(20px) scale(1.1);
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-50vh) translateX(-10px) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
