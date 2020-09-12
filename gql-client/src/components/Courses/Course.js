import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_COURSE_QUERY } from '../../graphql/mutations';

import './Course.css';

const Course = ({
  course: { id, title, author, description, topic },
  onDelete,
}) => {
  const [removeSingleCourse, { data }] = useMutation(DELETE_COURSE_QUERY);
  return (
    <div className="Course">
      <span
        className="CourseDeleteBtn"
        aria-label=""
        role="img"
        onClick={() => {
          removeSingleCourse({ variables: { id } });
          onDelete();
        }}
      >
        ❌
      </span>
      <div>
        <span className="CourseSectionHeadline">Title:</span> {title}
      </div>
      <div>
        <span className="CourseSectionHeadline">Author:</span> {author}
      </div>
      <div>
        <span className="CourseSectionHeadline">Description:</span>{' '}
        {description}
      </div>
      <div>
        <span className="CourseSectionHeadline">Topic:</span> {topic}
      </div>
    </div>
  );
};

export default Course;
