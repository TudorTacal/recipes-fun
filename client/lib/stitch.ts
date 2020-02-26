import { Stitch } from 'mongodb-stitch-browser-sdk';
import CONFIG from '../config.js';

const { STITCH_APP_ID } = CONFIG;
console.log({ STITCH_APP_ID });
const stitchClient = Stitch.hasAppClient(STITCH_APP_ID)
  ? Stitch.getAppClient(STITCH_APP_ID)
  // @ts-ignore
	: Stitch.initializeAppClient(STITCH_APP_ID, {
			baseUrl: 'https://stitch.mongodb.com',
    });

export { stitchClient };