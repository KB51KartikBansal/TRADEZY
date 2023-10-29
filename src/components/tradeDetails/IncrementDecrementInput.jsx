import { BiMinus,BiPlus} from 'react-icons/bi';
import { Button, Form, InputGroup } from 'react-bootstrap';
const IncrementDecrementInput = ({  property, 
                                    onIncrement,
                                    onDecrement, 
                                    onUpdate,
                                    isIncrementDisabled,
                                    isDecrementDisabled,
                                    isUpdateDisabled,
                                    isError,
                                    errorMessage})=>{
    return (
            <InputGroup class>
                    <Button 
                            variant="outline-secondary" 
                            disabled={isDecrementDisabled}
                            onClick = {onDecrement}
                            style={{backgroundColor: "rgb(241, 242, 247)"}}
                            className="plus-minus-button"
                        >
                        <BiMinus />
                    </Button>
                    <Form.Control
                        className = {(isError) ?"text-center is-invalid modal-fields-text":"text-center modal-fields-text"}
                        disabled = {isUpdateDisabled}
                        onChange ={onUpdate}
                        value ={property}
                        style={{backgroundColor: "rgb(241, 242, 247)"}}
                    />
                    <div className ="invalid-tooltip">{errorMessage} </div>
                    <Button 
                            variant="outline-secondary" 
                            disabled={isIncrementDisabled}
                            onClick = {onIncrement}
                            style={{backgroundColor: "rgb(241, 242, 247)"}}
                            className="plus-minus-button"

                        >
                        <BiPlus  />
                    </Button>
            </InputGroup>
    )
}
IncrementDecrementInput.props = {

    onUpdate : ()=>{},
    isError : false,
    errorMessage :""
}
export default IncrementDecrementInput;