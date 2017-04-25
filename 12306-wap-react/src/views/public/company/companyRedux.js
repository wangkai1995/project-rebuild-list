import { combineReducers } from 'redux';
import company from '../../../components/public/company/companyContainerRedux';
import * as companyActions from '../../../components/public/company/companyContainerAction';


//reducer
export default combineReducers({
    company,
});


//action
export const actions = companyActions;

