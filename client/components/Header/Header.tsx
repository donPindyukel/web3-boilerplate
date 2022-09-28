import Link from 'next/link'
import { useState } from 'react'

const Heder = () => {
  const [currentAccount, setCurrentAccount] = useState()

  const handleLogInClick = async () => {
    const { ethereum } = window
    if (!ethereum) {
      alert('У вас нет метамаска!')
    }
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.error('error', error)
    }
  }

  return (
    <header className="w-full">
      <nav className="navbar shadow-lg flex w-full h-20 px-40">
        <ul className="text-gray-500 flex font-semibold items-center">
          <li className="px-10  border-gray-500">
            <Link href="/">
              <a className="cursor-pointer hover:text-gray-400">Главная</a>
            </Link>
          </li>
          <li className="px-10">
            <Link href="/show">
              <a className="cursor-pointer hover:text-gray-400">
                Просмотреть контакт
              </a>
            </Link>
          </li>
          <li className="px-10">
            <Link href="/add">
              <a className="cursor-pointer hover:text-gray-400">
                Записать контакт
              </a>
            </Link>
          </li>
        </ul>
        {!currentAccount ? (
          <button
            onClick={handleLogInClick}
            className=" hover:bg-blue-400 my-auto ml-auto h-10	bg-blue-700 px-5 text-slate-50 rounded"
          >
            Вход
          </button>
        ) : (
          <button
            onClick={handleLogInClick}
            className=" hover:bg-blue-400 my-auto ml-auto h-10	bg-blue-700 px-5 text-slate-50 rounded"
          >
            {currentAccount}
          </button>
        )}
      </nav>
    </header>
  )
}

export default Heder
