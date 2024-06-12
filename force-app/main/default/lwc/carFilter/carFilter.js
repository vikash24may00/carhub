import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import CAR_OBJECT from '@salesforce/schema/Car__c';

// car schema
import CATEGORY_FIELD from '@salesforce/schema/Car__C.Category__c';
import MAKE_FIELD from '@salesforce/schema/Car__C.Make__c';

// constants
const CATEGORY_ERROR = 'Error Loading Categories';
const MAKE_ERROR = 'Error Loading makeType';


export default class CarFilter extends LightningElement {

    filters = {
        searchKey: '',
        maxPrice: 999999
    }

    categoryError = CATEGORY_ERROR;
    makeerror = MAKE_ERROR;

    // fetching category picklist
    @wire(getObjectInfo, { objectApiName: CAR_OBJECT })
    carObjectInfo


    @wire(getPicklistValues, {
        recordTypeId: '$carObjectInfo.data.defaultRecordTypeId',
        fieldApiName: CATEGORY_FIELD
    }) categories


    // fetching make picklist
    @wire(getPicklistValues, {
        recordTypeId: '$carObjectInfo.data.defaultRecordTypeId',
        fieldApiName: MAKE_FIELD
    }) makeType


    // search key handler
    handleSearchKeyChange(event) {
        console.log(event.target.value);
        this.filters = { ...this.filters, "searchKey": event.target.value }
    }

    // price range handler
    handleMaxPriceChange(event) {
        console.log(event.target.value);
        this.filters = { ...this.filters, "maxPrice": event.target.value }
    }

    handleCheckbox(event) {
        const { name, value } = event.target.dataset;
        console.log("name", name);
        console.log("value", value);

    }
}