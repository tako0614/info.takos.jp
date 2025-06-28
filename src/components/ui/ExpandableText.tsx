import { Component, createSignal, Show } from 'solid-js';

interface ExpandableTextProps {
  title: string;
  children: any;
  class?: string;
  initiallyExpanded?: boolean;
}

/**
 * ExpandableText コンポーネント
 * 長文を折りたたみ可能に表示
 */
export const ExpandableText: Component<ExpandableTextProps> = (props) => {
  const [expanded, setExpanded] = createSignal(props.initiallyExpanded || false);

  return (
    <div class={`glass-card-deep p-8 rounded-3xl relative overflow-hidden ${props.class}`}>
      <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
      <div class="relative z-10">
        <div 
          class="flex justify-between items-center cursor-pointer group" 
          onClick={() => setExpanded(!expanded())}
        >
          <h3 class="text-xl font-semibold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300">
            {props.title}
          </h3>
          <span 
            class="text-2xl transition-transform duration-500" 
            style={{ transform: expanded() ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ▼
          </span>
        </div>
        <Show when={expanded()}>
          <div class="mt-6 text-gray-200 leading-relaxed">
            {props.children}
          </div>
        </Show>
      </div>
    </div>
  );
};
