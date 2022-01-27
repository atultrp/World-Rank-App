import { useState } from 'react'
import CountriesTable from '../components/CountriesTable/CountriesTable'
import Layout from '../components/Layout/Layout'
import SearchInput from '../components/SearchInput/SearchInput'
import styles from '../styles/Home.module.css'
import axios from 'axios';

export default function Home({ name }) {
  // console.log(name);

  const [keyword, setKeyword] = useState("");

  const filterdCountries = name.filter(country =>
    country.name.common.toLowerCase().includes(keyword) || country.region.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  }

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found {name.length} countries</div>

        <div className={styles.input}>
          <SearchInput placeholder="Filter by Country or Region" onChange={onInputChange} />
        </div>
      </div>

      <CountriesTable countries={filterdCountries} />

    </Layout>
  );
}


export const getServerSideProps = async () => {

  const res = await axios.get("https://restcountries.com/v3.1/all");
  const name = await res.data;

  return {
    props: {
      name,

    },
  };

}