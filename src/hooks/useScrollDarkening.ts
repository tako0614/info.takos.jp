import { createSignal, onMount, onCleanup } from 'solid-js';

export function useScrollDarkening() {
  const [scrollProgress, setScrollProgress] = createSignal(0);
  const [darkness, setDarkness] = createSignal(0);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / scrollHeight, 1);
    
    setScrollProgress(progress);
    
    // 深度に応じた暗さの計算（非線形）
    const depthFactor = Math.pow(progress, 1.5); // 徐々に加速する暗化
    setDarkness(depthFactor);
  };

  onMount(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初期値を設定
  });

  onCleanup(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return {
    scrollProgress,
    darkness,
    // 深海層の計算
    getDepthLayer: () => {
      const progress = scrollProgress();
      if (progress < 0.2) return 'surface'; // 海面付近
      if (progress < 0.4) return 'twilight'; // 薄明帯
      if (progress < 0.6) return 'midnight'; // 漸深帯
      if (progress < 0.8) return 'abyssal'; // 深海帯
      return 'hadal'; // 超深海帯
    }
  };
}
