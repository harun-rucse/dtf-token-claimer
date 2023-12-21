import { useAccount } from "wagmi";
import Container from "./Container";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../contracts";
import Web3 from "web3";
import { useEffect, useState } from "react";

function Card() {
  const [device, setDevice] = useState("desktop");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  const { address, isConnected } = useAccount();

  const checkBalance = async () => {
    const web3 = new Web3(window.ethereum);
    // console.log(address);
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    // console.log(contract);
    const balance = await contract.methods.getApprovedClaimableAmount(address).call();
    // console.log(balance);
    setBalance(Web3.utils.fromWei(balance, "ether"));
    // console.log(Web3.utils.fromWei(balance, "ether"));
  };

  const claimTokens = async () => {
    setLoading(true);
    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      await contract.methods.claimTokens().send({ from: address });
      await checkBalance();
      setLoading(false);
    } catch (e) {
      console.log(e);
      // alert(e.message);
      setLoading(false);
    }
  };

  // set device based on screen size change (mobile or desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDevice("mobile");
      } else {
        setDevice("desktop");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!window.ethereum) return;
    try {
      if (isConnected) {
        checkBalance();
      } else {
        setBalance(0);
      }
    } catch (e) {
      console.log(e);
    }
  }, [address]);

  return (
    <div className="pt-10">
      <Container>
        <h2 className="text-2xl text-[#7e858e] mb-6" style={{ fontFamily: "ClashDisplay-Semibold" }}>
          CTF Token Claimer
        </h2>

        <div className="gradient text-[#050505] shadow-md text-sm border rounded-xl p-4 md:p-12 space-y-4">
          <p className="text-lg" style={{ fontFamily: "ClashDisplay-Regular" }}>
            Connect your wallet and then claim your DTF tokens!
          </p>

          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 justify-between bg-[#d1d5db] border shadow-sm rounded-lg p-5">
            <div className="space-y-2">
              <p>
                Connected Account:{" "}
                <span>
                  {
                    {
                      true: device === "mobile" ? address?.slice(0, 6) + "..." + address?.slice(-4) : address,
                      false: "Not Connected",
                      undefined: "Not Connected",
                    }[isConnected]
                  }
                </span>
              </p>
              <p>
                {balance > 0 && (
                  <>
                    <span className="text-green-600">{balance + " "} DTF</span>
                    {/* <a href="" className="text-blue-500 underline">
                      Contact Us
                    </a> */}
                  </>
                )}

                {balance <= 0 && (
                  <>
                    <span className="text-red-600">
                      No airdrop balance found. Are you sure you've connected the correct wallet?
                    </span>{" "}
                    ·{" "}
                    {/* <a href="" className="text-blue-500 underline">
                      Contact Us
                    </a> */}
                  </>
                )}
              </p>
            </div>
            {balance > 0 && (
              <button
                className="bg-[#e5e7eb] self-start md:self-center text-gray-800 px-4 py-2 rounded-lg shadow-md"
                onClick={claimTokens}
              >
                {loading ? "Claiming..." : "Claim CTF"}
              </button>
            )}

            {/* {balance <= 0 && (
              <button className="bg-[#e5e7eb] self-start md:self-center text-gray-800 px-4 py-2 rounded-lg">
                Contact us for help
              </button>
            )} */}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Card;
