import './WhiskeyListChild.css';

const WhiskeyListChild = ({childObj}) => {
    return(
        <>
            <div className="containerDiv">
                <h3>Whiskey List</h3>
                <div className="listDiv">
                    {Object.entries(childObj).map(([key, value], i) => {
                        return(
                            <div className="cardDiv" key={i}>
                                <div className="cardHeader">
                                    <h4 style={{marginBottom: 0.25}}>{key}</h4>
                                </div>
                                <div className='cardBody'>
                                    <ul style={{marginTop: 10}}>
                                        {value.map((whiskyName, i) => {
                                            return <li key={i}>{whiskyName.name}, {whiskyName.proof} proof</li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default WhiskeyListChild;