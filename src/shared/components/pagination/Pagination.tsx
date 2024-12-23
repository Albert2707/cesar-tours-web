import React, { FC } from 'react'
import Button from '@/shared/components/button/Button';
import './Pagination.scss'
interface Props {
    pageCount: number,
    skip: number,
    setSkip: React.Dispatch<React.SetStateAction<number>>,
    hasNextPage: boolean
}
export const Pagination: FC<Props> = ({ pageCount, skip, setSkip, hasNextPage }) => {
    return (
        <div className="pagination">
            <Button
                properties={{
                    type: "filter",
                    onClickfn: () => {
                        if (skip === 1) return;
                        setSkip(skip - 1);
                    },
                }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
            </Button>
            <div className="page-numbers">
                {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                    (e) => (
                        <span
                            key={crypto.randomUUID()}
                            style={{
                                color: e === skip ? "#f24b0f" : "",
                                fontWeight: e === skip ? "bold" : "semi-bold",
                            }}
                        >
                            {e}
                        </span>
                    )
                )}
            </div>
            <Button
                properties={{
                    type: "filter",
                    onClickfn: () => {
                        if (!hasNextPage) return;
                        setSkip(skip + 1);
                    },
                }}
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
            </Button>
        </div>
    )
}