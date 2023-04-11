import { Box, Button, Flex, Text, Tooltip } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

import { PlayCicleIcon } from '@/assets/icons/PlayCicleIcon';
import { ItemsContextProps } from '@/context/ItemsProvider';

type VideoPlayerProps = ItemsContextProps & {
  setSelectedVideo: (id: string) => void;
};

const seperateString = (str: string) => {
  const arr = str.split(' - ');
  const second = arr[1];
  return second;
};

const ListMusic = ({ items = [], setSelectedVideo, videoId }: VideoPlayerProps) => {
  return (
    <Flex flexWrap="wrap" width="70%" alignContent="center">
      {items.map((item) => {
        const width = item.snippet.thumbnails.default?.width || 0;
        const height = item.snippet.thumbnails.default?.height || 0;
        const url = item.snippet.thumbnails.default?.url || '';
        console.log('item.snippet.title', item);
        const equalId = item.snippet.resourceId.videoId === videoId;
        return (
          <Button
            bg="gray.500"
            border="solid 2px"
            width="100%"
            h={height}
            borderColor={equalId ? 'red.500' : 'transparent'}
            key={item.id}
            onClick={() => {
              setSelectedVideo(item.snippet.resourceId.videoId);
            }}
            mb="1rem"
            variant="unstyled"
            overflow="hidden"
          >
            <Tooltip label={item.snippet.title}>
              <Flex boxSize="100%">
                <Box
                  pos="relative"
                  sx={{
                    '&:before': {
                      content: '""',
                      width: width,
                      height: height,

                      zIndex: 1,
                      top: 0,
                      left: 0,
                      position: 'absolute',
                      opacity: 0.2,
                      transition: 'all 0.2s ease-in-out',
                      bg: 'red.500',
                    },
                  }}
                >
                  <PlayCicleIcon
                    sx={{
                      width: 50,
                      height: 50,
                      bg: 'transparent',
                      zIndex: 2,
                      top: 7,
                      left: '30%',
                      position: 'absolute',
                      transition: 'all 0.2s ease-in-out',
                      fill: 'white.500',
                    }}
                  />
                  <Image
                    width={width}
                    height={height}
                    src={url}
                    alt={`imagem do video ${item.snippet.title}`}
                  />
                </Box>
                <Box
                  boxSize="border-box"
                  overflow="hidden"
                  textAlign="left"
                  w="50%"
                  p="1rem 0 1rem 1rem"
                >
                  <Text isTruncated fontSize="1.1rem">
                    {seperateString(item.snippet.title)}
                  </Text>
                  <Text isTruncated fontSize="0.9rem" fontWeight="normal">
                    {item.snippet.videoOwnerChannelTitle}
                  </Text>
                </Box>
              </Flex>
            </Tooltip>
          </Button>
        );
      })}
    </Flex>
  );
};

export const VideoPlayer = ({ videoId = '', items = [], setSelectedVideo }: VideoPlayerProps) => {
  return (
    <Box
      display="flex"
      justifySelf="center"
      width={{ base: '90vw', lg: '80vw' }}
      height={{ base: '60vw', md: '50vh' }}
      mb={{ base: '4rem', lg: '0' }}
      maxW="133rem"
    >
      <Box
        overflowY="scroll"
        h="50vh"
        w="40%"
        display={{ base: 'none', lg: 'grid' }}
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <ListMusic items={items} setSelectedVideo={setSelectedVideo} videoId={videoId} />
      </Box>

      <Box boxSize={{ base: '100%' }}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0&rel=0`}
          title="YouTube video player"
          allow="autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share"
          allowFullScreen
        ></iframe>
      </Box>
    </Box>
  );
};
