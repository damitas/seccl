
import { test, expect } from '@playwright/test';
import { USERNAME, USERPASSWORD, FIRMID, APIROUTE } from '../constants';



test('should return 403 when not authorised', async ({ request, playwright }) => {
const apiContext = await playwright.request.newContext()
const user = {
        "firmId": "incorrect firm ID",
        "id": FIRMID,
        "password": "incorrect"
    }

  const response = await apiContext.post(APIROUTE+'/authenticate', {data: user})
  expect(response.status()).toBe(403);
  expect(await response.json()).toMatchObject({"error": {"errorMessage": "Access denied", "fieldErrors": [], "statusCode": 403, "type": "AccessDeniedError"}});

});

test('should return api token when authorised', async ({ request, playwright }) => {
    const apiContext = await playwright.request.newContext()
    const user = {
            "firmId": FIRMID,
            "id": USERNAME,
            "password": USERPASSWORD
        }
    
      const response = await apiContext.post(APIROUTE+'/authenticate', {data: user})
      expect(response.ok()).toBeTruthy();
    });
