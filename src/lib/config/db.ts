import mongoose from 'mongoose'

export const ConnectDB = async() => {
    await mongoose.connect('mongodb+srv://kimi:kimi1710@clustereres.odhmm.mongodb.net/Eres?retryWrites=true&w=majority&appName=ClusterEres')
    console.log('DB connected')
}