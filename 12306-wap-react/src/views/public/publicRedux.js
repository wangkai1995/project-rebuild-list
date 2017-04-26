import { combineReducers } from 'redux';
import citys from './city/cityRedux';
import company from './company/companyRedux';
import legalnotices from './legalnotices/legalnoticesRedux';
import agreementList from './agreementList/agreementListRedux';
import agreement from './agreement/agreementRedux';

export default combineReducers({
	citys,
    company,
    legalnotices,
    agreementList,
    agreement,
});