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

    const setValueAndDirection = (value) => {
        switchDirection();
        setValue(value);
    }

    return <div>
        <div className={styles.heading}>
            <button className={styles.heading_name} onClick={() => setValueAndDirection("name")}>
                <div>Name</div>

                <SortArrow />
            </button>

            <button className={styles.heading_population} onClick={() => setValueAndDirection("population")}>
                <div>Population</div>

                <SortArrow direction={direction} />
            </button>
        </div>

        {orderedCountries.map((country) => (
            <Link href={`./country/${country.cca3}`}>
                <div className={styles.row}>
                    <div className={styles.name}>{country.name.common}</div>
                    <div className={styles.population}>{country.population}</div>
                </div>
            </Link>
        ))}
    </div>;
};

export default CountriesTable;