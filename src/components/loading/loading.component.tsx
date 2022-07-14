import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LoaderTheme } from './style';

const LoadingComponent = () => (
    <LoaderTheme>
        <div className="loading-img">
            <CircularProgress color="inherit" disableShrink />
        </div>
    </LoaderTheme>
);

export default LoadingComponent;
