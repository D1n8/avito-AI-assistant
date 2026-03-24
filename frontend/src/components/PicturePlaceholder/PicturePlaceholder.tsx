import img from 'App/assets/placeholder-image.png'
import './PicturePlaceholder.css'

function PicturePlaceholder() {
    return ( 
        <img src={img} alt="" className='img-placeholder'/>
     );
}

export default PicturePlaceholder;