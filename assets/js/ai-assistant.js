/**
 * AI Assistant - Multilingual Chatbot System 2026
 * Supports all languages with advanced AI capabilities
 */

class AIAssistant {
  constructor() {
    this.apiKey = "YOUR_API_KEY"; // Replace with your AI API key (OpenAI, Gemini, etc.)
    this.currentLanguage = this.detectLanguage();
    this.conversationHistory = [];
    this.isListening = false;
    this.recognition = null;
    this.synthesis = window.speechSynthesis;
    this.init();
  }

  init() {
    this.createChatInterface();
    this.setupEventListeners();
    this.initVoiceRecognition();
    this.loadConversationHistory();
    this.setupLanguageDetection();
  }

  detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.split("-")[0]; // ar, en, fr, etc.
  }

  createChatInterface() {
    const chatHTML = `
            <div id="ai-assistant" class="ai-assistant">
                <!-- AI Button -->
                <button id="ai-toggle-btn" class="ai-toggle-btn" aria-label="Toggle AI Assistant">
                    <i class="bi bi-robot"></i>
                    <span class="ai-pulse"></span>
                </button>

                <!-- Chat Window -->
                <div id="ai-chat-window" class="ai-chat-window">
                    <!-- Header -->
                    <div class="ai-chat-header">
                        <div class="ai-header-info">
                            <div class="ai-avatar">
                                <i class="bi bi-cpu"></i>
                                <span class="ai-status-dot"></span>
                            </div>
                            <div class="ai-header-text">
                                <h4>AI Assistant</h4>
                                <p class="ai-status">Online - <span id="ai-lang-display">Auto</span></p>
                            </div>
                        </div>
                        <div class="ai-header-actions">
                            <button id="ai-voice-btn" class="ai-action-btn" title="Voice Control">
                                <i class="bi bi-mic"></i>
                            </button>
                            <button id="ai-translate-btn" class="ai-action-btn" title="Auto Translate">
                                <i class="bi bi-translate"></i>
                            </button>
                            <button id="ai-settings-btn" class="ai-action-btn" title="Settings">
                                <i class="bi bi-gear"></i>
                            </button>
                            <button id="ai-minimize-btn" class="ai-action-btn" title="Minimize">
                                <i class="bi bi-dash"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Quick Actions -->
                    <div class="ai-quick-actions">
                        <button class="ai-quick-btn" data-action="portfolio">
                            <i class="bi bi-briefcase"></i> Portfolio
                        </button>
                        <button class="ai-quick-btn" data-action="skills">
                            <i class="bi bi-code-slash"></i> Skills
                        </button>
                        <button class="ai-quick-btn" data-action="contact">
                            <i class="bi bi-envelope"></i> Contact
                        </button>
                        <button class="ai-quick-btn" data-action="cv">
                            <i class="bi bi-file-earmark-text"></i> CV
                        </button>
                    </div>

                    <!-- Messages Container -->
                    <div id="ai-messages" class="ai-messages">
                        <div class="ai-message ai-message-bot">
                            <div class="ai-message-avatar">
                                <i class="bi bi-robot"></i>
                            </div>
                            <div class="ai-message-content">
                                <p class="ai-welcome-message"></p>
                                <span class="ai-message-time">${this.getCurrentTime()}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Typing Indicator -->
                    <div id="ai-typing" class="ai-typing" style="display: none;">
                        <div class="ai-message-avatar">
                            <i class="bi bi-robot"></i>
                        </div>
                        <div class="ai-typing-dots">
                            <span></span><span></span><span></span>
                        </div>
                    </div>

                    <!-- Input Area -->
                    <div class="ai-input-area">
                        <div class="ai-input-wrapper">
                            <button id="ai-emoji-btn" class="ai-input-btn" title="Emoji">
                                <i class="bi bi-emoji-smile"></i>
                            </button>
                            <input 
                                type="text" 
                                id="ai-input" 
                                class="ai-input" 
                                placeholder="اكتب رسالتك هنا... Type your message..."
                                autocomplete="off"
                            />
                            <button id="ai-attach-btn" class="ai-input-btn" title="Attach File">
                                <i class="bi bi-paperclip"></i>
                            </button>
                            <button id="ai-send-btn" class="ai-send-btn" title="Send">
                                <i class="bi bi-send-fill"></i>
                            </button>
                        </div>
                        <div class="ai-suggestions" id="ai-suggestions"></div>
                    </div>
                </div>

                <!-- Settings Panel -->
                <div id="ai-settings-panel" class="ai-settings-panel">
                    <div class="ai-settings-header">
                        <h4>AI Settings</h4>
                        <button id="ai-settings-close" class="ai-action-btn">
                            <i class="bi bi-x"></i>
                        </button>
                    </div>
                    <div class="ai-settings-content">
                        <div class="ai-setting-item">
                            <label>Language / اللغة</label>
                            <select id="ai-language-select" class="ai-select">
                                <option value="auto">Auto Detect</option>
                                <option value="ar">العربية</option>
                                <option value="en">English</option>
                                <option value="fr">Français</option>
                                <option value="es">Español</option>
                                <option value="de">Deutsch</option>
                                <option value="zh">中文</option>
                                <option value="ja">日本語</option>
                                <option value="ru">Русский</option>
                                <option value="hi">हिन्दी</option>
                                <option value="pt">Português</option>
                            </select>
                        </div>
                        <div class="ai-setting-item">
                            <label>Voice Speed</label>
                            <input type="range" id="ai-voice-speed" min="0.5" max="2" step="0.1" value="1" class="ai-range">
                        </div>
                        <div class="ai-setting-item">
                            <label>AI Personality</label>
                            <select id="ai-personality" class="ai-select">
                                <option value="professional">Professional</option>
                                <option value="friendly">Friendly</option>
                                <option value="casual">Casual</option>
                                <option value="technical">Technical</option>
                            </select>
                        </div>
                        <div class="ai-setting-item">
                            <label class="ai-switch-label">
                                <input type="checkbox" id="ai-auto-translate" checked>
                                <span class="ai-switch"></span>
                                Auto Translate
                            </label>
                        </div>
                        <div class="ai-setting-item">
                            <label class="ai-switch-label">
                                <input type="checkbox" id="ai-voice-feedback" checked>
                                <span class="ai-switch"></span>
                                Voice Feedback
                            </label>
                        </div>
                        <div class="ai-setting-item">
                            <button id="ai-clear-history" class="ai-btn-danger">
                                <i class="bi bi-trash"></i> Clear History
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

    document.body.insertAdjacentHTML("beforeend", chatHTML);
    this.updateWelcomeMessage();
  }

  setupEventListeners() {
    // Toggle chat window
    document.getElementById("ai-toggle-btn").addEventListener("click", () => {
      this.toggleChatWindow();
    });

    // Minimize chat
    document.getElementById("ai-minimize-btn").addEventListener("click", () => {
      this.toggleChatWindow();
    });

    // Send message
    document.getElementById("ai-send-btn").addEventListener("click", () => {
      this.sendMessage();
    });

    // Enter key to send
    document.getElementById("ai-input").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.sendMessage();
      }
    });

    // Voice button
    document.getElementById("ai-voice-btn").addEventListener("click", () => {
      this.toggleVoiceRecognition();
    });

    // Settings button
    document.getElementById("ai-settings-btn").addEventListener("click", () => {
      this.toggleSettings();
    });

    document
      .getElementById("ai-settings-close")
      .addEventListener("click", () => {
        this.toggleSettings();
      });

    // Quick actions
    document.querySelectorAll(".ai-quick-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const action = e.currentTarget.dataset.action;
        this.handleQuickAction(action);
      });
    });

    // Language change
    document
      .getElementById("ai-language-select")
      .addEventListener("change", (e) => {
        this.currentLanguage = e.target.value;
        this.updateWelcomeMessage();
      });

    // Clear history
    document
      .getElementById("ai-clear-history")
      .addEventListener("click", () => {
        this.clearHistory();
      });

    // Auto suggestions on input
    document.getElementById("ai-input").addEventListener("input", (e) => {
      this.showSuggestions(e.target.value);
    });
  }

  toggleChatWindow() {
    const chatWindow = document.getElementById("ai-chat-window");
    const toggleBtn = document.getElementById("ai-toggle-btn");
    chatWindow.classList.toggle("active");
    toggleBtn.classList.toggle("active");

    if (chatWindow.classList.contains("active")) {
      document.getElementById("ai-input").focus();
    }
  }

  toggleSettings() {
    const settingsPanel = document.getElementById("ai-settings-panel");
    settingsPanel.classList.toggle("active");
  }

  async sendMessage() {
    const input = document.getElementById("ai-input");
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    this.addMessage(message, "user");
    input.value = "";

    // Show typing indicator
    this.showTypingIndicator();

    // Get AI response
    try {
      const response = await this.getAIResponse(message);
      this.hideTypingIndicator();
      this.addMessage(response, "bot");

      // Voice feedback if enabled
      if (document.getElementById("ai-voice-feedback").checked) {
        this.speak(response);
      }
    } catch (error) {
      this.hideTypingIndicator();
      this.addMessage(this.getErrorMessage(), "bot");
    }

    // Save conversation
    this.saveConversationHistory();
  }

  async getAIResponse(message) {
    // Detect language
    const detectedLang = await this.detectMessageLanguage(message);

    // Here you would integrate with your AI API (OpenAI, Gemini, etc.)
    // For now, using intelligent local responses with multilingual support

    const responses = this.getLocalResponses(message, detectedLang);

    // Simulate API delay
    await this.sleep(1000);

    return responses;
  }

  async detectMessageLanguage(text) {
    // Simple language detection
    const arabicPattern = /[\u0600-\u06FF]/;
    const chinesePattern = /[\u4E00-\u9FFF]/;
    const japanesePattern = /[\u3040-\u309F\u30A0-\u30FF]/;
    const russianPattern = /[\u0400-\u04FF]/;

    if (arabicPattern.test(text)) return "ar";
    if (chinesePattern.test(text)) return "zh";
    if (japanesePattern.test(text)) return "ja";
    if (russianPattern.test(text)) return "ru";
    return "en";
  }

  getLocalResponses(message, lang) {
    const lowerMessage = message.toLowerCase();

    // قاعدة بيانات معلومات أحمد محمد الكاملة
    const ahmedInfo = {
      skills: [
        "HTML5, CSS3, JavaScript",
        "React, Vue.js",
        "Node.js, PHP, Laravel",
        "Python, Django",
        "MySQL, MongoDB",
        "Git & GitHub",
        "React Native, Flutter",
        "REST APIs",
        "UI/UX Design",
      ],
      services: [
        "تطوير مواقع ويب احترافية",
        "تطوير تطبيقات الموبايل",
        "حلول برمجية مخصصة",
        "استشارات تقنية",
        "تصميم واجهات المستخدم",
        "دعم وصيانة فنية",
      ],
    };

    // Multilingual responses
    const responses = {
      ar: {
        greeting:
          "مرحباً! 👋 أنا المساعد الذكي لأحمد محمد. كيف يمكنني مساعدتك؟",
        about: `أحمد محمد هو مهندس برمجيات محترف ومطور Full Stack متخصص في بناء حلول برمجية حديثة ومبتكرة 💻\n\n✨ خبرة واسعة في تطوير المواقع والتطبيقات\n🚀 شغف بالتقنيات الحديثة والذكاء الاصطناعي\n💡 تركيز على الجودة والأداء العالي`,
        skills: `المهارات التقنية لأحمد محمد:\n\n${ahmedInfo.skills.map((s) => `✅ ${s}`).join("\n")}\n\n💪 خبرة عملية واسعة في كل هذه التقنيات`,
        services: `الخدمات التي يقدمها أحمد:\n\n${ahmedInfo.services.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\n📞 هل تريد الاستفسار عن خدمة معينة؟`,
        portfolio:
          "أحمد لديه مشاريع مميزة تشمل:\n\n🌐 مواقع ويب احترافية\n📱 تطبيقات موبايل مبتكرة\n🤖 حلول ذكاء اصطناعي\n💼 أنظمة إدارية متكاملة\n\nهل تريد زيارة قسم المشاريع؟",
        contact:
          "للتواصل مع أحمد محمد:\n\n📧 استخدم نموذج الاتصال في الموقع\n💼 متاح للعمل على مشاريع جديدة\n⚡ الرد السريع مضمون\n\nهل تريد الانتقال لصفحة التواصل؟",
        cv: "السيرة الذاتية لأحمد محمد تشمل:\n\n📄 الخبرات العملية والمشاريع\n🎓 المؤهلات والشهادات\n🏆 الإنجازات المهنية\n💼 المهارات التقنية\n\nهل تريد تحميل السيرة الذاتية؟",
        web_dev:
          "أحمد متخصص في تطوير الويب:\n\n🎨 Frontend: HTML5, CSS3, JavaScript, React, Vue\n⚙️ Backend: Node.js, PHP, Laravel, Python\n🗄️ قواعد البيانات: MySQL, MongoDB\n\n✨ مواقع سريعة، آمنة، ومتجاوبة 100%",
        mobile_dev:
          "تطوير تطبيقات الموبايل:\n\n📱 React Native & Flutter\n💎 تصميم واجهات عصرية\n⚡ أداء عالي وسرعة\n🔧 صيانة ودعم مستمر\n\nتطبيقات احترافية لـ iOS و Android",
        thanks: "على الرحب والسعة! 😊 سعيد بمساعدتك. هل لديك سؤال آخر؟",
        default:
          "يمكنني مساعدتك في معرفة:\n\n• مهارات وخبرات أحمد\n• الخدمات المقدمة\n• المشاريع السابقة\n• طرق التواصل\n\nما الذي تريد معرفته؟",
      },
      en: {
        greeting:
          "Hello! 👋 I'm Ahmed Mohamed's AI assistant. How can I help you?",
        about: `Ahmed Mohamed is a professional Software Engineer and Full Stack Developer specialized in building modern and innovative software solutions 💻\n\n✨ Extensive experience in web & app development\n🚀 Passionate about modern tech & AI\n💡 Focus on quality and high performance`,
        skills: `Ahmed Mohamed's Technical Skills:\n\n${ahmedInfo.skills.map((s) => `✅ ${s}`).join("\n")}\n\n💪 Practical expertise in all these technologies`,
        services: `Services offered by Ahmed:\n\n${ahmedInfo.services.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\n📞 Want to inquire about a specific service?`,
        portfolio:
          "Ahmed has featured projects including:\n\n🌐 Professional websites\n📱 Innovative mobile apps\n🤖 AI solutions\n💼 Complete management systems\n\nWould you like to visit the Projects section?",
        contact:
          "To contact Ahmed Mohamed:\n\n📧 Use the contact form on the website\n💼 Available for new projects\n⚡ Quick response guaranteed\n\nGo to contact page?",
        cv: "Ahmed Mohamed's CV includes:\n\n📄 Work experience & projects\n🎓 Qualifications & certifications\n🏆 Professional achievements\n💼 Technical skills\n\nWould you like to download the CV?",
        web_dev:
          "Ahmed specializes in web development:\n\n🎨 Frontend: HTML5, CSS3, JavaScript, React, Vue\n⚙️ Backend: Node.js, PHP, Laravel, Python\n🗄️ Databases: MySQL, MongoDB\n\n✨ Fast, secure, 100% responsive websites",
        mobile_dev:
          "Mobile App Development:\n\n📱 React Native & Flutter\n💎 Modern UI design\n⚡ High performance\n🔧 Ongoing support\n\nProfessional apps for iOS & Android",
        thanks: "You're welcome! 😊 Happy to help. Any other questions?",
        default:
          "I can help you learn about:\n\n• Ahmed's skills & experience\n• Services offered\n• Previous projects\n• Contact methods\n\nWhat would you like to know?",
      },
    };

    const langResponses = responses[lang] || responses.en;

    // Smart response matching مع تفاصيل أكثر
    if (lowerMessage.match(/مرحب|hello|hi|hey|hola|السلام/i)) {
      return langResponses.greeting;
    }
    if (
      lowerMessage.match(
        /من هو|who is|من أحمد|about|عن أحمد|tell me about|أخبرني/i,
      )
    ) {
      return langResponses.about;
    }
    if (lowerMessage.match(/خدمات|services|بيقدم|يقدم|what do|ماذا|بيعمل/i)) {
      return langResponses.services;
    }
    if (lowerMessage.match(/skills|خبرات|مهارات|قدرات|expertise|بيعرف/i)) {
      return langResponses.skills;
    }
    if (lowerMessage.match(/portfolio|projects|مشاريع|أعمال|works/i)) {
      return langResponses.portfolio;
    }
    if (lowerMessage.match(/contact|تواصل|اتصال|reach|email/i)) {
      return langResponses.contact;
    }
    if (lowerMessage.match(/cv|resume|سيرة|curriculum/i)) {
      return langResponses.cv;
    }
    if (lowerMessage.match(/web|ويب|موقع|website/i)) {
      return langResponses.web_dev;
    }
    if (lowerMessage.match(/mobile|موبايل|تطبيق|app/i)) {
      return langResponses.mobile_dev;
    }
    if (lowerMessage.match(/thank|شكر|merci|gracias/i)) {
      return langResponses.thanks;
    }

    return langResponses.default;
  }

  addMessage(text, type) {
    const messagesContainer = document.getElementById("ai-messages");
    const messageDiv = document.createElement("div");
    messageDiv.className = `ai-message ai-message-${type}`;

    const content = `
            ${
              type === "bot"
                ? `
                <div class="ai-message-avatar">
                    <i class="bi bi-robot"></i>
                </div>
            `
                : ""
            }
            <div class="ai-message-content">
                <p>${this.formatMessage(text)}</p>
                <span class="ai-message-time">${this.getCurrentTime()}</span>
            </div>
            ${
              type === "user"
                ? `
                <div class="ai-message-avatar ai-message-avatar-user">
                    <i class="bi bi-person-circle"></i>
                </div>
            `
                : ""
            }
        `;

    messageDiv.innerHTML = content;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Add to history
    this.conversationHistory.push({
      text,
      type,
      time: new Date().toISOString(),
    });
  }

  formatMessage(text) {
    // Convert URLs to links
    text = text.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank">$1</a>',
    );
    // Convert line breaks
    text = text.replace(/\n/g, "<br>");
    return text;
  }

  getCurrentTime() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  showTypingIndicator() {
    document.getElementById("ai-typing").style.display = "flex";
    const messagesContainer = document.getElementById("ai-messages");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTypingIndicator() {
    document.getElementById("ai-typing").style.display = "none";
  }

  // Voice Recognition
  initVoiceRecognition() {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = this.getLanguageCode();

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById("ai-input").value = transcript;
        this.sendMessage();
      };

      this.recognition.onend = () => {
        this.isListening = false;
        document.getElementById("ai-voice-btn").classList.remove("listening");
      };
    }
  }

  toggleVoiceRecognition() {
    if (!this.recognition) {
      alert("Voice recognition is not supported in your browser.");
      return;
    }

    if (this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      document.getElementById("ai-voice-btn").classList.remove("listening");
    } else {
      this.recognition.lang = this.getLanguageCode();
      this.recognition.start();
      this.isListening = true;
      document.getElementById("ai-voice-btn").classList.add("listening");
    }
  }

  speak(text) {
    if (this.synthesis.speaking) {
      this.synthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.getLanguageCode();
    utterance.rate = parseFloat(
      document.getElementById("ai-voice-speed").value,
    );

    this.synthesis.speak(utterance);
  }

  getLanguageCode() {
    const langMap = {
      ar: "ar-SA",
      en: "en-US",
      fr: "fr-FR",
      es: "es-ES",
      de: "de-DE",
      zh: "zh-CN",
      ja: "ja-JP",
      ru: "ru-RU",
      hi: "hi-IN",
      pt: "pt-PT",
    };

    const lang =
      this.currentLanguage === "auto"
        ? this.detectLanguage()
        : this.currentLanguage;
    return langMap[lang] || "en-US";
  }

  handleQuickAction(action) {
    const actions = {
      portfolio: () => (window.location.href = "Projects.html"),
      skills: () => (window.location.href = "Skills.html"),
      contact: () => (window.location.href = "Contact.html"),
      cv: () => (window.location.href = "CV.html"),
    };

    if (actions[action]) {
      actions[action]();
    }
  }

  showSuggestions(input) {
    if (!input || input.length < 2) {
      document.getElementById("ai-suggestions").style.display = "none";
      return;
    }

    const suggestions = [
      "Show me your portfolio",
      "What are your skills?",
      "How can I contact you?",
      "Download CV",
      "Tell me about your projects",
    ];

    const filtered = suggestions.filter((s) =>
      s.toLowerCase().includes(input.toLowerCase()),
    );

    if (filtered.length > 0) {
      const suggestionsHTML = filtered
        .map((s) => `<div class="ai-suggestion-item">${s}</div>`)
        .join("");

      const container = document.getElementById("ai-suggestions");
      container.innerHTML = suggestionsHTML;
      container.style.display = "block";

      // Add click handlers
      container.querySelectorAll(".ai-suggestion-item").forEach((item) => {
        item.addEventListener("click", () => {
          document.getElementById("ai-input").value = item.textContent;
          container.style.display = "none";
        });
      });
    }
  }

  updateWelcomeMessage() {
    const welcomeMessages = {
      ar: "مرحباً! 👋 أنا المساعد الذكي لأحمد محمد - مهندس البرمجيات. يمكنني إخبارك عن مهاراته، خدماته، ومشاريعه. كيف أساعدك؟",
      en: "Hello! 👋 I'm Ahmed Mohamed's AI Assistant - Software Engineer. I can tell you about his skills, services, and projects. How can I help?",
      fr: "Bonjour! 👋 Je suis l'assistant IA d'Ahmed Mohamed - Ingénieur Logiciel. Comment puis-je vous aider?",
      es: "¡Hola! 👋 Soy el asistente IA de Ahmed Mohamed - Ingeniero de Software. ¿Cómo puedo ayudarte?",
      de: "Hallo! 👋 Ich bin Ahmed Mohameds KI-Assistent - Software-Ingenieur. Wie kann ich helfen?",
    };

    const lang =
      this.currentLanguage === "auto"
        ? this.detectLanguage()
        : this.currentLanguage;
    const welcomeMsg = welcomeMessages[lang] || welcomeMessages.en;

    const welcomeElement = document.querySelector(".ai-welcome-message");
    if (welcomeElement) {
      welcomeElement.textContent = welcomeMsg;
    }
  }

  setupLanguageDetection() {
    // Auto-detect and update language display
    setInterval(() => {
      if (this.currentLanguage === "auto") {
        const detected = this.detectLanguage();
        document.getElementById("ai-lang-display").textContent =
          detected.toUpperCase();
      } else {
        document.getElementById("ai-lang-display").textContent =
          this.currentLanguage.toUpperCase();
      }
    }, 1000);
  }

  saveConversationHistory() {
    localStorage.setItem(
      "ai-conversation-history",
      JSON.stringify(this.conversationHistory),
    );
  }

  loadConversationHistory() {
    const saved = localStorage.getItem("ai-conversation-history");
    if (saved) {
      try {
        this.conversationHistory = JSON.parse(saved);
        // Optionally reload messages
      } catch (e) {
        console.error("Failed to load conversation history");
      }
    }
  }

  clearHistory() {
    if (confirm("Are you sure you want to clear the conversation history?")) {
      this.conversationHistory = [];
      localStorage.removeItem("ai-conversation-history");
      document.getElementById("ai-messages").innerHTML = "";
      this.updateWelcomeMessage();
      location.reload();
    }
  }

  getErrorMessage() {
    const lang =
      this.currentLanguage === "auto"
        ? this.detectLanguage()
        : this.currentLanguage;
    const errors = {
      ar: "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.",
      en: "Sorry, an error occurred. Please try again.",
      fr: "Désolé, une erreur s'est produite. Veuillez réessayer.",
      es: "Lo siento, ocurrió un error. Por favor, inténtalo de nuevo.",
    };
    return errors[lang] || errors.en;
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Initialize AI Assistant when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.aiAssistant = new AIAssistant();
});
