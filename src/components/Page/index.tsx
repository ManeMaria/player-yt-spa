import { Box, BoxProps, Container } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { ReactNode, useEffect, useRef } from 'react';

import { keys } from '@/helpers/keyLetters';

import backggroundImage from '../../assets/images/festival_widexl.png';
import { MotionBox } from '../MotionBox';

type PageProps = {
  children: ReactNode;
  title?: string;
} & BoxProps;

const listStringKeys = keys.toString();

export const Page = ({ children, title, ...restProps }: PageProps) => {
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
      },
    },
  };

  useEffect(() => {
    if (router.pathname && pageRef) {
      pageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [router.pathname]);

  return (
    <MotionBox
      variants={container}
      initial="hidden"
      animate="show"
      ref={pageRef}
      w="100%"
      mx="auto"
    >
      <Head>
        <title>{title ? `${title}` : undefined}</title>
        <meta name="description" content={listStringKeys} />
      </Head>
      <NextSeo
        title={`${title}`}
        description={listStringKeys}
        openGraph={{
          title,
          type: 'website',
          description: 'Ouça agora as Top 100 músicas sertanejas mais tocadas de 2023.',
          images: [
            {
              url: backggroundImage.src,
              alt: 'plateia sertaneja',
              type: 'png',
              height: 600,
              width: 800,
              secureUrl: backggroundImage.src,
            },
            {
              url: backggroundImage.src,
              alt: 'plateia sertaneja',
              type: 'png',
              height: 150,
              width: 200,
              secureUrl: backggroundImage.src,
            },
          ],
          locale: 'pt-BR',
          site_name: 'Top 100 músicas sertanejas',
          article: { authors: ['cesar'] },
          book: { authors: ['cesar'] },
        }}
        robotsProps={{
          maxImagePreview: 'large',
        }}
      />
      <Box w="98%" {...restProps}>
        <Container centerContent p="0" h="100%" maxW="133rem">
          {children}
        </Container>
      </Box>
    </MotionBox>
  );
};
