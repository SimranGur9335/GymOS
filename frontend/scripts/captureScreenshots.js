// captureScreenshots.js
// Script to capture UI screenshots for GymOS audit using Puppeteer
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
  const page = await browser.newPage();

  const screenshotDir = path.resolve(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir);

  const base = 'http://localhost:5173';
  const viewports = {
    desktop: {width:1440, height:900},
    mobile: {width:375, height:667, isMobile:true}
  };

  async function capture(name, url, viewport, action){
    await page.setViewport(viewport);
    await page.goto(url, {waitUntil:'networkidle0'});
    if (action) await action(page);
    const out = path.join(screenshotDir, `${name}.png`);
    await page.screenshot({path:out, fullPage:true});
    console.log('Saved', out);
  }

  // Landing page
  await capture('landing_desktop', `${base}/`, viewports.desktop);
  await capture('landing_mobile', `${base}/`, viewports.mobile);

  // Discovery page
  await capture('discover_desktop', `${base}/discover`, viewports.desktop);
  await capture('discover_mobile', `${base}/discover`, viewports.mobile);

  // Gym details (first gym)
  await capture('gymdetails_desktop', `${base}/discover`, viewports.desktop, async (p)=>{
    await p.waitForSelector('a[href^="/gyms/"]', {timeout:5000});
    const link = await p.$('a[href^="/gyms/"]');
    if (link) await link.click();
    await p.waitForNavigation({waitUntil:'networkidle0'});
  });
  await capture('gymdetails_mobile', `${base}/discover`, viewports.mobile, async (p)=>{
    await p.waitForSelector('a[href^="/gyms/"]', {timeout:5000});
    const link = await p.$('a[href^="/gyms/"]');
    if (link) await link.click();
    await p.waitForNavigation({waitUntil:'networkidle0'});
  });

  // Enquiry modal from landing page
  async function openEnquiry(p){
    // Find first Enquire button inside GymCard (bg-[#1E2330])
    const buttons = await p.$$('*[class*="bg-\[\#1E2330\]"] button');
    if (buttons.length) await buttons[0].click();
    await p.waitForSelector('[role="dialog"]', {timeout:5000});
    await p.waitForTimeout(500);
  }
  await capture('enquiry_desktop', `${base}/`, viewports.desktop, openEnquiry);
  await capture('enquiry_mobile', `${base}/`, viewports.mobile, openEnquiry);

  await browser.close();
})();
