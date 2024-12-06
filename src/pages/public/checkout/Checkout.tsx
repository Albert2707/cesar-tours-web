import { Table } from '../../../shared/components/table/Table';
import { useBookingStore } from '../../../shared/hooks/booking/useBookingStore';
import { enUS } from "date-fns/locale/en-US";
import { es } from "date-fns/locale/es";
import './Checkout.scss'
import { format } from 'date-fns';
import { useIdiom } from '../../../context/idiomContext';
import { IdiomTypes } from '../../../context/idiomTypes';
import { SubmitHandler, useForm } from 'react-hook-form';
interface Inputs {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    optionalPhone: string;
    countryId: string;
    airline: string;
    flightNumber: string;
    comments: string;
}
const Checkout = () => {
    const {
        register,
        // setValue,
        handleSubmit,
        // watch,
        // control,
        // formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        alert("funcionando")
        console.log(data)
    }

    const { trip_type, passengerNo, bagsNo, departureHour, departureDate, vehicle } = useBookingStore();
    const fecha = departureDate;
    const { idiom } = useIdiom() as IdiomTypes;
    const fechaEnEspanol = format(fecha, "d 'de' MMMM 'de' yyyy", { locale: es });
    const fechaEnIngles = format(fecha, "MMMM d, yyyy", { locale: enUS });
    if (!vehicle) return <div style={{ height: "calc(100vh - 112px)", display: "flex", justifyContent: "center", alignItems: "center" }}>No hay vehiculo seleccionado</div>
    const triggerSubmit = () => {
        handleSubmit(onSubmit)(); // Llama a handleSubmit manualmente
      };
    return (
        <section className="checkout">
            <div className="wrapper">
                <div className="top" style={{ display: "flex" }}>

                    <div className="left">
                        <h2>Datos de Facturación</h2>
                        <form action="" onSubmit={handleSubmit(onSubmit)} className="checkout-form">
                            <input type="file" onChange={(e) => {console.log(e.target.files)}} /> 
                            <div className="item customer">
                                <div className="name">
                                    <label htmlFor="name">Name</label>
                                    <input id="name" className="forminput" type="text" placeholder="Name"  {...register("name", { required: true })} />
                                </div>
                                <div className="last-name">
                                    <label htmlFor="last_name">LastName</label>
                                    <input id="last_name" className="forminput" type="text" placeholder="Last Name"  {...register("lastName", { required: true })} />
                                </div>
                            </div>
                            <div className="item">
                                <label htmlFor="email">Email</label>
                                <input className="forminput" type="email" placeholder="Email" {...register("email", { required: true })} />
                            </div>
                            <div className="item">
                                <label >Phone number</label>
                                <input className="forminput" type="text" placeholder="Phone number" {...register("phone", { required: true })} />
                            </div>
                            <div className="item">
                                <label htmlFor="phone">Additional Phone number</label>
                                <input className="forminput" type="text" placeholder="Additional Phone number"{...register("optionalPhone", { required: true })} />
                            </div>
                            <div className="item">
                                <label htmlFor="country">Country</label>
                                <input className="forminput" type="text" placeholder="Country"{...register("countryId", { required: true })} />
                            </div>
                            <div className="item">
                                <label htmlFor="airline">Airline</label>
                                <input className="forminput" type="text" placeholder="Airline"{...register("airline", { required: true })} />
                            </div>
                            <div className="item">
                                <label htmlFor="flight_number">Flight number</label>
                                <input className="forminput" type="text" placeholder="Flight number" {...register("flightNumber", { required: true })} />
                            </div>
                            <div className="item">
                                <label htmlFor="comments">Comments</label>
                                <textarea className="forminput" placeholder="Comments" {...register("comments", { required: true })}></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="right">
                        <h2>Información Adicional</h2>
                        <div className="additional-info">
                            <div className="item">
                                <strong>Direccion de inicio:</strong>
                                <span>Santo Domingo, República Dominicana</span>
                            </div>
                            <div className="item">
                                <strong>Direccion de destino:</strong>
                                <span>Santo Domingo, República Dominicana</span>
                            </div>
                            <div className="item">
                                <strong>Tipo de viaje:</strong>
                                <span>
                                    {trip_type === 1 ? "Ida" : "Ida y vuelta"}
                                </span>
                            </div>
                            <div className="item">
                                <strong>Fecha y hora de salida:</strong>
                                <span>
                                    {departureHour} -  {idiom === "es" ? fechaEnEspanol : fechaEnIngles}
                                </span>
                            </div>
                            <div className="item">
                                <strong>Vehiculo:</strong>
                                <span>
                                    {vehicle?.brand} {vehicle?.model} de {vehicle?.capacity} personas
                                </span>
                            </div>
                            <div className="item">
                                <strong>Ocupantes:</strong>
                                <span>
                                    {passengerNo}
                                </span>
                            </div>
                            <div className="item">
                                <strong>Maletas:</strong>
                                <span>
                                    {bagsNo}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <h1>Reserva</h1>
                    <Table columns={["Viaje", "Total"]} data={[{ type: trip_type === 1 ? "Ida" : "Ida y vuelta", total: "$ 204,36" },
                    {
                        type: "Subtotal",
                        total: "$ 204,36"
                    },
                    {
                        type: "Total",
                        total: "$ 204,36"
                    }
                    ]} />
                    {/* <table>
                        <thead>
                            <tr>
                                <th>
                                    Viaje
                                </th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <span>                                   {trip_type === 1 ? "Ida" : "Ida y vuelta"}
                                    </span>
                                </td>
                                <td>
                                    Subtotal
                                </td>
                                <td>
                                    Total
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    $ 204,36
                                </td>
                                <td>
                                    $ 204,36
                                </td>
                                <td>
                                    $ 204,36
                                </td>
                            </tr>
                        </tbody>
                    </table> */}
<button onClick={triggerSubmit}>Enviar</button>

                </div>
            </div>
        </section>
    )
}

export default Checkout