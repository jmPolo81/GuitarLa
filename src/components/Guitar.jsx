/* eslint-disable react/prop-types */
/**Meto el props que cree en la el componente guitar,tambien le puedo meter lo set como el setCart,funciones... */
 export default function Guitar({guitarra,addToCart}){

//me creo una constante entre llaves de las propiedades del objeto y asi utlizarlas directamente luego
  const{name,image,description,price}=guitarra;

  

    return(
        <>      
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
              <img
                className="img-fluid"
                src={`/img/${image}.jpg`}
                alt="imagen guitarra"
              />
            </div>
            <div className="col-8">
              <h3 className="text-black fs-4 fw-bold text-uppercase">
                {/**Meto el props creado con su propiedad para que lo cree dinamicamente en cada componente */}
                {name}
              </h3>
              <p>
                {description}
              </p>
              <p className="fw-black text-primary fs-3">{price} €</p>
              {/**creo en la funcion oonClick una arrowFunction y le paso la funcion de agregar carrito y de pàrametro el objeto guitarra */}
              <button type="button"  className="btn btn-dark w-100" onClick={ ()=>addToCart(guitarra) }>
                Agregar al Carrito
              </button>
            </div>
          </div>


        </>

    )
}