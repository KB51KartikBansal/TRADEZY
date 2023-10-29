import { LOAD_TRADE_DETAIL_DASHBOARD, UPDATE_TRADE_DETAIL ,DELETE_TRADE_DETAIL} from './../../config/typeConstants';
function tradeDetailReducer(tradeState,action){
    switch(action.type){
        case LOAD_TRADE_DETAIL_DASHBOARD:
            return {
                data:action.payload.data,
                pageCount:action.payload.totalPageCount
            };
        //to be called when trade Detail is updated, the action.payload is the updated trade detail.
        case UPDATE_TRADE_DETAIL:
            let update=action.payload;
            //this part can be optimed by storing the trade details as a map rather than list
            //current complexity: O(10) since only 10 records on a page, can be done O(1) amortized using map.

            for(let i=0;i<tradeState.data.length;i++)
            {
                if(tradeState.data[i].tradeDetailId===update.tradeDetailId){
                    tradeState.data[i]=update;
                }
            }
            return {...tradeState};

        }
}

export default tradeDetailReducer;