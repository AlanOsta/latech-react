import Mes from './Mes'
import './Calendario.css'

const Calendario = ()  => {
    
        let meses = [];
        for (let i = 0; i < 12; i++){
            meses.push(<Mes key={"mes num"+i} mes={i}/>);
        }
       return <div id="cal" className="anio-container">{meses}</div>;
}

export default Calendario
