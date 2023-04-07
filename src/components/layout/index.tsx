import { Grid, Text, chakra } from '@chakra-ui/react';

import { ViewMusic } from '../ViewMusic';

type LayoutProps = {
  children: React.ReactNode;
};

const Footer = chakra('footer', {
  baseStyle: {
    display: 'grid',
    placeItems: 'center',
    minH: '8vh',
    fontSize: 'min(2vw, 1.2rem)',
    mt: '10vh',
    w: '100%',
    zIndex: '1',
  },
});

export const MainLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <main>{children}</main>

      <Footer>
        <ViewMusic />
        <Grid minH="8vh" placeItems="center">
          <Text>Todos os direitos reservados (All rights reserved) - 2024</Text>
        </Grid>
      </Footer>
    </>
  );
};
