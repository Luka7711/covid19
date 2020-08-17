import React, {useState, useEffect} from 'react';

function Statistics(props){
	console.log(props.covid.length, "props")
	let displayStat = () => {
		let elements = props.covid.map((stat, i) => {
			return ( <div key={i}>
						<div>
							<h4>{stat.Date}</h4>
						</div>
						
						<div>
							<ul>
								<li>Active: {stat.Active}</li>
								<li>Confirmed: {stat.Confirmed}</li>
							</ul>
						</div>
						
						<div>
							<ul>
								<li>Deaths: {stat.Deaths}</li>
								<li>Recovered: {stat.Recovered}</li>
							</ul>
						</div>
					</div>
			)
		})
		return elements;
	} 

	return 	<div>
				<h1>Hello</h1>
				{ displayStat() }
			</div>
}

export default Statistics;