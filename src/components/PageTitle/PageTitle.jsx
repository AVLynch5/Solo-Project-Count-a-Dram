import React, {useEffect} from 'react';

function PageTitle ({title, component}){

    useEffect(() => {
        const prevTitle = document.title;
        document.title = title;
        return () => {
            document.title = prevTitle;
        }
    });

    return(
        <>
            {component}
        </>
    );
};

export default PageTitle;