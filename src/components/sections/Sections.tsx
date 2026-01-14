import { Component, For, createResource, Show } from 'solid-js';
import { skillsData, aboutData } from '../../data/staticData';
import { FadeIn } from '../ui/FadeIn';
import { ExpandableText } from '../ui/ExpandableText';
import { FloatingCard } from '../ui/FloatingCard';
import { fetchZennArticles } from '../../api/zenn';
import { FiHeart, FiBookOpen } from 'solid-icons/fi';

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

        <ExpandableText title={aboutData.vision.title} initiallyExpanded={true}>
          <div class="luxury-paragraph space-y-4" innerHTML={aboutData.vision.content}>
          </div>
        </ExpandableText>

        <ExpandableText title={aboutData.philosophy.title} initiallyExpanded={true}>
          <div class="luxury-paragraph space-y-4" innerHTML={aboutData.philosophy.content}>
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
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <For each={skillsData}>
          {(skill, index) => (
            <FloatingCard floatIntensity={0.8 + (index() % 3) * 0.2}>
            <div class={`group glass-card-dark p-8 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-rotate-2 relative overflow-hidden hologram-effect card-3d sound-wave-effect neon-border`}>
              <div class={`absolute inset-0 bg-gradient-to-br ${skill.color.replace(/500/g, '500/5')} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field`}></div>
              <div class="relative z-10">
                <skill.icon size={32} class="text-white/80 mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 class={`font-bold text-xl mb-4 text-transparent bg-clip-text bg-gradient-to-r ${skill.color} transition-all duration-300 neon-glow`}>{skill.title}</h3>
                <p class={`text-gray-300 leading-relaxed`}>{skill.text}</p>
              </div>
            </div>
            </FloatingCard>
          )}
        </For>
      </div>
      
      <div class="mt-8">
        <ExpandableText title={aboutData.learning.title}>
          <p>{aboutData.learning.content}</p>
        </ExpandableText>
      </div>
    </section>
  </FadeIn>
);


export const ArticlesSection: Component = () => {
  const [articles] = createResource(async () => {
    return await fetchZennArticles(1, 'latest');
  });

  return (
    <FadeIn>
      <section>
        <div class="relative mb-12">
          <div class="flex items-center space-x-4">
            <div>
              <h2 class="text-4xl font-bold neon-glow">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">Articles</span>
              </h2>
              <p class="text-gray-400 mt-2">Zennで執筆した技術記事</p>
            </div>
          </div>
        </div>

        <Show 
          when={!articles.loading} 
          fallback={
            <div class="text-center py-12">
              <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
              <p class="text-gray-400 mt-4">記事を読み込み中...</p>
            </div>
          }
        >
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <For each={articles()}>
              {(article, index) => (
                <FloatingCard floatIntensity={0.7 + (index() % 3) * 0.3}>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block group glass-card-dark p-6 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-rotate-1 relative overflow-hidden hologram-effect card-3d neon-border"
                >
                  <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 energy-field"></div>

                  <div class="relative z-10">
                    {/* 絵文字アイコン */}
                    <span class="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">{article.emoji}</span>

                    {/* タイトル */}
                    <h3 class="font-bold text-lg mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300 neon-glow min-h-[3.5rem]">
                      {article.title}
                    </h3>

                    {/* メタ情報 */}
                    <div class="flex items-center justify-between text-sm text-gray-400 mb-3">
                      <div class="flex items-center space-x-1">
                        <FiHeart size={14} class="text-pink-400" />
                        <span>{article.likedCount}</span>
                      </div>
                      <time class="text-xs">
                        {new Date(article.publishedAt).toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </time>
                    </div>

                    {/* 読むボタン */}
                    <div class="flex items-center text-cyan-400 font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                      <span>記事を読む</span>
                      <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* ホログラム効果 */}
                  <div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 transform -translate-x-full"></div>
                </a>
                </FloatingCard>
              )}
            </For>
          </div>

          {/* Zennプロフィールへのリンク */}
          <div class="mt-8 text-center">
            <FloatingCard floatIntensity={0.6} class="inline-block">
            <a
              href="https://zenn.dev/takoserver"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center glass-card-dark px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 group neon-border"
            >
              <FiBookOpen size={20} class="mr-2 text-blue-400" />
              <span class="text-gray-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">
                すべての記事を見る
              </span>
              <svg class="w-5 h-5 ml-2 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            </FloatingCard>
          </div>

          {/* エラー表示 */}
          <Show when={articles.error}>
            <div class="text-center py-8 text-red-400">
              <p>記事の読み込みに失敗しました。</p>
            </div>
          </Show>
        </Show>
      </section>
    </FadeIn>
  );
};
