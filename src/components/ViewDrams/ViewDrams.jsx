import React, { useState } from "react";
//import the calendar
import Calendar from "react-calendar";
//import momentjs
import moment from "moment";
import { useDispatch } from "react-redux";
import useDram from "../../hooks/useDram";
import ViewDramChild from "../ViewDramChild/ViewDramChild";
//import calendar styling
import 'react-calendar/dist/Calendar.css';
import { Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './ViewDrams.css';

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
            <div className="wholePage">
            <Paper className="pageContainer" elevation={10} sx={{backgroundColor: '#F09F41'}}>
            <div className="calendar">
                <h3>Pick a Date</h3>
                <div className="calContainer">
                    <Calendar 
                        onChange={onChange}
                        value={value}
                        className="calendarDisp"
                    />
                </div>
            </div>
            <div className="dramData">
                <h3>Drams from Selected Date</h3>
                <TableContainer className="dataContainer">
                    <Table className="table">
                        <TableHead>
                            <TableRow>
                                <TableCell align={"center"}>Whiskey Name</TableCell>
                                <TableCell align={"center"}>Whiskey Proof</TableCell>
                                <TableCell align={"center"}>Dram Quantity (oz)</TableCell>
                                <TableCell align={"center"}>Dram Calories</TableCell>
                                <TableCell align={"center"}>Delete</TableCell>
                                <TableCell align={"center"}>Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dramList.map((entry) => {
                                return(<ViewDramChild key={entry.id} dramList={dramList} entry={entry} />)
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            </Paper>
            </div>
        </>
    );
}

export default ViewDrams;