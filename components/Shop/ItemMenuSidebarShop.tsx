import { Box, Text } from '@chakra-ui/react';

const active = {
  display: 'flex',
  padding: '7px 16px',
  alignItems: 'center',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.3s ease 0s',
};

const ItemMenu = (props: any) => {
  const { title, isActive } = props;
  return (
    <Box
      sx={
        isActive ? { background: 'rgba(39, 39, 42, 0.12)', ...active } : active
      }
      _hover={{
        background: 'rgba(39, 39, 42, 0.12)',
      }}
    >
      <Text
        sx={{
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: '150%',
          color: 'rgb(56, 56, 61)',
          // color: 'rgb(39, 39, 42)',
          padding: '2px 10px',

          // lineHeight: '16px',
          // display: 'flex',
          // alignItems: 'center',
        }}
      >
        {title}
      </Text>
    </Box>
  );
};

export default ItemMenu;
