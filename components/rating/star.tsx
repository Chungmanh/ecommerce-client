import { Box } from '@chakra-ui/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface StarProps {
  star: number;
  size?: string;
}

const Stars = (props: StarProps) => {
  const { star, size } = props;
  const starRound = Math.round(star);

  const stars = [];
  for (let i = 0; i < starRound; i++) {
    stars.push(
      <AiFillStar
        key={i}
        style={{ width: size, height: size }}
        color={'gold'}
      />
    );
  }

  if (starRound < 5) {
    for (let i = 0; i < 5 - starRound; i++) {
      stars.push(
        <AiOutlineStar
          key={starRound + i}
          style={{ width: size, height: size }}
          color={'gold'}
        />
      );
    }
  }

  return (
    <Box display={'flex'} alignItems={'center'}>
      {stars}
    </Box>
  );
};

export default Stars;
