import React from 'react';
import { hot } from 'react-hot-loader';
import { Union } from 'react-union';
import routes from '../../routes';

import './Root.css';

const Root = () => <Union routes={routes} />;

export default hot(module)(Root);
