export type ExplainSpan = { text: string; explain: string };
export type ConceptBodyBlock =
  | { kind: "p"; parts: (string | ExplainSpan)[] }
  | { kind: "h"; number: string; title: string; subtitle?: string }
  | { kind: "take"; text: string }
  | { kind: "why"; text: string }
  | { kind: "ex"; title: string; body: string }
  | { kind: "trans"; text: string };

export type Example = { title: string; body: string };
export type QuizQuestion = {
  q: string;
  options: string[];
  correct: number;
  correctFeedback: string;
  wrongFeedback: string;
};

export type Concept = {
  slug: string;
  title: string;
  shortTitle: string;
  number: number;
  readingMinutes: number;
  summary: string;
  keyTakeaway: string;
  pmCallout: string;
  body: ConceptBodyBlock[];
  examples: Example[];
  quiz: QuizQuestion[];
};

const s = (text: string): string => text;
const x = (text: string, explain: string): ExplainSpan => ({ text, explain });

export const concepts: Concept[] = [
  {
    slug: "what-is-ai",
    number: 1,
    shortTitle: "What is AI?",
    title: "What is AI? A definition that actually makes sense",
    readingMinutes: 4,
    summary:
      "AI is software that learns patterns from examples instead of being told every rule. That single shift — learning instead of being programmed — is what makes it feel different from traditional software.",
    keyTakeaway:
      "AI is software that learns patterns from data, instead of being given explicit rules.",
    pmCallout:
      "As a PM: when your team says 'let's add AI', what they actually mean is 'let's stop writing rules and start training on examples'. That changes how you scope, ship, and measure success.",
    body: [
      {
        kind: "p",
        parts: [
          s("For most of computing history, software did exactly what we told it to. "),
          x(
            "A rule says: if the email contains the word 'lottery', mark it as spam. AI says: here are a million emails labeled spam or not — figure out the pattern yourself.",
            "Traditional software is a recipe — every step is written out. AI is more like teaching by example: you show it good and bad cases, and it works out the rules on its own.",
          ),
          s(" Programmers wrote rules, the computer followed them. That's it."),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "Artificial intelligence flips that around: instead of writing rules, you show the computer a lot of examples, and it figures out the rules on its own.",
            "Instead of you telling the system 'if X then Y', you show it thousands of examples of X paired with Y, and it learns the relationship statistically.",
          ),
          s(
            " That's the entire conceptual shift. Everything else — neural networks, transformers, ChatGPT — is just better and better ways of doing that one thing.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          s("People throw around 'AI' to mean a lot of different things. "),
          x(
            "Sometimes it means a spam filter. Sometimes a chatbot. Sometimes a self-driving car.",
            "These are all AI, but at very different levels of complexity. A spam filter learns one narrow pattern. A self-driving car has to learn vision, prediction, planning, and control all at once.",
          ),
          s(
            " The common thread is always the same: the behavior was learned from data, not handwritten.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "This is why AI products feel weirdly inconsistent compared to normal software.",
            "Because the rules were learned, not written, the system can be brilliant on one input and confidently wrong on the next. Traditional software fails predictably; AI fails creatively.",
          ),
          s(
            " A regular app either works or has a bug you can fix. An AI app has tendencies, blind spots, and good and bad days — because its 'rules' live inside a giant pile of learned numbers nobody fully understands.",
          ),
        ],
      },
    ],
    examples: [
      {
        title: "Spam filtering — the original AI win",
        body: "Early spam filters were hand-coded rules: block emails with the word 'viagra', block messages from certain domains, etc. Spammers got around them in days. Modern spam filters are trained on billions of labeled emails and learn what spam looks like — including patterns no human ever wrote down. That's why your inbox is mostly clean today.",
      },
      {
        title: "Netflix recommendations",
        body: "Netflix doesn't have an engineer writing 'if user watched Stranger Things, recommend Dark'. It has a model trained on what millions of viewers watched next. The recommendation is a learned pattern, not a rule someone typed.",
      },
      {
        title: "Photo tagging on your phone",
        body: "When your phone groups photos by face, no one programmed 'this is your mom'. The phone learned to tell faces apart from millions of training images and clusters yours accordingly.",
      },
      {
        title: "Autocomplete in Gmail",
        body: "Smart Compose learned from billions of sentences what word usually comes next. It's not a thesaurus or a grammar rule — it's a statistical prediction trained on real writing.",
      },
      {
        title: "ChatGPT answering this question",
        body: "ChatGPT wasn't programmed with the answer to your question. It was trained on a huge amount of text and learned which words tend to follow which — well enough to feel like a conversation.",
      },
    ],
    quiz: [
      {
        q: "What's the core idea that makes AI different from traditional software?",
        options: [
          "It runs faster than normal software",
          "It learns patterns from data instead of following written rules",
          "It always uses a neural network",
          "It runs on the cloud",
        ],
        correct: 1,
        correctFeedback:
          "Exactly right. The defining shift is learning from examples instead of being given rules.",
        wrongFeedback:
          "Not quite. Re-read the second paragraph — the key shift is about rules vs. examples.",
      },
      {
        q: "Why do AI products often feel inconsistent compared to normal software?",
        options: [
          "Because the internet is unreliable",
          "Because models are trained on bad data on purpose",
          "Because their 'rules' were learned, not written, so they can fail in unpredictable ways",
          "Because they're written in slower programming languages",
        ],
        correct: 2,
        correctFeedback: "Right. Learned behavior means learned blind spots.",
        wrongFeedback:
          "Re-read the last paragraph — it's about how learned rules differ from written rules.",
      },
      {
        q: "Which of these is NOT really 'AI' in the sense we're using the word?",
        options: [
          "Gmail's Smart Compose",
          "A spam filter trained on labeled emails",
          "A calculator that adds two numbers",
          "Netflix recommendations",
        ],
        correct: 2,
        correctFeedback:
          "Correct. A calculator follows a hand-written rule. There's no learning happening.",
        wrongFeedback: "Look for the one that doesn't involve learning from examples.",
      },
    ],
  },
  {
    slug: "machine-learning",
    number: 2,
    shortTitle: "Machine learning",
    title: "Machine learning vs. rules-based systems",
    readingMinutes: 5,
    summary:
      "Machine learning is the practical engine inside almost all modern AI. Instead of programming behavior, you collect data, train a model on it, and use that trained model to make predictions on new data.",
    keyTakeaway:
      "Machine learning replaces hand-written rules with a model trained on examples — you feed it data, and it produces predictions.",
    pmCallout:
      "As a PM: shipping ML is closer to running an experiment than shipping a feature. Your inputs are data and labels; your outputs are accuracy numbers. Plan for that loop, not for a one-shot release.",
    body: [
      {
        kind: "p",
        parts: [
          s("Machine learning is the practical recipe behind most things people call 'AI' today. "),
          x(
            "You start with examples — lots of them. Each example has an input and an output. You feed them to a learning algorithm, which adjusts a model until its predictions match the outputs in your data.",
            "Think of it as guess-and-check at industrial scale: the model makes a prediction, sees how wrong it was, nudges itself, and repeats — millions of times — until it gets reliably close.",
          ),
          s(" That trained model can then make predictions on new inputs it has never seen."),
        ],
      },
      {
        kind: "p",
        parts: [
          s("Compare this to the rules-based way of doing things. "),
          x(
            "A rules-based fraud system might say: 'flag any transaction over $10,000 from a new device'. A trained model says: 'here are 50 million transactions labeled fraud or not — figure out what fraud looks like'.",
            "The rules-based system is transparent but fragile: any pattern not in the rules slips through. The trained model catches subtle combinations of features no human would have written by hand.",
          ),
          s(
            " The rules-based version is easier to audit. The ML version usually performs much better.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "There are three flavors of machine learning that you'll see referenced: supervised, unsupervised, and reinforcement.",
            "Supervised = learning from labeled examples. Unsupervised = finding structure in unlabeled data. Reinforcement = learning from trial and error with rewards.",
          ),
          s(
            " Most products you use rely on supervised learning, where every training example has an answer attached.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "The quality of a machine learning system depends almost entirely on the quality of its data.",
            "Bad data in, bad model out. If your training examples are unrepresentative, biased, or noisy, the model will faithfully learn those flaws.",
          ),
          s(
            " That's why teams shipping ML often spend more time on data than on the algorithm itself. The algorithms are commoditized; the data isn't.",
          ),
        ],
      },
    ],
    examples: [
      {
        title: "Credit card fraud detection",
        body: "Banks used to have 200 hand-written fraud rules. A modern fraud system trains on every past transaction labeled fraud or not, and learns subtle patterns — like 'small test charge followed by a big one in a different country' — that no human rule ever captured.",
      },
      {
        title: "Email priority sorting",
        body: "Gmail's important-vs-not filter is supervised ML. It watches which emails you open, reply to, or archive, and trains a model that predicts importance for future emails.",
      },
      {
        title: "Customer churn prediction",
        body: "A SaaS company labels past customers as churned/not churned and trains a model on their usage data. The model can then score current customers and flag who's likely to leave — useful, even if the model can't explain why.",
      },
      {
        title: "Spotify's Discover Weekly",
        body: "An unsupervised model looks at listening patterns across millions of users and finds clusters of similar taste, then recommends songs from people who cluster with you.",
      },
      {
        title: "Game AI in AlphaGo",
        body: "DeepMind's Go-playing AI used reinforcement learning: it played millions of games against itself, got rewards for winning, and gradually figured out moves that beat human champions.",
      },
    ],
    quiz: [
      {
        q: "Which of these is the clearest example of supervised learning?",
        options: [
          "Grouping users by behavior with no labels",
          "Training a spam filter on emails labeled spam or not spam",
          "An agent learning to play chess by playing itself",
          "A static rule that flags transactions above $10,000",
        ],
        correct: 1,
        correctFeedback: "Right. Supervised means each training example comes with an answer.",
        wrongFeedback: "Supervised learning specifically needs labels on each example.",
      },
      {
        q: "Why do ML teams spend so much time on data?",
        options: [
          "Because algorithms are secret and expensive",
          "Because models inherit the quality and biases of the data they're trained on",
          "Because data is faster to debug than code",
          "Because data is the only thing GPUs can use",
        ],
        correct: 1,
        correctFeedback: "Exactly. The model is only as good as the examples it learned from.",
        wrongFeedback:
          "Re-read the last paragraph — it's about how data quality shapes model quality.",
      },
      {
        q: "A rules-based system and an ML model both try to detect fraud. What's the typical trade-off?",
        options: [
          "Rules are usually more accurate, ML is faster",
          "ML is more transparent, rules are more accurate",
          "Rules are easier to audit, ML usually performs better",
          "They're functionally identical",
        ],
        correct: 2,
        correctFeedback: "Right. Auditability vs. performance is the classic trade-off.",
        wrongFeedback:
          "Re-read the second paragraph — note which is easier to audit and which performs better.",
      },
    ],
  },
  {
    slug: "neural-networks",
    number: 3,
    shortTitle: "Neural networks",
    title: "Neural networks — how they actually learn",
    readingMinutes: 5,
    summary:
      "A neural network is a stack of simple math operations connected together. Each connection has a number called a weight, and learning means slowly nudging those weights until the network's outputs match the right answers.",
    keyTakeaway:
      "A neural network is just layers of weighted math; learning is the process of adjusting those weights to reduce errors.",
    pmCallout:
      "As a PM: when engineers say 'we re-trained the model', they mean those weights got nudged using new data. You don't need to read the math, but knowing it's just weighted addition makes the whole thing less mystical.",
    body: [
      {
        kind: "p",
        parts: [
          x(
            "A neural network is a stack of very simple math operations connected together in layers.",
            "Each 'neuron' is essentially: take some numbers, multiply each by a weight, add them up, and pass the result through a simple function. That's it. The magic comes from stacking a lot of them.",
          ),
          s(
            " Each connection between layers has a number attached to it, called a weight. The network's behavior is entirely determined by those weights.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          s("Learning, in a neural network, means adjusting those weights. "),
          x(
            "You feed in an input, the network produces an output, you compare it to the right answer, and you push every weight a tiny bit in the direction that would have made the answer better.",
            "This is called backpropagation. Don't worry about the math — what matters is that the network keeps a running tally of which weights are responsible for which mistakes, and corrects them.",
          ),
          s(
            " Repeat that a few billion times and the weights settle into a configuration that handles your task well.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "The 'deep' in deep learning just means a network with many layers stacked on top of each other.",
            "More layers means the network can build up more abstract patterns: early layers learn edges, later layers learn shapes, later still learn objects, and so on.",
          ),
          s(
            " Modern networks can have hundreds of layers and billions of weights. The basic operation is still the same simple math, just enormously scaled up.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "Nobody — not even the people who built it — can directly read what a trained neural network 'knows'.",
            "The knowledge isn't stored as words or rules. It's spread out across billions of numerical weights in a way that resists clean explanation. That's why interpretability is its own research field.",
          ),
          s(
            " You can probe it with inputs, you can measure its outputs, but you can't open it up and see a list of rules. That opacity is one of the real costs of using neural networks.",
          ),
        ],
      },
    ],
    examples: [
      {
        title: "Image recognition layers",
        body: "In a vision network, the first layer often learns to detect edges. The next learns corners and textures. The next combines those into shapes like eyes and ears. The final layer combines those into 'this is a cat'. The hierarchy is learned automatically.",
      },
      {
        title: "Predicting next word",
        body: "Language models are neural networks that predict the next word in a sentence. The weights have learned that 'peanut butter and' is usually followed by 'jelly', without anyone telling it so.",
      },
      {
        title: "Self-driving steering",
        body: "Some self-driving systems use a neural network that takes camera input and outputs a steering angle directly. The weights learned to associate visual patterns with steering decisions from millions of human driving examples.",
      },
      {
        title: "Voice recognition",
        body: "When Siri turns your voice into text, a neural network processes audio chunks and produces letters. Weights learned to map sound patterns to characters across millions of recorded voices.",
      },
      {
        title: "Why model sizes matter",
        body: "GPT-3 has 175 billion weights; GPT-4 likely has far more. More weights = more capacity to memorize patterns. But more weights also means more data, more compute, and more cost to train.",
      },
    ],
    quiz: [
      {
        q: "What is a 'weight' in a neural network?",
        options: [
          "The size of the model file on disk",
          "A number on a connection that gets adjusted during training",
          "The importance score of an input feature, set by humans",
          "The amount of compute the model uses",
        ],
        correct: 1,
        correctFeedback:
          "Exactly. Weights are the adjustable numbers that hold what the network has learned.",
        wrongFeedback: "Re-read paragraph one — weights live on the connections between neurons.",
      },
      {
        q: "What does 'deep' mean in deep learning?",
        options: [
          "It deeply understands the world",
          "It uses many layers stacked on top of each other",
          "It uses deeper math like calculus",
          "It runs on deep storage systems",
        ],
        correct: 1,
        correctFeedback: "Right. Deep = many layers.",
        wrongFeedback: "'Deep' refers to architecture depth — re-read paragraph three.",
      },
      {
        q: "Why is it hard to explain what a neural network has learned?",
        options: [
          "The companies that build them keep it secret",
          "The knowledge is spread across billions of numerical weights, not stored as rules",
          "The output language is encrypted",
          "Neural networks erase their memory after each prediction",
        ],
        correct: 1,
        correctFeedback: "Yes — opacity is structural, not a secrecy issue.",
        wrongFeedback:
          "Re-read the last paragraph — it's about how the knowledge is structurally stored.",
      },
    ],
  },
  {
    slug: "transformers",
    number: 4,
    shortTitle: "Transformers",
    title: "Transformers — the architecture behind ChatGPT",
    readingMinutes: 6,
    summary:
      "A transformer is a specific neural network design built around an idea called attention — a way for the model to weigh which other words in the input matter most for understanding any given word.",
    keyTakeaway:
      "Transformers use 'attention' to let every word in a sentence look at every other word, which is what lets them handle long, complex language well.",
    pmCallout:
      "As a PM: when engineers say 'attention mechanism', they mean the model is deciding which other tokens in the input matter most for this token. That's the trick behind almost every modern language model your team is shipping.",
    body: [
      {
        kind: "p",
        parts: [
          s(
            "Before transformers, the dominant way to process language was to read words one at a time, left to right, carrying a kind of summary as you went. ",
          ),
          x(
            "That worked, but it struggled with long sentences — by the time you got to the end, the model had often 'forgotten' the start.",
            "Older models like RNNs and LSTMs had this exact bottleneck: they processed sequentially and lost track of earlier context as new words came in.",
          ),
          s(" Transformers solved that with a different idea entirely."),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "The core idea is called attention. For every word, the model looks at every other word in the input and decides which ones matter most for understanding this one.",
            "Imagine you read the sentence 'The trophy didn't fit in the suitcase because it was too big.' To understand what 'it' refers to, you need to attend more to 'trophy' than to other words. Attention is the math that lets the model do exactly this.",
          ),
          s(
            " That means every word in your prompt is connected to every other word, in parallel, instead of waiting in a line.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "Because attention can be computed for all words in parallel, transformers train much faster on modern hardware.",
            "GPUs are extremely good at parallel math. Older sequential models wasted that hardware; transformers exploit it fully. This is why model sizes exploded after transformers showed up.",
          ),
          s(
            " That speed advantage is half of why models like GPT-4 exist at all — without parallel-friendly architectures, the data and compute needed would be infeasible.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "Transformers also don't only apply to text. The same architecture powers image generation, audio models, code completion, and biology models like AlphaFold.",
            "The architecture is general — anything you can chop into tokens (words, image patches, sound clips, DNA bases) can be fed into a transformer. That generality is part of why a single architecture is eating the AI world.",
          ),
          s(
            " That's why 'transformer' has become a kind of universal AI building block, not just a language-model thing.",
          ),
        ],
      },
    ],
    examples: [
      {
        title: "ChatGPT's responses",
        body: "Every time ChatGPT generates a reply, a transformer is using attention to consider every word in your prompt — and every word it has already generated — to decide what word should come next.",
      },
      {
        title: "Pronoun resolution",
        body: "In 'The trophy didn't fit in the suitcase because it was too big', a transformer learns that 'it' refers to 'trophy' by attending strongly to that word. Older sequential models often got this wrong.",
      },
      {
        title: "Vision transformers",
        body: "Modern image models chop an image into small patches and feed those patches into a transformer just like words. The same attention mechanism that handles language ends up handling visual scenes.",
      },
      {
        title: "AlphaFold for protein structure",
        body: "DeepMind's AlphaFold uses a transformer-style architecture to predict how proteins fold — a problem that stumped biology for decades. Attention helps the model relate every amino acid to every other.",
      },
      {
        title: "GitHub Copilot",
        body: "Copilot is a transformer trained on code. Attention lets it consider the entire surrounding file when suggesting a single line — so its suggestions feel context-aware in a way older autocomplete never did.",
      },
    ],
    quiz: [
      {
        q: "What's the key innovation that makes transformers work?",
        options: [
          "They use more layers than other networks",
          "They use 'attention' — letting every token look at every other token",
          "They run only on TPUs",
          "They process words strictly left to right",
        ],
        correct: 1,
        correctFeedback: "Exactly. Attention is the defining feature.",
        wrongFeedback: "Re-read paragraph two — the core idea has a specific name.",
      },
      {
        q: "Why did transformers enable today's huge models?",
        options: [
          "Because they need less data than older models",
          "Because attention can run in parallel, making good use of GPUs",
          "Because they invented backpropagation",
          "Because they don't need any training",
        ],
        correct: 1,
        correctFeedback:
          "Right. Parallelism unlocked the hardware that made GPT-scale training possible.",
        wrongFeedback: "Look at paragraph three — it's about hardware fit.",
      },
      {
        q: "Are transformers only useful for text?",
        options: [
          "Yes, only text",
          "Only for text and code",
          "No — they work on anything that can be split into tokens, including images and biology",
          "Only for chatbots",
        ],
        correct: 2,
        correctFeedback: "Exactly. The architecture generalizes to many modalities.",
        wrongFeedback: "Re-read paragraph four — transformers go beyond language.",
      },
    ],
  },
  {
    slug: "large-language-models",
    number: 5,
    shortTitle: "LLMs",
    title: "Large language models — what they are and aren't",
    readingMinutes: 6,
    summary:
      "A large language model is a transformer trained on a huge amount of text with one job: predict the next word. That simple objective, at enormous scale, ends up producing something that feels like understanding.",
    keyTakeaway:
      "An LLM is a next-word predictor trained on most of the internet. It feels intelligent, but it doesn't think the way you do.",
    pmCallout:
      "As a PM: 'LLMs hallucinate' isn't a bug to be patched in the next release. It's a side effect of how they work. Design your features around that — don't pretend it'll go away.",
    body: [
      {
        kind: "p",
        parts: [
          x(
            "A large language model is, at its core, a next-word predictor.",
            "You give it some text. It predicts the most likely next word. Then it adds that word to the input and predicts the next one. That's the entire generation process, repeated thousands of times per response.",
          ),
          s(
            " It was trained on enormous amounts of text — books, websites, code, conversations — and learned the statistical patterns of how language is used.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          s("What's surprising is what falls out of this simple objective. "),
          x(
            "If a model gets good enough at predicting the next word across the entire internet, it picks up grammar, facts, reasoning patterns, code, jokes, math, and a passable imitation of empathy — because all of those things show up in the training text.",
            "Capability emerges from scale: as the model gets bigger and the training data more diverse, surprisingly general abilities show up that nobody explicitly programmed in.",
          ),
          s(" That's why GPT-style models can do things they were never directly trained to do."),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "But this also explains the failure modes. LLMs don't 'know' things — they predict what text is likely to look like.",
            "When the model doesn't have strong patterns to lean on, it just generates the most plausible-looking text anyway. That's hallucination: confident-sounding output that simply isn't true.",
          ),
          s(
            " They have no internal database of facts, no way to check their own work, and no real sense of whether they're right or wrong.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "There are tricks to make LLMs more reliable: giving them tools, letting them search the web, grounding them in your own documents.",
            "This is called retrieval-augmented generation (RAG) and tool use. The model isn't getting smarter — it's getting external help so its next-word predictions can be based on real information.",
          ),
          s(
            " Those tricks are useful, but they don't change what the model fundamentally is: a very large, very practiced text-completion engine.",
          ),
        ],
      },
    ],
    examples: [
      {
        title: "ChatGPT generating an essay",
        body: "When ChatGPT writes a 500-word essay, it isn't 'planning' the essay. It picks the most likely next word, adds it, picks the next, and so on. The coherence comes from the model's deep familiarity with how essays usually look.",
      },
      {
        title: "Code completion",
        body: "Copilot is an LLM trained heavily on public code. When you start writing a function, it predicts the most likely continuation. It can't run the code or check if it works — it's just very good at predicting what code looks like.",
      },
      {
        title: "Hallucinated citations",
        body: "Ask an LLM for academic citations on an obscure topic and it will often invent realistic-looking authors, journals, and dates that don't exist. The pattern of a citation is well-learned; the specific real citation isn't.",
      },
      {
        title: "Translation that wasn't explicitly taught",
        body: "GPT models can translate between languages they were never explicitly trained to translate, because both languages appeared in the training data and the model picked up the mapping as a side effect.",
      },
      {
        title: "Retrieval-augmented generation",
        body: "A support chatbot built on an LLM might first search your help docs, then feed the relevant snippets into the prompt. The model's next-word predictions are now grounded in your real documentation, drastically reducing hallucination.",
      },
    ],
    quiz: [
      {
        q: "At its core, what does an LLM actually do?",
        options: [
          "It looks up facts in a database",
          "It predicts the most likely next word, repeatedly",
          "It runs millions of if-statements",
          "It searches the live internet for every answer",
        ],
        correct: 1,
        correctFeedback: "Exactly. Everything else is built on top of that one trick.",
        wrongFeedback: "Re-read paragraph one — the core mechanism is simpler than you'd think.",
      },
      {
        q: "Why do LLMs hallucinate?",
        options: [
          "They are buggy and will be fixed in the next version",
          "They lie on purpose to seem smart",
          "They predict plausible-looking text even when they have no grounding for it",
          "They run out of memory",
        ],
        correct: 2,
        correctFeedback:
          "Right. Hallucination is a feature of how prediction works, not a bug to patch.",
        wrongFeedback: "Re-read paragraph three — it's about how predicting differs from knowing.",
      },
      {
        q: "What does retrieval-augmented generation (RAG) do?",
        options: [
          "Makes the model larger",
          "Adds new weights to the network",
          "Feeds the model relevant external documents before it generates a response",
          "Replaces the model with a search engine",
        ],
        correct: 2,
        correctFeedback: "Exactly. RAG grounds the model's predictions in real source material.",
        wrongFeedback: "Re-read paragraph four — RAG adds context, not capacity.",
      },
    ],
  },
  {
    slug: "prompting",
    number: 6,
    shortTitle: "Prompting",
    title: "Prompting — talking to AI the right way",
    readingMinutes: 5,
    summary:
      "A prompt is just the input text you send to a language model. But because the model's response depends entirely on its input, small changes in how you ask can produce wildly different answers.",
    keyTakeaway:
      "A prompt isn't a magic spell — it's just the model's full input. Better inputs reliably produce better outputs.",
    pmCallout:
      "As a PM: 'prompt engineering' is mostly writing clearer specs. If you can write a good brief for a contractor, you can write a good prompt. Don't let the term intimidate the team.",
    body: [
      {
        kind: "p",
        parts: [
          x(
            "A prompt is just the text you give an LLM as input. That's it.",
            "There's nothing magical about it. The model reads your prompt, then starts predicting what should come next. Everything downstream depends on what you put in.",
          ),
          s(
            " Because the model has no other context — no memory of you, no real-world knowledge of your situation — the prompt is the entire context it has to work with.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          s("That's why small wording changes can produce dramatically different results. "),
          x(
            "Asking 'explain machine learning' gets you a textbook-flavored response. Asking 'explain machine learning to a busy CEO in 3 sentences with one concrete example' gets you something usable.",
            "The model isn't reading your mind. It's pattern-matching against what kind of response usually follows that kind of request. The more specific the request, the better the match.",
          ),
          s(" The skill of prompting is mostly being precise about what you want."),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "A few patterns consistently work well: give the model a role, show it an example or two, specify the format you want, and tell it what to do when it isn't sure.",
            "Role-setting ('you are a careful technical editor'), few-shot examples ('here are 2 examples of the style I want'), output format ('respond in JSON'), and fallbacks ('if you don't know, say so') are the patterns that survive across model versions.",
          ),
          s(" These aren't tricks — they're just clarity, applied consistently."),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "What doesn't work well: vague instructions, contradictory constraints, and assuming the model knows things it doesn't.",
            "Common failure modes: 'make it better' (better how?), 'be concise but thorough' (pick one), 'use our internal terminology' (it doesn't know your internal anything unless you give it).",
          ),
          s(
            " If a prompt feels frustrating, the answer is almost always to add more context, not to repeat yourself louder.",
          ),
        ],
      },
    ],
    examples: [
      {
        title: "Vague vs specific",
        body: "'Write me a blog post' produces generic filler. 'Write a 400-word blog post for a B2B SaaS audience about why async standups failed for us, in a casual first-person tone, with one concrete example' produces something close to usable.",
      },
      {
        title: "Role-setting",
        body: "Starting with 'You are a senior copy editor known for ruthless cuts' changes the entire shape of edits the model makes. The role primes the kind of response it generates.",
      },
      {
        title: "Few-shot examples",
        body: "Want consistent JSON output? Show two examples of input → output in the exact format you want, and the model will follow that pattern much more reliably than from a verbal description alone.",
      },
      {
        title: "Fallback handling",
        body: "Adding 'If you don't have enough information to answer, ask a clarifying question instead of guessing' meaningfully reduces hallucination in customer-support-style use cases.",
      },
      {
        title: "Chain of thought",
        body: "For math or reasoning tasks, adding 'Think step by step before giving your final answer' improves accuracy because the model commits its intermediate reasoning to text, which then constrains the final answer.",
      },
    ],
    quiz: [
      {
        q: "What is a prompt, technically?",
        options: [
          "A configuration setting for the model",
          "The text you give the model as input",
          "A special command the model recognizes",
          "An API key",
        ],
        correct: 1,
        correctFeedback: "Right. A prompt is just the input text.",
        wrongFeedback: "Re-read paragraph one — it's simpler than you'd think.",
      },
      {
        q: "Why do tiny wording changes change the output so much?",
        options: [
          "The model is unstable",
          "The model has no other context — the prompt is the whole input",
          "The model uses different weights for different words",
          "The model is randomly generated each request",
        ],
        correct: 1,
        correctFeedback: "Exactly. Specificity in equals quality out.",
        wrongFeedback: "Re-read paragraph two — it's about how much context the model has.",
      },
      {
        q: "Which pattern reliably improves model output?",
        options: [
          "Repeating the same instruction multiple times",
          "Telling the model 'try harder this time'",
          "Showing one or two examples in the format you want",
          "Asking in all caps",
        ],
        correct: 2,
        correctFeedback:
          "Right. Few-shot examples are one of the most reliable prompting patterns.",
        wrongFeedback: "Re-read paragraph three — clarity beats volume.",
      },
    ],
  },
  {
    slug: "ai-agents",
    number: 7,
    shortTitle: "AI agents",
    title: "AI agents — from chatbots to autonomous systems",
    readingMinutes: 6,
    summary:
      "An AI agent is an LLM that doesn't just talk — it can take actions, use tools, and run in a loop until it accomplishes a goal. That extra ability changes the design space dramatically.",
    keyTakeaway:
      "An agent is an LLM that loops: it plans, takes an action, observes the result, and decides what to do next.",
    pmCallout:
      "As a PM: shipping an agent is shipping an autonomous worker, not a feature. The failure modes are different (loops, runaway costs, wrong tool use). Design with guardrails and budgets from day one.",
    body: [
      {
        kind: "p",
        parts: [
          s(
            "A regular chatbot reads your message and writes a response. That's the whole interaction. ",
          ),
          x(
            "An agent goes further: it can decide to take an action, see what happened, and then decide what to do next, looping until the goal is reached.",
            "The agent loop is: think → act → observe → think again. The model is the brain; the tools (search, code execution, API calls) are the hands. The loop is what turns a chat model into something that gets things done.",
          ),
          s(" That loop is the difference between a chatbot and an agent."),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "Agents work by giving the LLM access to 'tools' — small, well-defined actions it can call, like searching the web, running a database query, or sending an email.",
            "The model is told what tools exist and what they do, and chooses which to call based on the situation. It's still just predicting the next token — that next token just happens to be a tool call instead of a word.",
          ),
          s(" The model decides which tool to use, sees the result, and continues from there."),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "The strengths of agents come from the loop: they can handle multi-step tasks, recover from mistakes, and combine tools creatively.",
            "Examples include: research that needs five searches, coding tasks that need to run tests and iterate, customer support that needs to look up account state and then take an action.",
          ),
          s(
            " The weaknesses also come from the loop: agents can get stuck in cycles, take wrong actions confidently, and burn through API budget surprisingly fast.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "Designing an agent is mostly about constraints: which tools it has, what it's allowed to do, when to stop, and how to recover when things go off the rails.",
            "Production agents almost always have step limits, budget limits, restricted tool sets, and human approval gates for high-impact actions. The freedom is what makes them useful; the constraints are what keep them safe.",
          ),
          s(
            " The interesting product work isn't building the agent — it's designing the guardrails.",
          ),
        ],
      },
    ],
    examples: [
      {
        title: "Research agents",
        body: "A research agent asked 'compare the latest pricing of our top 5 competitors' will plan a series of web searches, visit each pricing page, extract the data, and assemble a comparison — looping until done.",
      },
      {
        title: "Coding agents",
        body: "Tools like Cursor or Claude Code can read your codebase, propose changes, run tests, see which fail, and try again. The loop of 'edit → test → adjust' is exactly the agent pattern applied to programming.",
      },
      {
        title: "Customer support agents",
        body: "An agentic support bot can look up your account, check your order status, refund a payment, and email a confirmation — all in one conversation, calling each tool as needed.",
      },
      {
        title: "Browser-using agents",
        body: "Some experimental agents drive an actual web browser: they take a screenshot, decide where to click, click, take another screenshot, and repeat. Useful for tasks that don't have an API, fragile in unpredictable ways.",
      },
      {
        title: "Why agents fail in production",
        body: "A common failure: an agent gets stuck retrying the same failing tool call in a loop, burning API tokens. That's why step limits, budget caps, and 'when in doubt, ask a human' fallbacks are non-negotiable in real deployments.",
      },
    ],
    quiz: [
      {
        q: "What's the key thing an agent does that a regular chatbot doesn't?",
        options: [
          "It uses a larger model",
          "It runs in a loop, taking actions and observing results",
          "It generates longer responses",
          "It uses a special programming language",
        ],
        correct: 1,
        correctFeedback: "Right. The loop is the defining feature.",
        wrongFeedback: "Re-read paragraph one — the difference is structural, not about size.",
      },
      {
        q: "What is a 'tool' in the context of agents?",
        options: [
          "A library the model is written in",
          "A defined action the model can call, like a search or an API",
          "A separate AI model that helps the main one",
          "A debugging interface for developers",
        ],
        correct: 1,
        correctFeedback: "Exactly. Tools are the agent's hands.",
        wrongFeedback: "Re-read paragraph two — tools are actions available to the model.",
      },
      {
        q: "Why are constraints (step limits, budgets, approvals) so important for production agents?",
        options: [
          "Because they speed up the model",
          "Because agents can loop, take wrong actions, and burn budget without them",
          "Because the LLM provider requires them",
          "Because they make the model more accurate",
        ],
        correct: 1,
        correctFeedback: "Right. Constraints are what make autonomy safe in production.",
        wrongFeedback: "Re-read paragraph four — it's about safety and runaway behavior.",
      },
    ],
  },
  {
    slug: "ai-vs-ml-vs-deep-learning",
    number: 8,
    shortTitle: "AI vs ML vs Deep Learning",
    title: "AI vs ML vs Deep Learning",
    readingMinutes: 18,
    summary:
      "The hierarchy you'll explain 100 times in your career. Three terms that get used interchangeably in every roadmap, every vendor pitch, and every all-hands — and three nested ideas that, once you can separate them cleanly, change how you scope work and how seriously your engineers take you.",
    keyTakeaway:
      "AI is the umbrella, machine learning is one approach to AI, and deep learning is one approach to ML. Every deep learning system is ML; every ML system is AI; the reverse is never true.",
    pmCallout:
      "As a PM: the version of you that conflates these terms gets handed feature requests. The version that separates them cleanly gets handed strategy.",
    body: [
      { kind: "h", number: "1.1", title: "What is Artificial Intelligence", subtitle: "More than robots — why every software decision is now an AI decision" },
      { kind: "take", text: "AI is a behaviour label, not a technique. The moment software starts making judgement calls instead of executing instructions, you're inside the AI conversation — even when nothing modern is happening under the hood." },
      { kind: "why", text: "The next time a vendor opens a procurement call with 'we're an AI-first platform', you'll know that sentence describes their marketing posture, not their architecture. Your follow-up question — which judgement calls is your software actually making? — sets the tone for the rest of the meeting." },
      { kind: "p", parts: [
        s("Walk into any product review in 2026 and someone will say their feature is 'AI-powered' before they've described what it does. The phrase is doing a lot of work — and most of it is rhetorical. "),
        x("Artificial intelligence is the umbrella term for any software system that does something we'd call intelligent if a human did it, which is so broad that it captures everything from a thermostat with three temperature rules to GPT-5.", "'Intelligent' here is a behavioural test, not a technical one. If a human would have made the decision and now software does, the software gets the AI label — regardless of whether it learned anything."),
        s(" What that means in practice is that 'AI' describes the behaviour, not the mechanism. A chess engine that brute-forces every move with hand-coded heuristics is AI. A model trained on every game ever played is also AI. The label tells you nothing about how the thing was built."),
      ]},
      { kind: "p", parts: [
        s("This breadth is why AI has been a moving target since the 1950s. "),
        x("Researchers call this the 'AI effect': the moment a problem gets solved, people stop calling the solution AI and rebrand it as ordinary engineering.", "Spell-check, route planning, OCR, chess engines — all were considered AI when they were unsolved. Once they worked, they became 'just software'. The label tracks novelty more than technique."),
        s(" Today the frontier is reasoning, agency, and open-ended generation; in five years it'll be something we don't yet know to ask about. The category line keeps moving, which is exactly why anchoring decisions to it is unstable."),
      ]},
      { kind: "p", parts: [
        s("For product work, the practical consequence is that 'AI' on its own is not a category you can scope, price, or ship against — it's a positioning choice. "),
        x("Every software feature that involves a recommendation, a ranking, a prediction, a generated output, or an automated decision now sits inside the AI conversation whether or not it uses any modern technique.", "That's why a sort order, a search relevance tweak, and a generative draft tool end up on the same roadmap slide. The grouping is rhetorical, not technical, and it forces conversations that don't actually belong together."),
        s(" Your CEO is suddenly asking the support team why their macros aren't 'AI-powered' and roadmap reviews drag onto tangents about LLMs that don't apply to half the features in the deck. The word has eaten the discourse. "),
        x("The job is no longer 'ship the AI feature' — it's to decide, for each piece of behaviour in the product, whether intelligence belongs there at all.", "Some workflows benefit from a learned model. Some get worse with one. PMs who can tell the difference upfront save quarters of rework."),
      ]},
      { kind: "p", parts: [
        s("The mental shift you need is smaller and more useful than the hype around it. "),
        x("Every product decision now has an AI dimension — even saying 'we're not using AI here' is a deliberate position you have to justify, not a default.", "You don't have to ship AI everywhere. You do have to be able to say, in one sentence, why you didn't — and that sentence needs to land with both engineering and the exec team."),
        s(" Treat 'AI' as a category, not an answer. Whenever you hear it, your next question should be: what kind? "),
        x("Doing this reliably — even in stand-ups, even on Slack — is the first habit that separates PMs who can run an AI roadmap from PMs who can only narrate one.", "It also slowly trains the team around you. Engineers stop dressing rules up as models, and execs stop asking for 'AI' when they mean 'a better filter'."),
      ]},
      { kind: "ex", title: "Stripe Radar — AI as a hybrid product, not a single technique", body: "Stripe Radar markets itself as AI for fraud detection, and it genuinely is — but it sits on top of an explicit rules engine that merchants can edit themselves. The dashboard separates 'rule blocks' from 'model risk score' and shows both for every transaction. That separation is not an implementation detail; it's the product. Merchants tune each layer independently, which builds more trust than hiding the seams ever would. The wider lesson: mature AI products are almost always hybrids, and exposing the layers is a feature." },
      { kind: "ex", title: "Spotify autoplay — one user-facing 'AI', many internal levers", body: "Spotify's autoplay queue isn't one model; it's a thicket of recommenders, popularity counters, recency rules and editorial overrides that together choose the next track. From the listener's perspective it's just 'Spotify's AI'. From the engineering side, calling the whole thing AI obscures which lever you'd pull when a user complains the queue feels repetitive. PMs who can name the layers can diagnose feedback; PMs who can't end up filing every complaint as a generic model problem and waiting for ML to fix it." },
      { kind: "ex", title: "Notion AI — wrapping someone else's intelligence", body: "Notion AI shipped as a thin wrapper over a third-party large language model, with no proprietary model and no proprietary training data on day one. Notion still ships it as 'Notion AI', which is fine — but it tells you exactly what's inside the box: a vendor relationship, a prompt library, and a pricing margin. For a competing product team, knowing this changes the build-versus-buy conversation completely. You're not competing with a model, you're competing with a distribution channel." },
      { kind: "trans", text: "That umbrella shrinks the moment you go one layer deeper, into the specific approach that powers most modern AI: machine learning." },

      { kind: "h", number: "1.2", title: "What is Machine Learning", subtitle: "When systems learn from data instead of following rules" },
      { kind: "take", text: "Machine learning is the moment you stop writing rules and start curating data. The system's behaviour becomes a function of what you trained it on — which means your dataset, not your code, is the product surface area." },
      { kind: "why", text: "In your next sprint review, when an engineer says 'the model is underperforming on enterprise accounts', the right reflex isn't to ask what's broken in the code. It's to ask what enterprise data was in the training set. ML bugs almost always live in the data first." },
      { kind: "p", parts: [
        s("Picture two ways to build a spam filter. The first is a senior engineer writing 200 lines of if-statements: block this sender, flag that keyword, score these patterns. The second is showing a system a hundred million emails labelled spam or not-spam and letting it work out the pattern itself. "),
        x("Machine learning is the second approach: instead of programming behaviour directly, you give the system examples and let an algorithm derive the rules from them.", "There is no person sitting down writing 'if X then Y'. There is a person preparing X and Y and pressing 'train', and the rules fall out as a side-effect."),
        s(" The first approach is engineering. The second is closer to teaching, with all the messiness that implies."),
      ]},
      { kind: "p", parts: [
        s("Mechanically, ML systems are statistical pattern-fitters. "),
        x("A learning algorithm starts with a randomly-initialised model, makes predictions, sees how wrong each one was, nudges the model toward less-wrong, and repeats — often millions of times — until predictions stabilise.", "Nothing 'understands' email or fraud or churn in any human sense. The model is finding which features (words, timestamps, account ages) correlate with the labels you provided."),
        s(" The result is a model that maps inputs to outputs reasonably well on the kind of data it was trained on — and behaves unpredictably on the kind it wasn't."),
      ]},
      { kind: "p", parts: [
        s("The business consequence is that ML systems behave more like agricultural products than mechanical ones. "),
        x("They drift. The world shifts, user behaviour changes, fraud patterns evolve, and yesterday's accurate model quietly becomes today's inaccurate one — without any code change at all.", "This is called concept drift. It's the slow, invisible bug class that has no stack trace and shows up in your quarterly metrics rather than in your error logs."),
        s(" Every serious ML system has a retraining cadence, a held-out evaluation set, and someone whose job is to watch performance over time. Shipping an ML feature once and walking away is not shipping — it's planting. "),
        x("The cost structure also shifts: most of the bill is data preparation, labelling, and ongoing evaluation, not the brief moments of training compute everyone fixates on.", "Vendors and internal teams alike tend to under-budget the data side by an order of magnitude. The model is the photogenic part; the data pipeline is where projects actually live or die."),
      ]},
      { kind: "p", parts: [
        s("What you do differently as a PM is treat ML features as ongoing systems, not as launches. "),
        x("Your acceptance criteria stop being 'ships by Friday' and start being 'achieves precision X at recall Y on this evaluation set, with a plan for what we do when it drops'.", "You'll write specs that include evaluation metrics, retraining triggers, fallback behaviours, and human-review thresholds. None of those existed in your old PRDs."),
        s(" You'll also stop asking 'is the model done?' and start asking 'is the model good enough this week?' That single reframing changes how your team plans, staffs, and resources every ML investment for the rest of your career. "),
        x("Critically, you'll learn to distinguish a real ML system from a hand-coded one wearing an ML t-shirt — because the operational reality is wildly different.", "Rules don't drift, don't need labelled data, and don't retrain. If the team isn't doing any of those things, you don't have an ML system — you have a rules engine with good branding."),
      ]},
      { kind: "ex", title: "Gmail Smart Reply — the canonical supervised-learning product", body: "Gmail's Smart Reply suggests three short responses based on the email you're reading. It's trained on billions of real reply pairs, which is why its suggestions feel idiomatic rather than templated. The model wasn't told 'when someone asks about lunch, suggest a time'; it inferred that pattern from the data. The product implication is that the team can't easily 'fix' an off suggestion by editing rules — they have to retrain or post-filter, which is a fundamentally different control surface from a rule-based reply system." },
      { kind: "ex", title: "Shopify Fraud Protect — the cost of getting data wrong", body: "Shopify's fraud protection is an ML system trained on merchant transaction history across the platform. Its accuracy depends on having enough fraud examples in the training data, which is why it works better for high-volume merchants and underperforms on niche verticals. That isn't a bug; it's a direct consequence of the data distribution. PMs working on similar products learn quickly that 'the model needs more data from your segment' is a real and frequent answer, not a stalling tactic." },
      { kind: "ex", title: "Zillow's Zestimate — what happens when drift wins", body: "Zillow's home-price estimates are an ML system trained on historical sales data. When the housing market shifted suddenly in 2021–2022, Zillow's home-buying arm relied on Zestimate-derived predictions that quietly stopped matching reality, and the company took a $500M+ writedown before shutting the program. The model didn't break; the world changed faster than the retraining cadence could keep up. It's the most expensive case study in concept drift PMs have, and the lesson is operational: an ML system without monitoring is a balance-sheet risk." },
      { kind: "trans", text: "ML is the family of techniques. The branch of that family that powers nearly every breakthrough you've heard about in the last decade is deep learning." },

      { kind: "h", number: "1.3", title: "What is Deep Learning", subtitle: "Why neural networks changed everything" },
      { kind: "take", text: "Deep learning is the kind of ML that learns its own features. That single capability is what cracked vision, speech, translation and language — and why the last decade of AI progress looks like a wall, not a slope." },
      { kind: "why", text: "When an engineer tells you a feature 'needs a deep learning model', they are telling you three things: it needs a lot of data, it needs a lot of compute, and you will not be able to explain individual decisions to a customer or regulator. Plan for all three before you commit on the roadmap." },
      { kind: "p", parts: [
        s("For decades, getting an ML system to do anything useful with images, speech or text required a small army of domain experts to hand-design the inputs. "),
        x("You couldn't just hand a model raw pixels — you'd hand it carefully engineered features like edge counts, colour histograms, or speech spectrograms, and the model learned from those.", "This is called feature engineering. It was slow, fragile, and almost as much craft as science. Different teams produced wildly different results on the same raw data."),
        s(" Deep learning collapsed all of that. A deep neural network takes raw inputs — pixels, audio waveforms, characters — and learns the useful features for itself, layer by layer."),
      ]},
      { kind: "p", parts: [
        s("The 'deep' in deep learning is literal: it refers to networks with many layers of artificial neurons stacked on top of each other, each transforming the output of the layer below. "),
        x("Early layers learn primitive patterns like edges or phonemes; middle layers compose those into shapes or syllables; later layers compose those into faces or words.", "Nobody designs that hierarchy. It emerges from the data during training. That self-organising property is the actual breakthrough."),
        s(" Modern models — the ones behind ChatGPT, image generators, speech transcription — have hundreds of layers and billions of weighted connections, but the underlying mechanism is the same."),
      ]},
      { kind: "p", parts: [
        s("The business consequence is a fundamental change in what is buildable. "),
        x("Whole categories of product — usable voice assistants, real-time translation, conversational agents, image generation, code completion — were essentially impossible before deep learning and are essentially commodities after it.", "The 2012 ImageNet result (when a deep network crushed traditional computer vision overnight) and the 2022 ChatGPT launch are not separate events; they're the same arc compounding for ten years."),
        s(" That has reshaped competitive moats: features that were defensible because they were hard to build are now table stakes, and the new moats are data access, distribution, and product surfaces. "),
        x("The trade-off is that deep models are essentially uninterpretable — even the people who built them can't tell you why a specific input got a specific output.", "Their 'knowledge' is smeared across billions of weights with no clean mapping back to human concepts. You can probe behaviour, but you cannot read the rules."),
      ]},
      { kind: "p", parts: [
        s("What you do differently as a PM is treat deep learning as a different cost class entirely. "),
        x("Training a serious deep model costs anywhere from thousands to hundreds of millions of dollars in compute, and inference at scale has a per-request cost you have to design around.", "This is why almost no product team trains their own large model. They fine-tune existing ones, or call hosted APIs, and design unit economics around tokens per request."),
        s(" You'll also stop promising explainability you can't deliver. 'Why did the model say this?' is rarely answerable in the way executives or regulators want, and the honest answer needs to become a conversation about evaluation, guardrails, and human review rather than about inspection. "),
        x("You'll learn to distinguish deep learning from classical ML in roadmap conversations, because the staffing, infrastructure, and timeline implications are completely different.", "Classical ML can ship in a sprint with a single engineer and a CSV. Deep learning, at any scale that matters, is a platform decision involving GPUs, MLOps, and ongoing eval infrastructure."),
      ]},
      { kind: "ex", title: "GitHub Copilot — deep learning as the entire product", body: "Copilot is a fine-tuned large language model wrapped in an IDE integration. There are essentially zero hand-written rules about what good code looks like; the model learned that from billions of lines of public code. That's why Copilot improves dramatically every time the underlying model changes, and why GitHub's product roadmap is more about prompts, context windows and editor surfaces than about the model itself. The deep model is the engine; the product is the chassis." },
      { kind: "ex", title: "Adobe Firefly — deep learning as a defensibility play", body: "Adobe trained Firefly's image generation model on its own Stock library, deliberately avoiding scraped web content. That's a deep learning system with a non-technical moat: the data provenance is the differentiator, not the architecture. Enterprise customers buy Firefly partly because Adobe can indemnify outputs in a way competitors can't. It's a case study in how the relevant PM levers around deep learning often have nothing to do with the model itself." },
      { kind: "ex", title: "Tesla Autopilot — what 'we can't explain decisions' means in practice", body: "Tesla's driving system is a deep neural network that takes raw camera input and outputs driving actions. When the car makes a surprising choice, even Tesla's engineers can't point to a specific reason — the decision is distributed across billions of weights. Regulators have repeatedly run into this opacity when investigating incidents, and Tesla's response is operational: more data, more evaluation, more shadow-mode testing, not better explanations. That's the deep-learning trade-off at industrial scale." },
      { kind: "trans", text: "Three terms, three layers, and a precise relationship between them — which is the next thing you need to be able to draw on a whiteboard from memory." },

      { kind: "h", number: "1.4", title: "The nested hierarchy explained", subtitle: "How AI, ML and DL relate — and why conflating them costs you credibility" },
      { kind: "take", text: "AI ⊃ ML ⊃ Deep Learning. Three nested circles, in that order, no exceptions. Holding the hierarchy in your head with that level of precision is the cheapest credibility upgrade available to a non-technical PM." },
      { kind: "why", text: "In your next architecture review, when a staff engineer says 'this is ML but it's not deep learning', the look on their face will tell you whether you reacted in a way that earned the next ten minutes of their attention. The hierarchy is the price of admission to those conversations." },
      { kind: "p", parts: [
        s("The cleanest way to hold these three terms in your head is as three nested circles. "),
        x("AI is the outer circle: any system that behaves intelligently. Machine learning sits inside it: AI systems that learn from data. Deep learning sits inside ML: the subset that uses large neural networks.", "Every deep learning system is also ML and also AI. Every ML system is also AI. But plenty of AI is not ML (rule-based systems), and plenty of ML is not deep learning (classical statistical models)."),
        s(" That asymmetry matters. The terms are not synonyms with different vibes — they describe progressively smaller and more specific commitments about how a system is built."),
      ]},
      { kind: "p", parts: [
        s("Because of the nesting, the terms carry different information densities when used precisely. "),
        x("Saying 'we use AI' commits to almost nothing. Saying 'we use ML' commits to data-driven learning. Saying 'we use deep learning' commits to a specific architecture, a specific cost profile, and a specific set of operational realities.", "The more specific the term, the more you've told your listener — and the more they can press you on the next question. Vagueness travels the other direction."),
        s(" Vendors and marketers exploit this gradient relentlessly: they use the broadest accurate term to signal modernity while preserving deniability about what's actually inside."),
      ]},
      { kind: "p", parts: [
        s("The business consequence is that conflating these terms quietly misallocates resources and shapes wrong expectations across an organisation. "),
        x("If your CEO walks out of an industry conference convinced that 'AI' and 'GPT' are interchangeable, they will ask your team to ship things that don't make sense for the underlying tech, and dismiss things that genuinely do.", "The cost shows up as months of misaligned roadmap, vendor contracts that don't deliver, and engineering hires for problems you don't have. None of it is recoverable cheaply."),
        s(" The same applies inside engineering: a product spec that asks for 'AI-powered search' is functionally three different specs depending on whether the team interprets it as a rules tweak, a learned ranker, or a generative answer layer. Each path takes a different quarter to build. "),
        x("Using the most specific accurate term is a small habit that prevents a remarkable amount of organisational damage over time.", "It is also the single most reliable signal of an AI-literate operator. Engineers calibrate trust within the first few minutes of a meeting based on how you use these words."),
      ]},
      { kind: "p", parts: [
        s("What you do differently as a PM is treat the hierarchy as an active vocabulary, not a piece of trivia. "),
        x("In every document, every meeting, every Slack thread, use the most specific accurate term you have evidence for — and ask for evidence when someone uses one looser than they should.", "If a vendor says 'AI' and you suspect they mean rules, ask what's being learned. If they say 'ML' and you suspect they mean a neural network, ask about model size and inference cost. The precision compounds."),
        s(" You'll start hearing it from the other side: engineers who upgrade their term-of-art when talking to you are signalling that they trust you with the detail. That bidirectional precision is what real AI literacy looks like in practice. "),
        x("The PMs who get listened to on AI strategy are not the ones who know the most papers — they're the ones who never use 'AI' when they mean 'ML', and never use 'ML' when they mean 'deep learning'.", "It is a small, public, repeatable habit. And it produces outsized credibility precisely because so few people in product roles bother with it."),
      ]},
      { kind: "ex", title: "Figma — three layers in one product surface", body: "Figma's product spans all three layers cleanly. Auto-layout is rule-based AI (no learning). Smart selection and search ranking use classical ML trained on user behaviour. The newer generative features (text-to-design, AI-assisted edits) are deep learning via large models. A PM at Figma who calls all three 'our AI features' is not wrong, but is also not useful in any planning conversation. Calling them by their actual layers is what unlocks meaningful trade-off discussions about cost, latency, and quality." },
      { kind: "ex", title: "Salesforce Einstein — the marketing layer hiding the hierarchy", body: "Salesforce brands almost every intelligent feature in its platform as 'Einstein', from lead scoring (classical ML) to Einstein GPT (deep learning LLMs) to rule-based workflow automations marketed alongside them. From the outside it looks like one capability; internally it's three radically different systems with different teams, costs and reliability profiles. PMs evaluating Salesforce for an enterprise deal who can't decode which Einstein is which end up over-paying for capabilities they don't need and under-scoping the ones they do." },
      { kind: "ex", title: "Duolingo — moving down the hierarchy deliberately", body: "Duolingo's lesson sequencing started as rules, moved to classical ML (a model called Birdbrain that predicts which exercises a learner needs next), and selectively added deep learning for things like speech evaluation and conversational practice. The company is unusually public about which layer each feature uses, partly because that clarity is what lets them control unit economics in a freemium product. It's a working example of using the hierarchy as a roadmap tool, not just a vocabulary one." },
      { kind: "trans", text: "Once you can name the layers, the next skill is recognising when the layer being claimed isn't the layer being shipped — which usually starts with one specific question." },

      { kind: "h", number: "1.5", title: "Rule-based systems vs learned systems", subtitle: "The question that exposes fake AI in vendor pitches" },
      { kind: "take", text: "If you could write the system as a list of if-statements, it's not machine learning — no matter what the slide says. The distinction is binary, auditable, and the single most useful diagnostic question in your AI vocabulary." },
      { kind: "why", text: "In every vendor procurement call you'll run for the rest of your career, this is the question that saves you from buying a rules engine at AI prices. Ask it in the first ten minutes; the answer changes everything that comes after." },
      { kind: "p", parts: [
        s("A rule-based system is software where every behaviour was written down by a human. "),
        x("If income > $50k AND credit_score > 700 → approve loan. If subject_line contains 'lottery' → flag email. If user hasn't logged in for 14 days → send re-engagement email.", "These are deterministic. Same input, same output, every time. The logic is right there in the code and a human reviewer can audit it line by line."),
        s(" A learned system has no explicit rules. It has a trained model — a pile of weights — that maps inputs to outputs. The 'rules' are implicit and statistical, and they shift every time the model is retrained."),
      ]},
      { kind: "p", parts: [
        s("Both are legitimate. They are just different products with different cost structures and different failure modes. "),
        x("Rule-based systems are cheap to build, fast to run, easy to audit, and behave predictably under regulation. That's exactly why tax software, postcode lookups, business workflows, and most compliance logic live there.", "If the pattern is stable and writable, rules win on every operational dimension that matters. The only reason to leave them is that the pattern isn't stable or writable."),
        s(" Learned systems earn their keep when the pattern is too subtle, too high-dimensional, or too dynamic for a human to capture by hand. Recommendation, fraud, language, vision — all impossible to spec out as rules at any reasonable accuracy."),
      ]},
      { kind: "p", parts: [
        s("The business consequence is that the cost gap between the two is roughly an order of magnitude, in both directions. "),
        x("Rules-based features ship in days, run for fractions of a cent, and almost never surprise anyone. Learned systems take months to ship properly, cost real money to run, and surprise everyone occasionally.", "Choosing the wrong one for the problem is expensive: rules where you needed learning produce a brittle product; learning where you needed rules produces a slow, opaque, expensive feature that does what an if-statement could have done."),
        s(" The asymmetry that vendors exploit is that 'learned' sounds more sophisticated, so rules systems frequently get dressed up as ML in sales material. The dress-up doesn't cost the vendor anything — it costs you in misaligned expectations after the deal closes. "),
        x("The honest diagnostic is one sentence long: could you, in principle, have written this as a list of if-statements?", "If the answer is yes — even a long list — it's a rule-based system. The 'AI' label is decoration, and the product should be evaluated as a rules engine on rules-engine metrics."),
      ]},
      { kind: "p", parts: [
        s("What you do differently as a PM is ask the rules-versus-learning question early and out loud, on every AI feature and every vendor evaluation. "),
        x("Ask the engineer building it. Ask the vendor selling it. Ask the analyst writing about it. The answer is either crisp or evasive, and either tells you what you need to know.", "Crisp answers ('it's a gradient-boosted classifier on these features') are a green flag, even if you don't fully understand the technique. Evasive answers ('our proprietary intelligence layer') are a red flag, always."),
        s(" You'll also stop being embarrassed about shipping rules. A rule-based feature shipped fast and explained honestly almost always outperforms a learned feature shipped late and explained badly. "),
        x("'We considered ML and chose rules because the pattern is stable' is one of the most senior-sounding sentences a PM can say in a roadmap review, and almost nobody says it.", "It signals that you understand the trade-off and made a deliberate choice, which is exactly the disposition the AI hype cycle is currently selecting against."),
      ]},
      { kind: "ex", title: "TurboTax — the rules engine no one is embarrassed about", body: "TurboTax encodes the U.S. tax code as a vast decision tree of rules. It is one of the most successful pieces of consumer software ever built, and it contains essentially zero machine learning in the parts that calculate your taxes. Intuit doesn't market it as AI, and that honesty is part of the trust. The product lesson is that rules are not a downgrade — for codified domains, they are the correct choice, and pretending otherwise would actively hurt the product." },
      { kind: "ex", title: "Calendly — 'AI scheduling' that's really a calendar", body: "Calendly's core scheduling is a rules engine: it finds open slots in two calendars and applies user preferences for working hours, buffer time, and meeting length. The company has historically resisted calling this AI, which is part of why enterprise buyers trust it. When competitors launched 'AI scheduling assistants' that turned out to be the same rules logic with a generative wrapper, customers noticed quickly and the category narrative correctly settled back to 'scheduling automation'. The market punished the dishonest framing." },
      { kind: "ex", title: "Klarna's customer service overhaul — the inverse case", body: "Klarna publicly replaced large portions of its customer-service workflow with an LLM-based agent, reporting work equivalent to 700 full-time agents in the first month. The interesting detail is that they were explicit about what was learned (the conversational layer) versus what stayed as rules (refund logic, eligibility, escalation paths). That layered honesty is what made the announcement credible to operators rather than a marketing claim. Just as you shouldn't dress rules up as ML, you also shouldn't hide the rules that hold a real ML system together." },
      { kind: "trans", text: "Knowing the diagnostic is half the work. Having a reusable script for applying it in every vendor conversation is the other half — and it fits on a sticky note." },

      { kind: "h", number: "1.6", title: "PM decision lens: spotting real AI vs marketing AI", subtitle: "The 3 questions to ask before trusting any 'AI-powered' claim" },
      { kind: "take", text: "Three questions, asked in order, separate real AI work from marketing veneer in under twenty minutes. The questions are free to ask and expensive to skip — they are the closest thing the field has to a universal due-diligence script." },
      { kind: "why", text: "Next time you sit through a vendor demo or an internal pitch with 'AI-powered' in the deck, ask these three questions in order and watch the room. The PMs who consistently ask them get put on AI strategy committees; the ones who don't get handed the rollout." },
      { kind: "p", parts: [
        s("Question one: is there a trained model, or are these hand-written rules? "),
        x("This is the rules-versus-learning diagnostic from the previous section, applied as the opening move. If the answer is 'no model, just rules', the conversation is no longer about AI — it's about software, with all the normal evaluation criteria.", "If the answer is vague — 'it's our proprietary intelligence layer' — treat that as a 'no' until proven otherwise. Real ML teams answer this question crisply because they're proud of the answer."),
        s(" A useful follow-up: 'what kind of model, and what does it predict?' One sentence of specificity here separates a serious team from a marketing one. You don't need to understand the technique; you need to hear that they do."),
      ]},
      { kind: "p", parts: [
        s("Question two: what was it trained on, and how do you measure when it's wrong? "),
        x("Every real ML system has a training dataset, a held-out evaluation set, and at least one quantitative quality metric (accuracy, precision, recall, F1, AUC, BLEU — the specific metric matters less than that there is one).", "If the vendor can't tell you the dataset or the metric, the model either doesn't exist or hasn't been evaluated. Both are disqualifying for any use case that matters."),
        s(" 'It just works really well' is not an evaluation metric. Neither is a customer logo wall. Push politely until you get a number with a denominator — precision on what set, measured how, refreshed when. "),
        x("Bonus follow-up: 'what does it look like when it's wrong?' Mature teams have a vivid, specific answer; immature ones produce a hedge.", "Knowing the failure modes is how you scope the human-in-the-loop layer, the guardrails, and the support load. Without that answer, you cannot price the product into your stack honestly."),
      ]},
      { kind: "p", parts: [
        s("Question three: what happens when it's wrong, and how do you retrain? "),
        x("A mature ML system has a feedback loop: errors get captured, labelled, folded into the next training run, and the resulting model is re-evaluated before it ships. The retraining cadence is on a roadmap somewhere.", "If there is no answer here, the model is frozen — and quietly getting worse as the world shifts around it. A frozen model in a dynamic domain is a slow-motion outage you've signed a multi-year contract for."),
        s(" The retraining story is as important as the launch story. Anyone can ship a model once; the operational discipline is in keeping it accurate as reality changes underneath it. "),
        x("The third question is also where most vendor pitches collapse, because most vendor pitches are optimised for the demo and not for the second year of the contract.", "Asking it early is a kindness: it tells the serious vendors that you're worth talking to, and it tells the unserious ones that you're not the buyer they were hoping for."),
      ]},
      { kind: "p", parts: [
        s("What you do differently as a PM is internalise these three questions until they're automatic. "),
        x("Memorise them. Write them on a sticky note. Bring them to every demo, every vendor call, every architecture review, every roadmap meeting where someone says 'AI-powered' without immediately defining the term.", "They cost nothing to ask, take under twenty minutes to work through, and reliably separate the AI work that's worth your team's quarter from the AI work that isn't."),
        s(" You'll also use them inward. The next time your own team proposes an 'AI-powered' feature, the three questions tell you whether the proposal is ready for a PRD or still needs a discovery sprint. "),
        x("That symmetry — applying the same rigour to your own roadmap that you apply to vendor pitches — is what makes a PM trusted on AI strategy across an organisation.", "The trust compounds. Within a year of consistently asking these three questions, you'll be the person engineering teams loop in early on AI decisions, and the person execs ask before they sign anything that says 'AI' on the order form."),
      ]},
      { kind: "ex", title: "The 'AI assistant' that was a regex — a real procurement story", body: "A mid-market SaaS company evaluated an 'AI-powered customer intent classifier' for $80K/year. Three questions in, the vendor admitted the system was a list of 400 regex patterns hand-maintained by their support team — no model, no training data, no evaluation metric. The buyer renegotiated to a $12K/year rules-engine contract and used the savings to build a real ML classifier internally the following quarter. The three questions paid for themselves several times over in a single call." },
      { kind: "ex", title: "Intercom Fin — a vendor that passes the three questions", body: "Intercom's Fin support agent is explicit on all three fronts: it's an LLM-based system with retrieval over your help centre, evaluation metrics are published per customer (resolution rate, escalation rate), and the retrieval index updates continuously as content changes. None of that is in the marketing copy; all of it is one click into the docs. The signal isn't that they have the answers — it's that they expose them without being pushed, which is what you want to see in a serious AI vendor." },
      { kind: "ex", title: "Internal AI features — applying the lens to your own team", body: "A PM at a fintech proposed an 'AI-powered transaction categorisation' feature in a quarterly planning session. Applying the three questions to her own proposal: there was no model yet (rules), no labelled dataset (the data team hadn't started), and no retraining plan (no one had thought about it). The proposal was rebadged as a rules-based v1 with an ML upgrade path scoped for the following quarter, and shipped on time as rules. The same lens that protects you from vendor hype protects you from your own." },
      { kind: "trans", text: "Six sections in, you have the vocabulary, the hierarchy, the diagnostic, and the script. The chapter quiz is where you find out whether you have the instincts." },
    ],
    examples: [],
    quiz: [
      { q: "A roadmap deck has a slide titled 'AI-powered onboarding'. The feature is a series of if-statements that show different welcome screens based on the user's role, plan, and signup source. Which of these is the most credibility-preserving thing to say in the review?", options: ["'Great — let's make sure we benchmark it against deep learning approaches.'", "'This is a rule-based system that may be marketed as AI, but it isn't ML — let's evaluate it as a rules engine.'", "'We should add a neural network so it counts as real AI.'", "'AI and rules are the same thing at this scale — the distinction doesn't matter.'"], correct: 1, correctFeedback: "Exactly. Rules-based logic can carry an AI label loosely, but the operational reality is a rules engine and that's how it should be scoped, priced, and reviewed. Calling it out doesn't kill the feature — it lets the team plan honestly.", wrongFeedback: "The chapter opens on this exact mistake: treating 'AI' as a quality bar rather than a behaviour label. The question isn't 'how do we make it more AI?' — it's 'what kind of AI is this, and is that the right choice for this problem?' Re-read section 1.1." },
      { q: "An engineer says the recommendation model 'works great in the test set but performance dropped 8% on enterprise accounts last quarter, and we think it's drift'. What is the underlying issue she's describing?", options: ["A bug in the recommendation code that needs to be patched.", "The model was trained on data that no longer reflects current enterprise behaviour, so its predictions are degrading even though nothing changed in the code.", "The test set is the wrong size and needs to be expanded.", "The model needs to be replaced with a deep learning version."], correct: 1, correctFeedback: "Right. Concept drift is the silent bug class of ML systems: no stack trace, no code change, just quietly worsening metrics as the world shifts. The fix is operational — retraining cadence, fresh evaluation data — not a code patch.", wrongFeedback: "Drift isn't a bug in the traditional sense; nothing about the code is broken. The model is a snapshot of past data and the world has moved on. Re-read section 1.2 on why ML features behave more like agricultural products than mechanical ones." },
      { q: "A founder asks why your team can't 'just explain' why the deep-learning fraud model declined a specific transaction, the way the old rules engine could. Which response best reflects what's actually going on?", options: ["'We can — we just need to ask the engineers to log the rules the model used.'", "'Deep models distribute their behaviour across billions of weights, so per-decision explanations aren't directly available — what we can do is publish evaluation metrics, build a human-review path, and use simpler models where regulation requires explanation.'", "'Deep learning is just ML, and ML is fully explainable.'", "'We should remove the AI entirely until we can explain every decision.'"], correct: 1, correctFeedback: "Right. The honest answer is operational: real evaluation, review paths, and a deliberate choice about where deep learning is and isn't appropriate. That framing turns an unanswerable question into a manageable one.", wrongFeedback: "Deep models genuinely don't have readable rules — their 'knowledge' lives in weight matrices that don't map to human concepts. The PM job is to convert 'why did it decide this?' into a conversation about evaluation, guardrails, and human review. Re-read section 1.3." },
      { q: "Which statement most accurately describes the relationship between AI, machine learning, and deep learning?", options: ["They're three names for substantially the same set of techniques.", "Deep learning is a kind of machine learning, which is one approach to AI; all deep learning is ML and all ML is AI, but not the reverse.", "AI is a kind of machine learning, which is a kind of deep learning.", "Machine learning and deep learning are separate fields that occasionally overlap."], correct: 1, correctFeedback: "Exactly. Nested circles, in that order, no exceptions. Holding this precisely is the cheapest credibility upgrade in your AI vocabulary.", wrongFeedback: "The relationship is strict containment: deep learning ⊂ machine learning ⊂ artificial intelligence. Every DL system is ML and AI; not all AI is ML, and not all ML is DL. Re-read section 1.4." },
      { q: "A vendor pitches an 'AI-powered customer health score'. In the demo, they admit there's no trained model — the score is a weighted sum of nine product-usage signals chosen by their consulting team. Which framing is most accurate?", options: ["It's machine learning, because it produces a score from data.", "It's deep learning, because the score combines multiple signals.", "It's a rule-based system that has been marketed as AI; it may still be useful, but it should be evaluated on rules-engine criteria rather than on ML metrics.", "It's not software at all."], correct: 2, correctFeedback: "Right. A hand-tuned weighted sum is a rules engine, not ML. That doesn't make it bad — it makes it a different product, with different operational properties, and you should evaluate it accordingly.", wrongFeedback: "Combining signals or producing a score isn't what makes something ML. ML requires that the system learned the combination from labelled data, not that a consultant chose the weights. Re-read section 1.5." },
      { q: "You have twenty minutes with an 'AI-powered' vendor in a procurement call. Which set of three questions, asked in order, most reliably separates real AI work from marketing veneer?", options: ["'How fast is it?', 'What language is it written in?', 'Does it run on the cloud?'", "'Is there a trained model or is this rules?', 'What was it trained on and how is performance measured?', 'What happens when it's wrong and how do you retrain?'", "'Which LLM do you use?', 'Are you GPT-4 or Claude?', 'Do you have a chatbot?'", "'Who are your biggest customers?', 'When was the company founded?', 'What's your pricing?'"], correct: 1, correctFeedback: "Exactly. Model vs. rules, training data and evaluation, retraining and failure handling — those three, in order, expose almost every gap between an AI pitch and an AI product. The questions are free to ask and expensive to skip.", wrongFeedback: "The diagnostic isn't about speed, cloud, or which LLM is under the hood — it's about whether anything is being learned, whether anyone is measuring it, and whether it stays accurate as the world changes. Re-read section 1.6." },
    ],
  },
];

export const conceptBySlug = (slug: string): Concept | undefined =>
  concepts.find((c) => c.slug === slug);

export const nextConcept = (slug: string): Concept | undefined => {
  const i = concepts.findIndex((c) => c.slug === slug);
  return i >= 0 && i < concepts.length - 1 ? concepts[i + 1] : undefined;
};

export const prevConcept = (slug: string): Concept | undefined => {
  const i = concepts.findIndex((c) => c.slug === slug);
  return i > 0 ? concepts[i - 1] : undefined;
};
