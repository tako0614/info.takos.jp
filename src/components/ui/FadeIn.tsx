import { Component, onMount, onCleanup } from 'solid-js';

interface FadeInProps {
  children: any;
  class?: string;
}

/**
 * FadeIn コンポーネント
 * Intersection Observer で表示時に「fade-in」クラスを追加
 */
export const FadeIn: Component<FadeInProps> = (props) => {
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
