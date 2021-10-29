import React, { createContext, useContext, useReducer } from 'react'
import { apiTimePeriod, searchType, sortType } from 'src/types/search'
import { Action, State } from 'src/types/state'

const initialState: State = {
	clips: {
		data: [],
		filtered: [],
		pagination: {
			cursor: ''
		}
	},
	currentClip: {
		id: '',
		title: '',
		video_url: '',
		comments_url: '',
		twitch_url: ''
	},
	clipIndex: -1,
	currentSearch: {
		mode: searchType.channel,
		value: '',
		timePeriod: apiTimePeriod.all,
		sort: sortType.hot
	},
	favourites: []
}

export const StateContext = createContext<[State, React.Dispatch<Action>]>([initialState, () => initialState])

type StateProviderProps = {
	reducer: React.Reducer<State, Action>
	children: React.ReactElement
}

export const StateProvider: React.FC<StateProviderProps> = ({ reducer, children }: StateProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return <StateContext.Provider value={[state, dispatch]}>{children}</StateContext.Provider>
}
export const useStateValue = () => useContext(StateContext)
