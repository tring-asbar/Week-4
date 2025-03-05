import React, { useContext, useState, useEffect } from 'react';
import defaultImage from './assets/banner.png';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import ToastMessage from './ToastMessage';
import { useMutation,gql } from '@apollo/client';

const create_Persona = gql`
  mutation CreatePersona($persona_name:String!,$persona_quote:String!,$persona_description:String!,$persona_attitudes:String!,$persona_points:String!,$persona_needs:String!,$persona_activity:String!,$user_email:String!){
      createPersona(persona_name:$persona_name,persona_quote:$persona_quote,persona_description:$persona_description,persona_attitudes:$persona_attitudes,persona_points:$persona_points,persona_needs:$persona_needs,persona_activity:$persona_activity,user_email:$user_email){
          persona_name,persona_quote,persona_description,persona_attitudes,persona_points,persona_needs,persona_activity,user_email
      }
  }
` 


const UpdatePersona = () => {
    const navigate = useNavigate();
    const { setUser,personas, setPersonas,addPersona, selectedPersona, setSelectedPersona } = useContext(AuthContext);

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


    const [createPersona, { loading, error }] = useMutation(create_Persona)

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

    const handlequillChange = (name, value) => {
        setCurrentData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSaveImage = (e) => {
        const img = e.target.files[0];
        const imgUrl = URL.createObjectURL(img);
        if (img && img.type.startsWith("image/")) {
            setImageCopy(imgUrl);
            setImagePreview(imgUrl);
            
        } else {
            ToastMessage("Please upload an image file(.jpg,.jpeg,.png,.svg)",'warning');
            e.target.value = "";
        }
    };

    const saveImage = () => {
        if (imageCopy) {
            setImage(imageCopy);
            setImagePreview(imageCopy);
            setImageCopy(null);
            ToastMessage("Image Updated Successful👍",'success')
        }
        // else{
        //     alert("Select an image");
        //     return;
        // }
        
        
        setEditImage(false);
    };

    const updatePersona = async() => {
        if(currentData.name=="" || currentData.quote=="" || currentData.description=="" || currentData.attitudes==""){
            ToastMessage('Required fields should not be empty','warning');
            return;
        }

        let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!loggedInUser) {
            ToastMessage('No user logged in', 'error');
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];



        if (ForEdit) {
            setPersonas((prevPersonas) => {
                const updatedPersonas = [...prevPersonas];
                updatedPersonas[personaKey] = { ...currentData, image };
    
                // Update personas in the logged-in user object
                loggedInUser.personas = updatedPersonas;
    
                // Update users array in localStorage
                users = users.map(user => 
                    user.email === loggedInUser.email ? { ...user, personas: updatedPersonas } : user
                );
    
                localStorage.setItem("users", JSON.stringify(users));
                localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    
                ToastMessage("Persona Updated Successfully 👍", 'info');
                return updatedPersonas;
            });
        } else {
            const newPersona = { ...currentData, image };
            addPersona(newPersona);
            
            try {
                const { data } = await createPersona({
                  variables: {
                    persona_name:currentData.name,
                    persona_quote:currentData.quote,
                    persona_description:currentData.description,
                    persona_attitudes:currentData.attitudes,
                    persona_points:currentData.points,
                    persona_needs:currentData.needs,
                    persona_activity:currentData.activity,
                    user_email:loggedInUser.email
                  },
                });
        
                if (data) {
                    ToastMessage("Persona Created Successfully 👍",'success');
                    
                }
              } catch (err) {
                console.error("Persona error:", err);
              }
            
        }
        navigate("/UserPage");
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

        const handleDelete = () => {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
          
            if (!currentUser) return;
          
            users = users.map(user => {
              if (user.email === currentUser.email) {
                user.personas = user.personas.filter((_, index) => index !== personaKey);
                currentUser.personas = user.personas;
              }
              return user;
            });
          
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
          
            setUser(currentUser);
            setPersonas(currentUser.personas);
            setSelectedPersona(null);
            setDeleteBtnState(false);
            ToastMessage("Persona Deleted", 'info');
            navigate(-1);
          };
          


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
                        <p style={
                            {height:'2px',
                            // fontSize:'20px',
                            width: '3px',
                            cursor: 'pointer',
                            padding:'0',
                            margin:'0',
                            opacity:'0.7'}} onClick={()=>{setImageCopy(null);setImagePreview(image);setEditImage(false)}}>x</p>
                    </div>
                    <div className='profileImg'>
                    <   button type="button" onClick={click} className='file-input'>Choose Image </button>
                        <input id='fileInput' className='file-input' type="file" onChange={handleSaveImage} accept='image/*' style={{display:'none'}} required />   
                    </div>
                    <img
                        src={imagePreview ||defaultImage}
                        alt="Image Preview"
                        style={{padding:'5% 0% 0% 0%', height: '200px', width: '400px', objectFit: 'cover' }}
                    />
                        
                    <div className="footer-btn">
                        
                        <div className="btn-group">
                            {image && <button className='delete' onClick={() => {setImage(null);setImagePreview(defaultImage);ToastMessage("Image removed",'info'); setEditImage(false); }}>DELETE</button>}
                            <button className='close' onClick={() => {setImageCopy(null);setImagePreview(image);setEditImage(false)}}>CANCEL</button>
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
                    <button className='edit-btn' onClick={() => setEditImage(true)}>
                        EDIT IMAGE
                    </button>
                </div>
            </div>

            <div className="text-area">
                <div className="textArea">
                    <label htmlFor="">Notable Quote<span className='highlight'>*</span></label>
                    <textarea type="text" id='quote' name='quote' value={currentData.quote} onChange={handleChange} placeholder='Enter a quote that identifies the persona'/>
                </div>
                <div className="textArea">
                    <label htmlFor="">Description<span className='highlight'>*</span></label>
                    <textarea type="text" id='description' name='description' value={currentData.description} onChange={handleChange} placeholder='Enter a general description/bio about the persona'/>
                    
                </div>
                <div className="textArea">
                    <label htmlFor="">Attitudes/Motivations<span className='highlight'>*</span></label>
                    <textarea type="text" id='attitudes' name='attitudes' value={currentData.attitudes} onChange={handleChange} placeholder='What drives and incentives the persona to reach desired goals?what mindset does the persona have?'/>
                </div>
                <div className="quill">
                    <label htmlFor="">Pain Points</label>
                    <ReactQuill
                        id='points'
                        name='points'
                        value={currentData.points}
                        onChange={(value) => handlequillChange('points', value)}
                        placeholder='What are the biggest challenges that the persona faces in their job?'
                    />
                </div>
                <div className="quill">
                    <label htmlFor="">Jobs/Needs</label>
                    <ReactQuill
                        id='needs'
                        name='needs'
                        value={currentData.needs} 
                        onChange={(value) => handlequillChange('needs', value)}
                        placeholder='What are the personas functional, social, and emotional needs to be successful at their job?'
                    />
                </div>
                <div className="quill">
                    <label htmlFor="">Activities</label>
                    <ReactQuill
                        id='activity'
                        name='activity'
                        value={currentData.activity}
                        onChange={(value) => handlequillChange('activity', value)}
                        placeholder='What does the persona like to do in their free time?'
                    />
                </div>

                {/* <div className="textArea">
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
                </div> */}
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
