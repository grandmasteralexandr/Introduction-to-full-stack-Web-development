const ATM = {
        isAuth: false,
        currentUser: null,
        // all cash available in ATM
        cash: 2000,
        // all available users
        users: [
            {id: "0000", pin: "000", debet: 0, type: "admin"}, // EXTENDED
            {id: "0025", pin: "123", debet: 5675, type: "user"}
        ],
        // authorization
        auth: function (id, pin) {
            console.log(this.isAuth, this);
            if (this.isAuth) {
                console.log("You already login");
                return;

            }
            for (let account of this.users) {


                if (account.id !== id) {
                    continue;
                }

                if (account.pin !== pin) {
                    console.log("Wrong pin");
                    return;
                }

                this.isAuth = true;
                this.currentUser = account;
                console.log("You successfully login");
                return;
            }

            console.log("Your account not found")
        },
        // check current debet
        check: function () {
            if (!this.isAuth) {
                console.log("You are not login");
                return;
            }

            console.log("Current debet: " + this.currentUser.debet);
        }
        ,
// get cash - available for user only
        getCash: function (amount) {
            if (!this.isAuth) {
                console.log("You are not login");
                return;
            }

            if (this.currentUser.type !== "user") {
                console.log("You are not in user role");
                return;
            }

            if (!(amount && amount > 0 && amount == +amount)) {
                console.log("Input amount");
                return;
            }

            if (this.cash < amount) {
                console.log("Sorry, not enough money in ATM");
                return;
            }

            if (this.currentUser.debet < amount) {
                console.log("Not enough money in your account");
                return;
            }

            this.currentUser.debet -= amount;
            this.cash -= amount;
            console.log("You successfully get your money. Current balance: " + this.currentUser.debet);
        }
        ,
// load cash - available for user only
        loadCash: function (amount) {
            if (!this.isAuth) {
                console.log("You are not login");
                return;
            }

            if (this.currentUser.type !== "user") {
                console.log("You are not in user role");
                return;
            }

            if (!(amount && amount > 0 && amount == +amount)) {
                console.log("Input amount");
                return;
            }

            this.currentUser.debet += amount;
            this.cash += amount;
            console.log("You successfully put your money. Current balance: " + this.currentUser.debet);
        }
        ,
// load cash to ATM - available for admin only - EXTENDED
        loadAtmCash: function (amount) {
            if (!this.isAuth) {
                console.log("You are not login");
                return;
            }

            if (this.currentUser.type !== "admin") {
                console.log("You are not in admin role");
                return;
            }

            if (!(amount && amount > 0 && amount == +amount)) {
                console.log("Input amount");
                return;
            }

            this.cash += amount;
            console.log("You successfully put your money. Current balance in ATM: " + this.cash);
        }
        ,
// get cash actions logs - available for admin only - EXTENDED
        getLogs: function () {

        }
        ,
// log out
        logout: function () {
            if (!this.isAuth) {
                console.log("You are already not login");
            }

            if (this.currentUser !== null) {
                console.log("You are successfully log out");
            }

            this.isAuth = false;
            this.currentUser = null;
        }
    }
;
