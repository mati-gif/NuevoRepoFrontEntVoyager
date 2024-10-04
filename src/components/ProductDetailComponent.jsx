import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Star } from 'lucide-react'

function ProductDetailComponent({ imageUrl, productName, rating, description }) {
    const controls = useAnimation()
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        if (isInView) {
            controls.start("visible")
        }
    }, [controls, isInView])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    }
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 ">
            <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden max-w-6xl w-full flex flex-col md:flex-row">
                <motion.div
                    className="w-full md:w-1/2 h-64 md:h-auto relative"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.img
                        src={imageUrl}
                        alt={productName}
                        className="w-full h-full object-cover "
                        style={{ originY: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    />
                </motion.div>
                <motion.div
                    ref={ref}
                    className="w-full md:w-1/2 p-8 flex flex-col justify-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                >
                    <motion.h2
                        className="text-4xl font-bold text-white mb-4"
                        variants={itemVariants}
                    >
                        {productName}
                    </motion.h2>
                    <motion.div className="flex mb-4" variants={itemVariants}>
                        {[...Array(5)].map((_, index) => (
                            <Star
                                key={index}
                                className={`w-6 h-6 ${index < rating ? 'text-yellow-500' : 'text-gray-500'}`}
                                fill={index < rating ? 'currentColor' : 'none'}
                            />
                        ))}
                    </motion.div>
                    <motion.p
                        className="text-gray-300 text-lg"
                        variants={itemVariants}
                    >
                        {description}
                    </motion.p>
                </motion.div>
            </div>
        </div>
    )
}

export default ProductDetailComponent