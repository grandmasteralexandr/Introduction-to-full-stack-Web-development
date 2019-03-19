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
        logs: [],
        // authorization
        auth: function (id, pin) {
            if (this.isAuth) {
                this.writeLog(new Date(), this.currentUser, "You already login");
                return;

            }
            for (let account of this.users) {

                if (account.id !== id) {
                    continue;
                }

                if (account.pin !== pin) {
                    this.writeLog(new Date(), this.currentUser, "Wrong pin");
                    return;
                }

                this.isAuth = true;
                this.currentUser = account;
                this.writeLog(new Date(), this.currentUser, "You successfully login");
                return;
            }

            this.writeLog(new Date(), this.currentUser, "Your account not found")
        },
        // check current debet
        check: function () {
            if (!this.isAuth) {
                this.writeLog(new Date(), this.currentUser, "You are not login");
                return;
            }

            this.writeLog(new Date(), this.currentUser, "Current debet: " + this.currentUser.debet);
        }
        ,
// get cash - available for user only
        getCash: function (amount) {
            if (!this.isAuth) {
                this.writeLog(new Date(), this.currentUser, "You are not login");
                return;
            }

            if (this.currentUser.type !== "user") {
                this.writeLog(new Date(), this.currentUser, "You are not in user role");
                return;
            }

            if (!(amount && amount > 0 && amount == +amount)) {
                this.writeLog(new Date(), this.currentUser, "Input amount");
                return;
            }

            if (this.cash < amount) {
                this.writeLog(new Date(), this.currentUser, "Sorry, not enough money in ATM");
                return;
            }

            if (this.currentUser.debet < amount) {
                this.writeLog(new Date(), this.currentUser, "Not enough money in your account");
                return;
            }

            this.currentUser.debet -= amount;
            this.cash -= amount;
            this.writeLog(new Date(), this.currentUser, "You successfully get your money. Current balance: " + this.currentUser.debet);
        }
        ,
// load cash - available for user only
        loadCash: function (amount) {
            if (!this.isAuth) {
                this.writeLog(new Date(), this.currentUser, "You are not login");
                return;
            }

            if (this.currentUser.type !== "user") {
                this.writeLog(new Date(), this.currentUser, "You are not in user role");
                return;
            }

            if (!(amount && amount > 0 && amount == +amount)) {
                this.writeLog(new Date(), this.currentUser, "Input amount");
                return;
            }

            this.currentUser.debet += amount;
            this.cash += amount;
            this.writeLog(new Date(), this.currentUser, "You successfully put your money. Current balance: " + this.currentUser.debet);
        }
        ,
// load cash to ATM - available for admin only - EXTENDED
        loadAtmCash: function (amount) {
            if (!this.isAuth) {
                this.writeLog(new Date(), this.currentUser, "You are not login");
                return;
            }

            if (this.currentUser.type !== "admin") {
                this.writeLog(new Date(), this.currentUser, "You are not in admin role");
                return;
            }

            if (!(amount && amount > 0 && amount == +amount)) {
                this.writeLog(new Date(), this.currentUser, "Input amount");
                return;
            }

            this.cash += amount;
            this.writeLog(new Date(), this.currentUser, "You successfully put your money. Current balance in ATM: " + this.cash);
        }
        ,
// get cash actions logs - available for admin only - EXTENDED
        getLogs: function () {
            for (let log of this.logs) {
                console.log(log.date + " " + (log.user ? log.user.id : "") + " " + log.message + "\n");
            }
        }
        ,
// log out
        logout: function () {
            if (!this.isAuth) {
                this.writeLog(new Date(), this.currentUser, "You are already not login");
            }

            if (this.currentUser !== null) {
                this.writeLog(new Date(), this.currentUser, "You are successfully log out");
            }

            this.isAuth = false;
            this.currentUser = null;
        }
        ,

//write log
        writeLog: function (date, user, message) {
            this.logs.push({date: date, user: user, message: message});
            console.log(message);
        }
    }
;
