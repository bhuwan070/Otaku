import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import Footer from '@/components/Footer';
import AdminSideNav from '@/components/Admin/AdminSideNav';
import AdminNav from '@/components/Admin/AdminNav';
import Login from './login';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  const [isAdmin, setIsAdmin] = useState();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [openSideNav, setOpenSideNav] = useState(false);

  useEffect(() => {
    // console.log("hello");
    window.scrollTo({
      top: 0,
    });
  }, [router.pathname]);

  const checkAdmin = async () => {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/admin/isAdmin`,
        {
          credentials: 'include',
        }
      ).then((r) => {
        return r.json();
      });
      // console.log(data);
      if (data.status === 'error') {
        router.push('/login');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (router.pathname.includes('/login')) {
    return (
      <>
        <Head>
          <link
            rel="shortcut icon"
            href="/assets/imgs/logo.png"
            type="image/x-icon"
            className="object-cover "
          />
          <title>Otaku Festival</title>
        </Head>
        <div>
          <Login />
        </div>
      </>
    );
  } else if (router.pathname.includes('/admin')) {
    if (typeof window !== 'undefined') {
      checkAdmin();
    }
    return (
      <>
        <Head>
          <link
            rel="shortcut icon"
            href="/assets/imgs/logo.png"
            type="image/x-icon"
            className="object-cover "
          />
          <title>Otaku Festival</title>
        </Head>
        <div className="relative flex h-screen ">
          {/* {loading ? (
          <div className="w-[100vw] h-[100vh] justify-center items-center ">
            <div>Loading...</div>
          </div>
        ) : (
            )} */}
          {/* <div>
          <div className="w-[100vw] flex ">
            <div className="flex flex-col min-h-[100vh] right-0 w-[100%] xl:w-[80%]"> */}
          {/* <AdminNav /> */}
          {/* <div> */}
          {openSideNav && (
            <div className="flex left-0 top-0 lg:w-[20%] h-full z-[40] absolute ">
              <AdminSideNav
                openSideNav={openSideNav}
                setOpenSideNav={setOpenSideNav}
              />
            </div>
          )}
          {/* <div className="mr-auto ml-5 mt-3 z-[50] pl-5 pt-5"> */}
          <div className="w-max absolute top-2 left-4 z-[100] bg-gray-100">
            <Image
              src="/assets/icons/menu.png"
              alt="Menu"
              width={25}
              height={25}
              className={` ${openSideNav ? 'hidden' : 'cursor-pointer'}`}
              onClick={() => setOpenSideNav(true)}
            />
          </div>
          {/* </div> */}
          {/* </div> */}

          <Component {...pageProps} />
          {/* </div>
          </div>
        </div> */}
        </div>
      </>
    );
  } else {
    return (
      <>
        <Head>
          {/* primary meta tags */}
          <meta
            name="google-site-verification"
            content="fXeI-OjtXLbOcJLkjKzn40zdEtRNxdpz_gvIc8lIWXA"
          />
          {/* <link
            rel="icon"
            href="/assets/imgs/logo.png"
            type="image/x-icon"
            className="object-cover"
          /> */}
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="keywords"
            content="Otaku, Anime, Festival, Itahari, Otaku Festival, Costumes"
          ></meta>
          <meta
            name="title"
            content="Otaku Festival | Itahari's Biggest Anime Festival"
          />
          <meta
            name="description"
            content="Otaku Festival is the Itahari's Biggest Anime Festival. Check out our current events and join the festival with all the anime enthusiasts. Also see galleries from past events."
          />
          <meta
            name="robots"
            content="index, follow, max-image-preview:large"
          />

          {/* og meta tags Facebook */}
          <meta property="og:url" content="https://otaku-festival.com/" />
          <meta property="og:site_name" content="Otaku Festival" />
          <meta
            property="og:title"
            content="Otaku Festival | Itahari's Biggest Anime Festival"
          />
          <meta
            property="og:description"
            content="Otaku Festival is the Itahari's Biggest Anime Festival. Check out our current events and join the festival with all the anime enthusiasts. Also see galleries from past events."
          />
          <meta
            property="og:image"
            content="http://otakunode.otaku-festival.com/uploads/OtakuFestival.png"
          />
          <meta property="og:image:type" content="image/png" />

          {/* og meta tags Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://otaku-festival.com" />
          <meta
            property="twitter:title"
            content="Otaku Festival | Itahari's Biggest Anime Festival"
          />
          <meta
            property="twitter:description"
            content="Otaku Festival is the Itahari's Biggest Anime Festival. Check out our current events and join the festival with all the anime enthusiasts. Also see galleries from past events."
          />
          <meta
            property="twitter:image"
            content="http://otakunode.otaku-festival.com/uploads/OtakuFestival.png"
          />
        </Head>
        <div>
          <div className="w-[100%] flex justify-center">
            <Navbar />
          </div>
          <Component {...pageProps} />
          <div className="w-[100%] flex justify-center">
            <Footer />
          </div>
        </div>
      </>
    );
  }
}
