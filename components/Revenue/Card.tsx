import { Box, Text } from '@chakra-ui/react';

interface RevenueProps {
  icon?: React.ReactNode;
  title: string;
  value: number;
  backgroundColor: string;
  color: string;
}

const RevenueCard: React.FC<RevenueProps> = (props) => {
  const { icon, title, value, backgroundColor, color } = props;
  return (
    <Box
      sx={{
        minWidth: '250px',
        minHeight: '230px',
        padding: '40px 0px',
        margin: '12px',
        backgroundColor: backgroundColor,
        overflow: 'hidden',
        borderRadius: '12px',
        textAlign: 'center',
        color: color,
        fontWeight: 700,
        lineHeight: 1.5,
      }}
    >
      {icon}
      <Text>{title}</Text>
      <Text
        sx={{
          fontSize: '28px',
          opacity: 0.7,
        }}
      >
        {value}
      </Text>
    </Box>
  );
};

export default RevenueCard;
