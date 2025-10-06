"use client"
import React, { useEffect, useState } from 'react'
import DownloadButton from '@/components/common/DownloadButton'

export default function Page() {
  const [boardDocs, setBoardDocs] = useState([])
  const [firstMeetingDocs, setFirstMeetingDocs] = useState([])
  const [publicMeetingDocs, setPublicMeetingDocs] = useState([])

  useEffect(() => {
    const fetchBoardOfStudies = async () => {
      try {
        // Fetch Board_of_studies
        const res1 = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI}/api/autonomous?populate[Board_of_studies][populate]=PDF`
        )
        const data1 = await res1.json()
        if (data1?.data?.Board_of_studies) {
          setBoardDocs(data1.data.Board_of_studies)
        }

        // Fetch board_of_studies_first_meeting
        const res2 = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI}/api/autonomous?populate[board_of_studies_first_meeting][populate]=file`
        )
        const data2 = await res2.json()
        if (data2?.data?.board_of_studies_first_meeting) {
          setFirstMeetingDocs(data2.data.board_of_studies_first_meeting)
        }
      } catch (error) {
        console.error("Error fetching Board of Studies documents:", error)
      }
    }

    // Load public folder documents
    const loadPublicDocs = () => {
      // Define your public folder files here
      const docs = [
        { id: 1, title: "Basic Science and Humanities", url: "/bos2/BS2.pdf" },
        { id: 2, title: "Civil Engineering", url: "/bos2/CE 2.pdf" },
        { id: 3, title: "Computer Science and Engineering", url: "/bos2/CS 2.pdf" },
        { id: 4, title: "Electrical And Electronics Engineering", url: "bos2/EE 2.pdf" },
        { id: 5, title: "Electrical and Computer Engineering", url: "/bos2/ER 2.pdf" },
        { id: 6, title: "Food Technology", url: "/bos2/FT 2.pdf" },
        { id: 7, title: "Mechanical Engineering", url: "/bos2/ME 2.pdf" },
        { id: 8, title: "Electronics and Communication Engineering", url: "/bos2/ECE 2.pdf" },
        { id: 9, title: "Bio-Technology Engineering", url: "/bos2/BT 2.pdf" },
      ]
      setPublicMeetingDocs(docs)
    }

    fetchBoardOfStudies()
    loadPublicDocs()
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

      <h3 className='page_heading2'>Board of Studies First Meeting Minutes</h3>
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

      <h3 className='page_heading2'>Board of StudiesSecond  Meeting Minutes </h3>
      <div>
        {publicMeetingDocs.map((doc) => (
          <DownloadButton
            key={doc.id}
            title={doc.title}
            link={doc.url}
          />
        ))}
      </div>
    </div>
  )
}