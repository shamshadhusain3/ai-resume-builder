import React from 'react';
import styled from 'styled-components';

const FeatureContainer = styled.div`
  width: 300px; /* Adjust as needed */
  margin: 20px;
  text-align: center;
  /* Add animation: slideIn 0.5s ease-in-out; */
`;

const Feature = ({ icon, title, description }) => {
  return (
    <FeatureContainer>
      <i className={icon}></i>
      <h3>{title}</h3>
      <p>{description}</p>
    </FeatureContainer>
  );
};

export default Feature;
