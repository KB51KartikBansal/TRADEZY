import {Table} from 'react-bootstrap';
import { LARGE_SCREEN_ONLY_CLASS, SMALL_SCREEN_ONLY_CLASS } from './TradeDetail.constant';
const TradeDetailsTable = ({children})=>{

    return (<>
        <Table hover  className= {LARGE_SCREEN_ONLY_CLASS }>
            {children}
        </Table>
        <Table  className= {SMALL_SCREEN_ONLY_CLASS +" table-sm " }>
            {children}
        </Table>
     </>
    )
}
export default TradeDetailsTable;