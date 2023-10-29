import React from 'react'
import "../TradeDetails.css";
import { logger } from '../../../utils/logger';
import TradeDetailItemMobile from './TradeDetailItemMobile';
import TradeDetailItemDesktop from './TradeDetailItemDesktop';

const TradeDetailItem = (props)=>{
  return (
    <>
      <TradeDetailItemDesktop {...props} />
      <TradeDetailItemMobile  {...props} />
    </>
  )

}
TradeDetailItem.defaultProps = {
  onRefresh : ()=>{logger.debug({message:"refresh btn is pressed"});},
  onDelete :()=>{logger.debug({message:"delete btn is pressed"});},
  onExecute :()=>{logger.debug({message:"execute btn is pressed"});},
  refreshDisabled : false,
  executeDisabled : false,
  deleteDisabled : false
}
export default TradeDetailItem;