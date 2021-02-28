import {db} from "./firebase"

export const addCatAction = categoria => ({type: 'ADD_CAT', categoria: categoria});

export const delCatAction = (categoria, diasPrevio) => {
    let diasFB = {}
    for (let dia in diasPrevio){
        if (diasPrevio[dia] !== categoria){
            diasFB = {...diasFB, [dia] : diasPrevio[dia]}
        }
    }
    return (dispatch) => {
        db.collection("calendario").doc("anioR").set({diasFB});
        dispatch({type: 'DEL_CAT', categoria: categoria});
    }
}

export const selCatAction = categoria => ({type: 'SEL_CAT', categoria: categoria});

export const inputCatAction = inputValue => ({type: 'INPUT_CAT', inputValue: inputValue});

export const addDiaAction = (dia, categoria, diasPrevio) => {
    const diasFB = {...diasPrevio, [dia]: categoria }
    return (dispatch) => {
        db.collection("calendario").doc("anioR").set({diasFB})
        dispatch({type: 'ADD_DIA', dia: dia, categoria: categoria})
    };
};

export const delDiaAction = (dia, diasPrevio) => {
    const { [dia]: value, ...diasFB } = diasPrevio;
    return (dispatch) => {
        db.collection("calendario").doc("anioR").set({diasFB});
        dispatch({type: 'DEL_DIA', dia: dia})
    }
};

export const cargarFirebaseAction = () => {
    return (dispatch) => {
        let docRef = db.collection("calendario").doc("anioR");
        docRef.get()
            .then(function(doc) {
                let dias = doc.data().diasFB
                let categorias = Array.from(new Set(Object.values(dias)))
                dispatch({type: 'CARGAR_FB', dias, categorias})        
            })
            .catch(function(error) {
                console.log("Error al obtener el documento:", error)
            });        
    }
};