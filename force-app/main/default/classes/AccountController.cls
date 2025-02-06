public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name, Owner.Name, Phone, Website, AnnualRevenue 
                FROM Account 
                WHERE Industry = 'Financial Services'];
    }
}