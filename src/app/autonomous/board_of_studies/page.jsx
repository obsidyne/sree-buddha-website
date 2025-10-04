"use client"
import React, { useEffect, useState } from 'react'
import DownloadButton from '@/components/common/DownloadButton'

export default function Page() {
  const [boardDocs, setBoardDocs] = useState([])
  const [firstMeetingDocs, setFirstMeetingDocs] = useState([])

  useEffect(() => {
    const fetchBoardOfStudies = async () => {
      try {
        // Fetch Board_of_studies
        const res1 = await fetch(
          "http://91.99.112.1:1337/api/autonomous?populate[Board_of_studies][populate]=PDF"
        )
        const data1 = await res1.json()
        if (data1?.data?.Board_of_studies) {
          setBoardDocs(data1.data.Board_of_studies)
        }

        // Fetch board_of_studies_first_meeting
        const res2 = await fetch(
          "http://91.99.112.1:1337/api/autonomous?populate[board_of_studies_first_meeting][populate]=file"
        )
        const data2 = await res2.json()
        if (data2?.data?.board_of_studies_first_meeting) {
          setFirstMeetingDocs(data2.data.board_of_studies_first_meeting)
        }
      } catch (error) {
        console.error("Error fetching Board of Studies documents:", error)
      }
    }

    fetchBoardOfStudies()
  }, [])

  return (
    <div className='page'>
      <h3 className='page_heading'>Board of Studies Constitution</h3>
      <div>
        {boardDocs.map((doc) => (
          <DownloadButton
            key={doc.id}
            title={doc.Tittle}
            link={`${process.env.NEXT_PUBLIC_STRAPI}${doc.PDF?.url}`}
          />
        ))}
      </div>

      <h3 className='page_heading2'>Board of Studies First Meeting minutes</h3>
      <div>
        {firstMeetingDocs.map((doc) =>
          doc.file?.map((f) => (
            <DownloadButton
              key={f.id}
              title={doc.title}
              link={`${process.env.NEXT_PUBLIC_STRAPI}${f.url}`}
            />
          ))
        )}
      </div>
    </div>
  )
}
