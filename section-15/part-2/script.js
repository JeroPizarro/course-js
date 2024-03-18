(function () {
  //Private properties - use it for encapsulation (hiding data, blackbox).
  //Underscore convention
  class Wallet {
    constructor() {
      this._balance = 0;
      this._transactions = [];
    }

    deposit(amount) {
      this._balance += amount;
      this._transactionsProcess('Deposit', amount);
    }

    withdraw(amount) {
      if (this._balance > amount) {
        this._balance -= amount;
        this._transactionsProcess('Withdraw', amount);
      } else {
        console.log('Insufficient funds.');
      }
    }

    get balance() {
      return this._balance;
    }

    get transactions() {
      return this._transactions;
    }

    _transactionsProcess(type, amount) {
      console.log(`Process: ${type}, amount ${amount}.`);

      this._transactions.push({
        type,
        amount,
      });
    }

    showTransactions() {
      this._transactions.forEach((transaction) => {
        console.log(transaction);
      });
    }

    showBalance() {
      console.log(`Balance: ${this.balance}`);
    }
  }

  const wallet = new Wallet();
  wallet.deposit(300);
  wallet.withdraw(50);
  wallet.withdraw(20);
  wallet.withdraw(5);
  wallet.showBalance();
  wallet.showTransactions();

  //Class Private fields
  class WalletBis {
    #balance = 0;
    #transactions = [];
    #test = null;

    constructor(value) {
      this.#test = value;
    }

    get balance() {
      return this.#balance;
    }

    get transactions() {
      return this.#transactions;
    }

    get test() {
      return this.#test;
    }

    showTransactions() {
      this.#transactions.forEach((transaction) => {
        console.log(transaction);
      });
    }

    showBalance() {
      console.log(`Balance Bis: ${this.balance}`);
    }

    deposit(amount) {
      this.#balance += amount;
      this.#transactionsProcess('Deposit Bis', amount);
    }

    withdraw(amount) {
      if (this.#balance > amount) {
        this.#balance -= amount;
        this.#transactionsProcess('Withdraw Bis', amount);
      } else {
        console.log('Insufficient funds.');
      }
    }

    #transactionsProcess(type, amount) {
      console.log(`Process: ${type}, amount ${amount}.`);

      this.#transactions.push({
        type,
        amount,
      });
    }
  }

  const walletBis = new WalletBis('test');
  walletBis.deposit(227);
  walletBis.withdraw(3 * 4 * 2);
  walletBis.showTransactions();
  walletBis.showBalance();
  console.log(walletBis.test);

  //Propety flags and descriptors

  //[[Configurable]] - if true, prop can be deleted and these atr can be modified
  //[[Enumerable]] - if true, prop can be returned in a 'for...in' loop
  //[[Writable]] - if true, the prop value can be changed
  //[[Value]] - value of prop

  let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');
  console.log(descriptor);

  const rectObj = {
    name: 'Rectangle 1',
    width: 23,
    height: 11,
  };

  Object.defineProperties(rectObj, {
    name: {
      writable: false,
      configurable: false,
      enumerable: false,
    },
    width: {
      writable: false,
      configurable: false,
      enumerable: false,
    },
    height: {
      writable: false,
      configurable: false,
      enumerable: false,
    },
  });

  descriptor = Object.getOwnPropertyDescriptors(rectObj);

  console.log(descriptor);

  //Sealing objs or properties - Prevent props from being added or removes. Can still be changed

  const circleObj = {
    name: 'Circle One',
    radius: 68,
  };

  Object.seal(circleObj);

  circleObj.color = 'red';

  descriptor = Object.getOwnPropertyDescriptors(circleObj);

  console.log('Sealed obj', descriptor, Object.isSealed(circleObj));

  //Freezing objs or properties - Prevents props from being added, removed, changed

  const triangleObj = {
    name: 'Triangle One',
    sideOne: 10,
    sideTwo: 10,
    sideThree: 10,
  };

  Object.freeze(triangleObj);
  //If we freeze any obj is also sealed at same time. 
  
  triangleObj.sideOne = 20;
  delete triangleObj.name;

  descriptor = Object.getOwnPropertyDescriptors(triangleObj);

  console.log('Frozen obj', descriptor, Object.isFrozen(triangleObj));
})();
