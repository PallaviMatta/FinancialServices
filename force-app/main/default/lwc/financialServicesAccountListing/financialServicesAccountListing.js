import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class FinancialServicesAccountListing extends LightningElement {
    @track accounts = [];
    @track filterValue = '';
    @track isLoading = true;

    columns = [
        { label: 'Account Name', fieldName: 'Name', type: 'url', 
          typeAttributes: { label: { fieldName: 'Name' }, target: '_blank', href: { fieldName: 'recordLink' } } },
        { label: 'Account Owner', fieldName: 'OwnerName', type: 'text' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' },
        { label: 'Website', fieldName: 'Website', type: 'url', 
          typeAttributes: { label: { fieldName: 'Website' }, target: '_blank' } },
        { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' }
    ];

    // Wire the Apex method to fetch data
    @wire(getAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data.map(account => ({
                ...account,
                recordLink: `/lightning/r/Account/${account.Id}/view` // Simplified string interpolation
            }));
            this.isLoading = false;
        } else if (error) {
            console.error(error);
            this.isLoading = false;
        }
    }

    
    get filteredAccounts() {
        return this.accounts.filter(account =>
            account.Name.toLowerCase().includes(this.filterValue.toLowerCase())
        );
    }


    handleFilterChange(event) {
        this.filterValue = event.target.value;
    }

    // Sort accounts by Account Name
    sortByAccountName() {
        this.accounts.sort((a, b) => a.Name.localeCompare(b.Name));
    }

    // Sort accounts by Account Owner
    sortByAccountOwner() {
        this.accounts.sort((a, b) => a.OwnerName.localeCompare(b.OwnerName));
    }

    
    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
       
    }
}
