import "./SitterRegister.css";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosWithToken } from "../../axiosWithToken";

function SitterRegister() {
    let { register, handleSubmit, formState: { errors } } = useForm();
    const [checkboxAnswers, setCheckboxAnswers] = useState([]);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            // Add the checked value to the array
            setCheckboxAnswers(prevAnswers => [...prevAnswers, value]);
        } else {
            // Remove the unchecked value from the array
            setCheckboxAnswers(prevAnswers => prevAnswers.filter(answer => answer !== value));
        }
    };
    let [err, setErr] = useState("");
    let navigate = useNavigate();
    // let token = localStorage.getItem('token'

    const postNewArticle = async (sitter) => {
        sitter.dateOfCreation = new Date();
        sitter.dateOfModification = new Date();
        sitter.sitterId = Date.now();
        sitter.comments = [];
        sitter.rating = [];
        sitter.acceptedPets = checkboxAnswers;
        let res = await axiosWithToken.post('http://localhost:4000/sitter-api/sitters', sitter)
        console.log(res)
        if (res.data.message === 'sitter created') {
            navigate('/petcare')
        } else {
            setErr(res.data.message)
        }
    }
    return (
        <div className="rounded">
            <div className="m-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-sm-12">
                        <div className="shadow">
                            <div className="body p-5 rounded">
                                <h2 className="card-title text-center mb-4">Sitter Form</h2>
                                <form onSubmit={handleSubmit(postNewArticle)}>
                                    <label htmlFor="photo" className="col-sm-3 col-form-label">Photo:</label>
                                    <div className="form-froup mb-3">
                                        <input type="file" className="form-control" id="photo" name="photo" {...register("Photo", { required: true})} />
                                    </div>
                                    <div className="form-froup mb-3">
                                        <label for="sittername">Sitter Name:</label>
                                        <input type="text" className="form-control" id="sittername" name="sittername" placeholder="Enter sitter's name" {...register("sittername", { required: true, minLength: 3 })} />
                                    </div>
                                    <div className="form-froup mb-3">
                                        <label for="age">Age:</label>
                                        <input type="number" className="form-control" id="age" name="age" placeholder="Enter age (greater than 20)" {...register("age", { required: true, min: 21 })} />
                                    </div>
                                    <div className="form-froup mb-3">
                                        <label for="location">Location:</label>
                                        <input type="text" className="form-control" id="location" name="location" placeholder="Enter location" {...register("loacation", { required: true })} />
                                    </div>
                                    <div className="form-froup mb-3">
                                        <label for="description">Description:</label>
                                        <textarea className="form-control" id="description" name="description" rows="3" placeholder="Enter description" {...register("discription", { required: true })}></textarea>
                                    </div>
                                    <div className="form-froup mb-3">
                                        <label for="pricePerDay">Price Per Day:</label>
                                        <input type="text" className="form-control" id="pricePerDay" name="pricePerDay" placeholder="Enter price per day" {...register("pricePerDay", { required: true })} />
                                    </div>

                                    <div className="form-froup mb-3">
                                        <label for="available">Available:</label>
                                        <select className="form-control" id="available" name="available" {...register("available", { required: true })}>
                                            <option value="">Select Availability</option>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>
                                    <div className="form-froup mb-3">
                                        <label for="experience">Experience:</label>
                                        <textarea className="form-control" id="experience" name="experience" rows="3" placeholder="Enter experience" {...register("experience", { required: true })}></textarea>
                                    </div>
                                    <div className="form-froup mb-3">
                                        <label>Pets Allowed:</label>
                                        <br />
                                        <div class="form-check form-check-inline mb-3">
                                            <input class="form-check-input" type="checkbox" id="dog" value="dog" onChange={handleCheckboxChange} />
                                            <label class="form-check-label" for="dog">Dog</label>

                                        </div>
                                        <div class="form-check form-check-inline mb-3">
                                            <input class="form-check-input" type="checkbox" id="cat" value="cat" onChange={handleCheckboxChange} />
                                            <label class="form-check-label" for="cat">Cat</label>
                                        </div>
                                        <div class="form-check form-check-inline mb-3">
                                            <input class="form-check-input" type="checkbox" id="bird" value="bird" onChange={handleCheckboxChange} />
                                            <label class="form-check-label" for="bird">Bird</label>
                                        </div>
                                        <div class="form-check form-check-inline mb-3">
                                            <input class="form-check-input" type="checkbox" id="fish" value="fish" onChange={handleCheckboxChange} />
                                            <label class="form-check-label" for="fish">Fish</label>
                                        </div>
                                        <div class="form-check form-check-inline mb-3">
                                            <input class="form-check-input" type="checkbox" id="rabbit" value="rabbit" onChange={handleCheckboxChange} />
                                            <label class="form-check-label" for="rabbit">Rabbit</label>
                                        </div>
                                        <div class="form-check form-check-inline mb-3">
                                            <input class="form-check-input" type="checkbox" id="turtle" value="turtle" onChange={handleCheckboxChange} />
                                            <label class="form-check-label" for="turtle">Turtle</label>
                                        </div>
                                        <div class="form-check form-check-inline mb-3">
                                            <input class="form-check-input" type="checkbox" id="salamander" value="salamander" onChange={handleCheckboxChange} />
                                            <label class="form-check-label" for="salamander">Salamander</label>
                                        </div>
                                    </div>
                                    <div className="form-froup mb-3">
                                        <label for="numberOfPetsAcceptedAtaTime">Number of Pets Accepted At a Time:</label>
                                        <input type="number" className="form-control" id="numberOfPetsAcceptedAtaTime" name="numberOfPetsAcceptedAtaTime" placeholder="Enter number of pets accepted" {...register("numberOfPetsAcceptedAtATime", { required: true })} />
                                    </div>
                                    <div className="form-froup mb-3">
                                        <label for="numberOfWalksPerDay">Number of Walks Per Day:</label>
                                        <input type="number" className="form-control" id="numberOfWalksPerDay" name="numberOfWalksPerDay" placeholder="Enter number of walks per day" {...register("numberOfWalksPerDay", { required: true })} />
                                    </div>
                                    <div className="form-froup mb-3">
                                        <label for="phone">Number of Walks Per Day:</label>
                                        <input type="number" className="form-control" id="phone" name="phone" placeholder="Mobile" {...register("phone", { required: true, maxLength: 10, minLength: 10 })} />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SitterRegister
