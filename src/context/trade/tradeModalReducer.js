import { LOAD_TRADE_DETAIL_MODAL , INCREMENT_STOCK_PROFIT_TARGET, DECREMENT_STOCK_STOP_LOSS, UPDATE_STOP_LOSS, UPDATE_PROFIT_TARGET, DECREMENT_PROFIT_TARGET,INCREMENT_PROFIT_TARGET,INCREMENT_STOP_LOSS, DECREMENT_STOP_LOSS, REFRESH_TRADE_MODAL } from "../../config/typeConstants";
import { INCREMENT_STOCK_STOP_LOSS, INCREMENT_STOCK_QUANTITY } from '../../config/typeConstants';
import { DECREMENT_STOCK_PROFIT_TARGET } from "../../config/typeConstants";
import { DECREMENT_STOCK_QUANTITY } from "../../config/typeConstants";
import { SET_STOP_LOSS_VALIDITY,SET_PROFIT_TARGET_VALIDITY } from "../../config/typeConstants";
import { logger } from "../../utils/logger";
export const tradeModalReducer=(tradeModalState,action)=>{
    switch(action.type){
        //loads initial data 
        case LOAD_TRADE_DETAIL_MODAL:
            let item=action.payload;
            let quantity=item.quantity;
            let stopLoss=item.stopLoss;
            let profitTarget=item.profitTarget;
            return{
                item:{...item},
                quantity:quantity,
                stopLoss:stopLoss,
                profitTarget:profitTarget,
                incrementQuantityStatus:false,
                decrementQuantityStatus:true,
                incrementStopLossStatus:true,
                decrementStopLossStatus:true,
                incrementProfitTargetStatus:true,
                decrementProfitTargetStatus:true,
                isStopLossValid:true,
                isProfitTargetValid: true
            };
        //to refresh the trade modal, it checks if the current modal is for the refreshed trade,
        //if yes it just updates the state.
        //pass the trade detail in action.payload
        case REFRESH_TRADE_MODAL:
            let update=action.payload;
            if(tradeModalState.item.tradeDetailId===update.tradeDetailId){
                let quantity=update.quantity;
                let stopLoss=update.stopLoss;
                let profitTarget=update.profitTarget;
                return{
                    item:{...item},
                    quantity:quantity,
                    stopLoss:stopLoss,
                    profitTarget:profitTarget,
                    incrementQuantityStatus:false,
                    decrementQuantityStatus:true,
                    incrementStopLossStatus:true,
                    decrementStopLossStatus:true,
                    incrementProfitTargetStatus:true,
                    decrementProfitTargetStatus:true,
                    isStopLossValid:true,
                    isProfitTargetValid: true
                };
            }
            break;
        case INCREMENT_STOCK_QUANTITY:
            if(tradeModalState.quantity<tradeModalState.item.quantity){
                tradeModalState.quantity+=1;
                tradeModalState.item.totalCost=tradeModalState.quantity*tradeModalState.item.pricePerTicker;
            }
            if(tradeModalState.quantity==tradeModalState.item.quantity){
                tradeModalState.incrementQuantityStatus=false;
            }
            if(tradeModalState.quantity!=1)
                tradeModalState.decrementQuantityStatus=true;
            return {...tradeModalState};

            case DECREMENT_STOCK_QUANTITY:
                if(tradeModalState.quantity>1){
                    tradeModalState.quantity-=1;
                    tradeModalState.item.totalCost=tradeModalState.quantity*tradeModalState.item.pricePerTicker;
                }
                if(tradeModalState.quantity==1){
                    tradeModalState.decrementQuantityStatus=false;
                }
                if(tradeModalState.quantity!=tradeModalState.item.quantity)
                    tradeModalState.incrementQuantityStatus=true;
                return {...tradeModalState};
            case UPDATE_STOP_LOSS:
                let updateStopLoss = action.payload;
                let updateStopLossFloat = parseFloat(updateStopLoss);
                if(updateStopLoss === "" )
                    return {...tradeModalState, stopLoss: updateStopLoss};
                if (/^\d{1,3}$|^\d{1,3}\.\d{0,2}$/.test(updateStopLoss) && updateStopLossFloat >=1 && updateStopLossFloat <= 100)
                    return {...tradeModalState, stopLoss : updateStopLoss};
                return {...tradeModalState};
            case INCREMENT_STOP_LOSS:
                let updatedStopLossInc = parseFloat(tradeModalState.stopLoss) +1
                if(updatedStopLossInc >=1 && updatedStopLossInc <= 100)
                    return { ... tradeModalState, stopLoss: updatedStopLossInc}
                return {... tradeModalState};
            case DECREMENT_STOP_LOSS:
                let updatedStopLossDec = parseFloat(tradeModalState.stopLoss) -1
                if(updatedStopLossDec >=1 && updatedStopLossDec <= 100)
                    return { ... tradeModalState, stopLoss: updatedStopLossDec}
                return {... tradeModalState};
            case UPDATE_PROFIT_TARGET:
                let updateProfitTarget = action.payload;
                let updateProfitTargetFloat = parseFloat(updateProfitTarget);
                if(updateProfitTarget === "" )
                    return {...tradeModalState, profitTarget: updateProfitTarget};
                if (/^\d{1,3}$|^\d{1,3}\.\d{0,2}$/.test(updateProfitTarget) && updateProfitTargetFloat >=1 && updateProfitTargetFloat <= 100)
                    return {...tradeModalState, profitTarget : updateProfitTarget};
                return {...tradeModalState};
            case INCREMENT_PROFIT_TARGET:
                let incrementProfitTarget = parseInt(tradeModalState.profitTarget)+1
                if(incrementProfitTarget >= 1 && incrementProfitTarget <=100)
                    return {...tradeModalState, profitTarget: incrementProfitTarget}
                return {...tradeModalState}
            case DECREMENT_PROFIT_TARGET:
                let decrementProfitTarget = parseInt(tradeModalState.profitTarget) -1;
                if(decrementProfitTarget >= 1 && decrementProfitTarget <=100)
                    return {...tradeModalState, profitTarget: decrementProfitTarget}
                return {...tradeModalState}
            case SET_PROFIT_TARGET_VALIDITY:
                return {...tradeModalState, isProfitTargetValid : action.payload}
            case SET_STOP_LOSS_VALIDITY:
                return {...tradeModalState, isStopLossValid : action.payload}
    }
}
