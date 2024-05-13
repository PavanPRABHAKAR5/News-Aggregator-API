const express = require('express')
const port = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const registerRoute = require("./routes/Register");
const loginRoute = require("./routes/Login")
const preferencesRoute = require('./routes/Preferences')
const newsRoute = require('./routes/News')



app.use('/users/signup', registerRoute);
app.use('/users/login', loginRoute )
app.use('/users/preferences', preferencesRoute)
app.use('/news', newsRoute)

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;