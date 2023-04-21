import { Box, Button, Flex, Text, Tooltip, Image as ChackraImage, Grid } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { PlayCicleIcon } from '@/assets/icons/PlayCicleIcon';
import { DEFAULT_YT_URL } from '@/config';
import { ItemsContextProps } from '@/context/ItemsProvider';

type VideoPlayerProps = ItemsContextProps & {
  setSelectedVideo: (id: string) => void;
  imageURL?: string;
};

const seperateString = (str: string) => {
  const arr = str.split(' - ');
  const second = arr[1];
  return second;
};

const ListMusic = ({ items = [], setSelectedVideo, videoId }: VideoPlayerProps) => {
  return (
    <Flex flexWrap="wrap" alignContent="center" w="70%">
      {items.map((item) => {
        ChackraImage;
        const width = item.snippet.thumbnails.default?.width || 0;
        const height = item.snippet.thumbnails.default?.height || 0;
        const url = item.snippet.thumbnails.default?.url || '';
        const equalId = item.snippet.resourceId.videoId === videoId;
        return (
          <Link
            href={`${DEFAULT_YT_URL}${item?.snippet.playlistId}`}
            target="_blank"
            key={item.id}
            style={{
              width: '100%',
            }}
          >
            <Button
              bg="gray.500"
              border="solid 2px"
              width="100%"
              h={height}
              borderColor={equalId ? 'red.500' : 'transparent'}
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
          </Link>
        );
      })}
    </Flex>
  );
};

export const VideoPlayer = ({ videoId = '', items = [], setSelectedVideo }: VideoPlayerProps) => {
  const selectedVideo = items.find((item) => item.snippet.resourceId.videoId === videoId);
  const maxW = selectedVideo?.snippet.thumbnails.maxres?.width || 0;
  const maxH = selectedVideo?.snippet.thumbnails.maxres?.height || 0;
  const url = selectedVideo?.snippet.thumbnails.maxres?.url || '';

  return (
    <Grid
      display="flex"
      justifySelf="center"
      alignItems="center"
      width={{ base: '90vw', lg: '80vw' }}
      height={{ base: 'auto', lg: '60vh' }}
      mb={{ base: '4rem', lg: '0' }}
      maxW="133rem"
      gridTemplateColumns={{ base: '1fr', lg: '40% 1fr' }}
    >
      <Grid
        overflowY="scroll"
        boxSize="border-box"
        h="100%"
        w="40%"
        display={{ base: 'none', lg: 'grid' }}
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <ListMusic items={items} setSelectedVideo={setSelectedVideo} videoId={videoId} />
      </Grid>

      <Grid placeItems="center" px="2rem">
        <Link target="_blank" href={`${DEFAULT_YT_URL}${selectedVideo?.snippet.playlistId}`}>
          <Image width={maxW} height={maxH} src={url} alt="image principal" priority />
        </Link>
      </Grid>
    </Grid>
  );
};
