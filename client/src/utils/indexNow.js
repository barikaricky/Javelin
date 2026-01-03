// IndexNow Submission Helper for Javelin Associates
// This helps notify search engines (Bing, Yandex) about new/updated content

const INDEXNOW_CONFIG = {
  key: 'ac711c45e07c44379323aa6269e736f5',
  keyLocation: 'https://www.javelinassociates.org/ac711c45e07c44379323aa6269e736f5.txt',
  host: 'www.javelinassociates.org'
};

/**
 * Submit URLs to IndexNow API
 * @param {string|string[]} urls - Single URL or array of URLs to submit
 */
export const submitToIndexNow = async (urls) => {
  const urlList = Array.isArray(urls) ? urls : [urls];
  
  const payload = {
    host: INDEXNOW_CONFIG.host,
    key: INDEXNOW_CONFIG.key,
    keyLocation: INDEXNOW_CONFIG.keyLocation,
    urlList: urlList.map(url => {
      // Ensure URLs are absolute
      if (!url.startsWith('http')) {
        return `https://${INDEXNOW_CONFIG.host}${url.startsWith('/') ? url : '/' + url}`;
      }
      return url;
    })
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('✅ URLs submitted to IndexNow successfully');
      return { success: true, status: response.status };
    } else {
      console.error('❌ IndexNow submission failed:', response.status);
      return { success: false, status: response.status };
    }
  } catch (error) {
    console.error('❌ IndexNow submission error:', error);
    return { success: false, error };
  }
};

/**
 * Submit all important pages to IndexNow
 */
export const submitAllPages = async () => {
  const importantPages = [
    'https://www.javelinassociates.org/',
    'https://www.javelinassociates.org/#/about',
    'https://www.javelinassociates.org/#/services',
    'https://www.javelinassociates.org/#/contact',
    'https://www.javelinassociates.org/#/gallery',
    'https://www.javelinassociates.org/#/news',
    'https://www.javelinassociates.org/#/sites',
    'https://www.javelinassociates.org/#/team',
    'https://www.javelinassociates.org/#/recruitment'
  ];

  return await submitToIndexNow(importantPages);
};

// For manual testing in browser console:
// window.submitToIndexNow = submitToIndexNow;
// window.submitAllPages = submitAllPages;

export default {
  submitToIndexNow,
  submitAllPages,
  config: INDEXNOW_CONFIG
};
