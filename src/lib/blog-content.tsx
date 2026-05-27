import IntentDrivenBlockchainInterfaces from '../../content/blog/intent-driven-blockchain-interfaces.mdx';
import MultiAgentAiDebatePlatforms from '../../content/blog/multi-agent-ai-debate-platforms.mdx';
import PortfolioSeoArchitecture from '../../content/blog/portfolio-seo-architecture.mdx';

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

  if (slug === 'portfolio-seo-architecture') {
    return <PortfolioSeoArchitecture />;
  }

  return null;
}
