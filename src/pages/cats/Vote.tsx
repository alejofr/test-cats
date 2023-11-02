import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ButtonFeedBack, CardThumbnailImage } from '../../components';
import { useGetVotesQuery } from '../../store/apis';

export const Vote = () => {
  const { data } = useGetVotesQuery({});

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
                    typeFeedBack={ item.value == 1 ? 'like' : 'not-like' }
                    isFeedBack={ true }
                    onClick={() => null}
                  />
                </div>    
              </CardThumbnailImage>
          </Col>
        ))
      }
    </Row>
  )
}
