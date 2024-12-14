import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || '',
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM || '',
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || '',
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || '',
  usersCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID || '',
  videosCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEOS_COLLECTION_ID || '',
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID || '',
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  usersCollectionId,
  videosCollectionId,
  storageId,
} = appwriteConfig

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(platform)
  ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email: string, password: string, username: string) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password)

    const newUser = await databases.createDocument(
      databaseId,
      usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
      }
    )

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      databaseId,
      usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if (!currentUser) throw Error;

    return currentUser.documents[0]
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.orderDesc('$createdAt')]
    )

    return posts.documents
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(7)]
    )

    return posts.documents
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.search('title', query)]
    )

    return posts.documents
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function getUserPosts(userId: string) {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export const getFilePreview = async (fileId: string, type: string) => {
  let fileUrl;

  try {
    if (type === 'video') {
      fileUrl = storage.getFileView(storageId, fileId);
    }
    else if (type === 'image') {
      fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100);
    }
    else {
      throw new Error('Invalid type')
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));

  }
}

export const uploadFile = async (file: any, type: string) => {
  if (!file) return;

  const { mimeType, ...rest } = file
  const asset = { type: mimeType, ...rest }

  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    )

    const filleUrl = await getFilePreview(uploadedFile.$id, type)
    return filleUrl;
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export const createVideo = async (form: { title: string, thumbnail: any, video: any, prompt: string, userId: string}) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),
    ])

    const newPost = await databases.createDocument(
      databaseId, videosCollectionId, ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId
      }
    )

    return newPost;
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}