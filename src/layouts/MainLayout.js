import React from "react";
import Header from "./../components/Header";
import Footer from "../components/Footer";


const Mainlayout = props =>{
    return(
        <div>
            <div className="main">
                {props.children}
            </div>
        </div>
    );
};

export default Mainlayout;