import { useState } from "react";
import { useDispatch } from "react-redux";
import useUser from "../../hooks/useUser";

function AddADram(){
    //dispatch
    const dispatch = useDispatch();

    const user = useUser();

    //state var
    const [newDram, setNewDram] = useState({name: '', proof: '', quantity: '', calories: ''});

    //function calCals to calculate calories given user input
    const calcCals = (event) => {
        event.preventDefault();
        //input validation here-ensure user inputted numbers into proof/quantity fields. Also ensure proof <= 200
        const validation = validateNums();
        if (validation) {
            const ozAlc = (newDram.proof*newDram.quantity)/200;
            const mLAlc = 29.5735*ozAlc;
            const gAlc = 0.789*mLAlc;
            const dramCals = 7*gAlc;
            setNewDram({...newDram, calories: parseInt(dramCals)});
        } else{
            alert('Please enter valid proof and quantity values');
            return;
        } 
    }

    //function handlePost - checks if calories calculated (inputs validated by calcCals) before dispatch
    const handlePost = () => {
        //check - user must have entered info and calculated to POST
        if (!newDram.calories) {
            alert('Please enter dram information and calculate');
            return;
        } else {
            dispatch({type: 'ADD_NEW_DRAM', payload: newDram});
            clearInputs();
            //after dispatch, route user to view drams component
        }  
    }

    //function to validate inputted numbers
    const validateNums = () => {
        //inputted nums should not be negative
        if (newDram.proof < 0 || newDram.quantity < 0) {
            return false;
        }
        //proof cannot exceed 200 
        if (newDram.proof > 200) {
            return false;
        }
        else 
            return true
    }

    const clearInputs = () => {
        //consider validation sweetAlert - ensure user wants to clear
        setNewDram({name: '', proof: '', quantity: '', calories: ''});
    }

    //double-arrow functions to clean-up onChange 
    const handleChange = (propertyKey) => (event) => {
        setNewDram({...newDram, [propertyKey]: event.target.value})
    }

    return(
        <>
            <h1>Add a Dram</h1>
            <p>{JSON.stringify(newDram)}</p>
            <form onSubmit={calcCals}>
                <input placeholder="whiskey name" type="text" value={newDram.name} onChange={handleChange('name')}/>
                <input required type="number" placeholder="whiskey proof" value={newDram.proof} onChange={handleChange('proof')}/>
                <input required type="number" placeholder="Oz whiskey" value={newDram.quantity} onChange={handleChange('quantity')}/>
                <button type="submit">Calculate Calories</button>
                <button onClick={clearInputs}>Clear form</button>
            </form>
            <p>Calories: {newDram.calories}</p>
            {user.id != null ? <button onClick={handlePost}>Add this dram</button> : ''}
        </>
    );
}

export default AddADram;