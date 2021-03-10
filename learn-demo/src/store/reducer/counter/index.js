import {increase} from '../../action/counter'
import {handleAction} from 'redux-actions'

export default function(state = 10, {type, payload}){
  switch (type) {
    case actionTypes.increase:
      return state + 1;
    
    default:
      return state;
  }
}

const reducer = handleAction(increase, (state, action) => {
  return state + 1;
}, 10)