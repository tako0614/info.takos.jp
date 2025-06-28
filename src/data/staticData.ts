import type { MutualLink, SkillData, TimelineItem } from '../types';

export const quotes = [
  "思想がない人に価値はない",
  "手段が目的化している人は、何も生み出せない",
  "勝利こそ正義",
];

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
