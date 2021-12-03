import React, { createContext, useState, useEffect } from "react";
export const ProductsContext = createContext();

const ProductsContextProvider = (props) => {
    const [addItemsToCart, setAddItemsToCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const setStorage = () => localStorage.setItem('cart', JSON.stringify(addItemsToCart));
    const getStorage = () => localStorage.getItem('cart') ? setAddItemsToCart(JSON.parse(localStorage.getItem('cart'))) : [];

    const resetCartItems = () => {
        setAddItemsToCart([]);
        setTotalPrice(0);
        setTotalItems(0);
        localStorage.clear();
        window.location.reload(true);
    };

    useEffect(() => {
        getStorage();
    }, []);

    const sumItems = () => {
        let acc = addItemsToCart.reduce((total, item) => total + item.count, 0);
        let total = addItemsToCart.reduce((total, item) => (total + (item.product.price * item.count)), 0).toFixed(2);
        setTotalItems(acc);
        setTotalPrice(total);
    };


    const handleCartItems = (product, count) => {
        const isInCart = addItemsToCart.find((item) => item.product.id === product.id);
        if (isInCart) {
            const idx = addItemsToCart.indexOf(isInCart);
            if (count > 0) {
                const update = Array.from(addItemsToCart);
                update[idx] = {
                    product,
                    count
                };
                setAddItemsToCart(update);
            } else {
                const update = addItemsToCart.filter((item) => item.product.id !== product.id);
                setAddItemsToCart(update);
            }
        } else {
            setAddItemsToCart([
                ...addItemsToCart,
                {
                    product,
                    count
                }
            ]);
        }
        sumItems();
        setStorage();
    };

    const contextValues = {
        handleCartItems,
        resetCartItems,
        sumItems,
        setStorage,
        getStorage,
        totalPrice,
        totalItems,
        addItemsToCart
    }

    return (
        <ProductsContext.Provider value={contextValues}>
            {props.children}
        </ProductsContext.Provider>
    );
};

export default ProductsContextProvider;