import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("ERC6551Registry", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  const ERC6551Registry = await hre.ethers.getContract<Contract>("ERC6551Registry", deployer);

  await deploy("ERC6551Account", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  await deploy("MinionNFT", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  const MinionNFT = await hre.ethers.getContract<Contract>("MinionNFT", deployer);

  await deploy("RuneCredit", {
    from: deployer,
    args: [deployer],
    log: true,
    autoMine: true,
  });

  const RuneCredit = await hre.ethers.getContract<Contract>("RuneCredit", deployer);

  await deploy("StaminaPoint", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  const StaminaPoint = await hre.ethers.getContract<Contract>("StaminaPoint", deployer);

  await deploy("MagicPoint", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  const MagicPoint = await hre.ethers.getContract<Contract>("MagicPoint", deployer);

  await deploy("DefensePoint", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  const DefensePoint = await hre.ethers.getContract<Contract>("DefensePoint", deployer);

  await deploy("Items", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  const Items = await hre.ethers.getContract<Contract>("Items", deployer);

  await deploy("Game", {
    from: deployer,
    // Contract constructor arguments
    args: [
      deployer,
      await ERC6551Registry.getAddress(),
      await MinionNFT.getAddress(),
      await RuneCredit.getAddress(),
      await StaminaPoint.getAddress(),
      await MagicPoint.getAddress(),
      await DefensePoint.getAddress(),
      await Items.getAddress(),
    ],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  const Game = await hre.ethers.getContract<Contract>("Game", deployer);
  // Get the deployed contract to interact with it after deploying.
  console.log("👋 Add game as admin:", await RuneCredit.addAdmin(await Game.getAddress()));
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["Game"];
