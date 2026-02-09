const { useState, useEffect } = React;

export function FruitsSearch() {

    const [query, setQuery] =useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const timeoutId = setTimeout(async() => {
            try{
                const response = await fetch(`https://fruit-search.freecodecamp.rocks/api/fruits?q=${query}`);
                const data = await response.json();

                
                setResults(data.map(fruta => fruta.name));
                // setResults(data);
            }catch (error) {
                console.error(error);
            }
        }, 700)
        
        if (query.trim() === '') {
            setResults([]);
            return;
        }
        return () => clearTimeout(timeoutId);

            
    }, [query]);

    function handleSubmit (e) {
        e.preventDefault();

    }


    return (
        <div id="search-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="search-input">Search for fruits:</label>
                <input type="search" id="search-input" value={query} onChange={e => setQuery(e.target.value)} />
            </form>
            <div id="results">
                {results.length > 0 ? 
                results.map((fruta, index) => {
                    return <p className="result-item" key={index}>{fruta}</p>
                })    : 
                <p>No results found</p>
            }
            </div>
        </div>
    );
}