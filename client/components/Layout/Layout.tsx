import { ReactNode } from 'react'
import Header from '../Header'

export interface LayoutProps {
  children: ReactNode
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout
