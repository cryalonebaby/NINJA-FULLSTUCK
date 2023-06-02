import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { deleteHero, fetchHeroes } from '../../redux/slices/heroesSlice';

import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

import ModalDelete from '../SmallComponents/ModalDelete';

import styles from '../../styles';

const HeroCard = ({ hero }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(false);

	const handleModal = () => {
		setIsOpen((prev) => !prev);
	};

	const handleDelete = () => {
		dispatch(deleteHero(hero._id));
		dispatch(fetchHeroes(1));
	};

	return (
		<>
			<div className={styles.cardWrapper}>
				<div
					onClick={() => navigate(`/hero/${hero._id}`)}
					className={styles.imageWrapper}
				>
					<img src={hero.images[0]} alt="Hero" className={styles.cardImg} />
				</div>
				<div className={styles.cardContainer}>
					<h3 className={styles.cardName}>{hero.nickname}</h3>
					<div>
						<button
							onClick={() => navigate(`/edit/${hero._id}`)}
							className={`${styles.cardBtn} ${styles.cardBtnLeft}`}
						>
							<EditIcon />
						</button>
						<button
							onClick={handleModal}
							className={`${styles.cardBtn} ${styles.cardBtnRight}`}
						>
							<DeleteIcon />
						</button>
					</div>
				</div>
			</div>
			<ModalDelete
				isOpen={isOpen}
				handleModal={handleModal}
				handleDelete={handleDelete}
			/>
		</>

		// <Box>
		// 	<Card sx={{ width: 345, height: 450 }}>
		// 		<CardMedia
		// 			component="img"
		// 			height="240"
		// 			image={hero.images[0]}
		// 			alt="hero"
		// 		/>
		// 		<CardContent>
		// 			<Typography
		// 				gutterBottom
		// 				variant="h5"
		// 				component="div"
		// 				textAlign={'center'}
		// 				data-testid="nickname"
		// 			>
		// 				{hero.nickname}
		// 			</Typography>
		// 		</CardContent>
		// 		<CardActions
		// 			sx={{
		// 				display: 'flex',
		// 				justifyContent: 'space-between',
		// 			}}
		// 		>
		// 			<Button size="small" onClick={() => navigate(`/hero/${hero._id}`)}>
		// 				Learn More
		// 			</Button>
		// 			<Box display={'flex'}>
		// 				<IconButton
		// 					onClick={() => navigate(`/edit/${hero._id}`)}
		// 					size="small"
		// 					sx={{ display: 'flex' }}
		// 				>
		// 					<EditIcon />
		// 				</IconButton>
		// 				<IconButton
		// 					onClick={handleModal}
		// 					size="small"
		// 					sx={{ display: 'flex' }}
		// 				>
		// 					<DeleteIcon sx={{ color: 'darkred' }} />
		// 				</IconButton>
		// 			</Box>
		// 		</CardActions>
		// 	</Card>

		// </Box>
	);
};

export default HeroCard;
