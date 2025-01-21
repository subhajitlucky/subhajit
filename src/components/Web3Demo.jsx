import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";

export default function Web3Demo() {
  // Get the current account and connection status
  const { address, isConnected } = useAccount();
  // Get the current balance
  const { data: balance } = useBalance({ address });

  return (
    <section id="web3-demo" className="py-20 px-4 bg-primary">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-accent font-spaceMono">
          Web3 Demo
        </h2>
        {/* Wallet Connection Section */}
        <div className="bg-secondary p-8 rounded-lg mb-8">
          {/* ✅ Added ConnectButton */}
          <div className="flex items-center gap-4 mb-6">
            <ConnectButton />
            {isConnected && (
              <p className="text-gray-400">
                Connected to: {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            )}
          </div>
          <h3 className="text-2xl font-bold mb-4 text-accent">
            Wallet Details
          </h3>
          <div className="space-y-2">
            <p className="text-gray-400">
              ETH Balance : {balance?.formatted.slice(0, 5)} {balance?.symbol}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
