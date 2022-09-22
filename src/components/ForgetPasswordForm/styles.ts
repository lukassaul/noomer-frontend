import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: inline-block;
  width: 500px;
  max-width: 1000px;
  margin-bottom: 12px;
  @media screen and (max-width: 991px) {
    width: 100%;
    padding: 0 12px;
  }
`;

export const ForgetPasswordInput = styled.input`
    display: flex;
    width: 100%;
    padding: 12px;
`;

export const ForgetPasswordTitle = styled.h3`
  justify-content: flex-start;
  font-family: Arial;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
`;
