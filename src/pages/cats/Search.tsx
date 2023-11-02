
import { useCallback, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { 
    useGetAllBreedsQuery,
    useGetAllCategoriesQuery,
    useGetImagesQuery,
    useCreateFavoriteMutation,
    useGetFavoritesQuery,
    useDeleteFavoriteMutation,
    useCreateVoteMutation,
    useGetVotesQuery 
} from '../../store/apis/theCatApi';

import { FilterCatSearch, CardThumbnailImage, ButtonFeedBack } from '../../components';
import { helperVerifyIdFeedBack } from '../../helpers';
import { ParamsSearchImages } from '../../interfaces/cat';


const paramInit: ParamsSearchImages = {
    limit: 10,
}

export const Search = () => {
    const { data: breeds } = useGetAllBreedsQuery({});
    const { data: categories } = useGetAllCategoriesQuery({});

    const [ params, setParams ] = useState(paramInit);
    const { data } = useGetImagesQuery(params);
    
    // accion favorito
    const {data: favorites, refetch: refreshFavorites  } = useGetFavoritesQuery({});
    const [ createFavorite ] = useCreateFavoriteMutation();
    const [ deleteFavorite ] = useDeleteFavoriteMutation();

    //accion votaciones
    const { data: votes, refetch: refreshVotes  } = useGetVotesQuery({});
    const [ createVote ] = useCreateVoteMutation();

    // nuevos parametros en la busquedad de imagenes
    const onQueryParams = useCallback((values: ParamsSearchImages) => {

        setParams({...params, ...values});
        
    }, []);

    //accion de feedBack
    const actionFeedBack = async(id: string, type: 'FAV' | 'VOTE', value?: 1 | -1) => {
        value = value ? value : 1;

        switch (type) {
            case 'FAV':
                const fav = helperVerifyIdFeedBack(favorites, id, 'image_id');

                if( fav ){
                    deleteFavorite({ id: fav.id }).then(() => refreshFavorites())
                    break;
                }
                createFavorite({image_id: id})
                    .then(() => refreshFavorites());
                break;
            default:
                createVote({ image_id: id, value: value  })
                    .then(() => refreshVotes())
                break;
        }
        
    };
    

    return (
        <>
            <FilterCatSearch 
                breeds={breeds ? breeds : []}
                categories={categories ? categories: []}
                formInit={paramInit}
                onChangeForm={onQueryParams}
            />

            <Row className='mt-4'>
                {
                    data &&
                    data.map(item => (
                        <Col key={item.id} lg={3} sm={4} className='mb-3'>
                            <CardThumbnailImage 
                                urlImage={item.url}
                            >
                                <div 
                                    className='p-1 d-flex flex-row justify-content-between position-absolute bottom-0 w-100 left-0'
                                >
                                   <>
                                        <ButtonFeedBack 
                                            typeFeedBack='fav'
                                            isFeedBack={ helperVerifyIdFeedBack(favorites, item.id, 'image_id') !== undefined }
                                            onClick={() => actionFeedBack(item.id, 'FAV')}
                                        />
                                        {
                                            helperVerifyIdFeedBack(votes, item.id, 'image_id') === undefined &&
                                            <div className='d-flex flex-row'>
                                                <ButtonFeedBack 
                                                    typeFeedBack='like'
                                                    isFeedBack={false}
                                                    onClick={() => actionFeedBack(item.id, 'VOTE')}
                                                />
                                                <ButtonFeedBack 
                                                    typeFeedBack='not-like'
                                                    isFeedBack={false}
                                                    style={{
                                                        marginLeft: 10
                                                    }}
                                                    onClick={() => actionFeedBack(item.id, 'VOTE')}
                                                />
                                            </div>
                                        }
                                        
                                    </>
                                   
                                </div>    
                            </CardThumbnailImage>
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}
