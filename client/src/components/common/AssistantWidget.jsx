import React, { useMemo, useState, useEffect, useRef } from 'react';
import { FiSend, FiX } from 'react-icons/fi';
import './AssistantWidget.css';

// Advanced FAQ Database with Deep Context
const faqDatabase = [
  {
    question: 'How quickly can you deploy guards?',
    answer: '[RAPID DEPLOYMENT] We offer deployment within 24-48 hours for most assignments! For emergency situations, we can have personnel on-site within 4-6 hours in the Port Harcourt area. Our quick response team is always on standby.',
    keywords: ['deploy', 'quick', 'fast', 'rapid', 'emergency', 'urgent', 'time', 'how long']
  },
  {
    question: 'Do you offer trial periods?',
    answer: '[TRIAL PERIOD] Yes! We offer a 1-week trial period for new clients so you can evaluate our service quality. No long-term commitment required initially. If satisfied, we can proceed with monthly or annual contracts with better rates.',
    keywords: ['trial', 'test', 'try', 'evaluate', 'sample']
  },
  {
    question: 'What training do your guards receive?',
    answer: '[TRAINING PROGRAM] Our guards undergo comprehensive training including: ISO 18788 Security Operations, Fire Safety P.A.S.S., First Aid and CPR, Conflict Resolution, Report Writing, Customer Service, Emergency Response, and HSE Compliance. Plus ongoing professional development!',
    keywords: ['training', 'qualified', 'certification', 'education', 'skills']
  },
  {
    question: 'Can I request specific guards?',
    answer: '[PERSONNEL REQUEST] Absolutely! Once you work with us, you can request specific guards you are comfortable with. We maintain consistency and can assign dedicated personnel to your location for better familiarity and service quality.',
    keywords: ['specific', 'same', 'dedicated', 'particular', 'request']
  },
  {
    question: 'Do you provide uniforms and equipment?',
    answer: '[EQUIPMENT PROVIDED] Yes! All guards come fully equipped with: Professional uniforms, ID badges, Communication devices, Flashlights, Log books, and any specialized equipment needed for the assignment. Everything is included in our service cost.',
    keywords: ['uniform', 'equipment', 'tools', 'gear', 'supplied', 'provided']
  },
  {
    question: 'What areas do you cover?',
    answer: '[COVERAGE AREA] We operate throughout Rivers State with headquarters in Port Harcourt at No. 85 Aker Road, Iwofe. We cover: Port Harcourt City, Obio-Akpor, Eleme, Okrika, Ikwerre, and surrounding LGAs. We can also deploy to other Nigerian states for large contracts.',
    keywords: ['area', 'location', 'coverage', 'region', 'zone', 'where']
  },
  {
    question: 'Do you offer discounts for long-term contracts?',
    answer: '[DISCOUNT RATES] Yes! We offer attractive discounts: 5% off for 6-month contracts, 10% off for 1-year contracts, 15% off for 2-year+ contracts, and Special rates for multiple locations. Contact us for a customized quote!',
    keywords: ['discount', 'deal', 'offer', 'promotion', 'save', 'cheaper']
  },
  {
    question: 'Are your guards armed or unarmed?',
    answer: '[GUARD TYPES] We provide BOTH! Armed guards with proper licensing for high-risk environments like banks, factories, and VIP protection. Unarmed guards for residential estates, offices, schools, and events. You choose based on your security needs.',
    keywords: ['armed', 'unarmed', 'weapon', 'gun', 'type']
  },
  {
    question: 'What happens if a guard does not show up?',
    answer: '[100% COVERAGE GUARANTEE] We GUARANTEE complete coverage! Our system automatically alerts us if a guard is absent, and we immediately deploy a replacement. You will never have an uncovered shift. This is part of our reliability commitment.',
    keywords: ['absent', 'missing', 'replacement', 'backup', 'coverage']
  },
  {
    question: 'Do you have insurance coverage?',
    answer: '[INSURANCE] Yes! We carry comprehensive liability insurance covering our personnel and your property. All guards are also covered under workman compensation. You receive a copy of our insurance certificate upon contract signing.',
    keywords: ['insurance', 'liability', 'coverage', 'protected', 'compensation']
  },
  {
    question: 'How do I get a quote?',
    answer: '[GET QUOTE] Getting a quote is easy! Call us at 08103323437, email info@javelinassociates.com, or visit our Book A Meeting page to schedule a free consultation. We will assess your needs and provide a detailed, customized quote within 24 hours.',
    keywords: ['quote', 'estimate', 'price', 'cost', 'proposal']
  },
  {
    question: 'Do you work on holidays?',
    answer: '[24/7 SERVICE] YES! Our security services operate 365 days a year, including all holidays, weekends, and public holidays. Security never takes a day off! Our office may be closed on Sundays, but our guards and emergency response teams are always available.',
    keywords: ['holiday', 'weekend', 'christmas', 'new year', 'public holiday']
  },
  {
    question: 'What is your response time for emergencies?',
    answer: '[EMERGENCY RESPONSE] For emergencies, call 08103323437 immediately! Our control room operates 24/7. We can deploy rapid response teams within 30-60 minutes in Port Harcourt. For existing clients with guards on-site, response is immediate.',
    keywords: ['emergency', 'urgent', 'crisis', 'response time', 'immediate']
  },
  {
    question: 'Can you provide security for my event?',
    answer: '[EVENT SECURITY] Absolutely! We specialize in event security for weddings, corporate events, conferences, concerts, and parties. Services include crowd control, VIP protection, access management, and emergency response. Book at least 2 weeks in advance for best availability.',
    keywords: ['event', 'wedding', 'party', 'concert', 'conference']
  },
  {
    question: 'How do I terminate or cancel my contract?',
    answer: '[CONTRACT TERMS] For monthly contracts, provide 30 days written notice. For fixed-term contracts, refer to your agreement terms. There are no cancellation fees for monthly rolling contracts. Contact us to discuss your needs - we are flexible!',
    keywords: ['cancel', 'terminate', 'stop', 'end', 'discontinue']
  }
];

