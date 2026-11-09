import React, { useState, useRef, useEffect } from 'react';
import { askAi, askAiOptions } from '../services/api';
import { Send, Sparkles, Skull, Bot, User, Trash2, Copy, Check, RefreshCw } from 'lucide-react';

const SUGGESTIONS_GENERAL = [
  'Explain the advantages of Spring AI compared to LangChain',
  'How do I implement responsive glassmorphism in modern React?',
  'Write a clean Java 17 record with validation patterns',
  'What are the key differences between Spring Boot WebMVC and WebFlux?'
];

const SUGGESTIONS_PIRATE = [
  'Tell me the tales of Blackbeard and the Queen Anne\'s Revenge!',
  'What secrets lie buried in the treacherous waters of Nassau?',
  'Teach me how to speak like a true corsair of the Spanish Main',
  'Who was the most cunning pirate to ever sail the seven seas?'
];

export default function ChatStudio() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Welcome to Spring AI Studio! I am your multimodal assistant powered by Spring AI and modern language models. Ask me anything about system design, code generation, creative writing, or switch to the Corsair Persona for nautical tales.',
      mode: 'general',
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('general'); // 'general' or 'pirate'
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend : input;
    if (!query.trim() || loading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      let replyText;
      if (mode === 'pirate') {
        replyText = await askAiOptions(query);
      } else {
        replyText = await askAi(query);
      }

      const botMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: replyText,
        mode: mode,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        text: `Network or service issue: ${err.message}. Please check backend connection.`,
        isError: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        text: 'Session reset. What would you like to explore next?',
        mode,
        time: 'Just now'
      }
    ]);
  };

  const suggestions = mode === 'pirate' ? SUGGESTIONS_PIRATE : SUGGESTIONS_GENERAL;

  return (
    <div className="chat-studio-container glass-panel">
      {/* Studio Header */}
      <div className="chat-studio-header">
        <div className="chat-title-group">
          <div className={`chat-mode-icon ${mode === 'pirate' ? 'pirate-theme' : 'ai-theme'}`}>
            {mode === 'pirate' ? <Skull size={22} /> : <Bot size={22} />}
          </div>
          <div>
            <h2 className="chat-title">
              {mode === 'pirate' ? 'Corsair Persona Studio' : 'AI Reasoning & Code Studio'}
            </h2>
            <p className="chat-subtitle">
              Engineered prompt stream: <code>{mode === 'pirate' ? '/ask-ai-options' : '/ask-ai'}</code>
            </p>
          </div>
        </div>

        <div className="chat-controls">
          <div className="mode-segmented-control">
            <button
              className={`segment-btn ${mode === 'general' ? 'active' : ''}`}
              onClick={() => setMode('general')}
            >
              <Bot size={15} />
              <span>Standard</span>
            </button>
            <button
              className={`segment-btn ${mode === 'pirate' ? 'active' : ''}`}
              onClick={() => setMode('pirate')}
            >
              <Skull size={15} />
              <span>Corsair</span>
            </button>
          </div>

          <button className="icon-btn-danger" onClick={clearChat} title="Clear Conversation">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="messages-thread">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-row ${msg.role}`}>
            <div className={`message-avatar ${msg.role} ${msg.mode === 'pirate' ? 'pirate' : ''}`}>
              {msg.role === 'user' ? (
                <User size={16} />
              ) : msg.mode === 'pirate' ? (
                <Skull size={16} />
              ) : (
                <Bot size={16} />
              )}
            </div>

            <div className={`message-bubble ${msg.role} ${msg.isError ? 'error' : ''}`}>
              <div className="message-content">
                <div className="message-text">{msg.text}</div>
              </div>

              <div className="message-footer">
                <span className="message-time">{msg.time}</span>
                <button
                  className="copy-btn"
                  onClick={() => handleCopy(msg.id, msg.text)}
                  title="Copy message"
                >
                  {copiedId === msg.id ? <Check size={13} /> : <Copy size={13} />}
                </button>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="message-row assistant">
            <div className={`message-avatar assistant ${mode === 'pirate' ? 'pirate' : ''}`}>
              {mode === 'pirate' ? <Skull size={16} /> : <Bot size={16} />}
            </div>
            <div className="message-bubble assistant loading-bubble">
              <RefreshCw size={16} className="spin-icon" />
              <span>{mode === 'pirate' ? 'Consulting the captain\'s log...' : 'Generating response...'}</span>
            </div>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Suggestion Chips */}
      <div className="suggestions-bar">
        <span className="suggestion-label">Suggestions:</span>
        <div className="suggestion-scroll">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              className="suggestion-pill"
              onClick={() => handleSend(s)}
              disabled={loading}
            >
              <Sparkles size={12} />
              <span>{s}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="chat-input-bar">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="chat-form"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === 'pirate'
                ? 'Ask for treasure lore, sea shanties, or corsair tactics...'
                : 'Ask anything, request code explanations, or brainstorm ideas...'
            }
            className="chat-input"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="chat-send-btn"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
