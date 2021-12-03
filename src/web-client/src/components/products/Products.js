import React, { useEffect, useState, useRef, useCallback } from 'react'
import '../../App.css';
import Item from '../item/Item';
import Loading from "../loading";
import axios from "axios";
import Title from '../title/Title';

const TOTAL_PAGES = 10;

const Products = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [pages, setPages] = useState(1);
    const observer = useRef();

    useEffect(() => {
        getItems(pages);
        setPages((pages) => pages + 1);
    }, []);

    const lastItemRef = useCallback(
        (node) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    if (pages < TOTAL_PAGES) {
                        getItems(pages);
                        setPages((pages) => pages + 1);
                    } else {
                        setHasMore(false);
                    }
                }
            });

            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore]
    );

    const Infinite = ({ children, reference }) => {
        return (
            <div ref={reference}>
                {children}
            </div>
        );
    };

    const getItems = async (page) => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        await axios.get(`https://api-aerolab-899.herokuapp.com/api/products?page=${page}`)
            .then(resp => {
                setItems([...items, ...resp.data.products])
                setIsLoading(false)
            });
    }

    return (
        <>
            <div className="main-container">
                <Title />
                <div className="listing-container">
                    {
                        items.map((item, index) =>
                            index + 1 === items.length ? (
                                <Infinite reference={lastItemRef} key={index}>
                                    <Item item={item} key={item.id} />
                                </Infinite>
                            ) : (
                                <Infinite key={index}>
                                    <Item item={item} key={item.id} />
                                </Infinite>
                            )
                        )
                    }
                    <div className='loading'>
                        {isLoading && <Loading />}
                    </div>
                </div>
            </div>
        </>
    )
};

export default Products;

