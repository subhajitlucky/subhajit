import type { Post } from './posts';

export const tarkaCouncilPost: Post = {
  slug: 'tarka-sabha-council',
  title: 'The council: how structured disagreement makes multi-agent answers better',
  summary:
    'A single model gives one sample. Tarka Sabha turns multiple personas into a council: roles, critique, tools, and a rubric that selects the best draft. The gain is not more agents — it is diversity plus selection. Here is the architecture, the failure modes, and what still needs measuring.',
  date: '2026-10-20',
  readingMinutes: 13,
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
          text: 'That is usually fine for a lookup or a rewrite. It is a poor fit for tasks where the answer depends on trade-offs, evidence, or a decision someone will act on. For those, the useful unit of work is not one completion. It is a small council with different jobs, a shared record, and a selection rule.',
        },
        {
          kind: 'p',
          text: 'Tarka Sabha is a multi-agent debate platform. The part worth studying is not the chat UI or the provider plumbing. It is the council loop: personas with roles, an orchestrator that decides who speaks and what they see, tools that let them check claims, and a synthesis step that generates several candidates and picks one against a rubric.',
        },
      ],
    },
    {
      id: 'jobs',
      title: 'A council has jobs, not just voices',
      blocks: [
        {
          kind: 'p',
          text: 'Multiple agents with the same prompt and the same model are mostly a more expensive way to get one answer. The council becomes useful when the participants disagree for a reason. Each persona has a role, and the role changes what it is told to do.',
        },
        {
          kind: 'code',
          lang: 'typescript',
          code: `const ROLE_DIRECTIVES = {
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
          caption: 'The council loop. Diversity enters at the left; selection happens at the right.',
        },
      ],
    },
    {
      id: 'turn-order',
      title: 'Turn order and shared context',
      blocks: [
        {
          kind: 'p',
          text: 'The orchestrator is deliberately deterministic. A mentioned persona speaks next; otherwise the next participant in the stored order speaks. The code keeps an LLM-based selector and a random interrupt path, but both are disabled in the production path. Random selection samples with replacement, so one persona can dominate a round while another never speaks. A fixed order is easier to debug and easier to reproduce.',
        },
        {
          kind: 'p',
          text: 'The more important design decision is what each speaker sees. The context is the most recent messages, not the first fifteen. The current speaker’s own messages are passed as assistant turns; everyone else’s messages are passed as user turns with the speaker’s name. That sounds mechanical, but it prevents a specific failure: an agent treating its own past statement as something another participant said, then arguing with itself.',
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
          text: 'The last message is also injected as a direct instruction: “X JUST SAID … Respond DIRECTLY to this, do not repeat yourself.” Without that anchor, models drift back to the opening topic. With it, the next turn is a response rather than a monologue. The window is bounded, so the council sees recent reasoning and not an unbounded transcript.',
        },
      ],
    },
    {
      id: 'tools',
      title: 'Tools keep the council honest',
      blocks: [
        {
          kind: 'p',
          text: 'A critic is only useful if it can check something. Personas can be granted a per-persona allowlist of tools: web search, fetching a URL, and exact arithmetic. A participant with no tools is offered none. The loop is bounded at four tool round-trips per turn, so a model that keeps asking for tools still terminates.',
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
          text: 'Tool results are appended as tool-role messages and never merged into the system prompt. Fetched web content is untrusted; if it could issue instructions, a page could rewrite the agent’s rules. The fetch tool is also stricter than the provider URL validator: it refuses loopback, private ranges, link-local addresses, cloud metadata, credential-bearing URLs, and non-HTTP schemes, and it re-checks every redirect hop.',
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
          text: 'The naive version of multi-agent synthesis is to ask one model to summarize the transcript. That mostly produces a polite average of the loudest claims. Tarka Sabha does something closer to a small search process: it generates several complete deliverables from deliberately different angles, grades each one, and selects the best.',
        },
        {
          kind: 'code',
          lang: 'typescript',
          code: `const CANDIDATE_ANGLES = [
  { label: 'decisive', temperature: 0.3 },
  { label: 'risk-aware', temperature: 0.5 },
  { label: 'actionable', temperature: 0.7 },
];`,
          caption: 'Different angles, not N samples of the same prompt. Repeated sampling mostly yields paraphrases.',
        },
        {
          kind: 'p',
          text: 'Each candidate is graded against a fixed rubric. The score is a weighted mean, so a candidate cannot win by being decisive while inventing facts. Grounding and coverage carry the most weight; decisiveness, honesty, and fit make up the rest. The judge must return structured JSON, and malformed output leaves a candidate unscored instead of crashing the run.',
        },
        {
          kind: 'code',
          lang: 'text',
          code: `grounding     0.25   every claim supported by the discussion
coverage      0.25   the objective is answered fully
decisiveness  0.20   commits to an answer and defends it
honesty       0.15   uncertainty and dissent stay visible
fit           0.15   matches the deliverable and audience`,
          caption: 'The synthesis rubric. The weights are the policy; the judge is the measurement.',
        },
        {
          kind: 'p',
          text: 'The highest weighted score wins; ties break on the lower index, so a run is deterministic for a fixed set of candidates. If the best score is below seven and a second round was allowed, the judge’s biggest criticism is fed into one more round. Every candidate is stored with its angle, score, and breakdown, so the selection is auditable rather than a black box.',
        },
        {
          kind: 'p',
          text: 'This is the part that most “multi-agent” demos skip. The output is not the last agent’s message, and it is not a summary of everyone. It is the best of several complete attempts, chosen against a rule that was written down before the candidates existed.',
        },
      ],
    },
    {
      id: 'why',
      title: 'Why this produces a better answer',
      blocks: [
        {
          kind: 'p',
          text: 'The mechanism is not “more agents are smarter.” It is four separate effects that happen to compose well.',
        },
        {
          kind: 'list',
          items: [
            'Diversity: a researcher, critic, planner, and synthesizer bring different priors to the same transcript. Different roles produce different candidate answers, which gives selection something to choose between.',
            'Adversarial checking: the critic is told to name the weakest part of the reasoning and what would fix it. That is a different task from generating a better answer, and it catches errors the generator is blind to.',
            'Evidence: tools let participants check claims instead of recalling them. A source that can be read is a stronger input than a confident sentence.',
            'Selection: the rubric turns “which answer is better?” into a weighted comparison. The winner is the candidate with the best grounding, coverage, decisiveness, honesty, and fit — not the one that happened to speak last.',
          ],
        },
        {
          kind: 'p',
          text: 'Those effects are why a council can beat a single completion on an open-ended task. They are also why it can lose. If all personas share the same model, the same prompt, and the same evidence, diversity is mostly stylistic. If the judge is weak, selection is weak. If the task has one factual answer, the council is extra cost for no benefit.',
        },
      ],
    },
    {
      id: 'limits',
      title: 'What it costs, and where it fails',
      blocks: [
        {
          kind: 'p',
          text: 'A synthesis run costs two provider calls per candidate: one to draft, one to judge. With the default three candidates, that is six calls before any optional second round. The debate itself adds a call per turn. This is not the cheapest way to answer a question, and it should not be the default for simple ones.',
        },
        {
          kind: 'list',
          items: [
            'The judge is a model too. A biased or careless judge can select a worse draft with a confident score.',
            'Persona quality matters. Generic “expert” personas produce generic disagreement; specific roles produce useful disagreement.',
            'The deterministic turn order is chosen for reproducibility, not for optimal deliberation. A better moderator might know when to let the critic speak twice.',
            'Long debates are truncated before synthesis. The most recent reasoning survives, but early evidence can be lost.',
            'Provider failures, rate limits, and malformed judge output are handled, but they still reduce the number of candidates or rounds that actually run.',
          ],
        },
        {
          kind: 'p',
          text: 'I have not run a controlled benchmark proving that the council beats a single strong model on this task. That claim would need a paired evaluation with the same provider, the same token budget, blind judging, and enough topics to see whether the effect survives. The design above is the hypothesis, not the proof.',
        },
      ],
    },
    {
      id: 'experiment',
      title: 'The experiment I have not run yet',
      blocks: [
        {
          kind: 'p',
          text: 'The honest next step is a paired evaluation. Take a set of objectives where trade-offs matter: architecture decisions, incident reviews, product trade-offs, research summaries. For each objective, produce one answer from a strong single model and one from the council, at the same cost ceiling. Strip the labels, shuffle the order, and have a separate judge score both against the same rubric.',
        },
        {
          kind: 'list',
          items: [
            'Measure grounding, coverage, decisiveness, honesty, and fit separately; a single overall score hides the trade-off.',
            'Report cost and latency per answer, not just quality. A council that is 5% better for 6x the cost is a different product decision.',
            'Publish the losses. A council that loses on simple factual questions is not a failure; it is a boundary.',
            'Run more than one judge and report disagreement. A single judge is a single sample again.',
          ],
        },
        {
          kind: 'p',
          text: 'Until that experiment exists, the defensible claim is narrower: the council is a structured way to generate, critique, and select answers. It makes disagreement useful instead of accidental. Whether it beats a single model on your task is an empirical question, and it should be measured, not assumed.',
        },
        {
          kind: 'link',
          href: 'https://tarkasabha.vercel.app',
          label: 'Tarka Sabha',
          note: 'The live application: create personas, configure providers, and run a debate.',
        },
        {
          kind: 'link',
          href: 'https://github.com/subhajitlucky/tarkaSabha',
          label: 'Source',
          note: 'Orchestrator, agent loop, synthesis rubric, tests, and the database schema.',
        },
      ],
    },
  ],
};
