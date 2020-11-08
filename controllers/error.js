exports.getError = (req, res, next) => {
        res.status(404)
        .render('error-page', {
            pageTitle: 'Page Not Found!', 
            path: '/error', 
            isAuthenticated: req.session.isLoggedIn
        });
    };

exports.getError500 = (req, res, next) => {
    res.status(500)
    .render('error-500', {
        pageTitle: 'Error!', 
        path: '/error500', 
        isAuthenticated: req.session.isLoggedIn
    });
};