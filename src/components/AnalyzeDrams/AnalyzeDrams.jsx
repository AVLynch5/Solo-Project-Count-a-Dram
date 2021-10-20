import React, {useState} from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { useDispatch } from "react-redux";
import { Bar } from 'react-chartjs-2';
import useData from "../../hooks/useData";
import './AnalyzeDrams.css';


function AnalyzeDrams(){
    const [value, setValue] = useState(new Date());

    const [barStuff, setBarStuff] = useState({dates: [], calData: [], quantData: []});

    const dispatch = useDispatch();

    const dataArray = useData();

    let barData = {
        labels: barStuff.dates,
        datasets: [
            {
                label: 'Calories',
                yAxisID: 'A',
                data: barStuff.calData,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
            {
                label: 'Drams',
                yAxisID: 'B',
                data: barStuff.quantData,
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Total Calorie and Dram Consumption by Date',
            }
        },
        scales: {
            A: {
                display: true,
                title: {
                    display: true,
                    text: 'Number of Calories',
                    color: 'rgba(54, 162, 235, 1)',
                },
                type: 'linear',
                position: 'left',
                ticks: {
                    beginAtZero: true,
                },
            },
            B: {
                display: true,
                title: {
                    display: true,
                    text: 'Number of drams (fl. oz)',
                    color: 'rgba(255, 159, 64, 1)',
                },
                type: 'linear',
                position: 'right',
                ticks: {
                    beginAtZero: true,
                },
            }
        },
    };

    function populateChart() {
        let dateString='';
        let calDataString='';
        let quantDataString='';
        for (let dataDay of dataArray) {
            console.log(dataDay.dram_date, dataDay.SUM_CALS, dataDay.SUM_DRAMS);
            if (dataArray.indexOf(dataDay) != dataArray.length-1) {
                dateString = dateString + moment(dataDay.dram_date).format('YYYY-MM-DD') + '_';
                calDataString = calDataString + dataDay.SUM_CALS + '_';
                quantDataString = quantDataString + dataDay.SUM_DRAMS + '_';
            } else {
                dateString = dateString + moment(dataDay.dram_date).format('YYYY-MM-DD');
                calDataString = calDataString + dataDay.SUM_CALS;
                quantDataString = quantDataString + dataDay.SUM_DRAMS;
            }

            
        }
        setBarStuff({dates: dateString.split('_'), calData: calDataString.split('_'), quantData: quantDataString.split('_')});
        console.log(barData);
    }

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
                        className="calendarDisp"
                    />
                <button onClick={populateChart}>Plot Data</button>
                </div>
            </div>
            <div className="chart">
                <h3>Plotted Data from Selected Dates</h3>
                <Bar 
                    data={barData} 
                    options={options}
                    className="chartDisp"
                />
            </div>
        </>
    );
}

export default AnalyzeDrams;