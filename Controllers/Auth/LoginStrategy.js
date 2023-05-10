const iLogin = require("./iLogin");


module.exports = class LoginStrategy { 

    constructor (logMein) {
        if ( ! logMein instanceof iLogin ){
            throw new Error ('This class only takes an instanceof iLogin interface !');
        }
        else {
            this.login = logMein.login;
        }
    }

    execute () {
       return this.login(); // return the User Object from the login 
    }

}
