import './Item.css';
import ProductImage from '../../assets/ProductImage.png'

const Item = () => (
        <div className='item-container'>
            <div className='card'>
                <img className='product-image' src={ProductImage} alt="product"></img>
                <h1 className='product-title'>Mayonesa Light Doypack Hellmanns</h1>
                <div className='product-price'>
                    <span className='price-span'>$223.3</span>
                </div>
                <button className='product-buttom'>CLICK</button>
            </div>
        </div>
)

export default Item