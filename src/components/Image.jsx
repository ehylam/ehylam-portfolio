const Image = (props) => {
  return (
    <section className="image_block">
      <img className="interactable" src={props.src} alt={props.alt}/>
    </section>
   );
}

export default Image;