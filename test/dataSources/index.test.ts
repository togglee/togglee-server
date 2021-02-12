import dataSources from '../../src/dataSources';

describe('datasources', () => {
  it('should export sqlUserDatabase', () => {
    expect(dataSources.sqlUserAPI).toBeTruthy();
  });

});
