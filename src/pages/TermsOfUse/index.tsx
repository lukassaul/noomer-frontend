import Footer from '../../components/Footer';
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { t } from '../../i18n';
import TermsOfUse from '../../components/TermsOfUse';

import {
  DarkHeader,
  DarkHeaderText,
  CenteredContainer,
  CommonContentContainer,
  SecurityContainer
} from '../../globalStyles';


function Terms() {
  const { language } = useSelector((state: RootState) => state.language)
  return (
    <CommonContentContainer>
      <CenteredContainer style={{marginBottom: '2em'}}>
        <DarkHeader>
          <DarkHeaderText>{t("TERMS OF USE", language)}</DarkHeaderText>
        </DarkHeader>
      </CenteredContainer>
      <SecurityContainer>
        <TermsOfUse />
      </SecurityContainer>
      <Footer />
    </CommonContentContainer>
  )
}

export default Terms;
