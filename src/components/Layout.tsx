// components/Layout.tsx
import React, { useState } from 'react';
import LogoSVG from '../assets/images/logo';
import { useUser } from '../contexts/UserContex';
import { t } from "../utils/i18n";
import { Link } from 'react-router-dom';
import { SettingsIcon, LogOutIcon, UserIcon, PaletteIcon } from 'lucide-react';
import Sidebar from './Sidebar';

type LayoutProps = {
    children: React.ReactNode;
};

//

const Layout: React.FC<LayoutProps> = ({ children }) => {

    const { user, login, logout } = useUser();
    const [settingsMenuOpen, setSettingsMenuOpen] = useState<boolean>(false)

    return (
        <>
            <div className='header'>
                <Link to={'/'} className='logo'>
                    <LogoSVG size={25} /> <span className="logo-title">FAMIUP</span>
                </Link>
                <div className='auth'>
                    {user &&
                        <>
                            {user.name}  <SettingsIcon onClick={() => setSettingsMenuOpen(prev => !prev)} />
                            {settingsMenuOpen &&
                                <div className="settings-menu">
                                    <div className="menu-row">
                                        <UserIcon size={16} /> <button className="btn-s btn-link" onClick={logout}>{t.buttons.Profile}</button>
                                    </div>
                                    <div className="menu-row">
                                        <PaletteIcon size={16} />

                                        <button className="btn-s btn-link">Dark</button>

                                    </div>
                                    <div className="menu-row">
                                        <LogOutIcon size={16} /> <button className="btn-s btn-link" onClick={() => { logout(); setSettingsMenuOpen(false) }}>{t.buttons.LogOut}</button>
                                    </div>
                                </div>}
                        </>
                    }
                    {!user && <button className="btn-s btn-default" onClick={login}>{t.buttons.LogIn}</button>}
                </div>
            </div>
            <div className="page flex">
                {user && <><Sidebar /> <div className='content user'>{children}</div></>}
                {!user && <div className='landpage-container'>{children}</div>}

            </div>

        </>
    );
};

export default Layout;
