import styled from 'styled-components';

export const CategoriesContainer = styled.div`
  width: 100%;
`;

export const CategoriesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
`;

export const CategoriesColumn = styled.div`
  flex: 25%;
  max-width: 25%;
  padding: 1em;
  cursor: pointer;
  // @media screen and (max-width: 800px) {
  //   flex: 50%;
  //   max-width: 50%;
  // }
  // @media screen and (max-width: 600px) {
  //   flex: 100%;
  //   max-width: 100%;
  // }
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;
  background-color: #E8E8E8;
  border-radius: 16px;
  box-shadow: 0px 4px 4px #cdcaca;
  @media screen and (max-width: 600px) {
    padding: 0;
    border-radius: 0;
    background-color: transparent;
    box-shadow: 0px 0px 0px #cdcaca;
  }
`;

export const CategoryImage = styled.img`
  margin-top: 8px;
  vertical-align: middle;
  width: 90%;
  transition: 0.5s all ease-in-out;
  @media screen and (max-width: 600px) {
    width: 64px;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

export const CategoryLabel = styled.p`
  margin-top: 8px;
  font-weight: 700;
  font-size: 15px;
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;


// /* Responsive layout - makes a two column-layout instead of four columns */
// @media screen and (max-width: 800px) {
//   .column {
//     flex: 50%;
//     max-width: 50%;
//   }
// }
//
// /* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
// @media screen and (max-width: 600px) {
//   .column {
//     flex: 100%;
//     max-width: 100%;
//   }
// }
