import './Cart.css';
import logo from '../../assets/shopping-cart.png'
import { useEffect, useContext } from 'react';
import { ProductsContext } from '../../contexts/ProductsContext';
const Cart = () => {
    const { addItemsToCart, totalPrice, totalItems, sumItems } = useContext(ProductsContext);

    useEffect(() => {
        sumItems();
    }, [addItemsToCart])

    return (
        <div className='card-container'>
            <span className='price'>$ {totalPrice}</span>
            <img className='image-card' src={logo} alt='logo' />
            <span className='quantity'>{totalItems}</span>
        </div>
    )
}

export default Cart