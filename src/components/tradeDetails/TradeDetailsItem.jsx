import React,{useState} from 'react'
import {BiRefresh} from 'react-icons/bi';
import {MdDelete} from 'react-icons/md';
import { LOAD_TRADE_DETAIL_MODAL } from '../../config/typeConstants';
import "./TradeDetails.css";
import { useContext } from 'react';
import { tradeContext } from './../../context/trade/tradeContext';
import { logger } from '../../utils/logger';
const TradeDetailsItem = ({item,onShow}) => {

  const{tradeDetailModalDispatcher}=useContext(tradeContext);
  const setModalValues=()=>{
    logger.info({message :"in set modal"})
    tradeDetailModalDispatcher({
      type:LOAD_TRADE_DETAIL_MODAL,
      payload:item
    })
    onShow();
  };
  const getClassNameForStatus =()=>{
    if (item.status === 'executed') return "trade-details-badge-executed text-success";
    if (item.status === 'no_action') return "trade-details-badge-no-action text-primary";
    if (item.status === 'pending') return "trade-details-badge-pending text-warning";
    if (item.status === 'insufficient_funds') return 'trade-details-badge-insufficient-funds text-danger';
  }
  return (
                     
    <tr className ="p-0"  >
      <td onClick ={setModalValues} >{item.ticker.tickerId}</td>
      <td onClick ={setModalValues} >{item.tradeDirection}</td>
      <td onClick ={setModalValues} >{item.timeframe}</td>
      <td onClick ={setModalValues} >{item.createdAt}</td>
      <td onClick ={setModalValues} ><span className={' p-1 '+getClassNameForStatus()}>{item.status}</span></td>
      <td onClick ={setModalValues} >{item.pricePerTicker}</td>
      <td onClick ={setModalValues} >{item.quantity}</td>
      <td onClick ={setModalValues} > {item.totalCost}</td>
        <td><button className='btn btn-primary'> <BiRefresh/></button></td>
        <td><button className="btn btn-danger" disabled={item.status === 'executed'} onClick ={()=>{console.log("delete");}}>  <MdDelete/></button> </td>
        <td><button className='btn btn-secondary' disabled={item.status === 'executed'}  onClick ={()=>{console.log("execute");}} > execute </button></td>
    </tr>
                
  )
}

export default TradeDetailsItem;