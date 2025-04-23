import React from 'react';
import styled from 'styled-components';

const TestimonialContainer = styled.div`
  /* Add animation for smooth transitions */
`;

const Testimonial = ({ quote, author }) => {
  return (
    <TestimonialContainer>
      <p>"{quote}"</p>
      <p>- {author}</p>
    </TestimonialContainer>
  );
};

export default Testimonial;
