import React, { useState } from "react";
//import the calendar
import Calendar from "react-calendar";
//import momentjs
import moment from "moment";
import { useDispatch } from "react-redux";
import useDram from "../../hooks/useDram";

function ViewDrams() {
    const dispatch = useDispatch();

    const dramList = useDram();

    const [value, setValue] = useState(new Date());

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
                            </tr>
                        </thead>
                        <tbody>
                            {dramList.map((entry) => {
                                return(<tr key={entry.id}>
                                    <td>{entry.whiskey_name}</td>
                                    <td>{entry.whiskey_proof}</td>
                                    <td>{entry.dram_quantity}</td>
                                    <td>{entry.dram_calories}</td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ViewDrams;