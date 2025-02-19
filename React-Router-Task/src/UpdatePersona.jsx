import React, { useContext, useState, useEffect } from 'react';
import defaultImage from './assets/banner.png';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

import ReactQuill, { displayName } from "react-quill";
import "react-quill/dist/quill.snow.css"; 

const UpdatePersona = () => {
    const navigate = useNavigate();
    const { personas, setPersonas, selectedPersona, setSelectedPersona } = useContext(AuthContext);

    const personaKey = selectedPersona?.key;
    const ForEdit = personaKey !== undefined;

    // State for managing persona data
    const [currentData, setCurrentData] = useState({
        name: selectedPersona?.name || '',
        image: selectedPersona?.image || '',
        quote: selectedPersona?.quote || '',
        description: selectedPersona?.description || '',
        attitudes: selectedPersona?.attitudes || '',
        points: selectedPersona?.points || '',
        needs: selectedPersona?.needs || '',
        activity: selectedPersona?.activity || '',
    });

    const [image, setImage] = useState(selectedPersona?.image || null);
    const [imageCopy, setImageCopy] = useState(null);
    const [editImage, setEditImage] = useState(false);
    const [imagePreview,setImagePreview] = useState(image,defaultImage);
    const [deleteButton,setDeleteButton] = useState(false);

    useEffect(() => {
        if (ForEdit && personas[personaKey]) {
            setImage(personas[personaKey]?.image || null);
            setImagePreview(personas[personaKey]?.image || defaultImage);
            setCurrentData(personas[personaKey]);
        }
    }, [ForEdit, personaKey, personas]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentData((prevData) => ({ ...prevData, [name]: value }));
    };



    const handleSaveImage = (e) => {
        const img = e.target.files[0];
        const imgUrl = URL.createObjectURL(img);
        if (img && img.type.startsWith("image/")) {
            setImageCopy(imgUrl);
            setImagePreview(imgUrl);
            
        } else {
            alert("Please upload an image file");
            e.target.value = "";
        }
    };

    const saveImage = () => {
        if (imageCopy) {
            setImage(imageCopy);
            setImageCopy(null);
        }
        setEditImage(false);
    };

    const updatePersona = () => {
        if(currentData.name==""){
            alert('Name is required');
            return;
            
        }
        if (ForEdit) {
            setPersonas((prevPersonas) => {
                const updatedPersonas = [...prevPersonas];
                updatedPersonas[personaKey] = { ...currentData, image };
                return updatedPersonas;
            });
        } else {
            const newPersona = { ...currentData, image };
            setPersonas((prevPersonas) => [...prevPersonas, newPersona]);
        }
        navigate(-1);
    };

    const setDeleteBtnState=(a)=>{
        setDeleteButton(a);
    }

    const deletePopup=()=>{
        return(
            <>
                <div className="popUp">
                    <p>Do you want to delete Persona?</p>
                    <button className='close' onClick={()=>setDeleteBtnState(false)}>CANCEL</button>
                    <button className='delete' onClick={handleDelete}>DELETE</button>
                </div>
            </>
        )
    }

    const handleDelete=()=>{
        setPersonas((prevPersonas) => {
            const updatedPersonas = prevPersonas.filter((_, index) => index !== personaKey);
            return updatedPersonas;
        });
        setSelectedPersona(null);  // Clear the selected persona
        setDeleteBtnState(false); 
        navigate(-1)
    }


    const handleClose = () => {
        setSelectedPersona(null);
        navigate('/Userpage');
    };
    const click=()=>{
        document.getElementById('fileInput').click()
    }

    return (
        <div className='update'>
            {editImage && (
                <div className='popUp'>
                    <div className='updateHeader'>
                        <h1>{image ? "Change " : "Upload "}Image</h1>
                    </div>
                    <div className='profileImg'>
                    <   button type="button" onClick={click} className='file-input'>Choose Image </button>
                        <input id='fileInput' className='file-input' type="file" onChange={handleSaveImage} accept='image/*' style={{display:'none'}} required />   
                    </div>
                    <img
                        src={imagePreview ||defaultImage}
                        alt="Image Preview"
                        style={{padding:'9% 0% 0% 0%', height: '200px', width: '400px', objectFit: 'cover' }}
                    />
                        
                    <div className="footer-btn">
                        
                        <div className="btn-group">
                            {image && <button className='delete' onClick={() => {setImage(null);setEditImage(false); }}>DELETE</button>}
                            <button className='close' onClick={() => {setImagePreview(image);setEditImage(false)}}>CANCEL</button>
                            <button className='update-btn' onClick={saveImage}>SAVE</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="image" style={{ backgroundImage: `url(${image ? image : defaultImage})` }}>
                <div className="username">
                    <p>Persona Name <span className='highlight'>*</span></p>
                    <input
                        type="text"
                        placeholder="Sample"
                        name="name"
                        value={currentData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className='edit'>
                    <button className='edit-btn' onClick={() => setEditImage(true)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                        EDIT IMAGE
                    </button>
                </div>
            </div>

            <div className="text-area">
                <div className="textArea">
                    <label htmlFor="">Notable Quote</label>
                    <textarea type="text" id='quote' name='quote' value={currentData.quote} onChange={handleChange} placeholder='Enter a quote that identifies the persona'/>
                </div>
                <div className="textArea">
                    <label htmlFor="">Description</label>
                    <textarea type="text" id='description' name='description' value={currentData.description} onChange={handleChange} placeholder='Enter a general description/bio about the persona'/>
                    
                </div>
                <div className="textArea">
                    <label htmlFor="">Attitudes/Motivations</label>
                    <textarea type="text" id='attitudes' name='attitudes' value={currentData.attitudes} onChange={handleChange} placeholder='what drives and incentives the persona to reach desired goals?what mindset does the persona have?'/>
                </div>
                <div className="textArea">
                    <label htmlFor="">Pain Points</label>
                   <textarea type="text" id='points' name='points' value={currentData.points} onChange={handleChange} placeholder='What are the biggest challenges that the persona faces in their job?'/> 
                </div>
                <div className="textArea">
                    <label htmlFor="">Jobs/Needs</label>
                    <textarea type="text" id='needs' name='needs' value={currentData.needs} onChange={handleChange} placeholder='What are the personas functional,social and emotional needs to be success at their job?'/>
                    
                </div>
                <div className="textArea">
                    <label htmlFor="">Activities</label>
                    <textarea type="text" id='activity' name='activity' value={currentData.activity} onChange={handleChange} placeholder='What does the persona like to do in their free time?' />
                </div>
            </div>

            <div className="footer-btns">
                {ForEdit && 
                <button className='delete' onClick={()=>setDeleteBtnState(true)} >DELETE</button>}
                    {
                        deleteButton && deletePopup()
                    }

                <div className='btn-group'>
                    <button className='close' onClick={handleClose}>CLOSE</button>
                    <button className='update-btn' onClick={updatePersona}>
                        {ForEdit ? "UPDATE PERSONA" : "CREATE PERSONA"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdatePersona;
