"use client"
import React, { useEffect, useState } from 'react'
import DownloadButton from '@/components/common/DownloadButton'

export default function Page() {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    const fetchFinanceDocuments = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI}/api/autonomous?populate[Finance][populate]=PDF`
        )
        const data = await res.json()

        if (data?.data?.Finance) {
          setDocuments(data.data.Finance)
        }
      } catch (error) {
        console.error("Error fetching Finance documents:", error)
      }
    }

    fetchFinanceDocuments()
  }, [])

  return (
    <div className='page'>
      <h3 className='page_heading'>Finance Commitee</h3>

      <div>
        {documents.map((doc) => (
          <DownloadButton
            key={doc.id}
            title={doc.Tittle}
            // prepend Strapi base URL to PDF url
            link={`${process.env.NEXT_PUBLIC_STRAPI}${doc.PDF?.url}`}
          />
        ))}
      </div>
    </div>
  )
}
