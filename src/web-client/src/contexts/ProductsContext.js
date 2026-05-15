import React, { createContext, useState, useEffect, useCallback } from "react";
export const ProductsContext = createContext();

const ProductsContextProvider = (props) => {
    const [addItemsToCart, setAddItemsToCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const setStorage = useCallback(() => localStorage.setItem('cart', JSON.stringify(addItemsToCart)), [addItemsToCart]);
    const getStorage = useCallback(() => localStorage.getItem('cart') ? setAddItemsToCart(JSON.parse(localStorage.getItem('cart'))) : [], []);

    const resetCartItems = () => {
        setAddItemsToCart([]);
        setTotalPrice(0);
        setTotalItems(0);
        localStorage.clear();
        window.location.reload(true);
    };

    useEffect(() => {
        getStorage();
    }, [getStorage]);

    const sumItems = useCallback(() => {
        let acc = addItemsToCart.reduce((total, item) => total + item.count, 0);
        let total = addItemsToCart.reduce((total, item) => (total + (item.product.price * item.count)), 0).toFixed(2);
        setTotalItems(acc);
        setTotalPrice(total);
    }, [addItemsToCart]);


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