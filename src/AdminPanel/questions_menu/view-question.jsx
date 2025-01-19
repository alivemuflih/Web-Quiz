import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewQuestion = ({ onSectionChange }) => {
  const [quizCourses, setQuizCourses] = useState([]);
  const [error, setError] = useState('');

  // Fetch courses
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/courses')
      .then((response) => {
        setQuizCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
        setError('Failed to fetch courses. Please try again later.');
      });
  }, []);

  // Handle navigate to DetailQuiz component
  const handleView = (course) => {
    try {
      if (!course || !course.id) {
        throw new Error('Invalid course data. Cannot navigate to detail.');
      }
      // Pass the course data to onSectionChange to handle navigation
      onSectionChange('DetailQuestion', { course });
    } catch (err) {
      console.error('Error in handleView:', err.message);
      alert(`Failed to navigate to quiz details: ${err.message}`);
    }
  };

  return (
    <div className="container">
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h6 className="panel-title">Quiz Courses</h6>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Total Marks</th>
              <th>View Quiz</th>
            </tr>
          </thead>
          <tbody>
            {error && (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', color: 'red' }}>
                  {error}
                </td>
              </tr>
            )}
            {quizCourses.length > 0 ? (
              quizCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.courseName}</td>
                  <td>{course.totalMarks}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleView(course)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center' }}>
                  No quizzes available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewQuestion;
