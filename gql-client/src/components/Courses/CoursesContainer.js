import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';
import { Course, CourseFinder } from '.';
import { ALL_COURSES_QUERY } from '../../graphql/queries';

import './CoursesContainer.css';

const CoursesContainer = () => {
  const { error, loading, data, refetch } = useQuery(ALL_COURSES_QUERY);

  if (loading)
    return (
      <span role="img" aria-label="">
        Loading... 🐱‍👤
      </span>
    );
  if (error)
    return (
      <span role="img" aria-label="">
        {' '}
        🤔
      </span>
    );

  return (
    <Fragment>
      <div className="CoursesContainer">
        {data.courses.map((course) => (
          <Course key={course.id} course={course} onDelete={refetch} />
        ))}
      </div>
      <CourseFinder />
    </Fragment>
  );
};

export default CoursesContainer;
