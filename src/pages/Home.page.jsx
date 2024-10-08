import React, { useCallback, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import styles from './HomeStyle.module.scss'
import clsx from 'clsx';
import TopBar from '../components/home/Topbar_component';
import SideBar from '../components/home/SideBar_component';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
const HomePage = () => {
    // const nav = useNavigate();
    const [showSiderBar, setShowSideBar] = useState(true)
    const handleShowSideBar = useCallback(() => {
        setShowSideBar(!showSiderBar)
    }, [showSiderBar])
    const responsiveContent = useMediaQuery({ minWidth: 500 })
    return (
        <div
            className={clsx(styles.container)}

        >
            <TopBar handleShowSideBar={handleShowSideBar} />
            <SideBar showSiderBar={showSiderBar} />
            <div className={clsx(styles.contentContainer, `${!showSiderBar && 'w-100'} ${!responsiveContent && 'w-100'}`)}>
                <Outlet />
            </div>
        </div >
    )
}

export default HomePage;