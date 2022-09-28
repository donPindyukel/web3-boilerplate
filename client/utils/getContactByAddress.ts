import { ethers } from 'ethers'
import Contact from '../Contact'
import contactfactory from '../contactFactory'

const getContactByAddress = async (address: string) => {
  const contactAddress = await contactfactory.ownerToContact(address)
  if (contactAddress === ethers.constants.AddressZero) {
    throw new Error('Такой контакт не найден ...')
  }
  console.log('contactAddress', contactAddress)
  const contact = Contact(contactAddress)
  const telegram = await contact.telegram()
  console.log('telegram', telegram)
  const discord = await contact.discord()
  console.log('discord', discord)
  const desc = await contact.desc()
  console.log('desc', desc)

  return {
    telegram,
    discord,
    desc,
  }
}

export default getContactByAddress
