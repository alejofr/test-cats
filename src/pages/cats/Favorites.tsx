import { useCallback } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ButtonFeedBack, CardThumbnailImage } from '../../components';
import { useDeleteFavoriteMutation, useGetFavoritesQuery } from '../../store/apis';

export const Favorites = () => {

  // accion favorito
  const {data, refetch: refreshFavorites  } = useGetFavoritesQuery({});
  const [ deleteFavorite ] = useDeleteFavoriteMutation();

  const deleteFav = useCallback(
    (id: number) => {
      deleteFavorite({ id }).then(() => refreshFavorites())
    },
    [],
  );
  
  return (
    <Row className='mt-4'>
    {
      data &&
      data.map(item => (
        <Col key={item.id} lg={3} sm={4} className='mb-3'>
            <CardThumbnailImage 
              urlImage={item.image.url}
            >
              <div 
                className='p-1 position-absolute bottom-0 w-100 left-0'
              >
                <ButtonFeedBack 
                  typeFeedBack='fav'
                  isFeedBack={ true }
                  onClick={() => deleteFav(item.id)}
                />
              </div>    
            </CardThumbnailImage>
        </Col>
      ))
    }
  </Row>
  )
}
