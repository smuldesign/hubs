const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: "accessKeyId HERE",
  secretAccessKey: "secretAccessKey HERE!",
  region: "region HERE"
});

export class awsSesRegistration {
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
  async getVerifiedEmails() {
    const params = {
      IdentityType: "EmailAddress"
    };
    return new AWS.SES({ apiVersion: "2010-12-01" }).listIdentities(params).promise();
  }
}
