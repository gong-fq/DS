// DeepSeek AI Learning Academy - Main Application JavaScript

// 全局变量
let currentLanguage = 'auto';
let currentLesson = 1;
let currentResponse = '';
let detectedLanguage = 'zh';
let recognition = null;
let isRecording = false;

// 课程内容数据库 - 包含8讲完整内容
const lessons = {
  1: {
    zh: {
      title: "第1讲：认识DeepSeek",
      content: `
        <h2>第1讲：认识DeepSeek</h2>
        <h3>什么是DeepSeek？</h3>
        <p>DeepSeek是由深度求索公司开发的大语言模型系列，以其高性能和开源特性在AI领域崭露头角。</p>
        <p><strong>核心特点：</strong></p>
        <ul>
          <li>🚀 高性能：在多项基准测试中表现优异</li>
          <li>🔓 开源开放：提供模型权重和技术细节</li>
          <li>💰 经济实惠：API调用成本低于主流竞品</li>
          <li>🌍 中英双语：对中文有出色的理解和生成能力</li>
        </ul>
        
        <h3>DeepSeek模型家族</h3>
        <ul>
          <li><strong>DeepSeek-V3</strong>：最新旗舰模型，671B参数，MoE架构</li>
          <li><strong>DeepSeek-V2</strong>：高效版本，平衡性能与成本</li>
          <li><strong>DeepSeek-Coder</strong>：专注代码生成和理解</li>
          <li><strong>DeepSeek-Math</strong>：数学推理专用模型</li>
        </ul>
        
        <pre><code>// 选择合适的模型
const models = {
  chat: "deepseek-chat",
  coder: "deepseek-coder",
  reasoner: "deepseek-reasoner"
};</code></pre>

        <h3>为什么学习DeepSeek？</h3>
        <ol>
          <li><strong>技术前沿</strong>：了解最新的AI架构和优化技术</li>
          <li><strong>实用性强</strong>：可直接应用于生产环境</li>
          <li><strong>成本优势</strong>：降低AI应用的运营成本</li>
          <li><strong>开源生态</strong>：参与社区，贡献代码</li>
          <li><strong>本地化优势</strong>：更好地服务中文用户</li>
        </ol>

        <div class="quiz-section">
          <h3>💡 测试题</h3>
          <div class="question">
            <h4>DeepSeek-V3使用了什么架构？</h4>
            <div class="options">
              <label class="option">
                <input type="radio" name="q1" value="A">
                <span>A. Transformer</span>
              </label>
              <label class="option">
                <input type="radio" name="q1" value="B">
                <span>B. MoE (Mixture of Experts)</span>
              </label>
              <label class="option">
                <input type="radio" name="q1" value="C">
                <span>C. CNN</span>
              </label>
              <label class="option">
                <input type="radio" name="q1" value="D">
                <span>D. RNN</span>
              </label>
            </div>
            <button class="check-btn" onclick="checkAnswer(1, 'B')">提交答案</button>
            <div class="feedback" id="feedback1"></div>
          </div>
        </div>
      `
    },
    en: {
      title: "Lesson 1: Introduction to DeepSeek",
      content: `
        <h2>Lesson 1: Introduction to DeepSeek</h2>
        <h3>What is DeepSeek?</h3>
        <p>DeepSeek is a series of large language models developed by DeepSeek, distinguished by high performance and open-source nature.</p>
        <p><strong>Core Features:</strong></p>
        <ul>
          <li>🚀 High Performance: Excellent results on multiple benchmarks</li>
          <li>🔓 Open Source: Model weights and technical details available</li>
          <li>💰 Cost-Effective: Lower API costs than major competitors</li>
          <li>🌍 Bilingual: Strong Chinese and English capabilities</li>
        </ul>
        
        <h3>DeepSeek Model Family</h3>
        <ul>
          <li><strong>DeepSeek-V3</strong>: Latest flagship, 671B params, MoE architecture</li>
          <li><strong>DeepSeek-V2</strong>: Efficient version, balanced performance</li>
          <li><strong>DeepSeek-Coder</strong>: Specialized for code generation</li>
          <li><strong>DeepSeek-Math</strong>: Mathematical reasoning focus</li>
        </ul>
        
        <pre><code>// Choose the right model
const models = {
  chat: "deepseek-chat",
  coder: "deepseek-coder",
  reasoner: "deepseek-reasoner"
};</code></pre>

        <h3>Why Learn DeepSeek?</h3>
        <ol>
          <li><strong>Cutting-Edge Tech</strong>: Latest AI architecture</li>
          <li><strong>Practical</strong>: Ready for production</li>
          <li><strong>Cost Advantage</strong>: Reduce operation costs</li>
          <li><strong>Open Ecosystem</strong>: Join community</li>
          <li><strong>Localization</strong>: Better serve Chinese users</li>
        </ol>

        <div class="quiz-section">
          <h3>💡 Quiz</h3>
          <div class="question">
            <h4>What architecture does DeepSeek-V3 use?</h4>
            <div class="options">
              <label class="option">
                <input type="radio" name="q1" value="A">
                <span>A. Transformer</span>
              </label>
              <label class="option">
                <input type="radio" name="q1" value="B">
                <span>B. MoE (Mixture of Experts)</span>
              </label>
              <label class="option">
                <input type="radio" name="q1" value="C">
                <span>C. CNN</span>
              </label>
              <label class="option">
                <input type="radio" name="q1" value="D">
                <span>D. RNN</span>
              </label>
            </div>
            <button class="check-btn" onclick="checkAnswer(1, 'B')">Submit</button>
            <div class="feedback" id="feedback1"></div>
          </div>
        </div>
      `
    }
  },
  2: {
    zh: {
      title: "第2讲：模型架构深度解析",
      content: `
        <h2>第2讲：模型架构深度解析</h2>
        <h3>Transformer基础</h3>
        <p>DeepSeek基于Transformer架构，这是现代大语言模型的基石。</p>
        <ul>
          <li><strong>Self-Attention</strong>：让模型理解词之间的关系</li>
          <li><strong>Multi-Head Attention</strong>：从多个角度捕获信息</li>
          <li><strong>Position Encoding</strong>：保留序列顺序信息</li>
        </ul>

        <h3>MoE架构优势</h3>
        <p>DeepSeek-V3采用Mixture of Experts（MoE）架构：</p>
        <ul>
          <li>🎯 动态路由：根据输入激活不同专家</li>
          <li>⚡ 高效推理：仅激活部分参数</li>
          <li>📈 模型容量：671B总参数，实际激活37B</li>
        </ul>
        
        <pre><code>class MoELayer {
  route(input) {
    const scores = this.router(input);
    const topK = selectTopK(scores, 2);
    return this.experts[topK].forward(input);
  }
}</code></pre>

        <div class="quiz-section">
          <h3>💡 测试题</h3>
          <div class="question">
            <h4>MoE架构的主要优势是什么？</h4>
            <div class="options">
              <label class="option">
                <input type="radio" name="q2" value="A">
                <span>A. 增加模型参数总量</span>
              </label>
              <label class="option">
                <input type="radio" name="q2" value="B">
                <span>B. 只激活部分参数，提高效率</span>
              </label>
              <label class="option">
                <input type="radio" name="q2" value="C">
                <span>C. 简化模型结构</span>
              </label>
            </div>
            <button class="check-btn" onclick="checkAnswer(2, 'B')">提交答案</button>
            <div class="feedback" id="feedback2"></div>
          </div>
        </div>
      `
    },
    en: {
      title: "Lesson 2: Model Architecture",
      content: `
        <h2>Lesson 2: Model Architecture Deep Dive</h2>
        <h3>Transformer Basics</h3>
        <p>DeepSeek is built on the Transformer architecture.</p>
        <ul>
          <li><strong>Self-Attention</strong>: Understands token relationships</li>
          <li><strong>Multi-Head Attention</strong>: Multiple perspectives</li>
          <li><strong>Position Encoding</strong>: Preserves sequence order</li>
        </ul>

        <h3>MoE Architecture</h3>
        <p>DeepSeek-V3 uses Mixture of Experts (MoE):</p>
        <ul>
          <li>🎯 Dynamic Routing: Activates different experts</li>
          <li>⚡ Efficient Inference: Only activates subset</li>
          <li>📈 Model Capacity: 671B total, 37B activated</li>
        </ul>
        
        <pre><code>class MoELayer {
  route(input) {
    const scores = this.router(input);
    const topK = selectTopK(scores, 2);
    return this.experts[topK].forward(input);
  }
}</code></pre>

        <div class="quiz-section">
          <h3>💡 Quiz</h3>
          <div class="question">
            <h4>What is MoE's main advantage?</h4>
            <div class="options">
              <label class="option">
                <input type="radio" name="q2" value="A">
                <span>A. Increases total params</span>
              </label>
              <label class="option">
                <input type="radio" name="q2" value="B">
                <span>B. Only activates subset for efficiency</span>
              </label>
              <label class="option">
                <input type="radio" name="q2" value="C">
                <span>C. Simplifies structure</span>
              </label>
            </div>
            <button class="check-btn" onclick="checkAnswer(2, 'B')">Submit</button>
            <div class="feedback" id="feedback2"></div>
          </div>
        </div>
      `
    }
  },
  3: {
    zh: {
      title: "第3讲：Prompt工程实战",
      content: `
        <h2>第3讲：Prompt工程实战</h2>
        <h3>提示词设计原则</h3>
        <p>高质量提示词的关键要素：</p>
        <ul>
          <li>🎯 明确性：清晰表达需求</li>
          <li>📋 结构化：使用标记和分隔符</li>
          <li>🌟 示例驱动：提供few-shot examples</li>
        </ul>

        <h3>Chain-of-Thought技术</h3>
        <p>让模型展示思考过程，提升复杂任务准确性。</p>

        <div class="quiz-section">
          <h3>💡 测试题</h3>
          <div class="question">
            <h4>Chain-of-Thought技术的作用是什么？</h4>
            <div class="options">
              <label class="option">
                <input type="radio" name="q3" value="A">
                <span>A. 减少token消耗</span>
              </label>
              <label class="option">
                <input type="radio" name="q3" value="B">
                <span>B. 让模型逐步推理，提高准确性</span>
              </label>
              <label class="option">
                <input type="radio" name="q3" value="C">
                <span>C. 加快生成速度</span>
              </label>
            </div>
            <button class="check-btn" onclick="checkAnswer(3, 'B')">提交答案</button>
            <div class="feedback" id="feedback3"></div>
          </div>
        </div>
      `
    },
    en: {
      title: "Lesson 3: Prompt Engineering",
      content: `
        <h2>Lesson 3: Prompt Engineering Practice</h2>
        <h3>Prompt Design Principles</h3>
        <p>Key elements of quality prompts:</p>
        <ul>
          <li>🎯 Clarity: Express needs clearly</li>
          <li>📋 Structure: Use markers and delimiters</li>
          <li>🌟 Example-Driven: Provide few-shot examples</li>
        </ul>

        <h3>Chain-of-Thought</h3>
        <p>Show reasoning process to improve accuracy.</p>

        <div class="quiz-section">
          <h3>💡 Quiz</h3>
          <div class="question">
            <h4>What does Chain-of-Thought do?</h4>
            <div class="options">
              <label class="option">
                <input type="radio" name="q3" value="A">
                <span>A. Reduces token usage</span>
              </label>
              <label class="option">
                <input type="radio" name="q3" value="B">
                <span>B. Enables step-by-step reasoning for accuracy</span>
              </label>
              <label class="option">
                <input type="radio" name="q3" value="C">
                <span>C. Speeds up generation</span>
              </label>
            </div>
            <button class="check-btn" onclick="checkAnswer(3, 'B')">Submit</button>
            <div class="feedback" id="feedback3"></div>
          </div>
        </div>
      `
    }
  },
  4: {
    zh: {
      title: "第4讲：API调用实战",
      content: `
        <h2>第4讲：API调用实战</h2>
        <h3>快速开始</h3>
        <p>使用DeepSeek API的基本步骤：</p>
        <ol>
          <li>获取API密钥</li>
          <li>发送HTTP请求</li>
          <li>处理响应结果</li>
        </ol>

        <h3>参数优化</h3>
        <p>关键参数说明：temperature, max_tokens, top_p等。</p>

        <div class="quiz-section">
          <h3>💡 测试题</h3>
          <div class="question">
            <h4>temperature参数设为0.1时适合什么场景？</h4>
            <div class="options">
              <label class="option">
                <input type="radio" name="q4" value="A">
                <span>A. 创意写作</span>
              </label>
              <label class="option">
                <input type="radio" name="q4" value="B">
                <span>B. 事实查询和确定性回答</span>
              </label>
              <label class="option">
                <input type="radio" name="q4" value="C">
                <span>C. 随机生成</span>
              </label>
            </div>
            <button class="check-btn" onclick="checkAnswer(4, 'B')">提交答案</button>
            <div class="feedback" id="feedback4"></div>
          </div>
        </div>
      `
    },
    en: {
      title: "Lesson 4: API Usage",
      content: `
        <h2>Lesson 4: API Usage in Practice</h2>
        <h3>Quick Start</h3>
        <p>Basic steps to use DeepSeek API:</p>
        <ol>
          <li>Get API key</li>
          <li>Send HTTP request</li>
          <li>Handle response</li>
        </ol>

        <h3>Parameter Optimization</h3>
        <p>Key parameters: temperature, max_tokens, top_p, etc.</p>

        <div class="quiz-section">
          <h3>💡 Quiz</h3>
          <div class="question">
            <h4>What scenario suits temperature=0.1?</h4>
            <div class="options">
              <label class="option">
                <input type="radio" name="q4" value="A">
                <span>A. Creative writing</span>
              </label>
              <label class="option">
                <input type="radio" name="q4" value="B">
                <span>B. Factual queries requiring deterministic answers</span>
              </label>
              <label class="option">
                <input type="radio" name="q4" value="C">
                <span>C. Random generation</span>
              </label>
            </div>
            <button class="check-btn" onclick="checkAnswer(4, 'B')">Submit</button>
            <div class="feedback" id="feedback4"></div>
          </div>
        </div>
      `
    }
  },
  5: {
    zh: {
      title: "第5讲：模型微调技术",
      content: `
        <h2>第5讲：模型微调技术</h2>
        <h3>什么时候需要微调？</h3>
        <p>考虑微调的场景：领域专业化、风格定制、数据隐私等。</p>

        <h3>LoRA微调</h3>
        <p>LoRA只训练0.1-1%参数，大幅降低成本。</p>

        <div class="quiz-section">
          <h3>💡 测试题</h3>
          <div class="question">
            <h4>LoRA微调的主要优势是什么？</h4>
            <div class="options">
              <label class="option">
                <input type="radio" name="q5" value="A">
                <span>A. 训练速度最快</span>
              </label>
              <label class="option">
                <input type="radio" name="q5" value="B">
                <span>B. 只训练少量参数，降低成本</span>
              </label>
              <label class="option">
                <input type="radio" name="q5" value="C">
                <span>C. 效果最好</span>
              </label>
            </div>
            <button class="check-btn" onclick="checkAnswer(5, 'B')">提交答案</button>
            <div class="feedback" id="feedback5"></div>
          </div>
        </div>
      `
    },
    en: {
      title: "Lesson 5: Fine-tuning",
      content: `
        <h2>Lesson 5: Model Fine-tuning</h2>
        <h3>When to Fine-tune?</h3>
        <p>Consider fine-tuning for: domain specialization, style customization, data privacy.</p>

        <h3>LoRA Fine-tuning</h3>
        <p>LoRA trains only 0.1-1% of parameters, reducing costs.</p>

        <div class="quiz-section">
          <h3>💡 Quiz</h3>
          <div class="question">
            <h4>What's LoRA's main advantage?</h4>
            <div class="options">
              <label class="option">
                <input type="radio" name="q5" value="A">
                <span>A. Fastest training</span>
              </label>
              <label class="option">
                <input type="radio" name="q5" value="B">
                <span>B. Trains only small subset, reducing cost</span>
              </label>
              <label class="option">
                <input type="radio" name="q5" value="C">
                <span>C. Best results</span>
              </label>
            </div>
            <button class="check-btn" onclick="checkAnswer(5, 'B')">Submit</button>
            <div class="feedback" id="feedback5"></div>
          </div>
        </div>
      `
    }
  },
  6: {
    zh: {
      title: "第6讲：RAG检索增强生成",
      content: `
        <h2>第6讲：RAG检索增强生成</h2>
        <h3>RAG是什么？</h3>
        <p>RAG结合检索和生成，实时更新知识无需重新训练。</p>

        <h3>向量数据库</h3>
        <p>常用选择：Pinecone, Weaviate, Milvus, Chroma。</p>

        <div class="quiz-section">
          <h3>💡 测试题</h3>
          <div class="question">
            <h4>RAG相比微调的主要优势是什么？</h4>
            <div class="options">
              <label class="option">
                <input type="radio" name="q6" value="A">
                <span>A. 训练速度更快</span>
              </label>
              <label class="option">
                <input type="radio" name="q6" value="B">
                <span>B. 可实时更新知识，无需重新训练</span>
              </label>
              <label class="option">
                <input type="radio" name="q6" value="C">
                <span>C. 生成质量更高</span>
              </label>
            </div>
            <button class="check-btn" onclick="checkAnswer(6, 'B')">提交答案</button>
            <div class="feedback" id="feedback6"></div>
          </div>
        </div>
      `
    },
    en: {
      title: "Lesson 6: RAG Systems",
      content: `
        <h2>Lesson 6: RAG Systems</h2>
        <h3>What is RAG?</h3>
        <p>RAG combines retrieval and generation, updating knowledge without retraining.</p>

        <h3>Vector Databases</h3>
        <p>Popular choices: Pinecone, Weaviate, Milvus, Chroma.</p>

        <div class="quiz-section">
          <h3>💡 Quiz</h3>
          <div class="question">
            <h4>What's RAG's main advantage vs fine-tuning?</h4>
            <div class="options">
              <label class="option">
                <input type="radio" name="q6" value="A">
                <span>A. Faster training</span>
              </label>
              <label class="option">
                <input type="radio" name="q6" value="B">
                <span>B. Dynamic knowledge updates without retraining</span>
              </label>
              <label class="option">
                <input type="radio" name="q6" value="C">
                <span>C. Higher quality</span>
              </label>
            </div>
            <button class="check-btn" onclick="checkAnswer(6, 'B')">Submit</button>
            <div class="feedback" id="feedback6"></div>
          </div>
        </div>
      `
    }
  },
  7: {
    zh: {
      title: "第7讲：多模态能力探索",
      content: `
        <h2>第7讲：多模态能力探索</h2>
        <h3>文本+图像理解</h3>
        <p>DeepSeek支持图像描述、OCR文字识别、图表分析等。</p>

        <h3>最佳实践</h3>
        <p>图片清晰度至少720p，文件大小控制在5MB以内。</p>

        <div class="quiz-section">
          <h3>💡 测试题</h3>
          <div class="question">
            <h4>推荐的图片分辨率是？</h4>
            <div class="options">
              <label class="option">
                <input type="radio" name="q7" value="A">
                <span>A. 480p足够</span>
              </label>
              <label class="option">
                <input type="radio" name="q7" value="B">
                <span>B. 至少720p</span>
              </label>
              <label class="option">
                <input type="radio" name="q7" value="C">
                <span>C. 必须4K</span>
              </label>
            </div>
            <button class="check-btn" onclick="checkAnswer(7, 'B')">提交答案</button>
            <div class="feedback" id="feedback7"></div>
          </div>
        </div>
      `
    },
    en: {
      title: "Lesson 7: Multi-modal",
      content: `
        <h2>Lesson 7: Multi-modal Capabilities</h2>
        <h3>Text + Image Understanding</h3>
        <p>DeepSeek supports image captioning, OCR, chart analysis, etc.</p>

        <h3>Best Practices</h3>
        <p>Image clarity at least 720p, file size under 5MB.</p>

        <div class="quiz-section">
          <h3>💡 Quiz</h3>
          <div class="question">
            <h4>Recommended resolution?</h4>
            <div class="options">
              <label class="option">
                <input type="radio" name="q7" value="A">
                <span>A. 480p is enough</span>
              </label>
              <label class="option">
                <input type="radio" name="q7" value="B">
                <span>B. At least 720p</span>
              </label>
              <label class="option">
                <input type="radio" name="q7" value="C">
                <span>C. Must be 4K</span>
              </label>
            </div>
            <button class="check-btn" onclick="checkAnswer(7, 'B')">Submit</button>
            <div class="feedback" id="feedback7"></div>
          </div>
        </div>
      `
    }
  },
  8: {
    zh: {
      title: "第8讲：生产环境部署",
      content: `
        <h2>第8讲：生产环境部署</h2>
        <h3>性能优化策略</h3>
        <p>流式响应、请求缓存、批处理等优化方法。</p>

        <h3>监控和日志</h3>
        <p>性能指标：响应时间（P50, P95, P99）、日志记录、告警设置。</p>

        <div class="quiz-section">
          <h3>💡 测试题</h3>
          <div class="question">
            <h4>哪个指标最能反映用户体验？</h4>
            <div class="options">
              <label class="option">
                <input type="radio" name="q8" value="A">
                <span>A. 平均响应时间</span>
              </label>
              <label class="option">
                <input type="radio" name="q8" value="B">
                <span>B. P95响应时间</span>
              </label>
              <label class="option">
                <input type="radio" name="q8" value="C">
                <span>C. 总请求数</span>
              </label>
            </div>
            <button class="check-btn" onclick="checkAnswer(8, 'B')">提交答案</button>
            <div class="feedback" id="feedback8"></div>
          </div>
        </div>
      `
    },
    en: {
      title: "Lesson 8: Production Deployment",
      content: `
        <h2>Lesson 8: Production Deployment</h2>
        <h3>Performance Optimization</h3>
        <p>Streaming, caching, batching, and other optimization methods.</p>

        <h3>Monitoring & Logging</h3>
        <p>Metrics: Response time (P50, P95, P99), logging, alerts.</p>

        <div class="quiz-section">
          <h3>💡 Quiz</h3>
          <div class="question">
            <h4>Which metric best reflects UX?</h4>
            <div class="options">
              <label class="option">
                <input type="radio" name="q8" value="A">
                <span>A. Average response time</span>
              </label>
              <label class="option">
                <input type="radio" name="q8" value="B">
                <span>B. P95 response time</span>
              </label>
              <label class="option">
                <input type="radio" name="q8" value="C">
                <span>C. Total requests</span>
              </label>
            </div>
            <button class="check-btn" onclick="checkAnswer(8, 'B')">Submit</button>
            <div class="feedback" id="feedback8"></div>
          </div>
        </div>
      `
    }
  }
};

