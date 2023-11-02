import { CSSProperties } from 'react';


interface PlaceholderImage{
    style?: CSSProperties;
}


export const PlaceholderImage = ({
    style
}: PlaceholderImage) => {
  return (
    <div className='placeholderImage' style={style}>
        <div className='placeholderImage-swipe'></div>
    </div>
  )
}
