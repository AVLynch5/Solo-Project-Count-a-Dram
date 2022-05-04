const WhiskeyListChild = ({childObj}) => {
    return(
        <>
            {Object.entries(childObj).map(([key, value], i) => {
                return(
                    <div key={i}>
                        <figure>
                            <figcaption>{key}</figcaption>
                            <ul>
                                {value.map((whiskyName) => {
                                    return <li>{whiskyName.name}, {whiskyName.proof} proof</li>
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