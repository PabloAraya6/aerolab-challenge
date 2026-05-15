import React, { useEffect, useState, useRef, useCallback } from 'react'
import '../../App.css';
import Item from '../item/Item';
import Loading from "../loading";
import axios from "axios";
import Title from '../title/Title';

const Products = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [pages, setPages] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const observer = useRef();

    const getItems = useCallback(async (page) => {
        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const resp = await axios.get(`https://api-aerolab-899.herokuapp.com/api/products?page=${page}`);
            setItems((previousItems) => [...previousItems, ...resp.data.products]);
            setTotalPages(resp.data.page_count);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getItems(1);
        setPages(2);
    }, [getItems]);

    const lastItemRef = useCallback(
        (node) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    if (pages <= totalPages) {
                        getItems(pages);
                        setPages((currentPage) => currentPage + 1);
                    } else {
                        setHasMore(false);
                    }
                }
            });

            if (node) observer.current.observe(node);
        },
        [getItems, hasMore, isLoading, pages, totalPages]
    );

    const Infinite = ({ children, reference }) => {
        return (
            <div ref={reference}>
                {children}
            </div>
        );
    };

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

