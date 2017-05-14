import React from 'react';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box'
import Paragraph from 'grommet/components/Paragraph'
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import FormField from 'grommet/components/FormField'

import ReactMarkdown from 'react-markdown';

import Config from '../plain/Config.js';

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
        compiledText += `<!-- title=\"${textWithConfig.config.title}\" -->\n`;
        compiledText += `<!-- type=\"${textWithConfig.config.type}\" -->\n`;
        compiledText += `<!-- source=\"${textWithConfig.config.source}\" -->\n`;
        compiledText += `<!-- tags=\"${textWithConfig.config.tags}\" -->\n`;
        compiledText += "\n";

        const paragraphs = textWithConfig.text.split('\n\n');
        const idGenerator = createIdGenerator(textWithConfig.config);
        var numberOfParagraphs = 0;
        paragraphs.forEach(paragraph => {
            if (paragraph !== '') {
                compiledText += paragraph;
                const paragraphId = idGenerator.nextId();
                compiledText += `\n<!-- id=\"${paragraphId}\" tags=\"\"-->\n\n`;
                numberOfParagraphs++;
            }
        });


        return (
            <Box>
              <Box align='center'>
                <ul>
                  <li>
                    Number of Paragraphs:
                    { numberOfParagraphs }
                  </li>
                </ul>
              </Box>
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
            </Box>
        );
    }
}

RenderView.propTypes = {
    textWithConfig: PropTypes.object.isRequired
};

function createIdGenerator(config:Config) {
    if (config.type === 'Transcript') {
        return new PlainIdGenertor();
    } else if (config.type === 'Compilation') {
        //TODO for each paragraph we need to choose on of multiple sources
        return new ReferenceIdGenertor('TBD');
    } else {
        return new ReferenceIdGenertor(config.source);
    }
}

class PlainIdGenertor {

    constructor() {
        this.currentId = 0;
    }

    nextId() {
        return this.currentId++;
    }
}

class ReferenceIdGenertor {
    constructor(source) {
        this.source = source;
        this.currentId = 0;
    }
    nextId() {
        return `${this.source}[${this.currentId++}]`;
    }
}