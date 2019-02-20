describe('Tools', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Testing Temperature', async () => {
    await element(by.text('Tools')).tap();
    await element(by.text('Temperature')).tap();
    await element(by.testID('inputUnit1DropDown')).tap();
    await element(by.test('C')).tap();

    await element(by.testID('inputAmountTextField')).typeText('120');

    await element(by.testID('inputUnit2DropDown')).tap();
    await element(by.test('F')).tap();

    await expect(element(by.testID('outputText'))).toHaveValue('248')
  });

});
