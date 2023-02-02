import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { Card, CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type ImagesQueryResponse = {
  data: Card[];
  after: string;
}

export default function Home(): JSX.Element {
  const queryImages = async ({ pageParam = null }) => {
    const res = await api.get<ImagesQueryResponse>('/api/images', { params: { after: pageParam }});
    return res.data;
  }

  const getNextPageParam = (lastPage: ImagesQueryResponse) => {
    if (lastPage && lastPage.after) return lastPage.after;
    else return null;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    queryImages,
    // TODO GET AND RETURN NEXT PAGE PARAM
    { getNextPageParam }
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    if (!data || !data.pages) return [];
    const cards = data.pages.flatMap(page => page.data);
    return cards;
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading) return <Loading />;

  // TODO RENDER ERROR SCREEN
  if (isError) return <Error />;

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
        { hasNextPage &&
          <Button marginTop={10} onClick={() => fetchNextPage()}>
            { isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        }
      </Box>
    </>
  );
}
