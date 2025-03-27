import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'

interface Book {
	id: string
	title: string
	author: string
	available: boolean
}

export default function BookDetails() {
	const router = useRouter()
	const { id } = router.query
	const [book, setBook] = useState<Book | null>(null)

	console.log('book', book)

	useEffect(() => {
		if (!id) return
		fetch(`/api/books/${id}`)
			.then(res => res.json())
			.then(data => setBook(data))
	}, [id])

	const toggleAvailability = () => {
		fetch(`/api/books/${id}`, { method: 'PUT' })
			.then(res => res.json())
			.then(data => setBook(data))
	}

	if (!book) return <p>Loading...</p>

	return (
		<Layout>
			<div>
				<h2 className='text-2xl font-bold mb-4'>{book.title}</h2>
				<p>{book.author}</p>
				<p className={book.available ? 'text-green-500' : 'text-red-500'}>
					{book.available ? 'Available' : 'Checked Out'}
				</p>
				<button
					onClick={toggleAvailability}
					className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'
				>
					{book.available ? 'Borrow' : 'Return'}
				</button>
			</div>
		</Layout>
	)
}
