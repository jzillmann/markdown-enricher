import React from 'react';
import PropTypes from 'prop-types';

import Button from 'grommet/components/Button'
import ProcessIcon from 'grommet/components/icons/base/RadialSelected';
import Box from 'grommet/components/Box'
import FormField from 'grommet/components/FormField'
import Layer from 'grommet/components/Layer'

import Settings from './Settings.jsx';
import TextWithConfig from '../plain/TextWithConfig.js'

export default class TextInputView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: null,
            popupCancelled: false,
            showSettings: false,
            submitFunction: props.submitFunction
        };
    }

    onTextChange(text) {
        const textValue = text.target.value ? text.target.value : null;
        const showSettings = !this.state.text && textValue && textValue.length > 50
        this.setState({
            text: textValue,
            showSettings: showSettings
        });
    }

    processClicked() {
        this.setState({
            showSettings: true
        });
    }

    settingsCancelled() {
        this.setState({
            showSettings: false
        });
    }

    submitConfig(config) {
        this.state.submitFunction(new TextWithConfig(this.state.text, config))
    }

    render() {
        const layer = (this.state.showSettings)
            ? <Layer
                     align='top'
                     closer={ true }
                     flush={ true }
                     onClose={ this.settingsCancelled.bind(this) }>
                <Settings submitConfigFunction={ this.submitConfig.bind(this) } />
              </Layer>
            : null;

        const button = this.state.text ? <Button
                                                 label='Process'
                                                 icon={ <ProcessIcon /> }
                                                 primary={ true }
                                                 accent={ true }
                                                 onClick={ this.processClicked.bind(this) }>
                                         </Button> :
            <Button title="Enter your text first!" accent={ true }>
            </Button>

        return (
            <Box>
              <Box margin='small' align='center' focusable={ false }>
                { button }
              </Box>
              <Box align='center' onClick={ undefined }>
                { layer }
                <FormField label="Paste Your Text Here">
                  <textarea rows="27" onChange={ this.onTextChange.bind(this) } autoFocus/>
                </FormField>
              </Box>
            </Box>
        );
    }

}

TextInputView.propTypes = {
    submitFunction: PropTypes.func.isRequired
};