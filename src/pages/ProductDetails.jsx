
import CommentBox from '../components/CommentBox'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Star } from 'lucide-react'
import ProductDetailComponent from '../components/ProductDetailComponent'
import { li } from 'framer-motion/client'
import { ul } from 'framer-motion/m'
import NewCommentBox from '../components/NewCommentBox'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


function ProductDetails() {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [id, setId] = useState(0);
  const [arrayOrdenado, setArrayOrdenado] = useState([]);
  
  // Captura el nombre del usuario logueado desde el estado de Redux
  const user = useSelector((store) => store.auth.user); 
  const [name, setName] = useState("");

  const [reviews, setReviews] = useState([
    {
      id: 1,
      userImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALcAwwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDBv/EABYQAQEBAAAAAAAAAAAAAAAAAAARAf/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgb/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEQMRAD8A86KOscYgKCCoAigIAEABQAAAAAAAAEBRAFGRB1RRWUAABAVFQUABFAEFQWAAAAAIACCgCAAg6gjTAAAioKAAAAAACAsAABAFQRFEAABBQAdAGmBAFAQFEAAEWAgCiAAVBVRAFQEUEAUAAAHVAaYAQAAWAIgqCAqAKCCACCqIAAAAAAAogDoA0zAQQURBVQAKgAAiKAFAQRQAABYKIFFAIgADYgqAICiAAIKAICKyUUQRRUAUQBRAFBFgoAAANoIqKIAAAJREVUAWAgUAEAAFEAURVgABQARQoCiKqICCqgIAILAEKKgIoAAACiAiqyoCoAoirAABUEoRagAAgLUAqgggAgKIoCoAogCgAogIoCwUQBABQAARCiglRVEAAQFABRAFEAURRBUAUAFAEZAWtIAgJqgIAAAAAAAKKAgAAACgAKAgAD//2Q==",
      userName: "Carlos Ramirez",
      rating: 4,
      comment: "The burgers were delicious, but the bun was a bit dry. Still, I would come back.",
      date: "2024-10-01",
    },
    {
      id: 2,
      userImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJ4AqAMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAAB//EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAABf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKGAirgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z",
      userName: "Ana Morales",
      rating: 5,
      comment: "The best burgers I've ever had! Juicy and made with fresh ingredients.",
      date: "2024-09-28",
    },
    {
      id: 3,
      userImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKwAtwMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAEFAv/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANdAcMkAAAAAAAAAAAAAAAAAAAAAAEBFEAUQBRAFEAUQBRAFEAUQBRAFEAVAAAQAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEEFEAUQBRAFEAUQBRAFEAUQBRAFEAURQQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAf/9k=",
      userName: "Luis Gomez",
      rating: 3,
      comment: "They were okay, but the meat was a little overcooked for my taste.",
      date: "2024-09-26",
    },
    {
      id: 4,
      userImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJ4AqAMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAABf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAWAQEBAQAAAAAAAAAAAAAAAAAABwX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCQAxVXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/2Q==",
      userName: "Valeria Torres",
      rating: 5,
      comment: "Amazing burgers! The melted cheese was the cherry on top. Highly recommend the special!",
      date: "2024-09-23",
    },
    {
      id: 5,
      userImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALcAwwMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIF/8QAGBABAQEBAQAAAAAAAAAAAAAAAAERITH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIHA//EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A7oDnbyAUEUAAEAAAAAAAAEFFEAAAAAAAAUAAEAUAAQAUEFQ0AAQUUQABFAQBQAAABQEBQABUqgCAKIIKGiAAgooiKERAGgRQEAUAAVYioALEoAMqoAAoggoCAKIKgJRUWAio0gACAKAAKqKgLEWJQIDKqAlFAQAAQBQRUUEVFgIqNIAAgCgACqggoCUURWVURQAEAAAEUAAL4gLEEBoAAQBQABQAFQQUBKKIIqgAAACAKgEQBGgAAQAAFAABUAUABUEFEAURUAAAQUVAAAAQAAFAAAAAUBBQAUyJogomiDRhoyNYYaMi8DRBchkXRka4gIKKIAAAAAAqKAAgogCgIABQASAAoCCgAACAAKAAAAAAKIAoCAAAqAKgAAAAAAgACgAAAAAAAAAAACgAAIAAAACAoAAAAAAAAAA//9k=",
      userName: "Fernando Perez",
      rating: 4,
      comment: "The service was fast, and the burgers were well-prepared. Just needed a little more sauce.",
      date: "2024-09-20",
    },
    {
      id: 6,
      userImage: "https://img.freepik.com/foto-gratis/fondo_53876-42300.jpg",
      userName: "Mariana Rojas",
      rating: 5,
      comment: "Simply spectacular. The balance between the meat, cheese, and sauces was perfect.",
      date: "2024-09-15",
    },
  ]);

  useEffect(() => {
    // Establece el nombre del usuario logueado si existe
    if (user && user.firstName && user.lastName ) {
      setName(user.firstName + " " + user.lastName);
    }
  }, [user]);

  //-----------------------------------------------------OBTENER FECHA ACTUAL------------------------------------
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Los meses comienzan desde 0
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setMinDate(formattedDate);
  }, []);
  //-----------------------------------------------------OBTENER FECHA ACTUAL------------------------------------

  const handleSubmit = () => {
    if (!name) {
      Swal.fire({
        icon: "error",
        title: "Forbidden",
        text: "First, you must be logged in",
      });
    } else {
      const copiaComentario = [
        ...reviews,
        {
          id: id,
          userImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJ4AqAMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAAB//EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAWAQEBAQAAAAAAAAAAAAAAAAAABgT/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCtgJluAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/2Q==",
          userName: name,
          rating: rating,
          comment: comment,
          date: minDate,
        },
      ];

      setReviews(copiaComentario);
    }
  };

  const ordenarArray = () => {
    const nuevoArray = reviews.sort((a, b) => b.id - a.id); // Ordena por id de mayor a menor
    setId(nuevoArray[0].id + 1);
    return nuevoArray;
  };

  useEffect(() => {
    setArrayOrdenado(ordenarArray());
  }, [reviews]);

  const navigate = useNavigate();
  const handleClick = () =>{


        navigate("/"); // Navegar después de que la alerta desaparezca

  
  }
  return (
    <div className="container-div   overflow-hidden h-[662px] bg-gray-900 " >
      
      <div className='mt-[100px] flex items-center justify-center p-4'>


      <div className='p-[15px] mt-[23px]'>
      <ProductDetailComponent
        imageUrl="/src/assets/menuImages/oklahoma1.png"
        productName="Oklahoma"
        rating={4}
        description="Juicy burger with caramelized onions and cheddar cheese."
        
      />
      </div>

      <div className="mt-[20px] flex flex-col gap-5 scroll h-[500px] w-[50%] overflow-y-scroll">
        <div>
          <div
            style={{
              backgroundColor: "#1f2937",
              borderRadius: "8px",
              padding: "16px",
              maxWidth: "100%",
              color: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#fbbf24",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "16px",
                }}
              >
                {name && name.charAt(0)}
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{name}</h2>
            </div>
            <div style={{ display: "flex", marginBottom: "16px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  style={{
                    cursor: "pointer",
                    color: star <= rating ? "#fbbf24" : "#6b7280",
                    fontSize: "1.5rem",
                    marginRight: "4px",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              style={{
                width: "100%",
                backgroundColor: "#374151",
                color: "white",
                borderRadius: "4px",
                padding: "8px",
                marginBottom: "16px",
                border: "none",
              }}
              rows={3}
              placeholder="Escribe tu reseña aquí..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="flex justify-center gap-3 mt-2">
            <button
              onClick={handleClick}
              style={{
                padding: "8px 16px",
                backgroundColor: "#ef4444",
                color: "black",
                borderRadius: "4px",
                marginRight: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              style={{
                padding: "8px 16px",
                backgroundColor: "#EAB308",
                color: "black",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </div>
        </div>

        {arrayOrdenado.map((review) => {
          return (
            <CommentBox
              key={review.id}
              userImage={review.userImage}
              userName={review.userName}
              rating={review.rating}
              comment={review.comment}
              date={review.date}
            />
          );
        })}
      </div>
      </div>
    </div>
  );
}

export default ProductDetails;
