import React from 'react'
import DownloadButton from '@/components/common/DownloadButton'

export default function page() {

  const pdfDocuments = [
    {
      title: "Institution Budget",
      link: "/assets/documents/autonomous/audits/Institutional-Budget.pdf"
    },
    {
      title: "Audit Statement 2022-2023",
      link: "/assets/documents/autonomous/audits/Audit-Report-22-23.pdf"
    },
    {
      title: "Audit Statements 2021-2022",
      link: "/assets/documents/autonomous/audits/Audit-Report-2021-22.pdf"
    },
    {
      title: "Audit Statements 2020-2021",
      link: "/assets/documents/autonomous/audits/Audit-Report-2021-22.pdf"
    },
    {
      title: "Audit Statements 2019-2020",
      link: "/assets/documents/autonomous/audits/19-20.pdf"
    },
      {
      title: "Audit Statements 2018-2019",
      link: "/assets/documents/autonomous/audits/audit-statement-2019.pdf"
    },
      {
      title: "Audit Statements 2017-2018",
      link: "/assets/documents/autonomous/audits/audit-statement-2019 (1).pdf"
    },
     {
      title: "Audit Statements 2016-2017",
      link: "/assets/documents/autonomous/audits/Audited-Statement-2016-17.pdf"
    }
  ]
        
  return (
    <div className='page'>
      <h3 className='page_heading'>Academic Council</h3>

      <div>
        {
          pdfDocuments.map((document, index) => {
            return (
              <DownloadButton key={index} title={document.title} link={document.link} />
            )
          })
        }
      </div>
    </div>
  )
}
