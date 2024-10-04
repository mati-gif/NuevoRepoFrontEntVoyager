import CommentBox from '../components/CommentBox'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Star } from 'lucide-react'
import ProductDetailComponent from '../components/ProductDetailComponent'
import { li } from 'framer-motion/client'
import { ul } from 'framer-motion/m'

function ProductDetails() {






  return (
    <div className="container-div overflow-hidden h-[632px] bg-gray-900 flex items-center justify-center p-4">
      <ProductDetailComponent
        imageUrl="https://rockandfellers.com.ar/front/images/menu/004.jpg"
        productName="Auriculares Premium XYZ"
        rating={4}
        description="Experimenta un sonido inmersivo con nuestros auriculares de última generación. Diseñados para ofrecer la mejor calidad de audio y comodidad durante largas sesiones de uso. Con cancelación de ruido activa y una batería de larga duración, estos auriculares son perfectos para los amantes de la música y los profesionales por igual."
        className=""
      />

      <div className='flex flex-col gap-5 scroll h-[500px] w-[50%]  overflow-y-scroll'>
        <CommentBox
          userImage=""
          userName="Juan Pérez"
          rating={4}
          comment="Excelente servicio, la comida estaba deliciosa y el ambiente muy agradable. Definitivamente volveré."
          date="15 de junio, 2023"
        />
        <CommentBox
          userImage="/placeholder.svg?height=100&width=100"
          userName="Juan Pérez"
          rating={4}
          comment="Excelente servicio, la comida estaba deliciosa y el ambiente muy agradable. Definitivamente volveré."
          date="15 de junio, 2023"
        /><CommentBox
          userImage="/placeholder.svg?height=100&width=100"
          userName="Juan Pérez"
          rating={3}
          comment="Excelente servicio, la comida estaba deliciosa y el ambiente muy agradable. Definitivamente volveré."
          date="15 de junio, 2023"
        />



      </div>
    </div>

  )
}

export default ProductDetails