import React, {useEffect, useState} from 'react'
import RatingFormEdit from '../../components/RatingFormEdit';
import Footer from '../../components/Footer';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import { RootState } from "../../app/store";
import { t } from '../../i18n';
import Alert from '../../components/AlertMessage';
import { CenteredContainer, CommonContentContainer } from '../../globalStyles';


function RatingEdit() {
    const navigate = useNavigate()
    const { language } = useSelector((state: RootState) => state.language)
    const { errorEditRatingMessage, isEditRatingFetching, isEditRatingSuccess } = useSelector((state: RootState) => state.rating)
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
      if(isEditRatingSuccess) navigate('/dashboard')
    }, [isEditRatingSuccess])

    useEffect(() => {
        if (isEditRatingFetching) {
            const handle = setInterval(() => {
                setProgress(progress => progress + 10)
                if (progress > 100) { return }
            }, 100);
            return () => clearInterval(handle);
        }
        setProgress(100)
    }, [isEditRatingFetching, progress])
    return (
      <>
        <CommonContentContainer>
        {isEditRatingFetching ? <LoadingBar
            color='#f11946'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
        /> : null}
        {errorEditRatingMessage ?
            <Alert
                text={errorEditRatingMessage}
                bgColor="#f8d7da"
                txtColor="#721c24"
            /> : null
        }
          <CenteredContainer style={{margin: '2em 0'}}>
            <h1>{t("Edit rating", language)}</h1>
          </CenteredContainer>
          <RatingFormEdit />
        </CommonContentContainer>
        <Footer />
      </>
    )
}

export default RatingEdit;
