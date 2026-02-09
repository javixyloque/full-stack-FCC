const { useState } = React;

export const ColorPicker = () => {
    const [color, setColor] = useState("#ffffff");

    const cambiarColor = (e) => {
        setColor(e.target.value)
        console.log(e.target.value)
    }

    return  (
        
        <div id="color-picker-container" style={{backgroundColor: color}}>
            <input type="color" id="color-input" value={color}
            onChange={cambiarColor} />
            
        </div>
            
    )
};