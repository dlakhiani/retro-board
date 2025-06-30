import { Doc } from 'yjs'
import { WebsocketProvider } from 'y-websocket'

export const ydoc = new Doc()

export const provider = new WebsocketProvider(
	'ws://localhost:1234',
	'retro-board-room-1111',
	ydoc
)
provider.on('status', event => {
	console.log(event.status)
})
provider.on('connection-close', () => {
	console.log('done')
	provider.destroy()
})

export const yColumns = ydoc.getArray('columns')
