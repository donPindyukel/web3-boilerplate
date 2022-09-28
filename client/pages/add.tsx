import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FormEvent, LegacyRef, useRef, useState } from 'react'
import Layout from '../components/Layout/Layout'
import contactFactory from '../contactFactory'
import provider from '../provider'
import styles from '../styles/Home.module.css'
import getContactByAddress from '../utils/getContactByAddress'

const Show: NextPage = () => {
  const [telegram, setTelegram] = useState('')
  const [discord, setDiscord] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    if (!telegram) {
      setErrorMessage('Ну хоть телеграм то заполни...')
      return
    }
    const signer = provider?.getSigner()
    const contactFactoryWithSigner = contactFactory.connect(signer!)
    try {
      setIsLoading(true)
      let response
      if (discord) {
        response = await contactFactoryWithSigner[
          'createContact(string,string)'
        ](telegram, discord)
      } else {
        response = await contactFactoryWithSigner['createContact(string)'](
          telegram
        )
        console.log('createContact(string)')
      }
      console.log('response', response)
      setSuccessMessage('Хэш транзакции такой ' + response.hash)
    } catch (error) {
      console.error('error', error)
      setErrorMessage((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <Head>
        <title>Web3 BoilerPlate</title>
      </Head>
      <div className="m-auto container py-12">
        <form className="w-1/2 m-auto" onSubmit={handleSubmit}>
          <div>
            <label className="inline-block mb-2 text-gray-700" htmlFor="input">
              Введите телеграм:
            </label>
            <input
              className="block
             w-full
             px-3
             py-1.5
             text-base
             font-normal
             text-gray-700
             bg-white
             bg-clip-padding
             border
             border-solid
             border-gray-300
             rounded
             transition
             ease-in-out
             m-0
             focus:text-gray-700
             focus:bg-white
             focus:border-blue-600
             focus:outline-none
             mb-4"
              id="telegram"
              value={telegram}
              type="text"
              onChange={(event) => setTelegram(event.target.value)}
            />
          </div>
          <div>
            <label className="inline-block mb-2 text-gray-700" htmlFor="input">
              Введите дискорд:
            </label>
            <input
              className="block
             w-full
             px-3
             py-1.5
             text-base
             font-normal
             text-gray-700
             bg-white
             bg-clip-padding
             border
             border-solid
             border-gray-300
             rounded
             transition
             ease-in-out
             m-0
             focus:text-gray-700
             focus:bg-white
             focus:border-blue-600
             focus:outline-none
             mb-4"
              id="telegram"
              value={discord}
              type="text"
              onChange={(event) => setDiscord(event.target.value)}
            />
          </div>
          <button
            disabled={isLoading}
            className={`
            ${isLoading ? '' : 'hover:bg-blue-400'}
            ${isLoading ? 'bg-gray-500' : 'bg-blue-700 '}
            ${isLoading ? 'text-slate-400' : 'text-slate-50'}
            px-5
            my-auto ml-auto 
            h-10
            rounded
            mb-4`}
          >
            Сохранить
          </button>
          {!!errorMessage && (
            <div
              className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3 break-all"
              role="alert"
            >
              <p className="font-semibold mb-4">Ну что же такое!</p>
              <div>{errorMessage}</div>
            </div>
          )}
          {!!successMessage && (
            <div
              className="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3 break-all"
              role="alert"
            >
              <p className="font-semibold mb-4">Успех!</p>
              <div>{successMessage}</div>
            </div>
          )}
        </form>
      </div>
    </Layout>
  )
}

export default Show
