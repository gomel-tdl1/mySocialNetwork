const initialState = {
    views: [
        {
            id:1,
            name: 'Arina',
            avatar:'https://sun2.velcom-by-minsk.userapi.com/impf/c858224/v858224468/afea6/domWQuDwnNY.jpg?size=1679x1700&quality=96&proxy=1&sign=4c5145fd05ad6fbca9bb07c6ac725b81'
        },
        {
            id:3,
            name: 'Daniel',
            avatar: 'https://sun9-73.userapi.com/impf/c854532/v854532471/ae0b/lhY7_MxVUv4.jpg?size=1536x2048&quality=96&proxy=1&sign=5db7444735ab438f75e0f92aa8acf5f0'
        },
        {
            id:4,
            name: 'Andrew',
            avatar: 'https://sun9-63.userapi.com/impg/lRByKuTJM11ForAGkU0TkmhidmM2miJNpsIqpg/qZr6hYoueIQ.jpg?size=1612x2160&quality=96&proxy=1&sign=0896a68ac3e0c606ef42847b822e8f2c'
        }
    ]
};

const sideBarReducer = (state = initialState, action) => {
    let stateCopy = {...state};
    stateCopy.views = [...state.views];
    return stateCopy;
};
export default sideBarReducer;