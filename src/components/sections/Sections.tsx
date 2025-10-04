import { Component, For } from 'solid-js';
import { skillsData, timelineData } from '../../data/staticData';
import { FadeIn } from '../ui/FadeIn';
import { ExpandableText } from '../ui/ExpandableText';

export const AboutSection: Component = () => (
  <FadeIn>
    <section>
      <div class="relative mb-12">
        <div class="flex items-center space-x-4">
          <div>
            <h2 class="text-4xl font-bold neon-glow">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300">About Me</span>
            </h2>
          </div>
        </div>
        <div class="absolute -bottom-2 -right-2 w-12 h-12 border border-pink-500/20 rounded-xl"></div>
      </div>
      
      <div class="space-y-6">
        <p class="luxury-paragraph-lead text-center px-4 py-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 luxury-text-hover">
          はじめまして、<span class="gradient-text-luxury font-semibold">たこ</span>です。プログラミングに情熱を注ぐ高校生として、次世代のデジタル体験を創造することに専念しています。現在、<span class="text-cyan-400 font-medium">takos</span>という革新的なコミュニケーションプラットフォームの開発に取り組んでおります。
        </p>

        <ExpandableText title="私のビジョン" initiallyExpanded={true}>
          <div class="luxury-paragraph space-y-4">
            <p>プログラミングを超えた多彩な興味として、アニメーションと文学的表現への深い愛情を抱いております。私の将来への展望は、単なる技術者ではなく、<span class="gradient-text-luxury font-medium">起業家・実業家</span>として社会に変革をもたらすことにあります。</p>
            
            <p>人工知能の飛躍的進歩により、近い将来における生命科学の革命を確信しており、この歴史的転換点において先駆的な立場を確保することを目標としています。</p>
            
            <p>テクノロジーの力を通じて世界に新たな価値を創出したいと考えており、特に<span class="text-purple-400 font-medium">分散型システム</span>と<span class="text-cyan-400 font-medium">プライバシー保護技術</span>の分野において、既存の権力構造に挑戦する革新的なソリューションの開発に興味を持っています。</p>
            
            <p class="text-gray-300 italic border-l-4 border-purple-500/50 pl-4">プログラミングは私にとって手段であり、目的ではありません。理想とする未来を実現するために必要な技術を習得し、それを戦略的に活用していく所存です。</p>
          </div>
        </ExpandableText>

        <ExpandableText title="私の哲学と価値観" initiallyExpanded={true}>
          <div class="luxury-paragraph space-y-4">
            <p>中学時代における哲学的探求が、現在の思想的基盤を形成する重要な転換点となりました。この知的な冒険は、私の人格形成に計り知れない影響を与えています。</p>
            
            <p>特に<span class="text-orange-400 font-medium">フリードリヒ・ニーチェ</span>の超人思想に深く共鳴しており、「人間が自らの力で新しい価値を創造し、より高次の存在へと進化する」という理念に強い共感を抱いています。</p>
            
            <p><span class="text-blue-400 font-medium">実存主義</span>の巨匠であるサルトルとカミュの思想、特に「<span class="italic text-purple-300">実存は本質に先立つ</span>」という核心的概念から深い影響を受けています。自己の定義は他者や社会の規範によってではなく、自身の行動と選択によってのみ決定されるという確固たる信念を持っています。</p>
            
            <p>テクノロジーの発展は、創造性と自由という人間の本質的精神を具現化する究極の手段であると認識しています。<span class="gradient-text-luxury">コードを書く行為</span>は私にとって新たな価値創造そのものであり、開発プロセス自体が芸術的自己表現の一形態なのです。</p>
            
            <p class="luxury-quote text-center my-8">私は常に独自の思想を保持し、自らの野心に対して誠実であり続けたいと考えています</p>
          </div>
        </ExpandableText>
      </div>
    </section>
  </FadeIn>
);

