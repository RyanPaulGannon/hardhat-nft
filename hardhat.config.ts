import "hardhat-deploy"
import "solidity-coverage"
import "@typechain/hardhat"
import "hardhat-gas-reporter"
import "@nomicfoundation/hardhat-toolbox"
import { HardhatUserConfig } from "hardhat/config"

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    solidity: "0.8.17",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        goerli: {
            chainId: 5,
            url: "",
            accounts: [],
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
    },
}

export default config
