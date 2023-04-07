import { Button, Grid, Text, chakra } from '@chakra-ui/react';
import React from 'react';

import { PlayIcon } from '@/assets/icons/PlayIcon';

type PlayerProps = {
  handleClick: (id: string) => void;
};

const CustomButton = chakra(Button, {
  baseStyle: {
    bg: 'gray.500',
    fontSize: {
      base: '0.9rem',
      xl: '1.5rem',
    },
    fontWeight: 'normal',
    borderRadius: '10px',
    p: {
      base: '2rem 0.5rem',
      xl: '2.3rem 2rem',
    },
    _hover: {
      bg: 'inherit',
    },
  },
});

const LIST_PLAYLISTS = [
  {
    title: 'Top 100 Sertanejas',
    id: 'PL7lemN72eWJr4RLSPdPIlvjdyd_iBUXol',
  },
  {
    title: 'Top BRASIL Spotify',
    id: 'PL7lemN72eWJr21nU_5YjEpDLxXRMuLbm4',
  },
  {
    title: 'Sertanejo Universitário',
    id: 'PL7lemN72eWJrSEkiTeRzTBYSKx_Bg4PCc',
  },
  {
    title: 'Esquenta Sertanejo',
    id: 'PL7lemN72eWJre5EFb605AI9FMts-IKZqL',
  },
  {
    title: 'Top Spotify',
    id: 'PL7lemN72eWJpOA_usiEdTLfFksCSa564Q',
  },
  {
    title: 'Sertanejo Abril - Dez 2023',
    id: 'PL7lemN72eWJoYcn4mN7EZejGYL71QwxFI',
  },
] as const;

export const Player = ({ handleClick }: PlayerProps) => {
  return (
    <Grid
      gridTemplateColumns={{
        base: 'repeat(2, 14rem)',
        xl: 'repeat(3, 23rem)',
      }}
      w="100%"
      justifyContent="center"
      gap={{ base: '0.5rem', lg: '1.5rem' }}
    >
      <Text textAlign="center" gridColumn="1/-1" fontSize="2rem">
        Outras playlists:
      </Text>
      {LIST_PLAYLISTS.map((playlist) => (
        <CustomButton key={playlist.id} onClick={() => handleClick(playlist.id)}>
          <Text ml="auto">{playlist.title}</Text>
          <PlayIcon boxSize={{ base: '10px', lg: '20px' }} fill="red.500" ml="auto" />
        </CustomButton>
      ))}
    </Grid>
  );
};
