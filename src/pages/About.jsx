import { useEffect } from "react";

function About() {
    // 👇 Scroll to top smoothly when a new product loads
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [window.location.href]);

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center py-12 px-4 ">
            <div className="max-w-3xl mx-auto ">
                <h1 className="text-4xl text-center font-bold text-gray-200 mb-4">About Us</h1>
                <div className="flex flex-col gap-4 text-justify mt-8 text-gray-200">
                    <p className="text-2xl text-center">
                        Welcome to <span className="font-bold">Q fashion Lab</span> – Your Custom Jersey Destination!
                    </p>

                    <p>
                        We’re passionate creators of high-quality custom sportswear designed to make every team, player,
                        and fan stand out. From football to cricket, badminton to basketball,Unversity Department jersey
                        – we craft jerseys that blend{" "}
                        <span className="font-bold">style, comfort, and performance.</span>
                    </p>
                    <p>
                        At our factory, we combine premium fabrics, modern printing technology, and expert craftsmanship
                        to bring your dream design to life. Whether you’re a local club, corporate team, or just want a
                        personalized jersey for yourself — we make it happen, just the way you imagine.
                    </p>

                    <ul className="ml-10 list-disc">
                        <li>100% Customizable Designs</li>
                        <li>Fast Production & Nationwide Delivery</li>
                        <li>Team Discounts & Bulk Order Options</li>
                        <li>Trusted by Hundreds of Athletes and Teams</li>
                    </ul>

                    <p className="text-center italic">
                        Our mission is simple — to help you wear your identity with pride.
                    </p>

                    <p className="text-center italic">Let’s create your story, one jersey at a time.</p>
                </div>
                <div className="text-justify text-gray-100">
                    <p className="text-xl text-center font-semibold mt-10 mb-5">
                        A jersey printing machine works by transferring the design or colour onto the fabric using heat,
                        pressure, and ink.
                    </p>
                    <p className="mt-1">
                        <span className="font-bold">1. Design Preparation:</span> The design is first made on a computer
                        using software like Photoshop or CorelDraw.
                    </p>
                    <p className="mt-1">
                        <span className="font-bold">2. Printing on Transfer Paper:</span> The design is printed on
                        special sublimation paper using sublimation ink.
                    </p>
                    <p className="mt-1">
                        <span className="font-bold">3. Placing on Fabric:</span> The printed paper is placed on the
                        jersey cloth (polyester or synthetic fabric).
                    </p>
                    <p className="mt-2">
                        <span className="font-bold">4. Heat Pressing:</span> The heat press machine gives high
                        temperature (around 180–200°C) and pressure for a few seconds.
                    </p>
                    <p className="mt-2">
                        <span className="font-bold">5. Colour Transfer:</span> The heat turns the ink into gas and the
                        colour transfers permanently onto the fabric fibers.
                    </p>
                    <p className="mt-2">
                        <span className="font-bold">6. Final Product:</span> The paper is removed, and the design
                        remains bright, washable, and long-lasting on the jersey.
                    </p>
                    <p className="italic mt-5">
                        <span className="font-bold">Note:</span> A jersey printing machine uses heat and pressure to
                        transfer the ink design from paper to fabric — this process is called sublimation printing.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
