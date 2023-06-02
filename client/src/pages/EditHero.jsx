import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchOneHero } from '../redux/slices/heroesSlice';

import { FormComponent, PageHOC } from '../components';

const EditHero = () => {
	const { id } = useParams();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { hero, status } = useSelector((state) => state.heroes);

	useEffect(() => {
		dispatch(fetchOneHero(id));
	}, [id]);

	useEffect(() => {
		if (status === 'error') {
			navigate('/');
		}
	}, [status]);

	return <FormComponent hero={hero} />;
};

export default PageHOC(EditHero);
