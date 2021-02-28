const estadoInicial = {
    categorias: [],
    categoriaSeleccionada: "",
    inputCatValue: "",
    dias: {}
};

const calendarioReducer = (estadoPrevio = estadoInicial, action) => {
    switch(action.type) {

        case 'CARGAR_FB':
            return {
                categorias: action.categorias,
                categoriaSeleccionada: action.categorias[0],
                inputCatValue: "",
                dias: action.dias
            }

        case 'ADD_CAT':
            return{
                ...estadoPrevio,
                categorias: [...estadoPrevio.categorias, action.categoria],
                categoriaSeleccionada: action.categoria,
                inputCatValue: ""
            }

        case 'DEL_CAT':
            let estadoNuevo = {...estadoPrevio}
            let diasNuevo = {}
            let categoriasNuevo = estadoPrevio.categorias.filter(cat => cat !== action.categoria)
            
            for (let dia in estadoNuevo.dias){
                if ( estadoNuevo.dias[dia] !== action.categoria){
                    diasNuevo = {...diasNuevo, [dia] : estadoPrevio.dias[dia]}
                }
            }
            return {
                ...estadoPrevio,
                categorias: categoriasNuevo,
                categoriaSeleccionada: categoriasNuevo[0] ,
                dias: diasNuevo
            }

        case 'SEL_CAT':
            return {
                ...estadoPrevio,
                categoriaSeleccionada : action.categoria
            }

        case 'INPUT_CAT':
            return {
                ...estadoPrevio,
                inputCatValue: action.inputValue
            }

        case 'ADD_DIA':        
        return {
            ...estadoPrevio,
            dias : {...estadoPrevio.dias, [action.dia] : action.categoria }
        }

        case 'DEL_DIA':
            
            let estadoNuevo1 = {};
            const {"dias": parentValue, ...noChild} = estadoPrevio;
            const {[action.dia]: removedValue, ...childWithout} = parentValue;
            estadoNuevo1 = {...noChild, "dias": childWithout};
            
        return estadoNuevo1
            
        default:
            return estadoPrevio
    };
};

export default calendarioReducer;
