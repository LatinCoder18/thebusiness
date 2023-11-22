// Helping Prisma Understanding BigInt
class PrismaHelper{

    constructor() {
    }
    /**
     * 
     * @param object 
     * @returns object con los campos de tipo BigInt convertidos a string
     */
     static objectBigIntToInt(Object){
        return JSON.parse(JSON.stringify(Object, (key, value) =>
            typeof value === 'bigint'
                ? parseInt(value.toString())
                : value 
        ));
    }
}
module.exports = PrismaHelper;