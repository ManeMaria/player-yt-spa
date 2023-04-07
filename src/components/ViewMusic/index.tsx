import { Flex, Grid, IconButton, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { NextIcon } from '@/assets/icons/NextIcon';
import { PlayIcon } from '@/assets/icons/PlayIcon';
import { PLAYLISTS_IDS } from '@/config';
import { useItemsContext } from '@/context/ItemsProvider';

import { PrevIcon } from '../../assets/icons/PrevIcon';

const defaultStyles = {
  variant: 'unstyled',
  fill: 'white.500',
};

const findPositionCurrentVideo = (items: Item[], id: string) => {
  const position = items.find((item) => item.snippet.resourceId.videoId === id)?.snippet.position;
  return position;
};

export const ViewMusic = () => {
  const itemsCtx = useItemsContext();
  const [current, setCurrent] = useState(0);
  const items = itemsCtx?.values?.items || [];
  const isFirstRender = itemsCtx?.values?.isFirstRender || false;
  useEffect(() => {
    if (itemsCtx?.values?.videoId) {
      setCurrent(findPositionCurrentVideo(items, itemsCtx?.values?.videoId) || 0);
    } else {
      setCurrent(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsCtx?.values?.videoId]);

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
        <Grid gridTemplateColumns="auto auto auto">
          <IconButton
            isDisabled={current === 0}
            icon={<PrevIcon />}
            aria-label={'anterior'}
            onClick={() => {
              setCurrent((current) => {
                const prev = current - 1;
                itemsCtx?.setValues((state) => ({
                  ...state,
                  videoId: items[prev]?.snippet?.resourceId?.videoId,
                }));
                return prev;
              });
            }}
            {...defaultStyles}
          />

          <Link href={`/home?id=${PLAYLISTS_IDS[0]}`}>
            <IconButton
              icon={<PlayIcon />}
              aria-label={'tocar'}
              isDisabled={!isFirstRender}
              {...defaultStyles}
            />
          </Link>

          <IconButton
            isDisabled={current === items.length - 1}
            icon={<NextIcon />}
            aria-label={'próximo'}
            onClick={() => {
              setCurrent((current) => {
                const next = current + 1;
                itemsCtx?.setValues((state) => ({
                  ...state,
                  videoId: items[next]?.snippet?.resourceId?.videoId,
                }));
                return next;
              });
            }}
            {...defaultStyles}
          />
        </Grid>
      </>
    </Flex>
  );
};
