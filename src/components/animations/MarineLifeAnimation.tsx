import { Component, onMount, onCleanup } from 'solid-js';
import * as THREE from 'three';

interface MarineLifeAnimationProps {
  darkMode?: boolean;
}

export const MarineLifeAnimation: Component<MarineLifeAnimationProps> = (props) => {
  let canvasRef: HTMLCanvasElement | undefined;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let animationId: number;
  let marineLife: THREE.Group[] = [];

  const createFish = (size: number, color: number, speed: number) => {
    const fishGroup = new THREE.Group();

    // 魚の体（楕円形でよりリアルに）
    const bodyGeometry = new THREE.SphereGeometry(size, 16, 12);
    bodyGeometry.scale(1.5, 1, 0.8); // 魚らしい形に変形
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: color,
      transparent: true,
      opacity: 0.9,
      shininess: 100,
      specular: 0x888888
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    fishGroup.add(body);

    // 魚の背びれ
    const dorsalFinGeometry = new THREE.ConeGeometry(size * 0.15, size * 0.8, 6);
    const dorsalFinMaterial = new THREE.MeshPhongMaterial({ 
      color: new THREE.Color(color).multiplyScalar(0.8),
      transparent: true,
      opacity: 0.8
    });
    const dorsalFin = new THREE.Mesh(dorsalFinGeometry, dorsalFinMaterial);
    dorsalFin.position.set(0, size * 0.8, 0);
    dorsalFin.rotation.x = Math.PI;
    fishGroup.add(dorsalFin);

    // 魚の尻尾（より三角形っぽく）
    const tailGeometry = new THREE.ConeGeometry(size * 0.6, size * 1.2, 6);
    tailGeometry.rotateZ(Math.PI / 2);
    tailGeometry.scale(0.5, 1, 1.5);
    const tailMaterial = new THREE.MeshPhongMaterial({ 
      color: new THREE.Color(color).multiplyScalar(0.9),
      transparent: true,
      opacity: 0.85
    });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(-size * 1.3, 0, 0);
    fishGroup.add(tail);

    // 胸びれ
    const pectoralFinGeometry = new THREE.SphereGeometry(size * 0.3, 8, 6);
    pectoralFinGeometry.scale(0.3, 1, 1.5);
    const pectoralFinMaterial = new THREE.MeshPhongMaterial({ 
      color: new THREE.Color(color).multiplyScalar(0.7),
      transparent: true,
      opacity: 0.7
    });
    const pectoralFin1 = new THREE.Mesh(pectoralFinGeometry, pectoralFinMaterial);
    const pectoralFin2 = new THREE.Mesh(pectoralFinGeometry, pectoralFinMaterial);
    pectoralFin1.position.set(size * 0.3, -size * 0.2, size * 0.6);
    pectoralFin2.position.set(size * 0.3, -size * 0.2, -size * 0.6);
    fishGroup.add(pectoralFin1);
    fishGroup.add(pectoralFin2);

    // 魚の目（よりリアルに）
    const eyeGeometry = new THREE.SphereGeometry(size * 0.18, 8, 8);
    const eyeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      shininess: 100
    });
    const pupilGeometry = new THREE.SphereGeometry(size * 0.08, 8, 8);
    const pupilMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    
    const eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    const eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    const pupil1 = new THREE.Mesh(pupilGeometry, pupilMaterial);
    const pupil2 = new THREE.Mesh(pupilGeometry, pupilMaterial);
    
    eye1.position.set(size * 0.7, size * 0.3, size * 0.4);
    eye2.position.set(size * 0.7, size * 0.3, -size * 0.4);
    pupil1.position.set(size * 0.75, size * 0.3, size * 0.4);
    pupil2.position.set(size * 0.75, size * 0.3, -size * 0.4);
    
    fishGroup.add(eye1);
    fishGroup.add(eye2);
    fishGroup.add(pupil1);
    fishGroup.add(pupil2);

    // ランダムな初期位置
    fishGroup.position.set(
      Math.random() * 40 - 20,
      Math.random() * 20 - 10,
      Math.random() * 40 - 20
    );

    // カスタムプロパティを追加
    (fishGroup as any).speed = speed;
    (fishGroup as any).direction = new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ).normalize();
    (fishGroup as any).originalY = fishGroup.position.y;
    (fishGroup as any).time = Math.random() * Math.PI * 2;

    return fishGroup;
  };

  const createJellyfish = (size: number) => {
    const jellyfishGroup = new THREE.Group();

    // クラゲのベル（上部）- より細かいセグメントでリアルに
    const bellGeometry = new THREE.SphereGeometry(size, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const bellMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4fc3f7,
      transparent: true,
      opacity: 0.4,
      shininess: 200,
      specular: 0x87ceeb
    });
    const bell = new THREE.Mesh(bellGeometry, bellMaterial);
    jellyfishGroup.add(bell);

    // クラゲの内部の輪郭
    const innerRingGeometry = new THREE.RingGeometry(size * 0.3, size * 0.8, 16);
    const innerRingMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x81c784,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    const innerRing = new THREE.Mesh(innerRingGeometry, innerRingMaterial);
    innerRing.rotation.x = -Math.PI / 2;
    innerRing.position.y = -size * 0.2;
    jellyfishGroup.add(innerRing);

    // クラゲの触手（より複雑で自然な形状）
    for (let i = 0; i < 12; i++) {
      const tentacleGroup = new THREE.Group();
      
      // メインの触手
      const segments = 8;
      for (let j = 0; j < segments; j++) {
        const segmentSize = size * 0.03 * (1 - j / segments * 0.5);
        const segmentGeometry = new THREE.SphereGeometry(segmentSize, 6, 6);
        const segmentMaterial = new THREE.MeshPhongMaterial({ 
          color: new THREE.Color(0x81c784).lerp(new THREE.Color(0x4fc3f7), j / segments),
          transparent: true,
          opacity: 0.6 - j * 0.05
        });
        const segment = new THREE.Mesh(segmentGeometry, segmentMaterial);
        segment.position.y = -j * size * 0.25;
        tentacleGroup.add(segment);
      }
      
      const angle = (i / 12) * Math.PI * 2;
      tentacleGroup.position.set(
        Math.cos(angle) * size * 0.6,
        -size * 0.3,
        Math.sin(angle) * size * 0.6
      );
      
      jellyfishGroup.add(tentacleGroup);
    }

    // ランダムな初期位置
    jellyfishGroup.position.set(
      Math.random() * 40 - 20,
      Math.random() * 15 + 5,
      Math.random() * 40 - 20
    );

    (jellyfishGroup as any).speed = 0.08;  // クラゲ：とてもゆっくり
    (jellyfishGroup as any).bobSpeed = 0.2; // 上下運動もゆっくり
    (jellyfishGroup as any).originalY = jellyfishGroup.position.y;
    (jellyfishGroup as any).time = Math.random() * Math.PI * 2;

    return jellyfishGroup;
  };

  const initThreeJS = () => {
    if (!canvasRef) {
      console.error('Canvas ref is not available');
      return;
    }

    console.log('Initializing Three.js Marine Life Animation');

    // シーン作成
    scene = new THREE.Scene();
    scene.background = null; // 透明な背景

    // カメラ作成
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 30);

    // レンダラー作成
    renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef, 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0); // 透明な背景

    console.log('Three.js renderer created successfully');

    // 環境光
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    // 方向光（太陽光）
    const directionalLight = new THREE.DirectionalLight(0x87ceeb, 0.8);
    directionalLight.position.set(0, 20, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // 深海の青い光
    const deepLight = new THREE.PointLight(0x0077be, 0.5, 50);
    deepLight.position.set(0, -10, 0);
    scene.add(deepLight);

    // 海洋生物を作成
    console.log('Creating marine life...');
    
    // 魚群を作成（ゆっくり）
    for (let i = 0; i < 8; i++) {
      const size = Math.random() * 0.5 + 0.3;
      const colors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0x96ceb4, 0xffeaa7, 0xdda0dd];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const speed = Math.random() * 0.15 + 0.05; // ゆっくり（0.05-0.2）
      const fish = createFish(size, color, speed);
      scene.add(fish);
      marineLife.push(fish);
    }
    
    // サメを作成（速い）
    for (let i = 0; i < 2; i++) {
      const size = Math.random() * 0.8 + 1.0; // 大きめ
      const color = 0x455A64; // グレー
      const speed = Math.random() * 0.6 + 0.4; // 速い（0.4-1.0）
      const shark = createFish(size, color, speed);
      scene.add(shark);
      marineLife.push(shark);
    }
    
    console.log(`Created ${marineLife.length} fish`);

    // クラゲを作成
    for (let i = 0; i < 6; i++) {
      const size = Math.random() * 1 + 0.5;
      const jellyfish = createJellyfish(size);
      scene.add(jellyfish);
      marineLife.push(jellyfish);
    }

    console.log(`Created ${marineLife.length} marine creatures`);

    // 水の泡エフェクト
    const bubbles = new THREE.Group();
    for (let i = 0; i < 20; i++) {
      const bubbleGeometry = new THREE.SphereGeometry(Math.random() * 0.1 + 0.02, 4, 4);
      const bubbleMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.3
      });
      const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
      
      bubble.position.set(
        Math.random() * 60 - 30,
        Math.random() * 40 - 20,
        Math.random() * 60 - 30
      );
      
      bubbles.add(bubble);
    }
    scene.add(bubbles);
    marineLife.push(bubbles);
  };

  const animate = () => {
    const time = Date.now() * 0.001;

    marineLife.forEach((creature) => {
      if ((creature as any).speed !== undefined) {
        // 魚の動き
        if (creature.children.length > 1 && (creature.children[1] as THREE.Mesh).geometry?.type === 'ConeGeometry') {
          const fish = creature as any;
          
          // 方向を時々変える
          if (Math.random() < 0.01) {
            fish.direction.set(
              Math.random() - 0.5,
              (Math.random() - 0.5) * 0.3,
              Math.random() - 0.5
            ).normalize();
          }

          // 移動（より細かい動き）
          creature.position.add(fish.direction.clone().multiplyScalar(fish.speed * 0.05));
          
          // 境界でバウンス
          if (Math.abs(creature.position.x) > 25) fish.direction.x *= -1;
          if (Math.abs(creature.position.z) > 25) fish.direction.z *= -1;
          if (creature.position.y > 15 || creature.position.y < -15) fish.direction.y *= -1;

          // 上下の動き（よりゆっくり）
          creature.position.y = fish.originalY + Math.sin(time * 0.5 + fish.time) * 1.5;
          
          // 魚の向きを進行方向に合わせる
          creature.lookAt(
            creature.position.x + fish.direction.x,
            creature.position.y + fish.direction.y,
            creature.position.z + fish.direction.z
          );

          // 尻尾の動き
          if (creature.children[2]) { // 尻尾のインデックスが変更
            creature.children[2].rotation.y = Math.sin(time * 5) * 0.3;
          }
          
          // 胸びれの動き
          if (creature.children[4] && creature.children[5]) {
            const finMovement = Math.sin(time * 3) * 0.4;
            creature.children[4].rotation.z = finMovement;
            creature.children[5].rotation.z = -finMovement;
          }
        }
        // クラゲの動き
        else if (creature.children[0] && (creature.children[0] as THREE.Mesh).geometry?.type === 'SphereGeometry') {
          const jellyfish = creature as any;
          jellyfish.time += 0.01; // よりゆっくり
          
          // ゆらゆらとした動き（よりゆっくり）
          creature.position.y = jellyfish.originalY + Math.sin(jellyfish.time) * 2;
          creature.position.x += Math.sin(jellyfish.time * 0.5) * 0.01;
          creature.position.z += Math.cos(jellyfish.time * 0.3) * 0.01;
          
          // ベルの脈動（より穏やか）
          const scale = 1 + Math.sin(jellyfish.time * 1.5) * 0.05;
          creature.children[0].scale.set(scale, scale, scale);
          
          // 触手グループの動き（よりリアルに）
          for (let i = 2; i < creature.children.length; i++) { // 触手グループは2番目から
            const tentacleGroup = creature.children[i];
            if (tentacleGroup instanceof THREE.Group) {
              // 各触手グループ全体の動き
              tentacleGroup.rotation.x = Math.sin(time * 0.8 + i) * 0.15;
              tentacleGroup.rotation.z = Math.cos(time * 0.6 + i) * 0.1;
              
              // 触手の各セグメントの動き
              tentacleGroup.children.forEach((segment, j) => {
                segment.rotation.x = Math.sin(time * 1.2 + i + j * 0.3) * 0.1;
                segment.rotation.z = Math.cos(time * 1.0 + i + j * 0.2) * 0.08;
              });
            }
          }
        }
      }
    });

    // カメラの微妙な動き
    camera.position.x = Math.sin(time * 0.1) * 2;
    camera.position.y = Math.cos(time * 0.15) * 1;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    animationId = requestAnimationFrame(animate);
  };

  const handleResize = () => {
    if (!camera || !renderer) return;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  onMount(() => {
    initThreeJS();
    animate();
    window.addEventListener('resize', handleResize);
  });

  onCleanup(() => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    window.removeEventListener('resize', handleResize);
    
    // Three.jsリソースのクリーンアップ
    if (renderer) {
      renderer.dispose();
    }
    if (scene) {
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    }
  });

  return (
    <canvas
      ref={canvasRef}
      class="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        'z-index': '1',
        opacity: props.darkMode ? '0.8' : '0.6',
        'mix-blend-mode': 'screen'
      }}
    />
  );
};
