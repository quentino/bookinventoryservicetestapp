module.exports = function(stockRepository){
    return {
        getHome: function(req, res){
            res.send('Hello World!');
        },
        updateOne: function(req, res){
            var isbn = req.body.isbn;
            var count = req.body.count;
            stockRepository.updateOne(isbn, count)
                .then(function (code) {
                        res.json({
                            "isbn": isbn,
                            "count": count
                        });
                    }
                );
        },
        getCountByIsbn: function (req, res) {
            var isbn = req.params.isbn;
            stockRepository.findByIsbn(isbn)
                .then(function (result) {
                    res.send(result.count.toString());
                });
        },
        clientError: function(req, res, next) {
            var err = new Error("NOT FOUND");
            err.status = 404;
            next(err);
        },
        serverError: function(err, req, res, next) {
            res.status(err.status || 500).json({
                message: err.message,
                error: (process.env.NODE_ENV === 'production') ? {} : err
            });
        },
        logRequest: function(req, res, next) {
            console.log('New reuquest logged' + new Date());
            next();
        }
    };
};
