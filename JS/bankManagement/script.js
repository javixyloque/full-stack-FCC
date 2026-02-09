class BankAccount {
    constructor(name, balance) {
        this.balance = 0;
        this.transactions = [];
    }

    deposit (amount) {
        if (amount>0) {
            this.balance += amount;
            this.transactions.push({
                amount: amount, 
                type: "deposit"
            });
            return `Successfully deposited $${amount}. New balance: $${this.balance}`;
        } else {
            return "Deposit amount must be greater than zero.";
        }
    }

    withdraw (amount) {
        if (amount<=0 || amount > this.balance) {
            return "Insufficient balance or invalid amount.";
        } else {
            this.balance -= amount;
            this.transactions.push({
                amount: amount, 
                type: "withdraw"
            });
            return `Successfully withdrew $${amount}. New balance: $${this.balance}`;
        }
    }

    checkBalance () {
        return `Current balance: $${this.balance}`
    }

    listAllDeposits() {
        let string = "Deposits: "
        let first = true;
        for (let transaction of this.transactions) {
            if (transaction.type === "deposit" && first) {
                string+= `${transaction.amount},`
                first = false;
            } else if (transaction.type === "deposit") {
                string+= `${transaction.amount},`
            }
        }
        return string.slice(0, -1);
    }

    listAllWithdrawals() {
        let string = "Withdrawals: "
        let first = true;
        for (let transaction of this.transactions) {
            if (transaction.type === "withdraw" && first) {
                string+= `${transaction.amount},`
                first = false;
            } else if (transaction.type === "withdraw") {
                string+= `${transaction.amount},`
            }
        }
        return string.slice(0, -1);
    }


}


let bankAccount = new BankAccount();

bankAccount.deposit(1000);
bankAccount.withdraw(500);
bankAccount.deposit(200);
bankAccount.withdraw(100);
bankAccount.deposit(6000);
bankAccount.withdraw(500);
console.log(
bankAccount.listAllDeposits())
console.log(
bankAccount.listAllWithdrawals())
bankAccount.listAllDeposits();
bankAccount.listAllWithdrawals();