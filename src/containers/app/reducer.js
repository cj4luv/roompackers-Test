import { handleActions } from 'redux-actions'
import {CHANGE_TITLE, CHANGE_INT_TITLE, MODAL_VISIBLE} from './constants';

const initialState = {
  pfTitle: 'aaaaaaaaaa',
  intTitle: 'bbbbbbb',
  modalVisible: false,
}
export default handleActions({
  [CHANGE_TITLE]: (state, action)=>{
    return {
      pfTitle: action.pfTitle,
    }
  },
  [CHANGE_INT_TITLE]: (state, action)=>{
    return {
      intTitle: action.intTitle,
    }
  },
  [MODAL_VISIBLE]: (state, action)=>{
    console.log('reducer get modal visible');
    console.log("reducer: " + action.modalVisible);
    return {
      modalVisible: action.modalVisible,
    }
  },
}, initialState)
