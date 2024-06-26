import React from 'react';
import styles from './PokemonEntry.module.css';
import WeightIcon from '../Icons/WeightIcon.jsx';
import RulerIcon from '../Icons/RulerIcon.jsx';
import { getBackgroundColorByIndividualType, formatName, formatNumber, formatStatName, hexToRgb, calculatePercetage, formatWeight, formatHeight } from '../../utils/pokemonUtils';
import { DarkModeContext } from '../../App';
import { useContext } from 'react';
import LeftArrowIcon from '../../assets/icons/arrow-left.svg';
import BackgroundPokeball from '../../assets/icons/pokeball-card-bg.png';

const PokemonEntry = ({ pokemonData, setIsPokemonShowing }) => {
  // Accessing DarkModeContext to determine dark mode state.
  const { isDarkMode } = useContext(DarkModeContext);

  // Determine background color for type badges.
  const backgroundColorType1 = getBackgroundColorByIndividualType(pokemonData, 0);
	const backgroundColorType2 = getBackgroundColorByIndividualType(pokemonData, 1);

  // Function to handle closing Pokemon entry and returning to previous screen.
  const handlePokemonEntry = () => {
    setIsPokemonShowing(false);
  }

  // Render the component.
  return (
    <main style={{ backgroundColor: backgroundColorType1, borderRadius: '20px' }}>
      {pokemonData && (
        <section className={styles.container}>
          <div className={`${styles.pokemonHeader} ${isDarkMode ? styles.DarkMode : ''}`}>
            <header className={styles.pokemonHeaderTop}>
              <img className={styles.backIcon} src={LeftArrowIcon} width="35px" onClick={handlePokemonEntry}/>
              <h1>{formatName(pokemonData.name)}</h1>
              <h2 className={styles.pokemonId}>#{formatNumber(pokemonData.id)}</h2>
            </header>
            <img className={styles.pokemonSprite} src={pokemonData.sprites.other['official-artwork'].front_default} alt={pokemonData.name} loading='lazy' />
            <img className={styles.backgroundPokeball} src={BackgroundPokeball} loading='lazy' />
          </div>
          <div className={`${styles.pokemonInfo} ${isDarkMode ? styles.pokemonInfoDarkMode : ''}`}>
            <div className={styles.pokemonTypes}>
								<span style={{ backgroundColor: backgroundColorType1 }} className={styles.pokemonType}>{formatName(pokemonData.types[0].type.name)}</span>
								{pokemonData.types[1] && <span style={{ backgroundColor: backgroundColorType2 }} className={styles.pokemonType}>{formatName(pokemonData.types[1].type.name)}</span>}
            </div>
            <h2 style={{ color: backgroundColorType1 }}>About</h2>
            <aside className={styles.about}>
              <div className={styles.aboutInfo}>
                <WeightIcon />
                <span>{formatWeight(pokemonData.weight)}</span>
              </div>
              <div className={styles.aboutInfo}>
                <RulerIcon />
                <span>{formatHeight(pokemonData.height)}</span>
              </div>
            </aside>
            <h2 style={{ color: backgroundColorType1 }}>Base Stats</h2>
            <div className={styles.pokemonStats}>
              {pokemonData.stats.map((stat, index) => (
                <div key={index}>
                  <span style={{ color: backgroundColorType1 }}>{formatStatName(stat.stat.name)}  </span>
                  <span>{stat.base_stat}</span>
                  <div style={{ backgroundColor: `rgba(${hexToRgb(backgroundColorType1)}, 0.2)` }} className={styles.statBarContainer}>
                    <div style={{ backgroundColor: backgroundColorType1, width: `${calculatePercetage(stat.base_stat)}%` }} className={styles.statBar}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
    )}
    </main>
  );
}

export default PokemonEntry;
