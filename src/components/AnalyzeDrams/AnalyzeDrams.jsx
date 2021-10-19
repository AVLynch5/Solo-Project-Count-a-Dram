import React, {useState} from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { useDispatch } from "react-redux";


function AnalyzeDrams(){
    const [value, setValue] = useState(new Date());

    const dispatch = useDispatch();

    function onChange(nextValue) {
        setValue(nextValue);
        const dateToDisplay1=(moment(nextValue[0]).format('YYYY-MM-DD'));//first date selected by user when selectRange true
        const dateToDisplay2=(moment(nextValue[1]).format('YYYY-MM-DD'));//2nd date selected by user when selectRange true
        alert(`The selected range is ${dateToDisplay1} to ${dateToDisplay2}`);
        const rangeString = dateToDisplay1+"_"+dateToDisplay2;
        dispatch({type: 'GET_RANGE_DRAMS', payload: rangeString});
    }
    return(
        <>
            <div className="calendar">
                <h3>Pick Two Dates - Date Range</h3>
                <div className="calContainer">
                    <Calendar 
                        onChange={onChange}
                        value={value}
                        selectRange={true}
                    />
                </div>
            </div>
            <div className="chart">
                <h3>Plotted Data</h3>
            </div>
        </>
    );
}

export default AnalyzeDrams;