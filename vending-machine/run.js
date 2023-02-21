const ethers = require("ethers");
require("hardhat");
const main = async () => {
  const [owner, user] = await hre.ethers.getSigners();
  const vmContractFactory = await hre.ethers.getContractFactory(
    "vendingMachine"
  );
  const vmContract = await vmContractFactory.deploy();
  await vmContract.deployed();

  console.log("contract deployed to -> ", vmContract.address);
  const value1 = ethers.utils.parseEther("1");
  const value2 = ethers.utils.parseEther("10000000");

  let method = await vmContract
    .connect(owner)
    .restock("cola", ethers.utils.parseEther(value1).toString);
  await method.wait();

  method = await vmContract
    .connect(user, { value: ethers.utils.parseEther(value2).toString })
    .purchase("cola");
  await method.wait();

  const balance = hre.ethers.provider.getBalance(user.address);
  console.log("balance -> ", hre.ethers.utils.formatEther(balance));
};

const run = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

run();
