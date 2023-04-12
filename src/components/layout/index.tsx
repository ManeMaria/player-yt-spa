import { Text, chakra } from '@chakra-ui/react';

import { useIdentifyInstagramBrowser } from '@/hooks/useIdentifyInstagramBrowser';

type LayoutProps = {
  children: React.ReactNode;
};

const Footer = chakra('footer', {
  baseStyle: {
    display: 'grid',
    placeItems: 'center',
    minH: '8vh',
    w: '100%',
    zIndex: '1',
  },
});

const Main = chakra('main', {
  baseStyle: {
    minH: '100vh',
    display: 'grid',
    placeItems: 'center',
  },
});

export const MainLayout = ({ children }: LayoutProps) => {
  const { isInstagramBrowser } = useIdentifyInstagramBrowser();
  return (
    <>
      <Main>{children}</Main>
      <Footer minH="8vh" textAlign="center" mx="auto ">
        <Text fontSize={isInstagramBrowser ? '0.8rem' : '1rem'}>
          Todos os direitos reservados (All rights reserved) - 2024
        </Text>
      </Footer>
    </>
  );
};
