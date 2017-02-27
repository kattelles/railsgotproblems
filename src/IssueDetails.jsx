import React, { Component } from 'react'
import { browserHistory as history} from 'react-router'
import Comment from './Comment'
import Markdown from 'react-markdown'
import Loader from 'react-loader'
import { AddLinkstoAtSymbols } from './utils/utils'

class IssueDetails extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      state: '',
      reporterName: '',
      reporterGravatar: '',
      summary: '',
      comments: [],
      loaded: false,
    };
  }

  componentDidMount() {
    let issueNum = this.props.params.number;
    let url = `https://api.github.com/repos/rails/rails/issues/${issueNum}`;
    let commentUrl = `https://api.github.com/repos/rails/rails/issues/${issueNum}/comments`;
    this.fetchIssue(url);
    this.fetchComments(commentUrl);
  }

  fetchIssue(url) {
    fetch(url)
      .then(response => response.json())
      .then(issue =>  {
        let summary = AddLinkstoAtSymbols(issue.body);
        this.setState({
          title: issue.title,
          state: issue.state.toUpperCase(),
          createdAt: issue.created_at.substr(0, 10),
          updatedAt: issue.updated_at.substr(0, 10),
          reporterName: issue.user.login,
          reporterGravatar: issue.user.avatar_url,
          reporterUrl: issue.user.html_url,
          summary: summary,
          loaded: true
        });
      });
  }

  fetchComments(url) {
    fetch(url)
      .then(response => response.json())
      .then(comments =>  {
        this.setState({comments: comments});
      });
  }

  backButton() {
    history.push(`/`);
  }

  render() {
    let comments = this.state.comments.map(comment => {
      return(
        <Comment
          key={comment.id}
          userUrl={comment.user.html_url}
          userName={comment.user.login}
          userAvatar={comment.user.avatar_url}
          body={comment.body}/>
      );
    });

    let commentsHeader = '';
    if (comments.length > 0) {
      commentsHeader = (<div className='comments-header'>Comments</div>);
    }

    return (
      <div className='issue-details-outer'>
        <Loader color='#ff3b3f' loaded={this.state.loaded}>
          <div className='issue-details'>
            <div className='avatar'>
              <a href={this.state.reporterUrl} target='_blank'>
                <img src={this.state.reporterGravatar}
                      width='100'
                      height='100'
                      alt='avatar'/>
              </a>
              <a href={this.state.reporterUrl} target='_blank'>
                @{this.state.reporterName}
              </a>
            </div>
            <div className='issue-details-header'>
              <div className='issue-title'>{this.state.title}</div>
              <div className='issue-details-date'>
                Created: {this.state.createdAt}
              </div>
              <div className='issue-details-date'>
                Last updated: {this.state.updatedAt}
              </div>
              <div className='issue-details-state'>{this.state.state}</div>
            </div>
          </div>
          <Markdown className='markdown' source={this.state.summary} />
          {commentsHeader}
          {comments}
          <div className='back-button button' onClick={this.backButton}>
            back
          </div>
        </Loader>
      </div>
    );
  }
}

export default IssueDetails;
