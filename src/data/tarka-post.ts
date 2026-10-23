import type { Post } from './posts';

export const tarkaCouncilPost: Post = {
  slug: 'tarka-sabha-council',
  title: 'The council: what a multi-agent debate actually buys you',
  summary:
    'A single model gives one sample. A council gives you several drafts, a rubric, and a transcript you can inspect. The gain is not more agents; it is diversity plus selection. Here is the architecture, the cost, and what still needs a controlled benchmark.',
  date: '2026-10-20',
  readingMinutes: 10,
  tags: ['multi-agent systems', 'LLM orchestration', 'evaluation', 'TypeScript', 'Next.js'],
  sections: [
    {
      id: 'single-model',
      title: 'One model, one sample',
      blocks: [
        {
          kind: 'p',
          text: 'A single chat completion samples one path through the model. Raising the temperature changes the wording, not the perspective. The model has no adversary, no independent check on its claims, and no second attempt that knows why the first attempt was weak.',
        },
        {
          kind: 'p',
          text: 'A council is not automatically better. It is a different sampling strategy: several roles, a shared transcript, tools, and a selection rule. The useful claim is narrow: diversity plus selection gives you something to choose between.',
        },
        {
          kind: 'p',
          text: 'Tarka Sabha now leads with a decision evidence workspace for technical diligence; the original council remains as an optional review room. The part worth studying is the council loop: personas with jobs, a deterministic speaker order, tool checks, and a synthesis step that generates candidates and grades them.',
        },
        {
          kind: 'callout',
          title: 'What this is, and what it is not',
          items: [
            'This is a live platform and an architecture, not a controlled benchmark.',
            'The app now ships a blind council-vs-single comparison, but the published experiment is still pending.',
            'The gain is not more agents. It is role diversity, evidence, and selection.',
          ],
        },
      ],
    },
    {
      id: 'jobs',
      title: 'A council has jobs, not just voices',
      blocks: [
        {
          kind: 'p',
          text: 'Multiple agents with the same prompt and the same model are mostly a more expensive way to get one answer. The council becomes useful when participants disagree for a reason. Each persona has a role, and the role changes what it is told to do.',
        },
        {
          kind: 'code',
          lang: 'typescript',
          code: `const ROLE_DIRECTIVES = {
  contributor: 'Contribute your single strongest substantive point.',
  researcher: 'Bring evidence: facts, numbers, precedents, prior art.',
  critic: 'Attack the weakest part of the current reasoning.',
  planner: 'Turn the discussion into concrete steps.',
  synthesizer: 'Pull the threads together: agreements, disagreements, best answer.',
};`,
          caption: 'Role directives from the orchestrator. The role is part of the prompt, not a label on the UI.',
        },
        {
          kind: 'p',
          text: 'The task prompt also sets the rules of the room. These are the sentences that separate a council from a debate club: collaborate, change your position when someone gives you a better reason, build on what others said, admit uncertainty, and never invent specifics. A persona with a strong style still has to follow them.',
        },
        {
          kind: 'code',
          lang: 'text',
          code: `You are collaborating to produce the best possible answer.
You are not trying to win an argument.
Change your position when someone gives you a better reason.
Build on what others have said instead of restating it.
If you do not know something, say so.
Never invent specifics, numbers, or sources.`,
          caption: 'The working agreement injected into every task-mode persona.',
        },
        {
          kind: 'image',
          src: '/tarka/council.svg',
          alt: 'Diagram of the council loop: personas with roles feed an orchestrator, tools check claims, the transcript feeds three synthesis drafts, a weighted rubric grades them, and the highest-scoring draft wins.',
          caption: 'The council loop. Diversity enters at the left; selection happens at the right; the transcript stays inspectable.',
        },
      ],
    },
    {
      id: 'turn-order',
      title: 'Turn order and shared context',
      blocks: [
        {
          kind: 'p',
          text: 'The orchestrator is deliberately deterministic. A mentioned persona speaks next; otherwise the next participant in the stored order speaks. The LLM-based selector and random interrupt path are kept in the code but disabled in production. Random selection samples with replacement, so one persona can dominate a round while another never speaks.',
        },
        {
          kind: 'p',
          text: 'The more important design decision is what each speaker sees. The context is the most recent 15 messages, not the first 15. The current speaker’s own messages are passed as assistant turns; everyone else’s messages are passed as user turns with the speaker’s name. That sounds mechanical, but it prevents a specific failure: an agent treating its own past statement as something another participant said, then arguing with itself.',
        },
        {
          kind: 'code',
          lang: 'typescript',
          code: `context.push({
  role: isCurrentSpeaker ? 'assistant' : 'user',
  content: msg.content,
  name: senderName,
});`,
          caption: 'The current speaker keeps its own memory; everyone else is an interlocutor.',
        },
        {
          kind: 'p',
          text: 'The last message is also injected as a direct instruction: “X JUST SAID … Respond DIRECTLY to this, do not repeat yourself.” Without that anchor, models drift back to the opening topic. With it, the next turn is a response rather than a monologue.',
        },
      ],
    },
    {
      id: 'tools',
      title: 'Tools keep the council honest',
      blocks: [
        {
          kind: 'p',
          text: 'A critic is only useful if it can check something. Personas can be granted a per-persona allowlist of tools: web search, fetching a URL, and exact arithmetic. A participant with no tools is offered none. The loop is bounded at four tool round-trips per turn.',
        },
        {
          kind: 'code',
          lang: 'typescript',
          code: `export const MAX_TOOL_ITERATIONS = 4;
export const MAX_TOOL_RESULT_CHARS = 6000;`,
          caption: 'A hard ceiling on tool calls and on untrusted tool output.',
        },
        {
          kind: 'p',
          text: 'Tool results are appended as tool-role messages and never merged into the system prompt. Fetched web content is untrusted; if it could issue instructions, a page could rewrite the agent’s rules. The fetch tool also refuses loopback, private ranges, link-local and cloud-metadata addresses, credential-bearing URLs, and non-HTTP schemes, and it re-checks every redirect hop.',
        },
        {
          kind: 'p',
          text: 'This is the difference between an agent that sounds confident and an agent that can be corrected. The researcher can bring a source; the critic can attack the argument; the calculator can settle a number. The council is not smarter because it has more members. It is smarter because some members can check the others.',
        },
      ],
    },
    {
      id: 'synthesis',
      title: 'Synthesis is selection, not concatenation',
      blocks: [
        {
          kind: 'p',
          text: 'The naive version of multi-agent synthesis is to ask one model to summarize the transcript. That mostly produces a polite average of the loudest claims. Tarka Sabha generates several complete deliverables from deliberately different angles, grades each one, and selects the best.',
        },
        {
          kind: 'code',
          lang: 'typescript',
          code: `const CANDIDATE_ANGLES = [
  { label: 'decisive', temperature: 0.3 },
  { label: 'risk-aware', temperature: 0.5 },
  { label: 'actionable', temperature: 0.7 },
  { label: 'concise', temperature: 0.4 },
];`,
          caption: 'Different angles, not N samples of the same prompt. Repeated sampling mostly yields paraphrases.',
        },
        {
          kind: 'p',
          text: 'Each candidate is graded against a fixed rubric. The score is a weighted mean, so a candidate cannot win by being decisive while inventing facts. Grounding and coverage carry the most weight; decisiveness, honesty, and fit make up the rest.',
        },
        {
          kind: 'image',
          src: '/tarka/rubric-weights.svg',
          alt: 'Bar chart of the balanced synthesis rubric: grounding 25 percent, coverage 25 percent, decisiveness 20 percent, honesty 15 percent, fit 15 percent.',
          caption: 'The default rubric. The weights are the policy; the judge is the measurement.',
        },
        {
          kind: 'p',
          text: 'The highest weighted score wins; ties break on the lower index, so a run is deterministic for a fixed set of candidates. Every candidate is stored with its angle, score, and breakdown, so the selection is auditable rather than a black box.',
        },
        {
          kind: 'code',
          lang: 'text',
          code: `preset            grounding  coverage  decisiveness  honesty  fit
balanced          0.25       0.25      0.20          0.15     0.15
decision-grade    0.25       0.20      0.30          0.10     0.15
safety-critical   0.35       0.15      0.10          0.25     0.15
product-review    0.20       0.25      0.20          0.10     0.25
incident-review   0.30       0.15      0.10          0.25     0.20`,
          caption: 'Five presets. The weights change what “best” means; they do not make the judge correct.',
        },
        {
          kind: 'p',
          text: 'With two rounds allowed, a best score below 7 triggers one more round fed the judge’s specific criticism. It is skipped if the 42-second synthesis budget is exhausted.',
        },
      ],
    },
    {
      id: 'cost',
      title: 'What it costs',
      blocks: [
        {
          kind: 'p',
          text: 'A synthesis run costs 2N provider calls: N drafts and N judgments. The default is 3 candidates, so 6 calls. A two-round run is up to 12. The debate itself adds one call per turn, and each tool round-trip adds another.',
        },
        {
          kind: 'image',
          src: '/tarka/synthesis-cost.svg',
          alt: 'Bar chart of provider-call cost: a single completion costs 1 call, a council with 3 candidates and 1 round costs 6 calls, and a two-round council costs 12 calls.',
          caption: 'The council is a cost multiplier. The question is whether selection earns it.',
        },
        {
          kind: 'list',
          items: [
            'The judge is a model too. A biased or careless judge can select a worse draft with a confident score.',
            'Persona quality matters. Generic “expert” personas produce generic disagreement; specific roles produce useful disagreement.',
            'Long debates are truncated before synthesis: the most recent 60 messages, capped at 16,000 characters. Early evidence can be lost.',
            'Provider failures, rate limits, and malformed judge output reduce the number of candidates or rounds that actually run.',
            'The synthesis budget is 42 seconds; a second round is skipped if the budget runs out.',
          ],
        },
        {
          kind: 'p',
          text: 'This is not the cheapest way to answer a question, and it should not be the default for simple ones.',
        },
      ],
    },
    {
      id: 'inspect',
      title: 'What you can inspect',
      blocks: [
        {
          kind: 'p',
          text: 'The project has moved past “the last agent’s message.” Every turn records the selection reason, input and output tokens, latency, and tool calls. Every artifact records its angle, score, breakdown, round, and whether it was selected. The evidence map links claims to recorded tool calls and flags unsupported claims.',
        },
        {
          kind: 'list',
          items: [
            'Turn telemetry: who spoke, why, how many tokens, and how long it took.',
            'Judge reasoning: the per-criterion score and the single biggest weakness.',
            'Evidence map: claims linked to recorded tool calls, with unsupported claims left visible.',
            'Export and share: a self-contained run record, readable without the app.',
          ],
        },
        {
          kind: 'p',
          text: 'The repository ships 15 test files and 193 tests across the orchestrator, agent loop, synthesis rubric, head-to-head comparison, rate limits, crypto, export, and debate runner.',
        },
        {
          kind: 'p',
          text: 'The runner is server-side. A GitHub Actions schedule calls the debate endpoint every five minutes; the claim uses FOR UPDATE SKIP LOCKED, so overlapping ticks divide the work instead of advancing the same chat twice. A debate keeps going after the tab closes. That is a different product from a chat UI that stops when the browser closes.',
        },
      ],
    },
    {
      id: 'evaluation',
      title: 'What still needs measuring',
      blocks: [
        {
          kind: 'p',
          text: 'The app now ships a blind council-vs-single comparison. The single model sees only the brief, not the transcript. Both answers are judged independently with the same rubric, and the judge is not told which is which. That is a real comparison tool.',
        },
        {
          kind: 'p',
          text: 'It is not yet a controlled benchmark. Both sides use the same model, the judge is that model too, there is one run per topic, and there is no confidence interval. The result is a user-facing comparison, not a published claim.',
        },
        {
          kind: 'p',
          text: 'The experiment I want: paired evaluation across architecture decisions, incident reviews, product trade-offs, and research summaries. Same provider, same token budget, blind judging, multiple topics, more than one judge, and cost and latency reported beside quality. Publish the losses. If the council loses on simple factual questions, that is a boundary, not a failure.',
        },
        {
          kind: 'p',
          text: 'Until then, the defensible claim is narrower: the council is a structured way to generate, critique, and select answers. It makes disagreement useful instead of accidental. Whether it beats a single model on your task is an empirical question, and it should be measured, not assumed.',
        },
        {
          kind: 'callout',
          title: 'What to do with this',
          items: [
            'Use a council when the task has trade-offs, evidence, and a decision someone will act on.',
            'Do not use it for a lookup or a rewrite; a single completion is cheaper.',
            'Judge the judge: the rubric is a policy, not the truth.',
            'Measure cost and latency, not just quality. A council that is 5% better for 6x the cost is a product decision.',
          ],
        },
      ],
    },
    {
      id: 'where',
      title: 'Where this fits',
      blocks: [
        {
          kind: 'p',
          text: 'A single completion samples one path. Self-consistency samples several paths from the same prompt and votes; that helps when the answer is checkable. A council is different: different roles, different context, tools, and a rubric. It is closer to a small review panel than to N samples of one prompt.',
        },
        {
          kind: 'p',
          text: 'LLM-as-judge is a measurement tool, not a truth machine. The rubric makes the selection rule explicit; it does not make the judge correct. That is why the per-criterion breakdown and the judge’s criticism are stored with the artifact.',
        },
        {
          kind: 'p',
          text: 'The orchestration is provider-neutral: 12 providers, encrypted keys, server-side calls, and database-backed rate limits. The interesting part is not the provider list. It is the state machine around it.',
        },
        {
          kind: 'code',
          lang: 'text',
          code: `approach              what varies              what selects
single completion     one sample               nothing
self-consistency      samples of one prompt    majority vote
council               role, context, tools     rubric-weighted judge`,
          caption: 'Different mechanisms, different failure modes.',
        },
      ],
    },
    {
      id: 'reproduce',
      title: 'Reproduce this',
      blocks: [
        {
          kind: 'p',
          text: 'The code is at commit `ebee93f`. The live sample runs at the public demo, no account needed.',
        },
        {
          kind: 'code',
          lang: 'bash',
          code: `git clone https://github.com/subhajitlucky/tarkaSabha
cd tarkaSabha
git checkout ebee93f
npm install
npm run typecheck
npm run build
npm test
npm run dev`,
          caption: 'Requires PostgreSQL and at least one provider key; see the README for DATABASE_URL, ENCRYPTION_KEY, AUTH_SECRET, NEXTAUTH_URL, and CRON_SECRET.',
        },
        {
          kind: 'link',
          href: 'https://tarkasabha.vercel.app/demo',
          label: 'Sample council',
          note: 'A public run you can inspect without an account.',
        },
        {
          kind: 'link',
          href: 'https://github.com/subhajitlucky/tarkaSabha',
          label: 'Tarka Sabha on GitHub',
          note: 'Orchestrator, agent loop, synthesis rubric, head-to-head comparison, tests, and the database schema.',
        },
        {
          kind: 'link',
          href: 'https://subhajitpradhan.vercel.app/projects/tarka-sabha',
          label: 'Portfolio case study',
          note: 'The shorter product case study: decisions, tradeoffs, and the live application.',
        },
      ],
    },
  ],
};
