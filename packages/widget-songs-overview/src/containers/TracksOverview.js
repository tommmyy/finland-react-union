import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import TracksOverviewUI from '../components/TracksOverview';

const TracksOverview = ({ page, limit }) => {
	const [tracks, setTracks] = useState();
	useEffect(() => {
		fetch(`http://localhost:3004/api/tracks?_sort=votes&_order=desc&_page=${page}&_limit=${limit}`)
			.then(xs => xs.json())
			.then(xs => setTracks(xs));
	}, []);

	return <TracksOverviewUI offset={(page - 1) * limit} tracks={tracks} />;
};

TracksOverview.propTypes = { limit: PropTypes.number, page: PropTypes.number };
TracksOverview.defaultProps = { page: 1, limit: 10 };

export default TracksOverview;
