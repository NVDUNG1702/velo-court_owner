import clsx from 'clsx'
import React, { memo } from 'react'
import st from './SideBarStyle.module.scss'
import { dataMenuSideBar } from '../../data/dataItemSideBar'
import { useLocation, useNavigate } from 'react-router-dom'
const SideBar = memo(({ showSiderBar }) => {
    const location = useLocation();
    const nav = useNavigate();

    return (
        <div className={clsx(st.container, `${!showSiderBar && st.hiddenSideBar}`, 'j_around flex_column')}>
            <div style={{ width: '100%' }}>
                {dataMenuSideBar.map(item => (
                    <div key={item.id} className={clsx(st.containerItem, `${location.pathname === item.nav && st.containerItemFocused} mt-3`)}
                        onClick={() => nav(item.nav)}
                    >
                        <span className='t_white'>{item.title}</span>
                    </div>
                ))}
            </div>
            <div style={{ width: '90%', borderTop: '1px solid #4e4e4e' }} className={clsx('j_around flex_column')}>
                <span className='w-75 text-light mt-3' style={{ width: '70%', paddingLeft: '10px' }}>Cài đặt</span>
                <span className='w-75 text-light mt-3' style={{ width: '70%', paddingLeft: '10px' }}>Sản phẩm</span>
            </div>
        </div>
    )
})

export default SideBar