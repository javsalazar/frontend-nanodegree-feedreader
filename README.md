# Project Overview

In this project you are given a web-based application that reads RSS feeds. The original developer of this application clearly saw the value in testing, they've already included [Jasmine](http://jasmine.github.io/) and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and we're now left with an application with an incomplete test suite. That's where you come in.


## Why this Project?

Testing is an important part of the development process and many organizations practice a standard of development known as "test-driven development". This is when developers write tests first, before they ever start developing their application. All the tests initially fail and then they start writing application code to make these tests pass.

Whether you work in an organization that uses test-driven development or in an organization that uses tests to make sure future feature development doesn't break existing features, it's an important skill to have!


## Tests

* RSS feeds are defined
* RSS feeds have URL defined, not empty, and is a string
* RSS feeds have name defined, not emtpy, and is a string
* By default menu is hidden
* Menu toggles visibility as menu icon is clicked
* On feed selection initial entries exists
* On feed change content changes

## Additional Tests

* Add feed to feeds menu - make sure we can add additional feed sources to menu.
* Remove feed from feeds menu - make sure we can remove any feeds we don't want from menu.

while the actual functions for above tests were implemented (in js/app.js) the button/link to trigger them were not. To implement insert a link/button to "add" feed to list somewhere in the menu and a "remove" link/button next to each feed entry. 


## How to use

1. Clone repository to your computer: `git@github.com:javsalazar/frontend-nanodegree-feedreader.git` or download by clicking on 'download zip' button.

2. open index.html in browser and at bottom of page all jasmine tests will be displayed with their results.


## Improved view of feeds

Added the date and summary of each entry to be displayed.  Originally created a test for the existstance of a summary then decided against it.  A summary is optional (as seen by HTML5 Rocks feed) so no need to have a failing test on something that may be optional. 

