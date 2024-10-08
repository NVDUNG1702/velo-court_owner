import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import HomePage from '../pages/Home.page';
import LoginPage from '../pages/Login.page';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage />}>
                    <Route path='/quan-li-san' />
                    <Route path='/quan-li-dich-vu' />
                    <Route path='/quan-ly-nhan-vien' />
                    <Route path='/quan-li-doanh-thu' />
                    <Route path='/quan-li-dat-san' />
                </Route>
                <Route path='/login' element={<LoginPage />} />
            </Routes>
        </Router>
    )
}

export default AppRouter