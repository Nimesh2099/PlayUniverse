import React from 'react';
// Change Placeholder
import placeholder from './../../assets/Placeholder_Image.jpeg';
import './styles.scss';


const Directory = probs => {
    return(
        <div className='Directory'>
            <div className='wrap'>
                <h2>
                    Add Home Page Design Code Here
                    {/* Sample Desgin Code */}
                </h2>
                <div
                 className='item'
                 style={{
                    backgroundImage: `url(${placeholder})`
                }}
                >
                    <a href='#'>
                        Something
                    </a>
                </div>
                <div
                 className='item'
                 style={{
                    backgroundImage: `url(${placeholder})`
                }}
                >
                     <a href='#'>
                        Something
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Directory;