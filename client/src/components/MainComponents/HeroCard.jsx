import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { deleteHero, fetchHeroes } from '../../redux/slices/heroesSlice';

import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

import { ModalDelete } from '..';

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
							data-testid="edit-button"
							onClick={() => navigate(`/edit/${hero._id}`)}
							className={`${styles.cardBtn} ${styles.cardBtnLeft}`}
						>
							<EditIcon />
						</button>
						<button
							data-testid="delete-button"
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
	);
};

export default HeroCard;
