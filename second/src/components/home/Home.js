

// export default Home;
import React from 'react';
import { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import img1 from '../../assets/girl-dog.png';
import img2 from '../../assets/2 (1).png';
import img3 from '../../assets/pet-sitter-job-background-3.jpg';
import img4 from '../../assets/cust care (1).png';
import img5 from '../../assets/cust-satisfy.png';

function Jumbotron() {
    return (
        <div className="jumbotron bg-secondary text-center p-5">
            <h1 className="display-4 fw-bold">Pet Care Hub : Empowering Pet Sitters</h1>
            <p className="lead">Reliable, Professional, Compassionate Pet Care Services</p>
        </div>
    );
}

function FeatureSection({ title, text, imageUrl, imageAlt }) {
    return (
        <div className="row justify-content-md-center mt-4">
            <div className="col-lg-9 shadow-lg rounded-5">
                <div className="row align-items-center p-4">
                    {imageUrl && (
                        <div className="col-md-6 order-md-2">
                            <img src={imageUrl} alt={imageAlt} className="img-fluid rounded" />
                        </div>
                    )}
                    <div className="col-md-6 order-md-1">
                        <div className="text-center text-md-start">
                            <h3>{title}</h3>
                            <p className="lead">
                                {text}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function Home() {
    return (
        <div>
            <Jumbotron />
            <header>
                <div className="container">
                    <FeatureSection
                        title="Trusted Pet Sitters"
                        text="Our team of pet sitters undergoes a rigorous vetting process to ensure they are not only qualified and experienced but also deeply passionate about animal welfare. You can trust that your pet will receive the highest level of care and attention from our dedicated professionals."
                        imageUrl={img1}
                        imageAlt=""
                    />
                    <FeatureSection
                        title="Convenience"
                        text="Our seamless online booking system and user-friendly mobile app make scheduling pet care services a breeze. Whether you're at home or on the go, you can easily arrange for a pet sitter to tend to your furry friend's needs with just a few clicks or taps."
                        imageUrl={img2}
                        imageAlt=""
                    />
                    <FeatureSection
                        title="Peace of Mind"
                        text="With our real-time updates and open communication channels, you can enjoy peace of mind knowing that you'll always be informed about your pet's well-being and activities while you're away. Whether it's photos, messages, or activity reports, we keep you connected every step of the way."
                        imageUrl={img4}
                        imageAlt=""
                    />
                    <FeatureSection
                        title="Customized Care"
                        text="We recognize that every pet is unique, with their own personality, preferences, and requirements. That's why we take the time to understand your pet's individual needs and tailor our services accordingly. Whether they have dietary restrictions, medical conditions, or simply enjoy a certain routine, we'll ensure they receive personalized care and attention."
                        imageUrl={img3}
                        imageAlt=""
                    />
                    <FeatureSection
                        title="Customer Satisfaction"
                        text="At [Your Pet Sitting Business Name], your satisfaction is our top priority. We go above and beyond to ensure both you and your pet are happy and content with our services. From initial booking to the completion of the pet sitting experience, we strive to exceed your expectations and earn your trust and loyalty."
                        imageUrl={img5}
                        imageAlt=""
                    />
                </div>
            </header>
        </div>
    );
}


export default Home;
