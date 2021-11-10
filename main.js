// npm install scraper-instagram && node main.js :)

// create directories to save data into, if they don't already exist
const fs = require('fs');
if (!fs.existsSync('posts/last')) {
    if (!fs.existsSync('posts'))
        fs.mkdirSync('posts');

    fs.mkdirSync('posts/last');
}

if (!fs.existsSync('posts/featured'))
    fs.mkdirSync('posts/featured');

const Insta = require('scraper-instagram');
const InstaClient = new Insta();

let fno = 0, lno = 0; // number of featured posts, number of last posts
InstaClient.getHashtag('fashion') // get all fashion tagged posts. CHANGE YOUR TAG HERE!
    .then(hashtag => {
        hashtag.featuredPosts.forEach(it => InstaClient.getPost(it.shortcode) // for every featured post
            .then(post => {
                fs.writeFile('posts/featured/' + fno.toString() + '.json', JSON.stringify(post, null, 4), (e) => { // JSON serialize and store it
                    if (e)
                        throw e;
                });

                ++fno;
            }).catch(e => console.error(e))
        );

        hashtag.lastPosts.forEach(it => InstaClient.getPost(it.shortcode) // for every last post
            .then(post => {
                fs.writeFile('posts/last/' + lno.toString() + '.json', JSON.stringify(post, null, 4), (e) => { // JSON serialize and store it
                    if (e)
                        throw e;
                });

                ++lno;
            }).catch(e => console.error(e))
        );
    }).catch(e => console.error(e)
);
