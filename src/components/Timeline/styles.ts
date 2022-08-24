import styled from 'styled-components';

export const MainTimelineContainer = styled.div`
  width: 100%;
`;

export const TimelineRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 4px;
`;

export const TimelineColumn = styled.div`
  flex: 30%;
  max-width: 30%;
  padding: 0 4px;
  @media screen and (max-width: 800px) {
    flex: 50%;
    max-width: 50%;
  }
  @media screen and (max-width: 600px) {
    flex: 100%;
    max-width: 100%;
  }
`;

export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  //align-items: center;
  padding: 2em;
`;

export const TimelineImage = styled.img`
  margin-top: 8px;
  vertical-align: middle;
  width: 100%;
`;

export const TimelineLabel = styled.p`
  margin-top: 8px;
  font-weight: 700;
  font-size: 15px;
`;

export const TimelineLinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 2em;
`;

export const PriceListingLink = styled.p`
  cursor: pointer;
  &:hover {
    color: #302D2D;
  }
`;
