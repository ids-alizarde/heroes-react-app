import { CONSTANTS } from "../services/constantsService";

// const state = {
//     name: 'Aldo',
//     logged: true
// };

export const authReducer = ( state = {}, action ) => {

    switch ( action.type ) {
        case CONSTANTS.login:
            
            return {
                ...action.payload,
                logged: true
            };

        case CONSTANTS.logout:
            
            return {
                logged: false
            };

        default:
            return state;
    }
}