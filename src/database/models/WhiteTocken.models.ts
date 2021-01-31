import { Schema, model } from 'mongoose'

const schema = new Schema({
  user_id: { type: String, required: true, unique: true },
  token: { type: String, unique: true },
  date: { type: Date, default: Date.now },
})

export const WhiteTokensModel = model('WhiteTokens', schema)
