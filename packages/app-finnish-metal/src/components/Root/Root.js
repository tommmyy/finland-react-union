import React from 'react';
import { hot } from 'react-hot-loader';

import SongsOverview from '@finland/widget-songs-overview';
import SongsRating from '@finland/widget-songs-rating';

import './Root.css';

const Root = () => <SongsOverview />;
// const Root = () => <SongsRating />;

export default hot(module)(Root);
