import { Component, onMount, onCleanup } from 'solid-js';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

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

    /* ---------- Body : fusiform with Lathe ---------- */
    const bodyLen = size * 3;          // 全長
    const maxRad = size * 0.9;         // 一番太い所の半径
    const tailRad = size * 0.12;       // 尾びれ付け根の細さ
    const headRad = size * 0.15;       // 口先の細さ
    const segments = 32;

    const profile: THREE.Vector2[] = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;            // 0 → 1 の位置
      const y = t * bodyLen - bodyLen/2; // −半分 … ＋半分 の範囲に配置
      // 0–0.25  : 尾側で急激に細い
      // 0.25–0.75: 胴が太い
      // 0.75–1  : 頭側で絞る
      let r: number;
      if (t < 0.25)       r = THREE.MathUtils.lerp(tailRad, maxRad, t/0.25);
      else if (t < 0.75)  r = maxRad;
      else                r = THREE.MathUtils.lerp(maxRad, headRad, (t-0.75)/0.25);
      profile.push(new THREE.Vector2(r, y));
    }

    const bodyGeometry = new THREE.LatheGeometry(profile, 128); // smoother body

    // fish‑scale normal map
    const scaleNormal = new THREE.TextureLoader().load('/textures/fish_scales_normal.jpg');
    scaleNormal.wrapS = scaleNormal.wrapT = THREE.RepeatWrapping;
    scaleNormal.repeat.set(10, 2);

    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: color,
      roughness: 0.35,
      metalness: 0.3,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
      iridescence: 1.0,
      iridescenceIOR: 1.4,
      transmission: 0.05,
      thickness: 0.2,
      envMapIntensity: 0.9,
      normalMap: scaleNormal,
      normalScale: new THREE.Vector2(0.2, 0.2),
      transparent: true,
      opacity: 0.97,
    });

    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    fishGroup.add(body);

    /* ---------- Tail fin : Plane ---------- */
    const tailW = size * 1.2;
    const tailH = size * 1.4;
    const tailGeometry = new THREE.PlaneGeometry(tailW, tailH);
    const tailMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color).multiplyScalar(0.8),
      transparent: true,
      side: THREE.DoubleSide,
      roughness: 0.8,
      metalness: 0.05,
      clearcoat: 0.3,
      clearcoatRoughness: 0.4,
      transmission: 0.9,
      thickness: 0.05,
      opacity: 0.95,
    });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(-bodyLen/2 - tailRad, 0, 0);
    tail.rotateY(Math.PI/2);             // XY 方向 → XZ 平面へ
    fishGroup.add(tail);

    /* ---------- Dorsal + pectoral fins ---------- */
    const makeFin = (w: number, h: number, x: number, y: number, z: number, rotY: number) => {
      const geo = new THREE.PlaneGeometry(w, h);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color).multiplyScalar(0.7),
        transparent: true,
        side: THREE.DoubleSide,
        opacity: 0.8,
        roughness: 0.9,
        metalness: 0.0,
      });
      const fin = new THREE.Mesh(geo, mat);
      fin.position.set(x, y, z);
      fin.rotateY(rotY);
      fishGroup.add(fin);
      return fin;
    };

    // 背びれ
    const dorsalFin = makeFin(size*0.9, size*1.1, 0, maxRad*0.9, 0, 0);
    
    // 左右の胸びれ
    const pectoralFin1 = makeFin(size*0.7, size*0.5, size*0.3, 0, maxRad*0.8, Math.PI/8);
    const pectoralFin2 = makeFin(size*0.7, size*0.5, size*0.3, 0, -maxRad*0.8, -Math.PI/8);

    /* ---------- Eyes ---------- */
    const eyeGeometry = new THREE.SphereGeometry(size*0.12, 16, 16);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.1 });
    const eyeX = bodyLen*0.35;
    const eyeY = size*0.25;
    const eyeZ = maxRad*0.75;
    const eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye1.position.set(eyeX, eyeY, eyeZ);
    const eye2 = eye1.clone();
    eye2.position.z *= -1;
    fishGroup.add(eye1);
    fishGroup.add(eye2);

    /* ---------- Position & "metadata" ---------- */
    fishGroup.position.set(
      Math.random() * 40 - 20,
      Math.random() * 20 - 10,
      Math.random() * 40 - 20
    );

    (fishGroup as any).isFish = true;
    (fishGroup as any).speed = speed;
    (fishGroup as any).direction = new THREE.Vector3(
      Math.random() - 0.5,
      (Math.random() - 0.5) * 0.3,
      Math.random() - 0.5
    ).normalize();
    (fishGroup as any).originalY = fishGroup.position.y;
    (fishGroup as any).time = Math.random() * Math.PI * 2;
    (fishGroup as any).tailMesh = tail;   // アニメ用に握っておく
    (fishGroup as any).dorsalFin = dorsalFin;
    (fishGroup as any).pectoralFin1 = pectoralFin1;
    (fishGroup as any).pectoralFin2 = pectoralFin2;

    return fishGroup;
  };

  const createJellyfish = (size: number) => {
    const jellyfishGroup = new THREE.Group();

    // ベル (LatheGeometryで滑らかな形状に)
    const points = [];
    for (let i = 0; i < 10; i++) {
      points.push(new THREE.Vector2(Math.sin(i * 0.2) * size + Math.sin(i * 0.5) * size * 0.2, (i - 5) * size * 0.3));
    }
    const bellGeometry = new THREE.LatheGeometry(points, 20);
    const bellMaterial = new THREE.MeshStandardMaterial({
      color: 0x4fc3f7,
      transparent: true,
      opacity: 0.5,
      metalness: 0.5,
      roughness: 0.1,
      side: THREE.DoubleSide,
      emissive: 0x87ceeb,
      emissiveIntensity: 0.3
    });
    const bell = new THREE.Mesh(bellGeometry, bellMaterial);
    bell.rotation.x = Math.PI;
    jellyfishGroup.add(bell);

    // 触手 (TubeGeometryで自然なカーブ)
    const tentacleMaterial = new THREE.MeshStandardMaterial({
      color: 0x81c784,
      transparent: true,
      opacity: 0.6,
      metalness: 0.2,
      roughness: 0.5,
      emissive: 0x4fc3f7,
      emissiveIntensity: 0.2
    });

    (jellyfishGroup as any).tentacles = [];

    for (let i = 0; i < 8; i++) {
      const curvePoints = [];
      const length = Math.random() * size * 3 + size * 2;
      for (let j = 0; j < 10; j++) {
        curvePoints.push(new THREE.Vector3(
          Math.sin(j * 0.5 + i) * size * 0.1,
          -j * length / 10,
          Math.cos(j * 0.3 + i) * size * 0.1
        ));
      }
      const curve = new THREE.CatmullRomCurve3(curvePoints);
      const tubeGeometry = new THREE.TubeGeometry(curve, 20, size * 0.05, 8, false);
      const tentacle = new THREE.Mesh(tubeGeometry, tentacleMaterial);
      
      const angle = (i / 8) * Math.PI * 2;
      tentacle.position.set(
        Math.cos(angle) * size * 0.7,
        -size * 1.2,
        Math.sin(angle) * size * 0.7
      );
      jellyfishGroup.add(tentacle);
      (jellyfishGroup as any).tentacles.push({ mesh: tentacle, curve: curve, originalPoints: curvePoints, size: size });
    }

    // ランダムな初期位置
    jellyfishGroup.position.set(
      Math.random() * 40 - 20,
      Math.random() * 15 + 5,
      Math.random() * 40 - 20
    );

    (jellyfishGroup as any).isJellyfish = true;
    (jellyfishGroup as any).speed = 0.08;
    (jellyfishGroup as any).bobSpeed = 0.2;
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
    (renderer as any).physicallyCorrectLights = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
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

    // HDRI environment map for realistic reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    new RGBELoader()
      .setPath('/textures/') // place your .hdr file here
      .load('studio_small_08_2k.hdr', (hdr) => {
        const envMap = pmrem.fromEquirectangular(hdr).texture;
        scene.environment = envMap;
        hdr.dispose();
        pmrem.dispose();
      });

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
      if ((creature as any).isFish) {
        const fish = creature as any;
        
        // 方向を時々変える
        if (Math.random() < 0.01) {
          fish.direction.set(
            Math.random() - 0.5,
            (Math.random() - 0.5) * 0.3,
            Math.random() - 0.5
          ).normalize();
        }

        // 移動
        creature.position.add(fish.direction.clone().multiplyScalar(fish.speed * 0.05));
        
        // 境界でバウンス
        if (Math.abs(creature.position.x) > 25) fish.direction.x *= -1;
        if (Math.abs(creature.position.z) > 25) fish.direction.z *= -1;
        if (creature.position.y > 15 || creature.position.y < -15) fish.direction.y *= -1;

        // 上下の動き
        creature.position.y = fish.originalY + Math.sin(time * 0.5 + fish.time) * 1.5;
        
        // 魚の向きを進行方向に合わせる
        creature.lookAt(
          creature.position.x + fish.direction.x,
          creature.position.y + fish.direction.y,
          creature.position.z + fish.direction.z
        );

        // 尻尾の動き（しなり）
        const tail = (fish as any).tailMesh as THREE.Mesh;
        if (tail) {
          const freq = THREE.MathUtils.clamp(fish.speed * 15, 6, 18);
          tail.rotation.z = Math.sin(time * freq) * 0.30; // speed‑adaptive tail beat
        }
        
        // 胸びれの動き（羽ばたき）
        const pectoralFin1 = (fish as any).pectoralFin1 as THREE.Mesh;
        const pectoralFin2 = (fish as any).pectoralFin2 as THREE.Mesh;
        if (pectoralFin1 && pectoralFin2) {
          const finMovement = Math.sin(time * 8) * 0.4;
          pectoralFin1.rotation.z = finMovement;
          pectoralFin2.rotation.z = -finMovement;
        }

        // 背びれの微妙な動き
        const dorsalFin = (fish as any).dorsalFin as THREE.Mesh;
        if (dorsalFin) {
          dorsalFin.rotation.z = Math.sin(time * 6 + fish.time) * 0.15;
        }
      }
      else if ((creature as any).isJellyfish) {
        const jellyfish = creature as any;
        jellyfish.time += 0.01;

        // ゆらゆらとした動き
        creature.position.y = jellyfish.originalY + Math.sin(jellyfish.time) * 2;
        creature.position.x += Math.sin(jellyfish.time * 0.5) * 0.01;
        creature.position.z += Math.cos(jellyfish.time * 0.3) * 0.01;

        // ベルの脈動
        const scale = 1 + Math.sin(jellyfish.time * 1.5) * 0.08;
        const bell = creature.children[0] as THREE.Mesh;
        bell.scale.set(1, scale, 1);

        // 触手の動き
        jellyfish.tentacles.forEach((t: any, i: number) => {
          const newPoints = t.originalPoints.map((p: THREE.Vector3, j: number) => {
            return new THREE.Vector3(
              p.x + Math.sin(jellyfish.time * 2 + i + j) * 0.2,
              p.y,
              p.z + Math.cos(jellyfish.time * 2 + i + j) * 0.2
            );
          });
          const newCurve = new THREE.CatmullRomCurve3(newPoints);
          const tubeGeo = t.mesh.geometry as THREE.TubeGeometry;
          tubeGeo.copy(new THREE.TubeGeometry(newCurve, 20, t.size * 0.05, 8, false));
          // mark the position attribute for update
          tubeGeo.getAttribute('position').needsUpdate = true;
        });
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
