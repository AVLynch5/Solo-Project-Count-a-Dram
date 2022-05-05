const WhiskeyListChild = ({childObj}) => {
    return(
        <>
            <div className="containerDiv">
                <div className="listDiv">
                    {Object.entries(childObj).map(([key, value], i) => {
                        return(
                            <div className="cardDiv" key={i}>
                                <figure>
                                    <figcaption>{key}</figcaption>
                                    <ul>
                                        {value.map((whiskyName, i) => {
                                            return <li key={i}>{whiskyName.name}, {whiskyName.proof} proof</li>
                                        })}
                                    </ul>
                                </figure>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default WhiskeyListChild;