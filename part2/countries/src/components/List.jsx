
const List = ({countriesToShow}) => {
  if(countriesToShow.length === 1){
   return(
    <div>
      <h1>{countriesToShow[0].name.common}</h1>
      <p>Capital {countriesToShow[0].capital}</p>
      <p>Area {countriesToShow[0].area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(countriesToShow[0].languages).map(language=>
          <li key={language}>{language}</li>
        )}
      </ul>
      <img src={countriesToShow[0].flags.png}/>
    </div>
   )
  }
  else if(countriesToShow.length < 10){
    return(
      <div>
        {countriesToShow.map(country => (
          <p key={country.name.common}>{country.name.common}</p>
        ))}
      </div>
    )}
  else{
    return(
    <div>Too many countries, be more specific</div>
  )}
}

export default List