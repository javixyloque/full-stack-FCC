const { useState, useMemo, useCallback } = React;


let prevToggleItem = null;

export const ShoppingList = () => {
    // crear instancia de useMemo para filtrar los items
    
    const [query, setQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const items = ['Apples', 'Bananas', 'Strawberries', 'Blueberries', 'Mangoes', 'Pineapple', 'Lettuce', 'Broccoli', 'Paper Towels', 'Dish Soap'];
    

    // USEMEMO EVITA QUE SE RERENDERICE TODO EL COMPONENTE CADA VEZ QUE CAMBIA EL ESTADO, A DIFERENCIA DE USEEFFECT
    const filteredItems = useMemo(() => {
        console.log("Filtering items...")
        return items.filter(item => item.toLowerCase().includes(query.toLowerCase()));
    }, [query]);
    // const filteredItems = items.filter(item => item.toLowerCase().includes(query.toLowerCase()));

    //  USAR USECALLBACK SIRVE PARA QUE LA FUNCION NO SE RECREE EN CADA RENDERIZADO, SINO SOLO CUANDO CAMBIEN SUS DEPENDENCIAS (ITEMS EN ESTE CASO)
    const toggleItem = useCallback((item) => {
        setSelectedItems(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    }, [setSelectedItems]);


    if (prevToggleItem !==toggleItem) {
        console.log("New toggleItem function")
        prevToggleItem = toggleItem;
    } else {
        console.log("Current toggleItem function")
    }

    return(
        <div className="container">
            <h1>Shopping List</h1>
            <form action="">
                <label htmlFor="search">Search for an item:</label>
                <input type="search" id="search" placeholder="Search..."aria-describedby="search-description" value={query} onChange={e => setQuery(e.target.value)} />
                <p id="search-description">Type to filter the list below:</p>
                <ul>
                    {filteredItems.map(function(item) {
                        const isChecked = selectedItems.includes(item);
                    return (
                        <li style={{textDecoration: isChecked ? 'line-through' : 'none'}} key={item}>
                            <label>
                            <input 
                                type="checkbox"
                                onChange={() => toggleItem(item)}
                                checked={isChecked}
                            />
                            {item}
                            </label>
                        </li>
                        );
                    })}
                </ul>
            </form>
        </div>
    );
};