import Layout from "../components/layout/layout.jsx";
import Slider from "../components/product/slider.jsx";
import Categories from "../components/product/categories.jsx";
import Products from "../components/product/products.jsx";
import Brands from "../components/product/brands.jsx";
import productStore from "../store/ProductStore.js";
import featureStore from "../store/FeatureStore.js";
import {useEffect} from "react";
import Features from "../components/product/features.jsx";


const HomePage = () => {

    const {BrandListRequest,ListByRemarkRequest,CategoryListRequest,SliderListRequest}=productStore();
    const {FeatureListRequest}=featureStore();

    useEffect(() => {
        (async ()=>{
            await  SliderListRequest();
            await  CategoryListRequest();
            await  ListByRemarkRequest("new");
            await  BrandListRequest()
            await  FeatureListRequest()
        })()
    }, []);


    return (
        <Layout>
            <Slider/>
            <Features/>
            <Categories/>
            <Products/>
            <Brands/>
        </Layout>
    );
};

export default HomePage;