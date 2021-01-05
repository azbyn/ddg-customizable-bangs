//you might have to do disable xpinstall.signatures.required in about:config
//or make a mozilla account and sign your package
//zis might be useful:
//https://stackoverflow.com/questions/34608873/how-to-signing-a-firefox-extension

const pattern = '*://duckduckgo.com/*'
var lookup = {}

try {
    for (let i in bang) {
        let entry = bang[i];//idk y, js
        lookup[entry.t] = entry.u
    }
} catch(e) { console.error(e) }

// console.log("oi, did dis work?")
// console.log(lookup)

function redirect (requestDetails) {
  console.log(requestDetails)
  const url = new URL(requestDetails.url)
  const params = new URLSearchParams(url.search)
  const query = params.get('q')
  if (query === null) return { cancel: false }
  const queryArray = query.split(' ')
  let foundMatchingBang = false
  let newSearchURL = ''
  const string = queryArray.filter((word, index) => {
    if (word[0] === '!' && lookup[word.slice(1)] !== undefined && !foundMatchingBang) {
      newSearchURL = lookup[word.slice(1)]
      foundMatchingBang = true
      return false
    }
    if (word === '') {
      return false
    }
    return true
  }).join(' ')

  if (foundMatchingBang) {
    return {
      redirectUrl: newSearchURL.replace('{{{s}}}', encodeURIComponent(string))
    }
  } else {
    return {
      cancel: false
    }
  }
}

// eslint-disable-next-line no-undef
browser.webRequest.onBeforeRequest.addListener(
  redirect,
  { urls: [pattern], types: ['main_frame'] },
  ['blocking']
)
