import { Box, Button, Grid, Heading, chakra } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
// import Image from 'next/image';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Player } from '@/components/Player';
import { VideoPlayer } from '@/components/VideoPlayer';
import { randomIntNumber } from '@/util/randoNumber';

import { PlayCicleIcon } from '../../assets/icons/PlayCicleIcon';
// import phone from '../assets/images/fone de ouvido.png';
import { MainLayout } from '../../components/layout';
import { Page } from '../../components/Page';

const Span = chakra('span', {
  baseStyle: {
    fontWeight: '900',
  },
});

const LinkButton = chakra(Button, {
  baseStyle: {
    bg: 'red.500',
    color: 'white.500',
    fontWeight: 'normal',
    borderRadius: '49px',
    fontSize: 'min(4vw, 1.7rem)',
    transition: 'all 0.2s ease-in-out',
    p: '1rem 0',
    textAlign: 'center',
    _hover: {
      color: 'black.500',
      bg: 'white.500',
      svg: {
        fill: 'black.500',
        transition: 'all 0.2s ease-in-out',
      },
    },
  },
});

export default function Home({ data }: { data: PlayList }) {
  const { push, query } = useRouter();
  const [selectedVideo, setSelectedVideo] = useState(
    data?.items?.[0]?.snippet.resourceId.videoId || '',
  );

  const items = data?.items || [];

  useEffect(() => {
    setSelectedVideo(data?.items?.[randomIntNumber()]?.snippet.resourceId.videoId || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query?.id]);

  console.log('items :>> ', items);
  return (
    <MainLayout>
      <Page title="Top 100 músicas sertanejas">
        <Grid h="100%" rowGap="4rem">
          <Grid
            alignItems="center"
            width="100%"
            gridTemplateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap="4rem"
            pt="8vh"
          >
            <Box w="75%" justifySelf={{ base: selectedVideo ? 'start' : 'end' }}>
              <VideoPlayer videoId={selectedVideo} items={items} />
            </Box>
            <Grid justifySelf={{ base: 'center', lg: 'start' }} rowGap="1.5rem">
              <Heading as="h1" fontSize={{ base: '2.9rem', xl: '4.5rem' }} fontWeight="400">
                Ouça agora as
                <br />
                <Span>Top 100 músicas</Span>
                <br />
                <Span>sertanejas</Span> mais
                <br />
                tocadas de 2023.
              </Heading>
              <LinkButton
                w="70%"
                as="a"
                href="https://www.youtube.com/playlist?list=PL7lemN72eWJro2I3RjsqGEcQZ3PQ1kFhD"
                target="_blank"
              >
                <PlayCicleIcon boxSize="30px" mr="0.5rem" fill="white.500" />
                Ouvir agora!
              </LinkButton>
            </Grid>
          </Grid>
          <Player
            handleClick={(id) => {
              push({
                pathname: '/home',
                query: { id },
              });
            }}
          />
        </Grid>
      </Page>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
  const id = query?.id || 'L7lemN72eWJr21nU_5YjEpDLxXRMuLbm4';
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems/?part=snippet&maxResults=50&playlistId=${id}&key=${process.env.API_KEY_GOOGLE}`,
  );
  const data = (await response.json()) as PlayList;

  return {
    props: {
      data,
    },
  };
};
