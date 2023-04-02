import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import Stars from './star';

const maxStars = 5;

const RateInput = (props: any)=>{
    const [star, setStar] = useState(1);

    const starsHover = (starToChange: number) => {
        console.log(starToChange)
        setStar(starToChange)
    }

    const ratingBar = [];
    
    for (let i = 0; i < maxStars; i++) {
        ratingBar.push(
            <Box key={i}
                sx={{
                    width: '16px', 
                    height: '18px', 
                    padding: '1px', 
                    cursor: 'pointer', 
                    // ':hover': {backgroundColor: 'gold'},
                }}

                onMouseEnter={() => starsHover(i+1)}
            >
            </Box>
        )
    }

    return (
        <Box position='relative'>
            <Box 
                sx = {{
                    display: 'flex',  
                    position: 'absolute',
                    left: 0,
                    right: 0,
                }}>

                {ratingBar}
            </Box>
            <Stars star={star} size={"16px"}/>
        </Box>
    )
}

export default RateInput