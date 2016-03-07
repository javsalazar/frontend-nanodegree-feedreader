/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* loop through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('entries have URL defined and nonzero', function() {
            allFeeds.forEach(function (el) {
                // is defined
                expect(el.url).toBeDefined();
                // is a string
                expect(el.url).toEqual(jasmine.any(String));
                // is not blank
                expect(el.url.length).not.toBe(0);
                // correct url format (regex from: http://regexr.com/39nr7) overkill ????
                expect(el.url).toMatch(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
            });
        });

        /* loop through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('entries have name defined and nonzero', function() {
            allFeeds.forEach(function (el) {
                // is defined
                expect(el.name).toBeDefined();
                // is a string
                expect(el.name).toEqual(jasmine.any(String));
                // is not blank
                expect(el.name.length).not.toBe(0);
            });
        });

        /* Ensure that a new feed can be added to
         * the feed list array.
         */
        it('can add a feed', function() {

            // index of new feed will be equal to length of array prior to addition (since zero based)
            var index = allFeeds.length,
            thisFeed = new Feed({name: "feedname", url: "http://test.com/feed", id: allFeeds.length});

            // will need a function to add new feed
            addFeed(allFeeds, thisFeed);

            // with this test we see we will need a getFeed function that will accept array and integer index
            expect(getFeed(allFeeds, index)).toBe(thisFeed);
        });

        /* Ensure that a feed from list array can be removed */
        it('can remove a feed', function() {

            var index = allFeeds.length -  1;
            // will need a function to remove a feed that accepts array and index of entry to remove
            removeFeed(allFeeds, index);

            // will need a getFeed function that will accept integer index
            expect(getFeed(allFeeds,index)).not.toBeDefined();
        });

    });

    /* "The menu" test suite */
    describe('The menu', function() {
       
        var menuButton = $('.menu-icon-link'),
            menuVisible = function () {
                return  $('body').hasClass('menu-hidden');
            };

        /* Ensures the menu element is hidden by default.*/
        it('is intially hidden', function() {
            expect(menuVisible()).toBeTruthy();
        });

         /* Ensures the menu changes visibility when the menu icon is clicked. */
        it('changes visibility when clicked', function() {
            /* first click - show menu */
            menuButton.click();
            expect(menuVisible()).toBeFalsy();

            /* second click - hide menu*/
            menuButton.click();
            expect(menuVisible()).toBeTruthy();
        });
    });  

    /* "Initial Entries" test suite */
    describe("Initial Entries",function () {

        /* make use of beforeEach and done function since loadFeed is async. */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        /* Ensures when the loadFeed function is called and completes its work, 
         * there is at least a single .entry element within the .feed container.
         */
        it('has at least one entry', function() {
            var entries = $('.feed .entry');
            expect(entries.length).toBeGreaterThan(0);
        });

    });

    /* "New Feed Selection" test suite */
    describe('New Feed Selection', function() {

        var beforeContent;

        /* make use of beforeEach and done function since loadFeed is async. */
        beforeEach(function (done) {
            loadFeed(0, function () {
                beforeContent = $('.feed').text();
                done();
            });
        });
        
        /* Ensure when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('on feed change content changes', function(done) {
            loadFeed(1, function () {
                afterContent = $('.feed').text();
                expect(afterContent).not.toBe(beforeContent);
                done();
            });
        });

        /* Probably not necessary but display feed 0,
         * as expected if tests are not run.
         */
        afterAll(function () {
            loadFeed(0);
        });
    });

}());
