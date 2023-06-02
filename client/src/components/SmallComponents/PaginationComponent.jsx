import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeroes } from '../../redux/slices/heroesSlice';

import { Pagination, PaginationItem } from '@mui/material';

const PaginationComponent = () => {
	const dispatch = useDispatch();
	const { heroes } = useSelector((state) => state);

	return (
		<Pagination
			onChange={(event, page) => dispatch(fetchHeroes(page))}
			count={heroes?.pagesAmount}
			variant="outlined"
			shape="rounded"
			renderItem={(item) => <PaginationItem {...item} />}
		/>
	);
};

export default PaginationComponent;
