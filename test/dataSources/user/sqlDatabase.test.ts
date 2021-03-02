import sqlDatabase from '../../../src/dataSources/user/SqlDatabase';
import * as faker from 'faker';
import { compare } from 'bcrypt';
import UserSerialized from '../../../src/types/UserSerialized';

describe('sqlDatabase', () => {
  const config = {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
  };
  const subject = new sqlDatabase(config);
  beforeAll(async () => {
    await subject.db.schema.createTable('USERS', (table) => {
      table.string('id', 36).notNullable().primary();
      table.string('email', 256).notNullable().unique();
      table.string('password', 60).notNullable();
      table.integer('isTest', 60).notNullable().defaultTo(0);
    });
  });

  afterAll(() => {
    subject.db.destroy();
  });

  describe('generates user correctly', () => {
    const userPassword: string = faker.internet.password();
    const userEmail: string = faker.internet.email();

    test('should create a test user correctly', async () => {
      await subject.create(userEmail, userPassword, true);
      const result = await getUserbyEmail(userEmail);
      expect(result).not.toBeUndefined();
      expect(result.email).toEqual(userEmail);
      expect(result.isTest).toEqual(1);
      expect(await compare(userPassword, result.password)).toBeTruthy();
    });

    test('should create a normal user correctly', async () => {
      const userPassword: string = faker.internet.password();
      const userEmail: string = faker.internet.email();
      await subject.create(userEmail, userPassword, false);
      const result = await getUserbyEmail(userEmail);
      expect(result).not.toBeUndefined();
      expect(result.email).toEqual(userEmail);
      expect(result.isTest).toEqual(0);
      expect(await compare(userPassword, result.password)).toBeTruthy();
    });

    test('should fail create a duplicated user', async () => {
      try {
        await subject.create(userEmail, userPassword, false);
        fail();
      } catch (error) {}
    });

    test('should be able to login a user with correct password', async () => {
      const expectedUser = await getUserbyEmail(userEmail);
      const result = await subject.getWithEmailAndPassword(
        userEmail,
        userPassword
      );
      expect(result).toEqual(expectedUser);
    });

    test('should not be able to login a user with incorrect password', async () => {
      try {
        const result = await subject.getWithEmailAndPassword(
          userEmail,
          faker.internet.password()
        );
        expect(true).toEqual(false);
      } catch (error) {
        expect(error).toEqual(Error('User or credentials do not match'));
      }
    });
  });

  const getUserbyEmail = async (email: string): Promise<UserSerialized> => {
    const queryResult = (
      await subject.db.select('*').from('USERS').where({ email })
    )[0];
    return queryResult;
  };
});
