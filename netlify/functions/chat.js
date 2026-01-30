// netlify/functions/chat.js
export async function handler(event) {
  console.log('收到请求，方法:', event.httpMethod);
  
  // 处理CORS预检请求
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // 只处理POST请求
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: '只支持POST请求' })
    };
  }

  try {
    // 解析请求体
    const { message } = JSON.parse(event.body || '{}');
    
    if (!message || typeof message !== 'string') {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: '消息内容不能为空' })
      };
    }

    // 检测语言（更高效的方法）
    const hasChinese = /[\u4e00-\u9fa5]/.test(message);
    const language = hasChinese ? 'zh' : 'en';
    console.log('语言检测:', language, '长度:', message.length);

    // 简化的系统提示（减少token消耗）
    const systemPrompt = language === 'zh' 
      ? `你是DeepSeek AI学习助手。请用中文回答。

核心职责：
1. 解释DeepSeek模型和技术
2. 解答API使用、架构、提示词工程等问题
3. 提供实用的代码示例

要求：
- 用中文回答所有问题
- 清晰、准确、实用
- 使用代码示例
- 鼓励动手实践`
      : `You are a DeepSeek AI learning assistant. Answer in English.

Core responsibilities:
1. Explain DeepSeek models and technology
2. Answer questions about API, architecture, prompting
3. Provide practical code examples

Requirements:
- Answer all questions in English
- Clear, accurate, practical
- Use code examples
- Encourage hands-on practice`;

    // 获取API密钥
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      console.error('API密钥未配置');
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          reply: language === 'zh' 
            ? 'AI服务配置错误：API密钥未设置。请检查Netlify环境变量。'
            : 'AI service configuration error: API key not set. Check Netlify environment variables.',
          language
        })
      };
    }

    console.log('调用DeepSeek API...');
    
    // 设置合理的超时时间
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // 45秒

    try {
      const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
          ],
          max_tokens: language === 'zh' ? 1200 : 1000, // 中文分配更多tokens
          temperature: 0.7,
          stream: false
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log('API响应状态:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API错误:', response.status, errorText);
        
        // 友好的错误信息
        let userMessage;
        if (response.status === 401) {
          userMessage = language === 'zh'
            ? 'API密钥无效或已过期。请检查DeepSeek账户和API密钥设置。'
            : 'API key invalid or expired. Check DeepSeek account and API key settings.';
        } else if (response.status === 429) {
          userMessage = language === 'zh'
            ? '请求过于频繁，请稍后再试。'
            : 'Too many requests. Please try again later.';
        } else {
          userMessage = language === 'zh'
            ? `API错误 ${response.status}。请稍后重试。`
            : `API error ${response.status}. Please try again later.`;
        }
        
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            reply: userMessage,
            language,
            error: true
          })
        };
      }

      const data = await response.json();
      console.log('API响应成功，有choices:', !!data.choices);

      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('API返回了无效的数据格式');
      }

      const reply = data.choices[0].message.content || 
        (language === 'zh' ? "抱歉，我暂时无法回答这个问题。" : "Sorry, I cannot answer this question.");

      console.log('回复生成成功，长度:', reply.length);

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          reply,
          language,
          timestamp: new Date().toISOString()
        })
      };

    } catch (fetchError) {
      clearTimeout(timeoutId);
      throw fetchError;
    }

  } catch (error) {
    console.error('聊天函数错误:', error);
    
    // 检测语言用于错误消息
    let language = 'zh';
    try {
      if (event.body) {
        const { message } = JSON.parse(event.body);
        const hasChinese = /[\u4e00-\u9fa5]/.test(message);
        language = hasChinese ? 'zh' : 'en';
      }
    } catch (e) {
      // 使用默认语言
    }
    
    // 更友好的错误消息
    let userMessage;
    if (error.name === 'AbortError') {
      userMessage = language === 'zh'
        ? '⏱️ **中文处理超时**\n\n可能原因：\n• 问题较复杂，处理时间较长\n• 网络连接不稳定\n• AI服务暂时繁忙\n\n**建议：**\n1. 简化问题或分成小问题\n2. 稍后重试\n3. 先尝试英文提问'
        : '⏱️ **Request Timeout**\n\nPossible reasons:\n• Question is complex\n• Network connection issue\n• AI service busy\n\n**Suggestions:**\n1. Simplify your question\n2. Try again later';
    } else if (error.message.includes('network')) {
      userMessage = language === 'zh'
        ? '🌐 **网络连接问题**\n\n无法连接到AI服务。请检查网络连接后重试。'
        : '🌐 **Network Connection Issue**\n\nCannot connect to AI service. Please check your network connection.';
    } else {
      userMessage = language === 'zh'
        ? '❌ **服务暂时不可用**\n\n请稍后重试或联系管理员。'
        : '❌ **Service Temporarily Unavailable**\n\nPlease try again later or contact administrator.';
    }
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        reply: userMessage,
        language,
        error: true,
        errorType: error.name
      })
    };
  }
}