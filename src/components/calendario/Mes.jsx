import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { connect } from 'react-redux';
import { addDiaAction, delDiaAction } from '../../api/actions';


class Mes extends React.Component {
    
    constructor(props) {
        super(props);
        this.mes = this.props.mes;

        this.state = {
            dateContext: moment().month(this.mes),            
        };        
    }

    weekdaysShort = moment.weekdaysMin(); // Los nombres en el locale de moment son horribles pero no queria hardcodearlos
    months = moment.months();

    year = () => {
        return this.state.dateContext.format("Y");
    }
    month = () => {
        return this.state.dateContext.format("MMMM");
    }
    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }
    dayOfYear = () => {
        return this.state.dateContext.dayOfYear();
    }
    firstDayOfMonth = () => {
        let firstDay = moment(this.state.dateContext).startOf('month').format('d');
        return firstDay;
    }
    
    postLength = (preLength) => {
        if (preLength % 7 === 0) {
            return 0;
        } else {
            if (preLength < 35) {
                return 35 - preLength;
            } else {
                return 42 - preLength;
            }
        }
    }

    diaClickHandler = (numDia, categoriaSeleccionada) => {
        this.props.dias[numDia] === this.props.categoriaSeleccionada ? this.props.delDia(numDia, this.props.dias) : this.props.addDia(numDia, categoriaSeleccionada, this.props.dias)
    }

    render() {
        // DEVUELVE LOS NOMBRES DE LOS DIAS DE LA SEMANA
        let nombreDias = this.weekdaysShort.map((day) => {
            return (
                <div key={day} className="dow">{day}</div>
            )
        });

        // ARMA EL ARRAY CON LOS DIAS VACIOS PREVIOS AL INICIO DEL MES
        let diasVaciosPrevios = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            diasVaciosPrevios.push(<div key={"diaPre"+i} className="dummy-day"></div>
            );
        }
        
        // ARMA EL ARRAY CON LOS DIAS DEL MES
        let diasDelMes = [];
        for (let i = 1; i <= this.daysInMonth(); i++) {
            let dateContext = moment().year(this.year).month(this.mes).date(i);
            let numDia = dateContext.dayOfYear();
            diasDelMes.push(
                <div 
                key={"dia"+i} 
                className={this.props.categoriaSeleccionada && this.props.dias[numDia] === this.props.categoriaSeleccionada ? 'day seleccionado' : this.props.dias[numDia] ? 'day conTarea' : 'day' } 
                numdia={numDia} 
                onClick={(e)=>{this.diaClickHandler(numDia, this.props.categoriaSeleccionada)}}
                >{i}</div>
            );
        }

        // ARMA EL ARRAY CON LOS DIAS VACIOS POSTERIORES
        let preLength = diasDelMes.length + diasVaciosPrevios.length;
        let diasVaciosPosteriores = [];
        for (let i = 0; i < this.postLength(preLength); i++) {
            diasVaciosPosteriores.push(<div key={"diaPost"+i} className="dummy-day">{i+1}</div>
            );
        }
     
        // ARMA EL ARRAY CON LOS DIAS VACIOS PREVIOS, LOS DIAS DEL MES Y LOS DIAS VACIOS POSTERIORES
        let diasTotales = [...diasVaciosPrevios, ...diasDelMes,...diasVaciosPosteriores];
      
        return (
            <div className="month">
                <h4>{this.month()} {this.year()}</h4>
                {nombreDias}
                {diasTotales}
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        //categorias: state.categorias,
        categoriaSeleccionada: state.categoriaSeleccionada,
        dias: state.dias
    };
};

function mapDispatchToProps(dispatch) {
    return {
        
        addDia: (dia, categoriaSeleccionada, diasPrevio) => dispatch(addDiaAction(dia, categoriaSeleccionada, diasPrevio)),
        delDia: (dia, diasPrevio) => dispatch(delDiaAction(dia, diasPrevio))
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Mes);