import React, { useMemo, useContext ,Suspense} from 'react'
import {tradeContext} from './../../context/trade/tradeContext';
import authContext from './../../context/auth/authContext';
import { loadTradeDetails } from './../../context/trade/TradeState';
import { logger } from "../../utils/logger";
import EmptyTradeDetail from './EmptyTradeDetail';
import TradeDetailHeader from './TradeDetailHeader';
import TradeDetailsList from './TradeDetailsList';
import Pagination from './../pagination/Pagination';
import usePageLimit from './hooks/usePageLimit';
//lazy imports
/*const TradeDetailHeader = React.lazy(()=>import('./TradeDetailHeader'));
const TradeDetailsList = React.lazy(()=>import('./TradeDetailsList'));
const Pagination = React.lazy(()=>import('../pagination/Pagination'));
const EmptyTradeDetail = React.lazy(()=>import("./EmptyTradeDetail"));
*/

let PageSize = 10;
const TradeDetailHome = () => {
  const {tradeDetail,tradeDetailDispatcher}=useContext(tradeContext);
  const {currentPage, setCurrentPage} = useContext(tradeContext);
  const {authState}=useContext(authContext);
  useMemo(() => {
    loadTradeDetails(authState.user.userId,currentPage-1,tradeDetailDispatcher)
  }, [currentPage]);

  if (typeof tradeDetail==='undefined')
    return(<EmptyTradeDetail></EmptyTradeDetail>);
  return (
    <div className ="d-flex flex-column justify-content-start align-items-center height-component"  >
           <div className='py-4'>
            <TradeDetailHeader />
           <TradeDetailsList data={tradeDetail.data}  />
             
              <div className='d-flex justify-content-center align-items-center'>
                  <Pagination 
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalPages={tradeDetail.pageCount}
                  pageSize={PageSize}
                  onPageChange={(page) =>{ 
                    setCurrentPage(page); 
                
                }}
                />
              </div>
          </div>
    </div>
  );
}

const TradeDetails  = ()=>{
  return (
      <TradeDetailHome />
  )
}

export default TradeDetails;