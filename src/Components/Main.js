import React, { useState, useEffect } from 'react';

function Main(){
	
	const [countries, setCountries] 	  = useState([]);
	const [defaultCntry, setDefaultCntry] = useState("Kyrgyzstan"); 

	let getAllCountries = async() => {
		
		try {
				await fetch("https://api.covid19api.com/countries", {
					method:"GET"
				})
				.then(response => response.json())
				.then(data => console.log(data, "data"));
				
		} catch(err) {
			console.log(err);
		}
	}

	useEffect(() => {
		getAllCountries();
	}, [])

	return 	<div>

	   		</div>
}

export default Main;