
import React, {useState} from 'react'
import PayPal from './PayPal'

import {Projects} from './projects'


const AllProjects = () => {

    const [proj, setProj] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [link, setLink] = useState(null);
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState(0);
    const [priceProp, setPriceProp] =  useState(0)
    const [checkout, setCheckOut] = useState(false);
    
    const priceChange = (e) => {
        e.preventDefault();
        setPrice(e.target.value);

    }
    

    function RenderInner() {
        if (proj != null) {
            return (
                <div className="full_proj">
                    <div className="project_info">
                        <h1 className="calc-title">{title}</h1>
                        <p className="calc-result">{description}</p>
                        <a href={link} target="_blank" className="calc-results">Learn More</a>
                    </div>
                    <div className="project_image">
                        <img src={image} alt={title} className="big_img"/>
                    </div>
                </div>
            )
        } else  {
            return (
                <div>No Project Selected</div>
            )
        }
    }

    return (
        <>
            <div>
                <h1>Offset Projects</h1>
                <p>Below are emissions offset projects we believe in, click a project to learn more,</p>
                <p>additionaly you can create a custom donation ammount for any project and reviece conformation of your contributions</p>
            </div>
            <div>
                <img src='./carbon_offset.png' alt="Direct vs indirect offset project description" />
            </div>
            <div className="project_section">

                {Projects.map((val, key) => {
                    return (
                        <div id={key} key={key}>
                            <img className="project_thumbnail" src={val.img} alt={val.title} onClick={() => {
                                setTitle(val.title);
                                setDescription(val.description);
                                setProj(val.title);
                                setLink(val.link); 
                                setImage(val.img)
                            }}/>
                        </div>
                    )
                    
                })}

            </div>
            <div>

            <RenderInner />
            {checkout ? (
                <PayPal price={priceProp} title={title}/>
                    ) : (
                        <div>
                            <h2>If you would like to donate to {title} please enter your desired donation amount here</h2>                                    <input type="text" pattern="[0-9]*" id="donation_input" placeholder="1" value={price} onChange={(e) => setPrice(e.target.value)}/>
                                <button
                                    onClick={() => {
                                        setCheckOut(true);
                                        setPriceProp(price);
                                    }}
                                    >
                                    Checkout
                                </button>
                            </div>
                        )
                    }
            </div>
        </>
    )


}

export default AllProjects