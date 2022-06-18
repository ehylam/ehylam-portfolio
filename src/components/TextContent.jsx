import { useEffect } from 'react';
import TextScroll from  '../lib/utils/TextScroll';
import '../lib/scss/TextContent.scss';

const TextContent = () => {
  useEffect(() => {
    const textScroll = new TextScroll('.text_content__text');
  })
  return (
    <section className="text_content">
      <div className="text_content__wrapper">
        <div className="text_content__text">
          Lorem ipsum, dolor sit
        </div>
        <div className="text_content__text">
          Lorem ipsum dolor sit amet.
        </div>
        <div className="text_content__text">
           consectetur adipisicing elit.
        </div>
        <div className="text_content__text">
          consectetur adipisicing.
        </div>
        <div className="text_content__text">
          dolor sit amet
        </div>
        <div className="text_content__text">
          ipsum dolor sit.
        </div>
        <div className="text_content__text">
          amet consectetur adipisicing elit.
        </div>
        <div className="text_content__text">
          amet consectetur
        </div>
        <span>Rough replication of the text animation from - <a href="https://monopo.vn/">https://monopo.vn/</a></span>
      </div>
    </section>
   );
}

export default TextContent;