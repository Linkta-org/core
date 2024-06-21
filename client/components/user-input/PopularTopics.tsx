import { Box, Button, Typography } from '@mui/material';
import React from 'react';


interface PopularTopicsProps {

}

const PopularTopics: React.FC<PopularTopicsProps> = () => {
  const topicsList = [
    'Data Structures',
    'Renewable Energy',
    'Taxonomy of Living Organisms',
    'Human Body Systems',
    'Computer Networking',
    'Systems Design'
  ];

  const handleClickTopic = (e: any) => {
    console.log(e);
  }


  return (
    <>
      <Box className='popular-topics'>
        <Typography className='topics-header'>Popular Topics</Typography>
        {
          topicsList.map((topic, i) => {
            return <Button
              className='topic-button'
              key={`topic-button-${i}`}
              onClick={handleClickTopic}
              >
                <Typography className='topic-data' id={`topic-${i}`}>{topic}</Typography>
              </Button>
          })
        }
      </Box>
    </>
   );
}

export default PopularTopics;