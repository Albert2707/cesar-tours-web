import { OrderServices } from './services/orderServices'
import { useQuery } from 'react-query'
import { moneyFormant } from '../../utils/functions/moneyFormat'
import { format } from 'date-fns'
import "./Order.scss"
import { es } from 'date-fns/locale';
import { useEffect, useState } from 'react'
import Button from '../../shared/components/button/Button'
const Orders = () => {
    const [filter, setFilter] = useState<string>("all")
    const [pageCount, setPageCount] = useState<number>(0)
    const [skip, setSkip] = useState<number>(0)
    const [hasNextPage, setHasNextPage] = useState<boolean>(true)
    const [limit, setLimit] = useState<number>(5)
    const { data, isLoading, error, refetch } = useQuery(`orders`, async () => {
        const res = await OrderServices.getOrders(filter, skip, limit)
        setHasNextPage(res.hasNextPage)
        setPageCount(res.totalPages)
        return res.order
    })

    useEffect(() => {
        refetch();
    }, [filter, skip, limit])
    return (
        <div className="orders">
            <div className="filter">
                {/* <Button properties={{ text: "Filtrar", type: "logout", onClickfn: () => { } }} />
                 */}
                <Button properties={{ type: "filter", onClickfn: () => setFilter("all") }}>
                    Todos
                </Button>
                <Button properties={{ type: "filter", onClickfn: () => setFilter("0") }}>
                    Agendadas
                </Button>
                <Button properties={{ type: "filter", onClickfn: () => setFilter("1") }}>
                    En proceso
                </Button>
                <Button properties={{ type: "filter", onClickfn: () => setFilter("2") }}>
                    Completadas
                </Button>
                <Button properties={{ type: "filter", onClickfn: () => setFilter("3") }}>
                    Canceladas
                </Button>
            </div>
            <div className="table">
                <div className="tbl-header">
                    <div className="cell">Order num</div>
                    <div className="cell">Date</div>
                    <div className="cell">Status</div>
                    <div className="cell">Customer</div>
                    <div className="cell">Origin</div>
                    <div className="cell">Destination</div>
                    <div className="cell">Total</div>
                </div>
                <div className="tbl-body">
                    {error ? "Something went wrong" : isLoading ? <h1>Loading...</h1> : (
                        data.map((e: any) => (
                            <div className="tbl-body-row" key={crypto.randomUUID()}>
                                <div className="cell">
                                    {e.order_num}
                                </div>
                                <div className="cell">
                                    {format(new Date(e.createAt), "MMM d, yyyy", { locale: es })}
                                </div>

                                <div className={e.status === 0 ? "cell pending" : e.status === 1 ? "cell in-progress" : e.status === 2 ? "cell completed" : "cell cancelled"}>
                                    {e.status === 0 ? "Agendada" : e.status === 1 ? "En proceso" : e.status === 2 ? "Completada" : "Cancelada"}

                                </div>
                                <div className="cell">
                                    {`${e.customer.name} ${e.customer.lastName}`}
                                </div>

                                <div className="cell">
                                    {e.origin}
                                </div>
                                <div className="cell">
                                    {e.destination}
                                </div>

                                <div className="cell">
                                    {moneyFormant(e.total)}
                                </div>
                                <div className="cell">
                                    <button style={{ border: "none", backgroundColor: "transparent", cursor: "pointer" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                                    </button>
                                </div>
                            </div>


                        )))}
                </div>
            </div>
            <div className="pagination">

                <Button properties={{
                    type: "filter", onClickfn: () => {
                        if (skip === 0) return
                        setLimit(limit - 5)
                        setSkip(skip - 5)
                    }
                }}>  {"<"} </Button>
                <div className="page-numbers">{
                    Array.from({ length: pageCount }, (_, index) => index + 1).map(e => (
                        <span>{e}</span>
                    ))
                }</div>
                <Button properties={{
                    type: "filter", onClickfn: () => {
                        if (!hasNextPage) return
                        setLimit(limit + 5)
                        setSkip(skip + 5)
                    }
                }}>  {">"} </Button>
            </div>

        </div>
    )
}

export default Orders