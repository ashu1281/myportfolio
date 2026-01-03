import { Stack, Typography } from '@mui/material';

type PageTitleProps = {
  bgText: string;
  title: string;
  highlight: string;
};

const PageTitle = ({ bgText, title, highlight }: PageTitleProps) => {
  return (
    <Stack
      width="100%"
      alignItems="center"
      justifyContent="center"
      textTransform="uppercase"
      mb={6}
      position="relative"
    >
      {/* Background Text */}
      <Typography
        fontSize={{ xs: '40px', lg: '100px' }}
        fontWeight="800"
        letterSpacing={15}
        position="absolute"
        top={{ xs: '-30%', lg: '-35%' }}
        left="50%"
        sx={{
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
        textAlign="center"
        color={(theme) =>
          theme.palette.mode === 'dark' ? '#ffffff12' : '#1e253012'
        }
      >
        {bgText}
      </Typography>

      {/* Foreground Title */}
      <Typography
        fontWeight="900"
        fontSize={{ xs: '25px', lg: '60px' }}
        textAlign="center"
        position="relative"
        width="100%"
      >
        {title}
        <span style={{ color: 'var(--mainPraimary)' }}> {highlight}</span>
      </Typography>
    </Stack>
  );
};

export default PageTitle;
