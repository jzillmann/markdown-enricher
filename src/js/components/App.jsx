import React from 'react';

import GApp from 'grommet/components/App'
import Header from 'grommet/components/Header'
import Section from 'grommet/components/Section'
import Title from 'grommet/components/Title'
import Footer from 'grommet/components/Footer'

export default class App extends React.Component {

    render() {

        return (
            <GApp centered={ false }>
              <Header
                      direction="row"
                      justify="between"
                      pad={ { horizontal: 'medium' } }
                      colorIndex="neutral-1">
                <Title>
                  Markdown Enricher
                </Title>
              </Header>
              <Section>
                This is a plain section!
              </Section>
              <Footer
                      appCentered={ true }
                      direction="column"
                      align="center"
                      pad="none"
                      colorIndex="light-2">
                <p>
                  Build your ideas with <a href="http://grommet.io" target="_blank">Grommet</a>!
                </p>
              </Footer>
            </GApp>
        );
    }
}
