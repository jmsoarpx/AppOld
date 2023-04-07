const { MongoClient } = require('mongodb')

let client, db
const mockUser = {
  _id: 'any_id',
  email: 'valid_email@mail.com',
  name: 'any_name',
  idade: 35,
  state: 'any_state',
  password: 'hashed_password'
}
class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    const user = await this.userModel.findOne(
      { email },
      {
        projection: {
          password: 1
        }
      }
    )
    return user
  }
}

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)
  return {
    userModel,
    sut
  }
}

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = await client.db()
  })

  beforeEach(async () => {
    await db.collection('user').deleteMany({})
  })

  afterAll(async () => {
    await client.close()
  })

  test('Should return null if no user is found', async () => {
    const { sut } = makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })

  test('Should return an user if user is found', async () => {
    const { sut, userModel } = makeSut()
    await userModel.insertOne(mockUser)
    const user = await sut.load('valid_email@mail.com')
    expect(user).toEqual({
      _id: mockUser._id,
      password: mockUser.password
    })
  })
})
