import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { t } from '../../i18n';
import { RootState } from "../../app/store";
import { TermTitle, TermText, PrivacySubtitle, BoldText } from './styles';

interface MailToProps {
	mailto: any;
	label: any;
}

function PrivacyPolicy(){
    const { language } = useSelector((state: RootState) => state.language)
    const ButtonMailto = ({ mailto, label } : MailToProps) => {
      return (
          <Link
              to='#'
              onClick={(e) => {
                  window.location = mailto;
                  e.preventDefault();
              }}
          >
              {label}
          </Link>
      );
    };

    return (
        <>
          <TermText>{t("DPP text 1", language)}</TermText>
          <TermText>{t("DPP text 2", language)}</TermText>
          <ul style={{padding: '0 1em'}}>
            <li>{t("DPP list 1", language)}</li>
            <li>{t("DPP list 2", language)}</li>
            <li>{t("DPP list 3", language)}</li>
          </ul>

          <PrivacySubtitle>{t("Consent Management", language)}</PrivacySubtitle>
          <PrivacySubtitle>{t("Policies title", language)}</PrivacySubtitle>
          <TermText>{t("Policies text", language)}</TermText>

          <PrivacySubtitle>{t("Cookie Policy", language)}</PrivacySubtitle>
          <PrivacySubtitle>{t("Terms and Conditions title", language)}</PrivacySubtitle>
          <BoldText>{t("Terms and Conditions text", language)}</BoldText>

          <TermTitle style={{marginTop: '1em'}}>{t("Terms and Conditions 1 title", language)}</TermTitle>
          <PrivacySubtitle>{t("Terms and Conditions 1 text 1", language)}</PrivacySubtitle>
          <TermText><BoldText>{t("Terms and Conditions 1 text 2block", language)}</BoldText>{t("Terms and Conditions 1 text 2plain", language)}</TermText>
          <TermText>{t("Terms and Conditions 1 text 3", language)}</TermText>
          <TermText>{t("Terms and Conditions 1 text 4", language)}</TermText>
          <TermText><BoldText>{t("Terms and Conditions 1 text 5block", language)}</BoldText>{t("Terms and Conditions 1 text 5plain", language)}</TermText>
          <TermText>{t("Terms and Conditions 1 text 6", language)}</TermText>
          <TermText>{t("Terms and Conditions 1 text 7", language)}</TermText>
          <PrivacySubtitle>{t("Terms and Conditions 1 text 8", language)}</PrivacySubtitle>
          <TermText>{t("Terms and Conditions 1 text 9", language)}</TermText>
          <TermText>{t("Terms and Conditions 1 text 10", language)}</TermText>
          <TermText>{t("Terms and Conditions 1 text 11", language)}</TermText>
          <TermText>{t("Terms and Conditions 1 text 12", language)}</TermText>
          <ul style={{padding: '0 1em'}}>
            <li>{t("Terms and Conditions 1 text 13", language)}</li>
          </ul>

          <TermTitle style={{marginTop: '1em'}}>{t("Terms and Conditions 2 title", language)}</TermTitle>
          <TermText><BoldText>{t("Terms and Conditions 2 text 2block", language)}</BoldText>{t("Terms and Conditions 2 text 2plain", language)}</TermText>
          <TermText>{t("Terms and Conditions 2 text 3", language)}</TermText>
          <TermText>{t("Terms and Conditions 2 text 4", language)}</TermText>
          <ul style={{padding: '0 1em'}}>
            <li><TermText><BoldText>{t("Terms and Conditions 2 list1 1block", language)}</BoldText>{t("Terms and Conditions 2 list1 1plain", language)}</TermText></li>
            <li><TermText><BoldText>{t("Terms and Conditions 2 list1 2block", language)}</BoldText>{t("Terms and Conditions 2 list1 2plain", language)}</TermText></li>
            <li><TermText><BoldText>{t("Terms and Conditions 2 list1 3block", language)}</BoldText>{t("Terms and Conditions 2 list1 3plain", language)}</TermText></li>
            <li><TermText><BoldText>{t("Terms and Conditions 2 list1 4block", language)}</BoldText>{t("Terms and Conditions 2 list1 4plain", language)}</TermText></li>
            <li><TermText><BoldText>{t("Terms and Conditions 2 list1 5block", language)}</BoldText>{t("Terms and Conditions 2 list1 5plain", language)}</TermText></li>
            <li><TermText><BoldText>{t("Terms and Conditions 2 list1 6block", language)}</BoldText>{t("Terms and Conditions 2 list1 6plain", language)}</TermText></li>
            <li><TermText><BoldText>{t("Terms and Conditions 2 list1 7block", language)}</BoldText>{t("Terms and Conditions 2 list1 7plain", language)}</TermText></li>
          </ul>
          <PrivacySubtitle>{t("Terms and Conditions 2 text 5block", language)}</PrivacySubtitle>
          <ul style={{padding: '0 1em'}}>
            <li><TermText><BoldText>{t("Terms and Conditions 2 list2 1block", language)}</BoldText>{t("Terms and Conditions 2 list2 1plain", language)}</TermText></li>
            <li><TermText><BoldText>{t("Terms and Conditions 2 list2 2block", language)}</BoldText>{t("Terms and Conditions 2 list2 2plain", language)}</TermText></li>
            <li><TermText><BoldText>{t("Terms and Conditions 2 list2 3block", language)}</BoldText>{t("Terms and Conditions 2 list2 3plain", language)}</TermText></li>
            <li><TermText><BoldText>{t("Terms and Conditions 2 list2 4block", language)}</BoldText>{t("Terms and Conditions 2 list2 4plain", language)}</TermText></li>
            <li><TermText><BoldText>{t("Terms and Conditions 2 list2 5block", language)}</BoldText>{t("Terms and Conditions 2 list2 5plain", language)}</TermText></li>
            <li><TermText><BoldText>{t("Terms and Conditions 2 list2 6block", language)}</BoldText>{t("Terms and Conditions 2 list2 6plain", language)}</TermText></li>
            <li><TermText><BoldText>{t("Terms and Conditions 2 list2 7block", language)}</BoldText>{t("Terms and Conditions 2 list2 7plain", language)}</TermText></li>
          </ul>
          <PrivacySubtitle>{t("Terms and Conditions 2 text 6block", language)}</PrivacySubtitle>
          <TermText>{t("Terms and Conditions 2 text 7", language)}</TermText>

          <TermTitle style={{marginTop: '1em'}}>{t("Terms and Conditions 3 title", language)}</TermTitle>
          <TermText><BoldText>{t("Terms and Conditions 3 text 1block", language)}</BoldText>{t("Terms and Conditions 3 text 1plain", language)}</TermText>
          <TermText>{t("Terms and Conditions 3 text 2", language)}</TermText>
          <ul style={{padding: '0 1em'}}>
            <li><TermText><BoldText>{t("Terms and Conditions 3 list1 1block", language)}</BoldText>{t("Terms and Conditions 3 list1 1plain", language)}</TermText></li>
            <li><TermText><BoldText>{t("Terms and Conditions 3 list1 2block", language)}</BoldText>{t("Terms and Conditions 3 list1 2plain", language)}</TermText></li>
            <li><TermText><BoldText>{t("Terms and Conditions 3 list1 3block", language)}</BoldText>{t("Terms and Conditions 3 list1 3plain", language)}</TermText></li>
            <li><TermText><BoldText>{t("Terms and Conditions 3 list1 4block", language)}</BoldText>{t("Terms and Conditions 3 list1 4plain", language)}</TermText></li>
            <li><TermText><BoldText>{t("Terms and Conditions 3 list1 5block", language)}</BoldText>{t("Terms and Conditions 3 list1 5plain", language)}</TermText></li>
          </ul>
          <PrivacySubtitle>{t("Terms and Conditions 3 text 3", language)}</PrivacySubtitle>
          <ul style={{padding: '0 1em'}}>
            <li><TermText><BoldText>{t("Terms and Conditions 3 list2 1block", language)}</BoldText>{t("Terms and Conditions 3 list2 1plain", language)}</TermText></li>
            <li><TermText><BoldText>{t("Terms and Conditions 3 list2 2block", language)}</BoldText>{t("Terms and Conditions 3 list2 2plain", language)}</TermText></li>
          </ul>

          <TermTitle style={{marginTop: '1em'}}>{t("Terms and Conditions 4 title", language)}</TermTitle>
          <TermText><BoldText>{t("Terms and Conditions 4 text 1block", language)}</BoldText>{t("Terms and Conditions 4 text 1plain", language)}</TermText>
          <TermText>{t("Terms and Conditions 4 text 2", language)}</TermText>

          <TermTitle style={{marginTop: '1em'}}>{t("Terms and Conditions 5 title", language)}</TermTitle>
          <TermText><BoldText>{t("Terms and Conditions 5 text 1block", language)}</BoldText>{t("Terms and Conditions 5 text 1plain", language)}</TermText>
          <TermText>{t("Terms and Conditions 5 text 2", language)}</TermText>
          <TermText>{t("Terms and Conditions 5 text 3", language)}</TermText>

          <TermTitle style={{marginTop: '1em'}}>{t("Terms and Conditions 6 title", language)}</TermTitle>
          <TermText><BoldText>{t("Terms and Conditions 6 text 1block", language)}</BoldText>{t("Terms and Conditions 6 text 1plain", language)}</TermText>
          <TermText>{t("Terms and Conditions 6 text 2", language)}</TermText>
          <TermText>{t("Terms and Conditions 6 text 3", language)}</TermText>

          <TermTitle style={{marginTop: '1em'}}>{t("Terms and Conditions 7 title", language)}</TermTitle>
          <TermText><BoldText>{t("Terms and Conditions 7 text 1block", language)}</BoldText>{t("Terms and Conditions 7 text 1plain", language)}</TermText>
          <TermText>{t("Terms and Conditions 7 text 2", language)}</TermText>

          <TermTitle style={{marginTop: '1em'}}>{t("Terms and Conditions 8 title", language)}</TermTitle>
          <TermText><BoldText>{t("Terms and Conditions 8 text 1block", language)}</BoldText>{t("Terms and Conditions 8 text 1plain", language)}</TermText>
          <TermText>{t("Terms and Conditions 8 text 2", language)} <ButtonMailto label="info@dailai.io" mailto="mailto:info@dailai.io" /></TermText>

          <TermTitle style={{marginTop: '1em'}}>{t("Terms and Conditions 9 title", language)}</TermTitle>
          <TermText><BoldText>{t("Terms and Conditions 9 text 1block", language)}</BoldText>{t("Terms and Conditions 9 text 1plain", language)}</TermText>
          <TermText>{t("Terms and Conditions 9 text 2", language)}</TermText>
          <TermText>{t("Terms and Conditions 9 number 1", language)}</TermText>
          <TermText>{t("Terms and Conditions 9 number 2", language)}</TermText>
          <TermText>{t("Terms and Conditions 9 number 3", language)}</TermText>
          <TermText>{t("Terms and Conditions 9 number 4", language)}</TermText>
          <TermText>{t("Terms and Conditions 9 text 3", language)}</TermText>
          <TermText>{t("Terms and Conditions 9 text 4", language)} <a href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.html" target="blank">https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.html</a></TermText>
          <TermText>{t("Terms and Conditions 9 text 5", language)} <a href="https://www.edoeb.admin.ch/edoeb/en/home.html" target="blank">https://www.edoeb.admin.ch/edoeb/en/home.html</a></TermText>
          <TermText>{t("Terms and Conditions 9 text 6", language)} <ButtonMailto label="info@dailai.io" mailto="mailto:info@dailai.io" /></TermText>
          <PrivacySubtitle>{t("Terms and Conditions 9 text 7", language)}</PrivacySubtitle>
          <TermText>{t("Terms and Conditions 9 text 8", language)}</TermText>
          <ul style={{padding: '0 1em'}}>
            <li><TermText>{t("Terms and Conditions 9 list1 1", language)}</TermText></li>
            <li><TermText>{t("Terms and Conditions 9 list1 2", language)}</TermText></li>
          </ul>
          <TermText>{t("Terms and Conditions 9 text 9", language)}</TermText>
          <TermText>
            <BoldText>{t("Terms and Conditions 9 text 10block", language)}</BoldText>
            {t("Terms and Conditions 9 text 10plain", language)}
            <a href="http://www.aboutads.info/choices/" target="blank">http://www.aboutads.info/choices/</a>
          </TermText>
          <TermText>{t("Terms and Conditions 9 text 11", language)}</TermText>
          <ul style={{padding: '0 1em'}}>
            <li><TermText>{t("Terms and Conditions 9 list2 1", language)}</TermText></li>
          </ul>

          <TermTitle style={{marginTop: '1em'}}>{t("Terms and Conditions 10 title", language)}</TermTitle>
          <TermText>{t("Terms and Conditions 10 text 1", language)}</TermText>

          <TermTitle style={{marginTop: '1em'}}>{t("Terms and Conditions 11 title", language)}</TermTitle>
          <TermText><BoldText>{t("Terms and Conditions 11 text 1block", language)}</BoldText>{t("Terms and Conditions 11 text 1plain", language)}</TermText>
          <TermText>{t("Terms and Conditions 11 text 2", language)}</TermText>
          <TermText>{t("Terms and Conditions 11 text 3", language)}</TermText>
          <PrivacySubtitle>{t("Terms and Conditions 11 text 4", language)}</PrivacySubtitle>
          <TermText>{t("Terms and Conditions 11 text 5", language)}</TermText>
          <TermText>{t("Terms and Conditions 11 text 6", language)}</TermText>
          <TermText>{t("Terms and Conditions 11 text 7", language)}</TermText>
          <TermText>{t("Terms and Conditions 11 text 8", language)}</TermText>
          <PrivacySubtitle>{t("Terms and Conditions 11 text 9", language)}</PrivacySubtitle>
          <TermText>{t("Terms and Conditions 11 text 10", language)}</TermText>
          <table className="wholetableBorder">
            <tr>
              <th className="tableBorder">{t("Category", language)}</th>
              <th className="tableBorder">{t("Examples", language)}</th>
              <th className="tableBorder">{t("Collected", language)}</th>
            </tr>
            <tr>
              <td className="tableBorder">{t("Terms and Conditions table category a", language)}</td>
              <td className="tableBorder">{t("Terms and Conditions table examples a", language)}</td>
              <td className="tableBorder">{t("NO", language)}</td>
            </tr>
            <tr>
              <td className="tableBorder">{t("Terms and Conditions table category b", language)}</td>
              <td className="tableBorder">{t("Terms and Conditions table examples b", language)}</td>
              <td className="tableBorder">{t("YES", language)}</td>
            </tr>
            <tr>
              <td className="tableBorder">{t("Terms and Conditions table category c", language)}</td>
              <td className="tableBorder">{t("Terms and Conditions table examples c", language)}</td>
              <td className="tableBorder">{t("NO", language)}</td>
            </tr>
            <tr>
              <td className="tableBorder">{t("Terms and Conditions table category d", language)}</td>
              <td className="tableBorder">{t("Terms and Conditions table examples d", language)}</td>
              <td className="tableBorder">{t("NO", language)}</td>
            </tr>
            <tr>
              <td className="tableBorder">{t("Terms and Conditions table category e", language)}</td>
              <td className="tableBorder">{t("Terms and Conditions table examples e", language)}</td>
              <td className="tableBorder">{t("NO", language)}</td>
            </tr>
            <tr>
              <td className="tableBorder">{t("Terms and Conditions table category f", language)}</td>
              <td className="tableBorder">{t("Terms and Conditions table examples f", language)}</td>
              <td className="tableBorder">{t("NO", language)}</td>
            </tr>
            <tr>
              <td className="tableBorder">{t("Terms and Conditions table category g", language)}</td>
              <td className="tableBorder">{t("Terms and Conditions table examples g", language)}</td>
              <td className="tableBorder">{t("YES", language)}</td>
            </tr>
            <tr>
              <td className="tableBorder">{t("Terms and Conditions table category h", language)}</td>
              <td className="tableBorder">{t("Terms and Conditions table examples h", language)}</td>
              <td className="tableBorder">{t("NO", language)}</td>
            </tr>
            <tr>
              <td className="tableBorder">{t("Terms and Conditions table category i", language)}</td>
              <td className="tableBorder">{t("Terms and Conditions table examples i", language)}</td>
              <td className="tableBorder">{t("NO", language)}</td>
            </tr>
            <tr>
              <td className="tableBorder">{t("Terms and Conditions table category j", language)}</td>
              <td className="tableBorder">{t("Terms and Conditions table examples j", language)}</td>
              <td className="tableBorder">{t("NO", language)}</td>
            </tr>
            <tr>
              <td className="tableBorder">{t("Terms and Conditions table category k", language)}</td>
              <td className="tableBorder">{t("Terms and Conditions table examples k", language)}</td>
              <td className="tableBorder">{t("NO", language)}</td>
            </tr>
          </table>
          <TermText>{t("Terms and Conditions 11 text 11", language)}</TermText>
          <ul style={{padding: '0 1em'}}>
            <li><TermText>{t("Terms and Conditions 11 list1 1", language)}</TermText></li>
            <li><TermText>{t("Terms and Conditions 11 list1 2", language)}</TermText></li>
            <li><TermText>{t("Terms and Conditions 11 list1 3", language)}</TermText></li>
          </ul>
          <PrivacySubtitle>{t("Terms and Conditions 11 text 12", language)}</PrivacySubtitle>
          <TermText>{t("Terms and Conditions 11 text 13", language)}</TermText>
          <TermText>{t("Terms and Conditions 11 text 14", language)}</TermText>
          <TermText>{t("Terms and Conditions 11 text 15", language)}</TermText>
          <PrivacySubtitle>{t("Terms and Conditions 11 text 16", language)}</PrivacySubtitle>
          <TermText>{t("Terms and Conditions 11 text 17", language)}</TermText>
          <TermText>{t("Terms and Conditions 11 text 18", language)}</TermText>
          <TermText>{t("Terms and Conditions 11 text 19", language)}</TermText>
          <TermText>{t("Terms and Conditions 11 text 20", language)}</TermText>
          <PrivacySubtitle>{t("Terms and Conditions 11 text 21", language)}</PrivacySubtitle>
          <TermText>{t("Terms and Conditions 11 text 22", language)}</TermText>
          <TermText>{t("Terms and Conditions 11 text 23", language)}</TermText>
          <TermText>{t("Terms and Conditions 11 text 24", language)}</TermText>
          <ul style={{padding: '0 1em'}}>
            <li><TermText>{t("Terms and Conditions 11 list2 1", language)}</TermText></li>
            <li><TermText>{t("Terms and Conditions 11 list2 2", language)}</TermText></li>
            <li><TermText>{t("Terms and Conditions 11 list2 3", language)}</TermText></li>
            <li><TermText>{t("Terms and Conditions 11 list2 4", language)}</TermText></li>
            <li><TermText>{t("Terms and Conditions 11 list2 5", language)}</TermText></li>
            <li><TermText>{t("Terms and Conditions 11 list2 6", language)}</TermText></li>
            <li><TermText>{t("Terms and Conditions 11 list2 7", language)}</TermText></li>
          </ul>
          <TermText>{t("Terms and Conditions 11 text 25", language)}</TermText>
          <TermText>{t("Terms and Conditions 11 text 26", language)}</TermText>
          <TermText>{t("Terms and Conditions 11 text 27", language)}</TermText>
          <PrivacySubtitle>{t("Terms and Conditions 11 text 28", language)}</PrivacySubtitle>
          <TermText>{t("Terms and Conditions 11 text 29", language)}</TermText>
          <TermText>{t("Terms and Conditions 11 text 30", language)}</TermText>
          <TermText>{t("Terms and Conditions 11 text 31", language)}</TermText>
          <ul style={{padding: '0 1em'}}>
            <li><TermText>{t("Terms and Conditions 11 list3 1", language)}</TermText></li>
            <li><TermText>{t("Terms and Conditions 11 list3 2", language)}</TermText></li>
            <li><TermText>{t("Terms and Conditions 11 list3 3", language)}</TermText></li>
          </ul>
          <TermText>{t("Terms and Conditions 11 text 32", language)}</TermText>

          <TermTitle style={{marginTop: '1em'}}>{t("Terms and Conditions 12 title", language)}</TermTitle>
          <TermText><BoldText>{t("Terms and Conditions 12 text 1block", language)}</BoldText>{t("Terms and Conditions 12 text 1plain", language)}</TermText>
          <TermText>{t("Terms and Conditions 12 text 2", language)}</TermText>

          <TermTitle style={{marginTop: '1em'}}>{t("Terms and Conditions 13 title", language)}</TermTitle>
          <TermText>{t("Terms and Conditions 13 text 1a", language)}<ButtonMailto label="info@dailai.io" mailto="mailto:info@dailai.io" /> <span>{t("Terms and Conditions 13 text 1b", language)}</span></TermText>
          <TermText>{t("Terms and Conditions 13 text 2", language)}</TermText>
          <TermText>{t("Terms and Conditions 13 text 3", language)}</TermText>

          <TermTitle style={{marginTop: '1em'}}>{t("Terms and Conditions 14 title", language)}</TermTitle>
          <TermText>{t("Terms and Conditions 14 text 1", language)}<ButtonMailto label="here" mailto="mailto:info@dailai.io" /></TermText>
        </>
    )
}

export default PrivacyPolicy;
