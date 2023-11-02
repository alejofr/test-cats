import { CSSProperties, memo } from 'react'
import { IoHeartOutline, IoThumbsUpSharp, IoThumbsDownSharp } from "react-icons/io5";
import Button from 'react-bootstrap/Button';

interface ButtonFavorite{
  isFeedBack: boolean;
  typeFeedBack:  'fav' | 'like' | 'not-like';
  style?: CSSProperties;
  onClick: () => void;
}

const ButtonFavorite = ({
    isFeedBack,
    typeFeedBack = 'fav',
    style,
    onClick
}: ButtonFavorite) => {
  

  return (
    <Button 
      variant={ !isFeedBack ? 'light' : typeFeedBack == 'fav' || typeFeedBack == 'not-like' ? 'danger' : 'primary' } 
      className='px-2 py-1' 
      style={style} onClick={onClick}
    >
      {
        typeFeedBack == 'fav' &&
        <IoHeartOutline 
          size={18}
          color={isFeedBack ? 'white' : 'red'}
        />
      }
      {
        typeFeedBack == 'like' &&
        <IoThumbsUpSharp 
          size={18}
          color={isFeedBack ? 'white' : 'green'}
        />
      }
      {
        typeFeedBack == 'not-like' &&
        <IoThumbsDownSharp 
          size={18}
          color={isFeedBack ? 'white' : 'red'}
        />
      }
    </Button>
  )
}

export default memo(ButtonFavorite);
