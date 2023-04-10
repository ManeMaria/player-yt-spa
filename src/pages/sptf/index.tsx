import { Box, Button, Grid, Heading, chakra } from '@chakra-ui/react';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';

import backgroundImage from '../../assets/images/festival_widexl.png';
import { MainLayout } from '../../components/layout';
import { Page } from '../../components/Page';

const LinkButton = chakra(Button, {
  baseStyle: {
    color: 'white.500',
    fontWeight: 'normal',
    borderRadius: '49px',
    fontSize: 'min(4vw, 1.7rem)',
    transition: 'all 0.2s ease-in-out',
    p: '2rem 0',
    textAlign: 'center',
    _hover: {
      color: 'green.500',
      bg: 'white.500',
      svg: {
        fill: 'black.500',
        transition: 'all 0.2s ease-in-out',
      },
    },
  },
});

export default function Home() {
  const { data: session, status } = useSession();

  const userData = (session as SpotifyAuthResponse)?.user;

  const isLogged = status === 'authenticated';

  useEffect(() => {
    if (isLogged) {
      const submitGoogleForm = async () => {
        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: userData?.name,
            email: userData?.email,
          }),
        });
        const data = await response.json();
        console.log('data :>> ', data);
      };

      submitGoogleForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);
  return (
    <MainLayout>
      <Page title="Login pelo spotify" pos="relative">
        <Box pos="absolute" w="99vw" h="100vh" top="0" zIndex="0" opacity="0.1">
          <Image src={backgroundImage} fill alt="bg" priority />
        </Box>
        <Grid placeItems="center" h="100vh">
          <Grid placeItems="center" rowGap="2rem">
            {userData?.image && (
              <Image src={userData?.image} alt="avatar" width={100} height={100} />
            )}
            <Heading>{userData?.name}</Heading>
            <Heading>{userData?.email}</Heading>
            <LinkButton
              w="30rem"
              onClick={async () => {
                if (isLogged) {
                  await signOut();
                } else {
                  await signIn('spotify');
                }
              }}
              bg={isLogged ? 'blue.500' : 'green.500'}
            >
              {isLogged ? 'Add uma nova conta para sorteio' : 'Login com spotify'}
            </LinkButton>
          </Grid>
        </Grid>
      </Page>
    </MainLayout>
  );
}
