import {useState} from "react";
function FormComponent(){
    const [rows,setRows] = useState([{name:"" , location:"" ,age:0}]);

    const handleChange = (index,field,event) =>{
        const newRow = [...rows];
        newRow[index][field] = event;
        setRows(newRow);
    }
    const addRow=()=>{
        const newRow = [...rows ,{name:"",location:"",age:0}];
        setRows(newRow);
    }
    const removeRow=(index)=>{
        const newRows = [...rows];
        newRows.splice(index,1);
        setRows(newRows);
    }
    const getValues=()=>{
        console.log(rows);
    }
    return(
        <div className="form">
            <h1>Form with Multiple Fields</h1>
            {rows.map((row,index)=>(
                <div key={index} className="inputRows">
                    <input className="inputField" type="text" placeholder="Enter Name" name="name" required value={row.name} onChange={(event)=>handleChange(index,"name",event.target.value)}/>
                    <input className="inputField" type="text" placeholder="Enter Location" name="location" required value={row.location} onChange={(event)=>handleChange(index,"location",event.target.value)}/>
                    <input className="inputField" type="number" placeholder="Enter Age" name="age" required min={1} value={row.age} onChange={(event)=>handleChange(index,"age",event.target.value)}/>
                    <button className="addButton" onClick={addRow}>+</button>
                    <button className="removeButton" onClick={()=>removeRow(index)} disabled={rows.length==1}>-</button>
                </div>
            ))}
            <button  className='submitBtn'onClick={getValues}>Submit</button>
            
        </div>
    );
}
export default FormComponent