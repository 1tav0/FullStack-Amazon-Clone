export const initialState = {
    basket: [],
    user: null
}

//Selector
export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0)


//reducer is always listening for a dispatch in this case add to basket
const reducer = (state, action) => {
    // console.log(action)
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state, //whatever the original state was but we are returning also
                basket: [...state.basket, action.item] //whatever (...state.basket) the basket was but with the new items in the basket (action.type)
            }
        
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }
        
        case 'REMOVE_FROM_BASKET':
           const index = state.basket.findIndex(
            (basketItem) => basketItem.id === action.id //find the index of the item in the array
            )
            
            let newBasket = [...state.basket] //copy the whole list of array of items in basket

            if (index >= 0) {
                newBasket.splice(index,1) //remove from that copied list the item with the index 1 simply means just 1 item to delete
            } else {
                console.warn(`Cannot remove (id: ${action.id}) as its not in the basket!`)
            }
            return { //return the state with new stuff in the basket which is deleted items
                ...state,
                basket: newBasket
            }
        
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        
        case "SET_BASKET":
            return {
                ...state,
                basket: action.basket,
            }
        
        default:
            return state;
    }

}

//reducer is always listening for a dispatch in this case add to basket
// const reducer = (state, action) => {
//     // console.log(action)
//     switch (action.type) {
//       case "ADD_TO_BASKET":
//         const new_basket = [...state.basket, action.item];
//         localStorage.setItem("basket", JSON.stringify(new_basket));
//         return {
//           ...state,
//           basket: new_basket,
//         };
  
//       case "REMOVE_FROM_BASKET":
//         const index = state.basket.findIndex(
//           (basketItem) => basketItem.id === action.id //find the index of the item in the array
//         );
  
//         let newBasket = [...state.basket]; //copy the whole list of array of items in basket
  
//         if (index >= 0) {
//           newBasket.splice(index, 1); //remove from that copied list the item with the index 1 simply means just 1 item to delete
//         } else {
//           console.warn(`Cannot remove (id: ${action.id}) as its not in the basket!`);
//         }
  
//         localStorage.setItem("basket", JSON.stringify(newBasket));
//         return {
//           //return the state with new stuff in the basket which is deleted items
//           ...state,
//           basket: newBasket,
//         };
  
//         case "SET_USER":
//         localStorage.setItem("user", JSON.stringify(action.user));
//         return {
//           ...state,
//           user: action.user,
//         };
  
//       case "SET_BASKET":
//         localStorage.setItem("basket", JSON.stringify(action.basket));
//         return {
//           ...state,
//           basket: action.basket,
//         };
  
//       default:
//         const basket = localStorage.getItem("basket");
//         if (basket) {
//           return {
//             ...state,
//             basket: JSON.parse(basket),
//           };
//         }
//         return state;
//     }
//   };

export default reducer