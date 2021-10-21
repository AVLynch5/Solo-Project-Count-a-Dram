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
    const calcCals = (proof, quantity) => {
        const ozAlc = (proof*quantity)/200;//(proof/2) -> % alcohol, (% alcohol/100) -> decimal alcohol, (decimal alcohol * quantity in oz) -> oz alcohol
        const mLAlc = 29.5735*ozAlc;//(29.5735 mL/oz)* oz Alcohol -> mL Alcohol
        const gAlc = 0.789*mLAlc;//(0.789g/mL)* mL Alcohol -> g alcohol
        const dramCals = 7*gAlc;//(7 calories/g)* g alcohol -> calories alcohol
        return parseInt(dramCals); 
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
        if (validateNums(proof, quantity)) {
            const waitForCals = calcCals(proof, quantity);
            dispatch({type: 'EDIT_DRAM_CALORIES', payload: {index: index, calories: waitForCals}})
            dispatch({type: 'EDIT_DB_DRAM', payload: {...entry, dram_calories: waitForCals}});
            setEditMode(!editMode);
        } else {
            alert('Please enter valid proof and quantity values');
            return;
        }
    }

    //double-arrow functions to clean-up onChange 
    const handleChange = (propertyKey) => (event) => {
        dispatch({type: `EDIT_WHISKEY_${propertyKey}`, payload: {index: dramList.indexOf(entry), [propertyKey]: event.target.value}})
    }

    return(
        <>
            <tr>
                <td>{editMode ? <input type="text" value={dramList[dramList.indexOf(entry)].whiskey_name} onChange={handleChange('NAME')}/> : entry.whiskey_name}</td>
                <td>{editMode ? <input required type="number" value={dramList[dramList.indexOf(entry)].whiskey_proof} onChange={handleChange('PROOF')}/> : entry.whiskey_proof}</td>
                <td>{editMode ? <input required type="number" value={dramList[dramList.indexOf(entry)].dram_quantity} onChange={handleChange('QUANTITY')}/> : entry.dram_quantity}</td>
                <td>{entry.dram_calories}</td>
                <td><button onClick={() => handleDelete(entry.dram_date, entry.id)}>Delete</button></td>
                <td>{editMode ? <button onClick={handlePut}>Confirm</button> : <button onClick={editDram}>Edit</button>}</td>
            </tr>
        </>
    );
}

export default ViewDramChild;

//prev dispatch
//(event) => dispatch({type: 'EDIT_WHISKEY_NAME', payload: {index: dramList.indexOf(entry), name: event.target.value}})