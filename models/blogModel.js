const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
  title:String,
  summary:String,
  content:String,
  author:{type:Schema.Types.ObjectId, ref:'User'},
}, {
  timestamps: true,
});

module.exports = mongoose.model('Blog', blogSchema)