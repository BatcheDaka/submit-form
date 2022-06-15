const express = require('express');
const { check, validationResult } = require('express-validator');

const app = express();
const port = process.env.PORT || 3000;

let users = [];

app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.get('/', function (request, response, next) {
    response.render('home', {
        success: "initial"
    });
});

app.post('/', [
    check('firstName')
        .isLength({ min: 5 }),
    check('lastName')
        .isLength({ min: 5 })], function (request, response, next) {
            const errors = validationResult(request);
            const user = request.body;

            if (errors.isEmpty()) {
                users.push(user);
                response.render('home', {
                    success: "true"
                });
            } else {
                response.status(400).render('home', {
                    success: "false"
                });
            }
        });

app.get('/users', (request, response) => {
    response.json(users);
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
});
