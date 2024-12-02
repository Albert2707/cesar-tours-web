import { Table } from '../../../shared/components/table/Table';
import { useBookingStore } from '../../../shared/hooks/booking/useBookingStore';

const Checkout = () => {
    const { trip_type } = useBookingStore();
    return (
        <section>
            <div className="wrapper">
                <div className="top" style={{ display: "flex" }}>

                    <div className="left">
                        <form action="">
                            <input className="forminput" type="text" placeholder="Name" />
                            <input className="forminput" type="text" placeholder="Last Name" />
                            <input className="forminput" type="email" placeholder="Email" />
                            <input className="forminput" type="text" placeholder="Phone number" />
                            <input className="forminput" type="text" placeholder="Additional Phone number" />
                            <input className="forminput" type="text" placeholder="Country" />
                            <input className="forminput" type="text" placeholder="Airline" />
                            <input className="forminput" type="text" placeholder="Flight number" />
                            <textarea className="forminput" placeholder="Comments"></textarea>

                        </form>
                    </div>
                    <div className="right">
                        <h1>Info</h1>
                    </div>
                </div>
                <div className="bottom">
                    <h1>Reserva</h1>
                    <Table columns={["Viaje","Total"]} data={[{type:trip_type === 1 ? "Ida" : "Ida y vuelta",total:"$ 204,36"},
                        {
                            type:"Subtotal",
                            total:"$ 204,36"
                        },
                        {
                            type:"Total",
                            total:"$ 204,36"
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
                </div>
            </div>
        </section>
    )
}

export default Checkout