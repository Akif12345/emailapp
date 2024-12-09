import { useState, useEffect } from 'react'

const EmailBody = ({ email, isFavorite, onMarkFavorite }) => {
  const [body, setBody] = useState('')

  useEffect(() => {
    fetchEmailBody()
  }, [email])

  const fetchEmailBody = async () => {
    const response = await fetch(`https://flipkart-email-mock.now.sh/?id=${email.id}`)
    const data = await response.json()
    setBody(data.body)
  }

  const formatDate = (date) => {
    const d = new Date(date)
    return d.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(',', '')
  }

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{email.subject}</h2>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="font-bold">{email.from.name} &lt;{email.from.email}&gt;</p>
          <p className="text-sm text-gray-600">{formatDate(email.date)}</p>
        </div>
        <button
          className={`px-4 py-2 rounded ${
            isFavorite ? 'bg-yellow-500 text-white' : 'bg-gray-200'
          }`}
          onClick={onMarkFavorite}
        >
          {isFavorite ? 'Unmark as Favorite' : 'Mark as Favorite'}
        </button>
      </div>
      <div className="border-t pt-4 mt-4">
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </div>
  )
}

export default EmailBody

