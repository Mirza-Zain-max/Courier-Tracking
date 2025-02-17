// import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { message } from 'antd';
// import { doc, getDoc } from 'firebase/firestore';
// import ScreenLoader from '../Pages/ScreenLoader/ScreenLoader';
// import { auth, fireStore } from '../Config/firebase';
// import { useNavigate } from 'react-router-dom';


// const AuthContext = createContext({
//     isAuth: false, user: {},
//     isAppLoading: true,
//     dispatch: () => { },
//     handleLogout: () => { 
//         message.error("Logout Failed")
//     },
// });

// const initialState = { isAuth: false, user: {} };

// const AuthProvider = ({ children }) => {
//     const navigate = useNavigate()
//     // const userId = localStorage.getItem('user-uid');
//     const [state, dispatch] = useState(initialState);
//     const [isAppLoading, setIsAppLoading] = useState(false);

//     const readProfile = useCallback(async (user) => {

//         const docSnap = await getDoc(doc(fireStore, "users", user.uid));

//         if (docSnap.exists()) {
//             const user = docSnap.data()
//             console.log(' firestore user', user)
//             dispatch(s => ({ ...s, isAuth: true, user }));

//         } else {
//             // docSnap.data() will be undefined in this case
//         }
//         setIsAppLoading(false);
//     }, []);

//     useEffect(() => {
//         onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 console.log('user data', user)
//                 // dispatch(s => ({ ...s, isAuth: true, user }));
//                 readProfile(user);
//                 // console.log('User logged in:', user);
//             } else {
//                 // dispatch(s => ({ ...s, isAuth: false, user: {} }));
//                 setIsAppLoading(false);
//             }
//         });
//     }, [readProfile]);
//     const handleLogout = () => {
//         dispatch({ isAuth: false, user: {} });
//         signOut(auth)
//             .then(() => {
//                 message.success('Logout successful');
//                 navigate("/auth/login")
//             })
//             .catch(() => {
//                 message.error('Something went wrong while logging out');
//             });
//     };

//     return (
//         <AuthContext.Provider value={{ ...state, isAppLoading, dispatch, handleLogout }}>
//             {isAppLoading ? <ScreenLoader /> : children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuthContext = () => useContext(AuthContext);

// export default AuthProvider;


import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { message } from 'antd';
import { doc, getDoc } from 'firebase/firestore';
import ScreenLoader from '../Pages/ScreenLoader/ScreenLoader';
import { auth, fireStore } from '../Config/firebase';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({
    isAuth: false, 
    user: {}, 
    isAppLoading: true, 
    dispatch: () => {}, 
    handleLogout: () => { 
        message.error("Logout Failed");
    },
});

const initialState = { isAuth: false, user: {} };

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [state, dispatch] = useState(initialState);
    const [isAppLoading, setIsAppLoading] = useState(true); // Set to true initially

    const readProfile = useCallback(async (user) => {
        try {
            const docSnap = await getDoc(doc(fireStore, "users", user.uid));
            if (docSnap.exists()) {
                const userData = docSnap.data();
                // console.log('Firestore user:', userData);
                dispatch(prevState => ({ ...prevState, isAuth: true, user: userData }));
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log('User logged in:', user);
                await readProfile(user); // Wait until profile is fetched
            }
            setIsAppLoading(false); // Only set after user check completes
        });

        return () => unsubscribe(); // Cleanup the subscription
    }, [readProfile]);

    const handleLogout = () => {
        dispatch({ isAuth: false, user: {} });
        signOut(auth)
            .then(() => {
                message.success('Logout successful');
                navigate("/auth/login");
            })
            .catch(() => {
                message.error('Something went wrong while logging out');
            });
    };

    return (
        <AuthContext.Provider value={{ ...state, isAppLoading, dispatch, handleLogout }}>
            {isAppLoading ? <ScreenLoader /> : children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
