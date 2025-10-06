import type { MutualLink, SkillData, TimelineItem } from '../types';

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
  }
];

export const skillsData: SkillData[] = [
  { title: "Frontend", text: "Preact, SolidJS, Tailwind CSS", icon: "🎨", color: "from-blue-500 to-indigo-600", level: 85 },
  { title: "Backend", text: "Node.js, Deno, PHP, Laravel, Hono", icon: "⚙️", color: "from-green-500 to-teal-600", level: 78 },
  { title: "Tools", text: "Git, Docker, Deno Deploy", icon: "🔧", color: "from-purple-500 to-pink-600", level: 82 },
  { title: "Infrastructure", text: "Proxmox, k8s, Linux", icon: "🏗️", color: "from-red-500 to-orange-600", level: 70 },
  { title: "Languages", text: "JavaScript, TypeScript, PHP, Rust (学習中)", icon: "📝", color: "from-yellow-500 to-amber-600", level: 88 },
  { title: "Other", text: "UI/UX Design, SEO基礎, グラフィックデザイン", icon: "✨", color: "from-cyan-500 to-blue-600", level: 75 },
];

export const timelineData: TimelineItem[] = [
  { year: "2008", title: "誕生", text: "大阪府で生まれる" },
  { year: "2024", title: "高校入学", text: "清水谷高校に入学" },
];

export const aboutData = {
  intro: "はじめまして、<span class=\"gradient-text-luxury font-semibold\">たこ</span>です。プログラミングに情熱を注ぐ高校生として、次世代のデジタル体験を創造することに専念しています。",
  vision: {
    title: "私のビジョン",
    content: `
      <p>プログラミングを超えた多彩な興味として、アニメーションと文学的表現への深い愛情を抱いております。私の将来への展望は、単なる技術者ではなく、<span class="gradient-text-luxury font-medium">起業家・実業家</span>として社会に変革をもたらすことにあります。</p>
      
      <p>人工知能の飛躍的進歩により、近い将来における生命科学の革命を確信しており、この歴史的転換点において先駆的な立場を確保することを目標としています。</p>
      
      <p>テクノロジーの力を通じて世界に新たな価値を創出したいと考えており、特に<span class="text-purple-400 font-medium">分散型システム</span>と<span class="text-cyan-400 font-medium">プライバシー保護技術</span>の分野において、既存の権力構造に挑戦する革新的なソリューションの開発に興味を持っています。</p>
      
      <p class="text-gray-300 italic border-l-4 border-purple-500/50 pl-4">プログラミングは私にとって手段であり、目的ではありません。理想とする未来を実現するために必要な技術を習得し、それを戦略的に活用していく所存です。</p>
    `
  },
  philosophy: {
    title: "私の哲学と価値観",
    content: `
      <p>中学時代における哲学的探求が、現在の思想的基盤を形成する重要な転換点となりました。この知的な冒険は、私の人格形成に計り知れない影響を与えています。</p>
      
      <p>特に<span class="text-orange-400 font-medium">フリードリヒ・ニーチェ</span>の超人思想に深く共鳴しており、「人間が自らの力で新しい価値を創造し、より高次の存在へと進化する」という理念に強い共感を抱いています。</p>
      
      <p><span class="text-blue-400 font-medium">実存主義</span>の巨匠であるサルトルとカミュの思想、特に「<span class="italic text-purple-300">実存は本質に先立つ</span>」という核心的概念から深い影響を受けています。自己の定義は他者や社会の規範によってではなく、自身の行動と選択によってのみ決定されるという確固たる信念を持っています。</p>
      
      <p>テクノロジーの発展は、創造性と自由という人間の本質的精神を具現化する究極の手段であると認識しています。<span class="gradient-text-luxury">コードを書く行為</span>は私にとって新たな価値創造そのものであり、開発プロセス自体が芸術的自己表現の一形態なのです。</p>
    `
  },
  learning: {
    title: "学習中の技術",
    content: "現在はRustとWebAssemblyを重点的に学習しています。高パフォーマンスな分散型アプリケーション開発のために必要だと感じています。また、暗号技術とP2P通信についても理解を深めるため、関連書籍や論文を読んでいます。"
  }
};

export const timelineExtraData = {
  future: {
    title: "将来の展望",
    content: `
      <p>今後5年間においては、<span class="text-purple-400 font-medium">技術的専門性の深化</span>と並行して、プロジェクトの規模拡大に戦略的に取り組む計画です。高校卒業後は、<span class="text-blue-400 font-medium">情報科学</span>と<span class="text-green-400 font-medium">経営学</span>の両分野における学術的基盤を構築しながら、<span class="gradient-text-luxury">スタートアップ企業の創設</span>も視野に入れています。</p>
      
      <p>10年後のビジョンとして、自らが率いる<span class="text-cyan-400 font-medium">技術革新チーム</span>を組織し、<span class="text-purple-400 font-medium">分散型システム</span>と<span class="text-pink-400 font-medium">プライバシー保護技術</span>の分野において、世界的に認知される革新的サービスの創出を目標としています。</p>
      
      <p>この目標実現のため、<span class="text-orange-400 font-medium">オープンソースコミュニティ</span>への継続的貢献を通じてグローバルなネットワークを構築し、技術的深度と経営戦略の両面において実践的経験を積み重ねていく所存です。</p>

      <p class="text-gray-300 italic border-l-4 border-purple-500/50 pl-4">最終的には、自社を通じた社会課題の根本的解決により、テクノロジーの力で人類の生活品質を革命的に向上させることが、私の存在意義なのです。</p>
    `
  }
};
