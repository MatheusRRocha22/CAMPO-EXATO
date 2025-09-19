import React from "react";
import styled from "styled-components";
import breakpoints from "../../styles/breakpoints";

export const Headers = styled.div`
  .header {
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    height: 14vh;
    z-index: 2;
    box-shadow: inset 0 -10px 15px rgba(0, 0, 0, 0.5);
  }

  .logo {
    display: flex;
    flex-direction: row;
    margin-top: 80px;
    align-items: center;
    justify-content: center;
    user-select: none;
  }
  .logo:hover {
    cursor: pointer;
  }
  #imgLogo {
    height: 80px;
    margin-right: 20px;
    transition: transform 0.25s ease-in-out;
  }
  .logo:hover #imgLogo {
    transform: scale(1.2);
  }
  .logo:active #imgLogo {
    transform: scale(0.9);
  }

  .logoText {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #prinText {
    color: white;
    font-size: 52px;
    font-weight: bold;
    text-decoration: underline;
    font-family: Georgia, "Times New Roman", Times, serif;
    transition: font-size 0.25s ease-in-out, transform 0.3s ease-in-out,
      color 0.3s ease-in-out;
  }
  .logo:hover #prinText {
    transform: scale(1.04);
  }
  .logo:active #prinText {
    transform: scale(0.9);
  }
  #subText {
    color: #e3e3e3;
    font-size: 22px;
    font-weight: bold;
    margin-top: -6px;
    transition: font-size 0.25s ease-in-out, transform 0.3s ease-in-out,
      color 0.3s ease-in-out;
  }
  .logo:hover #subText {
    transform: scale(1.04);
  }
  .logo:active #subText {
    transform: scale(0.9);
  }

  /* --- Área de Usuário --- */
  .userArea {
    display: flex;
    align-items: center;
    position: absolute;
    right: 50px;
    margin-top: -40px;
  }

  .loginBtn {
    background: white;
    color: green;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: bold;
    font-size: 20px;
    text-decoration: none;
    box-shadow: 0px 10px 10px 3px #0000008a;
    transition: all 0.3s ease;
  }
  .loginBtn:hover {
    background: #e3e3e3;
    cursor: pointer;
    transform: scale(1.1);
  }

  .userMenu {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    position: relative;
  }

  .userInfo {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: white;
    box-shadow: 0px 10px 10px 3px #0000008a;
    border-radius: 20px;
    padding: 5px 10px;
    transition: all 0.3s ease-in-out;
    position: relative;
    z-index: 11;
  }

  .userMenu:hover .userInfo {
    border-radius: 20px 20px 0px 0px;
    box-shadow: 0px 5px 15px 5px #0000008a;
  }

  .username {
    color: black;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold;
    user-select: none;
    transition: color 0.25s ease;
  }

  .userMenu:hover .username {
    color: green;
  }

  .dropdown {
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 50px;
    right: 0px;
    background: white;
    box-shadow: 0px 10px 10px 5px rgba(0, 0, 0, 0.4);
    min-width: 100%;
    padding: 4px 10px;
    flex-direction: column;
    z-index: 11;
    transform: translateY(-10px);
    transition: all 0.2s ease;
  }

  .userMenu:hover .dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    border-radius: 0px 0px 20px 20px;
  }

  .dropdown button {
    background: white;
    border: none;
    padding: 8px 2px;
    text-align: center;
    width: 100%;
    cursor: pointer;
    color: #333;
    font-size: 13px;
    font-weight: bold;
    margin: 2px 0px;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .dropdown button:hover {
    background: #f8f8f8;
    color: green;
    transform: translateX(2px);
    box-shadow: 0px 10px 15px 5px rgba(0, 0, 0, 0.4);
  }

  .dropdown button:last-child:hover {
    background: #fdf4f4;
    color: #d32f2f;
  }

  .dropdown button:focus {
    outline: 2px solid green;
    outline-offset: 2px;
  }

  .userInfo::after {
    content: "▼";
    font-size: 10px;
    color: green;
    margin-left: 5px;
    transition: transform 0.3s ease;
  }

  .userMenu:hover .userInfo::after {
    transform: rotate(180deg);
  }

  @media ${breakpoints.bg} {
    .header {
      height: 150px;
      justify-content: center;
      align-items: center;
    }
    .logo {
      flex-direction: column;
      transform: scale(0.7);
    }
    .logoText {
      margin-top: -8px;
    }
    .userArea {
      margin-top: -60px;
      right: -20px;
      transform: scale(0.55);
    }

    .dropdown {
      transform: scale(0.55);
    }
  }
  @media ${breakpoints.md} {
    .userArea {
      margin-top: -30px;
      right: -30px;
      transform: scale(0.45);
    }

    .dropdown {
      transform: scale(0.85);
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-30px);
    }
  }

  .userMenu .dropdown.show {
    animation: slideDown 0.8s ease-in-out;
  }

  .userMenu .dropdown.hide {
    animation: slideUp 1s ease-in-out;
  }
`;
