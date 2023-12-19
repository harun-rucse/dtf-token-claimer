const { expect } = require("chai");

describe("TokenVault", function () {
  it("Should return the deployed address", async () => {
    const [owner] = await ethers.getSigners();
    console.log("Owner address:", owner.address);

    const TokenContract = await ethers.getContractFactory("USDC");
    const Token = await TokenContract.deploy();

    const TokenVaultContract = await ethers.getContractFactory("TokenVault");
    const TokenVault = await TokenVaultContract.deploy(Token.address);
    //deployed address
    console.log("TokenVault address:", TokenVault.address);
  });
});
