import { assert } from "chai"
import { BigNumber } from "ethers"
import { BasicNFT } from "../../typechain-types"
import { deployments, network, ethers } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Basic NFT Test", () => {
          let basicNFT: BasicNFT, deployer: SignerWithAddress
          beforeEach(async () => {
              const accounts = await ethers.getSigners()
              deployer = accounts[0]
              await deployments.fixture("basicnft")
              basicNFT = await ethers.getContract("BasicNFT")
          })
          it("Gets deployed correctly", async () => {
              assert(basicNFT.address)
          })
          describe("Constructor", () => {
              it("Initialises the NFT correctly", async () => {
                  const name = await basicNFT.name()
                  const symbol = await basicNFT.symbol()
                  const tokenCounter: BigNumber = await basicNFT.getTokenCounter()
                  assert.equal(name, "Dogie")
                  assert.equal(symbol, "DOG")
                  assert.equal(tokenCounter.toString(), "0")
              })
          })
          describe("Mints NFT", () => {
              beforeEach(async () => {
                  const txResponse = await basicNFT.mintNFT()
                  await txResponse.wait(1)
              })
              it("Correctly mints an NFT", async () => {
                  assert(basicNFT.mintNFT())
              })
              it("Shows the correct balance and owner of an NFT", async () => {
                  const deployerAddress = deployer.address
                  const deployerBalance = await basicNFT.balanceOf(deployerAddress)
                  const txResponse = await basicNFT.mintNFT()
                  await txResponse.wait(1)
                  const owner = await basicNFT.ownerOf("1")

                  assert.equal(owner, deployerAddress)
                  assert.equal(deployerBalance.toString(), "1")
              })
          })
      })
