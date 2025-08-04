import React from 'react'
import SidebarGraphic from './SidebarGraphicProps'

interface AuthLayoutProps {
  children: React.ReactNode
  isLogin?: boolean
}

const AuthLayout = ({ children, isLogin = true }: AuthLayoutProps) => (
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="flex w-[1200px] h-[650px] bg-white rounded-2xl overflow-hidden shadow-lg relative">
      {isLogin ? (
        <>
          <SidebarGraphic variant="login" />
          <div className="flex-[3] flex flex-col items-center justify-center p-10">
            {children}
          </div>
        </>
      ) : (
        <>
          <div className="flex-[3] flex flex-col items-center justify-center p-10">
            {children}
          </div>
          <SidebarGraphic variant="register" />
        </>
      )}
    </div>
  </div>
)

export default AuthLayout