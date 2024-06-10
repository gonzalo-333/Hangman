
import "./App.css";
import { letters } from "./helpers/letters";
import { HangImage } from "./components/HangImage.tsx";
import { useEffect, useState } from "react";
import { getRandomWord } from "./helpers/getRandomWord";



function App() {

	const [ word, setWord ] = useState(getRandomWord);
	const [ hiddenWord, setHiddenWord ] = useState('_ '.repeat( word.length ));
	const [ attempts, setAttempts ] = useState(0);
	const [ loose, setLoose ] = useState( false );
	const [ won, setWon ] = useState ( false );
	const [ hit, setHit ] = useState( '' );
	

	// Determinar si la persona perdió
	useEffect( () => {
		if( attempts >= 9 ){
			setLoose(true);
		}
	}, [ attempts ]);

	// Determinar si la persona ganó
	useEffect( () => {
		const currentHiddenWord = hiddenWord.split(' ').join(''); // con esto remuevo espacios para que pueda coincidir con la constante word
		if( currentHiddenWord === word ){
			setWon( true );
		}
	}, [ hiddenWord ]);


	const checkLetter = ( letter ) => {
		if ( loose ) return; // si loose está en true, no se ejectua nada mas
		if ( won ) return;

		const hitLetters = [ hit ] // agrego letras incorrectas (no estaba 
		                           // en el original)
		
		if( !word.includes( letter )){
			setAttempts( Math.min( attempts + 1, 9 ) );
			hitLetters.push(letter + ' ' );
			setHit( hitLetters );
			return;			
		}

		const hiddenWordArray = hiddenWord.split(' ');
		console.log( hiddenWordArray );

		for( let i = 0; i < word.length; i++ ){
			if( word[i] === letter ){
				hiddenWordArray[i] = letter;			
			}

		}

		setHiddenWord( hiddenWordArray.join(' ') );
	
	}




	const newGame = () => {
		const newWord = getRandomWord();
		
		setWord( newWord );
		setHiddenWord( '_ '.repeat( newWord.length ));
		setAttempts( 0 );
		setHit( false );
		setLoose( false );
		setWon( false );
	}


	return(
		<div className="App">
	
			{/* Imágenes */}
			<HangImage	imageNumber={ attempts } />

			{/* Palabra Oculta */}
			<h3>{hiddenWord}</h3>

			{/* Contador de intentos */}
			<h3>Intentos: { attempts }</h3>

			{/* Intentos fallidos */}
			<h5>Letras erradas: { hit } </h5>

			{/* Mensaje si perdió */}
			{
				( loose ) 
				? <h2>Perdió { word }</h2>
				: ''
			}

			{/* Mensaje si ganó */}
			{
				( won ) 
				? <h2>¡Felicitaciones, usted ganó!</h2>
				: ''
			}

			{/* Botones de letras */}
			{
				letters.map( (letter) => (
					<button
						onClick={ () => checkLetter(letter) }
						key={ letter }>
							{ letter }
					</button>
				))
			}
			
			<br/><br/>
			<button onClick={ newGame }>¿Nuevo Juego?</button>


		</div>
	);

};

export default App;
