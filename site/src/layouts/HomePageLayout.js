import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePagelayout = props =>{
    return(
        <div className="fullheiheght">
            <Header {...props}/>
            {props.children}
            <Footer />
        </div>
    );
};

export default HomePagelayout;