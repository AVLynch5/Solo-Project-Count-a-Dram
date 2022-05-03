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
                                    return <li>{whiskyName}</li>
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