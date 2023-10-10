import React from 'react';
// Change Placeholder
//import placeholder from './../../assets/Placeholder_Image.jpeg';
import hatImg from './../../assets/smartHatImage.png'
import floppyImg from './../../assets/floppy.png'
import supernightImg from './../../assets/supernight.png'
import powerdashImg from './../../assets/powerdash.png'
import './styles.scss';
import GameItem from '../GameItem';


const Directory = props => {
    return(
        <div className='Directory'>
            <div className='wrap'>
                <div className='headImg'>
                    
                </div>
                <div className="intro">
                    <h1>Who are we?</h1>
                    <p className="text-wrapper-7">
                    we are a passionate team of indie game developers Who love playing and making games. we've been
                    developing games about 6 years from now, and looking forward to publishing more games in future. we put our
                    heart and soul into these games.
                    </p>
                    <br/>
                    <h1 className='games'>Our Games</h1>
                </div>
                <div className='gameList'>
                    < GameItem img_src ={hatImg} 
                    img_alt="Smart Hat logo"
                    title="Smart Hat"
                    detail1='“Smart Hat” is a neon-Platformer with a simple but exciting puzzle design.'
                    detail2='This is a prototype to challenge the audience and demonstrate the game.'>

                    </GameItem>
                    < GameItem img_src={floppyImg}
                    img_alt="Floppy the fish logo"
                    title="Floppy the fish"
                    detail1='Welcome to a new free game: Floppy The Fish! Help floppy and it’s friends to survive the dangerou sea!'
                    detail2='This is a prototype to challenge the audience and demonstrate the game.'>

                    </GameItem>
                    < GameItem img_src={supernightImg}
                    img_alt="Super Night Shooter logo"
                    title="Super Night Shooter"
                    detail1='Awesome VR game made for fighting the pandemic situation'
                    detail2='Load your VR Headset and jump into FPS Shooting Action with great music.'>
                        
                    </GameItem>
                    < GameItem img_src={powerdashImg}
                    img_alt="Power Dash logo"
                    title="Power Dash"
                    detail1='A fantastic platformer dashing cube game.'
                    detail2='This is a prototype to challenge the audience and demonstrate the game.'>

                    </GameItem>
                </div>
            </div> 
         </div>
    );
};

export default Directory;