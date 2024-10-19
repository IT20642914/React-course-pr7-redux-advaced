import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector ,useDispatch} from 'react-redux';
import { useEffect } from 'react';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-actions';
let isInitial=true;
function App() {
  const carIsVisible = useSelector(state => state.ui.cartIsVisible);
  const cartItems = useSelector(state => state.cart);
  const cartChange = useSelector(state => state.cart.changed);

  const notification=useSelector(state=>state.ui.notification);


const dispatch=useDispatch();

useEffect(() => {
  dispatch(fetchCartData());
}, [])

  useEffect(() => {
if(isInitial){
  isInitial=false;
  return;
}

if(cartChange){
dispatch(sendCartData(cartItems));
}

  }, [cartItems,dispatch])
  
  return (
    <>  
  { notification &&(  <Notification 
    status={notification.status}
    title={notification.title}
    message={notification.message}
    />)}
    <Layout>
      {carIsVisible &&<Cart />}
      <Products />

    </Layout>
    </>

  );
}

export default App;
