import React from 'react';
import Layout from './layout/Layout';

function App() {
  // const router = useRouter();
  // const error401Count = useRef(0);

  // const logoutTheUser = useCallback(async () => {
  //   if (localStorage.getItem('authToken') && error401Count.current === 0) {
  //     error401Count.current = 1;
  //     Swal.fire({
  //       title: 'Login expired',
  //       text: 'Please login again!',
  //       showConfirmButton: true,
  //       confirmButtonText: 'Login',
  //     }).then(async (result) => {
  //       error401Count.current = 0;
  //       async function successHandler(response) {
  //         await response.json();
  //         localStorage.removeItem("authToken");
  //         localStorage.removeItem("userData");
  //         dispatch(resetUser());
  //         router.push("/auth/login");

  //       }

  //       async function handleBadReq(response) {
  //         let error = await response.json();
  //         console.log(error)
  //       }
  //       if (result.isConfirmed) {
  //         return await userLogoutApi({}, { successHandler, handleBadReq })
  //       }
  //       return;
  //     })
  //   }
  // }, [router, dispatch]);


  // // currently in test mood
  // useEffect(() => {
  //   const timer = new IdleTimer({
  //     timeout: 600,
  //     onTimeout: async () => {
  //       return await logoutTheUser()
  //     },
  //     onExpired: async () => {
  //       return await logoutTheUser()
  //     }
  //   });

  //   return () => {
  //     timer.cleanUp();
  //   }
  // }, [logoutTheUser])
  return <Layout />;
}

export default App;
