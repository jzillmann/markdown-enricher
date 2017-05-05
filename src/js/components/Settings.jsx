import React from 'react';

import Box from 'grommet/components/Box'
import Article from 'grommet/components/Article'
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


export default class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: null,
            documentType: null,
            source: null,
            tags: null,
        };

        this.changeTitle = this.changeTitle.bind(this);
        this.selectType = this.selectType.bind(this);
        this.changeSource = this.changeSource.bind(this);
        this.changeTags = this.changeTags.bind(this);
        this.submit = this.submit.bind(this);
    }

    changeTitle(event) {
        this.setState({
            title: event.target.value
        });
    }

    selectType(event) {
        this.setState({
            documentType: event.value
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

    submit() {
        // event.preventDefault();
        console.debug("Submit");
        console.debug(this.state);
    // if (this.state.item) {
    //     this.props.onSubmit({
    //         item: this.state.item,
    //         status: this.state.status || 'ok'
    //     });
    // }
    }

    render() {

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
                </Header>
                <FormFields>
                  <fieldset>
                    <FormField label="Title">
                      <TextInput onDOMChange={ this.changeTitle } autoFocus />
                    </FormField>
                    <Select
                            placeHolder='None'
                            options={ ['Transcript', 'Edited Transcript', 'Translation', 'Compilation'] }
                            onChange={ this.selectType }
                            value={ this.state.documentType } />
                    <FormField label="Source (TODO don't show for compilation)">
                      <TextInput onDOMChange={ this.changeSource } />
                    </FormField>
                    <FormField label="Tags (comma seperated)" error="Don't leave blank!">
                      <TextInput onDOMChange={ this.changeTags } />
                    </FormField>
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
