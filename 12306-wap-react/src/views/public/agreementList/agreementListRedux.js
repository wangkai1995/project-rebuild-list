import { combineReducers } from 'redux';
import agreementList from '../../../components/public/agreementList/agreementListContainerRedux';
import * as agreementListActions from '../../../components/public/agreementList/agreementListContainerAction';


//reducer
export default combineReducers({
    agreementList,
});


//action
export const actions = agreementListActions;
