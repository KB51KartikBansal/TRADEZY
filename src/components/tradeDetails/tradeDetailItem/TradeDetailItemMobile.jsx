import React, { useState ,useRef} from 'react'
import { logger } from '../../../utils/logger';
import { processDate, capitalize , getDirectionColor,abbreviate,  getStatusColor} from '../../../utils/TradeDetailUtil';
import { SMALL_SCREEN_ONLY_TR_CLASS,  BADGE_STYLE_CLASS } from '../TradeDetail.constant';
import DropdownActions from '../dropDown/DropDownActions';
import useClickOutside from '../hooks/useClickOutside';
import { prettyDateTime } from '../../../utils/dateFunctions';
const TradeDetailItemMobile = ({item,key, setModalValues, ...rest}) => {
    const [showAction, setShowAction] = useState();
    const dropRef = useRef();
    useClickOutside(dropRef, ()=>{setShowAction(false)});
    const tdClass = "p-xs-0 px-sm-4  p-md-1 align-middle ";
    const openModal = ()=>{
      setModalValues(item);
    }
    const capitalizeDirection  = capitalize(item.tradeDirection);
    const{date } = prettyDateTime(item.createdAt);
    return (    
      <tr className ={"p-0 mb-xs-3 "+SMALL_SCREEN_ONLY_TR_CLASS +" "+" trade-detail-font"}  key ={key}  >
            <td onClick ={openModal}  className = {tdClass }>
               <div className="d-flex flex-column justify-content-start"> <div >
                    <span>{item.ticker.tickerId} </span>
                    <span className={ BADGE_STYLE_CLASS+getDirectionColor(item.tradeDirection)} style = {{fontSize:"10px"}}>{capitalizeDirection}</span>
                </div> 
                <em style={{fontSize:"9px"}} > {date}</em>
                </div>
            </td>
            <td onClick ={openModal} className ={tdClass +" wrap-white-space "}>
                <span className= { BADGE_STYLE_CLASS+getStatusColor(item.status)}>{abbreviate(item.status)} </span> 
            </td>
            <td onClick ={openModal} className ={tdClass}>{item.pricePerTicker}</td>
            <td onClick ={openModal} className ={tdClass}>{item.quantity}</td>
            <td onClick ={openModal} className ={tdClass}> {item.totalCost}</td>
            <td 
                ref = {dropRef}
                className='trade-detail-ddn'
                onClick = {()=>{ setShowAction(status => !status);}}
                data-testid = "more"
                >
                <div className='d-flex mt-sm-2' >
                    <DropdownActions show = {showAction} setShow = {setShowAction} item ={item} {...rest} />
                </div>
            </td>
      </tr>)
  }

export default TradeDetailItemMobile;