import { combineReducers } from 'redux';
import index from '../../../components/user/index/indexContainerRedux';
import * as rootsActions from '../../../components/user/index/indexContainerAction';


//reducer
export default combineReducers({
    index,
});


//action
export const actions = rootsActions;
