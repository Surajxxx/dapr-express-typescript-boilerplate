import chai from 'chai';
import request from 'supertest';
import app from '..';

chai.config.includeStack = true;

const expect = chai.expect;

describe('User', () => {
  /*
  * Test the /GET route
  */
  describe('/GET Users', () => {
      it('it should GET all the users', async () => {
        console.log('here >>>>>')
        const response = await request(app)
        .get("/user/users")
        .expect(200)
        .expect("Content-Type", /json/);

        const users = response.body.data;
        expect(users).to.be.an("array");
        expect(users).length.to.be.greaterThan(0);
        
      });

      it("should have valid users", async () => {
        const response = await request(app)
            .get("/user/users")
            .expect(200)
            .expect("Content-Type", /json/);

        const users: any[] = response.body.data;
        expect(users).to.be.an("array");

        users.forEach(user => {
            expect(user.name).to.be.a("string");
            expect(user.email).to.be.a("string");
        });
      });
    });
});
