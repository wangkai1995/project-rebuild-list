import { combineReducers } from 'redux';
import legalnotices from '../../../components/public/legalnotices/legalnoticesContainerRedux';
import * as legalnoticesActions from '../../../components/public/legalnotices/legalnoticesContainerAction';


//reducer
export default combineReducers({
    legalnotices,
});


//action
export const actions = legalnoticesActions;

