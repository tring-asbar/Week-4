 import phone from "./assets/phone.jpeg"
import Data from "./Data";
const name = "Asbar"
function Header(props){
    // const d = props.card.data;
    const datas = JSON.stringify(props.Card.data)
        return(
            <div className="card">
                {/* <img src={props.card.image} alt="" />
                <h2>&lt;/&gt;{props.card.name}</h2>
                <p>{props.content}</p>
                <p>{props.role}</p> */}
                <img src={phone} alt="" />
                <h2>{props.Card.id}. {props.Card.name}</h2>
                {/* <p>{datas}</p> */}
                <Data item={props.Card.data}/>
                {/* {
                    props.card.data.map((item)=>{
                       return( <p>{item}</p>)
                    })
                } */}
                {/* <p>return({{d}!=null?{datas}:"-"})</p> */}
            </div>
        );
    
}
export default Header