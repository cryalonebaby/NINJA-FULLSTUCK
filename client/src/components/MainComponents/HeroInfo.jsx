import React from 'react';

import { FormGallery } from '..';

import { Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledFlex = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	flexWrap: 'wrap',
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
				)}
			</StyledFlex>
			<Box textAlign={'left'} lineHeight={2} mt={4}>
				<Box maxWidth={350} sx={{ wordBreak: 'break-word' }}>
					<Typography variant="h6" fontWeight={'bold'}>
						Nickname:
					</Typography>
					<Typography
						data-testid="nickname"
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
						data-testid="real_name"
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
						data-testid="origin_description"
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
						data-testid="superpowers"
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
						data-testid="catch_phrase"
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
