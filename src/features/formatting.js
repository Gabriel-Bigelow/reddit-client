

export function decodeURL (url) {
    let urlCopy = url;

    while (urlCopy.includes('&lt;')) {
        urlCopy = urlCopy.replace('&lt;', '<');
    }
    while (urlCopy.includes('&gt;')) {
        urlCopy = urlCopy.replace('&gt;', '>');
    }
    while (urlCopy.includes('&amp;')) {
        urlCopy = urlCopy.replace('&amp;', '&');
    }
    while(urlCopy.includes('&#x200B;')) {
        urlCopy = urlCopy.replace('&#x200B;', '')
    }

    return urlCopy
}

export function encodeURL (string) {
    let newString = string;
    while (newString.includes('%')) {
        newString = newString.replace('%', 'percentSignGoesHere25');
    }
    while (newString.includes(' ')) {
        newString = newString.replace(' ', '%20');
    }
    while (newString.includes('#')) {
        newString = newString.replace('#', '%23');
    }
    while (newString.includes('$')) {
        newString = newString.replace('$', '%24');
    }
    while (newString.includes('&')) {
        newString = newString.replace('&', '%26');
    }
    while (newString.includes('@')) {
        newString = newString.replace('@', '%40');
    }
    while (newString.includes(':')) {
        newString = newString.replace(':', '%3A');
    }
    while (newString.includes('?')) {
        newString = newString.replace('?', '%3F');
    }
    while (newString.includes('^')) {
        newString = newString.replace('^', '%5E');
    }
    while (newString.includes('{')) {
        newString = newString.replace('{', '%7B');
    }
    while (newString.includes('|')) {
        newString = newString.replace('|', '%7C');
    }
    while (newString.includes('}')) {
        newString = newString.replace('}', '%7D');
    }
    while (newString.includes('percentSignGoesHere25')) {
        newString = newString.replace('percentSignGoesHere25', '%25');
    }
    return newString;
}

export function formatTime (time, timeRightNow) {
    let timeToFormat = timeRightNow/1000 - time;

    if (timeToFormat < 60) {
        return [timeToFormat.toFixed(0), timeToFormat < 2 ? "second" : "seconds"];
    }
    
    //seconds to minutes
    timeToFormat /= 60;
    if (timeToFormat < 60) {
        return [timeToFormat.toFixed(0), timeToFormat < 2 ? "minute" : "minutes"];
    }

    //minutes to hours
    timeToFormat /= 60;
    if (timeToFormat < 24) {
        return [timeToFormat.toFixed(0), timeToFormat < 2 ? "hour" : "hours"];
    }

    //hours to days
    timeToFormat /= 24;
    if (timeToFormat < 30) {
        return [timeToFormat.toFixed(0), timeToFormat < 2 ? "day" : "days"];
    }

    //days to months
    timeToFormat /= 30;
    if (timeToFormat < 12) {
        return [timeToFormat.toFixed(0), timeToFormat < 2 ? "month" : "months"];
    }

    //months to years
    timeToFormat /= 12;
    return [timeToFormat.toFixed(0), timeToFormat < 2 ? "year" : "years"];
}

export function extraFormatMarkdown (text) {

    function formatLinks (text) {
        const linkRegex = /\[.*?\]\(.*?\)/
		const textRegex = /\[.*?\]/
        const hrefRegex = /\(.*?\)/
        
        const soloHrefRegex = /http.*?\s/

        //const endHrefRegex = /http.*?/
  
        let newText = text + ' ';
        const linksArray = [];
        const soloLinksArray = [];
        //const endLinksArray = [];

        while (newText.match(linkRegex) !== null) {
            const foundWholeLink = newText.match(linkRegex);
            const stringWholeLink = foundWholeLink.join();

            const foundText = stringWholeLink.match(textRegex);
            const stringText = foundText.join();
            const formattedLinkText = stringText.slice(1, stringText.length-1);

            const foundHref = stringWholeLink.match(hrefRegex);
            const stringHref = foundHref.join();
            const formattedHref = stringHref.slice(1, stringHref.length-1);

            const linkObject = {text: formattedLinkText, href: formattedHref};
            linksArray.push(linkObject);

          	newText = newText.replace(linkRegex, 'formattedLinkGoesRightHere');
        }
        while (newText.match(soloHrefRegex) !== null) {
            const foundHref = newText.match(soloHrefRegex);
            const stringHref = foundHref.join();
            const formattedHref = stringHref.slice(0, stringHref.length-1);

            const linkObject = {text: formattedHref, href: formattedHref};
            soloLinksArray.push(linkObject);

          	newText = newText.replace(soloHrefRegex, 'FormattedSoloLinkGoesRightHere');
        }

        for(let link of linksArray) {
            newText = newText.replace('formattedLinkGoesRightHere', `[${link.text}](${link.href})`);
        }
        for(let link of soloLinksArray) {
            newText = newText.replace('FormattedSoloLinkGoesRightHere', `[${link.text}](${link.href})`);
        }

        return newText;
    }
    let newText = decodeURL(text);
    newText = formatLinks(newText);
    return newText
}

