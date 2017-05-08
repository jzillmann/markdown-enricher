import React from 'react';

import GrommetApp from 'grommet/components/App'
import Article from 'grommet/components/Article'
import Header from 'grommet/components/Header'
import Section from 'grommet/components/Section'
import Title from 'grommet/components/Title'
import Footer from 'grommet/components/Footer'

import TextInputView from './TextInputView.jsx';
import RenderView from './RenderView.jsx';

import TextWithConfig from '../plain/TextWithConfig.js';

export default class App extends React.Component {

    submit(textWithConfig:TextWithConfig) {
        this.setState({
            textWithConfig: textWithConfig
        });
    }

    render() {
        const view = this.state && this.state.textWithConfig ? <RenderView textWithConfig={ this.state.textWithConfig } /> : <TextInputView submitFunction={ this.submit.bind(this) } />

        return (
            <GrommetApp centered={ false }>
              <Article>
                <Header
                        direction="row"
                        justify="between"
                        pad={ { horizontal: 'medium' } }
                        colorIndex="neutral-1">
                  <Title>
                    Markdown Enricher
                  </Title>
                </Header>
                <Section colorIndex="light-2">
                  { view }
                </Section>
                <Footer
                        appCentered={ true }
                        direction="column"
                        align="center"
                        pad="none"
                        colorIndex="light-2">
                  <p>
                    Enrich you text/markdown paragraphs!
                  </p>
                </Footer>
              </Article>
            </GrommetApp>
        );
    }

}