// 初始化应用
function init() {
  console.log('DeepSeek Academy initializing...');
  showLesson(1);
  initSpeechRecognition();
}

// 设置语言
function setLanguage(lang) {
  currentLanguage = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  showLesson(currentLesson);
}

// 显示课程 - 这个函数必须是全局的，因为HTML中的onclick会调用它
function showLesson(lessonNum) {
  currentLesson = lessonNum;
  
  // 更新标签状态
  document.querySelectorAll('.tab-btn').forEach((btn, index) => {
    btn.classList.toggle('active', index + 1 === lessonNum);
  });
  
  // 获取语言
  let lang = currentLanguage;
  if (lang === 'auto') {
    lang = detectedLanguage;
  }
  
  // 渲染内容
  const lesson = lessons[lessonNum][lang];
  if (lesson) {
    document.getElementById('lesson-content').innerHTML = 
      '<div class="lesson">' + lesson.content + '</div>';
  }
}

// 检查答案 - 必须是全局函数
function checkAnswer(questionNum, correctAnswer) {
  const selected = document.querySelector('input[name="q' + questionNum + '"]:checked');
  const feedback = document.getElementById('feedback' + questionNum);
  
  if (!selected) {
    feedback.className = 'feedback wrong';
    feedback.textContent = currentLanguage === 'zh' || detectedLanguage === 'zh' 
      ? '请先选择一个答案' 
      : 'Please select an answer';
    return;
  }
  
  const isCorrect = selected.value === correctAnswer;
  feedback.className = 'feedback ' + (isCorrect ? 'correct' : 'wrong');
  
  if (isCorrect) {
    feedback.textContent = currentLanguage === 'zh' || detectedLanguage === 'zh'
      ? '✅ 正确！' 
      : '✅ Correct!';
  } else {
    feedback.textContent = currentLanguage === 'zh' || detectedLanguage === 'zh'
      ? '❌ 错误。正确答案是 ' + correctAnswer
      : '❌ Wrong. Correct answer is ' + correctAnswer;
  }
  
  // 标记选项
  document.querySelectorAll('input[name="q' + questionNum + '"]').forEach(input => {
    const option = input.closest('.option');
    option.classList.remove('correct', 'wrong');
    if (input.value === correctAnswer) {
      option.classList.add('correct');
    } else if (input.checked) {
      option.classList.add('wrong');
    }
  });
}

