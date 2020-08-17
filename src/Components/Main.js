import React, { useState, useEffect } from 'react';
import Countries from './Countries';

function Main(){
	
	const [countries, setCountries] 	  = useState([]);
	const [defaultCntry, setDefaultCntry] = useState("Kyrgyzstan"); 

	let getAllCountries = async() => {
		
		try {
				await fetch("https://api.covid19api.com/countries", {
					method:"GET"
				})
				.then(response => response.json())
				.then(data => setCountries(data));
		} catch(err) {
			console.log(err);
		}
	}

	useEffect(() => {
		getAllCountries();
	}, []);

	return 	<div>
				{ countries.length > 0 ? <Countries countryNames={countries}/> : null }
	   		</div>
}

export default Main;