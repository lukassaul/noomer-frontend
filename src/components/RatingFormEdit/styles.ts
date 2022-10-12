import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LoginInputFirst = styled.input`
    display: flex;
    /* padding: 5px 200px 5px 5px; */
    width: 100%;
    padding: 12px;
    margin-top: 12px;
`;

export const LoginInput = styled.input`
    display: flex;
    /* padding: 5px 200px 5px 5px; */
    width: 100%;
    padding: 12px;
    margin-top: 12px;
`;

export const WholeWrapper = styled.div`
    display: inline-block;
    width: 500px;
    max-width: 1000px;
    margin-bottom: 12px;
    @media screen and (max-width: 991px) {
      width: 100%;
    }
`;

export const LoginLink = styled(Link)`
    display: flex;
    font-family: Arial;
    font-size: 14px;
    margin-left: 5px;
    text-decoration: none;
    color: #000000;
    justify-content: center;
    margin-bottom: 12px;
`;

export const SignupLink = styled(Link)`
    display: flex;
    font-family: Arial;
    font-size: 14px;
    margin-left: 5px;
    text-decoration: none;
    color: #4267b2;
    justify-content: center;
    margin-bottom: 5px;
`;

export const SignupWrapper = styled.div`
    margin-top: 2em;
    border-top: 1px solid gray;
    padding-top: 2em;
    // border-top: 1px solid gray;
    // display: none;
    @media screen and (max-width: 480px) {
      display: block;
      border-top: 1px solid gray;
      padding: 12px 0;
    }
`;

export const LoginTitle = styled.h3`
  justify-content: flex-start;
  font-family: Arial;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const LoginButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 18px;
`;

export const LoginTermWrapper = styled.div`
    display: flex;
    flex-direction: row;
    max-width: 480px;
    margin: 12px 0;
`;

export const LoginTerms = styled.input`
    display: flex;
`;

export const TextProcceed = styled.p`
    font-family: Arial;
    font-size: 10px;
    font-weight: 400;
`;

export const TextTermWrapper = styled.div`
    display: inline-block;
    padding-left: 10px;
`;
