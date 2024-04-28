require('dotenv').config();
const { connect } = require('mongoose');

const connection = connect(process.env.dburl)

module.exports = { connection };