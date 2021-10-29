import axios from 'axios'
import { apiTimePeriod, searchClips, searchType } from 'src/types/search'
import { AutocompleteObj, ResponseClips } from 'src/types/twitch'

export const getClips = async (search: searchClips, after?: string) => {
	let query
	if (search.mode === searchType.subreddit) {
		query = `${process.env.REACT_APP_API_URI}/api/reddit/${search.mode}/${search.value}?timeperiod=${search.timePeriod}&sort=${search.sort}`
	} else if (search.timePeriod === apiTimePeriod.shuffle) {
		query = `${process.env.REACT_APP_API_URI}/api/twitch/${search.mode}/${search.value}/${search.timePeriod}`
		if (after) query = `${query}?after=${after}`
	} else {
		query = `${process.env.REACT_APP_API_URI}/api/twitch/${search.mode}/${search.value}?timeperiod=${search.timePeriod}`
	}
	if (after && search.timePeriod !== apiTimePeriod.shuffle) query = `${query}&after=${after}`
	try {
		const { data }: { data: ResponseClips } = await axios.get(query)

		return data
	} catch ({ response }) {
		return {
			error: {
				status: response.status,
				message: response.statusText
			}
		}
	}
}

export const getSuggestions = async (searchMode: searchType, query?: string) => {
	if (searchMode !== searchType.livestreamfail) {
		let baseUrl = `${process.env.REACT_APP_API_URI}/api/`
		if (searchMode === searchType.subreddit) baseUrl = `${baseUrl}reddit/suggestions/`
		else baseUrl = `${baseUrl}twitch/suggestions/${searchMode}/`

		if (query) baseUrl = `${baseUrl}${query}`

		const { data }: { data: AutocompleteObj[] } = await axios.get(baseUrl)

		return data
	} else {
		return false
	}
}
