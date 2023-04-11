import { Box, Container, Grid, Heading, Text, chakra } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import backggroundImage from '@/assets/images/festival_widexl.png';
import { ButtonsPlayer } from '@/components/ButtonsPlayer';
import { MainLayout } from '@/components/layout';
import { Page } from '@/components/Page';
import { VideoPlayer } from '@/components/VideoPlayer';
import { ViewMusic } from '@/components/ViewMusic';
import { PLAYLISTS_IDS } from '@/config';
import { useItemsContext } from '@/context/ItemsProvider';
import { useIdentifyInstagramBrowser } from '@/hooks/useIdentifyInstagramBrowser';

const Span = chakra('a', {
  baseStyle: {
    fontWeight: '900',
    textDecoration: 'none',
  },
});

const href = {
  href: `https://www.youtube.com/playlist?list=${PLAYLISTS_IDS[0]}`,
  target: '_blank',
  textDecoration: 'none',
};

export default function Home({ data }: { data: PlayList }) {
  const { isInstagramBrowser } = useIdentifyInstagramBrowser();

  const itemsCtx = useItemsContext();
  const { query } = useRouter();
  const items = data?.items?.filter((item) => 'Deleted video' !== item.snippet.title) || [];

  const DefaultHeader = chakra(Heading, {
    baseStyle: {
      as: 'h1',
      fontSize: { base: isInstagramBrowser ? '2rem' : '2.9rem', xl: '4rem' },
      fontWeight: '500',
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
        <Grid rowGap="4rem" zIndex="1" h="100%" pt="8vh" px="7vw">
          <Grid rowGap="1.5rem">
            <DefaultHeader>
              Ouça agora as{' '}
              <Span {...href} target="_blank">
                Top 100 músicas
              </Span>
              <Span {...href}> sertanejas</Span>
              <br /> mais tocadas de 2023.
            </DefaultHeader>
          </Grid>

          <Grid width="100%" gridTemplateColumns={{ base: '1fr' }} rowGap="4rem">
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
      <Container centerContent p="0" maxW="133rem">
        <Grid as="section" rowGap="2rem" my="4rem" px="7vw">
          <Span fontWeight="normal" {...href}>
            <DefaultHeader
              as="h2"
              fontSize={{ base: isInstagramBrowser ? '2rem' : '2.5rem', xl: '3.7rem' }}
            >
              As músicas Sertanejas mais Tocadas <br /> de 2023 no Spotify e Youtube
            </DefaultHeader>
          </Span>
          <Box>
            <Text fontSize="min(3.5vw, 1.7rem)">
              Somos o site <Span {...href}>Sertanejas mais Tocadas De 2023</Span>, reunimos todas as
              músicas sertanejas <br /> mais tocadas de 2023 em algumas playlists para facilitar a
              sua curtição! Conheça agora <br />
              mesmo a playlists com{' '}
              <Span {...href}>
                Músicas Sertanejas Mais Tocadas de 2023, o Top 100 Brasil,
                <br /> Top 100 Spotify, Top Brasil no Youtube,
              </Span>{' '}
              todas reunidas em um só lugar.
            </Text>
          </Box>
        </Grid>
      </Container>
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
