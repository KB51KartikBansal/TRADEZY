import React from 'react'
import {MdDelete, MdOutlineMoreVert} from 'react-icons/md';
import {VscRunAll} from 'react-icons/vsc';
import {VscRefresh} from 'react-icons/vsc';
import { logger } from '../../../utils/logger';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const CustomToggle = React.forwardRef(({ children }, ref) => (
  <div
    href=""
    ref={ref}
    onClick={e => {
      e.preventDefault();
    
    }}
  >
    {children}
  </div>
));


const DropdownActions  =  ({show, setShow,item ,...rest})=>{
 const dropItemClass  = ' mx-1 d-flex justify-content-around align-items-center'; 
 
  return (
    <DropdownButton 
                show = {show} 
                align ="start" 
                onBlur = {()=>{setShow(false);}}
                as={CustomToggle} 
                title = {<>
                          <MdOutlineMoreVert /> 
                            <span className='hidden-element' test-dataid = "more">more</span>
                          </>}  
                id = "nav-dropdown" 
                className ="mb-1" 
                varient = "success"
            >
          <Dropdown.Item 
                    className={(rest.refreshDisabled)?'text-muted' :'text-primary'} 
                    eventKey="1" 
                    disabled ={rest.refreshDisabled} >
            <div 
                className= {dropItemClass} 
                disabled ={rest.refreshDisabled} 
                onClick = {()=>rest.onRefresh(item)}
              >
              <span >Refresh</span> 
              <VscRefresh/>
            </div>
          </Dropdown.Item>
          <Dropdown.Item  
                    className={(rest.deleteDisabled)?'text-muted' :'text-danger'} 
                    disabled ={rest.deleteDisabled}
                    eventKey="2">
                <div className={dropItemClass} 
                   disabled={rest.deleteDisabled}  
                   onClick ={()=>rest.onDelete(item)}
                  > 
                  <span >Delete</span>   
                  <MdDelete/>
                </div>
          </Dropdown.Item>
          <Dropdown.Item  
                        className={(rest.executeDisabled)?'text-muted' :'text-dark'} 
                        disabled ={rest.executeDisabled}
                        eventKey="3">
                <div className= {dropItemClass }
                    disabled={rest.executeDisabled}  
                    onClick ={()=>rest.onExecute(item)}
                  > 
                  Execute
                  <VscRunAll />
                </div>
          </Dropdown.Item>
    </DropdownButton>
   
  )
}
export default DropdownActions;