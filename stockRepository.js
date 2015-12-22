module.exports = function(connection){
    return {
        findByIsbn: function(isbn){
            return connection
                .then(function (db) {
                    console.log('connection');
                    return db.collection('books');
                })
                .then(function (collection) {
                    console.log('find');
                    return collection.findOne({isbn: isbn});
                });
        },
        updateOne: function(isbn, count){
            return connection
                .then(function (db) {
                    console.log('connection');
                    return db.collection('books');
                })
                .then(function (collection) {
                    console.log('update');
                    return collection.updateOne({isbn: isbn}, {
                        isbn: isbn,
                        count: count
                    }, {upsert: true});
                });
        }
    };
};
