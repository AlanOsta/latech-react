import React from 'react'
import "./Categorias.css"
import { connect } from 'react-redux';
import { selCatAction, delCatAction, addCatAction, inputCatAction, cargarFirebaseAction } from '../../api/actions';

class Categorias extends React.Component {

    componentDidMount() {this.props.cargarFirebase()};

    actualizaInputValue = e => {this.props.inputCat(e.target.value)};

    selCatClickHandler = cat => {this.props.selCat(cat)};

    agregarCategoria = cat => {
        if (this.props.categorias.includes(cat)){
            alert("La categoria ya existe")
        }else {
            this.props.addCat(cat)
        }
    };

    eliminarCategoria = cat => {
        if (window.confirm("¿Esta seguro que desea borrar esta categoria y todos los dias contenidos en ella?")){
            this.props.delCat(cat, this.props.dias);
        }
    }
    
    render() {
        // Creo los botones para las categorias
        let botonesCategorias = this.props.categorias.map((cat) => {
            return (
                <div key={cat+"div"} className="boton-cat-container">
                    <div 
                        key={cat} 
                        className={this.props.categoriaSeleccionada === cat ? 'botonCat seleccionado' : 'botonCat'} 
                        onClick={() => this.selCatClickHandler(cat)}>
                        {cat}
                    </div>
                    <div
                    key={cat+"x"} 
                    className={this.props.categoriaSeleccionada === cat ? 'botonX seleccionado' : 'botonX'} 
                    onClick={ () => this.eliminarCategoria(cat)}>
                        X
                    </div>
                </div>
            )
        });

        return (
            <div className="categorias-container">
                <div>
                    <h4 className="titulo">Agregar una categoria:</h4>
                    <label htmlFor="addCatValue">
                        <input 
                        type="text" 
                        value={this.props.inputCatValue}
                        onChange={(e) => this.actualizaInputValue(e)} 
                        placeholder="Ingrese una categoria"/>
                        <button onClick={() => this.agregarCategoria(this.props.inputCatValue)}>Agregar</button>
                    </label>
                </div>
                <div className= 'seleccion-categorias'>
                    {botonesCategorias}                    
                </div>
            </div>
            
        );
    };
};

function mapStateToProps(state) {
    return {
        categorias: state.categorias,
        categoriaSeleccionada: state.categoriaSeleccionada,
        inputCatValue: state.inputCatValue,
        dias: state.dias 
    };
};

function mapDispatchToProps(dispatch) {
    return {
        selCat: (cat) => dispatch(selCatAction(cat)),
        delCat: (cat, diasPrevio) => dispatch(delCatAction(cat, diasPrevio)),
        addCat: (cat) => dispatch(addCatAction(cat)),
        inputCat: (value) => dispatch(inputCatAction(value)),
        cargarFirebase: () => dispatch(cargarFirebaseAction())

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categorias);
