import { useState, useEffect, useCallback } from 'react'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'

interface Book {
	id: string
	title: string
	author: string
	available: boolean
}

const restrictedAuthors = ['restricted-author']

export default function BooksList() {
	const [books, setBooks] = useState<Book[]>([])
	const [filter, setFilter] = useState('')
	const [availability, setAvailability] = useState<boolean | null>(null)
	const router = useRouter()

	console.log('books', books)
	useEffect(() => {
		fetch('/api/books')
			.then(res => res.json())
			.then(data => setBooks(data))
	}, [])

	const filteredBooks = useCallback(() => {
		return books.filter(book => {
			const matchesAuthor = book.author
				.toLowerCase()
				.includes(filter.toLowerCase())
			const matchesAvailability =
				availability !== null ? book.available === availability : true
			return matchesAuthor && matchesAvailability
		})
	}, [books, filter, availability])

	const handleViewDetails = (bookId: string, author: string) => {
		if (restrictedAuthors.includes(author)) {
			router.push('/books')
		} else {
			router.push(`/books/${bookId}`)
		}
	}

	return (
		<Layout>
			<div>
				<h2 className='text-2xl font-bold mb-4'>Books List</h2>
				<input
					type='text'
					placeholder='Filter by author'
					className='border p-2 mb-4'
					onChange={e => setFilter(e.target.value)}
				/>
				<ul className='space-y-4'>
					{filteredBooks().map(book => (
						<li key={book.id} className='border p-4 rounded bg-white'>
							<h3 className='text-xl'>{book.title}</h3>
							<p>{book.author}</p>
							<p className={book.available ? 'text-green-500' : 'text-red-500'}>
								{book.available ? 'Available' : 'Checked Out'}
							</p>
							<button
								className='text-blue-500 underline'
								onClick={() => {
									handleViewDetails(book.id, book.author)
								}}
							>
								View Details
							</button>
						</li>
					))}
				</ul>
			</div>
		</Layout>
	)
}
