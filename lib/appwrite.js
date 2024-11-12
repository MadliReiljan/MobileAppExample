import { Account, Client, Databases, ID, Query } from "react-native-appwrite";

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


const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId) 
    .setPlatform(config.platform) 

    const account = new Account(client);
    const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
      const newAccount = await account.create(ID.unique(), email, password, username);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
              accountId: newAccount.$id,
              email: email,
              username: username,
            } 
        );
        console.log("User document created:", newUser); 
        return newUser;
    } catch (error) {
        console.error("Error during user creation:", error);
        throw new Error(error);
    }
};

export const signIn = async (email, password) => {
    try {
      const session = await account.createEmailPasswordSession(email, password);
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
}

export const getCurrentUser = async () => {
  try {
      const currentAccount = await account.get();

      if (!currentAccount) throw new Error('No user account found.');

      const currentUser = await databases.listDocuments(databaseId, userCollectionId,
          [Query.equal('accountId', currentAccount.$id)]);

      if (currentUser.total === 0) {
          throw new Error('No user document found.');
      }

      return currentUser.documents[0]; 
  } catch (error) {
      
      console.log("Error fetching current user: ", error.message);
      return null; 
  }
}

export const updateUser = async (userId, updatedData) => {
  try {
      const updatedUser = await databases.updateDocument(
          databaseId,
          userCollectionId,
          userId,
          updatedData
      );
      console.log("User document updated:", updatedUser);
      return updatedUser;
  } catch (error) {
      console.error("Error updating user:", error);
      throw new Error(error.message || "Failed to update user");
  }
};


export const logOut = async () => {
  try {
     const session = await account.deleteSession('current')
     
     return session;
  } catch (error) {
      throw new Error(error)
  }
}


