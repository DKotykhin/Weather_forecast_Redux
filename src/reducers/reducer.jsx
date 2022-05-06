const initialState = {    
    cityName: '',
    flag: false,
    process: 'waiting'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "CITY_SELECT":
            return {
                ...state,
                cityName: action.payload
            };
        case 'CITY_UPDATE':
            return {
                ...state,
                flag: !state.flag
            }
        case 'PROCESS':
            return {
                ...state,
                process: action.payload
            }
        case 'LOADED':
            return {
                ...state,
                process: 'loaded'
            }
        default:
            return state;
    }
}

export default reducer;