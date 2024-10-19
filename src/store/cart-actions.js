import { uiActions } from "./ui-sclice";
import { cartActions } from "./cart-slice";
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-coourse-redux-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch cart data");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,
      }));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cartItems) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );
    const sendRequest = async () => {
      try {
        const response = await fetch(
          "https://react-coourse-redux-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
            body: JSON.stringify({
                items: cartItems.items,
                totalQuantity: cartItems.totalQuantity,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Sending cart data failed");
        }
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "success",
            message: "send cart data successfully!",
          })
        );
      } catch (error) {
        console.log(error);
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error",
            message: "Sending cart data failed!",
          })
        );
        throw new Error("Sending cart data failed");
      }
    };
    sendRequest();
  };
};
