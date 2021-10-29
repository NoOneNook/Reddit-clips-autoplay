import axios from 'axios'

const baseUrl = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET}&grant_type=client_credentials`

const getToken = async () => {
	const res = await axios.post(baseUrl)

	return res.data
}

export default getToken
