import { Box, Button, Typography } from '@mui/material';
import React, { MouseEvent } from 'react';
import styles from '@styles/UserInputView.module.css';


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

  const handleClickTopic = (e: MouseEvent, index: number) => {
    console.log(index, e.target);
  }


  return (
    <>
      <Box className={`${styles.popularTopics}`}>
        <Typography
          variant='h6'
          className={`${styles.topicsHeading}`}
          >
            Popular Topics
        </Typography>
        {
          topicsList.map((topic, i) => {
            return <Button
              variant='outlined'
              className={`${styles.topicsButton}`}
              key={`topic-button-${i}`}
              onClick={(e) => handleClickTopic(e, i)}
              >
                <Typography variant='body1' color='textPrimary' className='topic-data' id={`topic-${i}`}>{topic}</Typography>
              </Button>
          })
        }
      </Box>
    </>
   );
}

export default PopularTopics;