// Enhanced Knowledge Base with Real Javelin Associates Information
const knowledgeBase = [
  {
    id: 'services',
    title: 'Our Security Services',
    answer: 'Javelin Associates offers comprehensive security solutions including: Armed & Unarmed Security Guards, Corporate Security, Residential Protection, Event Security, Mobile Patrol Services, CCTV Surveillance & Monitoring, Access Control Systems, VIP/Executive Protection, K-9 Security Units, and Industrial Security. All services are ISO 18788 certified with 24/7 availability.',
    keywords: ['service', 'security', 'guard', 'patrol', 'event', 'armed', 'unarmed', 'cctv', 'k9', 'dog', 'surveillance', 'monitoring', 'protection', 'vip', 'corporate', 'residential', 'mobile', 'access', 'control'],
    category: 'Services'
  },
  {
    id: 'contact',
    title: 'Contact Information',
    answer: 'You can reach Javelin Associates at: 📍 No. 85 Aker Road, opposite Renew Empire Iwofe, Port Harcourt, Rivers State, Nigeria. 📞 Call us: 08103323437 or 09153542986. 📧 Email: info@javelinassociates.com or hr@javelinassociates.com. We provide 24/7 emergency response!',
    keywords: ['contact', 'email', 'phone', 'call', 'number', 'reach', 'address', 'location', 'where', 'office', 'visit', 'headquarters', 'port harcourt', 'rivers', 'nigeria', 'aker road', 'iwofe'],
    category: 'Contact'
  },
  {
    id: 'recruitment',
    title: 'Join Our Team',
    answer: 'We\'re hiring professional security personnel! Positions available: Security Guard, Senior Security Guard, Security Supervisor, Chief Security Officer, Mobile Patrol Officer, CCTV Operator, and Control Room Operator. Visit our Recruitment page to apply. We offer competitive salaries, comprehensive training, career growth opportunities, and benefits. Requirements include valid ID, relevant experience, and professionalism.',
    keywords: ['career', 'job', 'hire', 'recruit', 'apply', 'application', 'employment', 'work', 'vacancy', 'position', 'join', 'team', 'hiring', 'salary', 'benefit', 'training'],
    category: 'Careers'
  },
  {
    id: 'book',
    title: 'Book A Consultation',
    answer: 'Schedule a FREE security consultation with our specialists! Visit the "Book A Meeting" page to choose your preferred time slot. We offer In-Person Meetings, Phone Consultations, and Video Calls via Zoom/Teams. Get a custom security quote tailored to your specific needs.',
    keywords: ['book', 'meeting', 'consultation', 'schedule', 'call', 'appointment', 'quote', 'free', 'discuss', 'talk', 'speak', 'consult'],
    category: 'Consultation'
  },
  {
    id: 'about',
    title: 'About Javelin Associates',
    answer: 'Javelin Associates Ltd is Nigeria\'s leading security company based in Port Harcourt, Rivers State. We are ISO 18788 certified, providing professional security services since our establishment. Our team comprises highly trained, vetted personnel dedicated to protecting government, commercial, and private clients. We uphold the highest standards of professionalism, reliability, and HSE compliance.',
    keywords: ['about', 'company', 'who', 'javelin', 'associates', 'history', 'iso', 'certified', 'professional', 'background', 'established', 'mission', 'vision'],
    category: 'Company'
  },
  {
    id: 'pricing',
    title: 'Security Service Pricing',
    answer: 'Our pricing varies based on service type, location, duration, and specific requirements. Private Guard Services, Corporate Security, Residential Protection, and Event Security all have customized rates. Contact us for a FREE personalized quote at 08103323437 or visit our "Book A Meeting" page. We offer competitive rates with no hidden fees!',
    keywords: ['price', 'pricing', 'cost', 'fee', 'rate', 'charge', 'payment', 'how much', 'expensive', 'cheap', 'affordable', 'quote', 'estimate'],
    category: 'Pricing'
  },
  {
    id: 'sites',
    title: 'Operating Locations',
    answer: 'Javelin Associates operates across Rivers State and Nigeria. Our headquarters is in Port Harcourt at No. 85 Aker Road, Iwofe. We provide security services to residential estates, corporate offices, industrial facilities, government buildings, and event venues throughout the region. Visit our "Our Sites" page to see our full coverage map.',
    keywords: ['site', 'location', 'where', 'state', 'operate', 'coverage', 'area', 'region', 'zone', 'places', 'serve'],
    category: 'Coverage'
  },
  {
    id: 'news',
    title: 'News & Updates',
    answer: 'Stay updated with the latest from Javelin Associates! Visit our News page for operational highlights, security insights, industry updates, company milestones, and safety tips. We regularly publish articles on best security practices and our achievements.',
    keywords: ['news', 'update', 'blog', 'article', 'latest', 'recent', 'announcement', 'press', 'media'],
    category: 'News'
  },
  {
    id: 'emergency',
    title: '24/7 Emergency Response',
    answer: '🚨 For immediate security emergencies, call us NOW at 08103323437 or 09153542986. We provide 24/7 emergency response services with rapid deployment teams ready to assist. Our control room operates round-the-clock to handle all security incidents.',
    keywords: ['emergency', 'urgent', 'help', 'now', 'immediate', 'quick', '24/7', 'alarm', 'incident', 'crisis', 'threat', 'danger', 'sos'],
    category: 'Emergency'
  },
  {
    id: 'technology',
    title: 'Security Technology',
    answer: 'We utilize cutting-edge security technology including: HD CCTV Surveillance with 24/7 monitoring, Advanced Access Control Systems (Biometric, Key Cards), Motion Detection & Alerts, Cloud Storage & Remote Monitoring, GPS-tracked Mobile Patrols, and Integrated Alarm Systems. All technology is professionally installed and maintained.',
    keywords: ['technology', 'cctv', 'camera', 'surveillance', 'monitoring', 'system', 'alarm', 'biometric', 'access', 'gps', 'tracking', 'smart', 'digital'],
    category: 'Technology'
  },
  {
    id: 'training',
    title: 'Training & Certification',
    answer: 'All Javelin Associates security personnel undergo rigorous ISO 18788 compliant training including: Professional Conduct & Ethics, Emergency Response Procedures, Fire Safety (P.A.S.S.), Conflict Resolution, First Aid & CPR, Report Writing, and Visitor Management. We provide continuous professional development for our team.',
    keywords: ['training', 'certification', 'qualified', 'certified', 'licensed', 'professional', 'standards', 'iso', 'competent', 'skilled', 'education'],
    category: 'Training'
  },
  {
    id: 'hours',
    title: 'Office Hours',
    answer: 'Our office hours are: Monday - Friday: 8:00 AM - 6:00 PM, Saturday: 9:00 AM - 2:00 PM, Sunday: Closed for routine matters. However, our SECURITY SERVICES and emergency response are available 24/7/365! Call 08103323437 anytime for security assistance.',
    keywords: ['hours', 'time', 'open', 'closed', 'when', 'schedule', 'availability', 'available', 'timing'],
    category: 'Hours'
  },
  {
    id: 'residential',
    title: 'Residential Security',
    answer: 'Protect your home and family with our Residential Security services! We provide: 24/7 Manned Guarding, Estate Security, Gated Community Protection, Access Control, Visitor Management, and Emergency Response. Our guards are trained, vetted, and professional. Perfect for individual homes, apartments, and residential estates in Port Harcourt.',
    keywords: ['residential', 'home', 'house', 'estate', 'apartment', 'family', 'personal', 'private', 'domestic'],
    category: 'Services'
  },
  {
    id: 'corporate',
    title: 'Corporate Security Solutions',
    answer: 'Secure your business with our Corporate Security packages! Services include: Office Building Security, Factory & Warehouse Protection, Asset Protection, Employee Safety, Access Control, CCTV Monitoring, and Security Audits. Tailored solutions for businesses of all sizes in Rivers State.',
    keywords: ['corporate', 'business', 'office', 'company', 'commercial', 'workplace', 'factory', 'warehouse', 'industrial'],
    category: 'Services'
  },
  {
    id: 'event',
    title: 'Event Security',
    answer: 'Make your event safe and successful! We provide professional Event Security for: Weddings, Corporate Events, Conferences, Concerts, Festivals, VIP Events, and Private Parties. Our services include: Crowd Control, Access Management, VIP Protection, Perimeter Security, and Emergency Response. Experienced team handling events of all sizes.',
    keywords: ['event', 'wedding', 'party', 'concert', 'conference', 'festival', 'gathering', 'celebration', 'ceremony', 'occasion'],
    category: 'Services'
  },
  {
    id: 'why',
    title: 'Why Choose Javelin Associates?',
    answer: '✅ ISO 18788 Certified ✅ Highly Trained Personnel ✅ 24/7 Availability ✅ Rapid Response Time ✅ Professional & Reliable ✅ HSE Compliant ✅ Modern Technology ✅ Competitive Pricing ✅ Excellent Track Record ✅ Local Expertise in Rivers State. We deliver excellence in security and reliability in service!',
    keywords: ['why', 'choose', 'best', 'better', 'advantage', 'benefit', 'difference', 'unique', 'special', 'reliable', 'trust'],
    category: 'Company'
  },
  {
    id: 'k9',
    title: 'K-9 Security Units',
    answer: '🐕 Our Elite K-9 Units provide enhanced security! Services include: Drug & Explosive Detection, Perimeter Patrol, Crowd Control Support, Search & Rescue Operations, and Deterrent Presence. All K-9 teams are professionally trained and handler-supervised. Perfect for industrial sites, events, and high-security locations.',
    keywords: ['k9', 'k-9', 'dog', 'canine', 'security dog', 'police dog', 'guard dog', 'explosive', 'detection', 'sniffer'],
    category: 'Services'
  },
  {
    id: 'payment',
    title: 'Payment Methods & Terms',
    answer: '💳 We accept: Bank Transfer, Cash Payment, Cheque, and Direct Deposit. Payment Terms: Monthly invoicing for ongoing contracts, 50% deposit for event security, Net-30 terms for established corporate clients. We provide official receipts and detailed invoices for all transactions.',
    keywords: ['payment', 'pay', 'invoice', 'billing', 'deposit', 'bank', 'cash', 'cheque', 'transfer', 'method', 'terms'],
    category: 'Pricing'
  },
  {
    id: 'monitoring',
    title: 'Guard Monitoring & Supervision',
    answer: '👁️ We maintain strict quality control! Features: GPS-tracked patrol routes, Real-time supervisor spot checks, Daily activity reports, Client feedback system, Monthly performance reviews, and 24/7 control room oversight. You can also request incident reports anytime.',
    keywords: ['monitor', 'supervision', 'tracking', 'gps', 'report', 'performance', 'quality', 'control', 'oversight'],
    category: 'Services'
  },
  {
    id: 'contracts',
    title: 'Contract Terms & Flexibility',
    answer: '📄 We offer flexible contracts: Monthly rolling contracts (30 days notice), Fixed-term contracts (3, 6, 12 months), Project-based contracts (for events/construction), and Custom agreements for special needs. No hidden fees! Contracts clearly outline services, rates, and terms.',
    keywords: ['contract', 'agreement', 'terms', 'duration', 'notice', 'period', 'flexible', 'monthly', 'annual'],
    category: 'Company'
  },
  {
    id: 'incident',
    title: 'Incident Response & Reporting',
    answer: '📋 Professional incident management: Immediate supervisor notification, Detailed written reports within 24 hours, Photographic evidence when applicable, Police liaison when required, Follow-up investigation, and Corrective action implementation. All incidents logged in our secure system.',
    keywords: ['incident', 'report', 'emergency', 'response', 'problem', 'issue', 'complaint', 'situation'],
    category: 'Services'
  },
  {
    id: 'replacement',
    title: 'Guard Replacement Policy',
    answer: '🔄 Unhappy with a guard? We offer IMMEDIATE replacement at no extra cost! Simply contact us with your concerns. We take feedback seriously and will provide alternative personnel within 24 hours. Your satisfaction is guaranteed!',
    keywords: ['replace', 'replacement', 'change', 'swap', 'unhappy', 'dissatisfied', 'different guard'],
    category: 'Services'
  },
  {
    id: 'references',
    title: 'Client References & Testimonials',
    answer: '⭐ We have 15+ years of proven track record! Our clients include: Government agencies, Banks & Financial institutions, Oil & Gas companies, Manufacturing facilities, Residential estates, Schools & Hospitals, and Event organizers. Visit our website for testimonials and case studies!',
    keywords: ['reference', 'testimonial', 'review', 'client', 'customer', 'feedback', 'experience', 'track record', 'portfolio'],
    category: 'Company'
  }
];

