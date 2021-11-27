import './Brand.css'
import logo from '../../assets/CombinedShape2.png';

const Brand = () => (
    <div className='brand-container'>
        <img className='image-brand' src={logo} alt='logo' />
        <h2 className='title-brand'>
            <span className='bold'>EZ</span>
            <span className='normal'>shop</span>
        </h2>
    </div>
)

export default Brand
