import React from 'react';
import styled from 'styled-components';

const UniversalLoader = () => {
  return (
    <StyledWrapper>
      <div className="spinner">
        <svg viewBox="25 25 50 50" className="circular">
          <circle strokeMiterlimit={10} strokeWidth={4} fill="none" r={20} cy={50} cx={50} className="path" />
        </svg>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .spinner {
    --red: #000;
    --blue: #000;
    --green: #000;
    --yellow: #000;
    position: relative;
    width: 35px;
  }

  .spinner:before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  .circular {
    animation: rotate73451 2s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash0175 1.5s ease-in-out infinite, color7123 6s ease-in-out infinite;
    stroke-linecap: round;
  }

  @keyframes rotate73451 {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash0175 {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }

    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }

  @keyframes color7123 {
    100%, 0% {
      stroke: var(--red);
    }

    40% {
      stroke: var(--blue);
    }

    66% {
      stroke: var(--green);
    }

    80%, 90% {
      stroke: var(--yellow);
    }
  }`;

export default UniversalLoader;
