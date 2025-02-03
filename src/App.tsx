import { Component, createSignal, onMount, onCleanup } from 'solid-js';

/**
 * FadeIn コンポーネント
 * Intersection Observer で表示時に「fade-in」クラスを追加
 */
const FadeIn: Component<{ children: any; class?: string }> = (props) => {
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

const App: Component = () => {
  // アイコンクリック時のアニメーション状態（トグル）
  const [rotate, setRotate] = createSignal(false);

  return (
    <div class="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      {/* 背景画像（ゆっくりパン・ズーム） */}
      <div
        class="absolute inset-0 bg-[url('/nya.jpg')] bg-cover bg-center animate-backgroundZoom opacity-30 mix-blend-overlay"
        aria-hidden="true"
      ></div>

      <div class="relative z-10 text-white min-h-screen p-8 backdrop-blur-sm">
        {/* ヘッダーセクション */}
        <FadeIn class="text-center py-16">
          <div
            class={`w-32 h-32 mx-auto mb-6 border-4 border-white rounded-full overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-110 hover:rotate-3 cursor-pointer ${
              rotate() ? "animate-spinOnce" : ""
            }`}
            onClick={() => setRotate(true)}
            // アニメーション完了後に状態リセットするため、animationend イベントで解除
            onAnimationEnd={() => setRotate(false)}
          >
            <img
              src="./icon.png"
              alt="プロフィールアイコン"
              class="w-full h-full object-cover"
            />
          </div>
          <h1 class="text-5xl font-extrabold mb-4 tracking-wide">たこ</h1>
          <p class="text-xl text-gray-300">real name: Tomiyama Shota</p>
        </FadeIn>

        <main class="max-w-4xl mx-auto space-y-16">
          {/* About Me */}
          <FadeIn>
            <section>
              <h2 class="text-3xl font-semibold mb-6 border-b pb-2 border-gray-600">
                About Me
              </h2>
              <p class="text-gray-200 leading-relaxed">
                はじめまして、たこです。プログラミングばっかしている高校生です。プログラミングが好きで、主にWeb開発をしています。最近はtakosという次世代のLINEを目指したプロジェクトを進めています。
                趣味はプログラミング以外にも、アニメや漫画を見ることです。将来の夢は、プログラマーではなく起業家や実業家になることです。
                AIの進歩により近い将来不老不死が実現されると考え、上級国民になることでいち早くその恩恵を受けようと目論んでいます。
              </p>
            </section>
          </FadeIn>

          {/* Status */}
          <FadeIn>
            <section>
              <h2 class="text-3xl font-semibold mb-6 border-b pb-2 border-gray-600">
                Status
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white/10 p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:rotate-1">
                  <div class="space-y-4">
                    <div class="flex items-center space-x-3">
                      <span class="text-2xl">👤</span>
                      <div>
                        <h3 class="font-medium">Name</h3>
                        <p class="text-gray-400">
                          冨山 翔太 (Tomiyama Shota)
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span class="text-2xl">🎂</span>
                      <div>
                        <h3 class="font-medium">Age</h3>
                        <p class="text-gray-400">16歳</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span class="text-2xl">📍</span>
                      <div>
                        <h3 class="font-medium">Location</h3>
                        <p class="text-gray-400">大阪市生野区</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span class="text-2xl">🎓</span>
                      <div>
                        <h3 class="font-medium">School</h3>
                        <p class="text-gray-400">
                          大阪府立清水谷高等学校
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="bg-white/10 p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:rotate-1">
                  <div class="space-y-4">
                    <div class="flex items-center space-x-3">
                      <span class="text-2xl">🍣</span>
                      <div>
                        <h3 class="font-medium">Favorite Food</h3>
                        <p class="text-gray-400">寿司</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span class="text-2xl">📚</span>
                      <div>
                        <h3 class="font-medium">Favorite Manga</h3>
                        <p class="text-gray-400">
                          お兄ちゃんはおしまい！
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span class="text-2xl">☕</span>
                      <div>
                        <h3 class="font-medium">Favorite Drink</h3>
                        <p class="text-gray-400">
                          Cider, Cola, Coffee
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span class="text-2xl">🏛️</span>
                      <div>
                        <h3 class="font-medium">
                          Political Affiliation
                        </h3>
                        <p class="text-gray-400">
                          日本維新の会、国民民主党、日本保守党
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* Skills */}
          <FadeIn>
            <section>
              <h2 class="text-3xl font-semibold mb-6 border-b pb-2 border-gray-600">
                Skills
              </h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { title: "Frontend", text: "Preact, SolidJS, Tailwind CSS" },
                  { title: "Backend", text: "Node.js, Deno, PHP, Laravel, Hono" },
                  { title: "Tools", text: "Git, Docker, Deno Deploy" },
                  { title: "Infrastructure", text: "Proxmox, k8s, Linux" },
                ].map((skill) => (
                  <div class="bg-white/10 p-4 rounded-lg shadow transform transition-transform duration-300 hover:scale-105 hover:rotate-1">
                    <h3 class="font-medium mb-2">{skill.title}</h3>
                    <p class="text-gray-400">{skill.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>

          {/* Projects */}
          <FadeIn>
            <section>
              <h2 class="text-3xl font-semibold mb-6 border-b pb-2 border-gray-600">
                Projects
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white/10 p-6 rounded-lg shadow transform transition-transform duration-300 hover:scale-105 hover:rotate-1">
                  <h3 class="text-xl font-medium mb-2">takos</h3>
                  <p class="text-gray-400">
                    分散型チャットSNS。Matrix のような分散型・暗号化機能と、LINE のような使いやすい UI/UX を目指しています。
                  </p>
                </div>
                {/* 必要に応じて追加のプロジェクトカード */}
              </div>
            </section>
          </FadeIn>

          {/* 相互Links */}
          <FadeIn>
            <section>
              <h2 class="text-3xl font-semibold mb-6 border-b pb-2 border-gray-600">
                相互Links
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white/10 p-6 rounded-lg shadow transform transition-transform duration-300 hover:scale-105 hover:rotate-1">
                  <h3 class="text-xl font-medium mb-2">akku</h3>
                  <p class="text-gray-400">
                    <a
                      href="https://akku1139.github.io/"
                      class="text-blue-400 hover:underline transition-colors duration-200"
                    >
                      https://akku1139.github.io/
                    </a>
                  </p>
                </div>
                <div class="bg-white/10 p-6 rounded-lg shadow transform transition-transform duration-300 hover:scale-105 hover:rotate-1">
                  <h3 class="text-xl font-medium mb-2">tech_fish</h3>
                  <p class="text-gray-400">
                    <a
                      href="https://sakana11.org"
                      class="text-blue-400 hover:underline transition-colors duration-200"
                    >
                      https://sakana11.org
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* Contact */}
          <FadeIn>
            <section class="text-center">
              <h2 class="text-3xl font-semibold mb-6 border-b pb-2 border-gray-600">
                Contact
              </h2>
              <div class="flex justify-center space-x-6">
                <a
                  href="https://line.me/ti/g2/Q0c8YJlkh5f_hkDuODxp39XF9A7BOCFqezaAHA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
                  class="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  OpenChat
                </a>
                <a
                  href="https://github.com/tako0614"
                  class="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  GitHub
                </a>
                <a
                  href="https://x.com/takoserver_com"
                  class="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  twitter・X
                </a>
              </div>
            </section>
          </FadeIn>
        </main>

        {/* フッター */}
        <FadeIn>
          <footer class="text-center text-gray-400 mt-16 border-t pt-4 border-gray-600">
            <p>© 2024 Tomiyama Shota. Built with SolidJS & Tailwind CSS</p>
          </footer>
        </FadeIn>
      </div>
    </div>
  );
};

export default App;
