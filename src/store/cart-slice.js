import { createSlice } from "@reduxjs/toolkit";
const cartSlice= createSlice({
    name: 'cart',
    initialState: { items: [], totalQuantity: 0, changed: false },
    reducers: {
        replaceCart(state, action){
            state.totalQuantity=action.payload.totalQuantity;
            state.items=action.payload.items;
        },
        addItemToCArt(state, action) {
                const item=action.payload;
                const existingItem=state.items.find(item=>item.id===action.payload.id);
                state.totalQuantity++;
                state.changed=true;
                if(!existingItem){
                    state.items.push({
                        id: item.id,
                        price: item.price,
                        quantity: 1,
                        totalPrice: item.price,
                        name: item.title
                    });
                }
                else{
                    existingItem.quantity++;
                    existingItem.totalPrice=existingItem.totalPrice+item.price;
                }
        },
        removeItemFromCart(state, action){
            const id=action.payload;
            const existingItem=state.items.find(item=>item.id===id);
            state.totalQuantity--;
            state.changed=true;
            if(existingItem.quantity===1){
                state.items=state.items.filter(item=>item.id!==id);
            }
            else{
                existingItem.quantity--;
                existingItem.totalPrice=existingItem.totalPrice-existingItem.price;
            }
           
        }
    }

})



export const cartActions=cartSlice.actions;
export default cartSlice;