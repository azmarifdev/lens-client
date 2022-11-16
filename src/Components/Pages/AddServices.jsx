import React from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../Hooks/useTitleHooks';

const AddServices = () => {
    useTitle('Add Services');
    const handleAddService = (e) => {
        e.preventDefault();
        const form = e.target;
        const AddService = {
            name: e.target.name.value,
            image: e.target.image.value,
            price: e.target.price.value,
            details: e.target.message.value,
        };

        fetch('https://lens-server.vercel.app/services', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(AddService),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    form.reset();
                    toast.success('Service Added Successfully');
                } else {
                    toast.error(data.error);
                }
            });
    };
    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px]">
                <form onSubmit={handleAddService}>
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="mb-3 block text-base font-medium text-[#07074D]">
                            Service Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            placeholder="Service Name"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium  outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="price"
                            className="mb-3 block text-base font-medium text-[#07074D]">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            required
                            placeholder="99.00$"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium  outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="subject"
                            className="mb-3 block text-base font-medium text-[#07074D]">
                            Service image URL
                        </label>
                        <input
                            type="text"
                            name="image"
                            id="subject"
                            required
                            placeholder="Image URL"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium  outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="message"
                            className="mb-3 block text-base font-medium text-[#07074D]">
                            Service details
                        </label>
                        <textarea
                            rows="4"
                            name="message"
                            id="message"
                            required
                            placeholder="Type your message"
                            className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium outline-none focus:border-[#6A64F1] focus:shadow-md"></textarea>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddServices;
