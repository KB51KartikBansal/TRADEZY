import moment from "moment";

export const prettyDateTime=(rawDate)=>{
    let dateSplit=rawDate.split("T");
    let date=dateSplit[0];
    let timeSplit=dateSplit[1].split(":");
    let hh=timeSplit[0];
    let mm=timeSplit[1];
    let formattedDate=moment(date+" "+hh+":"+mm,"YYYY-MM-DD HH:mm");
    let returnDate=formattedDate.format("Do MMMM YYYY") ;
    let returnTime=formattedDate.format("h:mm a");
    return {
        date:returnDate,
        time:returnTime
    }    
}