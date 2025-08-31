import { VITE_GOOGLE_API_KEY } from '@/config/config'
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import React, { FC } from 'react'
interface MapProps {
    center?: { lat: number, lng: number }
    children: React.ReactNode
    booking?: boolean
}

export const CustomMap: FC<MapProps> = ({ center, children, booking = false }) => {
    const content = () => {
        if (booking) {
            return children
        } else {
            return <Map
                style={{ width: "100%", height: "100%" }}
                defaultCenter={center}
                defaultZoom={7}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
            >

                {children}
            </Map>
        }
    }
    return (
        <APIProvider apiKey={VITE_GOOGLE_API_KEY}>
            {content()}
        </APIProvider>)
}