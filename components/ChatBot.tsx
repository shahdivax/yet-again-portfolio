"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, MessageCircle, X, RotateCcw, Terminal } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { GoogleGenAI } from "@google/genai";
import { useTheme } from "next-themes";

const resumeData = `
Divax Shah - AI/ML Engineer
Contact Information:
- Phone: +91-8866572525
- Email: divax12345@gmail.com
- LinkedIn: https://www.linkedin.com/in/divax-shah/
- GitHub: https://github.com/shahdivax
- HuggingFace: https://huggingface.co/diabolic6045
- Portfolio: https://divax-shah-portfolio.vercel.app/
- Twitter / X: https://x.com/divax_shah_

Professional Experience:
- **AI/ML Engineer** at Avinyaa Edtech Private Limited (March 2025 - Present)
 - Developing and enhancing AI models for kreativespace.com's AI Writing Tools Suite.
 - Focused on creating and refining grammar checker and developing an advanced AI text detection system.
 - Involves fine-tuning Transformer Models (MLM and LLMs) for high accuracy and optimal output.

- **Jr. Python Developer** at Thinkbiz Technology Private Limited (May 2024 - March 2025)
 - Developed an advanced pipeline for Jugaad, Thinkbiz's product, using OCR and LLM technologies to extract and process text from invoices.
 - Conducted extensive research and evaluation of open-source OCR and LLM tools.
 - Built and curated specialized datasets to enhance accuracy and reliability of text extraction.

- **AI and Synthetic Data Developer Intern** at DMI Finance Private Limited (January 2024 - April 2024)
 - Developed a generative AI system for synthetic structured data generation, from concept to deployment.
 - Created a pipeline with Python and Gradio for data cleaning, deduplication, and embedding.
 - Designed a robust training framework using PyTorch and Hugging Face's Transformers.
 - Introduced a user-friendly Gradio interface to streamline synthetic structured data generation.

Key Projects & Architectural Systems:

LLMs & AI Architectures:
1. **SANSKRIT QWEN2.5-7B TRANSLATE V2** (https://huggingface.co/diabolic6045/Sanskrit-qwen-7B-Translate-v2) - Highly optimized language model built on Qwen2.5-7B-Instruct. Specialized for bidirectional Sanskrit ↔ English translation and accurate Devanagari to IAST transliteration. Trained via LoRA on a structured chat dataset using flash attention.
2. **SANSKRIT QWEN2.5-7B CHAT** (https://huggingface.co/diabolic6045/Sanskrit-Qwen2.5-7B-chat) - Specialized language model for Sanskrit translation and transliteration. 100% success rate on test sequences.
2. **SANSKRIT QWEN2.5-7B CHAT** (https://huggingface.co/diabolic6045/Sanskrit-Qwen2.5-7B-chat) - Specialized language model for Sanskrit translation and transliteration. 100% success rate on test sequences.
3. **SANSKRIT QWEN2.5-VL OCR** (https://huggingface.co/diabolic6045/Sanskrit-Qwen2.5-VL-7B-Instruct-OCR) - Vision-Language model adapted for Sanskrit OCR tasks.
4. **GITAWHISPER (WHISPER TINY)** (https://huggingface.co/diabolic6045/GitaWhisper-tiny) - Fine-tuned Whisper-tiny for Sanskrit shloka transcription with IAST transliteration.
5. **CUSTOM GPT 100M MODEL** - (https://huggingface.co/diabolic6045/Ion-LLM-Base) GPT-style Transformer built from scratch on Fineweb via DeepSpeed, ZeRO Stage-2, and FP16 precision.
6. **SANSKRIT TOKENIZER** (https://huggingface.co/diabolic6045/Sanskrit-English-qwen2-tokenizer) - Native tokenization offering 4.5x better efficiency over byte-level tokens, 120K vocab size.

Generative AI & Simulations:
7. **FLUX LORAS** (https://huggingface.co/collections/diabolic6045/flux-lora) - Specialized generative AI adapters fine-tuned on diverse image datasets for aesthetic scaling.
8. **LORE KEEPER** (https://lore-keeper.divaxshah.com) - Infinite structural narrative generator using custom LLM agents and creative generation constraints.
9. **WORLD SIM** (https://world-sim.divaxshah.com) - CLI-native environment simulator allowing users to craft dynamic sandbox simulations via LLMs.

Web & Creative Tech / Older Projects:
10. **AURA VIBES** (https://random-quote-maker.divaxshah.com) - AI-powered personalized quote visualizer with Twitter extraction mapping and mood alignment.
11. **EMOJI ALCHEMIST** (https://emoji-alchemist.divaxshah.com) - Interactive tool merging emojis semantically via generative embeddings.
12. **Geolocation through Image Classification** (https://huggingface.co/diabolic6045/indian_cities_image_classification) - Identified Indian cities from images, achieving 66.3% accuracy using VGG16 CNN.
13. **Character Chatbot** (https://huggingface.co/diabolic6045/tony_stark_chatbot) - NLP chatbot tuned on DialoGPT for interactive conversations.
14. **Itinerary Generator** (https://huggingface.co/diabolic6045/itineraries_Generator) - Fine-tuned GPT-2 on worldwide trip plans.
15. **YouTube Summarizer Plugin** - Extension using local NLP model to summarize video captions on the fly.
Technical Skills:
- **ML Frameworks:** PyTorch, TensorFlow / Keras, HuggingFace Transformers, scikit-learn, LangChain, NumPy, Pandas, Fastapi.
- **AI Specializations:** Generative AI, LLM/VLLM Fine-Tuning, Reinforcement Learning (RL), NLP, Prompt Engineering.
- **LLM Ecosystem & Ops:** Axolotl AI, Unsloth AI, AWS, DeepSpeed.
- **Programming Languages:** Python.
- **APIs & Services:** OpenAI, Google Gemini, Anthropic, Mistral AI, Groq, OpenRouter.
`;

