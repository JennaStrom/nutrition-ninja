const express = require('express');
const axios = require('axios');
const path = require('path')
// const fetch = require('node-fetch')
const sequelize = require('./config/connection');
const routes = require('./controllers');
const session = require('express-session');
const exphps = require('express-handlebars')
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;
console.log(PORT)
console.log(app)
const sess = {
  secret: 'Super sign',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};




app.use(session(sess));
const hbs = exphps.create()
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))




app.use(routes);
app.listen(PORT, () => {
  sequelize.sync({ force: false })
  console.log('Now listening')
})

