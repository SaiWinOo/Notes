import React, {useState} from 'react';

const UseSelect = () => {

    const [isSelecting, setIsSelecting] = useState(false);
    const [isSelectedAll, setIsSelectedAll] = useState(false);


    return {
        isSelectedAll, setIsSelectedAll,
        isSelecting, setIsSelecting,
    }
};

export default UseSelect;
