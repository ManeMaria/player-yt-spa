import { Box, Button, Grid, Heading, Text, chakra } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ButtonsPlayer } from '@/components/ButtonsPlayer';
import { VideoPlayer } from '@/components/VideoPlayer';
import { ViewMusic } from '@/components/ViewMusic';
import { useItemsContext } from '@/context/ItemsProvider';
import { useIdentifyInstagramBrowser } from '@/hooks/useIdentifyInstagramBrowser';

import backggroundImage from '../../assets/images/festival_widexl.png';
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
    p: '2rem 0',
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
  const { isInstagramBrowser } = useIdentifyInstagramBrowser();

  const itemsCtx = useItemsContext();
  const { query } = useRouter();
  const items = data?.items?.filter((item) => 'Deleted video' !== item.snippet.title) || [];

  const DefaultHeader = chakra(Heading, {
    baseStyle: {
      as: 'h1',
      fontSize: { base: isInstagramBrowser ? '2rem' : '2.9rem', xl: '3rem' },
      fontWeight: '400',
    },
  });

  useEffect(() => {
    itemsCtx?.setValues({
      videoId: data?.items?.[0]?.snippet.resourceId.videoId || '',
      items,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query?.id]);

  return (
    <MainLayout>
      <Page title="Top 100 músicas sertanejas" pos="relative">
        <Box pos="absolute" w="99vw" h="100vh" top="0" zIndex="0" opacity="0.1">
          <Image src={backggroundImage} fill alt="bg" />
        </Box>
        <Grid rowGap="4rem" zIndex="1" h="100%">
          <Grid
            alignItems="center"
            width="100%"
            gridTemplateColumns={{ base: '1fr', lg: '1fr auto' }}
            rowGap="4rem"
            pt="8vh"
          >
            <Box>
              <VideoPlayer
                videoId={itemsCtx?.values.videoId}
                items={items}
                setSelectedVideo={(id) =>
                  itemsCtx?.setValues((values) => ({
                    ...values,
                    videoId: id,
                  }))
                }
              />
            </Box>
          </Grid>
          <ButtonsPlayer />
        </Grid>
      </Page>
      <ViewMusic />
      <Grid as="section" rowGap="4rem" my="4rem" px="7vw">
        <DefaultHeader
          as="h2"
          fontWeight="bold"
          fontSize={{ base: isInstagramBrowser ? '2rem' : '2.5rem', xl: '3.7rem' }}
        >
          As músicas Sertanejas Mais Tocadas De 2023 no Spotify e Youtbe
        </DefaultHeader>
        <Box>
          <Text fontSize="min(3.5vw, 1.7rem)">
            Somos o site <Span>Sertanejas Mais Tocadas De 2023</Span>, reunimos todas as músicas
            sertanejas <br /> mais tocadas de 2023 em algumas playlists para facilitar a sua
            curtição! Conheça agora <br />
            mesmo a playlists com{' '}
            <Span>
              Músicas Sertanejas Mais Tocadas de 2023, o Top 100 Brasil,
              <br /> Top 100 Spotify, Top Brasil no Youtube,
            </Span>{' '}
            todas reunidas em um só lugar.
          </Text>
        </Box>
      </Grid>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
  const id = query?.id || 'PL7lemN72eWJr4RLSPdPIlvjdyd_iBUXol';

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems/?part=snippet&maxResults=50&playlistId=${id}&key=${process.env.API_KEY_GOOGLE}`,
  );

  const data = (await response.json()) as PlayList;

  return {
    props: {
      data: data || {},
    },
  };
};
