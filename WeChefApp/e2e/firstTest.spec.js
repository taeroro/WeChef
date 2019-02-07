describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have five tabs', async () => {
    await expect(element(by.text('Recipe'))).toBeVisible();
    await expect(element(by.text('Saved'))).toBeVisible();
    await expect(element(by.text('List'))).toBeVisible();
    await expect(element(by.text('Tools'))).toBeVisible();
    await expect(element(by.text('Profile'))).toBeVisible();
  });

  it('should show profile screen and profile setting after tap', async () => {
    await element(by.text('Profile')).tap();

    await element(by.id('profile_page_setting_button')).tap();
    await expect(element(by.text('ProfileSettingsScreen'))).toBeVisible();
  });

/*
  it('should show hello screen after tap', async () => {
    await element(by.id('hello_button')).tap();
    await expect(element(by.text('Hello!!!'))).toBeVisible();
  });

  it('should show world screen after tap', async () => {
    await element(by.id('world_button')).tap();
    await expect(element(by.text('World!!!'))).toBeVisible();
  });
  */
});