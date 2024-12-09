import { useState, useEffect } from 'react'

const EmailList = ({ emails, filter, onEmailSelect, selectedEmail, readEmails, favoriteEmails }) => {
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

  const filteredEmails = emails.filter(email => {
    if (filter === 'unread') return !readEmails.includes(email.id)
    if (filter === 'read') return readEmails.includes(email.id)
    if (filter === 'favorites') return favoriteEmails.includes(email.id)
    return true
  })

  return (
    <div className="space-y-4">
      {filteredEmails.map(email => (
        <div
          key={email.id}
          className={`p-4 bg-white rounded-lg cursor-pointer ${
            selectedEmail && selectedEmail.id === email.id ? 'border-2 border-blue-500' : ''
          } ${readEmails.includes(email.id) ? 'bg-gray-100' : ''}`}
          onClick={() => onEmailSelect(email)}
        >
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-4">
              {email.from.name.split(' ')[0][0].toUpperCase()}
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">{email.from.name}</h3>
                <div className="flex items-center">
                  {favoriteEmails.includes(email.id) && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500 mr-2">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  )}
                  <p className="text-xs text-gray-500">{formatDate(email.date)}</p>
                </div>
              </div>
              <p className="font-semibold">{email.subject}</p>
              <p className="text-sm text-gray-600 truncate">{email.short_description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default EmailList

