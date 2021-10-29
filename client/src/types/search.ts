export enum searchType {
	channel = 'channel',
	category = 'category',
	subreddit = 'subreddit',
	livestreamfail = 'livestreamfail'
}

export interface searchClips {
	mode: searchType
	value: string
	timePeriod: apiTimePeriod
	sort: sortType
}

export enum apiTimePeriod {
	day = 'day',
	week = 'week',
	month = 'month',
	year = 'year',
	all = 'all',
	shuffle = 'shuffle'
}

export enum sortType {
	new = 'new',
	top = 'top',
	hot = 'hot'
}
