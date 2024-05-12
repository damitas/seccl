
import { test, expect, request } from '@playwright/test';
import { CLIENTID, CLIENTSECRET, AUDIENCE, OAUTHROUTE } from '../constants';


test('should return api bearer token', async ({ request, playwright }) => {
const apiContext = await playwright.request.newContext()
const clientDetails = {
        "clientId": CLIENTID,
        "clientSecret": CLIENTSECRET,
        "audience": AUDIENCE
    }

  const response = await apiContext.post(OAUTHROUTE+"/oauth/token", {data: clientDetails})
  expect(response.status()).toBe(200);
  expect(response.json()).toMatchObject({"access_token": "###TOKEN###", "scope": "create:scopes", "expires_in": 7200, "token_type": "Bearer"})
});

test('should return 403 when unauthorised', async ({ request, playwright }) => {
  const apiContext = await playwright.request.newContext()
  const clientDetails = {
          "clientId": "doesnotexist",
          "clientSecret": CLIENTSECRET,
          "audience": AUDIENCE
      }
  
    const response = await apiContext.post(OAUTHROUTE+"/oauth/token", {data: clientDetails})
    expect(response.status()).toBe(403);
  });

    test('should return 400 when malformed request - missing body', async ({ request, playwright }) => {
      const apiContext = await playwright.request.newContext()
      const clientDetails = {
              "clientSecret": CLIENTSECRET,
              "audience": AUDIENCE
          }    
        const response = await apiContext.post(OAUTHROUTE+"/oauth/token", {data: clientDetails})
        expect(response.status()).toBe(400);
      });
  

