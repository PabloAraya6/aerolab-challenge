import './Cart.css';
import logo from '../../assets/shopping-cart.png'

const Cart = () => (
    <div className='card-container'>
        <span className='price'>$2.525,30</span>
        <img className='image-card' src={logo} alt='logo' />
        <span className='quantity'>1</span>
    </div>
)

export default Cart