import fs from 'fs';
import extractUrls from './helpers/extractUrls';
import getHtml from './helpers/fechHtml';

let allExtractedUrls = [];
const visitedUrls = [];


const hasAlreadyVisitedUrl = currentUrl => visitedUrls.includes(currentUrl);

const updateAllExtractedUrlWithNewUrls = async (currentUrl) => {
  const currentUrlHtmlContent = await getHtml(currentUrl);
  const latestExtractedUrl = await extractUrls(currentUrlHtmlContent);
  const newSetOfAllExtractedUrls = [...allExtractedUrls, ...latestExtractedUrl];
  return [...new Set(newSetOfAllExtractedUrls)];
};

const updateVisitedUrlsAndAppendToAFile = (currentUrl) => {
  visitedUrls.push(currentUrl);
  fs.appendFile('visitedUrls.csv', `${currentUrl}\n`, (error) => {
    if (error) throw error;
  });
};

const startScraping = async (currentUrl) => {
  try {
    if (!currentUrl) {
      return true;
    }
    if (hasAlreadyVisitedUrl(currentUrl)) {
      return startScraping(allExtractedUrls.shift());
    }
    allExtractedUrls = await updateAllExtractedUrlWithNewUrls(currentUrl);
    updateVisitedUrlsAndAppendToAFile(currentUrl);
    return startScraping(allExtractedUrls.shift());
  } catch (error) {
    throw error;
  }
};

const initialize = () => {
  try {
    fs.unlink('visitedUrls.csv', (error) => {
      if (error) throw error;
    });
    startScraping('https://medium.com/');
  } catch (error) {
    throw error;
  }
};

initialize();
