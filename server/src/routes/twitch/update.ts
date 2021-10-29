import express from 'express'
import saveCategories from '../../services/twitch/categorySave'
import { saveAvatar, saveStreams } from '../../services/twitch/channelSave'

import getToken from '../../services/twitch/token'

const router = express.Router()

router.get('/channel', async (_, res) => {
	const token = await getToken()
	const streams = await saveStreams(token)
	let after = streams.pagination.cursor

	const streamsLoop = async () => {
		if (after) {
			const newStreams = await saveStreams(token, after)

			after = newStreams.pagination.cursor

			if (newStreams.data[0].viewer_count > 100) {
				streamsLoop()
			}
		}
	}
	streamsLoop()

	res.send(streams)
})

router.get('/avatar', async (_, res) => {
	const token = await getToken()

	const channels = await saveAvatar(token)

	res.send(channels)
})

router.get('/category', async (_, res) => {
	const token = await getToken()
	const categories = await saveCategories(token)
	let after = categories.pagination.cursor

	const categoriesLoop = async () => {
		if (after) {
			const newCategories = await saveCategories(token, after)

			after = newCategories.pagination.cursor

			if (after) {
				categoriesLoop()
			}
		}
	}
	categoriesLoop()

	res.send(categories)
})

export default router
