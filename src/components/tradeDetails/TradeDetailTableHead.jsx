import { SMALL_SCREEN_ONLY_TR_CLASS, LARGE_SCREEN_ONLY_TR_CLASS } from './TradeDetail.constant';
import ToolTip from "./ToolTip";
export const TradeDetailTableHeadDesktop = ()=>{
    return(<tr className={LARGE_SCREEN_ONLY_TR_CLASS }>
            <th><ToolTip actualMessage = "Ticker" smlMessage={"Ticker"} toolTipMessage = "Ticker Id of the stock " /></th>
            <th><ToolTip actualMessage="Direction" smlMessage ={"Direction"} toolTipMessage = " trade Direction like buy or sell for the user"/></th>
            <th><ToolTip actualMessage="Created At" smlMessage ={"Created At"} toolTipMessage = "Shows the time at which it is created"/></th>
            <th><ToolTip actualMessage="Status" smlMessage ={"Status"} toolTipMessage = "Shows the status of the trade detail like pending, executed"/></th>
            <th><ToolTip actualMessage="Price Per Ticker" smlMessage ={"Price"} toolTipMessage = "Shows the current price of the ticker"/></th>
            <th><ToolTip actualMessage="Quantity" smlMessage ={"Qty"} toolTipMessage = "Shows the quantity of the stocks that are present in the trade detail"/></th>
            <th><ToolTip actualMessage="Total Cost" smlMessage ={"Total"} toolTipMessage = "Shows the total cost / gain which a user can get from this trade detail"/></th>
            <th>Actions</th>
          </tr>)
}

export const TradeDetailTableHeadMobile = ()=>{
    return(<tr className={SMALL_SCREEN_ONLY_TR_CLASS}>
        <th><ToolTip actualMessage = "Ticker" smlMessage={"Ticker"} toolTipMessage = "Ticker Id of the stock " /></th>
        <th><ToolTip actualMessage="Status" smlMessage ={"Status"} toolTipMessage = "Shows the status of the trade detail like pending, executed"/></th>
        <th><ToolTip actualMessage="Price Per Ticker" smlMessage ={"Price"} toolTipMessage = "Shows the current price of the ticker"/></th>
        <th><ToolTip actualMessage="Quantity" smlMessage ={"Qty"} toolTipMessage = "Shows the quantity of the stocks that are present in the trade detail"/></th>
        <th><ToolTip actualMessage="Total Cost" smlMessage ={"Total"} toolTipMessage = "Shows the total cost / gain which a user can get from this trade detail"/></th>
        <th>Actions</th>
      </tr>)
}

const TradeDetailTableHead = ()=>{
    return(<>
            <TradeDetailTableHeadDesktop />
            <TradeDetailTableHeadMobile />
          </>)
}
export default TradeDetailTableHead;