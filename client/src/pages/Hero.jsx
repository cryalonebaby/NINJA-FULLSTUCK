import React from 'react';
import { useParams } from 'react-router-dom';

import { PageHOC } from '../components';

const Hero = () => {
	const { id } = useParams();
	return <div>Hero: {id}</div>;
};

export default PageHOC(Hero);
