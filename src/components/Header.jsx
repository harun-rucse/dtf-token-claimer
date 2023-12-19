import { useWeb3Modal } from "@web3modal/wagmi/react";
import Container from "./Container";
import { useAccount } from "wagmi";
import { useDisconnect } from "wagmi";
function Header() {
  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <header className="bg-transparent text-black p-2">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <img src="/images/logo.png" alt="Logo" className="w-[40px] md:w-[55px] rounded-full" />
            <ul className="flex items-center gap-4 md:gap-8 text-sm font-medium">
              <li className="hover:text-gray-500 transition">
                <a href="#">Telegram</a>
              </li>
              <li className="hover:text-gray-500 transition">
                <a href="#">Website</a>
              </li>
            </ul>
          </div>
          <div>
            <button
              className="bg-white text-gray-800 px-2 md:px-4 py-2 text-sm rounded-lg shadow-md"
              onClick={!address ? open : disconnect}
            >
              {
                {
                  true: "Connect Wallet",
                  false: "Disconnect",
                  undefined: "Connect Wallet",
                }[isConnecting || isDisconnected || !isConnected]
              }
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
