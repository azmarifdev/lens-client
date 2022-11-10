import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../Hooks/useTitleHooks';
import Loading from '../Others/Loading';
import ServiceCard from './ServiceCard';

const Services = () => {
    useTitle('Services');
    const [spinner, setSpinner] = useState(false);

    const [services, setServices] = useState([]);
    useEffect(() => {
        setSpinner(true);
        fetch('https://lens-server.vercel.app/services')
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setServices(data.services);
                    setSpinner(false);
                } else {
                    toast.error(data.error);
                }
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }, []);
    return (
        <>
            {spinner ? (
                <Loading />
            ) : (
                <div>
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-10 mx-auto">
                            <div className="flex flex-wrap -m-4">
                                {services.map((service, index) => (
                                    <ServiceCard
                                        service={service}
                                        key={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
};

export default Services;
