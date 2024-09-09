import './Card.css';

const Card = ({pokemon}) =>{
    return(
        <div className = "card">
            <div className = "cardImg">
                <img src = {pokemon.sprites.front_default} arl=""></img>
                <h3 className="cardName">{pokemon.name}</h3>
                <div className="cardTypes">
                    <div>タイプ</div>
                    {pokemon.types.map((type) =>{
                        return(
                            <div key={type.type.name}><span>{type.type.name}</span></div>
                        )
                    })}
                    <div className="cardInfo">
                        <div className="cardDate">
                            <p className="title">重さ:{pokemon.weight}kg</p>
                        </div>
                        <div className="cardDate">
                            <p className="height">高さ:{pokemon.height}m</p>
                        </div>
                        <div className="cardDate">
                            <p className="ability">アビリティ:{pokemon.abilities[0].ability.name}kg</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;