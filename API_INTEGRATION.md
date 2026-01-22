# 🔌 دليل ربط المساعد الذكي بـ AI APIs
# AI API Integration Guide

## 📋 نظرة عامة / Overview

هذا الدليل يشرح كيفية ربط المساعد الذكي بخدمات الذكاء الاصطناعي المختلفة للحصول على ردود أكثر ذكاءً وتطوراً.

---

## 🤖 1. OpenAI (ChatGPT)

### الحصول على API Key

1. زيارة: https://platform.openai.com
2. إنشاء حساب أو تسجيل الدخول
3. الذهاب إلى: API Keys
4. إنشاء مفتاح API جديد

### التكامل

```javascript
// في ملف assets/js/ai-assistant.js

async getAIResponse(message) {
    const API_KEY = 'sk-your-api-key-here';
    const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
    
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4',  // أو gpt-3.5-turbo للسرعة
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful AI assistant for a portfolio website. You help visitors learn about Ahmed Mohamed\'s skills, projects, and experience. Always be professional and friendly. Support multiple languages.'
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
        
    } catch (error) {
        console.error('OpenAI API Error:', error);
        return this.getErrorMessage();
    }
}
```

### الأسعار / Pricing
- GPT-4: $0.03 / 1K tokens (input), $0.06 / 1K tokens (output)
- GPT-3.5-turbo: $0.0015 / 1K tokens (input), $0.002 / 1K tokens (output)

---

## 🔷 2. Google Gemini

### الحصول على API Key

1. زيارة: https://makersuite.google.com/app/apikey
2. إنشاء مفتاح API جديد
3. نسخ المفتاح

### التكامل

```javascript
async getAIResponse(message) {
    const API_KEY = 'your-gemini-api-key';
    const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;
    
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a professional AI assistant for Ahmed Mohamed's portfolio website. 
                        User message: ${message}
                        
                        Please provide a helpful, friendly response. Support multiple languages and detect the user's language automatically.`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 500
                }
            })
        });

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
        
    } catch (error) {
        console.error('Gemini API Error:', error);
        return this.getErrorMessage();
    }
}
```

### الأسعار / Pricing
- مجاني حتى 60 طلب/دقيقة
- Free tier: 1 million tokens/month

---

## 🔮 3. Anthropic Claude

### الحصول على API Key

1. زيارة: https://console.anthropic.com
2. إنشاء حساب
3. الحصول على API key

### التكامل

```javascript
async getAIResponse(message) {
    const API_KEY = 'your-claude-api-key';
    const API_ENDPOINT = 'https://api.anthropic.com/v1/messages';
    
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-opus-20240229',
                max_tokens: 500,
                messages: [{
                    role: 'user',
                    content: message
                }],
                system: 'You are a helpful AI assistant for a portfolio website.'
            })
        });

        const data = await response.json();
        return data.content[0].text;
        
    } catch (error) {
        console.error('Claude API Error:', error);
        return this.getErrorMessage();
    }
}
```

---

## 🌐 4. Hugging Face (مجاني)

### الحصول على API Token

1. زيارة: https://huggingface.co/settings/tokens
2. إنشاء token جديد
3. اختيار النموذج المناسب

### التكامل

```javascript
async getAIResponse(message) {
    const API_TOKEN = 'your-hf-token';
    const MODEL = 'facebook/blenderbot-400M-distill'; // نموذج محادثة
    const API_ENDPOINT = `https://api-inference.huggingface.co/models/${MODEL}`;
    
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: message,
                parameters: {
                    max_length: 500,
                    temperature: 0.7
                }
            })
        });

        const data = await response.json();
        return data[0].generated_text;
        
    } catch (error) {
        console.error('HuggingFace API Error:', error);
        return this.getErrorMessage();
    }
}
```

---

## 🔧 5. Custom Backend (Laravel/Node.js)

### Laravel Example

```php
// routes/api.php
Route::post('/ai-chat', [AIController::class, 'chat']);

// app/Http/Controllers/AIController.php
use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;

class AIController extends Controller
{
    public function chat(Request $request)
    {
        $message = $request->input('message');
        
        $response = OpenAI::chat()->create([
            'model' => 'gpt-4',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a helpful assistant.'],
                ['role' => 'user', 'content' => $message],
            ],
        ]);

