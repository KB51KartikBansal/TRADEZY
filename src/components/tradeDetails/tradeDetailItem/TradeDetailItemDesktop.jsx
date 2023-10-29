import React  from 'react'
import {MdDelete} from 'react-icons/md';
import {VscRefresh} from 'react-icons/vsc';
import { prettyDateTime } from '../../../utils/dateFunctions';
import { logger } from '../../../utils/logger';
import { processDate, capitalize ,processTime, getDirectionColor,getStatusColor} from '../../../utils/TradeDetailUtil';
import { LARGE_SCREEN_ONLY_TR_CLASS, BADGE_STYLE_CLASS } from '../TradeDetail.constant';

const TradeDetailItemDesktop = ({item,key,setModalValues, ...rest}) => {
    const tdClass = "p-0 py-2 px-lg-3  align-middle";
    const openModal = ()=>{
      setModalValues(item);
    }
    const{date, time} = prettyDateTime(item.createdAt);
    return (    
      <tr className ={"p-0 "+ LARGE_SCREEN_ONLY_TR_CLASS+" trade-detail-font"} key ={key} >
        <td onClick ={openModal}  className = {tdClass + "d-flex flex-column justify-content-start"}>
            <div>{item.ticker.tickerId}</div>
           <em style={{ margin:"0px", padding:"0px"}} className = {" trade-details-time-text "} > {item.ticker.tickerName}</em> 
        </td>
        <td onClick ={openModal} className ={tdClass}> <span className= { BADGE_STYLE_CLASS+getDirectionColor(item.tradeDirection)}>{capitalize(item.tradeDirection)} </span> </td>
        <td onClick ={openModal} className ={tdClass}>
          
            <div>{time}</div>
            <em style={{ margin:"0px", padding:"0px"}} className ={" trade-details-time-text "} > {date}</em>
        </td>
      
        <td onClick ={openModal} className ={tdClass}> 
          <span className= { BADGE_STYLE_CLASS+getStatusColor(item.status)}>{capitalize(item.status)} </span>
         </td>
        <td onClick ={openModal} className ={tdClass}>{item.pricePerTicker}</td>
        <td onClick ={openModal} className ={tdClass}>{item.quantity}</td>
        <td onClick ={openModal} className ={tdClass}> {item.totalCost}</td>
          <td className={tdClass}>
            <div className='d-flex '>
              <button className={(rest.refreshDisabled) ? 'mx-1 btn btn-outline-secondary' : 'mx-1 btn btn-outline-primary' } 
                    disabled ={rest.refreshDisabled} 
                    onClick = {()=>rest.onRefresh(item)}
                    >
                      <span className='hidden-element' >refresh</span> 
                      <VscRefresh/>
              </button>
              <button className={(rest.deleteDisabled) ? 'mx-1 btn btn-outline-secondary' : 'mx-1 btn btn-outline-danger' } 
                      disabled={rest.deleteDisabled}  
                      onClick ={()=>rest.onDelete(item)}
                      > 
                      <span className='hidden-element'>delete</span>   
                      <MdDelete/>
              </button> 
              <button className={(rest.executeDisabled) ? 'mx-1 btn btn-outline-secondary execute-button-text' : 'mx-1 btn btn-outline-dark execute-button-text' } 
                      disabled={rest.executeDisabled}   
                      onClick ={()=>rest.onExecute(item)} 
                      > Execute 
              </button>
            </div>
          </td>
      </tr>)
  }
  
  export default TradeDetailItemDesktop;