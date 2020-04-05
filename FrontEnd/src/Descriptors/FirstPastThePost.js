import React from 'react';
import styled from 'styled-components'
import { Layout } from './Layout'


class FirstPastThePost extends React.Component {
    render() {
      return (
        <div>
            <Layout>
            <h3>First Past The Post</h3>
            <p>First Past The Post is a single member election, in which the candidate with the highest number
                (not necessarily a majority) of votes is elected. Each voter may only vote for one candidate.
            </p>
            </Layout>
        </div>
      );
    }
}


export default FirstPastThePost;