import { assert } from "chai"
import { BigNumber } from "ethers"
import { BasicNFT } from "../../typechain-types"
import { network, deployments, ethers } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Basic NFT Unit Tests", () => {
          let basicNFT: BasicNFT
          let deployer: SignerWithAddress

          beforeEach(async () => {
              const accounts = await ethers.getSigners()
              deployer = accounts[0]
              await deployments.fixture(["mocks", "basicnft"])
              basicNFT = await ethers.getContract("BasicNFT")
          })
          describe("Constructor", () => {
              it("Initialises the NFT correctly", async () => {
                  const name: string = await basicNFT.name()
                  const symbol: string = await basicNFT.symbol()
                  const tokenCounter: BigNumber = await basicNFT.getTokenCounter()
                  assert.equal(name, "Dogie")
                  assert.equal(symbol, "DOG")
                  assert.equal(tokenCounter.toString(), "0")
              })
          })

          describe("Mint NFT", () => {
              beforeEach(async () => {
                  const txResponse = await basicNFT.mintNFT()
                  await txResponse.wait(1)
              })
              it("Allows users to mint an NFT, and updates appropriately", async () => {
                  const tokenURI = await basicNFT.tokenURI(0)
                  const tokenCounter = await basicNFT.getTokenCounter()

                  assert.equal(tokenCounter.toString(), "1")
                  assert.equal(tokenURI, await basicNFT.TOKEN_URI())
              })
          })
      })
