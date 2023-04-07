import { Box, Button, Grid, Heading, chakra } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ButtonsPlayer } from '@/components/ButtonsPlayer';
import { VideoPlayer } from '@/components/VideoPlayer';
import { useItemsContext } from '@/context/ItemsProvider';

import { PlayCicleIcon } from '../../assets/icons/PlayCicleIcon';
import backggroundImage from '../../assets/images/festival_widexl.webp';
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
  const itemsCtx = useItemsContext();
  const { query } = useRouter();
  const items = data?.items?.filter((item) => 'Deleted video' !== item.snippet.title) || [];

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
        <Box pos="absolute" w="100vw" h="100vh" top="0" zIndex="0" opacity="0.2">
          <Image src={backggroundImage} fill alt="bg" />
        </Box>
        <Grid rowGap="4rem" zIndex="1">
          <Grid
            alignItems="center"
            width="100%"
            gridTemplateColumns={{ base: '1fr', lg: '1fr auto' }}
            gap="4rem"
            pt="8vh"
          >
            <Box justifySelf={itemsCtx?.values.videoId ? 'start' : 'center'}>
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
          <ButtonsPlayer />
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
      data: data || {},
    },
  };
};
