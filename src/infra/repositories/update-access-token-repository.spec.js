const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')
const UpdateAccessTokenRepository = require('./update-access-token-repository')

let db
const mockUser = {
  email: 'valid_email@mail.com',
  name: 'any_name',
  idade: 35,
  state: 'any_state',
  password: 'hashed_password'
}

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdateAccessTokenRepository(userModel)
  return {
    userModel,
    sut
  }
}

describe('UpdateAccessToken Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = MongoHelper.db
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should update the user with the given accessToken', async () => {
    const { sut, userModel } = makeSut()
    await userModel.insertOne(mockUser)
    await sut.update(mockUser._id, 'valid_token')
    const updateFakerUser = await userModel.findOne({ _id: mockUser._id })
    expect(updateFakerUser.accessToken).toBe('valid_token')
  })

  test('Should throw if no userModel is provided', async () => {
    const sut = new UpdateAccessTokenRepository()
    const userModel = db.collection('users')
    await userModel.insertOne(mockUser)
    const promise = sut.update(mockUser._id, 'valid_token')
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no params are provided', async () => {
    const { sut, userModel } = makeSut()
    await userModel.insertOne(mockUser)
    expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    expect(sut.update(mockUser._id)).rejects.toThrow(
      new MissingParamError('accessToken')
    )
  })
})
