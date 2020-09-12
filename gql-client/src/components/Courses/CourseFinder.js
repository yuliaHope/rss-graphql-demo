import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  ALL_COURSES_QUERY,
  COURSE_BY_TOPIC_QUERY,
} from '../../graphql/queries';

const COURSES_TOPICS = ['Node.js', 'JavaScript'];

const CourseFinder = () => {
  const [courseTopicValue, setCourseTopicValue] = useState('Node.js');
  const [getAllCources, { loading, data: courses }] = useLazyQuery(
    ALL_COURSES_QUERY
  );
  const [getCourseByTopic, { data: coursesByTopic }] = useLazyQuery(
    COURSE_BY_TOPIC_QUERY,
    {
      variables: { topic: courseTopicValue },
    }
  );

  const handleChange = (e) => {
    setCourseTopicValue(e.target.value);
  };

  console.log('ALL_COURSES_QUERY', loading, courses);
  console.log('COURSE_BY_TOPIC_QUERY', coursesByTopic);

  return (
    <div>
      <select onChange={handleChange}>
        {COURSES_TOPICS.map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>
      <button onClick={getCourseByTopic}>Fetch the detailed info</button>
      {/* Try to click this button multiple times and see the devTools network tab ✨ */}
      <button onClick={getAllCources}>Test fetch for all courses</button>
    </div>
  );
};

export default CourseFinder;
