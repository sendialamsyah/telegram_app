import {combineReducers} from 'redux'
import detailReducer from './detailUserReducer'

const rootReducers = combineReducers({
    profile: detailReducer
  });
  
  export default rootReducers;