import React, { createContext } from 'react'
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import config from '../utils/clientSecrets/firebase'

const FirebaseContext = createContext();

if (!firebase.apps.length) {
        firebase.initializeApp(config);
}

const db = firebase.firestore();

const Firebase = {
        getCurrentUser: () => {
                return firebase.auth().currentUser
        },
        onAuthStateChanged: async () => {
                return new Promise((resolve, reject) => {
                        try {
                                firebase.auth().onAuthStateChanged((user) => {
                                        if (user) {
                                                console.log('Firebase.onAuthStateChanged() UID: ', user.uid);
                                                resolve(user)
                                        } else {
                                                console.log('user not found');
                                                resolve(null);
                                        }
                                })
                        } catch (error) {
                                reject(error);
                        }
                });
        },
        createUser: async (user) => {
                return new Promise((resolve, reject) => {
                        try {
                                firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                                        .then((response) => {
                                                console.log("@Firebase.createUser user created with uid: ", response.user.uid);
                                                const uid = Firebase.getCurrentUser().uid;
                                                db.collection('users').doc(uid).set({
                                                        username: user.username,
                                                        email: user.email
                                                }).then(()=>{
                                                        delete user.password;
                                                        resolve({ ...user, uid })
                                                })
                                        }).catch((error) => {
                                                reject(error);
                                        })
                        } catch (error) {
                                reject(error);
                        }
                });
        },
        getUserInfo: async (uid) => {
                try {
                        console.log("@getUserInfo uid: ", uid)
                        const user = await db.collection("users").doc(uid).get();

                        if (user.exists) {
                                console.log("getUserInfo user.exists: ", user.get("email"))
                                return user.data();
                        }
                } catch (error) {
                        console.log("Error @getUserInfo: ", error.message);
                }
        },
        signOut: async () => {
                try {
                        await firebase.auth().signOut();
                        return true;
                }
                catch (error) {
                        console.log("Error @Firebase signOut: ", error.message);
                }

                return false;
        },
        signIn: async (email, password) => {
                return firebase.auth().signInWithEmailAndPassword(email, password);
        },
        reauthenticateUser: async (currentPassword) => {

                try {
                        let credential = firebase.auth.EmailAuthProvider.credential(
                                firebase.auth().currentUser.email,
                                currentPassword
                        );
                        return firebase.auth().currentUser.reauthenticateWithCredential(credential);
                } catch (error) {
                        console.log("Error @reauthenticateUser", error.message);
                        return false;
                }
        },
        updatePassword: async (currentPassword, newPassword) => {

                const didReauthenticate = await Firebase.reauthenticateUser(currentPassword);
                if (didReauthenticate) {
                        try {
                                firebase.auth().currentUser.updatePassword(newPassword).then(
                                        console.log("Successfully updated user password")
                                )
                                return true;
                        } catch (error) {
                                console.log("Error @updatePassword: ", error.message);
                                return false
                        }
                }

        },
        updateUsername: async (newUsername) => {
                // get the uid of the current user 
                const uid = Firebase.getCurrentUser().uid;
                try {
                        await db.collection(DB_USER_COLLECTION_NAME)
                                .doc(uid)
                                .update({
                                        username: newUsername
                                })
                                .then(
                                        console.log("successfully updated username")
                                );
                        return true;
                } catch (error) {
                        console.log("Error @updateUsername: ", error.message);
                        return false;
                }
        }
};

const FirebaseProvider = (props) => {
        return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>
}

export { FirebaseContext, FirebaseProvider }


/*
Alternate getUserInfo:
                       db.collection('users').doc(uid).get().then((user) => {
                                if(user.exists){
                                        console.log("@getUserInfo user: ", user);
                                        return user.data();
                                } else {
                                        console.log("@getUserInfo no user with provided uid exists");
                                        return null;
                                }
                        })
db.collection("users").doc(uid).get().then((user) => {
                                console.log("Firebase.getUserInfo() result: ", user) ;
                                return user.data();
                        });

Alternate getUser:
                firebase.auth().onAuthStateChanged((user) => {
                        if (user) {
                          return user;
                        } else {
                          return null;
                        }
                      });

try {
                        await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
                        const uid = Firebase.getCurrentUser().uid;

                        await db.collection('users').doc(uid).set({
                                username: user.username,
                                email: user.email
                        });

                        delete user.password;

                        return { ...user, uid }

                } catch (error) {
                        console.log("Error @createUser: ", error.message)
                        return error.message;
                }




                      */
