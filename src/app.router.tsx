import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/header/header.component';
import LoadingComponent from './components/loading/loading.component';
import { Card } from '@material-ui/core';

const Home = lazy(() => import('./pages/home/home.page'));
const UserDetails = lazy(() => import('./pages/user-details/user.details.page'));
const RepoDetails = lazy(() => import('./pages/repo-details/repo.details.page'));

const AppRouter = () => (
    <BrowserRouter>
        <Suspense fallback={<LoadingComponent />}>
            <HeaderComponent />
            <Card className='router-card'>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="account/:userAccount">
                        <Route index element={<UserDetails />} />
                        <Route path="repo/:repoName" element={<RepoDetails />} />
                    </Route>
                </Routes>
            </Card>
        </Suspense>
    </BrowserRouter >
);

export default AppRouter;
