import React , {useEffect , useState} from 'react'
import CardsList from './CardsList';
import Header from './Header';

function FetchApi(){

    const[data,setData] = useState();
    // const[loading,setLoading] = useState(true);
    const[error,setError] = useState(null);
    const url = 'https://api.restful-api.dev/objects';
    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async() =>{
        const getapi = await fetch(url);
        if(getapi.ok){
            setData(await getapi.json());
            // setLoading(false);
        }
        else{
            setError("Data Error");
            // setLoading(false);
        }
    }
    // const datas = (data.map((values,index) => {
    //     console.log(values);
    //     return (<p>{values.name}</p>)
        
    // }))
    
    console.log(data);
    return(
            <div className='cards'>
            
           {data?.map(
                (card)=>{
                    return <Header Card={card}/>
                }
            )}
            </div>    
               
            
    )
}
export default FetchApi