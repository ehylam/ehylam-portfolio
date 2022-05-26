// import { useEffect, useRef } from 'react';
// import ImageScroll from '../lib/utils/imageScroll';
import '../lib/scss/Image.scss';

const Image = (props) => {
  const splitText = (text) => {
    return text.split('').map((word, index) => {
      if (word === ' ') return <span key={index}>&nbsp;</span>;
      return <span key={index} className="t"><span>{word}</span></span>;
    });
  }

  return (
    <section className="image_block">
      <div className="image_block__wrapper">
        <div className="image_block__visuals">
          <div className="image_block__cover"></div>
          <img className="interactable" src={props.src} alt={props.alt}/>
          <img className="image_block__bg" src={props.src} alt={props.alt}/>
        </div>
        <h2 className="image_block__heading">
          <span className="parent">
            {splitText(props.heading)}
          </span>
        </h2>
      </div>
    </section>
   );
}

export default Image;