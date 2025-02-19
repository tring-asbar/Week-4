const Data=(props)=>{
    const object = props.item
    return(
        <>

            {object != null &&  Object.entries(object).map(([key, value])=>(
                <p>{key}:{value}</p>
            ))}
        </>
    )
}
export default Data;