export const MoodBoardItem =({color, image, description})  => {
    return (
        <div className="mood-board-item" style={{backgroundColor: color}}>
            <img className="mood-board-image" src={image} />
            <h3 className="mood-board-text">{description}</h3>
        </div>
    )
}

export const MoodBoard =( ) => {
    let cartas = [
        {   
            id: 1, 
            color: "pink", 
            image: "https://media.istockphoto.com/id/1216765464/es/foto/kabukicho-en-el-distrito-de-shinjuku-tokio-jap%C3%B3n.webp?s=612x612&w=is&k=20&c=6MSzKyOTRg4hXw9H-rnjRKtwIenfnGYCzAgto_2IZSM=", description: "Tokyo"
        },
        {
            id: 2,
            color: "orange",
            image: "https://www.amsterdam.net/es/wp-content/uploads/sites/93/amsterdam-canales-puentes-hd.jpg",
            description: "Amsterdam"
        },
        {
            id: 3,
            color: "red",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc-fkcz1MhnePDApb_Va1Qhdqp6Pc5tVs3Kg&s",
            description: "Hong Kong"
        },

    ];

    return (
        <div>
            <h1 className="mood-board-heading">Destination Mood Board</h1>
            <div className="mood-board">
                {cartas.map((carta) => {
                    return <MoodBoardItem key={carta.id} color={carta.color} image={carta.image} description={carta.description} />
                })}
            </div>
        </div>
    )
}