import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../components/Layout/Layout'

const Home: NextPage = () => {
  const router = useRouter()
  return (
    <Layout>
      <Head>
        <title>Web3 BoilerPlate</title>
      </Head>
      <div className="m-auto container py-12">
        <h1 className="text-2xl font-semibold mb-4">
          Здесь вы можете просмотреть контакты по адресу или оставить свои. √
        </h1>
        <div className="flex flex-row items-center">
          <button
            onClick={() => router.push('/show')}
            className=" hover:bg-blue-400 my-auto h-10	bg-blue-700 px-5 text-slate-50 rounded"
          >
            Просмотреть
          </button>
          <div>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="check-circle"
              className="w-7 h-7"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"
              ></path>
            </svg>
          </div>

          <button
            onClick={() => router.push('/add')}
            className=" hover:bg-green-300 my-auto h-10	bg-green-500 px-5 text-slate-50 rounded"
          >
            Записать
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Home
