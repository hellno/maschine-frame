import { ConnectButton } from "@rainbow-me/rainbowkit";

export const SciFiConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="sci-fi-button relative overflow-hidden px-6 py-3 rounded-md text-lg font-['Orbitron'] tracking-wider bg-transparent border border-[#ff00ff] text-[#ff00ff] hover:bg-[#ff00ff20] transition-all duration-300 shadow-[0_0_15px_rgba(255,0,255,0.5)] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-[#ff00ff30] before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000"
                    type="button"
                  >
                    CONNECT
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="sci-fi-button px-6 py-3 rounded-md text-lg font-['Orbitron'] tracking-wider bg-[#ff000020] border border-red-500 text-red-500 hover:bg-[#ff000040] transition-all duration-300 shadow-[0_0_15px_rgba(255,0,0,0.5)]"
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-3">
                  <button
                    onClick={openChainModal}
                    className="sci-fi-button px-4 py-2 rounded-md text-sm font-['Orbitron'] tracking-wider bg-transparent border border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff20] transition-all duration-300 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div className="mr-2 relative w-5 h-5">
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            className="w-5 h-5"
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    className="sci-fi-button px-4 py-2 rounded-md text-sm font-['Orbitron'] tracking-wider bg-transparent border border-[#00ff00] text-[#00ff00] hover:bg-[#00ff0020] transition-all duration-300 shadow-[0_0_15px_rgba(0,255,0,0.5)]"
                    type="button"
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
