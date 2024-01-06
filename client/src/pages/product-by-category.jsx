import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import productStore from "../store/ProductStore.js";
import Layout from "../components/layout/layout.jsx";
import ProductList from "../components/product/product-list.jsx";

const ProductByCategory = () => {

    const {ListByCategoryRequest}=productStore();
    const {id}=useParams()

    useEffect(() => {
        (async ()=>{
            await  ListByCategoryRequest(id);
        })()
    }, [id]);

    return (
        <Layout>
            <ProductList/>
        </Layout>
    );

};

export default ProductByCategory;