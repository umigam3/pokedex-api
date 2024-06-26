import React from 'react';
import styles from './PokemonCard.module.css';
import PokeBall from '../../assets/icons/pokeball-card-bg.png'
import { useContext } from 'react';
import { getBackgroundColorByType, getBackgroundColorByIndividualType, formatName, formatNumber } from '../../utils/pokemonUtils';
import { getPokemonData } from '../../hooks/useFetchSinglePokemonData';
import { DarkModeContext } from '../../App';

const PokemonCard = ({ pokemonUrl, setIsPokemonShowing, setDisplayPokemonData }) => {

	// Fetching Pokemon data from the API based on the URL.
	const { pokemonData } = getPokemonData(pokemonUrl);
	// Accessing the DarkModeContext to determine if dark mode is enabled.
	const { isDarkMode } = useContext(DarkModeContext);

	// Determine the background color of the card and types based on whether dark mode is enabled or not.
  const backgroundColor = !isDarkMode ? getBackgroundColorByType(pokemonData) : 'transparent';
	const backgroundColorType1 = getBackgroundColorByIndividualType(pokemonData, 0);
	const backgroundColorType2 = getBackgroundColorByIndividualType(pokemonData, 1);

	// Function to handle showing detailed information of the Pokemon on click.
	const handleShowPokemon = () => {
		setIsPokemonShowing(true);
		setDisplayPokemonData(pokemonData);
	}

	// Render the component.
	return (
		<div className={styles.cardContainer}>
			{pokemonData && (
				<div onClick={handleShowPokemon} style={{ backgroundColor: backgroundColor }} className={`${styles.pokemonCard} ${isDarkMode ? styles.pokemonCardDarkMode : ''}`}>
					<div className={styles.pokemonDetails}>
						<div className={styles.pokemonInfo}>
							<span className={styles.pokemonId}>#{formatNumber(pokemonData.id)}</span>
							<span className={styles.pokemonName}>{formatName(pokemonData.name)}</span>
						</div>
						<div>
							<span style={isDarkMode ? { borderBottom: `2px solid ${backgroundColorType1}` } : { backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '15px' }} className={styles.pokemonType}>{formatName(pokemonData.types[0].type.name)}</span>
							{pokemonData.types[1] && <span style={isDarkMode ? { borderBottom: `2px solid ${backgroundColorType2}` } : { backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '15px' }} className={styles.pokemonType}>{formatName(pokemonData.types[1].type.name)}</span>}
						</div>
					</div>
					<div className={styles.pokemonImage}>
						{pokemonData.sprites.other['official-artwork'].front_default && (
							<img className={styles.pokemonImageSprite} src={pokemonData.sprites.other['official-artwork'].front_default} alt={pokemonData.name} loading='lazy' />
						)}
					</div>
					<img className={`${styles.pokemonBackground} ${isDarkMode ? styles.pokemonBackgroundDarkMode : ''}`} src={PokeBall} alt={pokemonData.name}/>
				</div>
			)}
		</div>
	);
}

export default PokemonCard;