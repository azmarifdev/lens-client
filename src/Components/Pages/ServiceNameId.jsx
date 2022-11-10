import React, { useState } from 'react';
import { useEffect } from 'react';

const ServiceNameId = ({ review }) => {
    const { serviceId } = review;
    const [serviceName, setServiceName] = useState({});
    const { service } = serviceName;
    useEffect(() => {
        fetch(`https://lens-server.vercel.app/services/${serviceId}`)
            .then((res) => res.json())
            .then((data) => setServiceName(data));
    }, [serviceId]);
    return (
        <div>
            <h1 className="font-semibold text-lg">{service?.name}</h1>
        </div>
    );
};

export default ServiceNameId;
