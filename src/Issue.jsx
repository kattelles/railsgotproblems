import React, { Component } from 'react'
import { browserHistory as history} from 'react-router'
import Markdown from 'react-markdown'
import { AddLinkstoAtSymbols, FindAllValuesInString } from './utils/utils'

class Issue extends Component {
  constructor() {
    super();
    this.state = {
      issueNumber: '',
      issueTitle: '',
      labels: [],
      reporterName: '',
      reporterGravatar: '',
      summary: ''
    };

    this.viewDetails = this.viewDetails.bind(this);
  }

  componentDidMount() {
    let issue = this.props.issue;
    let summary = this.parseSummary(issue.body);
    let title = this.parseTitle(issue.title);
    this.setState({
      issueNumber: issue.number,
      url: issue.html_url,
      issueTitle: title,
      labels: issue.labels,
      reporterName: issue.user.login,
      reporterGravatar: issue.user.avatar_url,
      reporterUrl: issue.user.html_url,
      summary: summary
    });
  }

  parseTitle(title) {
    // hack to fix prevent long titles without spaces from overflowing
    if (title.substr(0, 50).indexOf(' ') === -1) {
      return title.substr(0, 50) + '...';
    }
    return title;
  }

  parseSummary(summary) {
    let shortSummary = summary.slice(0, 140);
    let parsedSummary = '';
    let periods = FindAllValuesInString(shortSummary, '.');
    if (periods.length > 0) {
      let periodIdx = periods.pop();
      parsedSummary = shortSummary.slice(0, periodIdx) + '...';
    } else {
      let spaces= FindAllValuesInString(shortSummary, ' ');
      let spaceIdx = spaces.pop();
      parsedSummary = shortSummary.slice(0, spaceIdx) + '...';
    }
    if (parsedSummary.length > 0) {
      return AddLinkstoAtSymbols(parsedSummary);
    }
    return AddLinkstoAtSymbols(shortSummary);
  }

  viewDetails(event) {
    history.push(`/issue/${this.state.issueNumber}`);
  }

  render() {
    let labels = this.state.labels.map(label => {
      let labelUrl = `https://github.com/search?q=topic%3A${label.name}+org%3Aruby&type=Issues`;
      return(<div className='issue-label'
              key={label.id}>
              <a href={labelUrl}
                  className='issue-label'
                  target='_blank'>
                {label.name}
              </a>
            </div>);
    });

    return (
      <div onClick={this.viewDetails} className='issue'>
        <div className='avatar'>
          <a href={this.state.url}
            target='_blank'
            className='issue-number'>
            #{this.state.issueNumber}
          </a>
          <a href={this.state.reporterUrl} target='_blank'>
            <img alt='avatar' src={this.state.reporterGravatar}/>
          </a>
          <a href={this.state.reporterUrl} target='_blank'>
            @{this.state.reporterName}
          </a>
        </div>
        <div className='issue-right'>
          <div className='issue-title'>{this.state.issueTitle}</div>
          <div className='labels-group'>{labels}</div>
          <Markdown
            className='issue-summary markdown'
            source={this.state.summary}/>
        </div>
      </div>
    );
  }
}

export default Issue;
