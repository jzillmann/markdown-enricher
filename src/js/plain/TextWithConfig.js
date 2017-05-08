import Config from './Config.js';

export default class TextWithConfig {

    constructor(text:String, config:Config) {
        this.text = text;
        this.config = config;
    }
}