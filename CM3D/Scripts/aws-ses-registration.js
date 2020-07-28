const AWS = require("aws-sdk");
AWS.config.loadFromPath("config.json");
AWS.config.update({ region: "us-east-1" });

export class awsSesRegistration {
  constructor() {}
  register(email) {
    // Create promise and SES service object
    const verifyEmailPromise = new AWS.SES({ apiVersion: "2010-12-01" })
      .verifyEmailIdentity({ EmailAddress: email })
      .promise();

    // Handle promise's fulfilled/rejected states
    verifyEmailPromise
      .then(function(data) {
        console.log("Email verification initiated");
      })
      .catch(function(err) {
        console.error(err, err.stack);
      });
  }
  delete(email) {
    const deletePromise = new AWS.SES({ apiVersion: "2010-12-01" }).deleteIdentity({ Identity: email }).promise();

    // Handle promise's fulfilled/rejected states
    deletePromise
      .then(function(data) {
        console.log("Identity Deleted");
      })
      .catch(function(err) {
        console.error(err, err.stack);
      });
  }
  getAllVerified() {
    // Create listIdentities params
    const params = {
      IdentityType: "EmailAddress"
    };

    // Create the promise and SES service object
    const listIDsPromise = new AWS.SES({ apiVersion: "2010-12-01" }).listIdentities(params).promise();

    // Handle promise's fulfilled/rejected states
    listIDsPromise
      .then(function(data) {
        console.log(data.Identities);
      })
      .catch(function(err) {
        console.error(err, err.stack);
      });
  }
  excistInVerified(email) {
    const verifiedEmails = this.getAllVerified();
    for (const verifiedEmail of verifiedEmails) {
      if (verifiedEmail === email) return true;
    }
  }
}
