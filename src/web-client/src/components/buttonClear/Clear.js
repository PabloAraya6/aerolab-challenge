import './Clear.css';
import { ProductsContext } from '../../contexts/ProductsContext';
import { useContext } from 'react';

const Clear = () => {

    const { resetCartItems } = useContext(ProductsContext);

    return (
        <>
            <button className='clear' onClick={resetCartItems}>CLEAR</button>
        </>
    );
}

export default Clear