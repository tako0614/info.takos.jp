import { Component, createSignal, Show, For } from 'solid-js';
import { qaData } from '../data/qaData';

/**
 * InteractiveQA コンポーネント
 * ユーザーが知りたい情報を選択形式で表示
 */
export const InteractiveQA: Component = () => {
  const [selectedCategory, setSelectedCategory] = createSignal<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = createSignal<string | null>(null);

  const resetSelection = () => {
    setSelectedCategory(null);
    setSelectedQuestion(null);
  };

  return (
    <div class="space-y-8">
      {/* カテゴリ選択 */}
      <Show when={!selectedCategory()}>
        <div>
          <h3 class="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-center text-gray-200">
            たこ索引
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <For each={Object.entries(qaData)}>
              {([category, data]: [string, any]) => (
                <button
                  onClick={() => setSelectedCategory(category)}
                  class="group glass-card-dark p-3 md:p-6 rounded-2xl md:rounded-3xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 text-left relative overflow-hidden"
                >
                  <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="relative z-10">
                    <div class={`w-8 h-8 md:w-12 lg:w-16 md:h-12 lg:h-16 mb-2 md:mb-4 rounded-xl md:rounded-2xl flex items-center justify-center bg-gradient-to-br ${data.color} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <span class="text-lg md:text-2xl lg:text-3xl">{data.icon}</span>
                    </div>
                    <h4 class="font-bold text-sm md:text-base lg:text-lg text-gray-200 leading-tight">
                      {category}
                    </h4>
                    <p class="text-xs md:text-sm mt-1 md:mt-2 text-gray-400">
                      {Object.keys(data.questions).length}個の質問
                    </p>
                  </div>
                </button>
              )}
            </For>
          </div>
        </div>
      </Show>

      {/* 質問選択 */}
      <Show when={selectedCategory() && !selectedQuestion()}>
        <div>
          <div class="flex items-center mb-3 md:mb-4">
            <button
              onClick={resetSelection}
              class={`mr-2 md:mr-3 p-2 rounded-lg md:rounded-xl glass-button-dark transition-all duration-300 hover:scale-110`}
            >
              <span class="text-base md:text-lg">←</span>
            </button>
            <h3 class={`text-base md:text-lg lg:text-2xl font-bold text-gray-200`}>
              📋 {selectedCategory()} に関する質問
            </h3>
          </div>
          <div class="grid grid-cols-1 gap-2 md:gap-3">
            <For each={Object.entries((qaData as any)[selectedCategory()!].questions)}>
              {([question, _]) => (
                <button
                  onClick={() => setSelectedQuestion(question)}
                  class={`group glass-effect-dark p-3 md:p-4 rounded-xl md:rounded-2xl transform transition-all duration-500 hover:scale-105 text-left relative overflow-hidden`}
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="relative z-10">
                    <h5 class={`font-semibold text-sm md:text-base text-gray-200`}>
                      {question}
                    </h5>
                    <span class={`text-xs text-gray-400 flex items-center mt-1 md:mt-2`}>
                      <span class="mr-1">👁️</span>
                      タップして詳細を見る
                    </span>
                  </div>
                </button>
              )}
            </For>
          </div>
        </div>
      </Show>

      {/* 回答表示 */}
      <Show when={selectedCategory() && selectedQuestion()}>
        <div>
          <div class="flex items-center mb-3 md:mb-4">
            <button
              onClick={() => setSelectedQuestion(null)}
              class={`mr-2 md:mr-3 p-2 rounded-lg md:rounded-xl glass-button-dark transition-all duration-300 hover:scale-110`}
            >
              <span class="text-base md:text-lg">←</span>
            </button>
            <div>
              <h3 class={`text-base md:text-lg lg:text-2xl font-bold text-gray-200`}>
                💡 {selectedQuestion()}
              </h3>
              <p class={`text-xs text-gray-400`}>
                📂 {selectedCategory()}
              </p>
            </div>
          </div>
          <div class={`glass-card-dark p-4 md:p-6 lg:p-10 rounded-2xl md:rounded-3xl relative overflow-hidden`}>
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl md:rounded-3xl"></div>
            <div class="relative z-10">
              <p class={`text-gray-200 leading-relaxed text-sm md:text-base lg:text-lg`}>
                {(qaData as any)[selectedCategory()!].questions[selectedQuestion()!].content}
              </p>
              <div class="mt-4 md:mt-6 flex flex-col sm:flex-row gap-2 md:gap-3">
                <button
                  onClick={() => setSelectedQuestion(null)}
                  class={`glass-button-dark px-3 md:px-4 py-2 rounded-lg md:rounded-xl transition-all duration-300 font-semibold hover:scale-105 text-sm md:text-base`}
                >
                  他の質問を見る
                </button>
                <button
                  onClick={resetSelection}
                  class={`glass-button-dark px-3 md:px-4 py-2 rounded-lg md:rounded-xl transition-all duration-300 font-semibold hover:scale-105 relative overflow-hidden text-sm md:text-base`}
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg md:rounded-xl"></div>
                  <span class="relative z-10">カテゴリに戻る</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
};
