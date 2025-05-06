const initialState = {
    flight:null,
    loading:false,
    err:null
}


const flightReducer = (state = initialState, action)=>{

    switch(action.type){
        case 'FLIGHT_REQUEST':
        return {...state, loading:true}
        case 'FLIGHT_SUCCESS':
            return {...state, flight:action.payload,loading:false }
        case 'FLIGHT_FAILURE':
            return {...state, err:action.payload, loading:false }    
            default :{
                return state
              }      
    }
}

export default flightReducer;


