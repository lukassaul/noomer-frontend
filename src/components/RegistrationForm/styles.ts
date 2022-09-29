import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const RegisterInput = styled.input`
    display: flex;
    /* padding: 5px 200px 5px 5px; */
    width: 100%;
    padding: 12px;
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

export const RegHeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media screen and (max-width: 991px) {
      flex-direction: column;
    }
`;

export const RegisterButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 15px;
`;

export const RegisterLoginText = styled.p`
    display: flex;
    font-family: Arial;
    align-self: flex-start;
    font-size: 0.7rem;
    margin-top: 0.6rem;
    @media screen and (max-width: 991px) {
      align-self: flex-end;
    }
`;

export const RegisterLoginLink = styled(Link)`
    font-family: Arial;
    font-size: 0.7rem;
    margin-left: 5px;
    text-decoration: none;
    color: #110ED4;
`;

export const RegisterTerms = styled.input`
    display: flex;
`;

export const RegistrationTitle = styled.h3`
  justify-content: flex-start;
  font-family: Arial;
  margin-bottom: 10px;
`;

export const RegisterTermWrapper = styled.div`
    display: flex;
    flex-direction: row;
    max-width: 380px;
    margin:auto;
`;

export const TextTermWrapper = styled.div`
    display: inline-block;
    padding-left: 10px;
    @media screen and (max-width: 991px) {
      text-align: justify;
    }
`;

export const TextProcceed = styled.p`
    font-family: Arial;
    font-size: 12px;
    font-weight: 400;
`;

export const RegistrationErrorText = styled.p`
    font-family: Arial;
    font-size: 10px;
    color: #721c24;
    margin-top: 5px;
    margin-bottom: 5px;
`;