// Conversation Context Tracking
class ConversationContext {
  constructor() {
    this.history = [];
    this.userIntent = null;
    this.lastTopic = null;
  }

  addMessage(message, intent = null) {
    this.history.push({ message, intent, timestamp: Date.now() });
    if (intent) this.lastTopic = intent;
  }

  getRecentContext(count = 3) {
    return this.history.slice(-count);
  }

  hasAskedAbout(topic) {
    return this.history.some(h => h.intent && h.intent.includes(topic));
  }
}

// Smart Intent Detection
const detectIntent = (text) => {
  const lower = text.toLowerCase();
  
  // Greeting detection
  if (/^(hi|hello|hey|good\s*(morning|afternoon|evening)|greetings)/i.test(lower)) {
    return 'greeting';
  }
  
  // Pricing intent
  if (/(price|cost|fee|rate|charge|expensive|cheap|afford|how much|payment)/i.test(lower)) {
    return 'pricing';
  }
  
  // Contact intent
  if (/(contact|call|phone|email|reach|address|location|office|visit)/i.test(lower)) {
    return 'contact';
  }
  
  // Service inquiry
  if (/(service|guard|security|protect|cctv|k-?9|patrol|event|corporate|residential)/i.test(lower)) {
    return 'services';
  }
  
  // Job/Career intent
  if (/(job|career|work|hire|recruit|apply|vacancy|position|employment)/i.test(lower)) {
    return 'career';
  }
  
  // Emergency intent
  if (/(emergency|urgent|help|now|immediate|asap|quick|fast)/i.test(lower)) {
    return 'emergency';
  }
  
  // FAQ patterns
  if (/(how|what|when|where|why|can|do you|is it|are you)/i.test(lower)) {
    return 'question';
  }
  
  return 'general';
};

