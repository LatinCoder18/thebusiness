const fs = require('fs');

class Translator {
    Translator = null;
    constructor() {
    }
    async getTranslation(key) {
        const lang = fs.readFileSync('../lang/' + this.lang + '.json');
        return lang[key];
    }
    static getInstance() {
        if (this.Translator == null) {
            this.Translator = new Translator();
            /**
             * Load the language files
             */
            return this.Translator;
        } else {
            return this.Translator;
        }
    }
    
}
module.exports = Translator;