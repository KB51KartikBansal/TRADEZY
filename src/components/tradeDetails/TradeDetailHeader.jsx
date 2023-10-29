import { SMALL_SCREEN_ONLY_CLASS , LARGE_SCREEN_ONLY_CLASS,BADGE_STYLE_CLASS } from "./TradeDetail.constant";
import Collapse from 'react-bootstrap/Collapse';
import {BsFillInfoCircleFill} from 'react-icons/bs';

import {useState,useRef} from 'react';
import { abbreviate, getAllKeys ,capitalize, getStatusColor} from "../../utils/TradeDetailUtil";
import useClickOutside from "./hooks/useClickOutside";

const TradeDetailHeaderDesktop = ()=>{
    return (
        <div className={"text-center shadow-sm bg-white p-2 my-2 rounded "+LARGE_SCREEN_ONLY_CLASS} > 
             <h3 className="d-inline trade-detail-header ">Trade Details</h3>
        </div>
    );
}
const TradeDetailHeaderMobile = ()=>{
    const [open,setOpen] = useState(false);
    const tradeRef = useRef();
    useClickOutside(tradeRef,()=>{setOpen(false)});
    return (<div ref ={tradeRef}>
        <div 
             
            className={"text-center shadow-sm bg-white p-2 my-2  rounded "+SMALL_SCREEN_ONLY_CLASS}
            onClick={() => setOpen(!open)}
                
            > 
             <h3 className="d-inline trade-detail-header mx-2">Trade Details</h3>
            <BsFillInfoCircleFill />
            <span className="hidden-element"> info</span>
        </div>
        <Collapse in = {open} >
                    <div className={" mt-0 mb-2 px-4"+ SMALL_SCREEN_ONLY_CLASS}   >
                        <div className="bg-white">
                            <table className=" table table-sm">
                                <thead>
                                    <tr>
                                        <th>Status</th>
                                        <th>Abbrev</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        getAllKeys().map(key => <tr><td><span className={ BADGE_STYLE_CLASS+getStatusColor(key)}>{abbreviate(key)} </span></td><td>{capitalize(key)}</td></tr>)
                                    }
                                </tbody>
                            </table>
                       </div>
                    </div>
             </Collapse>
        </div>
    );
}
const TradeDetailHeader =()=>{
    return (
      <>
        <TradeDetailHeaderDesktop />
        <TradeDetailHeaderMobile />
      </>
    )
}
export default TradeDetailHeader;