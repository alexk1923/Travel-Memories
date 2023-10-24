import React, { Component, FunctionComponent } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface SocialWrapperProps {
    WrappedComponent: React.ComponentType<any>
}

export default function SocialWrapper(props: SocialWrapperProps) {
    return (
        <><Header />
            <props.WrappedComponent></props.WrappedComponent>
            <Footer />
        </>
    )
}
