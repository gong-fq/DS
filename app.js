// 全局变量
let currentLang = 'auto';
let currentLesson = 1;
let recognition = null;
let synthesis = window.speechSynthesis;
let selectedAnswer = -1;

// 课程内容数据
const lessons = {
    1: {
        zh: {
            title: "第1讲：认识DeepSeek",
            sections: [
                {
                    title: "什么是DeepSeek？",
                    content: "<p>DeepSeek是由深度求索（DeepSeek）公司开发的大语言模型系列，以其高性能和开源特性在AI领域崭露头角。</p><p><strong>核心特点：</strong></p><ul><li>🚀 <strong>高性能</strong>：在多项基准测试中表现优异</li><li>🔓 <strong>开源开放</strong>：提供模型权重和技术细节</li><li>💰 <strong>经济实惠</strong>：API调用成本低于主流竞品</li><li>🌍 <strong>中英双语</strong>：对中文有出色的理解和生成能力</li></ul>"
                },
                {
                    title: "DeepSeek模型家族",
                    content: "<p>DeepSeek目前有多个版本，适用于不同场景：</p><ul><li><strong>DeepSeek-V3</strong>：最新旗舰模型，671B参数，MoE架构</li><li><strong>DeepSeek-V2</strong>：高效版本，平衡性能与成本</li><li><strong>DeepSeek-Coder</strong>：专注代码生成和理解</li><li><strong>DeepSeek-Math</strong>：数学推理专用模型</li></ul><pre><code>const models = {\n  chat: \"deepseek-chat\",\n  coder: \"deepseek-coder\",\n  reasoner: \"deepseek-reasoner\"\n};</code></pre>"
                },
                {
                    title: "为什么学习DeepSeek？",
                    content: "<p>学习DeepSeek的理由：</p><ol><li><strong>技术前沿</strong>：了解最新的AI架构和优化技术</li><li><strong>实用性强</strong>：可直接应用于生产环境</li><li><strong>成本优势</strong>：降低AI应用的运营成本</li><li><strong>开源生态</strong>：参与社区，贡献代码</li><li><strong>本地化优势</strong>：更好地服务中文用户</li></ol>"
                }
            ],
            quiz: {
                question: "DeepSeek-V3使用了什么架构？",
                options: ["Transformer", "MoE (Mixture of Experts)", "CNN", "RNN"],
                correct: 1,
                explanation: "DeepSeek-V3采用MoE架构，通过专家混合提升效率和性能。"
            }
        },
        en: {
            title: "Lesson 1: Introduction to DeepSeek",
            sections: [
                {
                    title: "What is DeepSeek?",
                    content: "<p>DeepSeek is a series of large language models developed by DeepSeek, distinguished by high performance and open-source nature.</p><p><strong>Core Features:</strong></p><ul><li>🚀 <strong>High Performance</strong>: Excellent results on multiple benchmarks</li><li>🔓 <strong>Open Source</strong>: Model weights and technical details available</li><li>💰 <strong>Cost-Effective</strong>: Lower API costs than major competitors</li><li>🌍 <strong>Bilingual</strong>: Strong Chinese and English capabilities</li></ul>"
                },
                {
                    title: "DeepSeek Model Family",
                    content: "<p>DeepSeek offers multiple versions for different scenarios:</p><ul><li><strong>DeepSeek-V3</strong>: Latest flagship, 671B params, MoE architecture</li><li><strong>DeepSeek-V2</strong>: Efficient version, balanced performance</li><li><strong>DeepSeek-Coder</strong>: Specialized for code generation</li><li><strong>DeepSeek-Math</strong>: Mathematical reasoning focus</li></ul><pre><code>const models = {\n  chat: \"deepseek-chat\",\n  coder: \"deepseek-coder\",\n  reasoner: \"deepseek-reasoner\"\n};</code></pre>"
                },
                {
                    title: "Why Learn DeepSeek?",
                    content: "<p>Reasons to learn DeepSeek:</p><ol><li><strong>Cutting-Edge Tech</strong>: Latest AI architecture and optimization</li><li><strong>Practical</strong>: Ready for production deployment</li><li><strong>Cost Advantage</strong>: Reduce AI operation costs</li><li><strong>Open Ecosystem</strong>: Join community, contribute code</li><li><strong>Localization</strong>: Better serve Chinese users</li></ol>"
                }
            ],
            quiz: {
                question: "What architecture does DeepSeek-V3 use?",
                options: ["Transformer", "MoE (Mixture of Experts)", "CNN", "RNN"],
                correct: 1,
                explanation: "DeepSeek-V3 uses MoE architecture to improve efficiency and performance."
            }
        }
    },
    2: {
        zh: {
            title: "第2讲：模型架构深度解析",
            sections: [
                {
                    title: "Transformer基础",
                    content: "<p>DeepSeek基于Transformer架构，这是现代大语言模型的基石。</p><p><strong>核心组件：</strong></p><ul><li><strong>Self-Attention</strong>：让模型理解词之间的关系</li><li><strong>Multi-Head Attention</strong>：从多个角度捕获信息</li><li><strong>Position Encoding</strong>：保留序列顺序信息</li><li><strong>Feed-Forward Network</strong>：增强表示能力</li></ul><pre><code>function attention(Q, K, V) {\n  const scores = matmul(Q, transpose(K));\n  const weights = softmax(scores / sqrt(d_k));\n  return matmul(weights, V);\n}</code></pre>"
                },
                {
                    title: "MoE架构优势",
                    content: "<p>DeepSeek-V3采用Mixture of Experts（MoE）架构：</p><ul><li>🎯 <strong>动态路由</strong>：根据输入激活不同专家</li><li>⚡ <strong>高效推理</strong>：仅激活部分参数</li><li>📈 <strong>模型容量</strong>：671B总参数，实际激活37B</li><li>🔄 <strong>负载均衡</strong>：确保专家利用率均匀</li></ul><pre><code>class MoELayer {\n  route(input) {\n    const scores = this.router(input);\n    const topK = selectTopK(scores, 2);\n    return this.experts[topK].forward(input);\n  }\n}</code></pre>"
                },
                {
                    title: "训练技术创新",
                    content: "<p>DeepSeek的训练技巧：</p><ol><li><strong>Multi-Token Prediction</strong>：预测多个token提升效率</li><li><strong>FP8混合精度</strong>：减少显存占用，加速训练</li><li><strong>Pipeline并行</strong>：跨设备分布式训练</li><li><strong>ZeRO优化</strong>：优化器状态分片</li></ol>"
                }
            ],
            quiz: {
                question: "MoE架构的主要优势是什么？",
                options: ["增加模型参数总量", "只激活部分参数，提高效率", "简化模型结构", "减少训练时间"],
                correct: 1,
                explanation: "MoE通过动态路由只激活部分专家，在保持大容量的同时降低计算成本。"
            }
        },
        en: {
            title: "Lesson 2: Model Architecture Deep Dive",
            sections: [
                {
                    title: "Transformer Basics",
                    content: "<p>DeepSeek is built on the Transformer architecture, foundation of modern LLMs.</p><p><strong>Core Components:</strong></p><ul><li><strong>Self-Attention</strong>: Understands relationships between tokens</li><li><strong>Multi-Head Attention</strong>: Captures info from multiple perspectives</li><li><strong>Position Encoding</strong>: Preserves sequence order</li><li><strong>Feed-Forward Network</strong>: Enhances representation</li></ul><pre><code>function attention(Q, K, V) {\n  const scores = matmul(Q, transpose(K));\n  const weights = softmax(scores / sqrt(d_k));\n  return matmul(weights, V);\n}</code></pre>"
                },
                {
                    title: "MoE Architecture Advantages",
                    content: "<p>DeepSeek-V3 uses Mixture of Experts (MoE):</p><ul><li>🎯 <strong>Dynamic Routing</strong>: Activates different experts per input</li><li>⚡ <strong>Efficient Inference</strong>: Only activates subset of params</li><li>📈 <strong>Model Capacity</strong>: 671B total, 37B activated</li><li>🔄 <strong>Load Balancing</strong>: Ensures even expert utilization</li></ul><pre><code>class MoELayer {\n  route(input) {\n    const scores = this.router(input);\n    const topK = selectTopK(scores, 2);\n    return this.experts[topK].forward(input);\n  }\n}</code></pre>"
                },
                {
                    title: "Training Innovations",
                    content: "<p>DeepSeek's training techniques:</p><ol><li><strong>Multi-Token Prediction</strong>: Predict multiple tokens for efficiency</li><li><strong>FP8 Mixed Precision</strong>: Reduce memory, accelerate training</li><li><strong>Pipeline Parallelism</strong>: Distributed training across devices</li><li><strong>ZeRO Optimization</strong>: Optimizer state sharding</li></ol>"
                }
            ],
            quiz: {
                question: "What is the main advantage of MoE architecture?",
                options: ["Increases total model parameters", "Only activates subset of params for efficiency", "Simplifies model structure", "Reduces training time"],
                correct: 1,
                explanation: "MoE dynamically routes to activate only some experts, maintaining capacity while reducing compute."
            }
        }
    },
    3: {
        zh: {
            title: "第3讲：Prompt工程实战",
            sections: [
                {
                    title: "提示词设计原则",
                    content: "<p>高质量提示词的关键要素：</p><ul><li>🎯 <strong>明确性</strong>：清晰表达你的需求</li><li>📋 <strong>结构化</strong>：使用标记和分隔符</li><li>🌟 <strong>示例驱动</strong>：提供few-shot examples</li><li>🔄 <strong>迭代优化</strong>：不断测试和改进</li></ul><pre><code>// 优秀的提示词结构\nconst prompt = \"角色：Python专家\" + \n  \"\\n任务：审查代码\" + \n  \"\\n代码：\" + userCode;</code></pre>"
                },
                {
                    title: "高级技巧",
                    content: "<p>提升效果的技术：</p><ol><li><strong>Chain-of-Thought</strong>：让模型逐步思考</li><li><strong>Self-Consistency</strong>：多次采样取共识<pre><code>const responses = [];\nfor(let i=0; i<5; i++) {\n  responses.push(await model.generate(prompt));\n}\nconst answer = mostCommon(responses);</code></pre></li><li><strong>Role Playing</strong>：指定专家角色</li></ol>"
                },
                {
                    title: "常见陷阱",
                    content: "<p>避免这些错误：</p><ul><li>❌ 提示词过于模糊</li><li>❌ 没有提供上下文</li><li>❌ 期望超出模型能力</li><li>❌ 忽视输出格式要求</li><li>✅ 测试多个温度参数</li><li>✅ 使用系统提示词</li></ul>"
                }
            ],
            quiz: {
                question: "Chain-of-Thought技术的作用是什么？",
                options: ["减少token消耗", "让模型逐步推理，提高准确性", "加快生成速度", "简化提示词结构"],
                correct: 1,
                explanation: "Chain-of-Thought引导模型展示思考过程，显著提升复杂任务的准确性。"
            }
        },
        en: {
            title: "Lesson 3: Prompt Engineering Practice",
            sections: [
                {
                    title: "Prompt Design Principles",
                    content: "<p>Key elements of quality prompts:</p><ul><li>🎯 <strong>Clarity</strong>: Express needs clearly</li><li>📋 <strong>Structure</strong>: Use markers and delimiters</li><li>🌟 <strong>Example-Driven</strong>: Provide few-shot examples</li><li>🔄 <strong>Iterate</strong>: Test and refine continuously</li></ul><pre><code>// Good prompt structure\nconst prompt = \"Role: Python expert\" + \n  \"\\nTask: Review code\" + \n  \"\\nCode: \" + userCode;</code></pre>"
                },
                {
                    title: "Advanced Techniques",
                    content: "<p>Techniques to boost performance:</p><ol><li><strong>Chain-of-Thought</strong>: Step-by-step reasoning</li><li><strong>Self-Consistency</strong>: Sample multiple times<pre><code>const responses = [];\nfor(let i=0; i<5; i++) {\n  responses.push(await model.generate(prompt));\n}\nconst answer = mostCommon(responses);</code></pre></li><li><strong>Role Playing</strong>: Assign expert roles</li></ol>"
                },
                {
                    title: "Common Pitfalls",
                    content: "<p>Avoid these mistakes:</p><ul><li>❌ Vague prompts</li><li>❌ Missing context</li><li>❌ Unrealistic expectations</li><li>❌ Ignoring output format</li><li>✅ Test different temperatures</li><li>✅ Use system prompts</li></ul>"
                }
            ],
            quiz: {
                question: "What does Chain-of-Thought do?",
                options: ["Reduces token usage", "Enables step-by-step reasoning for accuracy", "Speeds up generation", "Simplifies prompt structure"],
                correct: 1,
                explanation: "Chain-of-Thought guides the model to show reasoning, improving accuracy on complex tasks."
            }
        }
    },
    4: {
        zh: {
            title: "第4讲：API调用实战",
            sections: [
                {
                    title: "快速开始",
                    content: "<p>使用DeepSeek API的基本步骤：</p><ol><li>获取API密钥（访问 platform.deepseek.com）</li><li>安装SDK或使用HTTP请求</li><li>发送请求并处理响应</li></ol><pre><code>// Node.js示例\nconst response = await fetch(\n  \"https://api.deepseek.com/v1/chat/completions\", {\n  method: \"POST\",\n  headers: {\n    \"Authorization\": \"Bearer YOUR_KEY\",\n    \"Content-Type\": \"application/json\"\n  },\n  body: JSON.stringify({\n    model: \"deepseek-chat\",\n    messages: [\n      { role: \"user\", content: \"解释量子计算\" }\n    ]\n  })\n});</code></pre>"
                },
                {
                    title: "参数优化",
                    content: "<p>关键参数说明：</p><ul><li><strong>temperature</strong>：控制创造性（0-2）<ul><li>0.0-0.3：确定性回答</li><li>0.7-1.0：平衡对话</li><li>1.0-2.0：创造性写作</li></ul></li><li><strong>max_tokens</strong>：限制输出长度</li><li><strong>top_p</strong>：核采样控制（0-1）</li><li><strong>frequency_penalty</strong>：减少重复</li></ul><pre><code>const configs = {\n  factual: { temperature: 0.1, top_p: 0.9 },\n  creative: { temperature: 1.2, top_p: 0.95 },\n  balanced: { temperature: 0.7, top_p: 0.9 }\n};</code></pre>"
                },
                {
                    title: "流式响应",
                    content: "<p>实现打字机效果，提升用户体验：</p><pre><code>const response = await fetch(url, {\n  body: JSON.stringify({ stream: true })\n});\n\nconst reader = response.body.getReader();\nwhile (true) {\n  const { done, value } = await reader.read();\n  if (done) break;\n  console.log(new TextDecoder().decode(value));\n}</code></pre>"
                }
            ],
            quiz: {
                question: "temperature参数设为0.1时适合什么场景？",
                options: ["创意写作", "事实查询和确定性回答", "随机生成", "情感对话"],
                correct: 1,
                explanation: "低temperature（0.1）让模型输出更确定，适合需要准确事实的场景。"
            }
        },
        en: {
            title: "Lesson 4: API Usage in Practice",
            sections: [
                {
                    title: "Quick Start",
                    content: "<p>Basic steps to use DeepSeek API:</p><ol><li>Get API key (visit platform.deepseek.com)</li><li>Install SDK or use HTTP requests</li><li>Send requests and handle responses</li></ol><pre><code>// Node.js example\nconst response = await fetch(\n  \"https://api.deepseek.com/v1/chat/completions\", {\n  method: \"POST\",\n  headers: {\n    \"Authorization\": \"Bearer YOUR_KEY\",\n    \"Content-Type\": \"application/json\"\n  },\n  body: JSON.stringify({\n    model: \"deepseek-chat\",\n    messages: [\n      { role: \"user\", content: \"Explain quantum computing\" }\n    ]\n  })\n});</code></pre>"
                },
                {
                    title: "Parameter Optimization",
                    content: "<p>Key parameters explained:</p><ul><li><strong>temperature</strong>: Controls creativity (0-2)<ul><li>0.0-0.3: Deterministic</li><li>0.7-1.0: Balanced</li><li>1.0-2.0: Creative</li></ul></li><li><strong>max_tokens</strong>: Limits output length</li><li><strong>top_p</strong>: Nucleus sampling (0-1)</li><li><strong>frequency_penalty</strong>: Reduces repetition</li></ul><pre><code>const configs = {\n  factual: { temperature: 0.1, top_p: 0.9 },\n  creative: { temperature: 1.2, top_p: 0.95 },\n  balanced: { temperature: 0.7, top_p: 0.9 }\n};</code></pre>"
                },
                {
                    title: "Streaming Response",
                    content: "<p>Implement typewriter effect for better UX:</p><pre><code>const response = await fetch(url, {\n  body: JSON.stringify({ stream: true })\n});\n\nconst reader = response.body.getReader();\nwhile (true) {\n  const { done, value } = await reader.read();\n  if (done) break;\n  console.log(new TextDecoder().decode(value));\n}</code></pre>"
                }
            ],
            quiz: {
                question: "What scenario suits temperature=0.1?",
                options: ["Creative writing", "Factual queries requiring deterministic answers", "Random generation", "Emotional conversation"],
                correct: 1,
                explanation: "Low temperature (0.1) makes output deterministic, suitable for factual accuracy."
            }
        }
    },
    5: {
        zh: {
            title: "第5讲：模型微调技术",
            sections: [
                {
                    title: "什么时候需要微调？",
                    content: "<p>考虑微调的场景：</p><ul><li>📊 <strong>领域专业化</strong>：医疗、法律、金融等专业领域</li><li>🎨 <strong>风格定制</strong>：特定写作风格或语气</li><li>🔒 <strong>数据隐私</strong>：不能将数据发送到API</li><li>⚡ <strong>性能优化</strong>：降低延迟和成本</li></ul><p><strong>注意：</strong>先尝试Prompt工程，微调是最后手段！</p>"
                },
                {
                    title: "微调方法对比",
                    content: "<p>主流微调技术：</p><ul><li><strong>Full Fine-tuning</strong>：训练全部参数，效果最佳但成本高</li><li><strong>LoRA</strong>：只训练0.1-1%参数，推荐方案</li><li><strong>Adapter</strong>：训练1-5%参数，快速实验</li></ul><pre><code>// LoRA配置示例\nconst lora_config = {\n  r: 8,\n  lora_alpha: 32,\n  target_modules: [\"q_proj\", \"v_proj\"],\n  lora_dropout: 0.1\n};</code></pre>"
                },
                {
                    title: "数据准备",
                    content: "<p>高质量训练数据的关键：</p><ol><li><strong>格式统一</strong>：使用JSONL格式</li><li><strong>数量要求</strong>：至少100条高质量样本</li><li><strong>质量>数量</strong>：人工审核，确保准确性</li><li><strong>多样性</strong>：覆盖不同场景和问题类型</li></ol><pre><code>// 数据格式示例\n{\"messages\": [\n  {\"role\": \"system\", \"content\": \"你是医疗助手\"},\n  {\"role\": \"user\", \"content\": \"什么是高血压？\"},\n  {\"role\": \"assistant\", \"content\": \"高血压是...\"}\n]}</code></pre>"
                }
            ],
            quiz: {
                question: "LoRA微调的主要优势是什么？",
                options: ["训练速度最快", "只训练少量参数，降低成本", "效果最好", "不需要训练数据"],
                correct: 1,
                explanation: "LoRA只训练0.1-1%的参数，大幅降低显存和计算成本，同时保持优秀效果。"
            }
        },
        en: {
            title: "Lesson 5: Model Fine-tuning Techniques",
            sections: [
                {
                    title: "When to Fine-tune?",
                    content: "<p>Consider fine-tuning when:</p><ul><li>📊 <strong>Domain Specialization</strong>: Medical, legal, finance domains</li><li>🎨 <strong>Style Customization</strong>: Specific writing style or tone</li><li>🔒 <strong>Data Privacy</strong>: Cannot send data to API</li><li>⚡ <strong>Performance</strong>: Reduce latency and costs</li></ul><p><strong>Note:</strong> Try prompt engineering first - fine-tuning is last resort!</p>"
                },
                {
                    title: "Fine-tuning Methods Comparison",
                    content: "<p>Popular fine-tuning techniques:</p><ul><li><strong>Full Fine-tuning</strong>: Train all params, best quality but costly</li><li><strong>LoRA</strong>: Train 0.1-1% params, recommended</li><li><strong>Adapter</strong>: Train 1-5% params, quick experiments</li></ul><pre><code>// LoRA configuration\nconst lora_config = {\n  r: 8,\n  lora_alpha: 32,\n  target_modules: [\"q_proj\", \"v_proj\"],\n  lora_dropout: 0.1\n};</code></pre>"
                },
                {
                    title: "Data Preparation",
                    content: "<p>Keys to quality training data:</p><ol><li><strong>Unified Format</strong>: Use JSONL format</li><li><strong>Quantity</strong>: At least 100 quality samples</li><li><strong>Quality > Quantity</strong>: Manual review for accuracy</li><li><strong>Diversity</strong>: Cover different scenarios and question types</li></ol><pre><code>// Data format example\n{\"messages\": [\n  {\"role\": \"system\", \"content\": \"You are a medical assistant\"},\n  {\"role\": \"user\", \"content\": \"What is hypertension?\"},\n  {\"role\": \"assistant\", \"content\": \"Hypertension is...\"}\n]}</code></pre>"
                }
            ],
            quiz: {
                question: "What's the main advantage of LoRA?",
                options: ["Fastest training", "Trains only small subset of params, reducing cost", "Best results", "No training data needed"],
                correct: 1,
                explanation: "LoRA trains only 0.1-1% of parameters, drastically reducing memory and compute while maintaining quality."
            }
        }
    },
    6: {
        zh: {
            title: "第6讲：RAG检索增强生成",
            sections: [
                {
                    title: "RAG是什么？",
                    content: "<p>Retrieval-Augmented Generation（RAG）结合了检索和生成：</p><ul><li>🔍 <strong>检索</strong>：从知识库中找到相关文档</li><li>✍️ <strong>生成</strong>：基于检索结果生成答案</li><li>📚 实时更新知识，无需重新训练</li><li>🎯 减少幻觉，提供事实依据</li><li>💰 成本低于微调</li><li>🔗 可追溯信息来源</li></ul><pre><code>// RAG流程\nasync function RAG(question) {\n  const docs = await vectorDB.search(question, 5);\n  const ctx = docs.map(d => d.content).join(\" \");\n  return await deepseek.generate(ctx + question);\n}</code></pre>"
                },
                {
                    title: "向量数据库选择",
                    content: "<p>常用向量数据库对比：</p><ul><li><strong>Pinecone</strong>：云托管，简单易用</li><li><strong>Weaviate</strong>：开源，功能丰富</li><li><strong>Milvus</strong>：高性能，适合大规模</li><li><strong>Chroma</strong>：轻量级，适合原型开发</li></ul><pre><code>// Chroma使用示例\nimport { ChromaClient } from 'chromadb';\n\nconst client = new ChromaClient();\nconst collection = await client.createCollection({\n  name: \"knowledge_base\"\n});\n\nawait collection.add({\n  ids: [\"doc1\", \"doc2\"],\n  documents: [\"DeepSeek是...\", \"RAG技术...\"]\n});</code></pre>"
                },
                {
                    title: "优化技巧",
                    content: "<p>提升RAG效果的方法：</p><ol><li><strong>文档分块</strong>：合理切分，保持语义完整</li><li><strong>重排序</strong>：使用Reranker提升相关性</li><li><strong>混合检索</strong>：结合关键词和向量搜索</li><li><strong>元数据过滤</strong>：按时间、来源等筛选</li></ol><pre><code>// 文档分块示例\nfunction chunkDocument(text, size=500, overlap=50) {\n  const chunks = [];\n  for(let i=0; i < text.length; i += size - overlap) {\n    chunks.push(text.slice(i, i + size));\n  }\n  return chunks;\n}</code></pre>"
                }
            ],
            quiz: {
                question: "RAG相比直接微调的主要优势是什么？",
                options: ["训练速度更快", "可实时更新知识，无需重新训练", "生成质量更高", "不需要GPU"],
                correct: 1,
                explanation: "RAG最大优势是知识可动态更新，只需更新向量库，无需重新训练模型。"
            }
        },
        en: {
            title: "Lesson 6: RAG - Retrieval Augmented Generation",
            sections: [
                {
                    title: "What is RAG?",
                    content: "<p>Retrieval-Augmented Generation combines retrieval and generation:</p><ul><li>🔍 <strong>Retrieve</strong>: Find relevant docs from knowledge base</li><li>✍️ <strong>Generate</strong>: Create answers based on retrieved context</li><li>📚 Update knowledge without retraining</li><li>🎯 Reduce hallucinations with factual grounding</li><li>💰 Lower cost than fine-tuning</li><li>🔗 Traceable information sources</li></ul><pre><code>// RAG workflow\nasync function RAG(question) {\n  const docs = await vectorDB.search(question, 5);\n  const ctx = docs.map(d => d.content).join(\" \");\n  return await deepseek.generate(ctx + question);\n}</code></pre>"
                },
                {
                    title: "Vector Database Selection",
                    content: "<p>Popular vector databases:</p><ul><li><strong>Pinecone</strong>: Cloud-hosted, easy to use</li><li><strong>Weaviate</strong>: Open-source, feature-rich</li><li><strong>Milvus</strong>: High-performance, large-scale</li><li><strong>Milvus</strong>: High-performance for large scale</li><li><strong>Chroma</strong>: Lightweight, great for prototyping</li></ul><pre><code>// Chroma example\nimport { ChromaClient } from 'chromadb';\n\nconst client = new ChromaClient();\nconst collection = await client.createCollection({\n  name: \"knowledge_base\"\n});\n\nawait collection.add({\n  ids: [\"doc1\", \"doc2\"],\n  documents: [\"DeepSeek is...\", \"RAG tech...\"]\n});</code></pre>"
                },
                {
                    title: "Optimization Tips",
                    content: "<p>Improve RAG performance:</p><ol><li><strong>Document Chunking</strong>: Split wisely, preserve semantics</li><li><strong>Reranking</strong>: Use Reranker for better relevance</li><li><strong>Hybrid Search</strong>: Combine keyword and vector search</li><li><strong>Metadata Filtering</strong>: Filter by time, source, etc.</li></ol><pre><code>// Document chunking example\nfunction chunkDocument(text, size=500, overlap=50) {\n  const chunks = [];\n  for(let i=0; i < text.length; i += size - overlap) {\n    chunks.push(text.slice(i, i + size));\n  }\n  return chunks;\n}</code></pre>"
                }
            ],
            quiz: {
                question: "What's RAG's main advantage over fine-tuning?",
                options: ["Faster training", "Dynamic knowledge updates without retraining", "Higher generation quality", "No GPU needed"],
                correct: 1,
                explanation: "RAG's key benefit is dynamic knowledge - just update the vector DB, no model retraining needed."
            }
        }
    },
    7: {
        zh: {
            title: "第7讲：多模态能力探索",
            sections: [
                {
                    title: "文本+图像理解",
                    content: "<p>DeepSeek支持视觉理解能力：</p><ul><li>📷 <strong>图像描述</strong>：自动生成详细说明</li><li>🔍 <strong>OCR文字识别</strong>：提取图片中的文字</li><li>📊 <strong>图表分析</strong>：理解数据可视化</li><li>🎨 <strong>视觉问答</strong>：基于图像回答问题</li></ul><pre><code>// 图像理解示例\nconst response = await fetch(\n  \"https://api.deepseek.com/v1/chat/completions\", {\n  method: \"POST\",\n  body: JSON.stringify({\n    model: \"deepseek-chat\",\n    messages: [{\n      role: \"user\",\n      content: [\n        { type: \"text\", text: \"描述这张图片\" },\n        { type: \"image_url\", \n          image_url: { url: \"data:image/jpeg;base64,...\" }\n        }\n      ]\n    }]\n  })\n});</code></pre>"
                },
                {
                    title: "实用场景",
                    content: "<p>多模态应用案例：</p><ul><li><strong>文档处理</strong>：扫描件识别和提取、表格数据转换、手写笔记数字化</li><li><strong>电商分析</strong>：商品图片描述生成、质量检测、相似商品推荐</li><li><strong>教育辅助</strong>：数学题目识别和解答、图表讲解、学习资料整理</li></ul>"
                },
                {
                    title: "最佳实践",
                    content: "<p>优化图像处理效果：</p><ul><li>✅ 图片清晰度：至少720p</li><li>✅ 文件大小：控制在5MB以内</li><li>✅ 格式选择：JPEG/PNG/WebP</li><li>✅ 具体提示：明确你想要什么信息</li><li>❌ 避免模糊、低分辨率图片</li><li>❌ 避免过度压缩导致细节丢失</li></ul><pre><code>// 图片预处理\nasync function preprocessImage(file) {\n  const img = await loadImage(file);\n  if (img.width > 1920) img.resize(1920, null);\n  return img.toBase64('jpeg', 85);\n}</code></pre>"
                }
            ],
            quiz: {
                question: "在使用DeepSeek进行图像分析时，推荐的图片分辨率是？",
                options: ["480p足够", "至少720p", "必须4K", "分辨率不重要"],
                correct: 1,
                explanation: "720p以上分辨率能确保细节清晰，同时控制文件大小，获得最佳效果。"
            }
        },
        en: {
            title: "Lesson 7: Multi-modal Capabilities",
            sections: [
                {
                    title: "Text + Image Understanding",
                    content: "<p>DeepSeek supports vision capabilities:</p><ul><li>📷 <strong>Image Captioning</strong>: Auto-generate detailed descriptions</li><li>🔍 <strong>OCR</strong>: Extract text from images</li><li>📊 <strong>Chart Analysis</strong>: Understand data visualizations</li><li>🎨 <strong>Visual Q&A</strong>: Answer questions about images</li></ul><pre><code>// Image understanding example\nconst response = await fetch(\n  \"https://api.deepseek.com/v1/chat/completions\", {\n  method: \"POST\",\n  body: JSON.stringify({\n    model: \"deepseek-chat\",\n    messages: [{\n      role: \"user\",\n      content: [\n        { type: \"text\", text: \"Describe this image\" },\n        { type: \"image_url\", \n          image_url: { url: \"data:image/jpeg;base64,...\" }\n        }\n      ]\n    }]\n  })\n});</code></pre>"
                },
                {
                    title: "Practical Use Cases",
                    content: "<p>Multi-modal applications:</p><ul><li><strong>Document Processing</strong>: Scan recognition and extraction, table data conversion, handwriting digitization</li><li><strong>E-commerce Analysis</strong>: Product description generation, quality inspection, similar product recommendations</li><li><strong>Education Support</strong>: Math problem recognition and solving, chart explanation, study material organization</li></ul>"
                },
                {
                    title: "Best Practices",
                    content: "<p>Optimize image processing:</p><ul><li>✅ Image clarity: At least 720p</li><li>✅ File size: Under 5MB</li><li>✅ Format: JPEG/PNG/WebP</li><li>✅ Specific prompts: Clearly state what you need</li><li>❌ Avoid blurry, low-res images</li><li>❌ Avoid over-compression losing details</li></ul><pre><code>// Image preprocessing\nasync function preprocessImage(file) {\n  const img = await loadImage(file);\n  if (img.width > 1920) img.resize(1920, null);\n  return img.toBase64('jpeg', 85);\n}</code></pre>"
                }
            ],
            quiz: {
                question: "Recommended image resolution for DeepSeek analysis?",
                options: ["480p is enough", "At least 720p", "Must be 4K", "Resolution doesn't matter"],
                correct: 1,
                explanation: "720p+ ensures clear details while controlling file size for optimal results."
            }
        }
    },
    8: {
        zh: {
            title: "第8讲：生产环境部署",
            sections: [
                {
                    title: "性能优化策略",
                    content: "<p>提升生产环境表现：</p><ul><li>⚡ <strong>流式响应</strong>：改善用户体验</li><li>🔄 <strong>请求缓存</strong>：相同问题直接返回</li><li>📊 <strong>批处理</strong>：合并多个请求</li></ul><pre><code>// 缓存示例\nconst cache = new Map();\nasync function cachedGenerate(prompt) {\n  if (cache.has(prompt)) return cache.get(prompt);\n  const result = await generate(prompt);\n  cache.set(prompt, result);\n  return result;\n}</code></pre>"
                },
                {
                    title: "错误处理和重试",
                    content: "<p>健壮的错误处理机制：</p><pre><code>async function robustGenerate(prompt, maxRetries = 3) {\n  for (let i = 0; i < maxRetries; i++) {\n    try {\n      const response = await fetch(apiUrl, {\n        method: \"POST\",\n        headers: { \"Authorization\": \"Bearer \" + apiKey },\n        body: JSON.stringify({ model: \"deepseek-chat\", \n          messages: [{ role: \"user\", content: prompt }] }),\n        signal: AbortSignal.timeout(30000)\n      });\n      if (!response.ok) {\n        if (response.status === 429) {\n          await sleep(Math.pow(2, i) * 1000);\n          continue;\n        }\n        throw new Error(\"API error: \" + response.status);\n      }\n      return await response.json();\n    } catch (error) {\n      if (i === maxRetries - 1) throw error;\n      await sleep(1000 * (i + 1));\n    }\n  }\n}</code></pre>"
                },
                {
                    title: "监控和日志",
                    content: "<p>生产环境必备监控：</p><ul><li>📈 <strong>性能指标</strong>：响应时间（P50, P95, P99）、Token使用量、错误率、API调用成功率</li><li>🔍 <strong>日志记录</strong>：<pre><code>function logRequest(prompt, response, duration) {\n  console.log({\n    timestamp: new Date().toISOString(),\n    prompt_length: prompt.length,\n    response_length: response.length,\n    duration_ms: duration,\n    tokens_used: response.usage?.total_tokens\n  });\n}</code></pre></li><li>🚨 <strong>告警设置</strong>：错误率 > 5%、P95延迟 > 10秒、每日成本超预算</li></ul>"
                },
                {
                    title: "成本控制",
                    content: "<p>降低运营成本的方法：</p><ol><li><strong>Token优化</strong>：精简提示词</li><li><strong>缓存策略</strong>：减少重复调用</li><li><strong>模型选择</strong>：根据任务选择合适版本</li><li><strong>限流控制</strong>：防止滥用<pre><code>// 简单限流\nconst rateLimiter = new Map();\nfunction checkRateLimit(userId, limit = 100) {\n  const now = Date.now();\n  const userRequests = rateLimiter.get(userId) || [];\n  const recent = userRequests.filter(\n    t => now - t < 3600000);\n  if (recent.length >= limit) {\n    throw new Error(\"Rate limit exceeded\");\n  }\n  recent.push(now);\n  rateLimiter.set(userId, recent);\n}</code></pre></li></ol>"
                }
            ],
            quiz: {
                question: "生产环境中，哪个指标最能反映用户体验？",
                options: ["平均响应时间", "P95响应时间", "总请求数", "Token使用量"],
                correct: 1,
                explanation: "P95响应时间表示95%的请求都在此时间内完成，更能反映大多数用户的真实体验。"
            }
        },
        en: {
            title: "Lesson 8: Production Deployment",
            sections: [
                {
                    title: "Performance Optimization",
                    content: "<p>Boost production performance:</p><ul><li>⚡ <strong>Streaming</strong>: Improve UX</li><li>🔄 <strong>Request Caching</strong>: Return cached for same queries</li><li>📊 <strong>Batching</strong>: Combine multiple requests</li></ul><pre><code>// Caching example\nconst cache = new Map();\nasync function cachedGenerate(prompt) {\n  if (cache.has(prompt)) return cache.get(prompt);\n  const result = await generate(prompt);\n  cache.set(prompt, result);\n  return result;\n}</code></pre>"
                },
                {
                    title: "Error Handling & Retry",
                    content: "<p>Robust error handling:</p><pre><code>async function robustGenerate(prompt, maxRetries = 3) {\n  for (let i = 0; i < maxRetries; i++) {\n    try {\n      const response = await fetch(apiUrl, {\n        method: \"POST\",\n        headers: { \"Authorization\": \"Bearer \" + apiKey },\n        body: JSON.stringify({ model: \"deepseek-chat\", \n          messages: [{ role: \"user\", content: prompt }] }),\n        signal: AbortSignal.timeout(30000)\n      });\n      if (!response.ok) {\n        if (response.status === 429) {\n          await sleep(Math.pow(2, i) * 1000);\n          continue;\n        }\n        throw new Error(\"API error: \" + response.status);\n      }\n      return await response.json();\n    } catch (error) {\n      if (i === maxRetries - 1) throw error;\n      await sleep(1000 * (i + 1));\n    }\n  }\n}</code></pre>"
                },
                {
                    title: "Monitoring & Logging",
                    content: "<p>Essential production monitoring:</p><ul><li>📈 <strong>Performance Metrics</strong>: Response time (P50, P95, P99), Token usage, Error rate, API success rate</li><li>🔍 <strong>Logging</strong>:<pre><code>function logRequest(prompt, response, duration) {\n  console.log({\n    timestamp: new Date().toISOString(),\n    prompt_length: prompt.length,\n    response_length: response.length,\n    duration_ms: duration,\n    tokens_used: response.usage?.total_tokens\n  });\n}</code></pre></li><li>🚨 <strong>Alerts</strong>: Error rate > 5%, P95 latency > 10s, Daily cost exceeds budget</li></ul>"
                },
                {
                    title: "Cost Control",
                    content: "<p>Methods to reduce costs:</p><ol><li><strong>Token Optimization</strong>: Streamline prompts</li><li><strong>Caching</strong>: Reduce duplicate calls</li><li><strong>Model Selection</strong>: Choose appropriate version per task</li><li><strong>Rate Limiting</strong>: Prevent abuse<pre><code>// Simple rate limiter\nconst rateLimiter = new Map();\nfunction checkRateLimit(userId, limit = 100) {\n  const now = Date.now();\n  const userRequests = rateLimiter.get(userId) || [];\n  const recent = userRequests.filter(\n    t => now - t < 3600000);\n  if (recent.length >= limit) {\n    throw new Error(\"Rate limit exceeded\");\n  }\n  recent.push(now);\n  rateLimiter.set(userId, recent);\n}</code></pre></li></ol>"
                }
            ],
            quiz: {
                question: "Which metric best reflects user experience?",
                options: ["Average response time", "P95 response time", "Total requests", "Token usage"],
                correct: 1,
                explanation: "P95 response time shows 95% of requests complete within this time, better reflecting real user experience."
            }
        }
    }
};

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    console.log('App initializing...');
    initApp();
});

