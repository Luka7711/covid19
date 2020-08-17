import React, {useState, useEffect} from 'react';
import Statistics from './Statistics';

function Countries(props){
	const [defaultCntry, setDefaultCntry] = useState("kyrgyzstan"); 
	const [selected, setSelected]		  = useState("");
	const [covid, setCovid]		  		  = useState([]);
	
	let countryList = () => {
		
		let object = props.countryNames.map((name, i) => {
			return <option val={name.Slug} key={i}>
						{ name.Country }
				   </option>
		});

		// if (selected == "") {
		// 		// find default country through option list
		// 		// add attribute selected
		// 		let countryNames = document.querySelector("option");	
		// };
		return object;
	}

	let covidByCountry = async() => {
		try {
			setCovid([]);
			console.log(selected, "selected")
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

	let handleChange = (e) => {
		setSelected(e.target.value);
	}


	useEffect(() => {
		covidByCountry();
	},[]);

	useEffect(() => {
		covidByCountry()
	}, [selected]);


	return 	<div>
				<select onChange={e => handleChange(e)}> 
					{ countryList() } 
				</select>
				{ covid.length === 5 ? <Statistics covid={covid}/> : null }
			</div>
}

export default Countries;