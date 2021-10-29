import Mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const twitchChannelAutoCompleteSchema = new Mongoose.Schema({
	id: Number,
	name: {
		type: String,
		unique: true,
	},
	rank: Number,
	avatar: String,
})

const twitchCategoryAutoCompleteSchema = new Mongoose.Schema({
	id: {
		type: String,
		unique: true,
	},
	name: String,
	rank: Number,
	avatar: String,
})

twitchChannelAutoCompleteSchema.plugin(uniqueValidator)
twitchCategoryAutoCompleteSchema.plugin(uniqueValidator)

export const TwitchChannelAutoComplete = Mongoose.model(
	'twitchChannelAutoComplete',
	twitchChannelAutoCompleteSchema
)
export const TwitchCategoryAutoComplete = Mongoose.model(
	'twitchCategoryAutoComplete',
	twitchCategoryAutoCompleteSchema
)
