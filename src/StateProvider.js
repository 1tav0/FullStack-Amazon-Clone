import React, { createContext, useContext, useReducer } from 'react'

//prepares the dataLayer
export const StateContext = createContext()

//wrap our app in context and provie the Data Layer to every component in the app
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)


//to pull information from the dataLayer
export const useStateValue = () => useContext(StateContext)

// export const useStateValue = () => {
//     const [state, dispatch] = useContext(StateContext)
  
//     useEffect(() => {
//       localStorage.setItem('basket', JSON.stringify(state.basket))
//     }, [state.basket])

//     useEffect(() => {
//         localStorage.setItem('user', JSON.stringify(state.user));
//       }, [state.user]);
    
  
//     return [state, dispatch]
//   }