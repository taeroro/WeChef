describe('Tools', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  /* Temperature */

  let c = '120';
  let f = ((parseInt(c,10) * 9/5) + 32).toFixed(2);
  let k = (parseInt(c,10) + 273.15).toFixed(2);

  function tempConversionTest(unit1, unit2, unit1o, unit2o) {
    it('Testing Temperature '+unit1+'-'+unit2, async () => {
      await element(by.text('Tools')).tap();
      await element(by.text('Temperature')).tap();
      await element(by.label('Input Unit')).tap();
      await element(by.text(unit1)).atIndex(0).tap();

      await element(by.id('inputAmountTextField')).tap();
      await element(by.id('inputAmountTextField')).typeText(unit1o);

      await element(by.label('Convert Unit')).tap();
      await element(by.text(unit2)).atIndex(0).multiTap(3);

      await expect(element(by.text(unit2o))).toBeVisible();
    });
  }

  tempConversionTest('C', 'F', c, f);
  tempConversionTest('C', 'K', c, k);
  tempConversionTest('K', 'F', k, f);


  /* Weight */

  let lb = '120';
  let oz = (parseInt(lb,10) * 16).toFixed(2);
  let kg = (parseInt(lb,10) * 0.453592).toFixed(2);
  let g = (parseInt(lb,10) * 453.592).toFixed(2);


  function weightConversionTest(unit1, unit2, unit1o, unit2o) {
    it('Testing Weight '+unit1+'-'+unit2, async () => {
      await element(by.text('Tools')).tap();
      await element(by.text('Weight')).tap();
      await element(by.label('Input Unit')).tap();
      await element(by.text(unit1)).atIndex(0).tap();

      await element(by.id('inputAmountTextField')).tap();
      await element(by.id('inputAmountTextField')).typeText(unit1o);

      await element(by.label('Convert Unit')).tap();
      await element(by.text(unit2)).atIndex(0).multiTap(3);

      await expect(element(by.text(unit2o))).toBeVisible();
    });
  }

  weightConversionTest('lb', 'oz', lb, oz);
  weightConversionTest('oz', 'kg', oz, kg);
  weightConversionTest('g', 'kg', g, kg);



  /* Volumn */
  let l = 1;
  let ml = (parseInt(l,10) * 1000);
  let gal = (parseInt(l,10) / 3.78541);
  let fl_oz = (parseInt(l,10) / 3.78541 * 128);
  let cup = (parseInt(l,10) / 3.78541 * 128 / 8);
  let tsp = (parseInt(l,10) * 202.8841);
  let Tbs = (parseInt(l,10) * 202.8841 / 3);

  function volConversionTest(unit1, unit2, unit1o, unit2o) {
    it('Testing Volume '+unit1+'-'+unit2, async () => {
    await element(by.text('Tools')).tap();
    await element(by.text('Volume')).tap();

    await element(by.label('Input Unit')).tap();
//    await element(by.type('DropDownProps')).scroll(100, 'up');
    await element(by.text(unit1)).atIndex(0).tap();

    await element(by.id('inputAmountTextField')).tap();
    await element(by.id('inputAmountTextField')).typeText(unit1o.toFixed(4));

    await element(by.label('Convert Unit')).tap();
    await element(by.text(unit2)).atIndex(0).multiTap(3);

    await expect(element(by.text((unit2o.toFixed(2))))).toBeVisible();
    });
  }


  volConversionTest('gal','l',gal,l);
  volConversionTest('tsp','ml',tsp,ml);
  volConversionTest('cup','fl-oz',cup,fl_oz);
  volConversionTest('Tbs','gal',Tbs,gal);


});
