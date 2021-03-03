import * as actionTypes from './action-type'
/**
 * 得到一个用于增加数字操作的action
 */
export function getIncreaseAction(){
 return {
     type: actionTypes.Increase
 }
}

export function getDecreaseAction() {
    return {
        type: actionTypes.Decrease
    }
}

export function getSetAction(newNum) {
    return {
        type: actionTypes.SET,
        payload: newNum
    }
}