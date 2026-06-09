// Lightweight IndexedDB cache manager
// Only caches read-heavy data to reduce Firestore queries

const DB_NAME = 'ngo-cache';
const DB_VERSION = 1;
const CACHE_STORE = 'firestore-data';
const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour

let db = null;
let initPromise = null;

// Initialize DB only once
const initDB = () => {
  if (db) return Promise.resolve(db);
  if (initPromise) return initPromise;

  initPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.warn('IndexedDB error:', request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (e) => {
      const database = e.target.result;
      if (!database.objectStoreNames.contains(CACHE_STORE)) {
        database.createObjectStore(CACHE_STORE, { keyPath: 'id' });
      }
    };
  });

  return initPromise;
};

export const getFromCache = async (key) => {
  try {
    const database = await initDB();
    
    return new Promise((resolve) => {
      const transaction = database.transaction([CACHE_STORE], 'readonly');
      const store = transaction.objectStore(CACHE_STORE);
      const request = store.get(key);

      request.onerror = () => resolve(null);
      request.onsuccess = () => {
        const data = request.result;
        if (data && data.expiry > Date.now()) {
          resolve(data.value);
        } else {
          resolve(null);
        }
      };
    });
  } catch (error) {
    console.warn('Cache read error:', error);
    return null;
  }
};

export const saveToCache = async (key, value) => {
  try {
    const database = await initDB();
    
    return new Promise((resolve) => {
      const transaction = database.transaction([CACHE_STORE], 'readwrite');
      const store = transaction.objectStore(CACHE_STORE);
      const request = store.put({
        id: key,
        value,
        expiry: Date.now() + CACHE_EXPIRY,
      });

      request.onerror = () => resolve();
      request.onsuccess = () => resolve();
    });
  } catch (error) {
    console.warn('Cache write error:', error);
  }
};

export const removeFromCache = async (key) => {
  try {
    const database = await initDB();
    
    return new Promise((resolve) => {
      const transaction = database.transaction([CACHE_STORE], 'readwrite');
      const store = transaction.objectStore(CACHE_STORE);
      const request = store.delete(key);

      request.onerror = () => resolve();
      request.onsuccess = () => resolve();
    });
  } catch (error) {
    console.warn('Cache delete error:', error);
  }
};

export const clearAllCache = async () => {
  try {
    const database = await initDB();
    
    return new Promise((resolve) => {
      const transaction = database.transaction([CACHE_STORE], 'readwrite');
      const store = transaction.objectStore(CACHE_STORE);
      const request = store.clear();

      request.onerror = () => resolve();
      request.onsuccess = () => resolve();
    });
  } catch (error) {
    console.warn('Cache clear error:', error);
  }
};

