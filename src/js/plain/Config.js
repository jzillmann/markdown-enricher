export default class Config {

    constructor(options) {
        this.title = options.title;
        this.type = options.type;
        this.source = options.source;
        this.tags = options.tags || "";
    }
}