import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PageHOC } from '../components';

const Home = () => {
	const heroes = useSelector((state) => state.heroes);
	const dispatch = useDispatch();

	return <h1>Hello Home</h1>;
};

export default PageHOC(Home);