function initApp() {
    console.log('Init app called');
    
    // 渲染第一课
    renderLesson(1);
    
    // 绑定标签点击
    const tabs = document.querySelectorAll('.tab');
    console.log('Found tabs:', tabs.length);
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const lessonNum = parseInt(tab.dataset.lesson);
            console.log('Tab clicked:', lessonNum);
            switchLesson(lessonNum);
        });
    });
    
    // 绑定语言切换
    const langBtns = document.querySelectorAll('.lang-btn');
    console.log('Found lang buttons:', langBtns.length);
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            console.log('Language button clicked:', lang);
            switchLanguage(lang);
        });
    });
    
    // 初始化语音
    initSpeechRecognition();
    
    // 输入框回车发送
    const userInput = document.getElementById('userInput');
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    console.log('App initialized successfully');
}

function switchLesson(lessonNum) {
    console.log('Switching to lesson:', lessonNum);
    currentLesson = lessonNum;
    selectedAnswer = -1;
    
    // 更新标签状态
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    const activeTab = document.querySelector('[data-lesson="' + lessonNum + '"]');
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // 渲染课程
    renderLesson(lessonNum);
}

function renderLesson(lessonNum) {
    console.log('Rendering lesson:', lessonNum);
    const lang = currentLang === 'auto' ? 'zh' : currentLang;
    console.log('Using language:', lang);
    
    const lesson = lessons[lessonNum][lang];
    if (!lesson) {
        console.error('Lesson not found:', lessonNum, lang);
        return;
    }
    
    const contentDiv = document.getElementById('content');
    if (!contentDiv) {
        console.error('Content div not found');
        return;
    }
    
    let html = '<div class="lesson active">';
    html += '<div class="section"><h2>' + lesson.title + '</h2></div>';
    
    // 添加各个章节
    lesson.sections.forEach(section => {
        html += '<div class="section">';
        html += '<h3>' + section.title + '</h3>';
        html += section.content;
        html += '</div>';
    });
    
    // 添加测试题
    html += '<div class="quiz">';
    html += '<h3>' + (lang === 'zh' ? '💡 测试题' : '💡 Quiz') + '</h3>';
    html += '<p><strong>' + lesson.quiz.question + '</strong></p>';
    
    lesson.quiz.options.forEach((option, index) => {
        html += '<div class="quiz-option" data-index="' + index + '" onclick="selectOption(' + index + ')">';
        html += String.fromCharCode(65 + index) + '. ' + option;
        html += '</div>';
    });
    
    html += '<button class="submit-btn" onclick="checkAnswer()">';
    html += (lang === 'zh' ? '提交答案' : 'Submit Answer');
    html += '</button>';
    html += '<div id="feedback"></div>';
    html += '</div>';
    html += '</div>';
    
    contentDiv.innerHTML = html;
    console.log('Lesson rendered successfully');
}

