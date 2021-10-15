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

    const handleDelete = (dramDate, dramID) => {
        dispatch({type: 'DELETE_DRAM', payload: {date: dramDate, id: dramID}});
    }

    const [editMode, setEditMode] = useState(false);

    const editDram = () => {
        setEditMode(!editMode);
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
                                return(
                                    <tr key={entry.id}>
                                        <td>{editMode ? <input type="text" value={dramList[dramList.indexOf(entry)].whiskey_name} onChange={(event) => dispatch({type: 'EDIT_WHISKEY_NAME', payload: {index: dramList.indexOf(entry), name: event.target.value}})}/> : entry.whiskey_name}</td>
                                        <td>{editMode ? <input required type="number" value={dramList[dramList.indexOf(entry)].whiskey_proof}/> : entry.whiskey_proof}</td>
                                        <td>{editMode ? <input required type="number" value={dramList[dramList.indexOf(entry)].dram_quantity}/> : entry.dram_quantity}</td>
                                        <td>{entry.dram_calories}</td>
                                        <td><button onClick={() => handleDelete(entry.dram_date, entry.id)}>Delete</button></td>
                                        <td>{editMode ? <button onClick={editDram}>Confirm</button> : <button onClick={editDram}>Edit</button>}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ViewDrams;