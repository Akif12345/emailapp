'use client'

import { useState, useEffect } from 'react'
import EmailList from './components/EmailList'
import EmailBody from './components/EmailBody'

export default function Home() {
  const [emails, setEmails] = useState([])
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [readEmails, setReadEmails] = useState([])
  const [favoriteEmails, setFavoriteEmails] = useState([])

  useEffect(() => {
    fetchEmails()
    const storedReadEmails = JSON.parse(localStorage.getItem('readEmails') || '[]')
    const storedFavoriteEmails = JSON.parse(localStorage.getItem('favoriteEmails') || '[]')
    setReadEmails(storedReadEmails)
    setFavoriteEmails(storedFavoriteEmails)
  }, [page])

  const fetchEmails = async () => {
    const response = await fetch(`https://flipkart-email-mock.now.sh/?page=${page}`)
    const data = await response.json()
    setEmails(prevEmails => [...prevEmails, ...data.list])
  }

  const handleEmailSelect = (email) => {
    setSelectedEmail(email)
    if (!readEmails.includes(email.id)) {
      const newReadEmails = [...readEmails, email.id]
      setReadEmails(newReadEmails)
      localStorage.setItem('readEmails', JSON.stringify(newReadEmails))
    }
  }

  const handleFilter = (newFilter) => {
    setFilter(newFilter)
  }

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  const handleMarkFavorite = (emailId) => {
    const newFavoriteEmails = favoriteEmails.includes(emailId)
      ? favoriteEmails.filter(id => id !== emailId)
      : [...favoriteEmails, emailId]
    setFavoriteEmails(newFavoriteEmails)
    localStorage.setItem('favoriteEmails', JSON.stringify(newFavoriteEmails))
  }

  return (
    <main className="flex min-h-screen bg-gray-100">
      <div className={`w-full ${selectedEmail ? 'md:w-1/2' : ''} p-4`}>
        <div className="mb-4">
          <button
            className={`mr-2 px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-white'}`}
            onClick={() => handleFilter('all')}
          >
            All
          </button>
          <button
            className={`mr-2 px-4 py-2 rounded ${filter === 'unread' ? 'bg-blue-500 text-white' : 'bg-white'}`}
            onClick={() => handleFilter('unread')}
          >
            Unread
          </button>
          <button
            className={`mr-2 px-4 py-2 rounded ${filter === 'read' ? 'bg-blue-500 text-white' : 'bg-white'}`}
            onClick={() => handleFilter('read')}
          >
            Read
          </button>
          <button
            className={`px-4 py-2 rounded ${filter === 'favorites' ? 'bg-blue-500 text-white' : 'bg-white'}`}
            onClick={() => handleFilter('favorites')}
          >
            Favorites
          </button>
        </div>
        <EmailList
          emails={emails}
          filter={filter}
          onEmailSelect={handleEmailSelect}
          selectedEmail={selectedEmail}
          readEmails={readEmails}
          favoriteEmails={favoriteEmails}
        />
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      </div>
      {selectedEmail && (
        <div className="hidden md:block w-1/2 p-4">
          <EmailBody 
            email={selectedEmail} 
            isFavorite={favoriteEmails.includes(selectedEmail.id)}
            onMarkFavorite={() => handleMarkFavorite(selectedEmail.id)}
          />
        </div>
      )}
    </main>
  )
}

