import './Item.css';
import React, { useState, useEffect, useContext } from "react";
import ButtonCart from '../buttonCart/buttonCart';
import { ProductsContext } from '../../contexts/ProductsContext';

const Item = ({ item }) => {

    const [countItem, setCountItem] = useState(0);
    const { addItemsToCart, handleCartItems, getStorage, setStorage } = useContext(ProductsContext);

    const handleToCart = (count) => {
        setCountItem(count);
        handleCartItems(item, count);
    };

    useEffect(() => {
        getStorage();
        const flag = addItemsToCart.find((element) => element.product.id === item.id);
        if (flag)
            setCountItem(flag.count)
    }, []);

    useEffect(() => {
        setStorage();
    }, [countItem]);


    return (
        <>
            <div className='card'>
                <img className='product-image' src={item.photo} alt="product"></img>
                <h1 className='product-title'>{item.name}</h1>
                <div className='product-price'>
                    {
                        (item.price === item.originalPrice)
                            ?
                            <span className='price-span'>$ {item.price.toFixed(2)}</span>
                            :
                            <>
                                <span className='price-span-old'>$ <strike>{item.originalPrice.toFixed(2)}</strike></span>
                                <span className='price-span'>$ {item.price.toFixed(2)}</span>
                            </>
                    }
                </div>
                <ButtonCart count={countItem} handleToCart={handleToCart} />
            </div>
        </>
    )
}

export default Item