// AI助手功能 - 必须是全局函数
function toggleAI() {
  document.getElementById('aiPanel').classList.toggle('active');
}

// 语音识别初始化
function initSpeechRecognition() {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      document.getElementById('userInput').value = transcript;
      stopRecording();
    };
    
    recognition.onerror = function() {
      stopRecording();
    };
    
    recognition.onend = function() {
      stopRecording();
    };
    
    console.log('Speech recognition initialized');
  }
}

// 切换语音输入 - 必须是全局函数
function toggleVoice() {
  if (!recognition) {
    alert('Your browser does not support speech recognition');
    return;
  }
  
  if (isRecording) {
    recognition.stop();
  } else {
    const lang = currentLanguage === 'zh' ? 'zh-CN' : 
                 currentLanguage === 'en' ? 'en-US' : 
                 detectedLanguage === 'zh' ? 'zh-CN' : 'en-US';
    recognition.lang = lang;
    recognition.start();
    isRecording = true;
    document.getElementById('voiceBtn').classList.add('recording');
    document.getElementById('voiceBtn').textContent = '⏹️';
  }
}

function stopRecording() {
  isRecording = false;
  document.getElementById('voiceBtn').classList.remove('recording');
  document.getElementById('voiceBtn').textContent = '🎤';
}

// 发送消息到AI - 必须是全局函数
async function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  
  if (!message) {
    alert(detectedLanguage === 'zh' ? '请输入问题' : 'Please enter your question');
    return;
  }
  
  const hasChinese = /[\u4e00-\u9fa5]/.test(message);
  const messageLanguage = hasChinese ? 'zh' : 'en';
  detectedLanguage = messageLanguage;
  
  const responseDiv = document.getElementById('aiResponse');
  const thinkingText = messageLanguage === 'zh' ? '🤔 思考中...' : '🤔 Thinking...';
  responseDiv.innerHTML = '<div style="color: var(--highlight)">' + thinkingText + '</div>';
  document.getElementById('ttsBtn').style.display = 'none';
  
  const sendBtn = document.querySelector('.send-btn');
  const voiceBtn = document.getElementById('voiceBtn');
  sendBtn.disabled = true;
  voiceBtn.disabled = true;
  
  try {
    const timeoutMs = messageLanguage === 'zh' ? 60000 : 30000;
    const controller = new AbortController();
    const timeoutId = setTimeout(function() { controller.abort(); }, timeoutMs);
    
    const response = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ message: message }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = {};
      }
      throw new Error(errorData.reply || 'Server error ' + response.status);
    }
    
    const data = await response.json();
    
    if (data.language) {
      detectedLanguage = data.language;
    }
    
    currentResponse = data.reply || (messageLanguage === 'zh' 
      ? '抱歉，我暂时无法回答这个问题。' 
      : 'Sorry, I cannot answer this question.');
    
    responseDiv.innerHTML = '<div style="white-space: pre-wrap; line-height: 1.6;">' + currentResponse + '</div>';
    
    if (!data.error) {
      document.getElementById('ttsBtn').style.display = 'block';
    }
    
  } catch (error) {
    console.error('AI request failed:', error);
    
    let errorHtml;
    if (error.name === 'AbortError') {
      errorHtml = messageLanguage === 'zh'
        ? '<div style="color: var(--warning);">⏱️ 请求超时。请简化问题或稍后重试。</div>'
        : '<div style="color: var(--warning);">⏱️ Request timeout. Please simplify your question or try later.</div>';
    } else {
      errorHtml = messageLanguage === 'zh'
        ? '<div style="color: var(--warning);">❌ 请求失败。请刷新页面或稍后重试。</div>'
        : '<div style="color: var(--warning);">❌ Request failed. Please refresh or try later.</div>';
    }
    
    responseDiv.innerHTML = errorHtml;
  } finally {
    sendBtn.disabled = false;
    voiceBtn.disabled = false;
    input.value = '';
  }
}

// TTS朗读 - 必须是全局函数
function speakResponse() {
  if (!currentResponse) return;
  
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    
    const cleanText = currentResponse
      .replace(/[*_#`~\[\]]/g, '')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/<[^>]*>/g, '')
      .replace(/[-–—•·(){}\[\]]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (!cleanText) {
      alert(detectedLanguage === 'zh' ? '没有可朗读的文本' : 'No text to read');
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = detectedLanguage === 'zh' ? 'zh-CN' : 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    window.speechSynthesis.speak(utterance);
  } else {
    alert(detectedLanguage === 'zh' 
      ? '您的浏览器不支持语音朗读' 
      : 'Your browser does not support TTS');
  }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
  init();
  document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
});
