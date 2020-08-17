import React, {useState, useEffect} from 'react';

function Countries(props){

	const [defaultCntry, setDefaultCntry] = useState("kyrgyzstan"); 
	const [selected, setSelected]		  = useState("");
	const [covid, setCovid]		  = useState([]);
	

	let covidByCountry = async() => {
		
		try {
			let search;
			
			if(selected == "") search = defaultCntry;
			else search = selected;

			await fetch(`https://api.covid19api.com/total/country/${search}`, {
				"method":"GET"
			})
			.then(response => response.json())
			.then((data) => {
				// pull up data for last 5 days
				for(let i=1; i < 6 ; i++){
					// it might be not a right way to save new data;
					setCovid(oldData => [...oldData, data[data.length -1]])
				}
			});

		} catch(err){
			console.log(err);
		}
	} 

	useEffect(() => {
		covidByCountry();
	},[]);

	useEffect(() => {
		
	})

	useEffect(() => {
		
	}, [selected]);


	return 	<div>
				<h1>Hello World</h1>
			</div>
}

export default Countries;