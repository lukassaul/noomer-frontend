import styled, { css } from "styled-components";
import { ButtonProps } from ".";

const COLOR = {
  primary: css`
      color: #fff;
      background: #302D2D;
      padding: 6px 10px;
      border-radius: 5px;
    `,
  secondary: css`
      color: #fff;
      background: #302D2D;
      padding: 20px 50px;
      border-radius: 10px;
    `,
  third: css`
    color: #fff;
    background: #302D2D;
    padding: 20px 50px;
    border-radius: 50px;
    @media screen and (max-width: 480px) {
      padding: 10px 15px;
    }
  `,
  fourth: css`
  color: #302D2D;
  background: #fff;
  border: 1px solid #302D2D;
  padding: 20px 50px;
  border-radius: 50px;
  font-size: 20px;
  font-weight: 700;
  @media screen and (max-width: 1024px) {
    padding: 15px 30px;
    font-size: 16px;
  }
  @media screen and (max-width: 768px) {
    padding: 15px 22px;
    font-size: 16px;
  }
  @media screen and (max-width: 540px) {
    padding: 15px 18px;
    font-size: 14px;
  }
  @media screen and (max-width: 480px) {
    padding: 10px 15px;
    font-size: 10px;
  }
`,
  fifth: css`
  color: #fff;
  background: #302D2D;
  border: 1px solid #302D2D;
  width: 100%;
  border-radius: 15px;
  padding-top: 18px;
  padding-bottom: 18px;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 40px;
`,
sixth: css`
    color: #fff;
    background: #302D2D;
    padding: 10px 15px;
    border-radius: 50px;
    @media screen and (max-width: 480px) {
      padding: 10px 15px;
    }
  `,
  transparent: css`
    color: #fff;
    background-color: transparent;
    border: 1px solid #fff;
    padding: 12px 25px;
    border-radius: 50px;
    font-size: 18px;
    font-weight: 700;
    @media screen and (max-width: 1024px) {
      padding: 12px 25px;
      font-size: 16px;
    }
    @media screen and (max-width: 768px) {
      padding: 12px 22px;
      font-size: 16px;
    }
    @media screen and (max-width: 540px) {
      padding: 12px 18px;
      font-size: 14px;
    }
    @media screen and (max-width: 480px) {
      padding: 10px 15px;
      font-size: 10px;
    }
  `,
  gray: css`
    color: #FFF;
    background: #302D2D;
    border: 1px solid #302D2D;
    padding: 12px 42px;
    border-radius: 50px;
    font-size: 18px;
    font-weight: 700;
    @media screen and (max-width: 1024px) {
      padding: 12px 25px;
      font-size: 16px;
    }
    @media screen and (max-width: 768px) {
      padding: 12px 22px;
      font-size: 16px;
    }
    @media screen and (max-width: 540px) {
      padding: 12px 18px;
      font-size: 14px;
    }
    @media screen and (max-width: 480px) {
      padding: 10px 15px;
      font-size: 10px;
    }
  `,
};

const DISABLED = css`
  cursor: not-allowed;
  background: #d4d4d4;
  color: #f5f5f5;
`;

export const Content = styled.button<ButtonProps>`
  cursor: pointer;
  border: none;
  font-weight: 500;
  outline: none;
  transition: all 0.2s;

  ${(props) => props.color && COLOR[props.color]}
  ${(props) => props.disabled && DISABLED}
`;
