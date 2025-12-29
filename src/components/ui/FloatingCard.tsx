import { Component, JSX, createSignal, onMount, onCleanup } from 'solid-js';

interface FloatingCardProps {
  children: JSX.Element;
  class?: string;
  floatIntensity?: number; // デフォルトのふわふわの強さ (default: 1)
  returnSpeed?: number; // 戻る速度 (default: 0.03)
}

export const FloatingCard: Component<FloatingCardProps> = (props) => {
  let cardRef: HTMLDivElement | undefined;

  const [offset, setOffset] = createSignal({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = createSignal(false);
  const [floatOffset, setFloatOffset] = createSignal({ x: 0, y: 0 });
  const [rotation, setRotation] = createSignal({ x: 0, y: 0 });

  const floatIntensity = props.floatIntensity ?? 1;
  const returnSpeed = props.returnSpeed ?? 0.03;
  const LONG_PRESS_DURATION = 300; // 長押し判定時間（ms）

  let dragStart = { x: 0, y: 0 };
  let initialOffset = { x: 0, y: 0 };
  let currentOffset = { x: 0, y: 0 };
  let velocity = { x: 0, y: 0 };
  let animationId: number;
  let floatPhase = Math.random() * Math.PI * 2;
  let floatPhase2 = Math.random() * Math.PI * 2;
  let hasMoved = false;
  let longPressTimer: ReturnType<typeof setTimeout> | null = null;
  let isDragMode = false;
  let currentTouchId: number | null = null;

  // タッチデバイス判定
  const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  const animateFloat = () => {
    floatPhase += 0.02;
    floatPhase2 += 0.015;

    if (!isDragging()) {
      // 慣性を適用
      currentOffset.x += velocity.x;
      currentOffset.y += velocity.y;

      // 摩擦で減速
      velocity.x *= 0.95;
      velocity.y *= 0.95;

      // ゆっくり元の位置に戻る（バネのような動き）
      currentOffset.x *= (1 - returnSpeed);
      currentOffset.y *= (1 - returnSpeed);

      // ふわふわ浮遊（複数の波を合成してより自然に・振幅増加）
      const floatX = Math.sin(floatPhase) * 8 * floatIntensity + Math.sin(floatPhase2 * 1.3) * 4 * floatIntensity + Math.sin(floatPhase * 0.5) * 3 * floatIntensity;
      const floatY = Math.cos(floatPhase * 0.8) * 10 * floatIntensity + Math.cos(floatPhase2 * 0.6) * 5 * floatIntensity + Math.cos(floatPhase * 0.3) * 4 * floatIntensity;

      // ゆらゆら回転も追加
      const floatRotX = Math.sin(floatPhase * 0.7) * 2 * floatIntensity;
      const floatRotY = Math.cos(floatPhase2 * 0.9) * 2 * floatIntensity;

      setFloatOffset({ x: floatX, y: floatY });
      setOffset({ x: currentOffset.x, y: currentOffset.y });

      // 回転をゆらゆらに設定（ドラッグ後は徐々に戻す）
      setRotation(r => ({
        x: r.x * 0.92 + floatRotX * 0.08,
        y: r.y * 0.92 + floatRotY * 0.08
      }));
    }

    animationId = requestAnimationFrame(animateFloat);
  };

  // タッチイベントハンドラー
  const handleTouchStart = (e: TouchEvent) => {
    // ボタンはそのまま動作させる
    if ((e.target as HTMLElement).closest('button')) return;

    const touch = e.touches[0];
    currentTouchId = touch.identifier;
    dragStart = { x: touch.clientX, y: touch.clientY };

    longPressTimer = setTimeout(() => {
      isDragMode = true;
      setIsDragging(true);
      initialOffset = { ...currentOffset };
      velocity = { x: 0, y: 0 };
      hasMoved = false;

      // 振動フィードバック
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }, LONG_PRESS_DURATION);
  };

  const handleTouchMove = (e: TouchEvent) => {
    const touch = Array.from(e.touches).find(t => t.identifier === currentTouchId);
    if (!touch) return;

    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // 長押し待機中に動いたらキャンセル
    if (longPressTimer && !isDragMode) {
      if (distance > 10) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
        currentTouchId = null;
        return;
      }
    }

    if (!isDragMode) return;

    // ドラッグモード中はスクロールを阻止
    e.preventDefault();

    if (distance > 5) {
      hasMoved = true;
    }

    const newX = initialOffset.x + deltaX;
    const newY = initialOffset.y + deltaY;

    velocity.x = (newX - currentOffset.x) * 0.3;
    velocity.y = (newY - currentOffset.y) * 0.3;

    currentOffset.x = newX;
    currentOffset.y = newY;

    setOffset({ x: currentOffset.x, y: currentOffset.y });

    setRotation({
      x: -deltaY * 0.05,
      y: deltaX * 0.05
    });
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }

    currentTouchId = null;

    if (!isDragMode) return;
    isDragMode = false;
    setIsDragging(false);
  };

  // マウスイベントハンドラー（PC用）
  const handleMouseDown = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (isTouchDevice()) return; // タッチデバイスではマウスイベントを無視

    isDragMode = true;
    setIsDragging(true);
    dragStart = { x: e.clientX, y: e.clientY };
    initialOffset = { ...currentOffset };
    velocity = { x: 0, y: 0 };
    hasMoved = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragMode || isTouchDevice()) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance > 5) {
      hasMoved = true;
    }

    const newX = initialOffset.x + deltaX;
    const newY = initialOffset.y + deltaY;

    velocity.x = (newX - currentOffset.x) * 0.3;
    velocity.y = (newY - currentOffset.y) * 0.3;

    currentOffset.x = newX;
    currentOffset.y = newY;

    setOffset({ x: currentOffset.x, y: currentOffset.y });

    setRotation({
      x: -deltaY * 0.05,
      y: deltaX * 0.05
    });
  };

  const handleMouseUp = () => {
    if (!isDragMode || isTouchDevice()) return;
    isDragMode = false;
    setIsDragging(false);
  };

  const handleClick = (e: MouseEvent) => {
    if (hasMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  onMount(() => {
    animationId = requestAnimationFrame(animateFloat);

    if (cardRef) {
      // タッチイベントを直接登録（passive: falseでスクロール阻止可能に）
      cardRef.addEventListener('touchstart', handleTouchStart, { passive: true });
      cardRef.addEventListener('touchmove', handleTouchMove, { passive: false });
      cardRef.addEventListener('touchend', handleTouchEnd, { passive: true });
      cardRef.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    }

    // マウスイベントはドキュメント全体で捕捉（ドラッグ中に要素外に出ても追従）
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  });

  onCleanup(() => {
    cancelAnimationFrame(animationId);
    if (longPressTimer) {
      clearTimeout(longPressTimer);
    }
    if (cardRef) {
      cardRef.removeEventListener('touchstart', handleTouchStart);
      cardRef.removeEventListener('touchmove', handleTouchMove);
      cardRef.removeEventListener('touchend', handleTouchEnd);
      cardRef.removeEventListener('touchcancel', handleTouchEnd);
    }
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  });

  return (
    <div
      ref={cardRef}
      class={`cursor-grab active:cursor-grabbing select-none ${props.class ?? ''}`}
      style={{
        transform: `translate(${offset().x + floatOffset().x}px, ${offset().y + floatOffset().y}px) rotateX(${rotation().x}deg) rotateY(${rotation().y}deg)`,
        transition: isDragging() ? 'none' : 'transform 0.15s ease-out',
        'transform-style': 'preserve-3d',
        perspective: '1000px',
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};
