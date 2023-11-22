class Translator{
    constructor(lang){
        this.lang = lang;
    }
    translate(key){
        return this.lang[key];
    }
}
module.exports = Translator;