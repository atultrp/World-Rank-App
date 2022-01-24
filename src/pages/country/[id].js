import Layout from '../../components/Layout/Layout';
import styles from './Country.module.css';
import { useState, useEffect } from 'react'

const getCountry = async (id) => {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);

    const country = await res.json();
    return country;
}

const Country = ({ country }) => {
    console.log(country);
    const countryInfo = country[0];
    const [borders, setBorders] = useState([]);

    const getBorders = async () => {
        const bordersInfo = await Promise.all(countryInfo.borders.map((border) => getCountry(border)));

        setBorders(bordersInfo);
    }
    console.log(borders);

    useEffect(() => {
        getBorders();
        //eslint-disable-next-line
    }, []);


    return (
        <Layout title={countryInfo.name.common}>
            <div className={styles.container}>

                <div className={styles.container_left}>

                    <div className={styles.overview_panel}>
                        <img src={countryInfo.flags.svg} alt={countryInfo.name.common} />

                        <h1 className={styles.overview_name}>{countryInfo.name.common}</h1>

                        <div className={styles.overview_region}>{countryInfo.region}</div>

                        <div className={styles.overview_numbers}>

                            <div className={styles.overview_population}>
                                <div className={styles.overview_value}>{countryInfo.population}</div>
                                <div className={styles.overview_label}>Population</div>
                            </div>

                            <div className={styles.overview_area}>
                                <div className={styles.overview_value}>{countryInfo.area}</div>
                                <div className={styles.overview_label}>Area</div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className={styles.container_right}>

                    <div className={styles.details_panel}>
                        <h4 className={styles.details_panel_heading}>Details</h4>

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Capital</div>
                            <div className={styles.details_panel_value}>{countryInfo.capital}</div>
                        </div>

                        {/* <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Languages</div>
                        <div className={styles.details_panel_value}>Object.values({countryInfo.languages}).join(',')</div>
                    </div> */}

                        {/* <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Currencies</div>
                        <div className={styles.details_panel_value}>Object.values({countryInfo.currencies}).join(',')</div>
                    </div> */}

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Official Name</div>
                            <div className={styles.details_panel_value}>{countryInfo.name.official}</div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Subregion</div>
                            <div className={styles.details_panel_value}>{countryInfo.subregion}</div>
                        </div>

                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>Timezone</div>
                            <div className={styles.details_panel_value}>{countryInfo.timezones}</div>
                        </div>

                        <div className={styles.details_panel_borders}>
                            <div className={styles.details_panel_borders_label}>Neighbouring Countries</div>

                            <div className={styles.details_panel_borders_container}>

                                {borders.map((border) => (
                                    <div className={styles.details_panel_borders_country}>
                                        <img src={border[0].flags.svg} alt={border[0].name.common} />
                                        <div className={styles.details_panel_borders_name}>{border[0].name.common}</div>
                                    </div>
                                ))}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Country;

export const getServerSideProps = async ({ params }) => {

    const country = await getCountry(params.id);
    return {
        props: {
            country,
        },
    };
};