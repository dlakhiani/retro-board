import { Doc } from 'yjs'
import { WebsocketProvider } from 'y-websocket'

export const ydoc = new Doc()

export const provider = new WebsocketProvider(
	'ws://localhost:1234',
	'retro-board-room',
	ydoc
)
provider.on('status', event => {
	console.log(event.status)
})

export const yColumns = ydoc.getArray('columns')
