import express from 'express'
import { parseTwitchQuery } from '../../common/queryParsing'
import { parseTwitchClips } from '../../common/twitchClipsParsing'
import { channelIncreaseRanking } from '../../database/queries/twitchAutoComplete'
import getChannel from '../../services/twitch/channel'
import getClips from '../../services/twitch/clips'
import getToken from '../../services/twitch/token'

const router = express.Router()

router.get('/:id', async (req, res) => {
	const query = parseTwitchQuery(req)

	const token = await getToken()
	const channel = await getChannel(token, req.params.id)
	const clips = await getClips(token, channel, undefined, query)
	const parsedClips = parseTwitchClips(clips)
	await channelIncreaseRanking(channel)

	res.send(parsedClips)
})

router.get('/:id/shuffle', async (req, res) => {
	const query = parseTwitchQuery(req)
	const token = await getToken()
	const channel = await getChannel(token, req.params.id)
	let clips = await getClips(token, channel, undefined, query, 100)
	let after = clips.pagination.cursor

	const clipsLoop = async () => {
		if (after) {
			const newClips = await getClips(token, channel, undefined, `&after=${after}`, 100)

			after = newClips.pagination.cursor
			clips.pagination.cursor = after
			clips.data = clips.data.concat(newClips.data)

			if (after && clips.data.length < 150) {
				await clipsLoop()
			}
		}
	}

	await clipsLoop()

	const parsedClips = parseTwitchClips(clips)
	await channelIncreaseRanking(channel)

	res.send(parsedClips)
})

export default router
