import React, { useState, useRef, useEffect } from 'react';
import { FaTimes, FaPaperPlane, FaUser } from 'react-icons/fa';
import './ChatBot.css';

// Custom AI Assistant Icon Component
const AIAssistantIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Robot Head */}
    <rect x="12" y="16" width="40" height="36" rx="8" fill={color} />
    {/* Antenna */}
    <circle cx="32" cy="10" r="4" fill={color} />
    <rect x="30" y="10" width="4" height="8" fill={color} />
    {/* Eyes */}
    <circle cx="22" cy="30" r="6" fill="#fff" />
    <circle cx="42" cy="30" r="6" fill="#fff" />
    <circle cx="23" cy="31" r="3" fill="#003A67" />
    <circle cx="43" cy="31" r="3" fill="#003A67" />
    {/* Mouth/Speaker */}
    <rect x="20" y="42" width="24" height="4" rx="2" fill="#fff" />
    {/* Signal waves */}
    <path d="M54 20c4 4 4 12 0 16" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <path d="M58 16c6 6 6 20 0 26" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    <path d="M10 20c-4 4-4 12 0 16" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <path d="M6 16c-6 6-6 20 0 26" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
  </svg>
);

// Chat Bubble Icon for the toggle button
const ChatBubbleAIIcon = ({ size = 28 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Chat Bubble */}
    <path 
      d="M8 12C8 8.68629 10.6863 6 14 6H50C53.3137 6 56 8.68629 56 12V40C56 43.3137 53.3137 46 50 46H20L8 58V12Z" 
      fill="currentColor"
    />
    {/* AI Brain/Circuit Pattern */}
    <circle cx="24" cy="24" r="4" fill="#003A67" />
    <circle cx="40" cy="24" r="4" fill="#003A67" />
    <circle cx="32" cy="32" r="3" fill="#003A67" />
    <line x1="24" y1="24" x2="32" y2="32" stroke="#003A67" strokeWidth="2" />
    <line x1="40" y1="24" x2="32" y2="32" stroke="#003A67" strokeWidth="2" />
    <line x1="24" y1="24" x2="40" y2="24" stroke="#003A67" strokeWidth="2" />
  </svg>
);

// ============================================
// COMPANY KNOWLEDGE BASE - EDIT THIS SECTION
// ============================================
const COMPANY_INFO = {
  name: "Javelin Associates",
  tagline: "Nigeria's Premier Security Services Provider",
  founded: "2010",
  location: "Port Harcourt, Nigeria",
  phone: "+234 800 123 4567",
  email: "info@javelinassociates.com",
  website: "www.javelinassociates.com",
  
  // About the company
  about: `Javelin Associates is Nigeria's leading security services provider, 
    established in 2010. We specialize in providing professional security guards, 
    corporate security solutions, event security, mobile patrols, and CCTV monitoring. 
    Our team consists of highly trained, certified security personnel dedicated to 
    protecting what matters most to you.`,
  
  // Services offered
  services: [
    {
      name: "Security Guards",
      description: "Professional, trained security guards for residential, commercial, and industrial properties. Our guards are vetted, trained, and equipped to handle any security situation."
    },
    {
      name: "Corporate Security",
      description: "Comprehensive security solutions for businesses including access control, security assessments, and executive protection services."
    },
    {
      name: "Event Security",
      description: "Professional crowd control and event security for conferences, concerts, weddings, and corporate events of any size."
    },
    {
      name: "Mobile Patrol",
      description: "Regular patrol services covering multiple locations with marked vehicles and trained patrol officers."
    },
    {
      name: "CCTV Monitoring",
      description: "24/7 surveillance monitoring services with real-time alerts and incident response."
    },
    {
      name: "VIP Protection",
      description: "Executive and personal protection services for high-profile individuals and dignitaries."
    }
  ],
  
  // Working hours
  workingHours: {
    office: "Monday - Friday: 8:00 AM - 6:00 PM",
    security: "24/7 Security Services Available",
    support: "Customer support available Monday - Saturday: 8:00 AM - 8:00 PM"
  },
  
  // Pricing info
  pricing: `Our pricing varies based on the type and scope of security services required. 
    We offer competitive rates and flexible packages. Please contact us for a free 
    consultation and customized quote. Basic security guard services start from 
    ₦150,000 per month.`,
  
  // Recruitment info
  recruitment: {
    hiring: true,
    requirements: [
      "Minimum age of 21 years",
      "Secondary school certificate or equivalent",
      "Clean criminal record",
      "Physical fitness",
      "Good communication skills",
      "Previous security experience is an advantage"
    ],
    benefits: [
      "Competitive salary",
      "Comprehensive training program",
      "Health insurance",
      "Career advancement opportunities",
      "Uniforms and equipment provided"
    ],
    howToApply: "Visit our Recruitment page or send your CV to careers@javelinassociates.com"
  },
  
  // FAQs
  faqs: [
    {
      question: "How quickly can you deploy security guards?",
      answer: "We can deploy security guards within 24-48 hours for urgent requests. For planned deployments, we recommend 1 week notice for proper vetting and briefing."
    },
    {
      question: "Are your guards licensed and trained?",
      answer: "Yes, all our security guards are licensed by the Nigerian Security and Civil Defence Corps (NSCDC) and undergo rigorous training including first aid, fire safety, and emergency response."
    },
    {
      question: "What areas do you cover?",
      answer: "We operate primarily in Lagos, Abuja, and Port Harcourt, with expanding coverage across Nigeria. Contact us to check availability in your area."
    },
    {
      question: "Do you provide armed security?",
      answer: "Yes, we provide both armed and unarmed security services. Armed security is available for high-risk locations and requires additional licensing and vetting."
    }
  ]
};

