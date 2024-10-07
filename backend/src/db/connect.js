// connect.js
import mongoose from 'mongoose'

const connect = async () => {
  try {
    console.log('Connecting to database...')
    // console.log('MONGO_URI:', process.env.MONGO_URI)

    const uri = process.env.MONGO_URI

    if (!uri) {
      throw new Error('MONGO_URI is not defined in the environment variables.')
    }

    await mongoose.connect(uri, {})
    console.log('Connected to database')
  } catch (error) {
    console.error('Database connection error:', error)
    throw error // Rethrow the error for handling in the server
  }
}

export default connect
