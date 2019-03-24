import http from 'http';
import request from 'request';


const httpAgent = new http.Agent();
httpAgent.maxSockets = 5;

const fetchHtml = url => new Promise((resolve, reject) => {
  request.get({
    pool: httpAgent,
    url,
  }, (error, _, html) => {
    if (error) {
      reject(error);
    }
    resolve(html);
  });
});

const getHtml = async (url) => {
  try {
    const htmlContent = await fetchHtml(url);
    return htmlContent;
  } catch (error) {
    throw error;
  }
};

export default getHtml;
