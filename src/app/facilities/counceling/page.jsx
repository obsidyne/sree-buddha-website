import React from 'react';
import { Phone, Mail, Heart, Users, BookOpen, Brain, TrendingUp, Lightbulb, UserCheck, Shield, FileText, Download } from 'lucide-react';

export default function CounsellingPage() {
  const services = [
    {
      icon: <Users className="w-6 h-6 text-yellow-700" />,
      title: "Individual & Group Counselling",
      description: "One-on-one sessions and group support tailored to your needs"
    },
    {
      icon: <BookOpen className="w-6 h-6 text-yellow-700" />,
      title: "Academic & Career Guidance",
      description: "Navigate your academic journey and career path with confidence"
    },
    {
      icon: <Brain className="w-6 h-6 text-yellow-700" />,
      title: "Stress & Anxiety Management",
      description: "Learn effective coping strategies and stress relief techniques"
    },
    {
      icon: <Heart className="w-6 h-6 text-yellow-700" />,
      title: "Personal Growth & Relationships",
      description: "Develop healthier relationships and personal well-being"
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-yellow-700" />,
      title: "Emotional Well-being Workshops",
      description: "Interactive sessions on mental health and emotional intelligence"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-yellow-700" />,
      title: "Life Skills Development",
      description: "Build essential skills for personal and professional success"
    }
  ];

  const iccDocuments = [
    {
      title: "AICTE order on GenderSensitization_june_2016",
      description: "",
      url: "/counselling/AICTE_order_on_GenderSensitization_june_2016.pdf"
    },
    {
      title: "Handbook on Sexual Harassment of Women at Workplace",
      description: "",
      url: "/counselling/Handbook_on_Sexual_Harassment_of_Women_at_Workplace.pdf"
    },
    {
      title: "Sexual Harassment at Workplace Act Gazatte",
      description: "",
      url: "/counselling/Sexual-Harassment-at-Workplace-Act Gazatte.pdf"
    },
    // Add more documents here as needed
  ];

  const iccActivities = [
    {
      title: "March 7 womens day program",
      description: "Workshops, seminars, and awareness programs conducted",
     url: "/counselling/March 7 womens day program.pdf"
    },
    {
      title: "Report on Awareness Seminar",
      description: "Annual gender sensitization program report",
      url: "/counselling/Report on Awareness Seminar.pdf"
    },
    // Add more activity reports here as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="mx-auto px-8 md:px-24 lg:px-36 py-8 max-w-8xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-800 to-amber-600 p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Counselling and Wellness Centre
            </h1>
            <div className="h-1 w-20 bg-white opacity-80 my-4"></div>
            <p className="text-white text-lg opacity-90">
              Supporting your emotional, psychological, and social well-being
            </p>
          </div>

          {/* Main content */}
          <div className="p-6 md:p-8">
            
            {/* Introduction */}
            <div className="mb-10 text-gray-700 text-lg leading-relaxed" style={{ fontSize: '16px' }}>
              <p className="mb-4 text-justify">
                The Counselling and Wellness Centre at our college is dedicated to supporting the emotional,
                psychological, and social well-being of our students. College life brings many exciting
                opportunities along with challenges — from academic pressures and career decisions to personal
                growth and relationship concerns. Our counselling facility provides a safe, confidential, and
                non-judgmental space where students can freely share their thoughts and feelings.
              </p>
              <p className="mb-4 text-justify">
                Our goal is to help every student enhance their resilience, self-understanding, and emotional
                balance, empowering them to thrive both personally and academically.
              </p>
              <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-yellow-700">
                <p className="text-lg font-semibold text-gray-800">
                  All services are free and strictly confidential.
                </p>
              </div>
            </div>

            {/* Services Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6" style={{ color: '#845714' }}>
                Services Offered
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                    <div className="mr-4 bg-amber-50 p-3 rounded-full">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{service.title}</h3>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Counsellor Details Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6" style={{ color: '#845714' }}>
                Details of Counsellor
              </h2>
              
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                  
                  {/* Photo Section */}
                  <div className="flex justify-center items-start">
                    <div className="relative w-48 h-48 rounded-lg overflow-hidden bg-gradient-to-br from-yellow-100 to-amber-100 flex items-center justify-center border-4 border-white shadow-lg">
                      {/* Replace this div with actual image */}
                      {/* <UserCheck className="w-24 h-24 text-yellow-700" /> */}
                      {/* { Uncomment and use this for actual photo: */}
                      <img 
                        src="/counseler.jpg" 
                        alt="Counsellor" 
                        className="object-cover w-full h-full"
                      />
                      
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Dr, Shinudas S.</h3>
                    <p className="text-gray-600 mb-6">Consultant Psychologist</p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="mr-4 bg-amber-50 p-3 rounded-full flex-shrink-0">
                          <Phone className="w-5 h-5 text-yellow-700" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-500 font-medium">Contact Number</p>
                          <p className="text-gray-800 font-semibold">9744296464</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="mr-4 bg-amber-50 p-3 rounded-full flex-shrink-0">
                          <Mail className="w-5 h-5 text-yellow-700" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-500 font-medium">Email Address</p>
                          <p className="text-gray-800 font-semibold break-all">shinudas123@gmail.com</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 bg-amber-50 p-4 rounded-lg border-l-4 border-yellow-700">
                      <p className="text-gray-700 text-sm">
                        Ready to take the first step towards better well-being? Reach out today for a confidential conversation.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-yellow-700 mb-12">
              <h2 className="text-xl font-bold text-gray-800 mb-4" style={{ color: '#845714' }}>
                Why Seek Counselling?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-2"></div>
                      <span>Professional guidance in a safe environment</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-2"></div>
                      <span>Confidential and judgment-free support</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-2"></div>
                      <span>Develop healthy coping mechanisms</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-2"></div>
                      <span>Improve academic performance</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-2"></div>
                      <span>Build stronger relationships</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-2"></div>
                      <span>Enhance overall well-being</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ICC Section */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-yellow-700 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800" style={{ color: '#845714' }}>
                  Internal Complaint Committee (ICC)
                </h2>
              </div>

              {/* Introduction */}
              <div className="mb-8 text-gray-700 leading-relaxed" style={{ fontSize: '16px' }}>
                <p className="mb-4 text-justify">
                  The Internal Complaint Committee (ICC) of Sree Buddha College of Engineering is reconstituted in accordance with the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 and the guidelines of UGC, AICTE, and APJ Abdul Kalam Technological University (KTU).
                </p>
                <p className="mb-4 text-justify">
                  The ICC plays a vital role in ensuring a safe, respectful, and inclusive environment for all students, faculty, and staff members within the institution.
                </p>
              </div>

              {/* Functions */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4" style={{ color: '#845714' }}>
                  Functions of the Internal Complaint Committee
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-justify">Receive and process complaints of sexual harassment from students, faculty, and staff.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-justify">Conduct thorough and impartial investigations into such complaints.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-justify">Maintain confidentiality throughout the complaint and investigation process.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-justify">Recommend appropriate actions and remedies to the college administration based on investigation findings.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-justify">Facilitate conciliation between the complainant and the respondent, if mutually agreed upon.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-justify">Ensure that victims receive necessary support, guidance, and counselling.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-justify">Disseminate information about the ICC's policies and procedures.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-justify">Promote a culture of mutual respect, equality, and gender sensitivity across the campus.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4" style={{ color: '#845714' }}>
                  Responsibilities of the ICC
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4 text-justify">The ICC is entrusted with the following responsibilities:</p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-justify">Receiving and addressing complaints of sexual harassment in a fair and transparent manner.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-justify">Conducting detailed inquiries and recommending suitable disciplinary action.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-justify">Organizing workshops, seminars, and awareness programs on gender sensitization and women's rights.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-justify">Submitting annual reports detailing the number of cases received, resolved, and pending for review.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Mechanism */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4" style={{ color: '#845714' }}>
                  Mechanism of ICC
                </h3>
                <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-yellow-700">
                  <p className="text-gray-700 leading-relaxed break-words text-justify">
                    The ICC functions through a structured mechanism that ensures accessibility, confidentiality, and fairness. Complaints can be submitted in writing to the ICC, either directly or via email <a href="mailto:grievance@sbcemail.in" className="text-yellow-700 font-semibold hover:underline break-all">grievance@sbcemail.in</a>. Upon receipt, the committee initiates a preliminary review, followed by an impartial inquiry. Appropriate actions and preventive measures are recommended to the institution based on the inquiry findings. The ICC also ensures follow-up and support to the complainant throughout the process.
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4" style={{ color: '#845714' }}>
                  Contact
                </h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Dr. Malu Ravi</h4>
                  <p className="text-gray-600 mb-1">Presiding Officer</p>
                  <p className="text-gray-600 mb-6">Associate Professor (FT)</p>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mr-4 bg-amber-50 p-3 rounded-full flex-shrink-0">
                        <Mail className="w-5 h-5 text-yellow-700" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-500 font-medium">Email Address</p>
                        <p className="text-gray-800 font-semibold break-all">ft.maluravi@sbcemail.in</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-4 bg-amber-50 p-3 rounded-full flex-shrink-0">
                        <Phone className="w-5 h-5 text-yellow-700" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-500 font-medium">Contact Number</p>
                        <p className="text-gray-800 font-semibold">9446462869</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-amber-50 p-4 rounded-lg border-l-4 border-yellow-700">
                    <p className="text-gray-700 text-sm break-words">
                      For any complaints or concerns, please reach out via email at <span className="break-all">grievance@sbcemail.in</span> or contact the presiding officer directly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4" style={{ color: '#845714' }}>
                  Orders and Handbooks
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {iccDocuments.map((doc, index) => (
                    <a
                      key={index}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow border border-gray-200 hover:border-yellow-700"
                    >
                      <div className="mr-3 bg-amber-50 p-3 rounded-full flex-shrink-0">
                        <FileText className="w-6 h-6 text-yellow-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 break-words">{doc.title}</h4>
                        {doc.description && <p className="text-gray-600 text-sm break-words">{doc.description}</p>}
                      </div>
                      <Download className="w-5 h-5 text-yellow-700 flex-shrink-0 ml-3" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Activities Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4" style={{ color: '#845714' }}>
                  Activities and Reports
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {iccActivities.map((activity, index) => (
                    <a
                      key={index}
                      href={activity.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow border border-gray-200 hover:border-yellow-700"
                    >
                      <div className="mr-3 bg-amber-50 p-3 rounded-full flex-shrink-0">
                        <FileText className="w-6 h-6 text-yellow-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 break-words">{activity.title}</h4>
                        {activity.description && <p className="text-gray-600 text-sm break-words">{activity.description}</p>}
                      </div>
                      <Download className="w-5 h-5 text-yellow-700 flex-shrink-0 ml-3" />
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Footer Note */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <p className="text-center text-gray-700 font-medium">
              Remember: Seeking help is a sign of strength, not weakness. Your well-being matters to us.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}