export const SkillsSection: Component = () => (
  <FadeIn>
    <section>
      <div class="relative mb-12">
        <div class="flex items-center space-x-4">
          <div>
            <h2 class="text-4xl font-bold neon-glow">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300">Skills</span>
            </h2>
          </div>
        </div>
        <div class="absolute -bottom-2 -right-2 w-12 h-12 border border-orange-500/20 rounded-xl"></div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <For each={skillsData}>
          {(skill) => (
            <div class={`group glass-card-dark p-8 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-rotate-2 relative overflow-hidden hologram-effect card-3d sound-wave-effect neon-border`}>
              <div class={`absolute inset-0 bg-gradient-to-br ${skill.color.replace(/500/g, '500/5')} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field`}></div>
              <div class="relative z-10">
                <div class={`w-16 h-16 mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-br ${skill.color} shadow-xl group-hover:scale-110 transition-transform duration-300 pulse-wave`}>
                  <span class="text-3xl filter drop-shadow-sm neon-glow">{skill.icon}</span>
                </div>
                <h3 class="font-bold text-xl mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300 neon-glow">{skill.title}</h3>
                <p class={`text-gray-300 leading-relaxed mb-4`}>{skill.text}</p>
                
                {/* スキルレベルバー */}
                <div class="mb-3">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-mono text-cyan-400">習熟度</span>
                    <span class="text-sm font-mono text-purple-400">{skill.level}%</span>
                  </div>
                  <div class="data-bar" style={`--progress: ${skill.level}%`}></div>
                </div>
                
                {/* ステータスインジケーター */}
                <div class="status-indicator text-xs">
                  <span class="text-green-400">ACTIVE</span>
                </div>
              </div>
            </div>
          )}
        </For>
      </div>
      
      <div class="mt-8">
        <ExpandableText title="学習中の技術">
          <p>現在はRustとWebAssemblyを重点的に学習しています。高パフォーマンスな分散型アプリケーション開発のために必要だと感じています。また、暗号技術とP2P通信についても理解を深めるため、関連書籍や論文を読んでいます。</p>
        </ExpandableText>
      </div>
    </section>
  </FadeIn>
);

export const TimelineSection: Component = () => (
  <FadeIn>
    <section>
      <div class="relative mb-12">
        <div class="flex items-center space-x-4">
          <div>
            <h2 class="text-4xl font-bold neon-glow">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-green-300">Timeline</span>
            </h2>
          </div>
        </div>
        <div class="absolute -bottom-2 -right-2 w-12 h-12 border border-teal-500/20 rounded-xl"></div>
      </div>
      
      <div class="relative border-l-4 border-purple-400/30 ml-6 space-y-10 py-4">
        <For each={timelineData}>
          {(item) => (
            <div class="relative">
              <div class={`absolute -left-10 mt-1.5 h-6 w-6 rounded-full border-4 border-purple-500 bg-gray-900 shadow-lg`}></div>
              <div class={`glass-card-dark p-6 rounded-2xl ml-2 relative overflow-hidden group`}>
                <div class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="relative z-10">
                  <h3 class={`text-lg font-semibold mb-2 text-purple-300`}>{item.year} - {item.title}</h3>
                  <p class={`text-gray-300`}>{item.text}</p>
                </div>
              </div>
            </div>
          )}
        </For>
      </div>
      
      <div class="mt-8">
        <ExpandableText title="将来の展望" initiallyExpanded={true}>
          <div class="luxury-paragraph space-y-4">
            <p>今後5年間においては、<span class="text-purple-400 font-medium">技術的専門性の深化</span>と並行して、プロジェクトの規模拡大に戦略的に取り組む計画です。高校卒業後は、<span class="text-blue-400 font-medium">情報科学</span>と<span class="text-green-400 font-medium">経営学</span>の両分野における学術的基盤を構築しながら、<span class="gradient-text-luxury">スタートアップ企業の創設</span>も視野に入れています。</p>
            
            <p class="luxury-quote text-center my-6">究極の目標は、生命科学の革命による不老不死の実現、そして日本の再興という壮大なビジョンです。</p>
            
            <p>10年後のビジョンとして、自らが率いる<span class="text-cyan-400 font-medium">技術革新チーム</span>を組織し、<span class="text-purple-400 font-medium">分散型システム</span>と<span class="text-pink-400 font-medium">プライバシー保護技術</span>の分野において、世界的に認知される革新的サービスの創出を目標としています。</p>
            
            <p>この目標実現のため、<span class="text-orange-400 font-medium">オープンソースコミュニティ</span>への継続的貢献を通じてグローバルなネットワークを構築し、技術的深度と経営戦略の両面において実践的経験を積み重ねていく所存です。</p>

            <p class="text-gray-300 italic border-l-4 border-purple-500/50 pl-4">最終的には、自社を通じた社会課題の根本的解決により、テクノロジーの力で人類の生活品質を革命的に向上させることが、私の存在意義なのです。</p>
          </div>
        </ExpandableText>
      </div>
    </section>
  </FadeIn>
);
