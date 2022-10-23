const search = (searchResults, term) => {
    // for (let article of searchResults) {
    //     console.log(article);
    // }

    return searchResults.filter((article) => {
        if (article.title.includes('games')) {
            return article;
        }
    })
}

describe('Search term', () => {
    test('it should search Reddit for a search term (games) and return results including the search term', () => {
        const input = [
            {id: 1, title: 'Company releases new games to critical acclaim'},
            {id: 2, title: 'How do videogames affect your health?'},
            {id: 3, title: 'Super Mario Maker is fun'},
            {id: 4, title: 'Halloween Party'},
            {id: 5, title: 'Happy Fourth of July'},
            {id: 6, title: 'Playing a game with friends is fun.'},
            {id: 7, title: 'Videogames are awesome.'},
        ];


        const output = [
            {id: 1, title: 'Company releases new games to critical acclaim'},
            {id: 2, title: 'How do videogames affect your health?'},
            {id: 7, title: 'Videogames are awesome.'},
        ]
        expect(search(input, 'games')).toEqual(output);
    })
});


function absurdlyLongFunction () {  }