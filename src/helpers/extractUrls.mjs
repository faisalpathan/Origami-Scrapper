import cheerio from 'cheerio';

const checkForDuplicateUrl = (listOfUrls, currentUrl) => listOfUrls.includes(currentUrl);

const checkIfValidUrl = (currentUrl) => {
  const validUrlRegexPattern = /^((http|https|ftp):\/\/)/;
  return validUrlRegexPattern.test(currentUrl);
};

const isValidUrlToAdd = (allUrls, currentAnchorTagUrl) => {
  if (!checkForDuplicateUrl(allUrls, currentAnchorTagUrl)
    && checkIfValidUrl(currentAnchorTagUrl)) {
    return true;
  }
  return false;
};

const extractUrls = (htmlContent) => {
  const allUrls = [];
  const $ = cheerio.load(htmlContent);
  const achorTagIdentifier = $('a');
  $(achorTagIdentifier).each((_, aTag) => {
    const currentAnchorTagUrl = $(aTag).attr('href');
    if (isValidUrlToAdd(allUrls, currentAnchorTagUrl)) {
      allUrls.push(currentAnchorTagUrl);
    }
  });
  return allUrls;
};

export default extractUrls;
