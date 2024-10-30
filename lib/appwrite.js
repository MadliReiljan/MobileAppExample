import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.mobileapp',
    projectId: '6721dc4d0037014bdb63',
    databaseId: '6721ddb0002535f47902',
    userCollectionId: '6721ddc5002b6170760a',
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
} = config;


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId) 
    .setPlatform(config.platform) 

    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
              accountId: newAccount.$id,
              email: email,
              username: username,
              avatar: avatarUrl
            } 
        )

        return newUser;

    } catch (error){
        console.log(error);
        throw new Error(error);
    }
}

export const signIn = async (email, password) => {
    try {
      const session = await account.createEmailPasswordSession(email, password);
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
}