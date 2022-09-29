import React from 'react';
import { useSelector } from 'react-redux';
import { t } from '../../i18n';
import { RootState } from "../../app/store";
import { TermTitle, TermText } from './styles';

function TermsOfUse(){
    const { language } = useSelector((state: RootState) => state.language)
    return (
        <>
          <TermTitle>{t("Term 1 title", language)}</TermTitle>
          <TermText>{t("Term 1 text 1", language)}</TermText>
          <TermText>{t("Term 1 text 2", language)}</TermText>
          <TermText>{t("Term 1 text 3", language)}</TermText>

          <TermTitle>{t("Term 2 title", language)}</TermTitle>
          <TermText>{t("Term 2 text 1", language)}</TermText>
          <TermText>{t("Term 2 text 2", language)}</TermText>

          <TermTitle>{t("Term 3 title", language)}</TermTitle>
          <TermText>{t("Term 3 text 1", language)}</TermText>
          <TermText>{t("Term 3 text 2", language)}</TermText>
          <TermText>{t("Term 3 text 3", language)}</TermText>
          <TermText>{t("Term 3 text 4", language)}</TermText>
          <TermText>{t("Term 3 text 5", language)}</TermText>
          <TermText>{t("Term 3 text 6", language)}</TermText>
          <TermText>{t("Term 3 text 7", language)}</TermText>

          <TermTitle>{t("Term 4 title", language)}</TermTitle>
          <TermText>{t("Term 4 text 1", language)}</TermText>
          <TermText>{t("Term 4 text 2", language)}</TermText>
          <ul style={{padding: '0 1em'}}>
            <li>{t("Term 4 list 1", language)}</li>
            <li>{t("Term 4 list 2", language)}</li>
            <li>{t("Term 4 list 3", language)}</li>
            <li>{t("Term 4 list 4", language)}</li>
            <li>{t("Term 4 list 5", language)}</li>
            <li>{t("Term 4 list 6", language)}</li>
            <li>{t("Term 4 list 7", language)}</li>
            <li>{t("Term 4 list 8", language)}</li>
            <li>{t("Term 4 list 9", language)}</li>
            <li>{t("Term 4 list 10", language)}</li>
            <li>{t("Term 4 list 11", language)}</li>
            <li>{t("Term 4 list 12", language)}</li>
            <li>{t("Term 4 list 13", language)}</li>
            <li>{t("Term 4 list 14", language)}</li>
            <li>{t("Term 4 list 15", language)}</li>
            <li>{t("Term 4 list 16", language)}</li>
            <li>{t("Term 4 list 17", language)}</li>
            <li>{t("Term 4 list 18", language)}</li>
            <li>{t("Term 4 list 19", language)}</li>
            <li>{t("Term 4 list 20", language)}</li>
          </ul>

          <TermTitle>{t("Term 5 title", language)}</TermTitle>
          <TermText>{t("Term 5 text 1", language)}</TermText>
          <ul style={{padding: '0 1em'}}>
            <li>{t("Term 5 list 1", language)}</li>
            <li>{t("Term 5 list 2", language)}</li>
            <li>{t("Term 5 list 3", language)}</li>
            <li>{t("Term 5 list 4", language)}</li>
            <li>{t("Term 5 list 5", language)}</li>
            <li>{t("Term 5 list 6", language)}</li>
            <li>{t("Term 5 list 7", language)}</li>
            <li>{t("Term 5 list 8", language)}</li>
            <li>{t("Term 5 list 9", language)}</li>
            <li>{t("Term 5 list 10", language)}</li>
            <li>{t("Term 5 list 11", language)}</li>
            <li>{t("Term 5 list 12", language)}</li>
          </ul>
          <TermText>{t("Term 5 text 2", language)}</TermText>

          <TermTitle>{t("Term 6 title", language)}</TermTitle>
          <TermText>{t("Term 6 text 1", language)}</TermText>
          <TermText><span style={{fontWeight: 'bold'}}>{t("Term 6 text 2block", language)}</span> {t("Term 6 text 2plain", language)}</TermText>
          <TermText>{t("Term 6 text 3", language)}</TermText>

          <TermTitle>{t("Term 7 title", language)}</TermTitle>
          <TermText>{t("Term 7 text 1", language)}</TermText>

          <TermTitle>{t("Term 8 title", language)}</TermTitle>
          <TermText>{t("Term 8 text 1", language)}</TermText>
          <TermText>{t("Term 8 number 1", language)}</TermText>
          <TermText>{t("Term 8 number 2", language)}</TermText>
          <TermText>{t("Term 8 number 3", language)}</TermText>
          <TermText>{t("Term 8 number 4", language)}</TermText>
          <TermText>{t("Term 8 number 5", language)}</TermText>

          <TermTitle>{t("Term 9 title", language)}</TermTitle>
          <TermText>{t("Term 9 text 1", language)}</TermText>
          <TermText>{t("Term 9 text 2", language)}</TermText>

          <TermTitle>{t("Term 10 title", language)}</TermTitle>
          <TermText>{t("Term 10 text 1", language)}</TermText>
          <TermText>{t("Term 10 text 2", language)}</TermText>

          <TermTitle>{t("Term 11 title", language)}</TermTitle>
          <TermText>{t("Term 11 text 1", language)}</TermText>
          <TermText>{t("Term 11 title 2", language)}</TermText>
          <TermText>{t("Term 11 text 2", language)}</TermText>

          <TermTitle>{t("Term 12 title", language)}</TermTitle>
          <TermText>{t("Term 12 text 1", language)}</TermText>

          <TermTitle>{t("Term 13 title", language)}</TermTitle>
          <TermText>{t("Term 13 text 1", language)}</TermText>

          <TermTitle>{t("Term 14 title", language)}</TermTitle>
          <TermText>{t("Term 14 text 1", language)}</TermText>
          <TermText>{t("Term 14 number 1", language)}</TermText>
          <TermText>{t("Term 14 number 2", language)}</TermText>
          <TermText>{t("Term 14 number 3", language)}</TermText>
          <TermText>{t("Term 14 number 4", language)}</TermText>
          <TermText>{t("Term 14 number 5", language)}</TermText>
          <TermText>{t("Term 14 number 6", language)}</TermText>
          <TermText>{t("Term 14 text 2plain", language)}<span style={{fontWeight: 'bold'}}>{t("Term 14 text 2block", language)}</span></TermText>

          <TermTitle>{t("Term 15 title", language)}</TermTitle>
          <TermText>{t("Term 15 text 1", language)}</TermText>

          <TermTitle>{t("Term 16 title", language)}</TermTitle>
          <TermText>{t("Term 16 text 1", language)}</TermText>
          <TermText>{t("Term 16 number 1", language)}</TermText>
          <TermText>{t("Term 16 number 2", language)}</TermText>
          <TermText>{t("Term 16 number 3", language)}</TermText>
          <TermText>{t("Term 16 number 4", language)}</TermText>
          <TermText>{t("Term 16 number 5", language)}</TermText>
          <TermText>{t("Term 16 text 2", language)}</TermText>

          <TermTitle>{t("Term 17 title", language)}</TermTitle>
          <TermText>{t("Term 17 text 1", language)}</TermText>

          <TermTitle>{t("Term 18 title", language)}</TermTitle>
          <TermText>{t("Term 18 text 1", language)}</TermText>

          <TermTitle>{t("Term 19 title", language)}</TermTitle>
          <TermText>{t("Term 19 text 1", language)}</TermText>

          <TermTitle>{t("Term 20 title", language)}</TermTitle>
          <TermText>{t("Term 20 text 1", language)}</TermText>

          <TermTitle>{t("Email text", language)}</TermTitle>
        </>
    )
}

export default TermsOfUse;
