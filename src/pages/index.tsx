
import { GetServerSideProps } from 'next'
import phone from "../assets/images/fone de ouvido.png"
import { Page } from '../components/Page';
import { PlayCicleIcon } from "../assets/icons/PlayCicleIcon"
import { MainLayout } from '../components/layout';
import { Box, Button, Grid, Heading, chakra, Image } from '@chakra-ui/react';



const Span = chakra('span', {
  baseStyle: {
    fontWeight: '900',
  },
})

const LinkButton = chakra(Button, {
  baseStyle: {
    bg: 'red.500',
    color: 'white.500',
    fontWeight: 'normal',
    borderRadius: '49px',
    fontSize: 'min(4vw, 1.7rem)',
    transition: 'all 0.2s ease-in-out',
    p: "2rem 4rem",
    _hover: {
      color: "black.500",
      "svg": {
        fill: "black.500",
        transition: 'all 0.2s ease-in-out',
      }

    },

  }
})

export default function Home({ data }: { data: unknown[] }) {
  console.log('data :>> ', data);
  return (
    <MainLayout>
      <Page title='Top 100 músicas sertanejas'>
        <Grid
          alignItems="center"
          width="100%"
          gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap="4rem"
          pt="8vh"
        >
          <Box w="75%" justifySelf={{ base: "center", md: "end" }} >
            <Image src={phone.src} alt='fone de ouvido vermelho' objectFit='contain' maxW="100%" />
          </Box>
          <Grid justifySelf={{ base: "center", md: "start" }} rowGap="1.5rem">
            <Heading as='h1' fontSize={{ base: "2.9rem", xl: "4.5rem" }} fontWeight="400">
              Ouça agora as
              <br />
              <Span>Top 100 músicas</Span>
              <br />
              <Span>sertanejas</Span> mais
              <br />
              tocadas de 2023.
            </Heading>
            <LinkButton w="70%">
              <PlayCicleIcon boxSize="30px" mr="0.5rem" fill="white.500" />
              Ouvir agora!
            </LinkButton>
          </Grid>
        </Grid>
      </Page>
    </MainLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async () => {
  const YOUTUBE_PLAYLIST_ITEMS_API = `https://www.googleapis.com/youtube/v3/playlistItems/?part=snippet&maxResults=50&playlistId=PL7lemN72eWJr21nU_5YjEpDLxXRMuLbm4&key=${process.env.API_KEY_GOOGLE}`;

  console.log('YOUTUBE_PLAYLIST_ITEMS_API :>> ', YOUTUBE_PLAYLIST_ITEMS_API);
  const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}`)
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}
