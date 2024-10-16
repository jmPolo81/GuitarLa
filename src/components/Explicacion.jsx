//import React from "react"; si importo React tengo todos los metodos de react
//import { Fragment } from "react"; se utliza para poder meter varios elementos en el return
//me creo el componente con el mismo nombre que el componente,
//***el componente siempre se crea en mayusculas */
//esta es la mejor forma xq no hace falta importar nada:
//solo se puede mandar un elemento en el return pero sinquierres mandar varios elementos utilza dentro del return 
// <>   </>

function Explicacion(){
    //aqui puedo hacer logica y crear variables
    const nombre="Jose";

    return(
        <>

        <h1>Hola {nombre}</h1>
        <p>Ahora si puedo meter dos elementos</p>

        </>
        

    )
}

//siempre se exporta para que se pueda utilizar
export default Explicacion;

//tambien podria poner export default antes de function y ya me ahorro este paso anterior