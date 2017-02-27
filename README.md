# Rails Got Problems

To run `npm install` and `npm start` from project directory. Localhost:3000 will
automatically open in your browser. To run tests `npm test`.

### Features:

* makes API call to fetch all open issues in the Rails repo on Github
* fetches 25 issues at a time when user clicks 'show more results'
* allows user to click issue and be brought to 'issue details page'
* issue details page renders full summary and all comments on that issue

### With more time I'd:

* write MORE TESTS and actually make them pass. I ran out of time and was only able to write some basic snapshot tests <sub><sup>which fail</sup></sub>
* preserve scroll location when the user hits the back button
* hand roll my own code formatting so I'm not constrained by 'react-markdown'. (example of this: I can't make my @mention links have target=blank which is bad UI in it's own right but also for some reason if you navigate away and come back, all my styling disappears...)
* add filters to limit results on home page, i.e. "only show me issues from the past month"
