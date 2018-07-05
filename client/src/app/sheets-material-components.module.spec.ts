import { SheetsMaterialComponentsModule } from './sheets-material-components.module';

describe('SheetsMaterialComponentsModule', () => {
  let sheetsMaterialComponentsModule: SheetsMaterialComponentsModule;

  beforeEach(() => {
    sheetsMaterialComponentsModule = new SheetsMaterialComponentsModule();
  });

  it('should create an instance', () => {
    expect(sheetsMaterialComponentsModule).toBeTruthy();
  });
});
