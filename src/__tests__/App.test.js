import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

// components
import IssuesList from '../IssuesList';
import Issue from '../Issue';
import IssueDetails from '../IssueDetails';
import Comment from '../Comment';

// smoke test
it('app renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<IssuesList />, div);
});

// snapshot tests
describe(IssuesList, () => {
  it('renders IssuesList and matches snapshot', () => {
    const component = renderer.create(
      <IssuesList />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe(Issue, () => {
  it('renders Issue and matches snapshot', () => {
    const component = renderer.create(
      <Issue/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe(IssueDetails, () => {
  it('renders IssueDetails and matches snapshot', () => {
    let params = {number: '28160'};
    const component = renderer.create(
      <IssueDetails params={params}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe(Comment, () => {
  it('renders Comment and matches snapshot', () => {
    const component = renderer.create(
      <Comment />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
