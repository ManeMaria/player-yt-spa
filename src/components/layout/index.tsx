import { Container, chakra } from '@chakra-ui/react';

type LayoutProps = {
  children: React.ReactNode;
};

const Footer = chakra('footer', {
  baseStyle: {
    display: 'grid',
    placeItems: 'center',
    minH: '8vh',
    fontSize: 'min(2vw, 1.2rem)',
    mt: 'auto',
    w: '100%',
  },
});

export const MainLayout = ({ children }: LayoutProps) => {
  return (
    <Container maxW="133rem" centerContent>
      <main>{children}</main>
      <Footer>Todos os direitos reservados (All rights reserved) - 2024</Footer>
    </Container>
  );
};
