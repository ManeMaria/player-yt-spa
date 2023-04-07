import { Flex, Grid, IconButton, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { NextIcon } from '@/assets/icons/NextIcon';

import { PrevIcon } from '../../assets/icons/PrevIcon';

type ViewMusicProps = {
  items?: Item[];
  setSelectedVideo: (id: string) => void;
  currentVideo?: string;
};

const defaultStyles = {
  variant: 'unstyled',
};

const findPositionCurrentVideo = (items: Item[], id: string) => {
  const position = items.find((item) => item.snippet.resourceId.videoId === id)?.snippet.position;
  return position;
};

export const ViewMusic = ({ currentVideo = '', setSelectedVideo, items = [] }: ViewMusicProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(findPositionCurrentVideo(items, currentVideo) || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideo]);

  return (
    <Flex
      py="0.4rem"
      w="100%"
      minH="5rem"
      justifyContent="center"
      alignItems="center"
      bg="red.500"
      zIndex="1"
    >
      {currentVideo && (
        <>
          <Image
            src={items[current]?.snippet?.thumbnails?.maxres?.url || ''}
            width={80}
            height={80}
            alt={'preview'}
          />
          <Text mx="0.5rem" w="15%" isTruncated textAlign="center">
            {items[current]?.snippet?.title}
          </Text>
          <Grid gridTemplateColumns="auto auto">
            <IconButton
              isDisabled={current === 0}
              icon={<PrevIcon />}
              aria-label={'anterios'}
              onClick={() => {
                setCurrent((current) => {
                  const prev = current - 1;
                  setSelectedVideo(items[prev]?.snippet?.resourceId?.videoId);
                  return prev;
                });
                setSelectedVideo(items[current]?.snippet?.resourceId?.videoId);
              }}
              {...defaultStyles}
            />

            <IconButton
              isDisabled={current === items.length - 1}
              icon={<NextIcon />}
              aria-label={'próximo'}
              onClick={() => {
                setCurrent((current) => {
                  const next = current + 1;
                  setSelectedVideo(items[next]?.snippet?.resourceId?.videoId);
                  return next;
                });
              }}
              {...defaultStyles}
            />
          </Grid>
        </>
      )}
    </Flex>
  );
};
