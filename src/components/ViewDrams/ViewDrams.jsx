import React, { useState } from "react";
//import the calendar
import Calendar from "react-calendar";
//import momentjs
import moment from "moment";
import { useDispatch } from "react-redux";
import useDram from "../../hooks/useDram";
import ViewDramChild from "../ViewDramChild/ViewDramChild";

function ViewDrams() {
    const dispatch = useDispatch();

    //import instance of dramReducer
    const dramList = useDram();

    //state var for Calendar
    const [value, setValue] = useState(new Date());

    //function to change calendar date on click and GET drams by date
    function onChange(nextValue) {
        setValue(nextValue);
        const dateToDisplay = moment(nextValue).format('YYYY-MM-DD');
        alert(`The date selected is ${dateToDisplay}`);
        dispatch({type: 'GET_DATE_DRAMS', payload: dateToDisplay});
    }

    return(
        <>
            <div className="calendar">
                <h3>Pick a Date</h3>
                <div className="calContainer">
                    <Calendar 
                        onChange={onChange}
                        value={value}
                    />
                </div>
            </div>
            <div className="dramData">
                <h3>Drams from Selected Date</h3>
                <div className="dataContainer">
                    <table className="dataTable">
                        <thead>
                            <tr>
                                <th>Whiskey Name</th>
                                <th>Whiskey Proof</th>
                                <th>Dram Quantity</th>
                                <th>Dram Calories</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dramList.map((entry) => {
                                return(<ViewDramChild dramList={dramList} entry={entry} />)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ViewDrams;