"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, MessageCircle, X, RotateCcw } from "lucide-react";
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
1. **SANSKRIT QWEN2.5-7B CHAT** (https://huggingface.co/diabolic6045/Sanskrit-Qwen2.5-7B-chat) - Specialized language model for Sanskrit translation and transliteration. 100% success rate on test sequences.
2. **SANSKRIT QWEN2.5-VL OCR** (https://huggingface.co/diabolic6045/Sanskrit-Qwen2.5-VL-7B-Instruct-OCR) - Vision-Language model adapted for Sanskrit OCR tasks.
3. **GITAWHISPER (WHISPER TINY)** (https://huggingface.co/diabolic6045/GitaWhisper-tiny) - Fine-tuned Whisper-tiny for Sanskrit shloka transcription with IAST transliteration.
4. **CUSTOM GPT 100M MODEL** - (https://huggingface.co/diabolic6045/Ion-LLM-Base) GPT-style Transformer built from scratch on Fineweb via DeepSpeed, ZeRO Stage-2, and FP16 precision.
5. **SANSKRIT TOKENIZER** (https://huggingface.co/diabolic6045/Sanskrit-English-qwen2-tokenizer) - Native tokenization offering 4.5x better efficiency over byte-level tokens, 120K vocab size.

Generative AI & Simulations:
6. **FLUX LORAS** (https://huggingface.co/collections/diabolic6045/flux-lora) - Specialized generative AI adapters fine-tuned on diverse image datasets for aesthetic scaling.
7. **LORE KEEPER** (https://lore-keeper.divaxshah.com) - Infinite structural narrative generator using custom LLM agents and creative generation constraints.
8. **WORLD SIM** (https://world-sim.divaxshah.com) - CLI-native environment simulator allowing users to craft dynamic sandbox simulations via LLMs.

Web & Creative Tech / Older Projects:
9. **AURA VIBES** (https://random-quote-maker.divaxshah.com) - AI-powered personalized quote visualizer with Twitter extraction mapping and mood alignment.
10. **QuizWiz** (https://quiz-wiz-official.vercel.app/) - Advanced AI-powered chatbot creation platform.
11. **Geolocation through Image Classification** (https://huggingface.co/diabolic6045/indian_cities_image_classification) - Identified Indian cities from images, achieving 66.3% accuracy using VGG16 CNN.
12. **Character Chatbot** (https://huggingface.co/diabolic6045/tony_stark_chatbot) - NLP chatbot tuned on DialoGPT for interactive conversations.
13. **Itinerary Generator** (https://huggingface.co/diabolic6045/itineraries_Generator) - Fine-tuned GPT-2 on worldwide trip plans.

Technical Skills:
- **ML Frameworks:** PyTorch, TensorFlow / Keras, HuggingFace Transformers, scikit-learn, LangChain.
- **AI Specializations:** NLP, Computer Vision (CV), LLM Fine-tuning, Generative AI, RAG.
- **LLM Ecosystem & Ops:** Axolotl, Unsloth, DeepSpeed, AWS.
- **Programming Languages:** Python, TypeScript, Java, C++.
`;

interface Message {
    role: "user" | "model";
    parts: { text: string }[];
}

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
                {!isOpen && (
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                            boxShadow: isDark
                                ? ["0 0 0 0px rgba(194, 65, 12, 0.4)", "0 0 0 20px rgba(194, 65, 12, 0)"]
                                : ["0 0 0 0px rgba(37, 99, 235, 0.4)", "0 0 0 20px rgba(37, 99, 235, 0)"]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                )}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-14 h-14 rounded-full flex items-center justify-center relative z-10 transition-colors shadow-2xl ${isDark
                        ? "bg-[#c2410c] text-white border-2 border-[#111] hover:bg-white hover:text-[#c2410c] hover:border-[#c2410c]"
                        : "bg-[var(--accent)] text-white border-2 border-white hover:bg-black"
                        }`}
                >
                    {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
                </motion.button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className={`fixed bottom-24 right-6 z-[100001] w-[min(400px,calc(100vw-48px))] h-[min(650px,calc(100vh-120px))] flex flex-col overflow-hidden transition-all duration-700 ${isDark
                            ? "bg-[#0a0a0a] border-l-4 border-b-4 border-r border-t border-[#c2410c] shadow-[0_0_30px_rgba(194,65,12,0.1)] rounded-none"
                            : "bg-white border-2 border-[var(--border)] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-3xl"
                            }`}
                    >
                        {/* Extreme mechanical detailing in dark mode */}
                        {isDark && (
                            <>
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#c2410c] m-1 opacity-50 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-12 h-1 bg-[#c2410c] pointer-events-none shadow-[0_0_10px_#c2410c]" />
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none opacity-20" />
                            </>
                        )}
                        {!isDark && (
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                        )}

                        {/* Header */}
                        <div className={`p-4 sm:p-5 flex justify-between items-center relative z-10 ${isDark ? "bg-[#111] border-b border-[#262626]" : "bg-slate-50 border-b border-[var(--border)]"
                            }`}>
                            <div>
                                <h3 className={`font-bold ${isDark ? "font-mono tracking-[0.3em] uppercase text-xs text-[#c2410c] shadow-[#c2410c]" : "font-[family-name:var(--font-syne)] text-base text-black"
                                    }`}>
                                    {isDark ? "SYS.QUERY_TERMINAL" : "Ask Anything"}
                                </h3>
                                <div className={`text-[10px] sm:text-xs flex items-center gap-2 mt-1 ${isDark ? "font-mono uppercase text-[#555] tracking-widest" : "text-[var(--muted)]"
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-[#c2410c] shadow-[0_0_5px_#c2410c]" : "bg-green-500"}`} />
                                    {isDark ? "AI_CORE_ONLINE" : "Online"}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleNewChat}
                                    title="New Chat"
                                    className={`p-2 transition-colors ${isDark ? "text-[#555] hover:text-[#c2410c]" : "text-[var(--muted)] hover:text-black"}`}
                                >
                                    <RotateCcw size={16} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className={`p-2 transition-colors ${isDark ? "text-[#555] hover:text-[#c2410c]" : "text-[var(--muted)] hover:text-black"}`}
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6 relative z-10 scrollbar-hide">
                            {messages.length === 0 ? (
                                <div className="text-center pt-8">
                                    <div className={`w-16 h-16 mx-auto mb-6 flex items-center justify-center ${isDark ? "border border-[#262626] bg-[#111] text-[#c2410c]" : "rounded-2xl bg-blue-50 text-[var(--accent)]"
                                        }`}>
                                        <MessageCircle size={28} />
                                    </div>
                                    <h4 className={`mb-2 font-bold ${isDark ? "font-mono tracking-widest uppercase text-xs text-white" : "font-[family-name:var(--font-syne)] text-lg text-black"
                                        }`}>
                                        {isDark ? "INITIALIZE QUERY" : "How can I help you?"}
                                    </h4>
                                    <p className={`text-xs mb-8 ${isDark ? "font-mono text-[#555] uppercase" : "text-[var(--muted)]"
                                        }`}>
                                        I can answer questions about Divax's skills, projects, and work experience.
                                    </p>
                                    <div className="flex flex-col gap-2 relative z-20">
                                        {suggestedQuestions.map((q, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setInput(q)}
                                                className={`px-4 py-3 text-left text-xs sm:text-sm transition-all ${isDark
                                                    ? "font-mono border border-[#222] bg-[#111] text-[#777] hover:text-white hover:border-[#c2410c] hover:bg-[#c2410c]/10"
                                                    : "rounded-xl bg-slate-50 border border-[var(--border)] text-gray-700 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-sm"
                                                    }`}
                                            >
                                                {q}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                messages.map((m, i) => (
                                    <div key={i} className={`max-w-[85%] ${m.role === "user" ? "self-end" : "self-start"}`}>
                                        <div
                                            className={`prose dark:prose-invert prose-sm p-4 text-sm leading-relaxed ${isDark
                                                ? m.role === "user"
                                                    ? "bg-[#c2410c] text-white rounded-tl-[16px] rounded-bl-[16px] rounded-br-[16px]"
                                                    : "bg-[#111] text-zinc-300 border border-[#262626] rounded-tr-[16px] rounded-bl-[16px] rounded-br-[16px] font-mono whitespace-pre-wrap"
                                                : m.role === "user"
                                                    ? "bg-[var(--accent)] text-white rounded-[20px] rounded-tr-[4px]"
                                                    : "bg-slate-50 text-gray-800 border border-[var(--border)] rounded-[20px] rounded-tl-[4px]"
                                                }`}
                                        >
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    a: ({ node, ...props }) => <a {...props} className={m.role === "user" ? "text-white underline" : isDark ? "text-[#c2410c] hover:text-white transition-colors border-b border-[#c2410c]" : "text-[var(--accent)] underline"} target="_blank" rel="noopener noreferrer" />,
                                                    p: ({ node, ...props }) => <p {...props} className="m-0" />,
                                                    ul: ({ node, ...props }) => <ul {...props} className="pl-5 mt-2 space-y-1" />,
                                                    strong: ({ node, ...props }) => <strong {...props} className={isDark && m.role !== "user" ? "text-white font-bold tracking-wide" : "font-semibold"} />,
                                                }}
                                            >
                                                {m.parts[0].text}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                ))
                            )}
                            {isLoading && messages[messages.length - 1]?.parts[0].text === "" && (
                                <div className="self-start">
                                    <div className={`p-4 ${isDark
                                        ? "bg-[#111] border border-[#262626] rounded-tr-[16px] rounded-bl-[16px] rounded-br-[16px]"
                                        : "bg-slate-50 border border-[var(--border)] rounded-[20px] rounded-tl-[4px]"
                                        }`}>
                                        <Loader2 size={16} className={`animate-spin ${isDark ? "text-[#c2410c]" : "text-[var(--accent)]"}`} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className={`p-4 relative z-10 ${isDark ? "bg-[#111] border-t border-[#262626]" : "bg-white border-t border-[var(--border)]"
                            }`}>
                            <div className={`flex gap-2 items-center p-1.5 ${isDark
                                ? "bg-[#0a0a0a] border border-[#333] focus-within:border-[#c2410c] transition-colors rounded-none"
                                : "bg-white border border-[var(--border)] rounded-2xl focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_4px_rgba(37,99,235,0.1)] transition-all"
                                }`}>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={isDark ? "ENTER QUERY..." : "Ask anything..."}
                                    className={`flex-1 bg-transparent border-none px-3 py-2 text-sm outline-none ${isDark ? "font-mono text-white placeholder:text-[#555] uppercase" : "text-black placeholder:text-gray-400"
                                        }`}
                                    disabled={isLoading}
                                    spellCheck={false}
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className={`w-9 h-9 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isDark
                                        ? "bg-[#c2410c] text-white hover:bg-white hover:text-[#c2410c]"
                                        : "bg-[var(--accent)] text-white rounded-xl hover:bg-blue-700"
                                        }`}
                                >
                                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