export function grabLink (text) {
    const linkRegex = /\[.*?\]\(.*?\)/
	const textRegex = /\[.*?\]/
    const hrefRegex = /\(.*?\)/
        

    //const endHrefRegex = /http.*?/
  
    let newText = text;
    const linksArray = [];
    const soloLinksArray = [];
    //const endLinksArray = [];

        while (newText.match(linkRegex) !== null) {
            const foundWholeLink = newText.match(linkRegex);
            const stringWholeLink = foundWholeLink.join();

            const foundText = stringWholeLink.match(textRegex);
            const stringText = foundText.join();
            const formattedLinkText = stringText.slice(1, stringText.length-1);

            const foundHref = stringWholeLink.match(hrefRegex);
            const stringHref = foundHref.join();
            const formattedHref = stringHref.slice(1, stringHref.length-1);

            const linkObject = {text: formattedLinkText, href: formattedHref};
            linksArray.push(linkObject);

          	newText = newText.replace(linkRegex, 'formattedLinkGoesRightHere');
        }
    
    if (linksArray[0]) {
        return linksArray[0].text;
    }
}

/*//formatting must go in the order of most symbols to surround a string to least
    const htmlItems = [];
    const newTextArray = [];

    function formatHorizontalRule (text) {
        const horizRegex = /\*{3,}/

        let newText = text;
        while (newText.match(horizRegex) !== null) {
            const insertAt = newText.search(horizRegex);
            
            const front = newText.slice(0, insertAt);
            newText = newText.replace(front, '');
            newText = newText.replace(horizRegex, '');
            htmlItems.push(<div className="horizontal-rule"><p>{front}</p></div>);
        }
        return newText;
    }
    function formatBold (text, doubleFormatting) {
        const boldRegex = /\*\*.*?\*\*/;                    // */

        /*let newText = text;
        while (newText.match(boldRegex) !== null) {
            const insertAt = newText.search(boldRegex);
            const foundPhrase = newText.match(boldRegex);
            const newPhrase = foundPhrase.join();
            const formattedPhrase = newPhrase.slice(2, newPhrase.length-2);
            
            const front = newText.slice(0, insertAt)
            if (!doubleFormatting) {
                newTextArray.push({text: front, formatting: 'none'});
                newTextArray.push({text: formattedPhrase, formatting: 'bold'});
            } else {
                console.log(newText)
                newText = newText.replace(front, '');
                newText = newText.replace(boldRegex, '');
                console.log(newText);
                return <strong>{formattedPhrase}</strong>
            }
            newText = newText.replace(front, '');
            newText = newText.replace(boldRegex, '');
        }
        return newText;
    }
    function formatItalics (text, doubleFormatting) {
        const italicsRegex = /\*.*?\*/;                 // */

        /*let newText = text;
        while (newText.match(italicsRegex) !== null) {
            const insertAt = newText.search(italicsRegex);
            const foundPhrase = newText.match(italicsRegex);
            const newPhrase = foundPhrase.join();
            const formattedPhrase = newPhrase.slice(1, newPhrase.length-1);
            
            const front = newText.slice(0, insertAt)
            if (!doubleFormatting) {
                newTextArray.push({text: front, formatting: 'none'});
                newTextArray.push({text: formattedPhrase, formatting: 'italics'});
            } else {
                return <em>{formattedPhrase}</em>
            }
            newText = newText.replace(front, '');
            newText = newText.replace(italicsRegex, '');
        }
        return newText;
    }
    function formatStrikethrough (text) {
        const strikethroughRegex = /~~.*?~~/;

        let newText = text;
        while (newText.match(strikethroughRegex) !== null) {
            const foundPhrase = newText.match(strikethroughRegex);
            const newPhrase = foundPhrase.join();
            const formattedPhrase = newPhrase.slice(2, newPhrase.length-2);
            
            newText = newText.replace(strikethroughRegex, formattedPhrase);
        }

        return newText;
    }
    function formatSuperscript (text) {
        const superscriptRegex = /\^.*?\^/;

        let newText = text;
        while (newText.match(superscriptRegex) !== null) {
            const foundPhrase = newText.match(superscriptRegex);
            const newPhrase = foundPhrase.join();
            const formattedPhrase = newPhrase.slice(1, newPhrase.length-1);
            
            newText = newText.replace(superscriptRegex, formattedPhrase);
        }

        return newText;
    }
    function formatLinks (text) {
        const linkRegex = /\[.*?\]\(.*?\)/;
		const textRegex = /\[.*?\]/
        const hrefRegex = /http.*?\)/
        
        const soloHrefRegex = /http.*?\s/
  
        let newText = text;
        while (newText.match(linkRegex) !== null) {
            const insertAt = newText.search(linkRegex);
            const foundWholeLink = newText.match(linkRegex);
            const stringWholeLink = foundWholeLink.join();

            const foundText = stringWholeLink.match(textRegex);
            const stringText = foundText.join();
            const formattedLinkText = stringText.slice(1, stringText.length-1);

            const foundHref = stringWholeLink.match(hrefRegex);
            const stringHref = foundHref.join();
            const formattedHref = stringHref.slice(0, stringHref.length-1);

            const front = newText.slice(0, insertAt);
            newTextArray.push({text: front, formatting: 'none'});
            newTextArray.push({text: formattedLinkText, href: formattedHref, formatting: 'link'});

          	newText = newText.replace(front, '');
          	newText = newText.replace(linkRegex, '');
        }
        while (newText.match(soloHrefRegex) !== null) {
            const insertAt = newText.search(soloHrefRegex);
            const foundHref = newText.match(soloHrefRegex);
            const stringHref = foundHref.join();
            const formattedHref = stringHref.slice(0, stringHref.length-1);

            const front = newText.slice(0, insertAt);
            newTextArray.push({text: front, formatting: 'none'});
            newTextArray.push({text: formattedHref, href: formattedHref, formatting: 'link'});

          	newText = newText.replace(front, '');
          	newText = newText.replace(soloHrefRegex, '');
        }

        return newText;
    }
    
    let newText = decodeURL(text);
    
    newText = formatHorizontalRule(newText);
    //newText = formatBold(newText);
    newText = formatLinks(newText);
    //newText = formatItalics(newText);
    //newText = formatStrikethrough(newText);
    //newText = formatSuperscript(newText);
    

    if (newText.length > 0) {
        newTextArray.push({text: newText, formatting: 'none'})
    }
    function populateHTMLItems (array) {
        //console.log(array);
        let paragraphElement = [];
        for (let textElement of array) {
            if (textElement.formatting === 'none') {
                paragraphElement.push(textElement.text);
            }
            if (textElement.formatting === 'bold') {
                paragraphElement.push(<strong>{textElement.text}</strong>)
            }
            if (textElement.formatting === 'italics') {
                paragraphElement.push(<em>{textElement.text}</em>)
            }
            if (textElement.formatting === 'strikethrough') {
                paragraphElement.push(<strike>{textElement.text}</strike>)
            }
            if(textElement.formatting === 'superscript') {
                paragraphElement.push(<sup>{textElement.text}</sup>)
            }
            if (textElement.formatting === 'link') {
                paragraphElement.push(<a href={textElement.href}>{formatItalics(textElement.text, true)}</a>)
            }
        }
        htmlItems.push(<p>{paragraphElement.map(element => {
            return element
        })}</p>)
    }
    populateHTMLItems(newTextArray);
    console.log(htmlItems);*/