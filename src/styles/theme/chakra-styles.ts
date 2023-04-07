export const styles = {
  global: {
    html: {
      bg: 'black.500',
      minH: '100vh',
      fontSize: '12px',
    },
    body: {
      bg: 'black.500',
      minH: '100vh',
      WebkitTapHighlightColor: 'transparent',
      color: 'white.500',
      fontSize: '12px',
      fontFamily: `"Poppins", sans-serif`,
      fontWeight: '400',
      'h1, h2, h3': {
        fontWeight: '600',
      },
    },
    '#chakra-toast-portal > *': {
      pt: 'safe-top',
      pl: 'safe-left',
      pr: 'safe-right',
      pb: 'safe-bottom',
    },
  },
};
