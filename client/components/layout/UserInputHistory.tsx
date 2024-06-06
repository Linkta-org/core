import React, { useEffect, useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { fetchUserInputListFromApi } from '@/client/services/userInputService';

const MAX_HEIGHT = 1000;
const ITEMS_PER_PAGE = 10;

interface UserInput {
  _id: string;
  input: string;
}

export default function UserInputHistory() {
  const [userInputList, setUserInputList] = useState<UserInput[]>([]);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUserInputs = async () => {
      setLoading(true);

      try {
        const inputList = await fetchUserInputListFromApi(page);
        setUserInputList((prevInputList) => [...prevInputList, ...inputList]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user inputs:', error);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadUserInputs();
  }, [page]);

  const handleShowMore = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
      setVisibleItems((prevVisibleItems) => prevVisibleItems + ITEMS_PER_PAGE);
    }
  };

  const handleShowLess = () => {
    setVisibleItems((prevVisibleItems) =>
      Math.max(prevVisibleItems - ITEMS_PER_PAGE, ITEMS_PER_PAGE)
    );
  };

  return (
    <Box
      className="recent-user-inputs"
      mt={5}
      pl={2}
    >
      <Typography
        variant="body2"
        color={'primary.contrastText'}
        gutterBottom
      >
        Recent
      </Typography>
      <Box
        className="scrollable-box"
        sx={{
          maxHeight: MAX_HEIGHT,
          overflow: 'auto',
        }}
      >
        <List>
          {userInputList.slice(0, visibleItems).map((input, index) => (
            <ListItem key={`${input._id}-${index}`}>
              <ListItemText
                primary={
                  <Typography
                    variant="caption"
                    noWrap
                    sx={{
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%',
                    }}
                  >
                    {input.input}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        {visibleItems < userInputList.length && (
          <Button
            onClick={handleShowMore}
            variant="contained"
            sx={{
              width: '70%',
              fontSize: '0.7em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
            }}
            startIcon={<ExpandMore />}
          >
            Show More
          </Button>
        )}
        {visibleItems > ITEMS_PER_PAGE && (
          <Button
            onClick={handleShowLess}
            variant="contained"
            sx={{
              width: '70%',
              fontSize: '0.7em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
            }}
            startIcon={<ExpandLess />}
          >
            Show Less
          </Button>
        )}
      </Box>
    </Box>
  );
}