// ============================================
// CHATBOT LOGIC - NO NEED TO EDIT BELOW
// ============================================

const findBestResponse = (userMessage) => {
  const message = userMessage.toLowerCase();
  
  // Greetings
  if (message.match(/^(hi|hello|hey|good morning|good afternoon|good evening|howdy)/)) {
    return `Hello! 👋 Welcome to ${COMPANY_INFO.name}. I'm your virtual assistant. How can I help you today? You can ask me about our services, pricing, careers, or general information.`;
  }
  
  // Thank you
  if (message.match(/(thank|thanks|appreciate)/)) {
    return `You're welcome! 😊 Is there anything else I can help you with?`;
  }
  
  // Goodbye
  if (message.match(/(bye|goodbye|see you|talk later)/)) {
    return `Goodbye! Thank you for chatting with ${COMPANY_INFO.name}. Have a great day! 👋`;
  }
  
  // About company
  if (message.match(/(about|who are you|what is javelin|tell me about|company info|what do you do)/)) {
    return COMPANY_INFO.about;
  }
  
  // Contact information
  if (message.match(/(contact|phone|call|email|reach|address|location|where)/)) {
    return `📍 **Contact Information:**\n\n📞 Phone: ${COMPANY_INFO.phone}\n📧 Email: ${COMPANY_INFO.email}\n🌐 Website: ${COMPANY_INFO.website}\n📍 Location: ${COMPANY_INFO.location}\n\n${COMPANY_INFO.workingHours.office}`;
  }
  
  // Services - General
  if (message.match(/(service|what do you offer|what can you do|help with security)/)) {
    const serviceList = COMPANY_INFO.services.map(s => `• ${s.name}`).join('\n');
    return `We offer a comprehensive range of security services:\n\n${serviceList}\n\nWould you like more details about any specific service?`;
  }
  
  // Specific services
  if (message.match(/(guard|security guard|personnel)/)) {
    const service = COMPANY_INFO.services.find(s => s.name.toLowerCase().includes('guard'));
    return `🛡️ **${service.name}**\n\n${service.description}\n\nWould you like to request a quote or learn about other services?`;
  }
  
  if (message.match(/(corporate|business|office|company security)/)) {
    const service = COMPANY_INFO.services.find(s => s.name.toLowerCase().includes('corporate'));
    return `🏢 **${service.name}**\n\n${service.description}`;
  }
  
  if (message.match(/(event|party|wedding|concert|conference)/)) {
    const service = COMPANY_INFO.services.find(s => s.name.toLowerCase().includes('event'));
    return `🎪 **${service.name}**\n\n${service.description}`;
  }
  
  if (message.match(/(patrol|mobile|vehicle)/)) {
    const service = COMPANY_INFO.services.find(s => s.name.toLowerCase().includes('patrol'));
    return `🚗 **${service.name}**\n\n${service.description}`;
  }
  
  if (message.match(/(cctv|camera|surveillance|monitoring)/)) {
    const service = COMPANY_INFO.services.find(s => s.name.toLowerCase().includes('cctv'));
    return `📹 **${service.name}**\n\n${service.description}`;
  }
  
  if (message.match(/(vip|executive|bodyguard|protection)/)) {
    const service = COMPANY_INFO.services.find(s => s.name.toLowerCase().includes('vip'));
    return `👔 **${service.name}**\n\n${service.description}`;
  }
  
  // Pricing
  if (message.match(/(price|cost|rate|fee|how much|charge|quote|expensive|cheap|affordable)/)) {
    return `💰 **Pricing Information:**\n\n${COMPANY_INFO.pricing}\n\nFor a personalized quote, please contact us or fill out our contact form.`;
  }
  
  // Working hours
  if (message.match(/(hour|time|open|close|available|when|schedule)/)) {
    return `⏰ **Working Hours:**\n\n🏢 Office: ${COMPANY_INFO.workingHours.office}\n🛡️ Security: ${COMPANY_INFO.workingHours.security}\n📞 Support: ${COMPANY_INFO.workingHours.support}`;
  }
  
  // Jobs/Recruitment
  if (message.match(/(job|career|hiring|recruit|work|employ|vacancy|apply|join)/)) {
    const requirements = COMPANY_INFO.recruitment.requirements.slice(0, 4).map(r => `• ${r}`).join('\n');
    const benefits = COMPANY_INFO.recruitment.benefits.slice(0, 3).map(b => `• ${b}`).join('\n');
    return `💼 **Career Opportunities:**\n\n${COMPANY_INFO.recruitment.hiring ? "We're currently hiring!" : "Check back for openings."}\n\n**Key Requirements:**\n${requirements}\n\n**Benefits:**\n${benefits}\n\n📝 ${COMPANY_INFO.recruitment.howToApply}`;
  }
  
  // Training
  if (message.match(/(train|certif|license|qualified)/)) {
    return `🎓 **Training & Certification:**\n\nAll our security personnel undergo comprehensive training including:\n• Basic security operations\n• First aid and emergency response\n• Fire safety\n• Customer service\n• Legal aspects of security\n\nOur guards are licensed by NSCDC and regularly updated on best practices.`;
  }
  
  // Areas/Coverage
  if (message.match(/(area|cover|location|lagos|abuja|port harcourt|nigeria|where do you operate)/)) {
    return `📍 **Service Coverage:**\n\nWe currently operate in:\n• Lagos (All areas)\n• Abuja (FCT)\n• Port Harcourt\n\nWe're expanding across Nigeria. Contact us to check availability in your specific area.`;
  }
  
  // Emergency
  if (message.match(/(emergency|urgent|immediate|asap|quick)/)) {
    return `🚨 **Emergency Response:**\n\nFor urgent security needs, please call our 24/7 hotline: ${COMPANY_INFO.phone}\n\nWe can deploy security personnel within 24-48 hours for emergency situations.`;
  }
  
  // FAQs check
  for (const faq of COMPANY_INFO.faqs) {
    const keywords = faq.question.toLowerCase().split(' ').filter(w => w.length > 4);
    if (keywords.some(keyword => message.includes(keyword))) {
      return faq.answer;
    }
  }
  
  // Human support
  if (message.match(/(human|real person|speak to someone|agent|representative|customer service)/)) {
    return `Of course! To speak with our team:\n\n📞 Call: ${COMPANY_INFO.phone}\n📧 Email: ${COMPANY_INFO.email}\n\nOur customer support is available ${COMPANY_INFO.workingHours.support}`;
  }
  
  // Default response
  return `I'm not sure I understood that completely. Here are some things I can help you with:\n\n• Our security services\n• Pricing and quotes\n• Contact information\n• Career opportunities\n• Working hours\n• Service coverage areas\n\nOr you can contact us directly at ${COMPANY_INFO.phone}`;
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: `Hello! 👋 Welcome to ${COMPANY_INFO.name}. I'm your virtual assistant. How can I help you today?`,
      time: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      type: 'user',
      text: inputValue,
      time: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: findBestResponse(inputValue),
        time: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "What services do you offer?",
    "How much do you charge?",
    "Are you hiring?",
    "Contact information"
  ];

  return (
    <div className="chatbot-container">
      {/* Chat Toggle Button */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <FaTimes /> : <ChatBubbleAIIcon size={28} />}
        {!isOpen && <span className="chatbot-toggle__badge">1</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header__info">
              <div className="chatbot-header__avatar">
                <AIAssistantIcon size={28} color="#003A67" />
              </div>
              <div className="chatbot-header__text">
                <h4>{COMPANY_INFO.name}</h4>
                <span className="chatbot-header__status">
                  <span className="status-dot"></span>
                  Online
                </span>
              </div>
            </div>
            <button 
              className="chatbot-header__close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`chatbot-message ${msg.type === 'user' ? 'user' : 'bot'}`}
              >
                {msg.type === 'bot' && (
                  <div className="chatbot-message__avatar">
                    <AIAssistantIcon size={20} color="#FFCC00" />
                  </div>
                )}
                <div className="chatbot-message__content">
                  <p>{msg.text}</p>
                  <span className="chatbot-message__time">
                    {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {msg.type === 'user' && (
                  <div className="chatbot-message__avatar user">
                    <FaUser />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="chatbot-message bot">
                <div className="chatbot-message__avatar">
                  <AIAssistantIcon size={20} color="#FFCC00" />
                </div>
                <div className="chatbot-message__content typing">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 2 && (
            <div className="chatbot-quick-questions">
              {quickQuestions.map((q, index) => (
                <button 
                  key={index}
                  className="quick-question-btn"
                  onClick={() => {
                    setInputValue(q);
                    setTimeout(() => handleSend(), 100);
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chatbot-input">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="chatbot-send"
              onClick={handleSend}
              disabled={!inputValue.trim()}
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
