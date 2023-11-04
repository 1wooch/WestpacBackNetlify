const fs = require('fs');
// const loginFile=require('../Data/customer.json');
// const userDetailFile = require('../Data/Account.json');
const path = require('path');


// const customersData = JSON.parse(fs.readFileSync('./Data/customer.json', 'utf8'));
// const customersDetailData = JSON.parse(fs.readFileSync('./Data/Account.json', 'utf8'));

// Function to read JSON data from a file
function readJsonFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}
const customersData={
    "customers": [
      {
        "customerID": 1,
        "Name": "John Doe",
        "email":"JohnDoe@gmail.com",
        "Password": "password123"
      },
      {
        "customerID": 2,
        "Name": "Jane Smith",
        "email":"Jane123@gmail.com",
        "Password": "securepass"
      },
      {
        "customerID": 3,
        "Name": "Alice Johnson",
        "email":"Alice@gmail.com",
        "Password": "myp@ssw0rd"
      }
    ]
  }
  ;
const customersDetailData={
    "accounts": [
      {
        "customerID": 1,
        "AccountNumber": "ACCT1001",
        "LoyaltyPoint": 500
      },
      {
        "customerID": 2,
        "AccountNumber": "ACCT2001",
        "LoyaltyPoint": 750
      },
      {
        "customerID": 3,
        "AccountNumber": "ACCT3001",
        "LoyaltyPoint": 300
      }
    ]
  }
  ;


async function authenticate(email, password) {
    try {    
    const customer = customersData.customers.find(
      (customer) => customer.email == email && customer.Password == password
    );

    if (customer) {
      const customerDetail = customersDetailData.Account.find(
        (customerDetail) => customerDetail.customerID == customer.customerID
      );

      if (customerDetail) {
        return {
          success: true,
          message: 'Login successful',
          customerID: customer.customerID,
          Name: customer.Name,
          AccountName: customerDetail.AccountNumber,
          LoyaltyPoint: customerDetail.LoyaltyPoint,
          email: customer.email
        };
      } else {
        return {
          success: false,
          message: 'Internal server error: Failed to read UserDetail DB.',
        };
      }
    } else {
      return {
        success: false,
        message: 'Invalid username or password',
      };
    }
  } catch (err) {
    return {
      success: false,
      message: `Internal server error: ${err.message}`,
    };
  }
}

module.exports = {
  authenticate,
};
