import Head from 'next/head'
import Image from 'next/image'
import CountriesTable from '../components/CountriesTable/CountriesTable'
import Layout from '../components/Layout/Layout'
import SearchInput from '../components/SearchInput/SearchInput'
import styles from '../styles/Home.module.css'

export default function Home({name}) {
  // console.log(name);
  return <Layout>

    <div className={styles.counts}>Found {name.length} countries</div>

    <SearchInput placeholder="Filter by Name, Region or SubRegion"/>

    <CountriesTable countries = {name}/>

  </Layout>
}


export const getStaticProps = async () => {

  const res = await fetch("https://restcountries.com/v3.1/all");
  const name = await res.json();

  return {
      props: {
        name,

      },
    };
  
}