        return response()->json([
            'response' => $response->choices[0]->message->content
        ]);
    }
}
```

### Frontend Integration

```javascript
async getAIResponse(message) {
    try {
        const response = await fetch('https://your-backend.com/api/ai-chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();
        return data.response;
        
    } catch (error) {
        console.error('Backend API Error:', error);
        return this.getErrorMessage();
    }
}
```

---

## 🛡️ أفضل الممارسات / Best Practices

### 1. حماية API Key

**❌ خطأ:**
```javascript
const API_KEY = 'sk-1234567890abcdef'; // لا تضع المفتاح في Frontend
```

**✅ صحيح:**
```javascript
// استخدم Backend Proxy
fetch('/api/ai-chat', {
    method: 'POST',
    body: JSON.stringify({ message })
});
```

### 2. Rate Limiting

```javascript
class RateLimiter {
    constructor(maxRequests = 10, timeWindow = 60000) {
        this.maxRequests = maxRequests;
        this.timeWindow = timeWindow;
        this.requests = [];
    }

    canMakeRequest() {
        const now = Date.now();
        this.requests = this.requests.filter(time => now - time < this.timeWindow);
        
        if (this.requests.length >= this.maxRequests) {
            return false;
        }
        
        this.requests.push(now);
        return true;
    }
}

// الاستخدام
const limiter = new RateLimiter(10, 60000);

async getAIResponse(message) {
    if (!limiter.canMakeRequest()) {
        return 'عذراً، لقد تجاوزت الحد المسموح من الطلبات. يرجى الانتظار.';
    }
    
    // ... باقي الكود
}
```

### 3. Error Handling

```javascript
async getAIResponse(message) {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { /* ... */ },
            body: JSON.stringify({ /* ... */ })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
        
    } catch (error) {
        console.error('AI API Error:', error);
        
        // Fallback to local responses
        return this.getLocalResponses(message, this.detectLanguage());
    }
}
```

### 4. Caching

```javascript
class ResponseCache {
    constructor(ttl = 3600000) { // 1 hour
        this.cache = new Map();
        this.ttl = ttl;
    }

    set(key, value) {
        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
    }

    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        
        if (Date.now() - item.timestamp > this.ttl) {
            this.cache.delete(key);
            return null;
        }
        
        return item.value;
    }
}

// الاستخدام
const cache = new ResponseCache();

async getAIResponse(message) {
    const cacheKey = message.toLowerCase().trim();
    const cached = cache.get(cacheKey);
    
    if (cached) {
        return cached;
    }
    
    const response = await this.callAPI(message);
    cache.set(cacheKey, response);
    
    return response;
}
```

---

## 📊 مقارنة الخدمات

| الخدمة | السعر | الجودة | السرعة | دعم اللغات |
|--------|-------|--------|---------|------------|
| OpenAI GPT-4 | $$$ | ⭐⭐⭐⭐⭐ | ⚡⚡⚡ | 🌍🌍🌍🌍🌍 |
| OpenAI GPT-3.5 | $ | ⭐⭐⭐⭐ | ⚡⚡⚡⚡⚡ | 🌍🌍🌍🌍🌍 |
| Google Gemini | $ | ⭐⭐⭐⭐ | ⚡⚡⚡⚡ | 🌍🌍🌍🌍 |
| Claude | $$ | ⭐⭐⭐⭐⭐ | ⚡⚡⚡ | 🌍🌍🌍🌍 |
| HuggingFace | مجاني | ⭐⭐⭐ | ⚡⚡ | 🌍🌍🌍 |

---

## 🎯 التوصيات

### للمشاريع الصغيرة
- استخدم **Google Gemini** (مجاني حتى حد معين)
- أو **HuggingFace** (مجاني تماماً)

### للمشاريع المتوسطة
- استخدم **OpenAI GPT-3.5-turbo** (توازن بين السعر والأداء)
- أو **Google Gemini Pro**

### للمشاريع الكبيرة
- استخدم **OpenAI GPT-4** (أفضل جودة)
- أو **Claude Opus** (ممتاز للمحادثات الطويلة)

---

## 💡 نصائح إضافية

1. **استخدم Backend Proxy دائماً** لحماية API keys
2. **طبق Rate Limiting** لتجنب تجاوز الحدود
3. **استخدم Caching** للأسئلة المتكررة
4. **احتفظ بنسخة Local Fallback** في حالة فشل API
5. **راقب الاستخدام والتكاليف** بانتظام

---

## 📞 للمساعدة

إذا واجهت أي مشاكل في التكامل، تواصل معي:
- Email: your-email@example.com
- GitHub: [Your GitHub]

---

**تم التحديث: 2026**
