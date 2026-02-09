const { useState } = React;

export const SuperheroForm = () => {
    const [heroName, setHeroName] = useState('');
    const [realName, setRealName] = useState('');
    const [powerSource, setPowerSource] = useState('');
    const [powers, setPowers] = useState([]);
    const powerSourceOptions = [ 'Bitten by a strange creature', 'Radioactive exposure', 'Science experiment', 'Alien heritage', 'Ancient artifact discovery', 'Other'];
    const powersOptions = [
        'Super Strength',
        'Super Speed',
        'Flight',
        'Invisibility',
        'Telekinesis',
        'Other'
    ];

    const handlePowersChange = (e) => {
        const { value, checked } = e.target;
        setPowers(checked ? [...powers, value] : powers.filter(p => p !== value));
    }
    return (
    <div className="form-wrap">
        <h2>Superhero Application Form</h2>
        <p>Please complete all fields</p>
        <form method="post" action="https://superhero-application-form.freecodecamp.org">
            <div className="section"></div>
            <label htmlFor="">Hero Name

            <input type="text" value={heroName} onChange={e => setHeroName(e.target.value)}></input>

            </label>
            <label htmlFor="">
            Real Name
            
            <input type="password" value={realName} onChange={e => setRealName(e.target.value)}></input>
            </label>

            <label htmlFor="" className="section column">
            How did you get your powers?
            <select name="" id="" value={powerSource} onChange={e => setPowerSource(e.target.value)}>
                
                <option value="">Select one</option>
                {powerSourceOptions.map(source => (
                    <option key={source} value={source}>{source}</option>
                ))}
                
            </select>
            </label>

            
            <label className="section column" htmlFor="">
                List your powers (select all that apply):
                {
                powersOptions.map(power => (
                    <label key={power}>
                        <input type="checkbox" value={power} checked={powers.includes(power)} onChange={handlePowersChange} />
                        <span>{power}</span>

                    </label>

                ))}

            </label>
            
            <button className="submit-btn" type="submit" disabled={!heroName || !realName || !powerSource || powers.length === 0}>Join the League</button>

            </form>
    </div>
    );


};