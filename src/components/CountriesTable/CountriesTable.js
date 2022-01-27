import styles from './CountriesTable.module.css';
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@material-ui/icons';
import Link from "next/link";
import { useState } from 'react';


const orderBy = (countries, value, direction) => {
    if (direction === "asc") {
        return [...countries].sort((a, b) => a[value] > b[value] ? 1 : -1);
    }

    if (direction === "desc") {
        return [...countries].sort((a, b) => a[value] > b[value] ? -1 : 1);
    }

    return countries;
}

const SortArrow = ({ direction }) => {
    if (!direction) {
        return <></>;
    }

    if (direction === "desc") {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowDownRounded color="inherit" />
            </div>
        );
    } else {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowUpRounded color="inherit" />
            </div>
        );
    }
}

const CountriesTable = ({ countries }) => {
    const [direction, setDirection] = useState();
    const [value, setValue] = useState();

    const orderedCountries = orderBy(countries, value, direction);

    const switchDirection = () => {
        if (!direction) {
            setDirection("desc");
        } else if (direction === "desc") {
            setDirection("asc");
        } else {
            setDirection(null);
        }
    }

    const setDirectionValue = (value) => {
        switchDirection();
        setValue(value);
    }

    return <div>
        <div className={styles.heading}>
            <div className={styles.heading_flag}></div>
            <button className={styles.heading_name} onClick={() => setDirectionValue("name.common")}>
                <div>Name</div>

                {value === "name.common" && <SortArrow direction={direction} />}
            </button>

            <button className={styles.heading_population} onClick={() => setDirectionValue("population")}>
                <div>Population</div>

                {value === "population" && <SortArrow direction={direction} />}
            </button>

            <button className={styles.heading_area} onClick={() => setDirectionValue("area")}>
                <div>Area</div>

                {value === "area" && <SortArrow direction={direction} />}
            </button>

            <button className={styles.heading_capital} onClick={() => setDirectionValue("capital")}>
                <div>Capital</div>

                {value === "capital" && <SortArrow direction={direction} />}
            </button>
        </div>

        {orderedCountries.map((country) => (
            <Link href={`./country/${country.cca3}`} passHref key={country.name} >
                <div className={styles.row}>
                    <div className={styles.flag}>
                        <img src={country.flags.svg} alt={country.name.common} />
                    </div>
                    <div className={styles.name}>{country.name.common}</div>
                    <div className={styles.population}>{country.population}</div>
                    <div className={styles.area}>{country.area || 0}</div>
                    <div className={styles.capital}>{country.capital || "No capital"}</div>
                </div>
            </Link>
        ))}
    </div>;
};

export default CountriesTable;