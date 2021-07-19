
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
                        <h1 className="section_titles">{title}</h1>
                        <p className="general_text">{description}</p>
                    </div>
                    <div className="project_image">
                        <img src={image} alt={title} className="offset_img"/>
                    </div>
                </div>
            )
        } else  {
            return (
                <div style={{color: "white"}}>( No Project Selected )</div>
            )
        }
    }

    return (
        <>  
            <div className="offset_projects">
                <h1 className="section_titles">Offset Projects</h1>
                <p className="offset_text">
                    Here are a selection of projects we believe are helping to mitigate the damaging costs of our emission producing action. Click on a project to learn more about its mission.
                    Additionally you can create a custom donation amount for any project and receive a confirmation of your contributions.
                </p>
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
                        <div className="donation_div">
                            <h2>If you would like to make a donation please enter the amount here:</h2>                                    <input type="text" pattern="[0-9]*" id="donation_input" placeholder="1" value={price} onChange={(e) => setPrice(e.target.value)}/>
                                <button className="check_button"
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