function App() {
  return (
    <div class="bg-[url(/nya.jpg)] bg-cover bg-fixed bg-center w-full min-h-screen no-scrollbar">
      <div class="text-white w-full min-h-screen p-8 bg-black/30 no-scrollbar">
        {/* ヘッダーセクション */}
        <header class="max-w-4xl mx-auto text-center py-16">
          {/* アイコン画像を追加 */}
          <div class="w-32 h-32 mx-auto mb-6">
            <img
              src="./icon.png"
              alt="プロフィールアイコン"
              class="w-full h-full object-cover rounded-full"
            />
          </div>
          <h1 class="text-5xl font-bold mb-4">たこ</h1>
          <p class="text-xl text-gray-300">real name: Tomiyama Shota</p>
        </header>

        <main class="max-w-4xl mx-auto">
          <section class="mb-16">
            <h2 class="text-3xl font-semibold mb-6">About Me</h2>
            <p class="text-gray-200 leading-relaxed">
              はじめまして、たこです。プログラミングばっかしている高校生です。
              プログラミングが好きで、主にWeb開発をしています。最近はtakosという次世代のLINEを目指したプロジェクトを進めています。
              趣味はプログラミング以外にも、アニメや漫画を見ることです。
              将来の夢は、プログラマーではなく起業家や実業家になることです。
              AIの進歩により近い将来不老不死が実現されると考え、上級国民になることでいち早くその恩恵を受けようと目論んでいます。
            </p>
          </section>
          <section class="mb-16">
            <h2 class="text-3xl font-semibold mb-6">Status</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-[#232323]/50 p-6 rounded-lg">
                <div class="space-y-4">
                  <div class="flex items-center space-x-3">
                    <span class="text-xl">👤</span>
                    <div>
                      <h3 class="font-medium">Name</h3>
                      <p class="text-gray-400">冨山 翔太 (Tomiyama Shota)</p>
                    </div>
                  </div>

                  <div class="flex items-center space-x-3">
                    <span class="text-xl">🎂</span>
                    <div>
                      <h3 class="font-medium">Age</h3>
                      <p class="text-gray-400">16歳</p>
                    </div>
                  </div>

                  <div class="flex items-center space-x-3">
                    <span class="text-xl">📍</span>
                    <div>
                      <h3 class="font-medium">Location</h3>
                      <p class="text-gray-400">大阪市生野区</p>
                    </div>
                  </div>

                  <div class="flex items-center space-x-3">
                    <span class="text-xl">🎓</span>
                    <div>
                      <h3 class="font-medium">School</h3>
                      <p class="text-gray-400">大阪府立清水谷高等学校</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-[#232323]/50 p-6 rounded-lg">
                <div class="space-y-4">
                  <div class="flex items-center space-x-3">
                    <span class="text-xl">🍣</span>
                    <div>
                      <h3 class="font-medium">Favorite Food</h3>
                      <p class="text-gray-400">寿司</p>
                    </div>
                  </div>

                  <div class="flex items-center space-x-3">
                    <span class="text-xl">📚</span>
                    <div>
                      <h3 class="font-medium">Favorite Manga</h3>
                      <p class="text-gray-400">お兄ちゃんはおしまい！</p>
                    </div>
                  </div>

                    <div class="flex items-center space-x-3">
                    <span class="text-xl">☕</span>
                    <div>
                      <h3 class="font-medium">Favorite Drink</h3>
                        <p class="text-gray-400">Cider, Cola, Coffee</p>
                    </div>
                    </div>

                  <div class="flex items-center space-x-3">
                    <span class="text-xl">🏛️</span>
                    <div>
                      <h3 class="font-medium">Political Affiliation</h3>
                      <p class="text-gray-400">日本維新の会、国民民主党、日本保守党</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* スキルセット */}
          <section class="mb-16">
            <h2 class="text-3xl font-semibold mb-6">Skills</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div class="bg-[#232323]/50 p-4 rounded-lg">
                <h3 class="font-medium mb-2">Frontend</h3>
                <p class="text-gray-400">Preact, SolidJS, Tailwind CSS</p>
              </div>
              <div class="bg-[#232323]/50 p-4 rounded-lg">
                <h3 class="font-medium mb-2">Backend</h3>
                <p class="text-gray-400">Node.js, Deno, php, laravel, hono</p>
              </div>
              <div class="bg-[#232323]/50 p-4 rounded-lg">
                <h3 class="font-medium mb-2">Tools</h3>
                <p class="text-gray-400">Git, Docker, Deno deploy</p>
              </div>
              <div class="bg-[#232323]/50 p-4 rounded-lg">
                <h3 class="font-medium mb-2">infrastructure</h3>
                <p class="text-gray-400">proxmox, k8s, Linux</p>
              </div>
            </div>
          </section>

          {/* プロジェクト */}
          <section class="mb-16">
            <h2 class="text-3xl font-semibold mb-6">Projects</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-[#232323]/50 p-6 rounded-lg">
                <h3 class="text-xl font-medium mb-2">takos</h3>
                <p class="text-gray-400">
                  分散型チャットSNS Matrixみたいな分散型・暗号化機能
                  LINEみたいな使いやすいUIとUXを目指しています。
                </p>
              </div>
              {/* 必要に応じて追加のプロジェクトカードを追加 */}
            </div>
          </section>

          {/* コンタクト */}
          <section class="text-center pb-8">
            <h2 class="text-3xl font-semibold mb-6">Contact</h2>
            <div class="flex justify-center space-x-6">
              <a
                href="https://line.me/ti/g2/Q0c8YJlkh5f_hkDuODxp39XF9A7BOCFqezaAHA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
                class="text-gray-400 hover:text-white transition-colors"
              >
                OpenChat
              </a>
              <a
                href="https://github.com/tako0614"
                class="text-gray-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://x.com/takoserver_com"
                class="text-gray-400 hover:text-white transition-colors"
              >
                twitter・X
              </a>
            </div>
          </section>
          <footer class="text-center text-gray-400 mt-16">
            <p>© 2024 Tomiyama Shota. Built with SolidJS & Tailwind CSS</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
