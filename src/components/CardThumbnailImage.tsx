import { useEffect, useState } from 'react';
import { default as ImageBS } from 'react-bootstrap/Image';
import { PlaceholderImage } from './PlaceholderImage';

interface CardThumbnailImage{
    urlImage: string;
    children?: JSX.Element | JSX.Element[];
}

export const CardThumbnailImage = ({
    urlImage,
    children
}: CardThumbnailImage) => {
    const [imgSrc, setImgSrc] = useState(urlImage);
    const [loanding, setLoanding] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      
        const img = new Image();
        img.src = urlImage;

        img.onload = () => {
            setImgSrc(urlImage);
            
            setTimeout(() => {
                setLoanding(false);
            }, 1000);
        };

        img.onerror = () =>{
            setIsError(true);

            setTimeout(() => {
                setLoanding(false);
            }, 1000);
        }
      
     
    }, [urlImage])
    

    return (
        <div className={`card-img-cat ${isError && 'error-img'}`}>
            { loanding && <PlaceholderImage 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%'
                }}
            />}
            {
                <ImageBS
                    src={imgSrc}
                    className='p-0 border-0'
                    height={isError ? 40 : 180}
                    width={isError ? 40 : 174}
                    thumbnail
                />
            } 

            {
                isError && <p className='text-danger mt-2' >Ops... Error al cargar la imagen</p>
            }  

            {
                !isError && !loanding &&
                children
            }
        </div>
    )
}
