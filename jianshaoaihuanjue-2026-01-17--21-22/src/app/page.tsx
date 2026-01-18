'use client';

import { useState } from 'react';
import styles from './page.module.css';

const PROMPT_TEMPLATE = {
  prefix: '你是专家。\n\n',
  suffix: '\n\n请提供主要观点的3个不同出处的网页链接以便我查验。如果你不知道或查不到，就实说，不要编造。'
};

function generateOptimizedPrompt(userInput: string): string {
  return `${PROMPT_TEMPLATE.prefix}${userInput}${PROMPT_TEMPLATE.suffix}`;
}

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copyFeedback, setCopyFeedback] = useState<'复制' | '已复制' | '复制失败'>('复制');

  const handleGenerate = () => {
    const trimmedInput = inputText.trim();
    if (!trimmedInput) {
      return;
    }

    const optimizedPrompt = generateOptimizedPrompt(trimmedInput);
    setOutputText(optimizedPrompt);
    setInputText('');
  };

  const handleCopy = async () => {
    if (!outputText) return;

    try {
      await navigator.clipboard.writeText(outputText);
      setCopyFeedback('已复制');
      setTimeout(() => {
        setCopyFeedback('复制');
      }, 2000);
    } catch {
      setCopyFeedback('复制失败');
      setTimeout(() => {
        setCopyFeedback('复制');
      }, 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>减少AI幻觉</h1>

      {/* Output Section */}
      <section className={styles.outputSection} aria-label="优化后的提示词">
        <div className={styles.outputHeader}>
          <span className={styles.outputLabel}>优化后的提示词</span>
          {outputText && (
            <button
              className={`${styles.copyButton} ${copyFeedback === '已复制' ? styles.copySuccess : ''} ${copyFeedback === '复制失败' ? styles.copyError : ''}`}
              onClick={handleCopy}
              aria-label={copyFeedback}
            >
              {copyFeedback}
            </button>
          )}
        </div>
        <div className={styles.outputContent}>
          {outputText ? (
            outputText
          ) : (
            <span className={styles.outputPlaceholder}>
              在下方输入提示词，点击&ldquo;查询常识&rdquo;按钮生成优化后的提示词
            </span>
          )}
        </div>
      </section>

      {/* Input Section */}
      <section className={styles.inputSection} aria-label="输入区域">
        <textarea
          className={styles.textarea}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入你的提示词..."
          aria-label="原始提示词输入框"
        />
        <button
          className={styles.generateButton}
          onClick={handleGenerate}
          aria-label="查询常识"
        >
          查询常识
        </button>
      </section>
    </main>
  );
}
