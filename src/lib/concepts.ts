export type ExplainSpan = { text: string; explain: string };
export type ConceptBodyBlock = { kind: "p"; parts: (string | ExplainSpan)[] };

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
          s(" That's the entire conceptual shift. Everything else — neural networks, transformers, ChatGPT — is just better and better ways of doing that one thing."),
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
          s(" The common thread is always the same: the behavior was learned from data, not handwritten."),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "This is why AI products feel weirdly inconsistent compared to normal software.",
            "Because the rules were learned, not written, the system can be brilliant on one input and confidently wrong on the next. Traditional software fails predictably; AI fails creatively.",
          ),
          s(" A regular app either works or has a bug you can fix. An AI app has tendencies, blind spots, and good and bad days — because its 'rules' live inside a giant pile of learned numbers nobody fully understands."),
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
        correctFeedback: "Exactly right. The defining shift is learning from examples instead of being given rules.",
        wrongFeedback: "Not quite. Re-read the second paragraph — the key shift is about rules vs. examples.",
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
        wrongFeedback: "Re-read the last paragraph — it's about how learned rules differ from written rules.",
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
        correctFeedback: "Correct. A calculator follows a hand-written rule. There's no learning happening.",
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
          s(" The rules-based version is easier to audit. The ML version usually performs much better."),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "There are three flavors of machine learning that you'll see referenced: supervised, unsupervised, and reinforcement.",
            "Supervised = learning from labeled examples. Unsupervised = finding structure in unlabeled data. Reinforcement = learning from trial and error with rewards.",
          ),
          s(" Most products you use rely on supervised learning, where every training example has an answer attached."),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "The quality of a machine learning system depends almost entirely on the quality of its data.",
            "Bad data in, bad model out. If your training examples are unrepresentative, biased, or noisy, the model will faithfully learn those flaws.",
          ),
          s(" That's why teams shipping ML often spend more time on data than on the algorithm itself. The algorithms are commoditized; the data isn't."),
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
        wrongFeedback: "Re-read the last paragraph — it's about how data quality shapes model quality.",
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
        wrongFeedback: "Re-read the second paragraph — note which is easier to audit and which performs better.",
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
          s(" Each connection between layers has a number attached to it, called a weight. The network's behavior is entirely determined by those weights."),
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
          s(" Repeat that a few billion times and the weights settle into a configuration that handles your task well."),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "The 'deep' in deep learning just means a network with many layers stacked on top of each other.",
            "More layers means the network can build up more abstract patterns: early layers learn edges, later layers learn shapes, later still learn objects, and so on.",
          ),
          s(" Modern networks can have hundreds of layers and billions of weights. The basic operation is still the same simple math, just enormously scaled up."),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "Nobody — not even the people who built it — can directly read what a trained neural network 'knows'.",
            "The knowledge isn't stored as words or rules. It's spread out across billions of numerical weights in a way that resists clean explanation. That's why interpretability is its own research field.",
          ),
          s(" You can probe it with inputs, you can measure its outputs, but you can't open it up and see a list of rules. That opacity is one of the real costs of using neural networks."),
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
        correctFeedback: "Exactly. Weights are the adjustable numbers that hold what the network has learned.",
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
        wrongFeedback: "Re-read the last paragraph — it's about how the knowledge is structurally stored.",
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
          s("Before transformers, the dominant way to process language was to read words one at a time, left to right, carrying a kind of summary as you went. "),
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
          s(" That means every word in your prompt is connected to every other word, in parallel, instead of waiting in a line."),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "Because attention can be computed for all words in parallel, transformers train much faster on modern hardware.",
            "GPUs are extremely good at parallel math. Older sequential models wasted that hardware; transformers exploit it fully. This is why model sizes exploded after transformers showed up.",
          ),
          s(" That speed advantage is half of why models like GPT-4 exist at all — without parallel-friendly architectures, the data and compute needed would be infeasible."),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "Transformers also don't only apply to text. The same architecture powers image generation, audio models, code completion, and biology models like AlphaFold.",
            "The architecture is general — anything you can chop into tokens (words, image patches, sound clips, DNA bases) can be fed into a transformer. That generality is part of why a single architecture is eating the AI world.",
          ),
          s(" That's why 'transformer' has become a kind of universal AI building block, not just a language-model thing."),
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
        correctFeedback: "Right. Parallelism unlocked the hardware that made GPT-scale training possible.",
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
          s(" It was trained on enormous amounts of text — books, websites, code, conversations — and learned the statistical patterns of how language is used."),
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
          s(" They have no internal database of facts, no way to check their own work, and no real sense of whether they're right or wrong."),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "There are tricks to make LLMs more reliable: giving them tools, letting them search the web, grounding them in your own documents.",
            "This is called retrieval-augmented generation (RAG) and tool use. The model isn't getting smarter — it's getting external help so its next-word predictions can be based on real information.",
          ),
          s(" Those tricks are useful, but they don't change what the model fundamentally is: a very large, very practiced text-completion engine."),
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
        correctFeedback: "Right. Hallucination is a feature of how prediction works, not a bug to patch.",
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
          s(" Because the model has no other context — no memory of you, no real-world knowledge of your situation — the prompt is the entire context it has to work with."),
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
          s(" If a prompt feels frustrating, the answer is almost always to add more context, not to repeat yourself louder."),
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
        correctFeedback: "Right. Few-shot examples are one of the most reliable prompting patterns.",
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
          s("A regular chatbot reads your message and writes a response. That's the whole interaction. "),
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
          s(" The weaknesses also come from the loop: agents can get stuck in cycles, take wrong actions confidently, and burn through API budget surprisingly fast."),
        ],
      },
      {
        kind: "p",
        parts: [
          x(
            "Designing an agent is mostly about constraints: which tools it has, what it's allowed to do, when to stop, and how to recover when things go off the rails.",
            "Production agents almost always have step limits, budget limits, restricted tool sets, and human approval gates for high-impact actions. The freedom is what makes them useful; the constraints are what keep them safe.",
          ),
          s(" The interesting product work isn't building the agent — it's designing the guardrails."),
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
