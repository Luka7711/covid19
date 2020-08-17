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
		return object;
	}

	let covidByCountry = async() => {
		try {
			setCovid([]);
			let search;
			
			if(selected == "") search = defaultCntry;
			else search = selected;
			await fetch(`https://api.covid19api.com/total/country/${search}`, {
				"method":"GET"
			})
			.then(response => response.json())
			.then((data) => {
				console.log(data, "data")
				// pull up data for last 5 days
				for(let i=1; i < 6 ; i++){
					// it might be not a right way to save new data;
					setCovid(oldData => [...oldData, data[data.length - i]])
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
					<option selected>
						Kyrgyzstan
					</option>
				</select>
				{ covid.length > 4 ? <Statistics covid={covid}/> : "loading" }
			</div>
}

export default Countries;