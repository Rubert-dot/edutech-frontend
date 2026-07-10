import React, { useState } from 'react';
import axios from 'axios'; 
import Navbar from './Navbar'; 
import CourseList from './CourseList';
import Footer from './Footer';
import Landing from './Landing'; 

function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [books, setBooks] = useState([]); 
  const [selectedStd, setSelectedStd] = useState(null); 
  const [viewingPdf, setViewingPdf] = useState(null);

  const handlePageChange = (pageName) => {
    setViewingPdf(null); 
    setActivePage(pageName);
  };

  const handleViewDetails = (courseName) => {
    setSelectedCourse({ name: courseName });
    setBooks([]); 
    setSelectedStd(null);
    setViewingPdf(null);
    setActivePage('course-detail'); 
  };

  
  const handleFetchBooksForStd = (subjectName, std) => {
    setSelectedStd(std);
    setViewingPdf(null); 
    console.log(`Fetching from Spring Boot: Subject=${subjectName}, Std=${std}`);

   
    axios.get(`https://edutech-backend-9oto.onrender.com/api/books?subject=${subjectName}&standard=${std}`)
      .then((response) => {
        console.log("Books received successfully:", response.data);
        setBooks(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching books from Spring Boot:", error);
        setBooks([]);
      });
  };

  const renderContent = () => {
    if (viewingPdf) {
      return (
        <div style={{ padding: '30px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', background: '#2c3e50', padding: '15px', borderRadius: '6px', color: '#fff' }}>
            <h3 style={{ margin: 0, fontSize: '18px' }}>Reading: {viewingPdf.title}</h3>
            <button 
              type="button"
              onClick={() => setViewingPdf(null)} 
              style={{ padding: '8px 20px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Close & Go Back ❌
            </button>
          </div>
          <iframe 
            src={viewingPdf.path} 
            title={viewingPdf.title}
            width="100%" 
            height="750px" 
            style={{ border: '2px solid #2c3e50', borderRadius: '6px', background: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
          />
        </div>
      );
    }

    switch(activePage) {
      case 'home':
        return (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{
              width: '100%',
              height: '50vh', 
              backgroundImage: "url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1920&auto=format&fit=crop')",
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(255, 255, 255, 0.4)',
              }}></div>
              
              <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                <Landing /> 
              </div>
            </div>

            <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>Popular Subjects</h2>
              <CourseList onViewDetails={handleViewDetails} />
            </div>
          </div>
        );

      case 'courses':
        return (
          <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', flex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontSize: '30px', color: '#2c3e50' }}>All Available Courses & Subjects</h2>
              <p style={{ color: '#7f8c8d' }}>உங்களுக்கு தேவையான பாடப் புத்தகங்களை உடனே தேர்வு செய்யுங்கள்.</p>
            </div>
            <CourseList onViewDetails={handleViewDetails} />
          </div>
        );

      case 'about':
        return (
          <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '30px auto', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', flex: 1 }}>
            <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px', fontSize: '28px' }}>About EduTechApp</h2>
            <p style={{ fontSize: '16px', color: '#555', lineHeight: '1.8', textAlign: 'center' }}>
              எங்கள் <strong>EduTechApp</strong> தளம் மாணவர்களுக்கு 1 முதல் 12-ஆம் வகுப்பு வரையிலான அனைத்துப் பாடப் புத்தகங்களையும் ஒரே இடத்தில், முற்றிலும் இலவசமாக, டிஜிட்டல் வடிவில் (PDF) உடனுக்குடன் பாய்ந்து படிக்கும் வசதியை வழங்குகிறது.
            </p>
            <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '30px 0' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', textAlign: 'center' }}>
              <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                <h3 style={{ color: '#2980b9', margin: '0 0 10px 0' }}>⚡ Real-Time</h3>
                <p style={{ fontSize: '14px', color: '#777', margin: 0 }}> நேரடி தரவுத்தளம்</p>
              </div>
              <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                <h3 style={{ color: '#27ae60', margin: '0 0 10px 0' }}>📖 1 to 12 Std</h3>
                <p style={{ fontSize: '14px', color: '#777', margin: 0 }}>அனைத்து வகுப்புகளின் புத்தகங்களும் ஒரே இடத்தில்</p>
              </div>
              <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                <h3 style={{ color: '#e67e22', margin: '0 0 10px 0' }}>💻 Easy UI</h3>
                <p style={{ fontSize: '14px', color: '#777', margin: 0 }}>எளிமையாக கிளிக் செய்து படிக்கும் வசதி</p>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div style={{ padding: '40px 20px', maxWidth: '600px', margin: '30px auto', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', flex: 1 }}>
            <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '10px' }}>Contact Us</h2>
            <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '30px' }}>ஏதேனும் சந்தேகங்கள் இருந்தால் எங்களைத் தொடர்பு கொள்ளவும்.</p>
            
            <form onSubmit={(e) => { e.preventDefault(); alert("உங்களுடைய செய்தி அனுப்பப்பட்டது! ."); }} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="text" placeholder="Your Name" required style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' }} />
              <input type="email" placeholder="Your Email" required style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' }} />
              <textarea placeholder="Write your message here..." rows="5" required style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px', resize: 'vertical' }}></textarea>
              <button type="submit" style={{ padding: '12px', backgroundColor: '#2980b9', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
                Send Message ✉️
              </button>
            </form>

            <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee', textAlign: 'center', color: '#555', fontSize: '14px' }}>
              <p>📍 <strong>Address:</strong> Trichy, Tamil Nadu, India</p>
              <p>📞 <strong>Phone:</strong> xxxxx xxxxx | ✉️ <strong>Email:</strong> support@edutechapp.com</p>
            </div>
          </div>
        );

      case 'course-detail':
        const standards = Array.from({ length: 12 }, (_, i) => i + 1);

        return (
          <div style={{ padding: '30px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px', background: '#e2eff9', padding: '20px', borderRadius: '10px' }}>
              <h2 style={{ fontSize: '28px', color: '#2c3e50', margin: '0 0 10px 0' }}>
                {selectedCourse?.name} Real-Time Books Hub
              </h2>
              <p style={{ fontSize: '16px', color: '#555' }}>
                கீழே உள்ள வகுப்பை தேர்ந்தெடுத்து, புத்தகங்களை நேரடியாக படியுங்கள்.
              </p>
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange('home');
                }} 
                style={{ marginTop: '15px', padding: '10px 25px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                ← Back to Subjects
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', padding: '10px' }}>
              {standards.map((std) => (
                <div 
                  key={std} 
                  style={{
                    background: '#fff',
                    border: selectedStd === std ? '2px solid #27ae60' : '1px solid #d0e2f0', 
                    borderRadius: '8px',
                    padding: '20px',
                    textAlign: 'center',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '180px'
                  }}
                >
                  <h3 style={{ fontSize: '18px', color: '#2c3e50', margin: '0 0 10px 0' }}>
                    {selectedCourse?.name} - Std {std}
                  </h3>
                  <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '5px', fontSize: '12px', color: '#27ae60', marginBottom: '15px', borderLeft: '4px solid #27ae60', fontWeight: 'bold' }}>
                    ✅ Book Available
                  </div>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFetchBooksForStd(selectedCourse?.name, std);
                    }}
                    style={{ padding: '8px 12px', backgroundColor: selectedStd === std ? '#1e7e34' : '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
                  >
                    📖 View Books
                  </button>
                </div>
              ))}
            </div>

            {selectedStd && (
              <div style={{ marginTop: '40px', background: '#f9f9f9', padding: '25px', borderRadius: '10px', border: '1px solid #ddd' }}>
                <h3 style={{ color: '#2c3e50', marginBottom: '20px', borderBottom: '2px solid #27ae60', paddingBottom: '10px' }}>
                  Books list for {selectedCourse?.name} - Standard {selectedStd}
                </h3>
                
                {books.length === 0 ? (
                  <p style={{ color: '#777', fontStyle: 'italic' }}>No books found in server database for this standard yet.</p>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {books.map((book) => {
                      const subjectName = selectedCourse?.name ? selectedCourse.name.trim().toLowerCase() : '';
                      const currentStd = Number(selectedStd);
                      
                      let suffix = 'th';
                      if (currentStd === 1) suffix = 'st';
                      else if (currentStd === 2) suffix = 'nd';
                      else if (currentStd === 3) suffix = 'rd';

                      let fileSubject = 'tamil'; 
                      let hasDoublePdf = false; 

                      if (subjectName.includes('tamil') || subjectName.includes('தமிழ்')) {
                        fileSubject = 'tamil';
                        if (currentStd === 3) fileSubject = 'Tamil';
                        if (currentStd === 4) hasDoublePdf = true;
                      } else if (subjectName.includes('math') || subjectName.includes('கணிதம்')) {
                        fileSubject = 'maths';
                      } else if (subjectName.includes('science') || subjectName.includes('அறிவியல்')) {
                        fileSubject = 'science';
                      } else if (subjectName.includes('social') || subjectName.includes('சமூக')) {
                        fileSubject = 'social';
                      } else if (subjectName.includes('english') || subjectName.includes('ஆங்கிலம்')) {
                        fileSubject = 'english';
                        if (currentStd === 4) hasDoublePdf = true;
                      } else if (subjectName.includes('chemistry') || subjectName.includes('வேதியியல்')) {
                        fileSubject = 'chemistry';
                      } else if (subjectName.includes('physics') || subjectName.includes('இயற்பியல்')) {
                        fileSubject = 'physics';
                      } else if (subjectName.includes('biology') || subjectName.includes('உயிரியல்')) {
                        fileSubject = 'biology';
                      } else if (subjectName.includes('computer') || subjectName.includes('கணினி')) {
                        fileSubject = 'computer';
                      } else {
                        fileSubject = subjectName;
                      }

                      let localPdfPath = `/books/${currentStd}${suffix}_${fileSubject}.pdf`;
                      if (hasDoublePdf) {
                        localPdfPath = `/books/${currentStd}${suffix}_${fileSubject}.pdf.pdf`;
                      }

                      return (
                        <div key={book.bookId} style={{ background: '#fff', padding: '15px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: '5px solid #2980b9' }}>
                          <h4 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>{book.title}</h4>
                          <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#7f8c8d' }}>
                            Volume: {book.volume} | Edition: {book.edition}
                          </p>
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setViewingPdf({ path: localPdfPath, title: book.title });
                            }} 
                            style={{ display: 'inline-block', padding: '8px 15px', backgroundColor: '#2980b9', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
                          >
                            📖 Read Book Here
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      default:
        return (
          <div style={{ padding: '20px', flex: 1 }}>
            <CourseList onViewDetails={handleViewDetails} />
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <Navbar setActivePage={handlePageChange} />
      <div style={{ flex: 1 }}>
        {renderContent()}
      </div>
      <Footer setActivePage={handlePageChange} />
    </div>  
  );
} 

export default App;