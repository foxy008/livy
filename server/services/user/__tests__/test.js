const request = require('supertest');
const app = require('../app');
const { User, CounselorSubmission, sequelize } = require('../models');

let access_token;
beforeAll(async () => {
  try {
    await User.create({
      id:999,
      name: 'ilias',
      email: 'ilias@test.com',
      gender: 'M',
      dob:'2023-03-07T01:19:32.622Z',
      image: 'string image url testing purpose',
      role: 'superadmin',
      helpful: 20,
    });
    await CounselorSubmission.create({
      id: 2,
      status: 'Pending',
      submissions: 'string submission testing purpose',
      UserId: 999,
    });
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete(
    'Users',
    {},
    {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }
  );
  await sequelize.queryInterface.bulkDelete(
    'CounselorSubmissions',
    {},
    {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }
  );
});

describe('Succes Case For Users Service', () => {
  it('Successfully Get Users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body[0]).toHaveProperty('id', expect.any(Number));
    expect(response.body[0]).toHaveProperty('email', 'ilias@test.com');
    expect(response.body[0]).toHaveProperty('gender', 'M');
    expect(response.body[0]).toHaveProperty('dob', '2023-03-07T01:19:32.622Z');
    expect(response.body[0]).toHaveProperty('image', 'string image url testing purpose');
    expect(response.body[0]).toHaveProperty('role', 'superadmin');
    expect(response.body[0]).toHaveProperty('helpful', 20);
  });
  it('Successfully Get User By Id', async () => {
    const response = await request(app).get('/users/999');
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object')
    expect(response.body).toHaveProperty('id', expect.any(Number));
    expect(response.body).toHaveProperty('email', 'ilias@test.com');
    expect(response.body).toHaveProperty('gender', 'M');
    expect(response.body).toHaveProperty('dob', '2023-03-07T01:19:32.622Z');
    expect(response.body).toHaveProperty('image', 'string image url testing purpose');
    expect(response.body).toHaveProperty('role', 'superadmin');
    expect(response.body).toHaveProperty('helpful', 20);
  });

  it('Successfully Post User (Its For Google Login)', async () => {
    const response = await request(app).post('/users/test').send({
      payload:{
        id: '114434339297979854205',
        email: 'ilias@test.com',
        verified_email: true,
        name: 'testing purpose',
        given_name: 'Gilang',
        family_name: 'Ramadhan',
        picture: 'google.com',
        locale: 'id'
      },
      role: 'user'
    });
    access_token = response.body.access_token
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('access_token', expect.any(String));
  });
  it('Successfully Post User (Reject When User Role Is Admin if try to register)', async () => {
    const response = await request(app).post('/users/test').send({
      payload:{
        id: '114434339297979854205',
        email: 'admin@test.com',
        verified_email: true,
        name: 'admin testing purpose',
        given_name: 'Gilang',
        family_name: 'Ramadhan',
        picture: 'google.com',
        locale: 'id'
      },
      role: 'admin'
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'InvalidCredentials');
  });
  it('Successfully Post User (Add To Counselor Submission when role is counselor)', async () => {
    const response = await request(app).post('/users/test').send({
      payload:{
        id: '114434339297979854205',
        email: 'counselor@test.com',
        verified_email: true,
        name: 'counselor testing purpose',
        given_name: '_',
        family_name: '_',
        picture: 'counselor.com',
        locale: 'id'
      },
      role: 'counselor'
    });
    const user = await User.findOne({where:{email:'counselor@test.com'}})
    const cs = await CounselorSubmission.findOne({where:{UserId:user.id}})
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('access_token', expect.any(String));
    expect(cs).toHaveProperty('status','pending')
  });
  it('Successfully Post Verify (access_token to user info)', async () => {
    const response = await request(app).post('/verify').send({
      access_token
    });
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object')
    expect(response.body).toHaveProperty('id', expect.any(Number));
    expect(response.body).toHaveProperty('email', 'ilias@test.com');
    expect(response.body).toHaveProperty('gender', 'M');
    expect(response.body).toHaveProperty('dob', '2023-03-07T01:19:32.622Z');
    expect(response.body).toHaveProperty('image', 'string image url testing purpose');
    expect(response.body).toHaveProperty('role', 'superadmin');
    expect(response.body).toHaveProperty('helpful', 20);
  });
  it('Successfully Update User', async () => {
    const response = await request(app).put('/users/999').send({
    name: 'updated',
    email: 'updated@mail.com',
    gender: 'F',
    image: 'updated',
  });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'successfuly updated');
  });
  it('Successfully Patch User (increment or decrement helpful)', async () => {
    const response = await request(app).patch('/users/999').send({
      "helpful": 1,
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message','successfuly updated');
  });
  it('Successfully Delete User', async () => {
    const response = await request(app).delete('/users/999');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message','successfuly deleted');
  });
});

describe('Failed Case For Users Service', () => {
  it('Failed Get User By Id (because Id is Not Found)', async () => {
    const response = await request(app).get('/users/999999');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message','Data not found')
  });
  it('Failed Post user (because body is empty)', async () => {
    const response = await request(app).post('/users/test').send(null);
    access_token = response.body.access_token
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', "Internal Server Error");
  });
  it('Failed Delete User (because id is not found)', async () => {
    const response = await request(app).delete('/users/test');
    access_token = response.body.access_token
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', "Internal Server Error");
  });
});