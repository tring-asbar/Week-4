import { useState } from "react"
function CrudOperation(){

    const [addButton , setAddButton]=useState(false);
    const [editButton , setEditButton]=useState(false);
    const[inputValue,setInputValue] = useState({name:"",age:"",skills:"",designation:"",address:""})
    const[inputBox,setInputBoxes] = useState([]);
    const [deleteButton , setDeleteButton]=useState(false);
    const [editIndex,setEditIndex] = useState(null);

    const setAddBtnState=(a)=>{
        setAddButton(a);
        setEditBtnState(false);
        setDeleteBtnState(false);
        setInputValue({name:"",age:"",skills:"",designation:"",address:""})
    }
    const setEditBtnState=(a,index)=>{
        setEditButton(a);
        if(a){
            setInputValue(inputBox[index]);
            setEditIndex(index);
        }
        else{
            setEditIndex=  null;
        }
    }
    const setDeleteBtnState=(a,index)=>{
        setDeleteButton(a);
        if(a){
            setEditIndex(index);
        }
        else{
            setEditIndex(null);
        }
    }
    const handleChange=(e)=>{
        setInputValue({...inputValue, [e.target.name] : [e.target.value]})
    }
    const saveData =()=>{
        // if (editIndex !== null) {
        //     const updatedData = [...inputBox];
        //     updatedData[editIndex] = inputValue;
        //     setInputBoxes(updatedData);
        //     setEditIndex(index);
        //   } else {

            setInputBoxes([...inputBox,inputValue]);
          
        console.log(inputValue);
        setInputValue({name:"",age:"",skills:"",designation:"",address:""})
        setAddBtnState(false)
        setDeleteBtnState(false)
        
    }

    const saveEdit=()=>{
        inputBox[editIndex].name = inputValue.name;
        inputBox[editIndex].age = inputValue.age;
        inputBox[editIndex].skill = inputValue.skills;
        inputBox[editIndex].designation = inputValue.designation;
        inputBox[editIndex].address = inputValue.address;

        setInputValue({name:"",age:"",skills:"",designation:"",address:""})
        setEditBtnState(false)

    }
    

    // const deleteConfirm=(index)=>{
    //     return(
    //         <div className="confirm" key={index}>
    //             <p>Do you want to delete data?</p>
    //             <button className="confirmBtn" onClick={()=>deleteData(index)}>Confirm</button>
    //             <button className="cancelBtn" onClick={()=>setDeleteBtnState(false)}>Cancel</button>
    //         </div>
    //     )
    // }

    const deleteData = () => {
        const inputFields = [...inputBox]
        inputFields.splice(editIndex,1)
        setInputBoxes(inputFields);
        setDeleteBtnState(false);
    }

    const addFields=()=>{
        
        return(
            
            <div className="Popup">
                {(addButton || editButton) &&<>
                <label htmlFor="name">Name </label>
                <input type="text" className="input" placeholder="Enter Name" name="name" required value={inputValue.name} onChange={handleChange} /><br /><br />
                <label htmlFor="age">Age </label>
                <input type="number" className="input" placeholder="Enter Age" name="age" required value={inputValue.age} onChange={handleChange} /><br /><br />
                <label htmlFor="skills">Skills </label>
                <input type="text" className="input" placeholder="Enter Skills" name="skills" required value={inputValue.skills} onChange={handleChange} /><br /><br />
                <label htmlFor="designation">Designation </label>
                <input type="text" className="input" placeholder="Enter Designation" name="designation" required value={inputValue.designation} onChange={handleChange}/><br /><br />
                <label htmlFor="address">Address </label>
                <input type="text" className="input" placeholder="Enter Address" name="address"  required value={inputValue.address} onChange={handleChange} /><br /><br />
                </>
            }
            {addButton &&<>
                <button className="save-btn" onClick={()=>saveData()}>Save</button>
                <button className="close-btn" onClick={() =>setAddBtnState(false)}>Close</button>
            </>

            }
            {editButton &&<>
                <button className="save-btn" onClick={()=>saveEdit()}>Update</button>
                <button className="close-btn" onClick={() =>setEditBtnState(false)}>Close</button>
            </>
            }
            {deleteButton && 
                    <>
                        <p>Do you want to delete data?</p>
                        <button className="confirm-btn" onClick={()=>deleteData()}>Confirm</button>
                        <button className="cancel-btn" onClick={()=>setDeleteBtnState(false)}>Cancel</button>
                
                    </>}
                
               
            </div>
            
            
            
        )
    }
    return(
        <div className=" container">
        <button className="add-btn" onClick={()=>setAddBtnState(true)}>+Add New</button>
        {
            addButton ==true && addFields()
        }
        <br />
        
            <div className="table">
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Skills</th>
                        <th>Designation</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    {
                        inputBox.map((value, key)=>(
                            <tr key={key}>
                            <td>{value.name}</td>
                            <td>{value.age}</td>
                            <td>{value.skills}</td>
                            <td>{value.designation}</td>
                            <td>{value.address}</td>
                            <td>
                            <button className="edit-btn" onClick={()=>setEditBtnState(true,key)}>Edit</button>
                            {
                                editButton && addFields()
                            }
                            
                            <button className="delete-btn" onClick={()=>setDeleteBtnState(true,key)}>Delete</button>
                            {
                                deleteButton && addFields()
                            }
                        </td>
                            </tr>
                        ))
                    }
                        
                    
                </table>
        
            </div>
        </div>
    )
}
export default CrudOperation