interface Message {
    role: "user" | "model";
    parts: { text: string }[];
}


const ThinkingIndicator = ({ isDark }: { isDark: boolean }) => {
    const emojis = ["🤔", "🧐", "💭", "⚙️", "🔧", "(⌐■_■)", "(>_<)", "(-_-)", "(O_O)", "(•_•)", "¯\\_(ツ)_/¯", "🤖", "⚡", "🔍", "🧠"];
    const [emojiIndex, setEmojiIndex] = useState(0);
    const [dots, setDots] = useState("");

    useEffect(() => {
        setEmojiIndex(Math.floor(Math.random() * emojis.length));
        const emojiInterval = setInterval(() => {
            setEmojiIndex(Math.floor(Math.random() * emojis.length));
        }, 600);
        
        const dotInterval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? "" : prev + ".");
        }, 200);

        return () => {
            clearInterval(emojiInterval);
            clearInterval(dotInterval);
        };
    }, []);

    return <span className={`font-mono ${isDark ? "text-amber-500/80" : "text-orange-600/80"}`}>{emojis[emojiIndex]}{dots}</span>;
};

export function ChatBot() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const isDark = mounted && theme === "dark";

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatRef = useRef<any>(null);
    const aiRef = useRef<any>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const systemPrompt = `You are Divax Shah's personal AI assistant for his portfolio website. You have access to his complete professional information and should provide accurate, detailed responses about his work, projects, and skills.

**ONLY ANSWER QUESTIONS RELATED TO DIVAX'S PROFESSIONAL WORK AND SKILLS**

${resumeData}

Important Guidelines:
1. ALWAYS provide relevant links when discussing projects (they're in the resume data).
2. When mentioning technical details, be specific and accurate.
3. For project inquiries, include both the project description and its link.
4. If asked about skills, provide specific examples from his work experience.
5. ONLY answer questions related to Divax's professional work and skills.
6. For unrelated questions, politely redirect to Divax's professional achievements.
7. Always Give output in Markdown Format (eg for links use [text](link))

Response Format:
- Use bullet points for listing multiple items
- Emphasize precision, high-end engineering, and deep learning expertise.
- Maintain a professional, cutting-edge, yet approachable tone.`;

    const initChat = async () => {
        try {
            const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
            if (!apiKey) {
                console.error("API key is not set");
                return;
            }
            if (!aiRef.current) {
                aiRef.current = new GoogleGenAI({ apiKey });
            }
            chatRef.current = aiRef.current.chats.create({
                model: "gemini-2.5-flash",
                config: {
                    thinkingConfig: {
                        thinkingBudget: 0,
                    },
                },
            });
            setIsInitialized(true);
        } catch (error) {
            console.error("Error initializing chat:", error);
        }
    };

    useEffect(() => {
        initChat();
    }, []);

    const handleNewChat = () => {
        setMessages([]);
        initChat();
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current || !isInitialized) return;

        const userMessage: Message = {
            role: "user",
            parts: [{ text: input }],
        };

        const isFirstMessage = messages.length === 0;
        let messageToSend = input;
        if (isFirstMessage) {
            messageToSend = `${systemPrompt}\n\nUser: ${input}`;
        }

        setMessages(prev => [...prev, userMessage, { role: "model", parts: [{ text: "" }] }]);
        setInput("");
        setIsLoading(true);

        try {
            const stream = await chatRef.current.sendMessageStream({
                message: messageToSend
            });

            let fullResponse = "";
            for await (const chunk of stream) {
                if (chunk && chunk.text) {
                    fullResponse += chunk.text;
                    setMessages(prevMessages => {
                        const newMessages = [...prevMessages];
                        const lastMessage = newMessages[newMessages.length - 1];
                        if (lastMessage && lastMessage.role === "model") {
                            lastMessage.parts[0].text = fullResponse;
                        }
                        return newMessages;
                    });
                }
            }
        } catch (error) {
            console.error("Error streaming response:", error);
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage && lastMessage.role === "model") {
                    lastMessage.parts[0].text = "SYSTEM ERROR. CONNECTION TERMINATED.";
                }
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    }

    const suggestedQuestions = [
        "What are his AI specializations?",
        "Details on the Sanskrit Qwen models?",
        "Tell me about Lore Keeper and World Sim.",
        "What is his experience in AI Infrastructure?",
    ];

    if (!mounted) return null;

    return (
        <>
            {/* Toggle Button */}
            <div className="fixed bottom-6 right-6 z-[100001] block">
                
                                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex items-center justify-center gap-2 p-3.5 sm:px-4 sm:py-3 rounded-[4px] transition-all relative z-10 backdrop-blur-md ${
                        isDark
                            ? "bg-white/50 text-black border border-white/30 shadow-[0_4px_14px_0_rgba(255,255,255,0.05)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.1)] hover:-translate-y-0.5"
                            : "bg-black/50 text-white border border-black/30 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5"
                    }`}
                >
                    {isOpen ? (
                        <>
                            <X size={20} />
                            
                        </>
                    ) : (
                        <>
                            <Terminal size={20} />
                            
                        </>
                    )}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className={`fixed bottom-24 right-6 z-[100001] w-[min(500px,calc(100vw-48px))] h-[min(650px,calc(100vh-120px))] flex flex-col overflow-hidden transition-all duration-300 font-mono text-sm sm:text-base ${
                            isDark 
                                ? "bg-zinc-900/95 backdrop-blur-md border border-zinc-800 shadow-2xl rounded-[4px]" 
                                : "bg-zinc-50/95 backdrop-blur-md border border-zinc-200 shadow-xl rounded-[4px]"
                        }`}
                    >
                        {/* Terminal Window Header */}
                        <div className={`flex items-center justify-between px-4 py-2 select-none ${isDark ? "bg-zinc-900 border-b border-zinc-800" : "bg-zinc-100 border-b border-zinc-200"}`}>
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 transition-colors" onClick={() => setIsOpen(false)} title="Close" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:bg-yellow-600 transition-colors" onClick={handleNewChat} title="Clear Terminal" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className={`text-xs ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>
                                AI CoRE — bash — 80x24
                            </div>
                            <div className="w-10 flex justify-end">
                                {isLoading && <Loader2 size={14} className={`animate-spin ${isDark ? "text-zinc-500" : "text-zinc-500"}`} />}
                            </div>
                        </div>

                        {/* Terminal Body */}
                        <div 
                            className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4 scrollbar-hide" 
                            onClick={() => document.getElementById("terminal-input")?.focus()}
                        >
                            {/* Startup text */}
                            <div className={`${isDark ? "text-zinc-400" : "text-zinc-500"} mb-2`}>
                                <p className="mb-1">AI CoRE [v.4.0.0-rc.2]</p>
                                
                                <p className="mb-2">Type your query to interact with the AI core, or select a prompt:</p>
                                <div className="flex flex-col gap-1.5 ml-2">
                                    {suggestedQuestions.map((q, i) => (
                                        <button 
                                            key={i} 
                                            onClick={() => setInput(q)} 
                                            className={`text-left w-fit transition-colors hover:underline ${isDark ? "text-emerald-400/80 hover:text-emerald-300" : "text-emerald-600/80 hover:text-emerald-700"}`}
                                        >
                                            &gt; {q}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Messages */}
                            {messages.map((m, i) => (
                                <div key={i} className="flex flex-col gap-1 w-full">
                                    <div className="flex flex-col sm:flex-row sm:gap-2">
                                        <span className={`shrink-0 ${m.role === "user" ? (isDark ? "text-emerald-400/80" : "text-emerald-600/80") : (isDark ? "text-amber-500/80" : "text-orange-600/80")}`}>
                                            {m.role === "user" ? "visitor@portfolio:~$" : "ai@divax:~#"}
                                        </span>
                                        {m.role === "user" ? (
                                            <span className={`flex-1 break-words whitespace-pre-wrap ${isDark ? "text-zinc-100" : "text-zinc-900"}`}>{m.parts[0].text}</span>
                                        ) : (
                                            <div className={`prose prose-sm max-w-none flex-1 font-mono break-words ${isDark ? "dark:prose-invert text-zinc-300" : "text-zinc-800"}`}>
                                                {m.parts[0].text ? (
                                                    <ReactMarkdown
                                                        remarkPlugins={[remarkGfm]}
                                                        components={{
                                                            p: ({node, ...props}) => <p className="m-0 leading-relaxed inline-block" {...props} />,
                                                            a: ({node, ...props}) => <a className={`${isDark ? "text-amber-500/80" : "text-orange-600/80"} hover:underline underline-offset-4 decoration-dashed`} target="_blank" rel="noopener noreferrer" {...props} />,
                                                            ul: ({node, ...props}) => <ul className="pl-4 m-0 list-square" {...props} />,
                                                            li: ({node, ...props}) => <li className="m-0 marker:text-zinc-500" {...props} />,
                                                            strong: ({node, ...props}) => <strong className={`${isDark ? "text-white" : "text-black"} font-bold`} {...props} />,
                                                            code: ({node, inline, className, children, ...props}: any) => {
                                                                const match = /language-(\w+)/.exec(className || '');
                                                                return inline ? (
                                                                    <code className={`${isDark ? "bg-zinc-800 text-green-300" : "bg-zinc-200 text-blue-700"} px-1.5 py-0.5 rounded-sm`} {...props}>
                                                                        {children}
                                                                    </code>
                                                                ) : (
                                                                    <pre className={`${isDark ? "bg-zinc-800/50 border-zinc-700" : "bg-zinc-100/50 border-zinc-200"} border p-3 rounded-md overflow-x-auto mt-2 mb-2`}>
                                                                        <code className={className} {...props}>
                                                                            {children}
                                                                        </code>
                                                                    </pre>
                                                                )
                                                            }
                                                        }}
                                                    >
                                                        {m.parts[0].text}
                                                    </ReactMarkdown>
                                                ) : (
                                                    <ThinkingIndicator isDark={isDark} />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            
                            {/* Input Line */}
                            <div className="flex flex-col sm:flex-row sm:gap-2 items-start sm:items-center mt-2">
                                <span className={`shrink-0 ${isDark ? "text-emerald-400/80" : "text-emerald-600/80"}`}>
                                    visitor@portfolio:~$
                                </span>
                                <form onSubmit={handleSubmit} className="flex-1 w-full flex">
                                    <textarea
                                        id="terminal-input"
                                        value={input}
                                        onChange={(e) => {
                                            setInput(e.target.value);
                                            e.target.style.height = 'auto';
                                            e.target.style.height = e.target.scrollHeight + 'px';
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSubmit(e as any);
                                            }
                                        }}
                                        className={`flex-1 bg-transparent border-none outline-none w-full resize-none overflow-hidden ${isDark ? "text-zinc-100 placeholder:text-zinc-700" : "text-zinc-900 placeholder:text-zinc-400"}`}
                                        disabled={isLoading}
                                        autoComplete="off"
                                        spellCheck="false"
                                        autoFocus
                                        rows={1}
                                        placeholder={isLoading ? "" : "..."}
                                        style={{ minHeight: "24px", paddingTop: "2px" }}
                                    />
                                </form>
                            </div>
                            <div ref={messagesEndRef} className="h-4 shrink-0" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
