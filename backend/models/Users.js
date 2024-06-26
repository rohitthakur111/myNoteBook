import mongoose from "mongoose"
const { Schema } = mongoose;

const UserSchema = new Schema({
  name : { type : String, required : true },
  email : { type : String, required : true,unique : true },
  password : { type : String, required : true },
  date : { type : Date, default : Date.now}
});
const UsersModel = mongoose.model('users', UserSchema);
UsersModel.createIndexes();
export default UsersModel;
//export default mongoose.model('users', UserSchema);