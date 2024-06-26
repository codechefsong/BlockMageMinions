# Block Mage Minions

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

## Gameplay
- Create BlockMage Minions
- Gather resources
- Train your Minions
- Buy potion to make your Minions stronger
- Buy food to recover your stamina points
- Each actions for minions cost SP
- Gather resources and sell them for Rune Credits
- Battle thief to earn Rune Credits
  
## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Block Mage Minions, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/codechefsong/BlockMageMinions.git
cd BlockMageMinions
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

## Artist/Designer
Graphic assets, background images, and logos were created by Andy.

https://app.buidlguidl.com/builders/0x51634D98FcCB1e9D64B6e7331c2872e98b33e9AC
