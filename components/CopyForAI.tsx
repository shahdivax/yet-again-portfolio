"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const MARKDOWN_CONTENT = `# Divax Shah - AI/ML Engineer
Building premium-grade AI systems.
Email: divax12345@gmail.com
GitHub: https://github.com/shahdivax
LinkedIn: https://www.linkedin.com/in/divax-shah/
X/Twitter: https://x.com/divax_shah_
HuggingFace: https://huggingface.co/diabolic6045
---
## EXPERIENCE
### JR. AI/ML DEVELOPER @ AVINYAA EDTECH (2025 - PRESENT)
Building advanced grammar checkers and fine-tuning LLMs for pristine natural language output. Designing multilingual AI classification systems with 95%+ accuracy.
Tags: LLMs, Fine-tuning, NLP, Classification
### JR. PYTHON DEVELOPER @ THINKBIZ TECH (2024 - 2025)
Built scalable chatbot PoCs using 17+ LangChain Agents with structured/unstructured ingestion. Created OCR-LLM pipelines improving invoice parsing from 15% to 85% accuracy.
Tags: Python, LangChain, OCR, Pipelines
### AI & SYNTH DATA INTERN @ DMI FINANCE (2024)
Created generative pipelines for synthetic structured data via Gradio & Python. Used PyTorch to dramatically increase dataset throughput and deduplication algorithms.
Tags: PyTorch, Generative AI, Gradio
---
## PROJECTS
### LLMS & AI ARCHITECTURES
- **SANSKRIT QWEN2.5-7B CHAT** (2024) - LLM CHAT / LORA
Specialized language model for Sanskrit translation and transliteration. 100% success rate on test sequences.
URL: https://huggingface.co/diabolic6045/Sanskrit-Qwen2.5-7B-chat
- **SANSKRIT QWEN2.5-VL OCR** (2025) - VLM / OCR
Vision-Language model adapted for Sanskrit OCR (Optical Character Recognition) tasks.
URL: https://huggingface.co/diabolic6045/Sanskrit-Qwen2.5-VL-7B-Instruct-OCR
- **GITAWHISPER (WHISPER TINY)** (2024) - AUDIO / ASR / WHISPER
Fine-tuned Whisper-tiny for Sanskrit shloka transcription with IAST transliteration. 35% WER reduction.
URL: https://huggingface.co/diabolic6045/GitaWhisper-tiny
- **CUSTOM GPT 100M MODEL** (2024) - GPT / DEEPSPEED
GPT-style Transformer built from scratch on Fineweb via DeepSpeed, ZeRO Stage-2, and FP16 precision.
URL: https://huggingface.co/diabolic6045/Ion-LLM-Base
- **SANSKRIT TOKENIZER** (2024) - NLP / TOKENIZER
Native tokenization offering 4.5x better efficiency over byte-level tokens, 120K vocab size.
URL: https://huggingface.co/diabolic6045/Sanskrit-English-qwen2-tokenizer
### GENERATIVE & SIMULATIONS
- **FLUX LORAS** (2024) - IMAGE GENERATION
Specialized generative AI adapters fine-tuned on diverse image datasets for aesthetic scaling.
URL: https://huggingface.co/collections/diabolic6045/flux-lora
- **LORE KEEPER** (2024) - LLM AGENTS / PROCEDURAL
Infinite structural narrative generator using custom LLM agents and creative generation constraints.
URL: https://lore-keeper.divaxshah.com
- **WORLD SIM** (2024) - SIMULATION
CLI-native environment simulator allowing users to craft dynamic sandbox simulations via LLMs.
URL: https://world-sim.divaxshah.com
### WEB & CREATIVE TECH
- **AURA VIBES** (2024) - CREATIVE ENGINEERING
AI-powered personalized quote visualizer with Twitter extraction mapping and mood alignment.
URL: https://random-quote-maker.divaxshah.com
---
## ARSENAL / SKILLS
- **PROGRAMMING LANGUAGES**: Python
- **FRAMEWORKS & LIBRARIES**: PyTorch, TensorFlow / Keras, scikit-learn, Hugging Face Transformers, LangChain, NumPy, Pandas, Fastapi, AWS
- **AI DOMAINS**: Generative AI, Large Language Model (LLM/VLLM) Fine-Tuning, Reinforcement Learning (RL), Natural Language Processing (NLP), Prompt Engineering, Axolotl AI, Unsloth AI
- **APIs & SERVICES**: OpenAI, Google Gemini, Anthropic, Mistral AI, Groq, OpenRouter
---
Open to AI/ML Engineering roles and collaborations.
`;
export default function CopyForAI() {
const [copied, setCopied] = useState(false);
const handleCopy = async () => {
try {
await navigator.clipboard.writeText(MARKDOWN_CONTENT);
setCopied(true);
setTimeout(() => setCopied(false), 2500);
} catch (err) {
console.error("Failed to copy text: ", err);
}
};
return (
<button
onClick={handleCopy}
className="group flex w-max items-center gap-4 relative overflow-hidden font-mono text-[10px] sm:text-xs tracking-[0.2em] font-bold uppercase pb-1 transition-colors duration-500 text-[var(--muted)] hover:text-black dark:hover:text-white"
aria-label="Copy Portfolio as Markdown for AI"
>
<span className="w-6 h-[2px] bg-[var(--muted)] group-hover:scale-x-150 transform origin-left transition-all duration-500 group-hover:bg-[var(--accent)]" />
<span className="relative z-10 transition-colors duration-500">
{copied ? "COPIED TO CLIPBOARD" : "COPY MD FOR AI"}
</span>
{/* Checkmark appears on copy */}
<AnimatePresence>
{copied && (
<motion.svg 
initial={{ opacity: 0, scale: 0.5, x: -10 }}
animate={{ opacity: 1, scale: 1, x: 0 }}
exit={{ opacity: 0, scale: 0.5, x: 10 }}
width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
className="text-green-500 dark:text-green-600"
>
<polyline points="20 6 9 17 4 12"></polyline>
</motion.svg>
)}
</AnimatePresence>
</button>
);
}