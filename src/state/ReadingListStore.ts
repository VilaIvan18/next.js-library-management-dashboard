import { makeAutoObservable } from 'mobx'

interface ReadingListItem {
	id: string
	title: string
	author: string
	read: boolean
	addedAt: number
}

class ReadingListStore {
	readingList: ReadingListItem[] = []
	lastUpdated = Date.now()

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
	}

	async fetchBooks() {
		try {
			const response = await fetch('/api/books')
			if (!response.ok) {
				throw new Error(`error`)
			}
			const data = await response.json()
			this.readingList = data
			this.lastUpdated = Date.now()
		} catch (error) {
			console.error(error)
		}
	}

	addBook(id: string, title: string, author: string) {
		if (!this.readingList.some(book => book.id === id)) {
			this.readingList.push({
				id,
				title,
				author,
				read: false,
				addedAt: Date.now(),
			})
			this.lastUpdated = Date.now()
		}
	}

	removeBook(id: string) {
		this.readingList = this.readingList.filter(book => book.id !== id)
		this.lastUpdated = Date.now()
	}

	markAsRead(id: string) {
		const book = this.readingList.find(book => book.id === id)
		if (book) book.read = true
	}

	get unreadCount() {
		return this.readingList.filter(book => !book.read).length
	}

	get sortedBooks() {
		return [...this.readingList].sort((a, b) => b.addedAt - a.addedAt)
	}
}

export const readingListStore = new ReadingListStore()