// Sentiment Analysis
const analyzeSentiment = (text) => {
  const positive = ['good', 'great', 'excellent', 'thank', 'thanks', 'appreciate', 'love', 'perfect', 'amazing'];
  const negative = ['bad', 'poor', 'terrible', 'worst', 'hate', 'angry', 'disappointed', 'unhappy'];
  
  const lower = text.toLowerCase();
  const hasPositive = positive.some(word => lower.includes(word));
  const hasNegative = negative.some(word => lower.includes(word));
  
  if (hasPositive && !hasNegative) return 'positive';
  if (hasNegative && !hasPositive) return 'negative';
  return 'neutral';
};

const AssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const conversationContext = useRef(new ConversationContext());
  const speechSynthesis = window.speechSynthesis;
  const [messages, setMessages] = useState([
    {
      from: 'agent',
      text: 'Hello, I’m Sarah, your professional security assistant at Javelin Associates. I’m here to help with security services, quotations, recruitment, contact details, and urgent support.\n\nYou can ask me about:\n• Armed and unarmed guards\n• Corporate and residential security\n• Event protection and patrol services\n• Pricing, quotes, and discounts\n• Contact details and emergency support\n\nHow may I assist you today?',
      ts: Date.now()
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Text-to-Speech functionality
  const speakText = (text) => {
    if (!speechSynthesis) {
      alert('Text-to-speech is not supported in your browser.');
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    // Clean text for speech (remove emojis and special characters)
    const cleanText = text
      .replace(/[🛡️📞💼💰⏰📍🐕🚀✅🐕💳👁️📄📋🔄⭐😊😔🤔💡📋🎯🔍💬⚡]/g, '')
      .replace(/\n\n/g, '. ')
      .replace(/\n/g, '. ')
      .replace(/•/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Configure voice settings for female voice
    const voices = speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.includes('Female') || 
      voice.name.includes('female') ||
      voice.name.includes('Samantha') ||
      voice.name.includes('Victoria') ||
      voice.name.includes('Zira')
    ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.1; // Slightly higher pitch
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Load voices when available
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.getVoices();
      synth.onvoiceschanged = () => {
        synth.getVoices();
      };
    }
  }, []);

  const matcher = useMemo(() => {
    // Advanced FAQ matching
    const findFAQ = (text) => {
      const normalized = text.toLowerCase();
      return faqDatabase.find(faq => 
        normalized.includes(faq.question.toLowerCase()) ||
        faq.question.toLowerCase().includes(normalized) ||
        // Check for key phrases in FAQ
        faq.question.toLowerCase().split(' ').some(word => 
          word.length > 4 && normalized.includes(word)
        )
      );
    };

    // Enhanced knowledge base search with scoring
    const computeScore = (text) => {
      const normalized = text.toLowerCase().trim();
      let best = null;
      let bestScore = 0;

      knowledgeBase.forEach((entry) => {
        let score = 0;

        entry.keywords.forEach((keyword) => {
          const keywordLower = keyword.toLowerCase();
          if (normalized === keywordLower) {
            score += 10;
          } else if (new RegExp(`\\b${keywordLower}\\b`, 'i').test(normalized)) {
            score += 5;
          } else if (normalized.includes(keywordLower)) {
            score += 2;
          }
        });

        if (normalized.includes(entry.title.toLowerCase())) {
          score += 7;
        }

        if (normalized.includes(entry.category?.toLowerCase() || '')) {
          score += 3;
        }

        if (score > bestScore) {
          bestScore = score;
          best = entry;
        }
      });

      return best && bestScore > 0 ? best : null;
    };

    // Intelligent response generation
    const generateResponse = (text, intent, sentiment) => {
      // Check FAQ first
      const faqMatch = findFAQ(text);
      if (faqMatch) {
        return faqMatch.answer + '\n\n💬 Do you have any other questions about our services?';
      }

      // Check knowledge base
      const match = computeScore(text);
      
      // Handle greetings
      if (intent === 'greeting') {
        return 'Hello! 😊 Great to connect with you! I\'m Sarah from Javelin Associates. I can help you with information about our security services, pricing, job opportunities, or any questions you have. What would you like to know?';
      }

      // Handle emergency
      if (intent === 'emergency') {
        return '🚨 FOR IMMEDIATE SECURITY EMERGENCIES:\n\n📞 Call us NOW: 08103323437 or 09153542986\n\nWe provide 24/7 emergency response with rapid deployment teams ready to assist! Our control room operates round-the-clock.\n\n⚡ We can have personnel on-site within 4-6 hours in Port Harcourt area!';
      }

      // Sentiment-based responses
      if (sentiment === 'positive') {
        if (match) {
          return match.answer + '\n\n😊 I\'m glad I could help! Is there anything else you\'d like to know?';
        }
      }

      if (sentiment === 'negative') {
        return '😔 I\'m sorry if you\'re experiencing any issues. Let me connect you with the right help:\n\n📞 Call us directly: 08103323437\n📧 Email: info@javelinassociates.com\n\nOur team will address your concerns immediately. Can you tell me more about what you need?';
      }

      // Return knowledge base match if found
      if (match) {
        const followUp = getIntelligentFollowUp(match.category);
        return match.answer + '\n\n' + followUp;
      }

      // Smart fallback with suggestions
      return generateSmartFallback(text, intent);
    };

    // Intelligent follow-up suggestions
    const getIntelligentFollowUp = (category) => {
      const followUps = {
        'Services': '💡 Would you like to know about pricing or book a consultation?',
        'Pricing': '📋 Ready to get a free quote? I can guide you to our booking page!',
        'Contact': '💬 Would you like to schedule a meeting with our security consultants?',
        'Careers': '🎯 Would you like details about specific positions or how to apply?',
        'Company': '🔍 Want to learn about our specific security services or see client testimonials?',
        'Emergency': '✅ Is there anything else I can help you with today?'
      };
      return followUps[category] || '💬 What else would you like to know?';
    };

    // Smart fallback response
    const generateSmartFallback = (text, intent) => {
      const suggestions = {
        'pricing': '💰 I noticed you\'re asking about pricing. We offer competitive rates for all security services! For accurate quotes, I can help you:\n• Schedule a FREE consultation\n• Get basic price ranges\n• Learn about our discount packages\n\nWhat would you prefer?',
        'services': '🛡️ Looking for security services? We offer:\n• Armed/Unarmed Guards\n• Corporate Security\n• Residential Protection\n• Event Security\n• CCTV & Technology\n• Mobile Patrols\n• K-9 Units\n\nWhich interests you most?',
        'contact': '📞 Contact Information:\n📍 No. 85 Aker Road, Iwofe, Port Harcourt\n📞 08103323437 | 09153542986\n📧 info@javelinassociates.com\n\n🕐 Office: Mon-Fri 8AM-6PM, Sat 9AM-2PM\n⚡ Security Services: 24/7/365!',
        'career': '💼 Join Our Team!\n\nWe\'re hiring for:\n• Security Guards\n• Supervisors\n• CCTV Operators\n• Mobile Patrol Officers\n\n✅ Competitive Salary\n✅ Professional Training\n✅ Career Growth\n\nVisit our Recruitment page to apply!',
        'general': '🤔 I\'m not quite sure about that specific question, but I can definitely help you with:\n\n🛡️ Security Services & Solutions\n💼 Career Opportunities & Recruitment\n💰 Pricing & Custom Quotes\n📞 Contact Information & Location\n📍 Coverage Areas in Rivers State\n⚡ Emergency Services (24/7)\n\nTry asking about any of these topics, or use the quick prompts below!'
      };

      return suggestions[intent] || suggestions['general'];
    };

    return {
      getResponse: (text) => {
        const intent = detectIntent(text);
        const sentiment = analyzeSentiment(text);
        conversationContext.current.addMessage(text, intent);
        return generateResponse(text, intent, sentiment);
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

    // Show typing indicator
    setIsTyping(true);

    const reply = matcher.getResponse(trimmed);
    // Simulate realistic typing delay based on response length
    const typingDelay = Math.min(1500, Math.max(500, reply.length * 10));

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { from: 'agent', text: reply, ts: Date.now() }
      ]);
    }, typingDelay);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSend(input);
    setInput('');
  };

  return (
    <div className={`assistant-widget ${isOpen ? 'open' : ''}`}>
      <div className="assistant-tag">I’m your virtual assistant</div>
      <button
        type="button"
        className="assistant-toggle"
        onClick={() => setIsOpen((value) => !value)}
        aria-label={isOpen ? 'Hide assistant' : 'Show assistant'}
      >
        {isOpen ? (
          <FiX className="toggle-icon" />
        ) : (
          <>
            <div className="assistant-avatar">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" 
                alt="Sarah Assistant" 
                className="lady-avatar-img"
              />
            </div>
            <div className="pulse-ring"></div>
            <span className="assistant-label">Chat</span>
          </>
        )}
      </button>

      {isOpen && (
        <div className="assistant-panel" role="dialog" aria-label="Javelin Security Assistant">
          <div className="assistant-header">
            <div className="header-content">
              <div className="assistant-profile">
                <div className="assistant-avatar-header">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" 
                    alt="Sarah" 
                    className="lady-avatar-header-img"
                  />
                  <div className="online-indicator"></div>
                </div>
                <div className="assistant-info">
                  <h3>Sarah - Security Assistant</h3>
                  <span className="status-online">
                    <span className="status-dot"></span>Professional support for security services, quotes, and assistance
                  </span>
                </div>
              </div>
              <button 
                type="button" 
                className="close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
              >
                <FiX />
              </button>
            </div>
          </div>

          <div className="assistant-messages">
            {messages.map((message, idx) => (
              <div
                key={message.ts}
                className={`assistant-message ${message.from}`}
              >
                {message.from === 'agent' && (
                  <div className="message-avatar">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" 
                      alt="Sarah" 
                      className="lady-avatar-small"
                    />
                  </div>
                )}
                <div className="message-content">
                  <p style={{ whiteSpace: 'pre-line' }}>{message.text}</p>
                  <div className="message-footer">
                    <span className="message-time">
                      {new Date(message.ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {message.from === 'agent' && (
                      <button
                        className="speak-btn"
                        onClick={() => isSpeaking ? stopSpeaking() : speakText(message.text)}
                        title={isSpeaking ? 'Stop speaking' : 'Listen to response'}
                      >
                        {isSpeaking ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16" rx="1"/>
                            <rect x="14" y="4" width="4" height="16" rx="1"/>
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14"/>
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="assistant-message agent typing-indicator">
                <div className="message-avatar">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" 
                    alt="Sarah typing" 
                    className="lady-avatar-small"
                  />
                </div>
                <div className="message-content">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="assistant-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask me anything about Javelin security services..."
              aria-label="Type your question"
              disabled={isTyping}
            />
            <button 
              type="submit" 
              aria-label="Send message"
              disabled={!input.trim() || isTyping}
              className="send-btn"
            >
              <FiSend />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AssistantWidget;
