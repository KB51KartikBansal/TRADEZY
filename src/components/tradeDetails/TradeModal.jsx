import { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Modal,Row,Col } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import {VscRefresh} from 'react-icons/vsc';
import './TradeModal.css';
import { INCREMENT_STOCK_QUANTITY , DECREMENT_STOCK_QUANTITY, UPDATE_STOP_LOSS, UPDATE_PROFIT_TARGET, INCREMENT_PROFIT_TARGET,DECREMENT_PROFIT_TARGET, DECREMENT_STOP_LOSS, INCREMENT_STOP_LOSS, SET_STOP_LOSS_VALIDITY, SET_PROFIT_TARGET_VALIDITY} from './../../config/typeConstants';
import { tradeContext } from './../../context/trade/tradeContext';
import IncrementDecrementInput  from './IncrementDecrementInput';

import { executeTrade } from '../../services/executeDeleteTrade';
import authContext from './../../context/auth/authContext';
import { prettyDateTime } from './../../utils/dateFunctions';

const TradeModal= (props)=>{
    let refreshDisabled=false;
    let executeDisabled=false;
    let setValidity;
    let statusStyle;
    const{tradeDetailModal,tradeDetailModalDispatcher}=useContext(tradeContext);
    const{currentPage,tradeDetailDispatcher}=useContext(tradeContext);
    const{setShowModal} =useContext(tradeContext);
    const [executeDisabledState,setExecuteDisabledState]=useState(false);
    const {authState}=useContext(authContext);
    let incrementQuantity=()=>{tradeDetailModalDispatcher({type:INCREMENT_STOCK_QUANTITY})};
    let decrementQuantity=()=>{tradeDetailModalDispatcher({type:DECREMENT_STOCK_QUANTITY})};
    let executeTradeHandler = ()=>{
        if(tradeDetailModal.stopLoss === "")
            tradeDetailModalDispatcher({type:SET_STOP_LOSS_VALIDITY, payload :false});
        else if(tradeDetailModal.profitTarget === "")
            tradeDetailModalDispatcher({type:SET_PROFIT_TARGET_VALIDITY,payload:false});
        else
            executeTrade(tradeDetailModal.item.tradeDetailId,tradeDetailModal.stopLoss,tradeDetailModal.profitTarget,tradeDetailModal.quantity,authState.user.userId,currentPage,tradeDetailDispatcher,setExecuteDisabledState,setShowModal);
    }
    if(typeof tradeDetailModal !=='undefined'){
     statusStyle = {
      backgroundColor: "#64B5F6",
      borderColor: "#1E88E5",
      color: "black",
    };
    if (tradeDetailModal?.item?.status === "pending") {
      statusStyle = {
        backgroundColor: "#bcb416",
        borderColor: "#FDD835",
        color: "black",
      };
      refreshDisabled = true;
      executeDisabled = true;
    }
  
        //sizes for react bootstrap
        let xs=6,sm=4,md=4;
        const {date,time}=prettyDateTime(tradeDetailModal.item.createdAt);
        let row3,row2;
        let tradeDirectionStyle;
        refreshDisabled=false;
         executeDisabled=false;
        let simpleProfitTarget=<Button variant="light" className='w-100 disable-button modal-fields-text'  style={{backgroundColor:"#f1f2f7"}}> {tradeDetailModal.item.profitTarget} %</Button>;
        let simpleStopLoss=<Button variant="light" className='w-100 disable-button modal-fields-text'  style={{backgroundColor:"#f1f2f7"}}> {tradeDetailModal.item.stopLoss} %</Button>;
        let generalQuantityComponent=<Col md={md} xs={xs} sm={sm}>
                <p className='text-secondary modal-field-header'>Quantity</p>
                <Button variant="light" className='w-100 disable-button modal-fields-text'  style={{backgroundColor:"#f1f2f7"}}> {tradeDetailModal.item.quantity}</Button>         
                </Col>;
        let stopLoss=<IncrementDecrementInput 
            property={tradeDetailModal.stopLoss}
            onDecrement = {()=> tradeDetailModalDispatcher({type:DECREMENT_STOP_LOSS})}
            onIncrement = {()=> tradeDetailModalDispatcher({type:INCREMENT_STOP_LOSS})}
            onUpdate = {(elem) => {
                tradeDetailModalDispatcher({type:UPDATE_STOP_LOSS, payload: elem.target.value});
                }}
            isIncrementDisabled = {tradeDetailModal.stopLoss >=100}
            isDecrementDisabled = {tradeDetailModal.stopLoss === ""||tradeDetailModal.stopLoss <= 1}
            isUpdateDisabled ={false}
            errorMessage = "Stop Loss field can't be empty"
            isError = {!tradeDetailModal.isStopLossValid}
        />;
        let quantityComponent=<Col md={md} xs={xs} sm={sm}>
            <p className='text-secondary modal-field-header'>Quantity</p>
                    <IncrementDecrementInput 
                        property={tradeDetailModal.quantity}
                        onDecrement = {decrementQuantity}
                        onIncrement = {incrementQuantity}
                        isIncrementDisabled = {!tradeDetailModal.incrementQuantityStatus}
                        isDecrementDisabled = {!tradeDetailModal.decrementQuantityStatus}
                        isUpdateDisabled ={true}
                    />
            </Col>;
        let profitTarget=<IncrementDecrementInput 
            property={tradeDetailModal.profitTarget}
            onDecrement = {()=> tradeDetailModalDispatcher({type:DECREMENT_PROFIT_TARGET})}
            onIncrement = {()=> tradeDetailModalDispatcher({type:INCREMENT_PROFIT_TARGET})}
            onUpdate = {(elem) => {
                tradeDetailModalDispatcher({type:UPDATE_PROFIT_TARGET, payload: elem.target.value});
                }}
            isIncrementDisabled = {tradeDetailModal.profitTarget === "" ||tradeDetailModal.profitTarget >= 100}
            isDecrementDisabled = {tradeDetailModal.profitTarget === ""||tradeDetailModal.profitTarget <= 1}
            isUpdateDisabled ={false}
            errorMessage = "Profit Target field can't be empty"
            isError = {!tradeDetailModal.isProfitTargetValid}
        />;
        let statusStyle={backgroundColor:"#FFF3CD",color:"#664D03"};
        let statusText="No Action";
        if(tradeDetailModal.item.status==='pending'){
            statusStyle.backgroundColor="#E2E3E5";
            statusStyle.color="#41464B";
            statusText="Pending";
            refreshDisabled=true;
            executeDisabled=true;
            quantityComponent=generalQuantityComponent;
            stopLoss=simpleStopLoss;
            profitTarget=simpleProfitTarget;
        }
        if(tradeDetailModal.item.status==='executed'){
            statusStyle.backgroundColor="#D1E7DD";
            statusStyle.color="#0F5132"
            statusText="Executed";
            refreshDisabled=true;
            executeDisabled=true;
            quantityComponent=generalQuantityComponent;
            stopLoss=simpleStopLoss;
            profitTarget=simpleProfitTarget;
        }
        if(tradeDetailModal.item.status==='insufficient_funds' || tradeDetailModal.item.status==='no_holding' ||tradeDetailModal.item.status==='quantity_mismatch'){
            statusText=tradeDetailModal.item.status.split("_").join(" ");
            statusStyle.backgroundColor="#F8D7DA";
            statusStyle.color="#842029";
        }
        if(tradeDetailModal.item.tradeDirection.toLowerCase()==='buy')
        {
            tradeDirectionStyle={backgroundColor:"#FFF3CD",color:"#664D03"};
            row3=<Row className='row1'>
                <Col md={md} xs={xs} sm={sm}>
                    <p className='text-secondary modal-field-header'>Stop loss  (%) </p>
                    {stopLoss}
                </Col>
                <Col md={md} xs={xs} sm={sm}>
                    <p className='text-secondary modal-field-header'>Profit Target (%)</p>
                    {profitTarget}
                </Col>
            </Row>;
            
        }
        else{
            tradeDirectionStyle={backgroundColor:"#CFF4FC",color:"#055160"};
            
            let gainStyle={backgroundColor:"",color:""}
            let sign;
            if(tradeDetailModal.item.gain!==undefined){
                if(tradeDetailModal.item.gain>=0)
                {   
                    gainStyle.backgroundColor="#D1E7DD";
                    gainStyle.color="#0F5132";
                    sign="+";
                }
                else{
                    gainStyle.backgroundColor="#F8D7DA";
                    gainStyle.color="#842029";
                    sign="-";
                }
            }
            row3=<Row className='row1'>
                    <Col md={md} xs={xs} sm={sm}>
                    <p className='text-secondary modal-field-header'>Gain</p>
                    <Button variant="light" className='w-100 disable-button modal-fields-text'  style={gainStyle}>{sign} ₹ {Math.abs(tradeDetailModal.item.gain)}</Button>         
                    </Col>
                </Row>;
            quantityComponent=generalQuantityComponent;
        }
        if(tradeDetailModal.item.status!=='no_holding')
        {
            row2=<Row className='row1'>
                <Col md={md} xs={xs} sm={sm}>
                <p className='text-secondary modal-field-header'>Ticker Price</p>
                <Button variant="light" className='w-100 disable-button modal-fields-text'  style={{backgroundColor:"#f1f2f7"}}>₹ {tradeDetailModal.item.pricePerTicker}</Button>             
                </Col>
                {quantityComponent}
                <Col md={md} xs={xs} sm={sm}>
                <p className='text-secondary modal-field-header'>Total Cost</p>
                <Button variant="light" className='w-100 disable-button modal-fields-text'  style={{backgroundColor:"#f1f2f7"}}>₹ {tradeDetailModal.item.totalCost}</Button>             
                </Col>
            </Row>;
        }
        else{
            row2=<></>
            row3=<></>
        }
        return (<Modal 
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton style={{background:"linear-gradient(to right, rgb(246, 211, 101), rgb(253, 160, 133))"}} >
            <Modal.Title id="contained-modal-title-vcenter" stlye={{lineHeight:"10"}}>
                <div className="header-text-custom">{tradeDetailModal.item.ticker.tickerName}</div>
                <em className='time-text'>Creation Time: {date} at {time}</em>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:"#FFFFFF"}}>
            <Container fluid>
                <Row className="row1">
                    <Col md={md} xs={xs} sm={sm}>
                        <p className='text-secondary modal-field-header'>Ticker ID</p>
                        <Button variant="light" className='w-100 disable-button modal-fields-text' style={{backgroundColor:"#f1f2f7"}}>{tradeDetailModal.item.ticker.tickerId}</Button>
                    </Col>
                    <Col md={md} xs={xs} sm={sm}>
                        <p className='text-secondary modal-field-header'>Direction</p>
                        <Button variant="light" className='w-100  disable-button badge-font-modal modal-fields-text' style={tradeDirectionStyle}>
                            {tradeDetailModal.item.tradeDirection} 
                        </Button>              
                    </Col>
                    <Col md={md} xs={xs} sm={sm}>
                        <p className='text-secondary modal-field-header'>Status</p>
                        <Button className='w-100 disable-button badge-font-modal modal-fields-text' variant="light" style={statusStyle}>
                            {statusText}
                        </Button>              
                    </Col>
                </Row>
                {row2}
                {row3}  
            </Container>  
        </Modal.Body>
        <Modal.Footer style={{background:"linear-gradient(to right, rgba(246, 211, 101,0.65), rgba(253, 160, 133,0.65))"}}>
            <button className='btn btn-outline-primary execute-button-text' disabled={refreshDisabled}> <VscRefresh/></button>
            <button className='btn btn-outline-dark execute-button-text' disabled={executeDisabled || executeDisabledState}
                onBlur = {setValidity}
                onClick = {executeTradeHandler}
                >Execute </button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return <div></div>;
  }
};
export default TradeModal;
