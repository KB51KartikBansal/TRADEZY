export const capitalize = (data)=>{
    return data.split("_").join(" ");
}
export const processDate = (data)=>{
    return new Date(data).toDateString().substring(4); //timeSince(new Date(item.createdAt), true)
}
export const processTime = (data)=>{
    let d =  new Date(data);
    function addZero(i) {
        if (i < 10) {i = "0" + i}
        return i;
      }
      let h = addZero(d.getHours());
      let m = addZero(d.getMinutes());
      let s = addZero(d.getSeconds());
      let time = h + ":" + m + ":" + s;
      return time;
}
const STATUS_ABBREVIATION  = new Map();
STATUS_ABBREVIATION.set('no_action','NACT');
STATUS_ABBREVIATION.set('executed', 'EXEC');
STATUS_ABBREVIATION.set('insufficient_funds','ISF');
STATUS_ABBREVIATION.set('pending','PEND');
STATUS_ABBREVIATION.set('quantity_mismatch', 'QTMM');
STATUS_ABBREVIATION.set('no_holding', 'NHLD');
export const abbreviate = (data)=>{
  return STATUS_ABBREVIATION.get(data);
}
export const getAllKeys = ( )=>{
  return [ ...STATUS_ABBREVIATION.keys()];
}
// const STATUS_ABBREVIATION  = new Map();
// STATUS_ABBREVIATION.set('No Action','NACT');
// STATUS_ABBREVIATION.set('Executed', 'EXEC');
// STATUS_ABBREVIATION.set('Insufficient Funds','ISF');
// STATUS_ABBREVIATION.set('Pending','PEND');
// STATUS_ABBREVIATION.set('Quantity Mismatch', 'QTMM');
// STATUS_ABBREVIATION.set('No Holdings', 'NHLD');

const STATUS_COLOR  = new Map();
STATUS_COLOR.set('no_action','warning');
STATUS_COLOR.set('executed', 'success');
STATUS_COLOR.set('pending','secondary');
STATUS_COLOR.set('insufficient_funds','danger');
STATUS_COLOR.set('quantity_mismatch', 'danger');
STATUS_COLOR.set('no_holding', 'danger');

export const getStatusColor =(key)=>{

  return STATUS_COLOR.get(key);
}

const DIRECTION_COLOR  = new Map();
DIRECTION_COLOR.set('buy','warning');
DIRECTION_COLOR.set('sell', 'info');

export const getDirectionColor =(key)=>{
  return DIRECTION_COLOR.get(key);
}

