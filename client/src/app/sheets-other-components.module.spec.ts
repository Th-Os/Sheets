import { SheetsOtherComponentsModule } from './sheets-other-components.module';

describe('SheetsOtherComponentsModule', () => {
  let sheetsOtherComponentsModule: SheetsOtherComponentsModule;

  beforeEach(() => {
    sheetsOtherComponentsModule = new SheetsOtherComponentsModule();
  });

  it('should create an instance', () => {
    expect(sheetsOtherComponentsModule).toBeTruthy();
  });
});
