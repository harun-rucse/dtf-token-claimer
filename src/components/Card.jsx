import Container from "./Container";

function Card() {
  return (
    <div className="pt-10">
      <Container>
        <h2 className="text-2xl font-medium mb-6">DTF Token Claimer</h2>

        <div className="bg-[#111827] text-gray-200 text-sm border border-[#1f2937] rounded-lg p-4 md:p-8 space-y-4">
          <p>Connect your wallet and then claim your DTF tokens!</p>

          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 justify-between bg-[#1f2937] border border-gray-700 rounded-lg p-5">
            <div className="space-y-2">
              <p>
                Connected Account: <span>Not Connected</span>
              </p>
              <p>
                <span className="text-red-600">
                  No airdrop balance found. Are you sure you've connected the correct wallet?
                </span>{" "}
                ·{" "}
                <a href="" className="text-blue-500 underline">
                  Contact Us
                </a>
              </p>
            </div>
            <button className="bg-[#e5e7eb] self-start md:self-stretch text-gray-800 px-4 py-2 rounded-lg">
              Contact us for help
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Card;
