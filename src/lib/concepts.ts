export type ExplainSpan = { text: string; explain: string };
export type ConceptBodyBlock =
  | { kind: "p"; parts: (string | ExplainSpan)[] }
  | { kind: "h"; number: string; title: string; subtitle?: string }
  | { kind: "h3"; title: string; subtitle?: string }
  | { kind: "take"; text: string }
  | { kind: "why"; text: string }
  | { kind: "ex"; title: string; body: string }
  | { kind: "trans"; text: string }
  | {
      kind: "diagram";
      id: string;
      type: "flow" | "nested" | "comparison" | "tree";
      title: string;
      caption: string;
    };

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
      {
        kind: "h",
        number: "1.1",
        title: "What is Artificial Intelligence",
        subtitle: "More than robots — why every software decision is now an AI decision",
      },
      {
        kind: "take",
        text: "AI is a behaviour label, not a technique. The moment software starts making judgement calls instead of executing instructions, you're inside the AI conversation — even when nothing modern is happening under the hood.",
      },
      {
        kind: "why",
        text: "The next time a vendor opens a procurement call with 'we're an AI-first platform', you'll know that sentence describes their marketing posture, not their architecture. Your follow-up question — which judgement calls is your software actually making? — sets the tone for the rest of the meeting.",
      },
      {
        kind: "p",
        parts: [
          s(
            "Walk into any product review in 2026 and someone will say their feature is 'AI-powered' before they've described what it does. The phrase is doing a lot of work — and most of it is rhetorical. ",
          ),
          x(
            "Artificial intelligence is the umbrella term for any software system that does something we'd call intelligent if a human did it, which is so broad that it captures everything from a thermostat with three temperature rules to GPT-5.",
            "'Intelligent' here is a behavioural test, not a technical one. If a human would have made the decision and now software does, the software gets the AI label — regardless of whether it learned anything.",
          ),
          s(
            " What that means in practice is that 'AI' describes the behaviour, not the mechanism. A chess engine that brute-forces every move with hand-coded heuristics is AI. A model trained on every game ever played is also AI. The label tells you nothing about how the thing was built.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          s("This breadth is why AI has been a moving target since the 1950s. "),
          x(
            "Researchers call this the 'AI effect': the moment a problem gets solved, people stop calling the solution AI and rebrand it as ordinary engineering.",
            "Spell-check, route planning, OCR, chess engines — all were considered AI when they were unsolved. Once they worked, they became 'just software'. The label tracks novelty more than technique.",
          ),
          s(
            " Today the frontier is reasoning, agency, and open-ended generation; in five years it'll be something we don't yet know to ask about. The category line keeps moving, which is exactly why anchoring decisions to it is unstable.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          s(
            "For product work, the practical consequence is that 'AI' on its own is not a category you can scope, price, or ship against — it's a positioning choice. ",
          ),
          x(
            "Every software feature that involves a recommendation, a ranking, a prediction, a generated output, or an automated decision now sits inside the AI conversation whether or not it uses any modern technique.",
            "That's why a sort order, a search relevance tweak, and a generative draft tool end up on the same roadmap slide. The grouping is rhetorical, not technical, and it forces conversations that don't actually belong together.",
          ),
          s(
            " Your CEO is suddenly asking the support team why their macros aren't 'AI-powered' and roadmap reviews drag onto tangents about LLMs that don't apply to half the features in the deck. The word has eaten the discourse. ",
          ),
          x(
            "The job is no longer 'ship the AI feature' — it's to decide, for each piece of behaviour in the product, whether intelligence belongs there at all.",
            "Some workflows benefit from a learned model. Some get worse with one. PMs who can tell the difference upfront save quarters of rework.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          s("The mental shift you need is smaller and more useful than the hype around it. "),
          x(
            "Every product decision now has an AI dimension — even saying 'we're not using AI here' is a deliberate position you have to justify, not a default.",
            "You don't have to ship AI everywhere. You do have to be able to say, in one sentence, why you didn't — and that sentence needs to land with both engineering and the exec team.",
          ),
          s(
            " Treat 'AI' as a category, not an answer. Whenever you hear it, your next question should be: what kind? ",
          ),
          x(
            "Doing this reliably — even in stand-ups, even on Slack — is the first habit that separates PMs who can run an AI roadmap from PMs who can only narrate one.",
            "It also slowly trains the team around you. Engineers stop dressing rules up as models, and execs stop asking for 'AI' when they mean 'a better filter'.",
          ),
        ],
      },
      {
        kind: "ex",
        title: "Stripe Radar — AI as a hybrid product, not a single technique",
        body: "Stripe Radar markets itself as AI for fraud detection, and it genuinely is — but it sits on top of an explicit rules engine that merchants can edit themselves. The dashboard separates 'rule blocks' from 'model risk score' and shows both for every transaction. That separation is not an implementation detail; it's the product. Merchants tune each layer independently, which builds more trust than hiding the seams ever would. The wider lesson: mature AI products are almost always hybrids, and exposing the layers is a feature.",
      },
      {
        kind: "ex",
        title: "Spotify autoplay — one user-facing 'AI', many internal levers",
        body: "Spotify's autoplay queue isn't one model; it's a thicket of recommenders, popularity counters, recency rules and editorial overrides that together choose the next track. From the listener's perspective it's just 'Spotify's AI'. From the engineering side, calling the whole thing AI obscures which lever you'd pull when a user complains the queue feels repetitive. PMs who can name the layers can diagnose feedback; PMs who can't end up filing every complaint as a generic model problem and waiting for ML to fix it.",
      },
      {
        kind: "ex",
        title: "Notion AI — wrapping someone else's intelligence",
        body: "Notion AI shipped as a thin wrapper over a third-party large language model, with no proprietary model and no proprietary training data on day one. Notion still ships it as 'Notion AI', which is fine — but it tells you exactly what's inside the box: a vendor relationship, a prompt library, and a pricing margin. For a competing product team, knowing this changes the build-versus-buy conversation completely. You're not competing with a model, you're competing with a distribution channel.",
      },
      {
        kind: "trans",
        text: "That umbrella shrinks the moment you go one layer deeper, into the specific approach that powers most modern AI: machine learning.",
      },

      {
        kind: "h",
        number: "1.2",
        title: "What is Machine Learning",
        subtitle: "When systems learn from data instead of following rules",
      },
      {
        kind: "take",
        text: "Machine learning is the moment you stop writing rules and start curating data. The system's behaviour becomes a function of what you trained it on — which means your dataset, not your code, is the product surface area.",
      },
      {
        kind: "why",
        text: "In your next sprint review, when an engineer says 'the model is underperforming on enterprise accounts', the right reflex isn't to ask what's broken in the code. It's to ask what enterprise data was in the training set. ML bugs almost always live in the data first.",
      },
      {
        kind: "p",
        parts: [
          s(
            "Picture two ways to build a spam filter. The first is a senior engineer writing 200 lines of if-statements: block this sender, flag that keyword, score these patterns. The second is showing a system a hundred million emails labelled spam or not-spam and letting it work out the pattern itself. ",
          ),
          x(
            "Machine learning is the second approach: instead of programming behaviour directly, you give the system examples and let an algorithm derive the rules from them.",
            "There is no person sitting down writing 'if X then Y'. There is a person preparing X and Y and pressing 'train', and the rules fall out as a side-effect.",
          ),
          s(
            " The first approach is engineering. The second is closer to teaching, with all the messiness that implies.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          s("Mechanically, ML systems are statistical pattern-fitters. "),
          x(
            "A learning algorithm starts with a randomly-initialised model, makes predictions, sees how wrong each one was, nudges the model toward less-wrong, and repeats — often millions of times — until predictions stabilise.",
            "Nothing 'understands' email or fraud or churn in any human sense. The model is finding which features (words, timestamps, account ages) correlate with the labels you provided.",
          ),
          s(
            " The result is a model that maps inputs to outputs reasonably well on the kind of data it was trained on — and behaves unpredictably on the kind it wasn't.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          s(
            "The business consequence is that ML systems behave more like agricultural products than mechanical ones. ",
          ),
          x(
            "They drift. The world shifts, user behaviour changes, fraud patterns evolve, and yesterday's accurate model quietly becomes today's inaccurate one — without any code change at all.",
            "This is called concept drift. It's the slow, invisible bug class that has no stack trace and shows up in your quarterly metrics rather than in your error logs.",
          ),
          s(
            " Every serious ML system has a retraining cadence, a held-out evaluation set, and someone whose job is to watch performance over time. Shipping an ML feature once and walking away is not shipping — it's planting. ",
          ),
          x(
            "The cost structure also shifts: most of the bill is data preparation, labelling, and ongoing evaluation, not the brief moments of training compute everyone fixates on.",
            "Vendors and internal teams alike tend to under-budget the data side by an order of magnitude. The model is the photogenic part; the data pipeline is where projects actually live or die.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          s(
            "What you do differently as a PM is treat ML features as ongoing systems, not as launches. ",
          ),
          x(
            "Your acceptance criteria stop being 'ships by Friday' and start being 'achieves precision X at recall Y on this evaluation set, with a plan for what we do when it drops'.",
            "You'll write specs that include evaluation metrics, retraining triggers, fallback behaviours, and human-review thresholds. None of those existed in your old PRDs.",
          ),
          s(
            " You'll also stop asking 'is the model done?' and start asking 'is the model good enough this week?' That single reframing changes how your team plans, staffs, and resources every ML investment for the rest of your career. ",
          ),
          x(
            "Critically, you'll learn to distinguish a real ML system from a hand-coded one wearing an ML t-shirt — because the operational reality is wildly different.",
            "Rules don't drift, don't need labelled data, and don't retrain. If the team isn't doing any of those things, you don't have an ML system — you have a rules engine with good branding.",
          ),
        ],
      },
      {
        kind: "ex",
        title: "Gmail Smart Reply — the canonical supervised-learning product",
        body: "Gmail's Smart Reply suggests three short responses based on the email you're reading. It's trained on billions of real reply pairs, which is why its suggestions feel idiomatic rather than templated. The model wasn't told 'when someone asks about lunch, suggest a time'; it inferred that pattern from the data. The product implication is that the team can't easily 'fix' an off suggestion by editing rules — they have to retrain or post-filter, which is a fundamentally different control surface from a rule-based reply system.",
      },
      {
        kind: "ex",
        title: "Shopify Fraud Protect — the cost of getting data wrong",
        body: "Shopify's fraud protection is an ML system trained on merchant transaction history across the platform. Its accuracy depends on having enough fraud examples in the training data, which is why it works better for high-volume merchants and underperforms on niche verticals. That isn't a bug; it's a direct consequence of the data distribution. PMs working on similar products learn quickly that 'the model needs more data from your segment' is a real and frequent answer, not a stalling tactic.",
      },
      {
        kind: "ex",
        title: "Zillow's Zestimate — what happens when drift wins",
        body: "Zillow's home-price estimates are an ML system trained on historical sales data. When the housing market shifted suddenly in 2021–2022, Zillow's home-buying arm relied on Zestimate-derived predictions that quietly stopped matching reality, and the company took a $500M+ writedown before shutting the program. The model didn't break; the world changed faster than the retraining cadence could keep up. It's the most expensive case study in concept drift PMs have, and the lesson is operational: an ML system without monitoring is a balance-sheet risk.",
      },
      {
        kind: "trans",
        text: "ML is the family of techniques. The branch of that family that powers nearly every breakthrough you've heard about in the last decade is deep learning.",
      },

      {
        kind: "h",
        number: "1.3",
        title: "What is Deep Learning",
        subtitle: "Why neural networks changed everything",
      },
      {
        kind: "take",
        text: "Deep learning is the kind of ML that learns its own features. That single capability is what cracked vision, speech, translation and language — and why the last decade of AI progress looks like a wall, not a slope.",
      },
      {
        kind: "why",
        text: "When an engineer tells you a feature 'needs a deep learning model', they are telling you three things: it needs a lot of data, it needs a lot of compute, and you will not be able to explain individual decisions to a customer or regulator. Plan for all three before you commit on the roadmap.",
      },
      {
        kind: "p",
        parts: [
          s(
            "For decades, getting an ML system to do anything useful with images, speech or text required a small army of domain experts to hand-design the inputs. ",
          ),
          x(
            "You couldn't just hand a model raw pixels — you'd hand it carefully engineered features like edge counts, colour histograms, or speech spectrograms, and the model learned from those.",
            "This is called feature engineering. It was slow, fragile, and almost as much craft as science. Different teams produced wildly different results on the same raw data.",
          ),
          s(
            " Deep learning collapsed all of that. A deep neural network takes raw inputs — pixels, audio waveforms, characters — and learns the useful features for itself, layer by layer.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          s(
            "The 'deep' in deep learning is literal: it refers to networks with many layers of artificial neurons stacked on top of each other, each transforming the output of the layer below. ",
          ),
          x(
            "Early layers learn primitive patterns like edges or phonemes; middle layers compose those into shapes or syllables; later layers compose those into faces or words.",
            "Nobody designs that hierarchy. It emerges from the data during training. That self-organising property is the actual breakthrough.",
          ),
          s(
            " Modern models — the ones behind ChatGPT, image generators, speech transcription — have hundreds of layers and billions of weighted connections, but the underlying mechanism is the same.",
          ),
        ],
      },
      {
        kind: "diagram",
        id: "ch1-dl-flow",
        type: "flow",
        title: "Feature Extraction in Deep Learning",
        caption:
          "Deep learning models automatically build complex concepts from simple ones by passing data through sequential hidden layers, removing the need for human engineers to hand-label features.",
      },
      {
        kind: "p",
        parts: [
          s("The business consequence is a fundamental change in what is buildable. "),
          x(
            "Whole categories of product — usable voice assistants, real-time translation, conversational agents, image generation, code completion — were essentially impossible before deep learning and are essentially commodities after it.",
            "The 2012 ImageNet result (when a deep network crushed traditional computer vision overnight) and the 2022 ChatGPT launch are not separate events; they're the same arc compounding for ten years.",
          ),
          s(
            " That has reshaped competitive moats: features that were defensible because they were hard to build are now table stakes, and the new moats are data access, distribution, and product surfaces. ",
          ),
          x(
            "The trade-off is that deep models are essentially uninterpretable — even the people who built them can't tell you why a specific input got a specific output.",
            "Their 'knowledge' is smeared across billions of weights with no clean mapping back to human concepts. You can probe behaviour, but you cannot read the rules.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          s(
            "What you do differently as a PM is treat deep learning as a different cost class entirely. ",
          ),
          x(
            "Training a serious deep model costs anywhere from thousands to hundreds of millions of dollars in compute, and inference at scale has a per-request cost you have to design around.",
            "This is why almost no product team trains their own large model. They fine-tune existing ones, or call hosted APIs, and design unit economics around tokens per request.",
          ),
          s(
            " You'll also stop promising explainability you can't deliver. 'Why did the model say this?' is rarely answerable in the way executives or regulators want, and the honest answer needs to become a conversation about evaluation, guardrails, and human review rather than about inspection. ",
          ),
          x(
            "You'll learn to distinguish deep learning from classical ML in roadmap conversations, because the staffing, infrastructure, and timeline implications are completely different.",
            "Classical ML can ship in a sprint with a single engineer and a CSV. Deep learning, at any scale that matters, is a platform decision involving GPUs, MLOps, and ongoing eval infrastructure.",
          ),
        ],
      },
      {
        kind: "ex",
        title: "GitHub Copilot — deep learning as the entire product",
        body: "Copilot is a fine-tuned large language model wrapped in an IDE integration. There are essentially zero hand-written rules about what good code looks like; the model learned that from billions of lines of public code. That's why Copilot improves dramatically every time the underlying model changes, and why GitHub's product roadmap is more about prompts, context windows and editor surfaces than about the model itself. The deep model is the engine; the product is the chassis.",
      },
      {
        kind: "ex",
        title: "Adobe Firefly — deep learning as a defensibility play",
        body: "Adobe trained Firefly's image generation model on its own Stock library, deliberately avoiding scraped web content. That's a deep learning system with a non-technical moat: the data provenance is the differentiator, not the architecture. Enterprise customers buy Firefly partly because Adobe can indemnify outputs in a way competitors can't. It's a case study in how the relevant PM levers around deep learning often have nothing to do with the model itself.",
      },
      {
        kind: "ex",
        title: "Tesla Autopilot — what 'we can't explain decisions' means in practice",
        body: "Tesla's driving system is a deep neural network that takes raw camera input and outputs driving actions. When the car makes a surprising choice, even Tesla's engineers can't point to a specific reason — the decision is distributed across billions of weights. Regulators have repeatedly run into this opacity when investigating incidents, and Tesla's response is operational: more data, more evaluation, more shadow-mode testing, not better explanations. That's the deep-learning trade-off at industrial scale.",
      },
      {
        kind: "trans",
        text: "Three terms, three layers, and a precise relationship between them — which is the next thing you need to be able to draw on a whiteboard from memory.",
      },

      {
        kind: "h",
        number: "1.4",
        title: "The nested hierarchy explained",
        subtitle: "How AI, ML and DL relate — and why conflating them costs you credibility",
      },
      {
        kind: "take",
        text: "AI ⊃ ML ⊃ Deep Learning. Three nested circles, in that order, no exceptions. Holding the hierarchy in your head with that level of precision is the cheapest credibility upgrade available to a non-technical PM.",
      },
      {
        kind: "why",
        text: "In your next architecture review, when a staff engineer says 'this is ML but it's not deep learning', the look on their face will tell you whether you reacted in a way that earned the next ten minutes of their attention. The hierarchy is the price of admission to those conversations.",
      },
      {
        kind: "diagram",
        id: "ch1-ai-hierarchy",
        type: "nested",
        title: "The AI, ML, and DL Hierarchy",
        caption:
          "Every deep learning system is machine learning, and every machine learning system is AI, but the reverse is never true.",
      },
      {
        kind: "p",
        parts: [
          s("The cleanest way to hold these three terms in your head is as three nested circles. "),
          x(
            "AI is the outer circle: any system that behaves intelligently. Machine learning sits inside it: AI systems that learn from data. Deep learning sits inside ML: the subset that uses large neural networks.",
            "Every deep learning system is also ML and also AI. Every ML system is also AI. But plenty of AI is not ML (rule-based systems), and plenty of ML is not deep learning (classical statistical models).",
          ),
          s(
            " That asymmetry matters. The terms are not synonyms with different vibes — they describe progressively smaller and more specific commitments about how a system is built.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          s(
            "Because of the nesting, the terms carry different information densities when used precisely. ",
          ),
          x(
            "Saying 'we use AI' commits to almost nothing. Saying 'we use ML' commits to data-driven learning. Saying 'we use deep learning' commits to a specific architecture, a specific cost profile, and a specific set of operational realities.",
            "The more specific the term, the more you've told your listener — and the more they can press you on the next question. Vagueness travels the other direction.",
          ),
          s(
            " Vendors and marketers exploit this gradient relentlessly: they use the broadest accurate term to signal modernity while preserving deniability about what's actually inside.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          s(
            "The business consequence is that conflating these terms quietly misallocates resources and shapes wrong expectations across an organisation. ",
          ),
          x(
            "If your CEO walks out of an industry conference convinced that 'AI' and 'GPT' are interchangeable, they will ask your team to ship things that don't make sense for the underlying tech, and dismiss things that genuinely do.",
            "The cost shows up as months of misaligned roadmap, vendor contracts that don't deliver, and engineering hires for problems you don't have. None of it is recoverable cheaply.",
          ),
          s(
            " The same applies inside engineering: a product spec that asks for 'AI-powered search' is functionally three different specs depending on whether the team interprets it as a rules tweak, a learned ranker, or a generative answer layer. Each path takes a different quarter to build. ",
          ),
          x(
            "Using the most specific accurate term is a small habit that prevents a remarkable amount of organisational damage over time.",
            "It is also the single most reliable signal of an AI-literate operator. Engineers calibrate trust within the first few minutes of a meeting based on how you use these words.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          s(
            "What you do differently as a PM is treat the hierarchy as an active vocabulary, not a piece of trivia. ",
          ),
          x(
            "In every document, every meeting, every Slack thread, use the most specific accurate term you have evidence for — and ask for evidence when someone uses one looser than they should.",
            "If a vendor says 'AI' and you suspect they mean rules, ask what's being learned. If they say 'ML' and you suspect they mean a neural network, ask about model size and inference cost. The precision compounds.",
          ),
          s(
            " You'll start hearing it from the other side: engineers who upgrade their term-of-art when talking to you are signalling that they trust you with the detail. That bidirectional precision is what real AI literacy looks like in practice. ",
          ),
          x(
            "The PMs who get listened to on AI strategy are not the ones who know the most papers — they're the ones who never use 'AI' when they mean 'ML', and never use 'ML' when they mean 'deep learning'.",
            "It is a small, public, repeatable habit. And it produces outsized credibility precisely because so few people in product roles bother with it.",
          ),
        ],
      },
      {
        kind: "ex",
        title: "Figma — three layers in one product surface",
        body: "Figma's product spans all three layers cleanly. Auto-layout is rule-based AI (no learning). Smart selection and search ranking use classical ML trained on user behaviour. The newer generative features (text-to-design, AI-assisted edits) are deep learning via large models. A PM at Figma who calls all three 'our AI features' is not wrong, but is also not useful in any planning conversation. Calling them by their actual layers is what unlocks meaningful trade-off discussions about cost, latency, and quality.",
      },
      {
        kind: "ex",
        title: "Salesforce Einstein — the marketing layer hiding the hierarchy",
        body: "Salesforce brands almost every intelligent feature in its platform as 'Einstein', from lead scoring (classical ML) to Einstein GPT (deep learning LLMs) to rule-based workflow automations marketed alongside them. From the outside it looks like one capability; internally it's three radically different systems with different teams, costs and reliability profiles. PMs evaluating Salesforce for an enterprise deal who can't decode which Einstein is which end up over-paying for capabilities they don't need and under-scoping the ones they do.",
      },
      {
        kind: "ex",
        title: "Duolingo — moving down the hierarchy deliberately",
        body: "Duolingo's lesson sequencing started as rules, moved to classical ML (a model called Birdbrain that predicts which exercises a learner needs next), and selectively added deep learning for things like speech evaluation and conversational practice. The company is unusually public about which layer each feature uses, partly because that clarity is what lets them control unit economics in a freemium product. It's a working example of using the hierarchy as a roadmap tool, not just a vocabulary one.",
      },
      {
        kind: "trans",
        text: "Once you can name the layers, the next skill is recognising when the layer being claimed isn't the layer being shipped — which usually starts with one specific question.",
      },

      {
        kind: "h",
        number: "1.5",
        title: "Rule-based systems vs learned systems",
        subtitle: "The question that exposes fake AI in vendor pitches",
      },
      {
        kind: "take",
        text: "If you could write the system as a list of if-statements, it's not machine learning — no matter what the slide says. The distinction is binary, auditable, and the single most useful diagnostic question in your AI vocabulary.",
      },
      {
        kind: "why",
        text: "In every vendor procurement call you'll run for the rest of your career, this is the question that saves you from buying a rules engine at AI prices. Ask it in the first ten minutes; the answer changes everything that comes after.",
      },
      {
        kind: "p",
        parts: [
          s("A rule-based system is software where every behaviour was written down by a human. "),
          x(
            "If income > $50k AND credit_score > 700 → approve loan. If subject_line contains 'lottery' → flag email. If user hasn't logged in for 14 days → send re-engagement email.",
            "These are deterministic. Same input, same output, every time. The logic is right there in the code and a human reviewer can audit it line by line.",
          ),
          s(
            " A learned system has no explicit rules. It has a trained model — a pile of weights — that maps inputs to outputs. The 'rules' are implicit and statistical, and they shift every time the model is retrained.",
          ),
        ],
      },
      {
        kind: "diagram",
        id: "ch1-paradigm-shift",
        type: "comparison",
        title: "The Paradigm Shift in Software Engineering",
        caption:
          "Traditional software requires a human to explicitly write the rules; machine learning requires a human to provide the correct answers so the algorithm can discover the rules.",
      },
      {
        kind: "p",
        parts: [
          s(
            "Both are legitimate. They are just different products with different cost structures and different failure modes. ",
          ),
          x(
            "Rule-based systems are cheap to build, fast to run, easy to audit, and behave predictably under regulation. That's exactly why tax software, postcode lookups, business workflows, and most compliance logic live there.",
            "If the pattern is stable and writable, rules win on every operational dimension that matters. The only reason to leave them is that the pattern isn't stable or writable.",
          ),
          s(
            " Learned systems earn their keep when the pattern is too subtle, too high-dimensional, or too dynamic for a human to capture by hand. Recommendation, fraud, language, vision — all impossible to spec out as rules at any reasonable accuracy.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          s(
            "The business consequence is that the cost gap between the two is roughly an order of magnitude, in both directions. ",
          ),
          x(
            "Rules-based features ship in days, run for fractions of a cent, and almost never surprise anyone. Learned systems take months to ship properly, cost real money to run, and surprise everyone occasionally.",
            "Choosing the wrong one for the problem is expensive: rules where you needed learning produce a brittle product; learning where you needed rules produces a slow, opaque, expensive feature that does what an if-statement could have done.",
          ),
          s(
            " The asymmetry that vendors exploit is that 'learned' sounds more sophisticated, so rules systems frequently get dressed up as ML in sales material. The dress-up doesn't cost the vendor anything — it costs you in misaligned expectations after the deal closes. ",
          ),
          x(
            "The honest diagnostic is one sentence long: could you, in principle, have written this as a list of if-statements?",
            "If the answer is yes — even a long list — it's a rule-based system. The 'AI' label is decoration, and the product should be evaluated as a rules engine on rules-engine metrics.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          s(
            "What you do differently as a PM is ask the rules-versus-learning question early and out loud, on every AI feature and every vendor evaluation. ",
          ),
          x(
            "Ask the engineer building it. Ask the vendor selling it. Ask the analyst writing about it. The answer is either crisp or evasive, and either tells you what you need to know.",
            "Crisp answers ('it's a gradient-boosted classifier on these features') are a green flag, even if you don't fully understand the technique. Evasive answers ('our proprietary intelligence layer') are a red flag, always.",
          ),
          s(
            " You'll also stop being embarrassed about shipping rules. A rule-based feature shipped fast and explained honestly almost always outperforms a learned feature shipped late and explained badly. ",
          ),
          x(
            "'We considered ML and chose rules because the pattern is stable' is one of the most senior-sounding sentences a PM can say in a roadmap review, and almost nobody says it.",
            "It signals that you understand the trade-off and made a deliberate choice, which is exactly the disposition the AI hype cycle is currently selecting against.",
          ),
        ],
      },
      {
        kind: "ex",
        title: "TurboTax — the rules engine no one is embarrassed about",
        body: "TurboTax encodes the U.S. tax code as a vast decision tree of rules. It is one of the most successful pieces of consumer software ever built, and it contains essentially zero machine learning in the parts that calculate your taxes. Intuit doesn't market it as AI, and that honesty is part of the trust. The product lesson is that rules are not a downgrade — for codified domains, they are the correct choice, and pretending otherwise would actively hurt the product.",
      },
      {
        kind: "ex",
        title: "Calendly — 'AI scheduling' that's really a calendar",
        body: "Calendly's core scheduling is a rules engine: it finds open slots in two calendars and applies user preferences for working hours, buffer time, and meeting length. The company has historically resisted calling this AI, which is part of why enterprise buyers trust it. When competitors launched 'AI scheduling assistants' that turned out to be the same rules logic with a generative wrapper, customers noticed quickly and the category narrative correctly settled back to 'scheduling automation'. The market punished the dishonest framing.",
      },
      {
        kind: "ex",
        title: "Klarna's customer service overhaul — the inverse case",
        body: "Klarna publicly replaced large portions of its customer-service workflow with an LLM-based agent, reporting work equivalent to 700 full-time agents in the first month. The interesting detail is that they were explicit about what was learned (the conversational layer) versus what stayed as rules (refund logic, eligibility, escalation paths). That layered honesty is what made the announcement credible to operators rather than a marketing claim. Just as you shouldn't dress rules up as ML, you also shouldn't hide the rules that hold a real ML system together.",
      },
      {
        kind: "trans",
        text: "Knowing the diagnostic is half the work. Having a reusable script for applying it in every vendor conversation is the other half — and it fits on a sticky note.",
      },

      {
        kind: "h",
        number: "1.6",
        title: "PM decision lens: spotting real AI vs marketing AI",
        subtitle: "The 3 questions to ask before trusting any 'AI-powered' claim",
      },
      {
        kind: "take",
        text: "Three questions, asked in order, separate real AI work from marketing veneer in under twenty minutes. The questions are free to ask and expensive to skip — they are the closest thing the field has to a universal due-diligence script.",
      },
      {
        kind: "why",
        text: "Next time you sit through a vendor demo or an internal pitch with 'AI-powered' in the deck, ask these three questions in order and watch the room. The PMs who consistently ask them get put on AI strategy committees; the ones who don't get handed the rollout.",
      },
      {
        kind: "p",
        parts: [
          s("Question one: is there a trained model, or are these hand-written rules? "),
          x(
            "This is the rules-versus-learning diagnostic from the previous section, applied as the opening move. If the answer is 'no model, just rules', the conversation is no longer about AI — it's about software, with all the normal evaluation criteria.",
            "If the answer is vague — 'it's our proprietary intelligence layer' — treat that as a 'no' until proven otherwise. Real ML teams answer this question crisply because they're proud of the answer.",
          ),
          s(
            " A useful follow-up: 'what kind of model, and what does it predict?' One sentence of specificity here separates a serious team from a marketing one. You don't need to understand the technique; you need to hear that they do.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          s("Question two: what was it trained on, and how do you measure when it's wrong? "),
          x(
            "Every real ML system has a training dataset, a held-out evaluation set, and at least one quantitative quality metric (accuracy, precision, recall, F1, AUC, BLEU — the specific metric matters less than that there is one).",
            "If the vendor can't tell you the dataset or the metric, the model either doesn't exist or hasn't been evaluated. Both are disqualifying for any use case that matters.",
          ),
          s(
            " 'It just works really well' is not an evaluation metric. Neither is a customer logo wall. Push politely until you get a number with a denominator — precision on what set, measured how, refreshed when. ",
          ),
          x(
            "Bonus follow-up: 'what does it look like when it's wrong?' Mature teams have a vivid, specific answer; immature ones produce a hedge.",
            "Knowing the failure modes is how you scope the human-in-the-loop layer, the guardrails, and the support load. Without that answer, you cannot price the product into your stack honestly.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          s("Question three: what happens when it's wrong, and how do you retrain? "),
          x(
            "A mature ML system has a feedback loop: errors get captured, labelled, folded into the next training run, and the resulting model is re-evaluated before it ships. The retraining cadence is on a roadmap somewhere.",
            "If there is no answer here, the model is frozen — and quietly getting worse as the world shifts around it. A frozen model in a dynamic domain is a slow-motion outage you've signed a multi-year contract for.",
          ),
          s(
            " The retraining story is as important as the launch story. Anyone can ship a model once; the operational discipline is in keeping it accurate as reality changes underneath it. ",
          ),
          x(
            "The third question is also where most vendor pitches collapse, because most vendor pitches are optimised for the demo and not for the second year of the contract.",
            "Asking it early is a kindness: it tells the serious vendors that you're worth talking to, and it tells the unserious ones that you're not the buyer they were hoping for.",
          ),
        ],
      },
      {
        kind: "p",
        parts: [
          s(
            "What you do differently as a PM is internalise these three questions until they're automatic. ",
          ),
          x(
            "Memorise them. Write them on a sticky note. Bring them to every demo, every vendor call, every architecture review, every roadmap meeting where someone says 'AI-powered' without immediately defining the term.",
            "They cost nothing to ask, take under twenty minutes to work through, and reliably separate the AI work that's worth your team's quarter from the AI work that isn't.",
          ),
          s(
            " You'll also use them inward. The next time your own team proposes an 'AI-powered' feature, the three questions tell you whether the proposal is ready for a PRD or still needs a discovery sprint. ",
          ),
          x(
            "That symmetry — applying the same rigour to your own roadmap that you apply to vendor pitches — is what makes a PM trusted on AI strategy across an organisation.",
            "The trust compounds. Within a year of consistently asking these three questions, you'll be the person engineering teams loop in early on AI decisions, and the person execs ask before they sign anything that says 'AI' on the order form.",
          ),
        ],
      },
      {
        kind: "ex",
        title: "The 'AI assistant' that was a regex — a real procurement story",
        body: "A mid-market SaaS company evaluated an 'AI-powered customer intent classifier' for $80K/year. Three questions in, the vendor admitted the system was a list of 400 regex patterns hand-maintained by their support team — no model, no training data, no evaluation metric. The buyer renegotiated to a $12K/year rules-engine contract and used the savings to build a real ML classifier internally the following quarter. The three questions paid for themselves several times over in a single call.",
      },
      {
        kind: "ex",
        title: "Intercom Fin — a vendor that passes the three questions",
        body: "Intercom's Fin support agent is explicit on all three fronts: it's an LLM-based system with retrieval over your help centre, evaluation metrics are published per customer (resolution rate, escalation rate), and the retrieval index updates continuously as content changes. None of that is in the marketing copy; all of it is one click into the docs. The signal isn't that they have the answers — it's that they expose them without being pushed, which is what you want to see in a serious AI vendor.",
      },
      {
        kind: "ex",
        title: "Internal AI features — applying the lens to your own team",
        body: "A PM at a fintech proposed an 'AI-powered transaction categorisation' feature in a quarterly planning session. Applying the three questions to her own proposal: there was no model yet (rules), no labelled dataset (the data team hadn't started), and no retraining plan (no one had thought about it). The proposal was rebadged as a rules-based v1 with an ML upgrade path scoped for the following quarter, and shipped on time as rules. The same lens that protects you from vendor hype protects you from your own.",
      },
      {
        kind: "trans",
        text: "Six sections in, you have the vocabulary, the hierarchy, the diagnostic, and the script. The chapter quiz is where you find out whether you have the instincts.",
      },
    ],
    examples: [],
    quiz: [
      {
        q: "A roadmap deck has a slide titled 'AI-powered onboarding'. The feature is a series of if-statements that show different welcome screens based on the user's role, plan, and signup source. Which of these is the most credibility-preserving thing to say in the review?",
        options: [
          "'Great — let's make sure we benchmark it against deep learning approaches.'",
          "'This is a rule-based system that may be marketed as AI, but it isn't ML — let's evaluate it as a rules engine.'",
          "'We should add a neural network so it counts as real AI.'",
          "'AI and rules are the same thing at this scale — the distinction doesn't matter.'",
        ],
        correct: 1,
        correctFeedback:
          "Exactly. Rules-based logic can carry an AI label loosely, but the operational reality is a rules engine and that's how it should be scoped, priced, and reviewed. Calling it out doesn't kill the feature — it lets the team plan honestly.",
        wrongFeedback:
          "The chapter opens on this exact mistake: treating 'AI' as a quality bar rather than a behaviour label. The question isn't 'how do we make it more AI?' — it's 'what kind of AI is this, and is that the right choice for this problem?' Re-read section 1.1.",
      },
      {
        q: "An engineer says the recommendation model 'works great in the test set but performance dropped 8% on enterprise accounts last quarter, and we think it's drift'. What is the underlying issue she's describing?",
        options: [
          "A bug in the recommendation code that needs to be patched.",
          "The model was trained on data that no longer reflects current enterprise behaviour, so its predictions are degrading even though nothing changed in the code.",
          "The test set is the wrong size and needs to be expanded.",
          "The model needs to be replaced with a deep learning version.",
        ],
        correct: 1,
        correctFeedback:
          "Right. Concept drift is the silent bug class of ML systems: no stack trace, no code change, just quietly worsening metrics as the world shifts. The fix is operational — retraining cadence, fresh evaluation data — not a code patch.",
        wrongFeedback:
          "Drift isn't a bug in the traditional sense; nothing about the code is broken. The model is a snapshot of past data and the world has moved on. Re-read section 1.2 on why ML features behave more like agricultural products than mechanical ones.",
      },
      {
        q: "A founder asks why your team can't 'just explain' why the deep-learning fraud model declined a specific transaction, the way the old rules engine could. Which response best reflects what's actually going on?",
        options: [
          "'We can — we just need to ask the engineers to log the rules the model used.'",
          "'Deep models distribute their behaviour across billions of weights, so per-decision explanations aren't directly available — what we can do is publish evaluation metrics, build a human-review path, and use simpler models where regulation requires explanation.'",
          "'Deep learning is just ML, and ML is fully explainable.'",
          "'We should remove the AI entirely until we can explain every decision.'",
        ],
        correct: 1,
        correctFeedback:
          "Right. The honest answer is operational: real evaluation, review paths, and a deliberate choice about where deep learning is and isn't appropriate. That framing turns an unanswerable question into a manageable one.",
        wrongFeedback:
          "Deep models genuinely don't have readable rules — their 'knowledge' lives in weight matrices that don't map to human concepts. The PM job is to convert 'why did it decide this?' into a conversation about evaluation, guardrails, and human review. Re-read section 1.3.",
      },
      {
        q: "Which statement most accurately describes the relationship between AI, machine learning, and deep learning?",
        options: [
          "They're three names for substantially the same set of techniques.",
          "Deep learning is a kind of machine learning, which is one approach to AI; all deep learning is ML and all ML is AI, but not the reverse.",
          "AI is a kind of machine learning, which is a kind of deep learning.",
          "Machine learning and deep learning are separate fields that occasionally overlap.",
        ],
        correct: 1,
        correctFeedback:
          "Exactly. Nested circles, in that order, no exceptions. Holding this precisely is the cheapest credibility upgrade in your AI vocabulary.",
        wrongFeedback:
          "The relationship is strict containment: deep learning ⊂ machine learning ⊂ artificial intelligence. Every DL system is ML and AI; not all AI is ML, and not all ML is DL. Re-read section 1.4.",
      },
      {
        q: "A vendor pitches an 'AI-powered customer health score'. In the demo, they admit there's no trained model — the score is a weighted sum of nine product-usage signals chosen by their consulting team. Which framing is most accurate?",
        options: [
          "It's machine learning, because it produces a score from data.",
          "It's deep learning, because the score combines multiple signals.",
          "It's a rule-based system that has been marketed as AI; it may still be useful, but it should be evaluated on rules-engine criteria rather than on ML metrics.",
          "It's not software at all.",
        ],
        correct: 2,
        correctFeedback:
          "Right. A hand-tuned weighted sum is a rules engine, not ML. That doesn't make it bad — it makes it a different product, with different operational properties, and you should evaluate it accordingly.",
        wrongFeedback:
          "Combining signals or producing a score isn't what makes something ML. ML requires that the system learned the combination from labelled data, not that a consultant chose the weights. Re-read section 1.5.",
      },
      {
        q: "You have twenty minutes with an 'AI-powered' vendor in a procurement call. Which set of three questions, asked in order, most reliably separates real AI work from marketing veneer?",
        options: [
          "'How fast is it?', 'What language is it written in?', 'Does it run on the cloud?'",
          "'Is there a trained model or is this rules?', 'What was it trained on and how is performance measured?', 'What happens when it's wrong and how do you retrain?'",
          "'Which LLM do you use?', 'Are you GPT-4 or Claude?', 'Do you have a chatbot?'",
          "'Who are your biggest customers?', 'When was the company founded?', 'What's your pricing?'",
        ],
        correct: 1,
        correctFeedback:
          "Exactly. Model vs. rules, training data and evaluation, retraining and failure handling — those three, in order, expose almost every gap between an AI pitch and an AI product. The questions are free to ask and expensive to skip.",
        wrongFeedback:
          "The diagnostic isn't about speed, cloud, or which LLM is under the hood — it's about whether anything is being learned, whether anyone is measuring it, and whether it stays accurate as the world changes. Re-read section 1.6.",
      },
    ],
  },
  {
    slug: "pm-how-models-learn",
    number: 2,
    shortTitle: "How Models Learn",
    title: "How Models Learn",
    readingMinutes: 20,
    summary: "Parameters, loss functions, and gradient descent — demystified.",
    keyTakeaway:
      "Training is the process of adjusting parameters to minimize the loss function using gradient descent.",
    pmCallout: "When the model fails to generalize, your job is to fix the data, not the code.",
    examples: [],
    body: [
      {
        kind: "h3",
        title: "What is a parameter (weight)",
        subtitle: "2.1: What is a parameter (weight)",
      },
      {
        kind: "take",
        text: 'Parameters are the internal settings a model adjusts during training; they are the learned "knowledge" of the system, not hand-coded logic.',
      },
      {
        kind: "why",
        text: "When a vendor quotes you for fine-tuning, they are charging you to adjust these billions of knobs using your proprietary data. If your data isn't clean, you are paying to turn the knobs in the wrong direction.",
      },
      {
        kind: "p",
        parts: [
          "Walk into a server room hosting a modern large language model and you won't find a database of facts or a hard drive full of rules. Instead, you'll find an enormous matrix of decimal numbers that define exactly how the model reacts to any input it receives. ",
          {
            text: "A parameter, or weight, is simply a numerical value inside the model that determines how much importance to give to a specific piece of input data.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " Think of them as billions of tiny volume knobs on an audio mixer, where every knob controls the signal passing from one artificial neuron to the next. ",
          {
            text: "When we say a model 'learns,' we literally mean it is twisting these billions of knobs up and down until the output matches what we want to see.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
        ],
      },
      {
        kind: "p",
        parts: [
          "In a traditional software application, an engineer writes logic that dictates how the system behaves. ",
          {
            text: "In a machine learning system, the logic is replaced by the configuration of these parameters, which the system discovers for itself through trial and error.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          ' If the model is trying to detect fraudulent transactions, one parameter might strongly amplify the signal from the "account age" feature, while another suppresses the signal from the "transaction amount" feature. The total behaviour of the model is the sum of billions of these microscopic amplifications and suppressions. ',
          {
            text: "This is why modern AI systems are so difficult to audit; their decision-making process is smeared across billions of individual numbers rather than neatly organized in a readable script.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
        ],
      },
      {
        kind: "p",
        parts: [
          'The business consequence of this architecture is that parameters are the actual asset you are building or buying. When OpenAI releases a "70 billion parameter model," the "70 billion" refers to the sheer number of these adjustable knobs, which directly correlates to the model\'s capacity to learn complex patterns. ',
          {
            text: "However, more parameters also mean higher computational costs to run the model in production, leading to a direct trade-off between the model's intelligence and your cloud hosting bill.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " A massive model might give you better text summaries, but it will cost you significantly more per API call than a smaller model with fewer parameters.",
        ],
      },
      {
        kind: "p",
        parts: [
          "What a PM does differently now is treat model size and parameter count as a core constraint in the product spec. You don't just ask for the smartest model available; you ask for a model whose parameter count aligns with your latency requirements and unit economics. ",
          {
            text: "If you are building a real-time autocomplete feature, you cannot afford the latency of a massive parameter model, and must instead scope a smaller model that runs fast enough to be useful.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " You must also recognize that fine-tuning is literally the process of updating these parameters, which permanently alters the model's behavior based on the examples you provide.",
        ],
      },
      {
        kind: "ex",
        title: "Spotify's Audio Profiles",
        body: 'Spotify\'s recommendation engine uses millions of parameters to represent the acoustic characteristics of songs. One parameter might loosely correlate with "acousticness," while another correlates with "danceability," but they are just numbers discovered during training. The product team cannot easily manually tweak a specific parameter to fix a bad recommendation, highlighting the opaque nature of learned weights.',
      },
      {
        kind: "ex",
        title: "Meta's Llama 3 Releases",
        body: "Meta releases its open-source language models in different sizes, such as 8B (8 billion parameters) and 70B (70 billion parameters). Product teams choose the 8B model for fast, cheap tasks deployed on mobile devices, and the 70B model for complex reasoning on cloud servers. The parameter count is the primary lever PMs pull to balance capability against cost.",
      },
      {
        kind: "ex",
        title: "Grammarly's Tone Detection",
        body: "Grammarly's tone classifier relies on a specific set of parameters that map word combinations to emotional states. When they update the model to better understand sarcastic tones, they are updating the underlying parameter values through new training data, not writing new rules for sarcasm. This means improvements are data-driven rather than engineering-driven.",
      },
      {
        kind: "trans",
        text: "Before the model can twist these billions of knobs into the right configuration, it first needs a mathematical way to realize that it's making a mistake.",
      },
      { kind: "h3", title: "What is a loss function", subtitle: "2.2: What is a loss function" },
      {
        kind: "take",
        text: "The loss function is the mathematical definition of a mistake; it tells the model exactly how wrong its current prediction is so it can adjust.",
      },
      {
        kind: "why",
        text: 'If you don\'t explicitly define what a "mistake" is for your product, the engineering team will choose a default metric that might optimize for the wrong behavior. You must align the loss function with your actual business goals.',
      },
      {
        kind: "p",
        parts: [
          "Imagine shooting an arrow at a target while blindfolded, and a coach yelling out exactly how many inches wide you missed the bullseye. That coach is the loss function. ",
          {
            text: "A loss function is a mathematical formula that calculates the difference between what the model predicted and what the correct answer actually is.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " If a model predicts a house will sell for $400,000 and it actually sells for $500,000, the loss function calculates a massive penalty. ",
          {
            text: "The entire goal of the training process is to minimize this penalty, driving the loss as close to zero as possible over millions of examples.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
        ],
      },
      {
        kind: "p",
        parts: [
          "You cannot train a model without explicitly telling it what failure looks like. ",
          {
            text: "Because models are blind optimization engines, they will relentlessly optimize whatever metric the loss function defines, even if it leads to absurd outcomes in the real product.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " If you train a spam filter and the loss function equally penalizes missing a spam email and accidentally blocking a legitimate email, the model will treat both errors as identical. ",
          {
            text: "In reality, blocking a legitimate email is a catastrophic user experience, so the loss function must be weighted heavily to punish false positives more than false negatives.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
        ],
      },
      {
        kind: "p",
        parts: [
          "The business consequence is that the loss function encodes the product's values and trade-offs into the core algorithm. A model trained to maximize watch time on a video platform will learn to promote increasingly extreme content, because extreme content keeps users engaged. ",
          {
            text: "The model isn't malicious; it is simply driving its loss function to zero as efficiently as possible, completely blind to the secondary effects on the platform's ecosystem.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " Changing the behavior of the system usually requires rewriting the loss function to include penalties for toxic content or clickbait, rather than just tweaking the UI.",
        ],
      },
      {
        kind: "p",
        parts: [
          "What a PM does differently now is participate directly in the design of the loss function. You don't write the math, but you define the penalty weights for different types of errors. ",
          {
            text: "If you are launching a medical diagnostic tool, you must explicitly instruct engineering that a false negative (missing a disease) carries a much higher penalty in the loss function than a false positive (a false alarm).",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " You must also constantly monitor whether minimizing the loss function in training is actually translating into better user outcomes in production, or if the model has found a loophole.",
        ],
      },
      {
        kind: "ex",
        title: "YouTube's Recommendation Algorithm",
        body: 'YouTube originally optimized its models purely for clicks, leading to an explosion of clickbait thumbnails because the loss function rewarded clicks above all else. They eventually had to change the loss function to optimize for "watch time" and later "user satisfaction," proving that whatever you measure is exactly what the model will deliver.',
      },
      {
        kind: "ex",
        title: "Uber's ETA Predictions",
        body: "Uber's ETA models use a loss function that penalizes underestimating a trip duration slightly more than overestimating it. From a product perspective, a user is much angrier if a ride takes five minutes longer than promised than if it arrives five minutes early. The loss function mathematically encodes this human psychology.",
      },
      {
        kind: "ex",
        title: "Stripe Radar's Fraud Detection",
        body: "Stripe's fraud models must balance catching fraudulent charges against blocking legitimate transactions. The loss function is carefully tuned because a false positive (blocking a good customer) damages merchant trust immediately. The product team ensures the loss function aligns with the acceptable risk tolerance for different merchant categories.",
      },
      {
        kind: "trans",
        text: "With the penalty defined, the model needs a way to actually generate a prediction and see how it performs.",
      },
      { kind: "h3", title: "Forward pass explained", subtitle: "2.3: Forward pass explained" },
      {
        kind: "take",
        text: "A forward pass is the act of pushing data through the model's layers to generate a single prediction; it is the fundamental action of inference.",
      },
      {
        kind: "why",
        text: "Every forward pass costs compute, money, and time. When scoping latency requirements for a real-time feature, you are directly dictating how fast the forward pass must execute.",
      },
      {
        kind: "p",
        parts: [
          "To see the loss function in action, the model first has to make a guess. ",
          {
            text: "A forward pass is the process where raw input data enters the model, flows through the network of parameters, and emerges on the other side as a final prediction.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          ' When you upload an image of a dog to an AI classifier, the pixels flow through the first layer of parameters to detect edges, then the next layer to detect shapes, until the final layer outputs the word "dog." ',
          {
            text: "During a forward pass, the model is simply applying its current knowledge; it is not learning or updating its parameters at all.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
        ],
      },
      {
        kind: "p",
        parts: [
          "This unidirectional flow of data is the operational heartbeat of every machine learning system in production. ",
          {
            text: "When a user interacts with your AI feature, they are triggering a forward pass, and the time it takes for the data to travel through the network is the latency the user experiences.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " In a deep neural network with hundreds of layers, the data must be mathematically multiplied against billions of parameters before a result is produced. ",
          {
            text: "Because these calculations are so heavy, forward passes require specialized hardware like GPUs to execute quickly enough for consumer applications.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
        ],
      },
      {
        kind: "p",
        parts: [
          "The business consequence is that the computational cost of your product scales linearly with the number of forward passes it performs. If you build a feature that predicts text as the user types, you are triggering a forward pass on every single keystroke. ",
          {
            text: "This architecture can quickly bankrupt a startup if the unit economics of the forward pass exceed the revenue generated by the user's session.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " Optimization techniques like caching, batching requests, or using smaller models are all strategies designed to reduce the sheer cost of running forward passes at scale.",
        ],
      },
      {
        kind: "p",
        parts: [
          "What a PM does differently now is treat the forward pass as a budgeted resource. You must define the acceptable latency for the user experience and work backward to determine what size model the engineering team can deploy. ",
          {
            text: "You will also make product decisions to minimize unnecessary forward passes, such as waiting for the user to pause typing before triggering the autocomplete model, rather than predicting on every character.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " By understanding that every prediction is a discrete, expensive calculation, you stop treating AI as magic and start managing it as infrastructure.",
        ],
      },
      {
        kind: "ex",
        title: "GitHub Copilot's Debouncing",
        body: "GitHub Copilot doesn't trigger a forward pass for every single character a developer types, because the compute costs would be astronomical and the UI would flicker wildly. Instead, the product uses debouncing—waiting for a brief pause in typing—before initiating the forward pass to generate the code suggestion, saving massive amounts of compute.",
      },
      {
        kind: "ex",
        title: "Apple's FaceID",
        body: "FaceID relies on a localized forward pass running directly on the iPhone's internal neural engine. The product requirement was that the forward pass had to execute in a fraction of a second without draining the battery or requiring an internet connection. This strict latency constraint forced the engineering team to design an incredibly lightweight model.",
      },
      {
        kind: "ex",
        title: "Netflix's Batch Inference",
        body: "Netflix generates personalized movie recommendations for millions of users, but they do not run the forward pass in real-time when you log in. Instead, they run forward passes in massive batches overnight when compute is cheap, caching the results so the UI loads instantly the next day. This architectural choice decouples the forward pass from the user's session.",
      },
      {
        kind: "trans",
        text: "Once the forward pass generates a prediction, and the loss function measures the mistake, the model must finally correct itself.",
      },
      {
        kind: "h3",
        title: "Backpropagation explained",
        subtitle: "2.4: Backpropagation explained",
      },
      {
        kind: "take",
        text: "Backpropagation is the feedback loop that calculates exactly how much each parameter contributed to an error, allowing the model to learn.",
      },
      {
        kind: "why",
        text: 'Understanding backpropagation reveals why training is so much more expensive and complex than inference. It explains why you can\'t just "teach the model a new rule" in real-time.',
      },
      {
        kind: "p",
        parts: [
          "If the forward pass is the model taking a test, backpropagation is the teacher grading the test and showing the model exactly where it went wrong. ",
          {
            text: "Backpropagation is the algorithm that traces an error backwards through the network to determine which specific parameters were responsible for the mistake.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " After the loss function calculates the total error, backpropagation acts like a forensic investigator, moving in reverse from the final output layer all the way back to the input layer. ",
          {
            text: "It assigns a slice of the blame to every single parameter that played a role in generating the incorrect prediction.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
        ],
      },
      {
        kind: "p",
        parts: [
          "This reverse journey requires storing the intermediate states of the entire network during the forward pass. ",
          {
            text: "Because it has to track the mathematical derivatives for billions of connections simultaneously, backpropagation is massively memory-intensive and computationally heavy.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " If a neuron incorrectly amplified a signal that led to a false positive, backpropagation calculates exactly how much that specific volume knob needs to be turned down to prevent the same mistake next time. ",
          {
            text: "This is the actual mechanism of 'learning'—the meticulous, systemic assignment of blame and correction across the entire matrix.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
        ],
      },
      {
        kind: "p",
        parts: [
          "The business consequence is the stark division between the cost of training a model and the cost of running it. Training requires constant backpropagation, consuming clusters of expensive GPUs running for weeks or months. ",
          {
            text: "Inference—using the model in your product—only requires the forward pass, which is drastically cheaper and faster because it doesn't need to assign blame or update weights.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " This is why foundational models are trained by a handful of tech giants with massive capital, while thousands of startups can afford to run inference on those models via APIs.",
        ],
      },
      {
        kind: "p",
        parts: [
          "What a PM does differently now is stop expecting real-time, continuous learning from production models. Because backpropagation is so heavy, models do not dynamically update their parameters live while users interact with them. ",
          {
            text: "When a user flags a bad output, you cannot simply correct the model on the fly; that feedback must be collected, curated, and fed into a scheduled retraining pipeline where backpropagation can be run offline.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " You must design your product's feedback loops to capture data for the next training cycle, rather than promising users that the system will instantly learn from their corrections.",
        ],
      },
      {
        kind: "ex",
        title: "ChatGPT's Thumbs Down Button",
        body: "When you click the thumbs down button on a bad ChatGPT response, the model does not instantly learn from your feedback. That feedback is stored in a database and curated by OpenAI engineers. It will eventually be used in a massive, offline backpropagation run (reinforcement learning from human feedback) to update the model weeks or months later.",
      },
      {
        kind: "ex",
        title: "Tesla's Shadow Mode",
        body: 'Tesla vehicles constantly run autopilot models in "shadow mode," making predictions without taking control. When a human driver intervenes and does something different than the model predicted, the discrepancy is logged. This data is sent back to Tesla\'s servers, where heavy backpropagation is run offline to update the global model for the next fleet-wide software update.',
      },
      {
        kind: "ex",
        title: "Midjourney's Image Generation",
        body: "When Midjourney generates an image that perfectly matches a prompt, the forward pass is incredibly fast. However, teaching the model to understand new artistic styles requires backpropagation across billions of images. The separation of these processes allows Midjourney to serve millions of users quickly while handling the heavy lifting of learning in massive private data centers.",
      },
      {
        kind: "trans",
        text: "With backpropagation calculating the blame, the model relies on a specific mathematical strategy to actually turn the volume knobs in the right direction.",
      },
      {
        kind: "h3",
        title: "Gradient descent without the math",
        subtitle: "2.5: Gradient descent without the math",
      },
      {
        kind: "take",
        text: "Gradient descent is the directional compass the model uses to incrementally update its parameters and find the lowest possible error.",
      },
      {
        kind: "why",
        text: "Gradient descent guarantees the model will try to find a solution, but it doesn't guarantee it will find the best one. If your training stalls or the model gets stuck, this is the mechanism that is failing.",
      },
      {
        kind: "p",
        parts: [
          "Imagine you are blindfolded and dropped onto the side of a mountain, and your only goal is to find the lowest point in the valley. You cannot see the landscape, so you feel the ground with your feet, take a step in the direction that goes downhill, and repeat. ",
          {
            text: "Gradient descent is exactly this process: a step-by-step mathematical algorithm that constantly nudges the model's parameters in the direction that reduces the error.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          ' The "gradient" is simply the slope of the hill, representing how steeply the error is increasing or decreasing. ',
          {
            text: "By always moving opposite to the gradient—stepping downhill—the model incrementally approaches the optimal configuration where the loss is minimized.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
        ],
      },
      {
        kind: "p",
        parts: [
          "The size of the step you take down the mountain is critical, and in machine learning, this is called the learning rate. ",
          {
            text: "If the learning rate is too small, the model takes microscopic steps and training takes forever to reach the bottom.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " Conversely, if the learning rate is too large, the model takes massive leaps, potentially overshooting the lowest point entirely and bouncing around the walls of the valley. ",
          {
            text: "Tuning the learning rate is one of the most delicate parts of training a model, requiring constant adjustment by engineers to ensure gradient descent converges smoothly.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
        ],
      },
      {
        kind: "p",
        parts: [
          "The business consequence is that training is an empirical, highly unpredictable process rather than a deterministic compilation. When you compile traditional software, it either works or throws an error instantly. ",
          {
            text: "When you run gradient descent, the model might get trapped in a 'local minimum'—a small dip on the side of the mountain—believing it has reached the bottom when a much better solution exists elsewhere.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " Engineering teams can spend weeks burning expensive compute resources only to realize gradient descent has plateaued prematurely, requiring them to restart the process with different hyperparameter settings.",
        ],
      },
      {
        kind: "p",
        parts: [
          "What a PM does differently now is build buffer time into roadmap estimates for model training. You cannot treat training a model like an overnight build process; it is an experimental search that frequently fails or stalls. ",
          {
            text: "When engineering says the model 'isn't converging,' they mean gradient descent is stuck, and you must protect their time to debug the learning rate or dataset rather than demanding an immediate release.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " You learn to ask for regular updates on the training loss curve, ensuring the team is actually making progress down the mountain before promising the feature to marketing.",
        ],
      },
      {
        kind: "ex",
        title: "OpenAI's Training Runs",
        body: "During the development of large models like GPT-4, OpenAI uses massive clusters of GPUs to run gradient descent for months at a time. Because a single training run can cost tens of millions of dollars, getting stuck in a local minimum is a catastrophic financial risk. They employ specialized teams dedicated entirely to monitoring the learning rate and ensuring the descent is stable.",
      },
      {
        kind: "ex",
        title: "Pinterest's Visual Search",
        body: "When Pinterest trains its visual search models to recognize similar objects, gradient descent is used to adjust the weights so that images of identical items are grouped closely together in the mathematical space. If the learning rate is misconfigured, the model might abruptly collapse and start grouping everything together, forcing the team to halt the run and revert to an earlier checkpoint.",
      },
      {
        kind: "ex",
        title: "Duolingo's Spaced Repetition",
        body: "Duolingo uses a model to predict the probability that a user will remember a specific word. They train this model using gradient descent to minimize the difference between predicted recall and actual user performance. If the model fails to converge, users might be shown words too frequently or too rarely, directly impacting the core learning experience and retention metrics.",
      },
      {
        kind: "diagram",
        id: "ch2-training-loop",
        type: "flow",
        title: "The Training Loop",
        caption: "How the four components work together to iteratively improve the model.",
      },
      {
        kind: "trans",
        text: "Taking one step down the mountain isn't enough; the model must repeat this process millions of times over the entire dataset.",
      },
      { kind: "h3", title: "Epochs and iterations", subtitle: "2.6: Epochs and iterations" },
      {
        kind: "take",
        text: "An epoch is one full pass through the entire training dataset; training requires many epochs for the model to fully absorb the patterns.",
      },
      {
        kind: "why",
        text: "The number of epochs dictates how long training takes and how much compute it burns. You have to balance the need for a smarter model against the sheer cost of looping through the data repeatedly.",
      },
      {
        kind: "p",
        parts: [
          "Reading a textbook once rarely guarantees you will ace the final exam; you usually have to read it multiple times for the concepts to stick. ",
          {
            text: "In machine learning, an epoch represents one complete pass of the entire training dataset through the model.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " If you are training a fraud detector on one million historical transactions, the model completes one epoch only after it has looked at all one million examples, made predictions, and updated its parameters via backpropagation. ",
          {
            text: "Because one pass is rarely enough to find the bottom of the valley, models are typically trained over dozens or hundreds of epochs to solidify their understanding.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
        ],
      },
      {
        kind: "p",
        parts: [
          "Waiting to update the model until after it has seen all one million examples is incredibly slow, so datasets are broken down into smaller chunks called batches. ",
          {
            text: "An iteration is the process of passing a single batch of data through the model and updating the parameters.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " If your batch size is one thousand, it will take one thousand iterations to complete a single epoch of the one-million-transaction dataset. ",
          {
            text: "This batching process allows the model to update its internal volume knobs frequently and continuously, making gradient descent much more efficient and practical at scale.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
        ],
      },
      {
        kind: "p",
        parts: [
          "The business consequence is a direct relationship between dataset size, epoch count, and your cloud computing bill. Every additional epoch requires the GPUs to process the entire dataset all over again, multiplying the cost of training. ",
          {
            text: "There are diminishing returns: the first few epochs might dramatically improve the model's accuracy, while the fiftieth epoch might only yield a microscopic gain at the exact same financial cost.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          ' Teams must continuously monitor the validation metrics to decide when the model is "good enough," halting the training process before the compute costs exceed the business value of the marginal improvement.',
        ],
      },
      {
        kind: "p",
        parts: [
          'What a PM does differently now is manage the trade-off between training time, cost, and model performance. When an engineer proposes running "more epochs" to improve a struggling model, you must ask what the projected cost of that compute will be. ',
          {
            text: "If retraining the model on fresh data takes three days of compute per epoch, you must actively decide whether the slight bump in accuracy is worth delaying a critical product launch.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " You will also use this terminology to understand the scale of a problem: an error on the tenth iteration is a quick fix, while an error on the hundredth epoch is a massive loss of time and money.",
        ],
      },
      {
        kind: "ex",
        title: "Tesla's Fleet Data",
        body: "Tesla collects petabytes of video data from its fleet of vehicles. Processing this entire dataset represents a massive epoch. Because the dataset is so incomprehensibly large, Tesla cannot afford to run hundreds of epochs, and must rely on incredibly optimized batching and iteration strategies to ensure the model learns efficiently within a reasonable timeframe.",
      },
      {
        kind: "ex",
        title: "Canva's Background Remover",
        body: "When Canva trained its automated background removal tool, they passed millions of masked images through the model for multiple epochs. The product team had to evaluate the model after every few epochs, eventually calling a halt to training when the edge-detection accuracy on hair and fur plateaued, avoiding wasting money on further iterations that weren't improving the user experience.",
      },
      {
        kind: "ex",
        title: "Anthropic's Claude Alignment",
        body: "During the final stages of training Claude to be helpful and harmless, Anthropic runs the model through specific datasets of sensitive queries. They carefully monitor the model's behavior epoch by epoch to ensure it absorbs the safety constraints. Running too few epochs might leave the model vulnerable, while running too many risks degrading its general conversational ability.",
      },
      {
        kind: "diagram",
        id: "ch2-epochs-nested",
        type: "nested",
        title: "The Data Hierarchy",
        caption: "An epoch contains multiple batches; processing one batch is one iteration.",
      },
      {
        kind: "trans",
        text: "However, if you force the model to read the textbook too many times, it stops learning the concepts and simply memorizes the answers.",
      },
      {
        kind: "h3",
        title: "Overfitting vs underfitting",
        subtitle: "2.7: Overfitting vs underfitting",
      },
      {
        kind: "take",
        text: "Overfitting is when a model memorizes the training data but fails on new data; underfitting is when it fails to learn anything useful at all.",
      },
      {
        kind: "why",
        text: "If you only test a model on the data it was trained on, an overfitted model will look like a perfect success right up until the moment it fails catastrophically in production.",
      },
      {
        kind: "p",
        parts: [
          "Think of a student preparing for a math test. An underfitting student glances at the textbook for five minutes, learns nothing, and fails the test. ",
          {
            text: "Underfitting occurs when a model is too simple or hasn't trained long enough to capture the underlying patterns in the data, resulting in poor predictions across the board.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " It is the equivalent of a real estate model guessing that every house costs exactly $300,000 regardless of the neighborhood or square footage. ",
          {
            text: "Underfitting is usually obvious early in the development cycle, and the fix is straightforward: use a more complex model or train it for more epochs.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
        ],
      },
      {
        kind: "p",
        parts: [
          "The far more dangerous scenario is the student who memorizes the exact answers to the practice test but doesn't learn the actual mathematical formulas. ",
          {
            text: "Overfitting happens when a model trains so aggressively on the training data that it memorizes the noise, outliers, and exact examples instead of the general patterns.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " When you give this overfitted model a brand new piece of data it has never seen before, it completely collapses. ",
          {
            text: "An overfitted model will score 99% accuracy in the lab and then fail spectacularly the moment it is deployed to real users, making it the most deceptive trap in machine learning.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
        ],
      },
      {
        kind: "p",
        parts: [
          "The business consequence of overfitting is a false sense of security that leads to disastrous product launches. An overfitted algorithmic trading model will backtest perfectly on historical stock data, convincing the company to deploy millions of dollars, only to lose everything when the live market behaves slightly differently. ",
          {
            text: "To prevent this, teams must withhold a portion of the data—called the validation set—and never let the model see it during training.",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " The model's true performance is only ever judged by how well it predicts the validation set, ensuring you are measuring real intelligence rather than mere memorization.",
        ],
      },
      {
        kind: "p",
        parts: [
          "What a PM does differently now is rigorously interrogate the evaluation methodology before approving a launch. You must never accept an accuracy metric without asking what dataset was used to generate it. ",
          {
            text: "If the engineering team reports that the model is 95% accurate, your immediate follow-up must be: 'Is that on the training set or the held-out validation set?'",
            explain: "This concept is a core mechanism of how models function under the hood.",
          },
          " You must also ensure that the validation set is truly representative of the messy, unpredictable data the model will encounter in the real world, acting as the final line of defense against deploying an overfitted disaster.",
        ],
      },
      {
        kind: "ex",
        title: "Zillow's iBuying Collapse",
        body: "Zillow's algorithm for predicting home prices suffered from a form of overfitting to historical market trends. The model learned the precise patterns of a stable housing market and performed beautifully in backtests. However, when the market dynamics shifted during the pandemic, the overfitted model failed to generalize to the new reality, resulting in massive financial losses and the shutdown of their iBuying division.",
      },
      {
        kind: "ex",
        title: "Apple's Initial Siri Launch",
        body: "Early voice recognition systems often overfitted to the specific accents and studio conditions of the actors who recorded the training data. When deployed to the public, the models failed to understand regional dialects, background noise, or mumbled speech. Product teams learned they had to curate vastly more diverse validation sets to ensure the models were actually generalizing to real-world audio.",
      },
      {
        kind: "ex",
        title: "Netflix's Recommendation Challenge",
        body: "When Netflix ran its famous million-dollar algorithm competition, many teams submitted models that perfectly predicted the exact ratings in the training data but failed on the hidden test set. The models had overfitted, memorizing the quirks of specific users rather than learning true genre preferences. Netflix only awarded the prize to the team whose model generalized effectively to the unseen data.",
      },
      {
        kind: "diagram",
        id: "ch2-fitting-comparison",
        type: "comparison",
        title: "The Fitting Spectrum",
        caption:
          "Underfitting learns nothing. Overfitting memorizes everything. Optimal fit learns the underlying pattern.",
      },
      {
        kind: "trans",
        text: "Recognizing an overfitted model is just one part of a broader skill set: diagnosing the root causes of model failure and translating them into actionable product strategy.",
      },
    ],
    quiz: [
      {
        q: 'A vendor tells you they are "fine-tuning a 70 billion parameter model" on your company\'s internal wiki. What are they actually doing technically?',
        options: [
          "Writing 70 billion new rules to govern how the wiki is searched.",
          "Adjusting billions of numerical weights inside the model so it statistically favors patterns found in your wiki.",
          "Expanding the model's database to store exact copies of your wiki pages.",
          "Upgrading the cloud hardware to support 70 billion simultaneous API requests.",
        ],
        correct: 0, // 0-indexed
        correctFeedback:
          "Exactly. Fine-tuning is the process of updating the model's internal parameters (weights) using your proprietary data. It changes the statistical behavior of the model, rather than storing facts in a database.",
        wrongFeedback:
          "Remember that parameters are not rules, hardware, or database entries. They are the numerical knobs that determine the model's behavior. Re-read section 2.1.",
      },
      {
        q: "Your team is building an AI moderation tool to automatically delete toxic comments. Engineering asks how they should weight the loss function. Which response demonstrates strong product leadership?",
        options: [
          '"Make the loss function zero so the model is perfectly accurate."',
          '"Weight false positives (deleting a good comment) heavier than false negatives (missing a toxic one) because censorship hurts user trust more than spam."',
          '"The loss function is a back-end engineering detail; just use the default setting."',
          '"Optimize the loss function to maximize total comments on the platform."',
        ],
        correct: 0, // 0-indexed
        correctFeedback:
          "Right. The loss function encodes the business trade-offs. By explicitly defining that a false positive is worse than a false negative, you are ensuring the model optimizes for user trust.",
        wrongFeedback:
          'The loss function isn\'t just an engineering detail or a goal to zero out without context; it defines what a "mistake" is. Re-read section 2.2 on how loss functions encode product values.',
      },
      {
        q: "Your new generative AI feature is running over budget because the cloud compute costs are astronomical. Which of the following is the direct mechanical cause of this cost?",
        options: [
          "The model is stuck in a local minimum during backpropagation.",
          "Every time a user interacts with the feature, it triggers an expensive forward pass through billions of parameters.",
          "The loss function is penalizing the wrong metrics.",
          "The model has overfitted to the training data.",
        ],
        correct: 0, // 0-indexed
        correctFeedback:
          "Exactly. The forward pass is the action of inference. Pushing data through a massive model in real-time requires heavy compute, which directly drives up your cloud hosting bill.",
        wrongFeedback:
          "While backpropagation and loss functions relate to training, the cost of running the feature in production is driven by the forward pass. Re-read section 2.3.",
      },
      {
        q: 'A user reports that the AI summary tool completely hallucinated a fact. They click the "thumbs down" button. Why doesn\'t the model instantly stop making that mistake for the next user?',
        options: [
          "Because the model's learning rate is set too low.",
          "Because the user didn't explain why the fact was wrong in the text box.",
          "Because updating the model requires backpropagation, which is too computationally heavy to run live on a single piece of feedback.",
          "Because the forward pass is unidirectional.",
        ],
        correct: 1, // 0-indexed
        correctFeedback:
          "Right. Backpropagation is the memory-intensive process of assigning blame and updating parameters. It cannot be run on the fly; feedback must be batched for offline training.",
        wrongFeedback:
          "The limitation isn't the UI or the learning rate. It's the sheer computational cost of the backpropagation algorithm required to update the weights. Re-read section 2.4.",
      },
      {
        q: 'Engineering tells you the model training has "plateaued early" and they need to restart with a different learning rate. What analogy best describes what happened?',
        options: [
          "The model memorized the textbook instead of learning the concepts.",
          "The model got stuck in a small dip on the side of the mountain (a local minimum) instead of finding the lowest point in the valley.",
          "The model completed an epoch but the batch size was too large.",
          "The loss function penalized the wrong behavior.",
        ],
        correct: 0, // 0-indexed
        correctFeedback:
          "Exactly. Gradient descent is the process of stepping down the mountain to minimize error. If it gets stuck in a local minimum, training stalls prematurely.",
        wrongFeedback:
          "Memorizing the textbook is overfitting. A plateau in training means the gradient descent algorithm has stalled before finding the optimal solution. Re-read section 2.5.",
      },
      {
        q: 'To improve the accuracy of a struggling churn-prediction model, the data science lead suggests "running 50 more epochs." As a PM, what is the immediate trade-off you must consider?',
        options: [
          "The model will become too simple and underfit the data.",
          "Running more epochs requires passing the entire dataset through the model 50 more times, which will cost significant time and compute money.",
          "The forward pass will become too slow for real-time inference.",
          "The loss function will automatically reset to zero.",
        ],
        correct: 0, // 0-indexed
        correctFeedback:
          "Right. An epoch is a full pass through the training data. Adding epochs increases training time and compute costs linearly, and you must weigh that against the diminishing returns in accuracy.",
        wrongFeedback:
          "Epochs happen during training, not inference, and they don't reset the loss function or make the model simpler. They cost money and time. Re-read section 2.6.",
      },
      {
        q: "A vendor demonstrates a fraud model that achieves 99.9% accuracy in their lab. However, when deployed on your live transaction data, it misses 40% of fraudulent charges. What is the most likely diagnosis?",
        options: [
          "The model underfitted, meaning it was too simple to learn anything.",
          "The model overfitted, memorizing the vendor's specific training data but failing to generalize to your real-world transactions.",
          "The learning rate was set too high during gradient descent.",
          "The forward pass is executing too slowly.",
        ],
        correct: 0, // 0-indexed
        correctFeedback:
          "Exactly. This is the classic trap of overfitting. The model looked perfect in the lab because it memorized the training set, but it collapsed when faced with unseen, real-world data.",
        wrongFeedback:
          "Underfitting would mean it performed poorly in the lab as well. The discrepancy between lab performance and real-world failure is the hallmark of overfitting. Re-read section 2.7.",
      },
      {
        q: 'Your computer vision model for a self-driving delivery bot works perfectly in California but constantly crashes into snowbanks in Minnesota. Engineering says "the model isn\'t generalizing." How do you fix this?',
        options: [
          "Ask engineering to rewrite the neural network architecture from scratch.",
          "Source thousands of images of snowbanks, label them correctly, and add them to the training dataset for the next retraining run.",
          "Increase the learning rate so the model adapts faster in cold weather.",
          "Reduce the number of parameters to make the forward pass faster.",
        ],
        correct: 0, // 0-indexed
        correctFeedback:
          "Right. Generalization failures are almost always data failures. The model didn't learn about snow because it wasn't in the training set; the PM's job is to fix the data supply chain.",
        wrongFeedback:
          "You cannot fix a generalization failure by tweaking the architecture, learning rate, or parameter count. The model is missing representation in the dataset. Re-read section 2.8. ",
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
