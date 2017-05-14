import React from 'react';
import PropTypes from 'prop-types';

import Heading from 'grommet/components/Heading'
import Header from 'grommet/components/Header'
import Section from 'grommet/components/Section'
import Footer from 'grommet/components/Footer'
import Button from 'grommet/components/Button'

import Form from 'grommet/components/Form'
import FormFields from 'grommet/components/FormFields'
import FormField from 'grommet/components/FormField'
import TextInput from 'grommet/components/TextInput'
import Select from 'grommet/components/Select'

import Config from '../plain/Config.js'

export default class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            submitConfigFunction: props.submitConfigFunction,
            title: '',
            type: 'Translation',
            source: '',
            tags: '',
            titleError: null,
            typeError: null,
            sourceError: null,
        };

        this.changeTitle = this.changeTitle.bind(this);
        this.selectType = this.selectType.bind(this);
        this.changeSource = this.changeSource.bind(this);
        this.changeTags = this.changeTags.bind(this);
        this.autoFill = this.autoFill.bind(this);
        this.submit = this.submit.bind(this);
    }

    changeTitle(event) {
        this.setState({
            title: event.target.value
        });
    }

    selectType(event) {
        this.setState({
            type: event.value
        });
    }

    changeSource(event) {
        this.setState({
            source: event.target.value
        });
    }

    changeTags(event) {
        this.setState({
            tags: event.target.value
        });
    }

    autoFill() {
        this.setState({
            title: 'AutoFill Title',
            type: 'Translation',
            source: 'The programmers brain',
            tags: 'test, quick'
        });
    }

    submit() {
        let titleError;
        let typeError;
        let sourceError;
        var hasErrors = false;
        if (!this.state.title) {
            titleError = "Don't leave blank!";
            hasErrors = true;
        }
        if (!this.state.type) {
            typeError = "Choose your weapon!";
            hasErrors = true;
        }
        if (this.state.type !== 'Transcript' && !this.state.source) {
            sourceError = "Don't leave blank!";
            hasErrors = true;
        }
        if (hasErrors) {
            this.setState({
                titleError: titleError,
                typeError: typeError,
                sourceError: sourceError,
            });
        } else {
            this.state.submitConfigFunction(new Config({
                title: this.state.title,
                type: this.state.type,
                source: this.state.source,
                tags: this.state.tags,
            }));
        }
    }

    render() {
        const autoFillLink = process.env.NODE_ENV === "development" ? <a onClick={ this.autoFill }>Auto-Fill</a> : undefined;
        const formFields = [];
        formFields.push(<FormField key="1" label="Title" error={ this.state.titleError }>
                          <TextInput onDOMChange={ this.changeTitle } value={ this.state.title } autoFocus />
                        </FormField>);
        if (this.state.type !== 'Transcript') {
            formFields.push(<FormField key="2" label="Source" error={ this.state.sourceError }>
                              <TextInput onDOMChange={ this.changeSource } value={ this.state.source } />
                            </FormField>);
        }

        formFields.push(<FormField key="3" label="Tags (comma seperated)">
                          <TextInput onDOMChange={ this.changeTags } value={ this.state.tags } />
                        </FormField>);

        return (
            <Form pad={ { vertical: 'small', horizontal: 'large' } }>
              <Header>
                <Heading>
                  Settings
                </Heading>
              </Header>
              <Section>
                <Header>
                  <h3>Document Tag</h3>
                  { autoFillLink }
                </Header>
                <FormFields>
                  <fieldset>
                    <FormField label="Type" error={ this.state.typeError }>
                      <Select
                              placeHolder='None'
                              options={ ['Transcript', 'Edited Transcript', 'Translation', 'Compilation'] }
                              onChange={ this.selectType }
                              value={ this.state.type } />
                    </FormField>
                    { formFields }
                  </fieldset>
                </FormFields>
              </Section>
              <Footer pad={ { vertical: 'medium' } }>
                <Button label="OK" primary={ true } onClick={ this.submit } />
              </Footer>
            </Form>
        );
    }
}

Settings.propTypes = {
    submitConfigFunction: PropTypes.func.isRequired
};