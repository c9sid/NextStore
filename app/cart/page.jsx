import HeroSection from '@/components/HeroSection'
import React from 'react'

const Cart = () => {
    return (
        <div className="container mx-auto px-5">
            <section>
                <HeroSection pageName={"Cart"} />
            </section>
            <section>
                <div className='text-center'><h2>Comming soon...</h2></div>
            </section>
        </div>
    )
}

export default Cart