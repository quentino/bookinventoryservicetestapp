var _ = require('lodash');

module.exports = function () {

    var books = [];
    return {
        findByIsbn: function(isbn){

        },
        updateOne: function(isbn, count){
            var item = this._findItem(isbn);
            if (item) {
                item.count = count;
            } else {
                books.push({isbn: isbn, count: count});
            }
            return Promise.resolve();
        }
    }
};
