import { combineReducers } from 'redux';
import agreement from '../../../components/public/agreement/agreementContainerRedux';
import * as agreementActions from '../../../components/public/agreement/agreementContainerAction';


//reducer
export default combineReducers({
    agreement,
});


//action
export const actions = agreementActions;

