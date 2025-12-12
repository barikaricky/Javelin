import React, { useMemo, useState } from 'react';
import { FiHelpCircle, FiSend, FiX } from 'react-icons/fi';
import './AssistantWidget.css';

const knowledgeBase = [
  {
    id: 'services',
    title: 'Services',
    answer: 'We provide armed and unarmed security services, mobile patrols, event security, and tailored corporate protection programs. Ask if you need details on any service.',
    keywords: ['service', 'security', 'guard', 'patrol', 'event']
  },
  {
    id: 'contact',
    title: 'Contact',
    answer: 'You can reach us at info@javelinassociates.org or call (202) 918-6494. Our headquarters is in Washington, DC and we operate nationwide.',
    keywords: ['contact', 'email', 'phone', 'call', 'number', 'reach']
  },
  {
    id: 'recruitment',
    title: 'Recruitment',
    answer: 'Interested in joining the team? Visit the Careers page to see open roles and submit your application. We look for licensed, highly trained professionals.',
    keywords: ['career', 'job', 'hire', 'recruit', 'apply', 'application']
  },
  {
    id: 'book',
    title: 'Book A Meeting',
    answer: 'Need a consultation? Use the Book A Meeting page to schedule a call with our security specialists at a time that works for you.',
    keywords: ['book', 'meeting', 'consultation', 'schedule', 'call']
  },
  {
    id: 'about',
    title: 'About',
    answer: 'Javelin Associates is a veteran-led security firm delivering dependable protection for government, commercial, and private clients.',
    keywords: ['about', 'company', 'who', 'javelin', 'associates']
  },
  {
    id: 'admin',
    title: 'Admin',
    answer: 'Admins can manage content via the secure dashboard at /#/admin/login. Use the latest credentials provided by the leadership team.',
    keywords: ['admin', 'dashboard', 'login', 'manage', 'credentials']
  },
  {
    id: 'sites',
    title: 'Operating Sites',
    answer: 'We actively support clients across multiple states. Visit the Our Sites page for the full map and service coverage.',
    keywords: ['site', 'location', 'where', 'state', 'operate']
  },
  {
    id: 'news',
    title: 'News & Updates',
    answer: 'Stay informed with our News page. We publish operational highlights, safety insights, and company milestones.',
    keywords: ['news', 'update', 'blog', 'article']
  }
];

const quickPrompts = [
  'What services do you offer?',
  'How can I contact the team?',
  'How do I apply for a job?',
  'Where do you operate?'
];

const AssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      from: 'agent',
      text: 'Hi, I\'m the Javelin Assistant. Ask anything about our services, recruiting, or support and I\'ll point you in the right direction.',
      ts: Date.now()
    }
  ]);

  const matcher = useMemo(() => {
    const computeScore = (text) => {
      const normalized = text.toLowerCase();
      let best = null;
      let bestScore = 0;

      knowledgeBase.forEach((entry) => {
        let score = 0;

        entry.keywords.forEach((keyword) => {
          if (normalized.includes(keyword)) {
            score += 2;
          }
        });

        if (normalized.includes(entry.title.toLowerCase())) {
          score += 3;
        }

        if (score > bestScore) {
          bestScore = score;
          best = entry;
        }
      });

      return best && bestScore > 0 ? best : null;
    };

    return {
      getResponse: (text) => {
        const match = computeScore(text);
        if (match) {
          return match.answer;
        }
        return 'I\'m here to help with services, recruitment, scheduling, and company information. Could you rephrase or ask about one of those topics?';
      }
    };
  }, []);

  const handleSend = (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      { from: 'user', text: trimmed, ts: Date.now() }
    ]);

    const reply = matcher.getResponse(trimmed);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: 'agent', text: reply, ts: Date.now() }
      ]);
    }, 250);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSend(input);
    setInput('');
  };

  const handlePromptClick = (prompt) => {
    handleSend(prompt);
    setInput('');
  };

  return (
    <div className={`assistant-widget ${isOpen ? 'open' : ''}`}>
      <button
        type="button"
        className="assistant-toggle"
        onClick={() => setIsOpen((value) => !value)}
        aria-label={isOpen ? 'Hide assistant' : 'Show assistant'}
      >
        {isOpen ? <FiX /> : <FiHelpCircle />}
      </button>

      {isOpen && (
        <div className="assistant-panel" role="dialog" aria-label="Javelin Assistant">
          <div className="assistant-header">
            <div>
              <h3>Javelin Assistant</h3>
              <span>Your guide to the company</span>
            </div>
          </div>

          <div className="assistant-messages">
            {messages.map((message) => (
              <div
                key={message.ts}
                className={`assistant-message ${message.from}`}
              >
                <p>{message.text}</p>
              </div>
            ))}
          </div>

          <div className="assistant-prompts">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handlePromptClick(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          <form className="assistant-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about services, careers, or support"
              aria-label="Ask a question"
            />
            <button type="submit" aria-label="Send message">
              <FiSend />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AssistantWidget;
