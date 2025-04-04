import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageClient {
    static async setItem(key: string, value: string): Promise<void> {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error('Error setting item in AsyncStorage:', error);
        }
    }

    static async getItem(key: string): Promise<string | null> {
        try {
            const item = await AsyncStorage.getItem(key);
            return item;
        } catch (error) {
            console.error('Error getting item from AsyncStorage:', error);
            return null;
        }
    }

    static async removeItem(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing item from AsyncStorage:', error);
        }
    }

    static async clear(): Promise<void> {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    }
}

export default AsyncStorageClient;