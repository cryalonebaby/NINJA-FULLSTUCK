import React from 'react';

import FormGallery from '../SmallComponents/FormGallery';

import { Typography, ImageListItem, ImageList, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledFlex = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	flexWrap: 'wrap',
}));

const StyledImg = styled('img')(({ theme }) => ({
	width: '100%',
	height: '100%',
	[theme.breakpoints.down('md')]: {
		height: '50%',
		marginTop: '25%',
	},
}));

const HeroInfo = ({ hero }) => {
	return (
		<StyledFlex flexDirection={'column'} minWidth={350}>
			<StyledFlex
				mt={5}
				gap={1}
				sx={{
					flexDirection: {
						xs: 'column',
						md: 'row',
					},
				}}
			>
				{hero?.images && hero.images.length > 0 && (
					<FormGallery
						selectedImages={hero.images}
						handleImagePick={() => {}}
						handleChange={() => {}}
						inputFile={null}
					/>
					// <ImageList
					// 	sx={{
					// 		maxWidth: 500,
					// 		minWidth: 350,
					// 		paddingX: 2,
					// 	}}
					// 	cols={3}
					// 	rowHeight={82}
					// >
					// 	{hero.images.map((item, indx) => (
					// 		<ImageListItem key={indx}>
					// 			<img src={item} alt={indx} loading="lazy" />
					// 		</ImageListItem>
					// 	))}
					// </ImageList>
				)}
			</StyledFlex>
			<Box textAlign={'left'} lineHeight={2} mt={4}>
				<Box maxWidth={350} sx={{ wordBreak: 'break-word' }}>
					<Typography variant="h6" fontWeight={'bold'}>
						Nickname:
					</Typography>
					<Typography
						variant="p"
						fontWeight={'normal'}
						textTransform={'uppercase'}
						fontFamily={'sans-serif'}
					>
						{hero?.nickname}
					</Typography>
				</Box>
				<Box maxWidth={350} sx={{ wordBreak: 'break-word' }}>
					<Typography variant="h6" fontWeight={'bold'}>
						Real Name:
					</Typography>
					<Typography
						variant="p"
						fontWeight={'normal'}
						textTransform={'uppercase'}
						fontFamily={'sans-serif'}
					>
						{hero?.real_name}
					</Typography>
				</Box>
				<Box maxWidth={350} sx={{ wordBreak: 'break-word' }}>
					<Typography variant="h6" fontWeight={'bold'}>
						Description:
					</Typography>
					<Typography
						variant="p"
						textTransform={'uppercase'}
						fontFamily={'sans-serif'}
					>
						{hero?.origin_description}
					</Typography>
				</Box>
				<Box maxWidth={350} sx={{ wordBreak: 'break-word' }}>
					<Typography variant="h6" fontWeight={'bold'}>
						Superpowers:
					</Typography>
					<Typography
						variant="p"
						textTransform={'uppercase'}
						fontFamily={'sans-serif'}
					>
						{hero?.superpowers}
					</Typography>
				</Box>
				<Box maxWidth={350} sx={{ wordBreak: 'break-word' }}>
					<Typography variant="h6" fontWeight={'bold'}>
						Catch Phrase:
					</Typography>
					<Typography
						variant="p"
						textTransform={'uppercase'}
						fontFamily={'sans-serif'}
					>
						{hero?.catch_phrase}
					</Typography>
				</Box>
			</Box>
		</StyledFlex>
	);
};

export default HeroInfo;
