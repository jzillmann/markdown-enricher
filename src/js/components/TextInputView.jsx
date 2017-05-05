import React from 'react';

import Button from 'grommet/components/Button'
import ProcessIcon from 'grommet/components/icons/base/RadialSelected';
import Box from 'grommet/components/Box'
import FormField from 'grommet/components/FormField'
import Layer from 'grommet/components/Layer'

import Settings from './Settings.jsx';

export default class TextInputView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: null,
            popupCancelled: false,
            showSettings: false,
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

    render() {
        const layer = (this.state.showSettings)
            ? <Layer
                     align='top'
                     closer={ true }
                     flush={ true }
                     onClose={ this.settingsCancelled.bind(this) }>
                <Settings/>
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