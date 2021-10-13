import { useState } from "react";

function AddADram(){
    //state var
    const [newDram, setNewDram] = useState({name: '', proof: '', quantity: '', calories: ''});

    //function calCals to calculate calories given user input
    const calcCals = (event) => {
        event.preventDefault();
        //input validation here-ensure user inputted numbers into proof/quantity fields
        const ozAlc = (newDram.proof*newDram.quantity)/200;
        const mLAlc = 29.5735*ozAlc;
        const gAlc = 0.789*mLAlc;
        const dramCals = 7*gAlc;
        setNewDram({...newDram, calories: parseInt(dramCals)});
    }

    const clearInputs = () => {
        //consider validation sweetAlert - ensure user wants to clear
        setNewDram({name: '', proof: '', quantity: '', calories: ''});
    }

    return(
        <>
            <h1>Add a Dram</h1>
            <form onSubmit={calcCals}>
                <input placeholder="whiskey name" />
                <input required type="number" placeholder="whiskey proof" value={newDram.proof} onChange={(event) => setNewDram({...newDram, proof: event.target.value})}/>
                <input required type="number" placeholder="Oz whiskey" value={newDram.quantity} onChange={(event) => setNewDram({...newDram, quantity: event.target.value})}/>
                <button type="submit">Calculate Calories</button>
                <button>Add this dram</button>
                <button onClick={() => clearInputs}>Clear form</button>
                <p>Calories: {newDram.calories}</p>
            </form>
        </>
    );
}

export default AddADram;