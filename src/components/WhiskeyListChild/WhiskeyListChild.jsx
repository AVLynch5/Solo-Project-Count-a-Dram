const WhiskeyListChild = ({childObj}) => {
    return(
        <>
            {Object.entries(childObj).map(([key, value], i) => {
                return(
                    <div key={i}>
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
        </>
    );
};

export default WhiskeyListChild;