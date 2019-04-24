import React from 'react';
import { hot } from 'react-hot-loader';

import SongsOverview from '@finland/widget-songs-overview';

import './Root.css';

const Root = () => <SongsOverview />;

export default hot(module)(Root);
