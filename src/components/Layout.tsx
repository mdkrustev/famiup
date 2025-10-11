// components/Layout.tsx
import React, { useState } from 'react'
import LogoSVG from '../assets/images/logo'
import { t } from '../utils/i18n'
import { Link } from 'react-router-dom'
import { SettingsIcon, LogOutIcon, UserIcon, PaletteIcon } from 'lucide-react'
import Sidebar from './Sidebar'
import { useAppSelector, useAppDispatch } from '../hooks'
import { logout } from '../store/userSlice'
import { useUser } from '../hooks/useUser'


type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { login } = useUser();
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)
  const loading = useAppSelector((state) => state.user.loading)

  const [settingsMenuOpen, setSettingsMenuOpen] = useState<boolean>(false)

  if (loading) return <p>Loading...</p>
  const loggedIn = !!user

  return (
    <>
      <div className="header">
        <Link to={'/'} className="logo">
          <LogoSVG size={25} /> <span className="logo-title">FAMIUP</span>
        </Link>

        <div className="auth">
          {loggedIn ? (
            <>
              {user?.name}{' '}
              <SettingsIcon onClick={() => setSettingsMenuOpen((prev) => !prev)} />
              {settingsMenuOpen && (
                <div className="settings-menu">
                  <div className="menu-row">
                    <UserIcon size={16} />{' '}
                    <button
                      className="btn-s btn-link"
                      onClick={() => dispatch(logout())}
                    >
                      {t.buttons.Profile}
                    </button>
                  </div>
                  <div className="menu-row">
                    <PaletteIcon size={16} />
                    <button className="btn-s btn-link">Dark</button>
                  </div>
                  <div className="menu-row">
                    <LogOutIcon size={16} />{' '}
                    <button
                      className="btn-s btn-link"
                      onClick={() => {
                        dispatch(logout())
                        setSettingsMenuOpen(false)
                      }}
                    >
                      {t.buttons.LogOut}
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <button
              className="btn-s btn-default"
              onClick={login}
            >
              {t.buttons.LogIn}
            </button>
          )}
        </div>
      </div>

      <div className="page flex">
        {loggedIn ? (
          <>
            <Sidebar /> <div className="content user">{children}</div>
          </>
        ) : (
          <div className="landpage-container">{children}</div>
        )}
      </div>
    </>
  )
}

export default Layout
