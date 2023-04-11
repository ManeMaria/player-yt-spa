import { Button, Grid, Text, Tooltip, chakra } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

import { PlayIcon } from '@/assets/icons/PlayIcon';

import { addStringLastPhrase } from './utils/addStringLastPhrase';

const CustomButton = chakra(Button, {
  baseStyle: {
    bg: 'gray.500',
    w: '100%',
    h: '100%',
    display: 'flex',

    alignItems: 'center',
    transition: 'all 0.2s ease-in-out',
    fontSize: {
      base: '0.9rem',
      xl: '1.3rem',
    },
    fontWeight: 'normal',
    borderRadius: '10px',
    p: {
      base: '1.3rem 0.5rem',
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
  {
    title: 'Sertanejas Mais Tocadas De 2023',
    id: 'PL7lemN72eWJqFqqw2jSoQ9XUzgjPzoONI',
  },
  {
    title: 'Top 100 Músicas Sertanejas Mais Tocadas De 2023',
    id: 'PL7lemN72eWJqFqqw2jSoQ9XUzgjPzoONI',
  },
  {
    title: 'Sertanejo 2023 - 2024 | TOP 100 Musicas Sertanejas Mais Tocadas De | 2023',
    id: 'PL7lemN72eWJqgzWGiulI9WKFYdTVo1zdm',
  },
] as const;

export const ButtonsPlayer = () => {
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
        <Link
          key={playlist.id}
          href={`https://www.youtube.com/playlist?list=${playlist.id}`}
          target="_black"
        >
          <CustomButton>
            <Tooltip label={addStringLastPhrase(playlist.title)}>
              <Text ml="auto" isTruncated>
                {addStringLastPhrase(playlist.title)}
              </Text>
            </Tooltip>
            <PlayIcon boxSize={{ base: '10px', lg: '20px' }} fill="red.500" ml="auto" />
          </CustomButton>
        </Link>
      ))}
    </Grid>
  );
};
