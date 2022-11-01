import "hardhat-deploy"
import "@nomicfoundation/hardhat-toolbox"
import { HardhatUserConfig } from "hardhat/config"

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    solidity: "0.8.17",
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
    },
}

export default config
