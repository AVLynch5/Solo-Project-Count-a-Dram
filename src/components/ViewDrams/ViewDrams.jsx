import React, { useState } from "react";
//import the calendar
import Calendar from "react-calendar";
//import momentjs
import moment from "moment";
import { useDispatch } from "react-redux";
import useDram from "../../hooks/useDram";

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

    //function to handle DELETE and make dispatch. Requires dram id to DELETE and date to GET updated dram array
    const handleDelete = (dramDate, dramID) => {
        dispatch({type: 'DELETE_DRAM', payload: {date: dramDate, id: dramID}});
    }

    //state var to toggle b/t editMode
    const [editMode, setEditMode] = useState(false);

    const editDram = () => {
        setEditMode(!editMode);
    }

    //function calCals to calculate calories given user input
    const calcCals = (index, proof, quantity) => {
        //input validation here-ensure user inputted numbers into proof/quantity fields. Also ensure proof <= 200
        const validation = validateNums(proof, quantity);
        if (validation) {
            const ozAlc = (proof*quantity)/200;
            const mLAlc = 29.5735*ozAlc;
            const gAlc = 0.789*mLAlc;
            const dramCals = 7*gAlc;
            dispatch({type: 'EDIT_DRAM_CALORIES', payload: {index: index, calories: parseInt(dramCals)}});
            setEditMode(!editMode);
        } else{
            alert('Please enter valid proof and quantity values');
            return;
        } 
    }

    //function to validate inputted numbers
    const validateNums = (proof, quantity) => {
        //inputted nums should not be negative
        if (proof < 0 || quantity < 0) {
            return false;
        }
        //proof cannot exceed 200 
        if (proof > 200) {
            return false;
        }
        else 
            return true
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
                                        <td>{editMode ? <input required type="number" value={dramList[dramList.indexOf(entry)].whiskey_proof} onChange={(event) => dispatch({type: 'EDIT_WHISKEY_PROOF', payload: {index: dramList.indexOf(entry), proof: event.target.value}})}/> : entry.whiskey_proof}</td>
                                        <td>{editMode ? <input required type="number" value={dramList[dramList.indexOf(entry)].dram_quantity} onChange={(event) => dispatch({type: 'EDIT_DRAM_QUANTITY', payload: {index: dramList.indexOf(entry), quantity: event.target.value}})}/> : entry.dram_quantity}</td>
                                        <td>{entry.dram_calories}</td>
                                        <td><button onClick={() => handleDelete(entry.dram_date, entry.id)}>Delete</button></td>
                                        <td>{editMode ? <button onClick={() => calcCals(dramList.indexOf(entry), entry.whiskey_proof, entry.dram_quantity)}>Confirm</button> : <button onClick={editDram}>Edit</button>}</td>
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