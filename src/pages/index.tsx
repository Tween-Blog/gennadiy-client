// 1. Imports
import type { NextPage } from 'next';

import Head from 'next/head';
import Image from 'next/image'

// 2. Component
const Home: NextPage = () => {
  // Variables
  const styles = {
    wrapper: {
      fontFamily: 'Montserrat',
      paddingTop: 50,
      paddingLeft: 50
    },
    row: {
      display: 'flex',
      alignItems: 'center'
    },
    rowTitle: {
      marginLeft: 25
    },
    themeColor: {
      color: '#AF48F4'
    }
  };

  // Return
  return (
    <div style={styles.wrapper}>
      <Head>
        <title>Tween | Gennadiy Zarvigorov</title>
      </Head>
      
      <div style={styles.row}>
        <Image 
          src="/apple-touch-icon.png"
          alt="Logo"
          width={180}
          height={180} />

        <h1 style={styles.rowTitle}>
          Tween | Front-End часть от <span style={styles.themeColor}>Gennadiy Zarvigorov</span>.
        </h1>
      </div>
    </div>
  );
}

// 3. Export
export default Home;