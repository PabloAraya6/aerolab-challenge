import '../item/Item.css';
import './buttonCart.css';

const ButtonCart = ({ count, handleToCart }) => {

    const handleAdd = () => {
        count++;
        handleToCart(count);
    };

    const handleSubstract = () => {
        if (count > 0) count--;
        handleToCart(count);
    };

    return (
        <>
            {
                count === 0 ? (
                    <>
                        <button className='product-buttom'>
                            <span className='buttom-text' onClick={handleAdd}>Agregar al carrito</span>
                        </button>
                    </>
                ) : (
                    <>
                        <div className='order-button'>
                            <button className='operation left' onClick={handleSubstract}>-</button>
                            <span className='count-span'>{count}</span>
                            <button className='operation right' onClick={handleAdd}>+</button>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default ButtonCart