function selectOption(index) {
    console.log('Option selected:', index);
    selectedAnswer = index;
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    const selected = document.querySelector('[data-index="' + index + '"]');
    if (selected) {
        selected.classList.add('selected');
    }
}

function checkAnswer() {
    console.log('Checking answer:', selectedAnswer);
    const lang = currentLang === 'auto' ? 'zh' : currentLang;
    const lesson = lessons[currentLesson][lang];
    const feedback = document.getElementById('feedback');
    
    if (!feedback) {
        console.error('Feedback div not found');
        return;
    }
    
    if (selectedAnswer === -1) {
        feedback.innerHTML = '<div class="feedback wrong">' +
            (lang === 'zh' ? '请先选择一个答案' : 'Please select an answer') +
            '</div>';
        return;
    }
    
    const isCorrect = selectedAnswer === lesson.quiz.correct;
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach((opt, idx) => {
        if (idx === lesson.quiz.correct) {
            opt.classList.add('correct');
        } else if (idx === selectedAnswer && !isCorrect) {
            opt.classList.add('wrong');
        }
    });
    
    feedback.innerHTML = '<div class="feedback ' + (isCorrect ? 'correct' : 'wrong') + '">' +
        (isCorrect ? 
            (lang === 'zh' ? '✅ 正确！' : '✅ Correct!') : 
            (lang === 'zh' ? '❌ 错误' : '❌ Wrong')) +
        '<br>' + lesson.quiz.explanation +
        '</div>';
}

