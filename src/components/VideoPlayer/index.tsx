import { Box, Button, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useState } from 'react';

import { PlayIcon } from '@/assets/icons/PlayIcon';
import { ItemsContextProps } from '@/context/ItemsProvider';

type VideoPlayerProps = ItemsContextProps & {
  setSelectedVideo: (id: string) => void;
  setShowIframe?: () => void;
};

const ListMusic = ({ items = [], setSelectedVideo, videoId, setShowIframe }: VideoPlayerProps) => {
  return (
    <Flex justifyContent={{ base: 'center' }} flexWrap="wrap">
      {items.map((item) => {
        const width = item.snippet.thumbnails.default?.width;
        const height = item.snippet.thumbnails.default?.height;
        const url = item.snippet.thumbnails.default?.url || '';

        const equalId = item.snippet.resourceId.videoId === videoId;
        return (
          <Button
            border="solid 2px"
            borderColor={equalId ? 'red.500' : 'transparent'}
            key={item.id}
            onClick={() => {
              setSelectedVideo(item.snippet.resourceId.videoId);
              setShowIframe?.();
            }}
            variant="unstyled"
            boxSize="auto"
            position="relative"
            sx={{
              '&:before': {
                content: '""',
                width: width,
                height: height,
                bg: 'transparent',
                zIndex: 1,
                top: 0,
                left: 0,
                position: 'absolute',
                opacity: 0.3,
                transition: 'all 0.2s ease-in-out',
              },

              _hover: {
                '&:before': {
                  bg: 'red.500',
                },
                svg: {
                  opacity: 1,
                },
              },
            }}
          >
            <PlayIcon
              sx={{
                width: 10,
                height: 10,
                bg: 'transparent',
                zIndex: 2,
                top: 10,
                left: '40%',
                position: 'absolute',
                transition: 'all 0.2s ease-in-out',
                fill: 'white.500',
                opacity: 0,
              }}
            />
            <Image
              src={url}
              width={width}
              height={height}
              alt={`imagem do video ${item.snippet.title}`}
            />
          </Button>
        );
      })}
    </Flex>
  );
};

export const VideoPlayer = ({ videoId = '', items = [], setSelectedVideo }: VideoPlayerProps) => {
  const [showIframe, setShowIframe] = useState(false);

  return (
    <Box
      display="flex"
      justifySelf="center"
      width={{ base: '90vw', lg: '50vw' }}
      height={{ base: '60vw', md: '40vh' }}
      mb={{ base: '4rem', lg: '0' }}
    >
      <Box
        overflowY="scroll"
        h="40vh"
        w={showIframe ? '30%' : '100%'}
        display={{ base: showIframe ? 'none' : 'grid', lg: 'grid' }}
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <ListMusic
          items={items}
          setSelectedVideo={setSelectedVideo}
          videoId={videoId}
          setShowIframe={() => {
            !showIframe && setShowIframe(true);
          }}
        />
      </Box>

      <Box boxSize={showIframe ? '100%' : '0%'} visibility={showIframe ? 'visible' : 'hidden'}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
          title="YouTube video player"
          allow="autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share"
          allowFullScreen
        ></iframe>
      </Box>
    </Box>
  );
};
