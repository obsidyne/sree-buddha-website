"use client"
import React, { useEffect, useState } from 'react'
import DownloadButton from '@/components/common/DownloadButton'

export default function Page() {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI}/api/autonomous?populate[Academic_council][populate]=PDF`)
        const data = await res.json()

        if (data?.data?.Academic_council) {
          setDocuments(data.data.Academic_council)
        }
      } catch (error) {
        console.error("Error fetching Academic Council documents:", error)
      }
    }

    fetchDocuments()
  }, [])

  return (
    <div className='page'>
      <h3 className='page_heading'>Academic Council</h3>

      <div>
        {documents.map((doc) => (
          <DownloadButton
            key={doc.id}
            title={doc.Tittle}
            // prepend Strapi base URL to PDF url
            // link={`http://91.99.112.1:1337${doc.PDF?.url}`}
            link={`${process.env.NEXT_PUBLIC_STRAPI}${doc.PDF?.url}`}
          />
        ))}
      </div>
    </div>
  )
}
