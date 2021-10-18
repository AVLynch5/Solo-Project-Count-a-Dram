import { useDispatch } from "react-redux";
import { useState } from "react";

function ViewDramChild({dramList, entry}) {
    const dispatch = useDispatch();

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
            dispatch({type: 'EDIT_DRAM_CALORIES', payload: {index: index, calories: parseInt(dramCals)}})
            //console.log(entry.dram_calories);
            setEditMode(!editMode);
            return true;
        } else{
            alert('Please enter valid proof and quantity values');
            return false;
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

    //function handlePut
    const handlePut = () =>{
        const index = dramList.indexOf(entry);
        const proof = entry.whiskey_proof;
        const quantity = entry.dram_quantity;
        const waitForCals = calcCals(index, proof, quantity);
        if (waitForCals) {
            console.log(entry.dram_calories);
            dispatch({type: 'EDIT_DB_DRAM', payload: entry});
        } else {
            return;
        }
    }

    return(
        <>
            <tr>
                <td>{editMode ? <input type="text" value={dramList[dramList.indexOf(entry)].whiskey_name} onChange={(event) => dispatch({type: 'EDIT_WHISKEY_NAME', payload: {index: dramList.indexOf(entry), name: event.target.value}})}/> : entry.whiskey_name}</td>
                <td>{editMode ? <input required type="number" value={dramList[dramList.indexOf(entry)].whiskey_proof} onChange={(event) => dispatch({type: 'EDIT_WHISKEY_PROOF', payload: {index: dramList.indexOf(entry), proof: event.target.value}})}/> : entry.whiskey_proof}</td>
                <td>{editMode ? <input required type="number" value={dramList[dramList.indexOf(entry)].dram_quantity} onChange={(event) => dispatch({type: 'EDIT_DRAM_QUANTITY', payload: {index: dramList.indexOf(entry), quantity: event.target.value}})}/> : entry.dram_quantity}</td>
                <td>{entry.dram_calories}</td>
                <td><button onClick={() => handleDelete(entry.dram_date, entry.id)}>Delete</button></td>
                <td>{editMode ? <button onClick={handlePut}>Confirm</button> : <button onClick={editDram}>Edit</button>}</td>
            </tr>
        </>
    );
}

export default ViewDramChild;