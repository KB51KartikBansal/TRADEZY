
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function ToolTip({actualMessage, smlMessage,toolTipMessage, placement}) {

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}  >
       {toolTipMessage}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement={placement}
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <div>
      <div className='d-none d-lg-inline-flex text-center'>{actualMessage}</div>
      <div className= 'd-lg-none d-sm-inline-flex text-center'>{smlMessage} </div>
      </div>
      
    </OverlayTrigger>
  );
}
ToolTip.defaultProps = {
    placement: "bottom"
}
export default ToolTip;