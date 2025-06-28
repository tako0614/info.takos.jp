import { createSignal, onMount, onCleanup } from 'solid-js';

export function useTime() {
  const [currentTime, setCurrentTime] = createSignal(new Date());

  onMount(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    onCleanup(() => clearInterval(interval));
  });

  return currentTime;
}

export function useScrollProgress() {
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

  return scrollProgress;
}

export function useDeviceInfo() {
  const [isDesktop, setIsDesktop] = createSignal(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );
  
  const [windowSize, setWindowSize] = createSignal({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 1920, 
    height: typeof window !== 'undefined' ? window.innerHeight : 1080 
  });

  onMount(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsDesktop(width >= 1024);
      setWindowSize({ width, height });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    onCleanup(() => window.removeEventListener('resize', checkDevice));
  });

  return { isDesktop, windowSize };
}
