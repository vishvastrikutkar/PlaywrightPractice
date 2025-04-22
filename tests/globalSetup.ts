import {FullConfig, test} from '@playwright/test'

async function globalSetupMethod(config: FullConfig) {
    console.log("This is global setup method which will run before all Tests....");
}

export default globalSetupMethod;
    