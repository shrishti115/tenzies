

function Die(props){

    const styless={

        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return(
        <div className="die">
             
            <div className="die-face"
                style= {styless}
                
                onClick={props.Held}
                >

{props.value}
               

            </div>
        </div>
    )

}

export default Die;