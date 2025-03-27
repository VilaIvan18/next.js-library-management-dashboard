import { title } from 'process'

/* Given the following array of books, filter out books that are not available and map the remaining ones to a new structure containing only title and author. */
const books = [
	{ title: 'Book A', author: 'Author 1', available: true },
	{ title: 'Book B', author: 'Author 2', available: false },
	{ title: 'Book C', author: 'Author 3', available: true },
]

function getAvailableBooks(
	bookList: { title: string; author: string; available: boolean }[]
): { title: string; author: string }[] {
	const availableBooks = books
		.filter(book => book.available)
		.map(book => ({
			title: book.title,
			author: book.author,
		}))
}

console.log(getAvailableBooks(books))

/* Expected output:
[
    { title: "Book A", author: "Author 1" },
    { title: "Book C", author: "Author 3" }
]
*/

/* Given the following asynchronous function, modify it to correctly handle the resolved value and return "Success: Data Loaded". */
async function fetchData(): Promise<string> {
	return new Promise(resolve => setTimeout(() => resolve('Data Loaded'), 1000))
}

async function fetchDataAsync() {
	try {
		const result = await fetchData()
		return result
	} catch (error) {
		console.log(error)
		throw error
	}
}

fetchDataAsync()
	.then(data => {
		console.log(data)
	})
	.catch(error => {
		console.log(error)
	})

// Modify this function to correctly await fetchData() and return "Success: Data Loaded"
async function handleData(): Promise<string> {
	try {
		const result = await fetchData()
		return result
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
	// Implement the function
}

/* Fix the function so that it correctly extracts values from an object and assigns default values when needed. */
function getUserInfo(user: { name?: string; age?: number }): string {
	const { name = 'Unknown', age = 30 } = user
	return `${name} is ${age} years old.`
}

console.log(getUserInfo({ name: 'Alice' })) // Expected output: "Alice is 30 years old."
console.log(getUserInfo({})) // Expected output: "Unknown is 30 years old."
