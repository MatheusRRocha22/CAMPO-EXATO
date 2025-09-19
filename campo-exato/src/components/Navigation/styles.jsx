import styled, { keyframes } from "styled-components";
import breakpoints from "../../styles/breakpoints";

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-30px);
  }
`;

export const Nav = styled.nav`
  background-color: green;
  min-height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  user-select: none;
  gap: 0px;
  cursor: default;

  .icon {
    width: 100vh;
    display: none;
    color: white;
    cursor: pointer;
  }

  .links {
    animation: ${slideDown} 0.8s ease-in-out;
  }

  .links.hide {
    animation: ${slideUp} 1s ease-in-out forwards;
  }

  .nav-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    background: transparent;
    color: #fff;
    font-family: "Gill Sans", Calibri, sans-serif;
    font-weight: bold;
    font-size: 2vh;
    width: 63vh;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: default;
    transition: transform 0.15s ease-in-out, background-color 0.15s,
      box-shadow 0.15s;
  }

  .nav-link:hover {
    cursor: pointer;
    transform: scale(1.02);
    background-color: rgba(25, 154, 25, 0.67);
    box-shadow: 0px 10px 20px 3px rgba(0, 0, 0, 0.45);
  }

  .nav-link:active {
    transform: scale(0.9);
  }
  @media (max-width: 1900px) {
    .nav-link {
      width: 50vh;
    }
  }
  @media (max-width: 1620px) {
    .nav-link {
      width: 40vh;
    }
  }
  @media (max-width: 1250px) {
    .nav-link {
      width: 23vh;
    }
  }

  @media ${breakpoints.md} {
    height: auto;
    gap: 8px;

    .nav-link {
      font-size: 1.5vh;
      padding: 4px 8px;
      margin: -2px;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    .nav-link {
      width: 100vh;
      margin-bottom: 4px;
    }
    .icon {
      display: flex;
      margin-top: 5px;
    }
  }
`;