function switchLanguage(lang) {
    console.log('Switching language to:', lang);
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector('[data-lang="' + lang + '"]');
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    renderLesson(currentLesson);
}

function toggleAI() {
    const panel = document.getElementById('aiPanel');
    if (panel) {
        panel.classList.toggle('active');
    }
}

async function sendMessage() {
    const input = document.getElementById('userInput');
    if (!input) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    console.log('Sending message:', message);
    addMessage(message, 'user');
    input.value = '';
    
    const sendBtn = document.getElementById('sendBtn');
    if (sendBtn) sendBtn.disabled = true;
    
    const messagesDiv = document.getElementById('messages');
    const loadingId = 'loading-' + Date.now();
    if (messagesDiv) {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message assistant';
        loadingDiv.id = loadingId;
        loadingDiv.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
        messagesDiv.appendChild(loadingDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
    
    try {
        const response = await fetch('/.netlify/functions/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });
        
        const data = await response.json();
        
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();
        
        addMessage(data.reply, 'assistant', data.language);
        
    } catch (error) {
        console.error('Error sending message:', error);
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();
        
        const lang = currentLang === 'auto' ? 'zh' : currentLang;
        addMessage(
            lang === 'zh' ? 
            '抱歉，服务暂时不可用。请稍后重试。' : 
            'Sorry, service temporarily unavailable. Please try again later.',
            'assistant'
        );
    } finally {
        if (sendBtn) sendBtn.disabled = false;
    }
}

function addMessage(text, role, lang) {
    const messagesDiv = document.getElementById('messages');
    if (!messagesDiv) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + role;
    
    if (role === 'assistant') {
        const safeText = text.replace(/'/g, "&#39;").replace(/"/g, "&quot;");
        messageDiv.innerHTML = text + 
            '<button class="speak-btn" onclick="speakText(\'' + safeText + '\', \'' + (lang || currentLang) + '\')">🔊</button>';
    } else {
        messageDiv.textContent = text;
    }
    
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function initSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.log('Speech recognition not supported');
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('Speech recognized:', transcript);
        const input = document.getElementById('userInput');
        if (input) input.value = transcript;
        
        const voiceBtn = document.getElementById('voiceBtn');
        if (voiceBtn) voiceBtn.classList.remove('recording');
    };
    
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        const voiceBtn = document.getElementById('voiceBtn');
        if (voiceBtn) voiceBtn.classList.remove('recording');
    };
    
    recognition.onend = () => {
        const voiceBtn = document.getElementById('voiceBtn');
        if (voiceBtn) voiceBtn.classList.remove('recording');
    };
    
    console.log('Speech recognition initialized');
}

function toggleVoice() {
    if (!recognition) {
        alert('Your browser does not support speech recognition');
        return;
    }
    
    const voiceBtn = document.getElementById('voiceBtn');
    if (!voiceBtn) return;
    
    if (voiceBtn.classList.contains('recording')) {
        recognition.stop();
        voiceBtn.classList.remove('recording');
    } else {
        const lang = currentLang === 'auto' ? 'zh-CN' : (currentLang === 'zh' ? 'zh-CN' : 'en-US');
        recognition.lang = lang;
        recognition.start();
        voiceBtn.classList.add('recording');
        console.log('Voice recognition started, language:', lang);
    }
}

function speakText(text, lang) {
    if (!synthesis) return;
    
    synthesis.cancel();
    
    const cleanText = text.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/<[^>]*>/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'zh' ? 'zh-CN' : 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    synthesis.speak(utterance);
    console.log('Speaking text in:', utterance.lang);
}
