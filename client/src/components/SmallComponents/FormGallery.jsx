import React from 'react';

import { Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledImg = styled('img')(({ theme }) => ({
	width: '100%',
	height: '100%',
	[theme.breakpoints.down('md')]: {
		width: '50%',
	},
}));

const StyledGallery = styled(Box)(({ theme }) => ({
	display: 'grid',
	width: '800px',
	gridAutoRows: '150px',
	gridTemplateColumns: '1fr',
	gridGap: '10px',
	[theme.breakpoints.up('sm')]: {
		gridTemplateColumns: 'repeat(2, 1fr)',
	},
	[theme.breakpoints.up('md')]: {
		gridTemplateColumns: 'repeat(5, 160px)',
		gridAutoRows: '100px',
	},
}));

const FormGallery = ({
	selectedImages,
	handleImagePick,
	handleChange,
	inputFile,
}) => {
	const AdditionalPics = () => {
		return Array.from({ length: 6 }, (_, index) => index + 1).map((i) => (
			<Box
				key={i}
				onClick={() => handleImagePick(i)}
				sx={{
					backgroundColor: '#EFEFEF',
				}}
			>
				{selectedImages[i] && <StyledImg src={selectedImages[i]} alt={i} />}
			</Box>
		));
	};

	return (
		<Box display="flex" justifyContent={'center'}>
			<StyledGallery>
				<Box
					onClick={() => handleImagePick(0)}
					sx={{
						backgroundColor: '#EFEFEF',
						gridRow: {
							xs: '1/1',
							sm: '1/3',
						},
						gridColumn: {
							xs: '1/1',
							sm: '1/3',
						},
					}}
				>
					{selectedImages[0] && <StyledImg src={selectedImages[0]} alt={0} />}
				</Box>

				{AdditionalPics()}
				<input
					type={'file'}
					onChange={handleChange}
					ref={inputFile}
					style={{ display: 'none' }}
				/>
			</StyledGallery>
		</Box>
	);
};

export default FormGallery;
