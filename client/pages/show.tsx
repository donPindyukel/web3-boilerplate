import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FormEvent, LegacyRef, useRef, useState } from 'react'
import Layout from '../components/Layout/Layout'
import styles from '../styles/Home.module.css'
import getContactByAddress from '../utils/getContactByAddress'

const Show: NextPage = () => {
  const addressRef = useRef<HTMLInputElement | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [telegram, setTelegram] = useState('')
  const [discord, setDiscord] = useState('')
  const [desc, setDesc] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const address = addressRef?.current?.value
    console.log('address', address)
    setErrorMessage('')
    setTelegram('')
    setDiscord('')
    setDesc('')
    if (!address) {
      setErrorMessage('Адрес пользователя то нам нужен ...')
      return
    }
    try {
      setIsLoading(true)
      const contact = await getContactByAddress(address)
      setTelegram(contact.telegram)
      setDiscord(contact.discord)
      setDesc(contact.desc)
    } catch (error) {
      console.log('error', error)
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
              Введите адрес:
            </label>
            <input
              ref={addressRef}
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
              id="input"
              type="text"
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
            Просмотреть
          </button>
          {!!errorMessage && (
            <div
              className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3"
              role="alert"
            >
              <p className="font-semibold mb-4">Ну что же такое!</p>
              <div>{errorMessage}</div>
            </div>
          )}
        </form>
        {!!telegram && <h2>Telegram: {telegram}</h2>}
        {!!discord && <h2>Discord: {discord}</h2>}
        {!!desc && <h2>Desc: {desc}</h2>}
      </div>
    </Layout>
  )
}

export default Show
