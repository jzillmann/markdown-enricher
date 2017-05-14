import React from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box'
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import FormField from 'grommet/components/FormField'

import ReactMarkdown from 'react-markdown';

export default class RenderView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            renderMarkdown: false,
        };
    }

    showRendered(renderMarkdown) {
        this.setState({
            renderMarkdown: renderMarkdown
        });
    }

    render() {
        const textWithConfig = this.props.textWithConfig;
        var compiledText = "";
        compiledText += `<!-- title=\"${textWithConfig.config.title}\" -->\n`
        compiledText += `<!-- type=\"${textWithConfig.config.type}\" -->\n`
        compiledText += `<!-- source=\"${textWithConfig.config.source}\" -->\n`
        compiledText += `<!-- tags=\"${textWithConfig.config.tags}\" -->\n`
        compiledText += "\n";
        compiledText += textWithConfig.text;

        return (
            <Tabs justify="center">
              <Tab title='Text'>
                <Box
                     margin={ { horizontal: 'large' } }
                     align='center'
                     focusable={ false }
                     colorIndex="light-1">
                  <FormField>
                    <textarea rows="27" value={ compiledText } readOnly />
                  </FormField>
                </Box>
              </Tab>
              <Tab title='Markdown'>
                <Box
                     margin={ { horizontal: 'large' } }
                     align='center'
                     focusable={ false }
                     colorIndex="light-1">
                  <ReactMarkdown source={ compiledText } />
                </Box>
              </Tab>
            </Tabs>
        );
    }
}

RenderView.propTypes = {
    textWithConfig: PropTypes.object.isRequired
};