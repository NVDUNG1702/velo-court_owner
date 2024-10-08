import React, { memo, useState } from 'react'
import st from './TopBarStyle.module.scss';
import clsx from 'clsx';
import logo from '../../assets/img/logo.png'
import { Menu } from '@mui/icons-material';
import { height } from '@fortawesome/free-solid-svg-icons/fa0';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useMediaQuery } from 'react-responsive';
import avatar from '../../assets/img/avatar.png'
import { userStore } from '../../zustand/store';
import { Badge } from '@mui/material';


const Topbar = memo(({ handleShowSideBar }) => {

    const responsiveSearch = useMediaQuery({ minWidth: 360 });
    const responsive550 = useMediaQuery({ minWidth: 550 })
    console.log(responsiveSearch);
    const user = userStore(state => state.user);
    const [checkAvatar, setCheckAvatar] = useState(true);

    return (
        <div className={clsx(st.container)}>
            <div className={clsx(st.containerLogo)}>
                <img src={logo} alt="" width={'50%'} />
            </div>
            <div className={clsx(st.containerRight)}>
                <div
                    className={clsx('j_left')}
                    style={{ height: '100%', width: '50%' }}
                >
                    <div

                        onClick={handleShowSideBar}
                    >
                        <Menu sx={{ fill: 'white' }} />
                    </div>
                    {
                        responsive550 ? (
                            <div className={clsx(st.containerInputSearch, 'j_left')}>
                                <SearchIcon sx={{ stroke: 'white', backgroundColor: '#323D4E' }} />
                                <input type="text" className={clsx(st.inputSearch)} placeholder='search' />
                            </div>
                        ) : (
                            <>
                                {/* <div className={clsx(st.containerInputSearch, 'j_left')}>
                                    <SearchIcon sx={{ stroke: 'white', backgroundColor: '#323D4E' }} />
                                    <input type="text" className={clsx(st.inputSearch)} placeholder='search' />
                                </div> */}
                            </>
                        )
                    }
                </div>

                <div className={clsx('j_end')} style={{ width: '50%', height: '100%' }}>
                    {
                        responsive550 && (
                            <div className='me-4'>
                                <Badge badgeContent={1} color='error'>
                                    <NotificationsIcon sx={{ fill: 'white' }} />
                                </Badge>
                            </div>
                        )
                    }
                    <div style={{ height: " 100%" }} className={clsx('j_center')}>

                        <div className={clsx(st.avatar)}>
                            <img src={`${checkAvatar ? user.avatar : avatar}`} alt="avatar"

                                onError={() => {
                                    setCheckAvatar(false); console.log("hello");
                                }}
                                style={{ height: '100%', backgroundColor: 'white', aspectRatio: '1/1' }} />
                        </div>
                        {
                            responsive550 && (
                                <>
                                    <div className='ms-2'>
                                        <p className='p fw-medium t_white'>Moni Roy</p>
                                        <p className='p t_white'>Admin</p>
                                    </div>
                                    <div className={clsx(st.iconArrowDown, 'j_center ms-3')}>
                                        <KeyboardArrowDownOutlinedIcon sx={{ fill: 'white' }} />
                                    </div>
                                </>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    )
})

export default Topbar