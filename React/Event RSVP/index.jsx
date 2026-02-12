const { useState } = React;

export function EventRSVPForm() {
    console.log("Rendering EventRSVPForm");
    const [message, setMessage] = useState('');
    const [mostrar, setMostrar] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        attendees: 1,
        dietaryPreferences: "",
        additionalGuests: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        
        setMessage(`RSVP Submitted!
            \nName: ${formData.name}
            \nEmail: ${formData.email}
            \nNumber of attendees: ${formData.attendees}
            \nDietary Preferences: ${formData.dietaryPreferences ? formData.dietaryPreferences : 'None'}
            \nBringing additional guests: ${formData.additionalGuests ? 'Yes' : 'No'}`);
        setMostrar(true);
            return false;
        
    }

    


    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" onChange={e => setFormData({...formData, name: e.target.value})} required/>

            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" onChange={e => setFormData({...formData, email: e.target.value})} required />

            <label htmlFor="attendees">Number of attendees:</label>
            <input type="number" name="attendees" id="attendees" min="1" onChange={e => setFormData({...formData, attendees: e.target.value})} required />

            <label htmlFor="dietary-preferences">Dietary preferences:</label>
            <input type="text" name="dietary-preferences" id="dietary-preferences" onChange={e => setFormData({...formData, dietaryPreferences: e.target.value})} />
            <label htmlFor="additional-guests">Additional guests:</label>
            <input type="checkbox" name="additional-guests" id="additional-guests" onChange={e => setFormData({...formData, additionalGuests: e.target.checked})} />

            <button type="submit">Submit RSVP</button>
        </form>

        {mostrar && <FormattedMessage message={message} />}
        </>    
    );
}

// crear un componente para poder insertar saltos de linea en el mensaje y usarlo en el formulario de EventRSVPForm
export function FormattedMessage({ message }) {
    return (
        <p dangerouslySetInnerHTML={{ __html: message.replace(/\n/g, '<br/>') }}></p>
    );
}