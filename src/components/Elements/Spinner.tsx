import * as React from "react";
import Styled from 'styled-components';

import CircularProgress from 'material-ui/CircularProgress';

const SpinnerContainer = Styled.div`
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`

export default class Spinner extends React.Component<any, any> {
    render() {
        return (
            <SpinnerContainer>
                <h3>{ "Chargement..." }</h3>
                <CircularProgress size={60} thickness={7} />
            </SpinnerContainer>
        )
    }
}