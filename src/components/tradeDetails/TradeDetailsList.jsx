import React from 'react'
import EmptyTradeDetail from './EmptyTradeDetail.jsx';
import TradeModal from './TradeModal'
import { useState } from 'react';
import TradeDetailItem from './tradeDetailItem/TradeDetailItem';
import { useContext } from 'react';
import { DELETE_TRADE_DETAIL, LOAD_TRADE_DETAIL_MODAL } from '../../config/typeConstants';
import { tradeContext } from './../../context/trade/tradeContext';
import { logger } from "../../utils/logger";
import TradeDetailsTable from './TradeDetailsTable.jsx';
import TradeDetailTableHead from './TradeDetailTableHead';
import { deleteTrade, executeTrade } from './../../services/executeDeleteTrade';



const TradeDetailsList = ({data}) => {

  const{showModal,setShowModal,tradeDetailModalDispatcher,currentPage,tradeDetailDispatcher}=useContext(tradeContext);
  const setModalValues=(item)=>{
    tradeDetailModalDispatcher({
      type:LOAD_TRADE_DETAIL_MODAL,
      payload:item
    })
    setShowModal(true);
  };
  const executeTradeDetail=(item)=>{
    executeTrade(item.tradeDetailId,item.stopLoss,item.profitLoss,item.quantity,1,currentPage,tradeDetailDispatcher);
  };
  const deleteTradeDetail=(item)=>{
    deleteTrade(item.tradeDetailId,1,currentPage,tradeDetailDispatcher);

  };
  logger.debug({message: "render in Trade details list",data})
  return (
    <div className='shadow-sm my-md-3 mb-5  bg-white rounded '>
      <TradeDetailsTable>
            <thead>
              <TradeDetailTableHead />
            </thead>
            <tbody id ="scrollable-target">
              {data.map(item => 
              <TradeDetailItem 
                    item = {item} 
                    key = {item.tradeDetailId} 
                    setModalValues ={setModalValues}
                    onRefresh = {(item)=>{logger.info({message:"refresh btn is pressed"}); }}
                    onDelete = {(item)=>{
                      logger.debug({message:"delete btn is pressed"}); 
                      deleteTradeDetail(item);
                    }}
                    onExecute = {(item)=>{
                      logger.debug({message:"execute btn is pressed"}); 
                      executeTradeDetail(item);
                    }}
                    refreshDisabled = {(item.status === 'pending' || item.status === 'executed')}
                    executeDisabled = {(item.status === 'pending' || item.status === 'executed')}
                    deleteDisabled = {(item.status === 'executed')}
                  
                    />)}
            </tbody>  
      </TradeDetailsTable>
      <TradeModal show={showModal} onHide ={()=>setShowModal(false)} />
        {(data.length === 0) && <EmptyTradeDetail/>}
    </div>

  )
}

export default TradeDetailsList;