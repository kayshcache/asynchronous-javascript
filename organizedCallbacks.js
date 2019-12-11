const request = require('request');

const url = 'https://maciejtreder.github.io/asynchronous-javascript/';

function calculateAverageScore(reviews, movie, director, checkedSoFar, movies) {
    checkedSoFar.count++;
    aggregatedScore = 0;
    count = 0;
    reviews.forEach(review => {
        aggregatedScore += review.rating;
        count++;
    });
   
    movie.averageRating = aggregatedScore / count;
 
    if (checkedSoFar.count == movies.length) {
        movies.sort((m1, m2) => m2.averageRating - m1.averageRating);
        console.log(`The best movie by ${director} is... ${movies[0].title} !!!`);
    }
}

function getReviews(movies, director) {
    let checkedSoFar = {count: 0};
    movies.forEach(movie => {
        request(`${url}movies/${movie.id}/reviews`, {json: true}, (err, res, body) => calculateAverageScore(body, movie, director, checkedSoFar, movies));
    });
}

function findDirector(directors, name) {
    let directorId = directors.find(director => director.name === name).id;
    request(`${url}directors/${directorId}/movies`, {json: true}, (err, res, body) => getReviews(body, name));
}
 

request(`${url}directors`, {json: true}, (err, res, body) => findDirector(body, 'Quentin Tarantino'));
request(`${url}directors`, {json: true}, (err, res, body) => findDirector(body, 'Stanley Kubrick'));
request(`${url}directors`, {json: true}, (err, res, body) => findDirector(body, 'James Cameron'));
request(`${url}directors`, {json: true}, (err, res, body) => findDirector(body, 'Wes Anderson'));
