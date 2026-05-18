const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require('cors');

// Initialize Firebase Admin
admin.initializeApp();

const db = admin.firestore();
const auth = admin.auth();

// CORS middleware
const corsHandler = cors({ origin: true });

// ========== Authentication Functions ==========

/**
 * Custom claims for admin role
 * Usage: Sets isAdmin claim to true for specified user
 */
exports.setAdminRole = functions.https.onCall(async (data, context) => {
  // Check if caller is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated'
    );
  }

  // Check if caller has admin role (implement this based on your needs)
  const callerUser = await auth.getUser(context.auth.uid);
  if (!callerUser.customClaims || !callerUser.customClaims.isAdmin) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only admins can set admin roles'
    );
  }

  const { uid } = data;
  try {
    await auth.setCustomUserClaims(uid, { isAdmin: true });
    return { success: true, message: 'Admin role set successfully' };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});

// ========== User Functions ==========

/**
 * Create user profile on signup
 */
exports.createUserProfile = functions.auth.user().onCreate(async (user) => {
  const userRef = db.collection('users').doc(user.uid);

  try {
    await userRef.set({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Usuário',
      trustScore: 50, // Initial trust score
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      submissions: 0,
      flagged: false,
    });

    functions.logger.info(`User profile created for ${user.uid}`);
    return null;
  } catch (error) {
    functions.logger.error('Error creating user profile:', error);
    throw error;
  }
});

/**
 * Delete user profile on user deletion
 */
exports.deleteUserProfile = functions.auth.user().onDelete(async (user) => {
  try {
    await db.collection('users').doc(user.uid).delete();
    functions.logger.info(`User profile deleted for ${user.uid}`);
    return null;
  } catch (error) {
    functions.logger.error('Error deleting user profile:', error);
    throw error;
  }
});

// ========== Store Functions ==========

/**
 * Validate and process new store submission
 */
exports.processStoreSubmission = functions.firestore
  .document('stores/{storeId}')
  .onCreate(async (snap, context) => {
    const store = snap.data();
    const storeId = context.params.storeId;

    try {
      // Basic validation
      if (!store.name || !store.address) {
        throw new Error('Store name and address are required');
      }

      // Update store with timestamps
      await snap.ref.update({
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        verified: false, // Pending verification
        submissionCount: 0,
      });

      functions.logger.info(`Store ${storeId} created and awaiting verification`);
      return null;
    } catch (error) {
      functions.logger.error('Error processing store submission:', error);
      // Update store with error status
      await snap.ref.update({ status: 'error', errorMessage: error.message });
      throw error;
    }
  });

// ========== Price Functions ==========

/**
 * Validate and process new price submission
 * Detect anomalies and flag suspicious prices
 */
exports.processPriceSubmission = functions.firestore
  .document('prices/{priceId}')
  .onCreate(async (snap, context) => {
    const price = snap.data();
    const priceId = context.params.priceId;

    try {
      // Validate required fields
      if (!price.productId || !price.storeId || !price.price || !price.userId) {
        throw new Error('Missing required fields');
      }

      // Validate price is positive
      if (price.price <= 0) {
        throw new Error('Price must be greater than 0');
      }

      // Check for anomalies
      const existingPrices = await db
        .collection('prices')
        .where('productId', '==', price.productId)
        .where('storeId', '==', price.storeId)
        .orderBy('timestamp', 'desc')
        .limit(10)
        .get();

      let shouldFlag = false;
      let flagReason = '';

      if (!existingPrices.empty) {
        const lastPrice = existingPrices.docs[0].data();
        const percentChange = Math.abs((price.price - lastPrice.price) / lastPrice.price) * 100;

        // Flag if price change is more than 50%
        if (percentChange > 50) {
          shouldFlag = true;
          flagReason = `Anomalia detectada: ${percentChange.toFixed(2)}% de variação`;
        }
      }

      // Get user trust score
      const userDoc = await db.collection('users').doc(price.userId).get();
      const userTrustScore = userDoc.data()?.trustScore || 50;

      // Flag prices from low-trust users
      if (userTrustScore < 30) {
        shouldFlag = true;
        flagReason = `Usuário com baixa confiança (score: ${userTrustScore})`;
      }

      // Update price with metadata
      await snap.ref.update({
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        verified: userTrustScore > 80,
        flagged: shouldFlag,
        flagReason: flagReason || '',
        userTrustScore: userTrustScore,
      });

      // Increment user submission count
      await db
        .collection('users')
        .doc(price.userId)
        .update({
          submissions: admin.firestore.FieldValue.increment(1),
        });

      functions.logger.info(
        `Price ${priceId} processed. Flagged: ${shouldFlag}, Reason: ${flagReason}`
      );
      return null;
    } catch (error) {
      functions.logger.error('Error processing price submission:', error);
      throw error;
    }
  });

/**
 * Rate limiting for price submissions
 */
exports.checkRateLimit = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated'
    );
  }

  const { userId } = data;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const query = db
      .collection('prices')
      .where('userId', '==', userId)
      .where('timestamp', '>=', today);

    const snapshot = await query.get();
    const submissionCount = snapshot.size;
    const maxSubmissions = 50;

    return {
      allowed: submissionCount < maxSubmissions,
      currentCount: submissionCount,
      maxCount: maxSubmissions,
      remaining: Math.max(0, maxSubmissions - submissionCount),
    };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});

// ========== Admin Functions ==========

/**
 * Get admin statistics
 */
exports.getAdminStats = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated'
    );
  }

  try {
    const usersCount = await db.collection('users').count().get();
    const storesCount = await db.collection('stores').count().get();
    const pricesCount = await db.collection('prices').count().get();

    const pendingStores = await db
      .collection('stores')
      .where('verified', '==', false)
      .count()
      .get();

    const flaggedPrices = await db
      .collection('prices')
      .where('flagged', '==', true)
      .count()
      .get();

    return {
      totalUsers: usersCount.data().count,
      totalStores: storesCount.data().count,
      totalPrices: pricesCount.data().count,
      pendingStores: pendingStores.data().count,
      flaggedPrices: flaggedPrices.data().count,
    };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * Update user trust score based on feedback
 */
exports.updateUserTrustScore = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated'
    );
  }

  const { userId, scoreChange } = data;

  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new Error('User not found');
    }

    const currentScore = userDoc.data().trustScore || 50;
    const newScore = Math.max(0, Math.min(100, currentScore + scoreChange));

    await userRef.update({
      trustScore: newScore,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true, newScore };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});

// ========== Cleanup Functions ==========

/**
 * Delete old prices (older than 1 year)
 * Run daily via Cloud Scheduler
 */
exports.deleteOldPrices = functions.pubsub
  .schedule('every day 02:00')
  .timeZone('America/Sao_Paulo')
  .onRun(async (context) => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    try {
      const snapshot = await db
        .collection('prices')
        .where('timestamp', '<', oneYearAgo)
        .limit(500)
        .get();

      const batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      functions.logger.info(`Deleted ${snapshot.size} old prices`);
      return null;
    } catch (error) {
      functions.logger.error('Error deleting old prices:', error);
      throw error;
    }
  });
