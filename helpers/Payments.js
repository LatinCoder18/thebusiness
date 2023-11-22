const { Client, Environment, ApiError } = require("square");
require('dotenv').config();


class SquarePayments {
    constructor() {
        this.client = new Client({
            accessToken: "EAAAEDz5Q0Twpg4XNNdxlWnnCDWoLPJJ2Az5E4Y937gUfJwL3MS4iYJmsL6iMK86",
            environment: Environment.Sandbox,
        });
    }


    async getLocations() {
        try {
            let listLocationsResponse = await locationsApi.listLocations();

            let locations = listLocationsResponse.result.locations;

            locations.forEach(function (location) {
                console.log(
                    location.id + ": " +
                    location.name + ", " +
                    location.address.addressLine1 + ", " +
                    location.address.locality
                );
            });
        } catch (error) {
            if (error instanceof ApiError) {
                error.result.errors.forEach(function (e) {
                    console.log(e.category);
                    console.log(e.code);
                    console.log(e.detail);
                });
            } else {
                console.log("Unexpected error occurred: ", error);
            }
        }
    }
    /**
     * 
     * @param {*} nonce 
     * @param {*} data 
     */
    async createPayment(data) {
        const { cnon, idempodencyKey, amount, description, fee } = data;
        const Data = {
            sourceId: cnon,
            idempotencyKey: idempodencyKey,
            amountMoney: {
                amount: amount, // $1.00 charge
                currency: 'USD'
            },
            appFeeMoney: {
                amount: fee,
                currency: 'USD'
            },
            autocomplete: false,
            referenceId: '123456',
            note: description
        }
        try {
            const response = await this.client.paymentsApi.createPayment(Data);
            return response;
        } catch (error) {
            console.log(error);
            return error;
        }

    }
    async confirmPayment() {
        try {
            const response = await client.paymentsApi.completePayment('bP9mAsEMYPUGjjGNaNO5ZDVyLhSZY',
                {});

            console.log(response.result);
        } catch (error) {
            console.log(error);
        }
    }
    async cancelPayment() {
        try {
            const response = await client.paymentsApi.cancelPaymentByIdempotencyKey({
                idempotencyKey: 'a7e36d40-d24b-11e8-b568-0800200c9a66'
            });

            console.log(response.result);
        } catch (error) {
            console.log(error);
        }
    }
}
// const main = async () => {
//     const Sqpay = new SquarePayments();
//     await Sqpay.getLocations();
// }

module.exports = SquarePayments;
