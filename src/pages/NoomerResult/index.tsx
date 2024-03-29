import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../app/store'

import { BsFillArrowLeftCircleFill } from "react-icons/bs";

import Footer from '../../components/Footer';
import {
  NoomerEqualityLogo,
  DetailsLabel,
  DetailsValue,
  CenteredContainer,
  CenteredContainerColBordered,
  CommonContainer,
  Container,
  LeftLinkContainer,
  LinkParagraph,
  FormSeparatorGray,
  TitleThree,
  TitleThreeNoPad,
} from '../../globalStyles'

import {
  FlexContainer,
  StatsTable,
} from './styles'

function NoomerResult() {

  const navigate = useNavigate()

  const { noomer } = useSelector((state: RootState) => state.comparison)

  const Stats = () =>
    <FlexContainer style={{width: '100%', justifyContent: 'space-around'}}>
      <StatsTable>
        <TitleThree>Product A</TitleThree>
        <table className="table table-striped-blue" width="100%">
          <tbody>
            <tr><td width="25%"><DetailsLabel>Classification: </DetailsLabel></td><td width="75%"><DetailsValue>{noomer.productA}</DetailsValue></td></tr>
            <tr><td style={{marginRight:"1em"}}><DetailsLabel>Location: </DetailsLabel></td><td><DetailsValue>{noomer.locationA}</DetailsValue></td></tr>
            <tr><td style={{marginRight:"1em"}}><DetailsLabel>Highest: </DetailsLabel></td><td><DetailsValue>{noomer.statsA && noomer.statsA.highest ? `${noomer.statsA.highest.toLocaleString()} usd` : "No record"}</DetailsValue></td></tr>
            <tr><td style={{marginRight:"1em"}}><DetailsLabel>Lowest: </DetailsLabel></td><td><DetailsValue>{noomer.statsA && noomer.statsA.lowest ? `${noomer.statsA.lowest.toLocaleString()} usd` : "No record"}</DetailsValue></td></tr>
            <tr><td style={{marginRight:"1em"}}><DetailsLabel>Average: </DetailsLabel></td><td><DetailsValue>{noomer.statsA && noomer.statsA.mean ? `${noomer.statsA.mean.toLocaleString()} usd` : "No record"}</DetailsValue></td></tr>
          </tbody>
        </table>
      </StatsTable>

      <StatsTable>
        <TitleThree>Product B</TitleThree>
        <table className="table table-striped-red" width="100%">
          <tbody>
            <tr><td width="25%"><DetailsLabel>Classification: </DetailsLabel></td><td width="75%"><DetailsValue>{noomer.productB}</DetailsValue></td></tr>
            <tr><td style={{marginRight:"1em"}}><DetailsLabel>Location: </DetailsLabel></td><td><DetailsValue>{noomer.locationB}</DetailsValue></td></tr>
            <tr><td style={{marginRight:"1em"}}><DetailsLabel>Highest: </DetailsLabel></td><td><DetailsValue>{noomer.statsB && noomer.statsB.highest ? `${noomer.statsB.highest.toLocaleString()} usd` : "No record"}</DetailsValue></td></tr>
            <tr><td style={{marginRight:"1em"}}><DetailsLabel>Lowest: </DetailsLabel></td><td><DetailsValue>{noomer.statsB && noomer.statsB.lowest ? `${noomer.statsB.lowest.toLocaleString()} usd` : "No record"}</DetailsValue></td></tr>
            <tr><td style={{marginRight:"1em"}}><DetailsLabel>Average: </DetailsLabel></td><td><DetailsValue>{noomer.statsB && noomer.statsB.mean ? `${noomer.statsB.mean.toLocaleString()} usd` : "No record"}</DetailsValue></td></tr>
          </tbody>
        </table>
      </StatsTable>
    </FlexContainer>


  const Noomer = () =>
    <Container>
      <CenteredContainerColBordered>
        <TitleThreeNoPad style={{textAlign: 'center'}}>{noomer.noomer.productA}</TitleThreeNoPad>
        <NoomerEqualityLogo src="https://res.cloudinary.com/dba8ifej6/image/upload/v1668387691/red_logo_noomer_j9pvop.png" />
        <TitleThreeNoPad style={{textAlign: 'center'}}>{noomer.noomer.productB}</TitleThreeNoPad>
      </CenteredContainerColBordered>
    </Container>

  return (
    <>
      <CommonContainer>
        <CenteredContainer>
          <Container>

              <LeftLinkContainer onClick={() => navigate(-1)}>
                <BsFillArrowLeftCircleFill size="1.5em" style={{cursor: "pointer", margin: "0 1em 0 0.5em", color: '#E8505B'}}/>
                <LinkParagraph >Back to homepage</LinkParagraph>
              </LeftLinkContainer>

              {noomer && noomer.noomer ? Noomer() : null}
              <FormSeparatorGray/>
              {noomer ? Stats() : "Please login to vote"}

          </Container>
        </CenteredContainer>
      </CommonContainer>

      <Footer />
    </>
  )

}

export default NoomerResult;
