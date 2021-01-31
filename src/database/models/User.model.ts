import { Schema, model } from 'mongoose'

const schema = new Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  id_type: { type: String, required: true },
  date: { type: Date, default: Date.now },
})

export const UserModel = model('User', schema)
