import { useEffect, useRef } from 'react';
import ImageScroll from '../lib/utils/ImageScroll';
import '../lib/scss/Image.scss';

const Image = (props) => {
  const image = useRef(null);
  useEffect(() => {
    new ImageScroll(image.current);
  },[])
  return (
    <section ref={image} className="image_block">
      <div className="image_block__wrapper">
        <div className="image_block__cover"></div>
        <img className="interactable" src={props.src} alt={props.alt}/>
        <div className="image_block__bg" style={{backgroundImage: `url(${props.src})`}}></div>
        <h2 className="image_block__heading">
          <span>
            {props.heading}
          </span>
        </h2>
      </div>
    </section>
   );
}

export default Image;