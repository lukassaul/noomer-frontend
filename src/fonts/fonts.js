import { createGlobalStyle } from 'styled-components';

import HelveticaLTStd from './HelveticaLTStd-Light.woff';


export default createGlobalStyle`
    @font-face {
        font-family: 'Helvetica';
        src: local('Helvetica'),
        url(${HelveticaLTStd}) format('woff'),
    }
`;