import IntentDrivenBlockchainInterfaces from '../../content/blog/intent-driven-blockchain-interfaces.mdx';
import MultiAgentAiDebatePlatforms from '../../content/blog/multi-agent-ai-debate-platforms.mdx';

type BlogContentProps = {
  slug: string;
};

export function BlogContent({ slug }: BlogContentProps) {
  if (slug === 'intent-driven-blockchain-interfaces') {
    return <IntentDrivenBlockchainInterfaces />;
  }

  if (slug === 'multi-agent-ai-debate-platforms') {
    return <MultiAgentAiDebatePlatforms />;
  }

  return null;
}
