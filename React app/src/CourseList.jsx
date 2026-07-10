import React from 'react';
import Course from './Course';

function CourseList({ onViewDetails }) {
  
  const courses = [
    { id: 1, name: "Tamil", Details: "Explore Tamil literature and foundations.", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400" },
    { id: 2, name: "English", Details: "Explore advanced English composition.", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400" },
    { id: 3, name: "Maths", Details: "Explore core calculations and matrix logic.", image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400" },
    { id: 4, name: "Science", Details: "Explore basic concepts of universal materials.", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400" },
    { id: 5, name: "Social Science", Details: "Explore world history and governance structures.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400" },
    { id: 6, name: "Physics", Details: "Explore classical and mechanics theorems.", image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=400" },
    { id: 7, name: "Chemistry", Details: "Explore structure components reactions.", image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400" },
    { id: 8, name: "Computer Science", Details: "Explore core software programming constructs.", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400" },
    { id: 9, name: "Biology", Details: "Explore anatomy and ecosystems structures.", image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?w=400" }
  ];
  const handleCourseClick = (courseName) => {
    const defaultStandard = 10;  
    
    console.log(`Fetching books from Spring Boot for: ${courseName}`);
    
    fetch(`http://localhost:8080/api/books?subject=${courseName}&standard=${defaultStandard}`)
      .then((response) => response.json())
      .then((booksData) => {
        
        if (onViewDetails) {
          onViewDetails(courseName, booksData);
        }
      })
      .catch((error) => {
        console.error("Error fetching books from Spring Boot:", error);
        
        if (onViewDetails) onViewDetails(courseName, []);
      });
  };

  return (
    <div className="course-grid">
      {courses.map((course) => (
        <Course 
          key={course.id}
          name={course.name}
          Details={course.Details}
          image={course.image}
          
          onViewDetails={() => handleCourseClick(course.name)} 
        />
      ))}
    </div>
  );
}

export default CourseList;