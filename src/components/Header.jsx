/* eslint-disable react/prop-types */

/**Me importo el useMemo */
import { useMemo } from "react";



//le metemos el cart   y la funcion removeFrom cart al componente :
function Header({cart,removeFromCart,increaseQuantity,decreaseQuantity,cleanCart}){

    //State derivado para ver si el carrito esta vacio
    //uso el useMemo para decir que solo renderize el carrito una vez q el carrito cambie
    const isEmpty=useMemo(()=>cart.length===0,[cart]);
    //funcion para sumar el total del carrito con la funcion reduce,coge dos valores el total para ir sumando y el item,luego hacemos otra arrowFy sumamos el total por su la cantidad de item por el precio y el 0 es para que empieze de 0
    const cartTotal=useMemo( ()=>cart.reduce((total,item)=>total+(item.quantity*item.price),0),[cart])

    return(
        <>
        <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div 
                        className="carrito"
                    >
                        <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" className="bg-white p-3">
                            {/**llamo a la funcion sin parentesis por que uso el useMemo para ver si carrito esta vacio o hay algo */}
                            {isEmpty ? (
                                <p className="text-center">El carrito esta vacio</p>                                       
                            ):(
                                <>
                                <h4 className="text-center">PRODUCTOS EN EL CARRITO:</h4>                                       
                                <table className="w-100 table">

                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/** añadimos para hacer el carrito de forma dinamica y tbn le ponenmos al ser un pam el id unico al tr*/}
                                        {cart.map(guitarra=>(
                                            <tr key={guitarra.id}>
                                                <td>
                                                    <img className="img-fluid" src={`/img/${guitarra.image}.jpg`} alt="imagen guitarra" />
                                                </td>
                                                <td className="fw-bold">
                                                    {guitarra.name}
                                                </td>
                                                <td className="fw-bold">
                                                        {guitarra.price} €
                                                </td>
                                                <td className="flex align-items-start gap-4">
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark"
                                                        onClick={()=>decreaseQuantity(guitarra.id)}
                                                    >
                                                        -
                                                    </button>
                                                        {guitarra.quantity}
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark"
                                                        onClick={()=>increaseQuantity(guitarra.id)}
                                                    >
                                                        +
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger"
                                                        type="button"
                                                        onClick={()=>removeFromCart(guitarra.id)}
                                                    >
                                                        X
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <p className="text-end">Total pagar: <span className="fw-bold">{cartTotal} €</span></p>
                                <button 
                                className="btn btn-dark w-100 mt-3 p-2"
                                onClick={cleanCart}
                                >Vaciar Carrito</button>

                                </>
                            )}
                            
                        
                        
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
        
        
        
        </>
    )
}

export default Header;