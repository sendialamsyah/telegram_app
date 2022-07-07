import {combineReducers} from 'redux'
import detailReducer from './detailUserReducer'

const rootReducers = combineReducers({
    detail: detailReducer
  });
  
  export default rootReducers;