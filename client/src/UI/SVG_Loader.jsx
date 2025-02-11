import React from "react";
import styled from "styled-components";

const SVG_Loader = () => {
  return (
    <StyledWrapper>
      <div>
        <p className="text">Works with any svg logo</p>
        <div className="loader">
          {/* <svg className="logo" xmlns="http://www.w3.org/2000/svg" width={150} height={150} fill="currentColor" viewBox="-1 -1 18 18">
            <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
          </svg> */}
          <svg
            className="logo"
            width="166"
            height="103"
            viewBox="0 0 166 103"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M83 38.5H65.5L63 21L53.5 18C47.5 18 37.5 19.5 32.5 19.5C26.5941 19.5 23.8333 28.6667 21 34C20.5 40.5 19.5 54.9 19.5 60.5C19.5 66.1 25.5 74.8333 28.5 78.5C34.1667 79.5 48 81.3 58 80.5C68 79.7 67.1667 68.5 65.5 63C77.4149 63 82.3301 62.7682 83.4963 66.4077M83 38.5L80 12L59.5 3H28.5L8.5 19.5L3 38.5V56.5L5.5 78.5L19.5 93L42.5 98L61 96.5L75.5 90.5C79.3333 90.6667 80.6 86.5 83 74.5C83.766 70.6702 84.043 68.1137 83.4963 66.4077M83 38.5H101L105 21H124.5L138 25L147 41V60.5L141.5 80.5L124.5 85H107.5L102.5 82L101 65.5L83.4963 66.4077M83 38.5L87 12L95 6.5H107.5H121L138 8L149.5 12L160 23.5C161.167 27.8333 163.5 40.1 163.5 54.5C163.5 68.9 160.5 76.5 159 78.5L153 93L138 100.5H107.5L87 90.5L83.4963 66.4077"
              stroke="black"
              stroke-width="5"
            />
          </svg>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* SVG loader made by: csozi | Website: www.csozi.hu*/

  /*You dont need this "p" style*/
  .text {
    font-weight: bolder;
    font-size: 17px;
    color: black;
    position: absolute;
    translate: -50% 0px;
    top: 20px;
    left: 50%;
    text-align: center;
  }

  .loader {
    overflow: visible;
    height: fit-content;
    width: fit-content;
    padding: 20px;
    display: flex;
  }

  .logo {
    fill: none;
    stroke-dasharray: 20px;
    /*<-- Play with this number until it look cool */
    stroke: black;
    animation: load 15s infinite linear;
  }

  @keyframes load {
    0% {
      stroke-dashoffset: 0px;
    }

    100% {
      stroke-dashoffset: 200px;
      /* <-- This number should always be 10 times the number up there*/
    }
  }
`;

export default SVG_Loader;
