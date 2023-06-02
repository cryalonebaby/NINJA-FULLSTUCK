import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeroes } from '../../redux/slices/heroesSlice';

import HeroCard from './HeroCard';
import PaginationComponent from '../SmallComponents/PaginationComponent';

import { Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	minWidth: 350,
	paddingLeft: 30,
	paddingRight: 30,
	marginTop: 20,
	marginBottom: 20,
	gap: 20,
	width: '100%',
	height: '100%',
}));

const GalleryBox = styled(Box)(({ theme }) => ({
	display: 'grid',
	placeItems: 'center',
	gridTemplateColumns: '1fr 1fr 1fr',
	gap: '2rem',

	[theme.breakpoints.down('lg')]: {
		gridTemplateColumns: '1fr 1fr',
	},

	[theme.breakpoints.down('sm')]: {
		gridTemplateColumns: '1fr',
	},
}));

const Collection = () => {
	const dispatch = useDispatch();
	const { heroes } = useSelector((state) => state);

	console.log(heroes);

	const isLoading = heroes.status === 'loading';

	useEffect(() => {
		dispatch(fetchHeroes(heroes.currentPage));
	}, []);

	return (
		<StyledBox>
			<PaginationComponent />
			<GalleryBox>
				{isLoading ? (
					<div>Loading...</div>
				) : (
					heroes.items.map((hero) => (
						<div key={hero._id}>
							<HeroCard hero={hero} />
						</div>
					))
				)}
			</GalleryBox>
		</StyledBox>
	);
};

export default Collection;
