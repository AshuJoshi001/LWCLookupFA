import { LightningElement, wire, api } from 'lwc';
import searchRecords from '@salesforce/apex/customLookupFA.searchRecords';

export default class CustomLookupFA extends LightningElement {
    @api objectApiName;
    searchString = '';
    records = [];
    selectedRecord;
    @api iconName = 'standard:account';


    connectedCallback(){
        console.log('Custom lookup');
    }

    search(event) {
        this.searchString = event.target.value;
        if (this.searchString.length >= 2) {
            searchRecords({ objectName: this.objectApiName, searchString: this.searchString })
                .then(result => {
                    this.records = result;
                    console.log('Returned records: ', result);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            this.records = [];
            console.log('Cleared records');
        }
    }

    selectRecord(event) {
        const selectedRecordId = event.currentTarget.dataset.record;
        const selectedRecord = this.records.find(record => record.Id === selectedRecordId);
        this.selectedRecord = selectedRecord;
        this.searchString = selectedRecord.Name;
        this.records = [];
    }

    clearSelectedRecord() {
        this.selectedRecord = null;
        this.searchString = '';
    }

    get hasSelectedRecord() {
        return !!this.selectedRecord;
    }
}
