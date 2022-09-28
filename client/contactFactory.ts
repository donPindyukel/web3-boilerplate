import { ethers } from 'ethers'
import provider from './provider'
const address = '0xCae2e4E6218934CE4c8f69166b8dc09F71F20ecf'
const abi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_telegram',
        type: 'string',
      },
    ],
    name: 'createContact',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_telegram',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_discord',
        type: 'string',
      },
    ],
    name: 'createContact',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'ownerToContact',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const contactfactory = new ethers.Contract(address, abi, provider)

export default contactfactory
