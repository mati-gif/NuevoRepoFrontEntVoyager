
import React, { useState } from 'react'
import { User, ChevronDown, ChevronUp, MapPin, Plus, Camera, Mail, Phone } from 'lucide-react'
import CustomerButton from './CustomerButton'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { logoutAction } from '../redux/actions/authAction'
import { authReducer } from '../redux/reducers/authReducer'

// interface Address {
//   street: string;
//   postalCode: string;
// }

// interface UserInfo {
//   name: string;
//   email: string;
//   phone: string;
//   alternativePhone: string;
//   addresses: Address[];
// }

function ProfileHeader() {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false)
    const [profilePicture, setProfilePicture] = useState('/placeholder.svg?height=100&width=100')
    // const [userInfo, setUserInfo] = useState({
    //     name: 'John Doe',
    //     email: 'john.doe@example.com',
    //     phone: '+1 234 567 8900',
    //     alternativePhone: '+1 098 765 4321',
    //     addresses: [{ street: '123 Main St, City, Country', postalCode: '12345' }]
    // })

    const { firstName, lastName, email, phoneNumbers } = useSelector(store => store.auth.user)
    //     console.log( address);
    //     const {zipCode,nameStreet,streetNumber} = useSelector(store => store.authReducer.client.address)
    // console.log(useSelector(store => store.authReducer.client));
    const { address } = useSelector(store => store.auth.user)

    console.log(useSelector(store => store.auth.user));





    const handleToggleDropdown = () => setIsOpen(!isOpen)







    const handleFileUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfilePicture(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAddAddress = () => {
        // const street = prompt('Enter new address:')
        // const postalCode = prompt('Enter postal code:')

        if (street && postalCode) {
            setUserInfo(prevInfo => ({
                ...prevInfo,
                addresses: [...prevInfo.addresses, { street, postalCode }]
            }))
        }
    }


    // const viewAllAddress = () => {

    //     Swal.fire({
    //         title: 'List of Items',
    //         html: `
    //             <>

    //                 ${address.map((address, index) => (
    //                     <div key={index} className="flex items-start mb-2">
    //                         <MapPin size={16} className="mr-2 mt-1" />
    //                         <div>
    //                             <div>{address.nameStreet + " " + address.streetNumber}</div>
    //                             <div><span className="font-bold">Postal Code:</span> {address.zipCode}</div>
    //                         </div>
    //                     </div>
    //                 ))}
    //             </>
    //         `,
    //         icon: 'info',
    //         confirmButtonText: 'Close'
    //     });
    // }



    const viewAllAddress = () => {
        const htmlContent = address.map((address, index) => (
            `<div key=${index} class="flex items-start mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 mt-1" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.791 0 4 1.791 4 4c0 3.48 4 8 4 8s4-4.52 4-8c0-2.209-1.791-4-4-4zm0 6a2 2 0 1 1 .001-3.999A2 2 0 0 1 8 6z"/>
                </svg>
                <div>
                    <div>${address.nameStreet} ${address.streetNumber}</div>
                    <div><span class="font-bold">Postal Code:</span> ${address.zipCode}</div>
                </div>
            </div>`
        )).join(""); // Usamos join para convertir el array en una única cadena de HTML
    
        Swal.fire({
            title: 'List of Items',
            html: htmlContent, // Aquí va el HTML generado
            icon: 'info',
            confirmButtonText: 'Close'
        });
    };




    const handleClick = () => {

        dispatch(logoutAction())

        console.log("hice click?");

        Swal.fire({
            title: 'Logged Out',
            text: 'You have been logged out successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
        })


        navigate("/login")

    }
    return (
        <header className="flex justify-evenly items-center p-4   text-white">
            {/* <h1 className="text-2xl font-bold">My Website</h1> */}
            <div className="relative ">
                <button
                    onClick={handleToggleDropdown}
                    className="flex items-center ml-24 bg-transparent border-none text-[#E6BB4D] cursor-pointer text-base hover:text-[#E6BB4D]  checked:text-[#E6BB4D]"
                >
                    <User size={28} />
                    <span className="mx-2 text-lg">Profile</span>
                    {isOpen ? <ChevronUp size={24} className='text-[#E6BB4D]' /> : <ChevronDown size={24} />}

                </button>
                {isOpen && (
                    <div className="absolute top-full right-0 w-96 bg-white rounded-lg shadow-lg p-4 text-gray-800 z-10">
                        {/* Botones de Login y Register */}
                        <div className="flex items-center justify-end gap-4">
                            <CustomerButton
                                text="Logout"
                                onClick={handleClick}
                                textColor="text-[#0F1D15]" // Cambia al color deseado
                                bgColor="bg-[#E6BB4D]" // Cambia al color de fondo deseado
                                hoverBgColor="bg-[#FFD700]" // Cambia al color de fondo en hover deseado
                            />
                        </div>

                        <div className="flex flex-col items-center mb-4">
                            <div className="relative w-24 h-24 rounded-full bg-gray-200 mb-2 overflow-hidden">
                                <img src={profilePicture} alt="Profile" className="w-full h-full mt-2  object-cover" />
                                <label htmlFor="profile-picture-upload" className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-1 cursor-pointer">
                                    <Camera size={20} className="inline-block " />
                                    {/* <span>Upload</span> */}
                                </label>
                                <input
                                    id="profile-picture-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                            </div>
                            <h2 className="text-xl font-bold">{"Welcome" + " " + firstName + " " + lastName + "!"}</h2>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <Mail size={16} className="mr-2" />
                                <span className="font-bold mr-2">Email:</span>
                                {email}
                            </div>
                            <div className="flex items-center">
                                <Phone size={16} className="mr-2" />
                                <span className="font-bold mr-2">Phone:</span>
                                {phoneNumbers[0]}
                            </div>
                            <div className="flex items-center">
                                <Phone size={16} className="mr-2" />
                                <span className="font-bold mr-2">Alternative Phone:</span>
                                {phoneNumbers[1]}
                            </div>

                            <h3 className="font-bold mt-4 mb-2">Addresses:</h3>
                            {address.slice(0, 2).map((address, index) => (
                                <div key={index} className="flex items-start mb-2">
                                    <MapPin size={16} className="mr-2 mt-1" />
                                    <div>
                                        <div>{address.nameStreet + " " + address.streetNumber}</div>
                                        <div><span className="font-bold">Postal Code:</span> {address.zipCode}</div>
                                    </div>
                                </div>
                            ))}
                            <Link to="/addAddress">
                                <button
                                    onClick={handleAddAddress}
                                    className="flex items-center text-blue-500 bg-transparent border-none cursor-pointer text-base p-0 hover:opacity-80"
                                >
                                    <Plus size={16} className="mr-2" />
                                    Add Address
                                </button>
                            </Link>
                            <button
                                onClick={viewAllAddress}
                                className="flex items-center text-blue-500 bg-transparent border-none cursor-pointer text-base p-0 hover:opacity-80">
                                View all address
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default ProfileHeader