import {BsFillInboxFill} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';
const EmptyTradeDetail =()=>{
    const navigate = useNavigate();
    const redirect  = ()=>{
        navigate("/alert-details");
    }
    return (
        <div className='d-flex justify-content-center align-items-center flex-column bg-grey ' style ={{height: "100vh"}}>
            <div>
                <br/>
                <br/>
            </div>
           <div>
               <BsFillInboxFill color={'primary'} size ={70}/> 
            </div> 
                <br/>
           <div>
                <h4>You have no trade details </h4>
            </div> 
            <div>
                <p> Start by adding trade details</p>
            </div>
            <div>
                <button className='btn btn-primary' onClick = {redirect}> go to alerts </button>
            </div>
        </div>
    )
}
export default EmptyTradeDetail;
