import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('ContactFactory', function () {
  const TELEGRAM = 'telegram'
  const DISCORD = 'discord'

  async function dep() {
    const [deployer] = await ethers.getSigners()

    const ContactFactory = await ethers.getContractFactory('ContactFactory')
    const contactFactory = await ContactFactory.deploy()

    await contactFactory.deployed()
    console.log(`Contact deployed to ${contactFactory.address}`)

    return { contactFactory, deployer }
  }

  describe('createContact', function () {
    it('createContact(string,string)', async function () {
      const { contactFactory, deployer } = await loadFixture(dep)
      const contactFactoryWithSigner = contactFactory.connect(deployer)
      await contactFactoryWithSigner['createContact(string,string)'](
        TELEGRAM,
        DISCORD
      )

      const contactAddress = await contactFactoryWithSigner.ownerToContact(
        deployer.address
      )

      const Contact = await ethers.getContractAt('Contact', contactAddress)

      expect(await Contact.telegram()).to.equal(TELEGRAM)
      expect(await await Contact.discord()).to.equal(DISCORD)
    })
  })
})
