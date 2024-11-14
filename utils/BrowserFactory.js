const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto'); // For unique directory names

class BrowserFactory {
    constructor() {
        if (BrowserFactory.instance) {
            return BrowserFactory.instance; // Return the existing instance if it exists
        }
        this.browser = null;  // Singleton browser instance
        BrowserFactory.instance = this; // Set the instance for future reference
    }

    async initBrowser() {
        if (!this.browser) {
            this.browser = await chromium.launch({ headless: false });
        }
        return this.browser;
    }

    async createContext(testName) {
        const browser = await this.initBrowser();
        
        // Generate a unique directory for each test
        const uniqueDirName = crypto.randomBytes(8).toString('hex');
        const videoDir = path.join(__dirname, '../test-results/videos', uniqueDirName);
        
        if (!fs.existsSync(videoDir)) {
            fs.mkdirSync(videoDir, { recursive: true });
            console.log(`Created video directory for test "${testName}": ${videoDir}`);
        }

        const context = await browser.newContext({
            recordVideo: {
                dir: videoDir,
                size: { width: 1280, height: 720 }
            }
        });
        
        // Attach directory path to the context for later access in saveAndAttachVideo
        context.videoDir = videoDir;
        return context;
    }

    async saveAndAttachVideo(context, testInfo) {
        await context.close();

        const videoDir = context.videoDir;
        const videoFiles = fs.readdirSync(videoDir).filter(file => file.endsWith('.webm'));

        if (videoFiles.length > 0) {
            const videoPath = path.join(videoDir, videoFiles[0]);
            console.log(`Attaching video from path: ${videoPath}`);

            // Attach the specific video file for this test without renaming
            testInfo.attach('Test Video', {
                path: videoPath,
                contentType: 'video/webm'
            });
            return videoPath;
        } else {
            console.error('Video file not found in the unique test directory.');
            throw new Error('Video file not found.');
        }
    }
   
        
    async closeBrowser() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }
}

module.exports = new BrowserFactory();
