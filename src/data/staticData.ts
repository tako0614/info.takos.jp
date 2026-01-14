import type { MutualLink, SkillData } from '../types';
import { HiOutlinePaintBrush } from 'solid-icons/hi';
import { FiServer, FiTool, FiCode } from 'solid-icons/fi';
import { BiRegularServer } from 'solid-icons/bi';
import { IoSparklesOutline } from 'solid-icons/io';

export const mutualLinks: MutualLink[] = [
  {
    name: "371ちゃん",
    url: "https://371tti.net",
    banner: "https://371tti.net/banner.png",
    description: "371ちゃんの公式サイトです"
  },
  {
    name: "Yunai",
    url: "https://ynai20.vercel.app",
    banner: "https://ynai20.vercel.app/banner.png", 
    description: "Yunaiの公式サイトです"
  },
  {
    name: "t3traちゃん",
    url: "https://t3tra.dev",
    banner: "https://t3tra.dev/images/banner_dark.png",
  },
  {
    name: "akku",
    url: "https://akku1139.github.io",
    banner: "https://akku1139.github.io/banners/320x100.png",
  },
    {
    name: "techfish",
    url: "https://techfish.dev/",
    banner: "https://cdn.sakana11.org/banner.jpg",
  }
];

export const skillsData: SkillData[] = [
  { title: "Frontend", text: "React, Next.js, Preact, SolidJS, Tailwind CSS", icon: HiOutlinePaintBrush, color: "from-blue-500 to-indigo-600" },
  { title: "Backend", text: "Node.js, Deno, PHP, Laravel, Hono", icon: FiServer, color: "from-green-500 to-teal-600" },
  { title: "Tools", text: "Git, Docker, Deno Deploy", icon: FiTool, color: "from-purple-500 to-pink-600" },
  { title: "Infrastructure", text: "GCP, AWS, Cloudflare, Proxmox, k8s, Linux", icon: BiRegularServer, color: "from-red-500 to-orange-600" },
  { title: "Languages", text: "JavaScript, TypeScript, PHP, Rust", icon: FiCode, color: "from-yellow-500 to-amber-600" },
  { title: "Other", text: "UI/UX Design, SEO基礎, グラフィックデザイン", icon: IoSparklesOutline, color: "from-cyan-500 to-blue-600" },
];

export const aboutData = {
  vision: {
    title: "私のビジョン",
    content: `
      私はAIの力で今後数年のうちに人類が労働から解放されると確信しており、その未来までにAIとソフトウェアの力を駆使し、イノベーションを起こすようなプロダクトを開発したいと思います。そのことすらAIが担う時代が来るのは時間の問題だと考えますが悪あがきをしたいと考えています。
      現時点でもAIでソフトウェアの大部分が開発されており、プログラマーとして社会人として働くことはないでしょう。しかし、会社を経営してAIを活用してプロダクトを生み出す立場にはなりたいと考えています。その領域はまだAIが及んでいないと感じており、社会実装が遅れると考えています。
      AIがすべてを掌握したら私は政治家になろうと考えています。私が政治家になったら次のような政策を実行します。代表民主制の廃止とAIによる立法、通貨の廃止と完全自動化されたベーシックインカムの導入、AIによる司法の実現などです。
    `
  },
  philosophy: {
    title: "私の哲学と価値観",
    content: `
      <p>中学時代における哲学的探求が、現在の思想的基盤を形成する重要な転換点となりました。この知的な冒険は、私の人格形成に計り知れない影響を与えています。</p>
      
      <p>特に<span class="text-orange-400 font-medium">フリードリヒ・ニーチェ</span>の超人思想に深く共鳴しており、「人間が自らの力で新しい価値を創造し、より高次の存在へと進化する」という理念に強い共感を抱いています。</p>
      
    `
  },
  learning: {
    title: "学習中の技術",
    content: "現在はRustとWebAssemblyを重点的に学習しています。高パフォーマンスな分散型アプリケーション開発のために必要だと感じています。また、暗号技術とP2P通信についても理解を深めるため、関連書籍や論文を読んでいます。"
  }
};
