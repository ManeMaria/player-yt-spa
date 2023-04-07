import { Box, Button } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

import { PlayIcon } from '@/assets/icons/PlayIcon';
import { ItemsContextProps } from '@/context/ItemsProvider';

import phone from '../../assets/images/fone de ouvido.png';

type VideoPlayerProps = ItemsContextProps & {
  setSelectedVideo: (id: string) => void;
  isFirstRender: boolean;
};

const ListMusic = ({ items = [], setSelectedVideo, videoId }: VideoPlayerProps) => {
  return (
    <Box>
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
            onClick={() => setSelectedVideo(item.snippet.resourceId.videoId)}
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
    </Box>
  );
};

export const VideoPlayer = ({
  videoId = '',
  items = [],
  setSelectedVideo,
  isFirstRender,
}: VideoPlayerProps) => {
  return (
    <>
      {!videoId || isFirstRender ? (
        <Box
          w={{
            base: '75vw',
            lg: '35vw',
          }}
          maxW="40rem"
        >
          <Image src={phone} alt="fone de ouvido vermelho" priority />
        </Box>
      ) : (
        <Box
          display="flex"
          justifySelf="center"
          width={{ base: '90vw', lg: '40vw' }}
          height={{ base: '60vw', md: '40vh' }}
        >
          <Box
            overflowY="scroll"
            h="40vh"
            w="40%"
            display={{ base: 'none', lg: 'block' }}
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
              isFirstRender={isFirstRender}
            />
          </Box>

          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Box>
      )}
    </>
  );
};
