import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

import phone from '../../assets/images/fone de ouvido.png';

type VideoPlayerProps = {
  videoId: string;
  items?: Item[];
};

export const VideoPlayer = ({ videoId, items = [] }: VideoPlayerProps) => {
  console.log('items :>> ', items);
  return (
    <>
      {!videoId ? (
        <Image src={phone} alt="fone de ouvido vermelho" priority />
      ) : (
        <Box
          justifySelf="center"
          width={{ base: '90vw', lg: '30vw' }}
          height={{ base: '60vw', md: '40vh' }}
        >
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="100px"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Box>
      )}
    </>
  );
};
